import { randomUUID } from 'node:crypto'
import type { Request, Response } from 'express'
import type { Collection as MongoCollection, Document } from 'mongodb'
import { env } from '../config/env.js'
import { dodo } from '../lib/dodo.js'
import { DonationModel, type DonationStatus } from '../models/Donation.js'
import { WebhookEventModel } from '../models/WebhookEvent.js'

type UnknownRecord = Record<string, unknown>

const paymentStatusByEventType: Record<string, DonationStatus> = {
  'payment.succeeded': 'succeeded',
  'payment.failed': 'failed',
  'payment.processing': 'processing',
  'payment.cancelled': 'cancelled',
}

const disputeStatusByEventType: Record<string, string> = {
  'dispute.opened': 'dispute_opened',
  'dispute.expired': 'dispute_expired',
  'dispute.accepted': 'dispute_accepted',
  'dispute.cancelled': 'dispute_cancelled',
  'dispute.challenged': 'dispute_challenged',
  'dispute.won': 'dispute_won',
  'dispute.lost': 'dispute_lost',
}

type EventContext = {
  eventType: string
  webhookId: string
  receivedAt: Date
  event: UnknownRecord
}

type ProcessResult = {
  matched: boolean
  ignored?: boolean
  donationId?: string
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

function toDate(value: unknown) {
  const raw = asString(value)
  if (!raw) return null
  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? null : date
}

function isDuplicateKeyError(error: unknown) {
  return (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    (error as { code?: number }).code === 11000
  )
}

async function findDonation(keys: {
  reference?: string | null
  paymentId?: string | null
  checkoutSessionId?: string | null
}) {
  const queries: Array<Record<string, string>> = []

  if (keys.reference) queries.push({ reference: keys.reference })
  if (keys.paymentId) queries.push({ paymentId: keys.paymentId })
  if (keys.checkoutSessionId) {
    queries.push({ checkoutSessionId: keys.checkoutSessionId })
  }

  for (const query of queries) {
    const donation = await DonationModel.findOne(query)
      .select('_id amountCents currency status')
      .lean()

    if (donation) return donation
  }

  return null
}

async function pushDonationEvent(
  donationId: unknown,
  setFields: UnknownRecord,
  context: EventContext,
) {
  const collection =
    DonationModel.collection as unknown as MongoCollection<Document>

  await collection.updateOne(
    { _id: donationId } as Document,
    {
      $set: setFields,
      $push: {
        events: {
          $each: [
            {
              payload: context.event,
              receivedAt: context.receivedAt,
              type: context.eventType,
              webhookId: context.webhookId,
            },
          ],
          $slice: -25,
        },
      },
    } as Document,
  )
}

async function applyPaymentEvent(
  eventType: string,
  data: UnknownRecord,
  context: EventContext,
): Promise<ProcessResult> {
  const status = paymentStatusByEventType[eventType]
  const paymentId = asString(data.payment_id)
  const checkoutSessionId = asString(data.checkout_session_id)
  const reference = asString(asRecord(data.metadata).reference)
  const totalAmount = asNumber(data.total_amount)
  const currency = asString(data.currency)
  const customer = asRecord(data.customer)
  const email = asString(customer.email)
  const name = asString(customer.name)

  const donation = await findDonation({
    reference,
    paymentId,
    checkoutSessionId,
  })

  if (!donation) return { matched: false }

  const setFields: UnknownRecord = {
    eventType,
    lastWebhookAt: context.receivedAt,
    status,
  }

  if (paymentId) setFields.paymentId = paymentId
  if (checkoutSessionId) setFields.checkoutSessionId = checkoutSessionId
  if (totalAmount !== null && totalAmount > 0) {
    setFields.amountCents = totalAmount
  }
  if (currency) setFields.currency = currency
  if (email) setFields.customerEmail = email
  if (name) setFields.customerName = name
  if (status === 'succeeded') {
    setFields.paidAt = toDate(data.created_at) ?? context.receivedAt
  }
  if (status === 'failed') {
    setFields.lastError = asString(data.error_message)
  }

  if (
    totalAmount !== null &&
    donation.amountCents > 0 &&
    totalAmount !== donation.amountCents
  ) {
    setFields.amountMismatch = true
    console.error('[dodo] payment amount mismatch', {
      donationId: String(donation._id),
      expectedAmountCents: donation.amountCents,
      receivedAmountCents: totalAmount,
      paymentId,
      webhookId: context.webhookId,
    })
  }

  await pushDonationEvent(donation._id, setFields, context)

  return { matched: true, donationId: String(donation._id) }
}

async function applyRefundEvent(
  eventType: string,
  data: UnknownRecord,
  context: EventContext,
): Promise<ProcessResult> {
  const paymentId = asString(data.payment_id)
  const reference = asString(asRecord(data.metadata).reference)
  const refundId = asString(data.refund_id)
  const amount = asNumber(data.amount)
  const currency = asString(data.currency)

  const donation = await findDonation({ reference, paymentId })

  if (!donation) return { matched: false }

  const setFields: UnknownRecord = {
    eventType,
    lastWebhookAt: context.receivedAt,
  }

  if (paymentId) setFields.paymentId = paymentId
  if (refundId) setFields.refundId = refundId
  if (amount !== null) setFields.refundAmountCents = amount
  if (currency) setFields.currency = currency

  if (eventType === 'refund.succeeded') {
    setFields.status = 'refunded'
    setFields.refundedAt = toDate(data.created_at) ?? context.receivedAt
  }

  await pushDonationEvent(donation._id, setFields, context)

  return { matched: true, donationId: String(donation._id) }
}

async function applyDisputeEvent(
  eventType: string,
  data: UnknownRecord,
  context: EventContext,
): Promise<ProcessResult> {
  const paymentId = asString(data.payment_id)
  const disputeId = asString(data.dispute_id)

  const donation = await findDonation({ paymentId })

  if (!donation) return { matched: false }

  const setFields: UnknownRecord = {
    eventType,
    lastWebhookAt: context.receivedAt,
    disputedAt: toDate(data.created_at) ?? context.receivedAt,
  }

  if (disputeId) setFields.disputeId = disputeId

  const disputeStatus = disputeStatusByEventType[eventType]
  if (disputeStatus) setFields.disputeStatus = disputeStatus

  // A lost dispute means the funds are reversed; a won dispute restores them.
  if (eventType === 'dispute.lost') {
    setFields.status = 'charged_back'
  } else if (eventType === 'dispute.won' && donation.status === 'charged_back') {
    setFields.status = 'succeeded'
  }

  await pushDonationEvent(donation._id, setFields, context)

  return { matched: true, donationId: String(donation._id) }
}

async function processEvent(
  event: UnknownRecord,
  context: EventContext,
): Promise<ProcessResult> {
  const data = asRecord(event.data)
  const { eventType } = context

  if (eventType.startsWith('payment.')) {
    if (!(eventType in paymentStatusByEventType)) {
      return { matched: false, ignored: true }
    }
    return applyPaymentEvent(eventType, data, context)
  }

  if (eventType.startsWith('refund.')) {
    return applyRefundEvent(eventType, data, context)
  }

  if (eventType.startsWith('dispute.')) {
    return applyDisputeEvent(eventType, data, context)
  }

  return { matched: false, ignored: true }
}

export async function handleDodoWebhook(request: Request, response: Response) {
  if (!env.dodoWebhookKey) {
    console.error(
      '[dodo] webhook received but DODO_WEBHOOK_KEY is not set; configure it in the Dodo dashboard (Developer > Webhooks) and the server env',
    )
    response.status(503).json({ message: 'Webhook is not configured.' })
    return
  }

  const rawBody = Buffer.isBuffer(request.body)
    ? request.body.toString('utf8')
    : typeof request.body === 'string'
      ? request.body
      : ''

  const webhookId = request.header('webhook-id') ?? ''

  let event: UnknownRecord

  try {
    event = dodo.webhooks.unwrap(rawBody, {
      headers: {
        'webhook-id': webhookId,
        'webhook-signature': request.header('webhook-signature') ?? '',
        'webhook-timestamp': request.header('webhook-timestamp') ?? '',
      },
    }) as unknown as UnknownRecord
  } catch (error) {
    console.error('[dodo] invalid webhook signature', {
      error,
      bytes: rawBody.length,
      webhookId,
    })
    response.status(401).json({ message: 'Invalid signature.' })
    return
  }

  const data = asRecord(event.data)
  const eventType = asString(event.type) ?? 'unknown'
  const receivedAt = new Date()
  const context: EventContext = { event, eventType, receivedAt, webhookId }

  const existing = webhookId
    ? await WebhookEventModel.findOne({ webhookId })
    : null

  // Already fully handled; acknowledge without reprocessing.
  if (
    existing &&
    (existing.status === 'processed' || existing.status === 'ignored')
  ) {
    response.json({ received: true, duplicate: true })
    return
  }

  let record = existing

  if (!record) {
    try {
      record = await WebhookEventModel.create({
        businessId: asString(event.business_id),
        eventTimestamp: toDate(event.timestamp),
        payload: event,
        payloadType: asString(data.payload_type),
        receivedAt,
        status: 'pending',
        type: eventType,
        webhookId: webhookId || `missing-${randomUUID()}`,
      })
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        response.json({ received: true, duplicate: true })
        return
      }
      throw error
    }
  } else {
    record.type = eventType
    record.status = 'pending'
    record.error = null
    await record.save()
  }

  try {
    const result = await processEvent(event, context)

    record.status = result.ignored ? 'ignored' : 'processed'
    record.matched = result.matched
    record.donationId = result.donationId ?? null
    record.processedAt = new Date()
    record.error = result.matched || result.ignored ? null : 'unmatched'
    await record.save()

    console.log('[dodo] webhook processed', {
      eventType,
      matched: result.matched,
      ignored: Boolean(result.ignored),
      webhookId,
    })

    response.json({
      received: true,
      matched: result.matched,
      ignored: Boolean(result.ignored),
    })
  } catch (error) {
    console.error('[dodo] failed to process webhook', error)
    record.status = 'failed'
    record.error = error instanceof Error ? error.message : String(error)
    await record.save().catch(() => undefined)
    response.status(500).json({ message: 'Webhook could not be processed.' })
  }
}
