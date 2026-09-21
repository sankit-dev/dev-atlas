import { randomUUID } from 'node:crypto'
import { Router, type Request, type Response } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import type { Collection as MongoCollection, Document } from 'mongodb'
import { Webhook } from 'standardwebhooks'
import { env } from '../config/env.js'
import { auth } from '../lib/auth.js'
import { rateLimit } from '../middleware/rateLimit.js'
import { DonationModel, type DonationStatus } from '../models/Donation.js'

export const donationsRouter = Router()

type UnknownRecord = Record<string, unknown>

const statusByEventType: Record<string, DonationStatus> = {
  'payment.succeeded': 'succeeded',
  'payment.failed': 'failed',
  'payment.processing': 'processing',
  'payment.cancelled': 'cancelled',
  'refund.succeeded': 'refunded',
  'refund.created': 'refunded',
}

function asRecord(value: unknown): UnknownRecord {
  return value !== null && typeof value === 'object'
    ? (value as UnknownRecord)
    : {}
}

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function asNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function getAmountCents(body: unknown) {
  if (!body || typeof body !== 'object' || !('amountCents' in body)) {
    return null
  }

  const value = (body as { amountCents: unknown }).amountCents

  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return null
  }

  return value
}

function getRuntimeMode() {
  return env.dodoApiBase.includes('test') ? 'test' : 'live'
}

donationsRouter.post(
  '/',
  rateLimit({
    keyPrefix: 'donations',
    limit: 10,
    windowMs: 10 * 60_000,
  }),
  async (request, response, next) => {
    try {
      if (!env.dodoApiKey || !env.dodoDonationProductId) {
        response
          .status(503)
          .json({ message: 'Donations are not available right now.' })
        return
      }

      const amountCents = getAmountCents(request.body)

      if (
        amountCents === null ||
        amountCents < env.donationMinCents ||
        amountCents > env.donationMaxCents
      ) {
        response.status(400).json({
          message: `Choose an amount between ${env.donationMinCents / 100} and ${env.donationMaxCents / 100}.`,
        })
        return
      }

      const reference = randomUUID()
      const authSession = await auth.api
        .getSession({ headers: fromNodeHeaders(request.headers) })
        .catch(() => null)
      const userId =
        typeof authSession?.user?.id === 'string' ? authSession.user.id : null

      const checkoutResponse = await fetch(`${env.dodoApiBase}/checkouts`, {
        body: JSON.stringify({
          cancel_url: `${env.clientOrigin}/?donation=cancelled`,
          metadata: {
            reference,
            source: 'devatlas-donation',
            ...(userId ? { userId } : {}),
          },
          product_cart: [
            {
              amount: amountCents,
              product_id: env.dodoDonationProductId,
              quantity: 1,
            },
          ],
          return_url: `${env.clientOrigin}/?donation=success`,
        }),
        headers: {
          Authorization: `Bearer ${env.dodoApiKey}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!checkoutResponse.ok) {
        const details = await checkoutResponse.text().catch(() => '')
        console.error(
          'Dodo checkout session failed',
          checkoutResponse.status,
          details,
        )
        response
          .status(502)
          .json({ message: 'Could not start checkout. Please try again.' })
        return
      }

      const session = (await checkoutResponse.json()) as {
        checkout_url?: unknown
        session_id?: unknown
      }

      if (typeof session.checkout_url !== 'string' || !session.checkout_url) {
        response
          .status(502)
          .json({ message: 'Checkout link was not returned.' })
        return
      }

      // Record the attempt up front so a payment is never lost even if the
      // webhook is delayed or the customer abandons checkout.
      try {
        await DonationModel.create({
          amountCents,
          checkoutSessionId:
            typeof session.session_id === 'string' ? session.session_id : null,
          mode: getRuntimeMode(),
          productId: env.dodoDonationProductId,
          reference,
          status: 'initiated',
          userId,
        })
      } catch (recordError) {
        console.error('Failed to record pending donation', recordError)
      }

      response.json({ checkoutUrl: session.checkout_url, reference })
    } catch (error) {
      next(error)
    }
  },
)

export async function handleDonationWebhook(request: Request, response: Response) {
  if (!env.dodoWebhookKey) {
    response.status(503).json({ message: 'Webhook is not configured.' })
    return
  }

  const rawBody = Buffer.isBuffer(request.body)
    ? request.body.toString('utf8')
    : typeof request.body === 'string'
      ? request.body
      : ''

  const webhookId = request.header('webhook-id') ?? ''

  let event: unknown

  try {
    event = new Webhook(env.dodoWebhookKey).verify(rawBody, {
      'webhook-id': webhookId,
      'webhook-signature': request.header('webhook-signature') ?? '',
      'webhook-timestamp': request.header('webhook-timestamp') ?? '',
    })
  } catch (error) {
    console.error('Invalid Dodo webhook signature', error)
    response.status(401).json({ message: 'Invalid signature.' })
    return
  }

  try {
    const eventRecord = asRecord(event)
    const eventType = asString(eventRecord.type) ?? 'unknown'

    // Only payment lifecycle events are persisted; acknowledge everything else
    // so Dodo does not retry unrelated events.
    if (!eventType.startsWith('payment.') && !eventType.startsWith('refund.')) {
      response.json({ received: true, ignored: true })
      return
    }

    if (webhookId) {
      const alreadyStored = await DonationModel.exists({
        'events.webhookId': webhookId,
      })

      if (alreadyStored) {
        response.json({ received: true, duplicate: true })
        return
      }
    }

    const data = asRecord(eventRecord.data)
    const metadata = asRecord(data.metadata)
    const reference = asString(metadata.reference)
    const metadataUserId =
      asString(metadata.userId) ?? asString(metadata.user_id)
    const paymentId = asString(data.payment_id) ?? asString(data.paymentId)
    const checkoutSessionId =
      asString(data.checkout_session_id) ?? asString(data.checkoutSessionId)
    const status = statusByEventType[eventType]
    const amountCents = asNumber(data.total_amount) ?? asNumber(data.amount) ?? 0
    const currency =
      asString(data.currency) ?? asString(asRecord(data.billing).currency)
    const customer = asRecord(data.customer)
    const email = asString(customer.email) ?? asString(data.customer_email)
    const name = asString(customer.name) ?? asString(data.customer_name)
    const paidAt = asString(data.created_at) ?? asString(data.paid_at)
    const now = new Date()

    const setFields: UnknownRecord = {
      eventType,
      lastWebhookAt: now,
      mode: getRuntimeMode(),
    }
    const setOnInsert: UnknownRecord = {
      productId: env.dodoDonationProductId || null,
      reference: reference ?? paymentId ?? `wh-${webhookId || randomUUID()}`,
    }

    if (status) {
      setFields.status = status
    } else {
      setOnInsert.status = 'initiated'
    }

    if (paymentId) setFields.paymentId = paymentId
    if (checkoutSessionId) setFields.checkoutSessionId = checkoutSessionId
    if (metadataUserId) setFields.userId = metadataUserId
    else setOnInsert.userId = null
    if (amountCents > 0) setFields.amountCents = amountCents
    else setOnInsert.amountCents = 0
    if (currency) setFields.currency = currency
    else setOnInsert.currency = null
    if (email) setFields.customerEmail = email
    if (name) setFields.customerName = name
    if (status === 'succeeded') {
      setFields.paidAt = paidAt ? new Date(paidAt) : now
    }

    const filter: UnknownRecord = reference
      ? { reference }
      : paymentId
        ? { paymentId }
        : { checkoutSessionId: checkoutSessionId ?? `unknown-${randomUUID()}` }

    const eventEntry = {
      payload: event,
      receivedAt: now,
      type: eventType,
      webhookId,
    }

    const collection = DonationModel.collection as unknown as MongoCollection<Document>

    await collection.updateOne(
      filter as Document,
      {
        $push: {
          events: {
            $each: [eventEntry],
            $slice: -25,
          },
        },
        $set: setFields,
        $setOnInsert: setOnInsert,
      } as Document,
      { upsert: true },
    )

    response.json({ received: true })
  } catch (error) {
    console.error('Failed to record Dodo webhook', error)
    response.status(500).json({ message: 'Webhook could not be processed.' })
    return
  }
}
