import { randomUUID } from "node:crypto";
import { Router, type Request, type Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import type { Collection as MongoCollection, Document } from "mongodb";
import { Webhook } from "standardwebhooks";
import { env } from "../config/env.js";
import { auth } from "../lib/auth.js";
import {
  requireAuth,
  type AuthenticatedRequest,
} from "../middleware/requireAuth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { DonationModel, type DonationStatus } from "../models/Donation.js";

export const donationsRouter = Router();

type UnknownRecord = Record<string, unknown>;

const statusByEventType: Record<string, DonationStatus> = {
  "payment.succeeded": "succeeded",
  "payment.failed": "failed",
  "payment.processing": "processing",
  "payment.cancelled": "cancelled",
  "refund.succeeded": "refunded",
  "refund.created": "refunded",
};

function asRecord(value: unknown): UnknownRecord {
  return value !== null && typeof value === "object"
    ? (value as UnknownRecord)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function getAmountCents(body: unknown) {
  if (!body || typeof body !== "object" || !("amountCents" in body)) {
    return null;
  }

  const value = (body as { amountCents: unknown }).amountCents;

  if (typeof value !== "number" || !Number.isInteger(value)) {
    return null;
  }

  return value;
}

function getCouponCode(body: unknown) {
  if (!body || typeof body !== "object" || !("couponCode" in body)) {
    return null;
  }

  const value = (body as { couponCode: unknown }).couponCode;

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed.slice(0, 64) : null;
}

type CouponValidation = { valid: true } | { valid: false; message: string };

async function validateCoupon(couponCode: string): Promise<CouponValidation> {
  const couponResponse = await fetch(
    `${env.dodoApiBase}/discounts/code/${encodeURIComponent(couponCode)}`,
    { headers: { Authorization: `Bearer ${env.dodoApiKey}` } },
  );

  if (couponResponse.ok) {
    return { valid: true };
  }

  console.error("[donations] coupon lookup failed", {
    couponCode,
    status: couponResponse.status,
    body: await couponResponse.text().catch(() => ""),
  });

  if (couponResponse.status === 404) {
    return { valid: false, message: "That coupon code was not found." };
  }

  if (couponResponse.status === 422) {
    return {
      valid: false,
      message: "That coupon code has expired or reached its usage limit.",
    };
  }

  return {
    valid: false,
    message: "We couldn't verify that coupon code. Please try again.",
  };
}

function getRuntimeMode() {
  return env.dodoApiBase.includes("test") ? "test" : "live";
}

function maskSecret(value: string) {
  if (!value) return "(empty)";
  if (value.length <= 8) return "***";
  return `${value.slice(0, 4)}...${value.slice(-4)} (len=${value.length})`;
}

function mapPaymentStatus(value: unknown): DonationStatus | null {
  switch (asString(value)) {
    case "succeeded":
      return "succeeded";
    case "failed":
      return "failed";
    case "cancelled":
    case "canceled":
      return "cancelled";
    case "refunded":
      return "refunded";
    case "processing":
    case "requires_customer_action":
    case "requires_payment_method":
      return "processing";
    default:
      return null;
  }
}

async function fetchCheckoutSession(checkoutSessionId: string) {
  const checkoutResponse = await fetch(
    `${env.dodoApiBase}/checkouts/${encodeURIComponent(checkoutSessionId)}`,
    { headers: { Authorization: `Bearer ${env.dodoApiKey}` } },
  );

  if (!checkoutResponse.ok) {
    console.error("[donations] checkout session lookup failed", {
      checkoutSessionId,
      status: checkoutResponse.status,
    });
    return null;
  }

  return asRecord(await checkoutResponse.json().catch(() => null));
}

// The webhook may not be configured (or may be delayed), so we also reconcile
// recent pending donations directly against Dodo's checkout-session API.
async function reconcileDonations(userId: string) {
  if (!env.dodoApiKey) {
    return;
  }

  const pending = await DonationModel.find({
    status: { $in: ["initiated", "processing"] },
    userId,
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  await Promise.all(
    pending
      .filter(
        (
          donation,
        ): donation is typeof donation & { checkoutSessionId: string } =>
          typeof donation.checkoutSessionId === "string" &&
          donation.checkoutSessionId.length > 0,
      )
      .map(async (donation) => {
        const session = await fetchCheckoutSession(donation.checkoutSessionId);
        if (!session) {
          return;
        }

        const status = mapPaymentStatus(session.payment_status);
        if (!status) {
          return;
        }

        const paymentId = asString(session.payment_id);
        const fields: UnknownRecord = { status };

        if (paymentId) fields.paymentId = paymentId;
        if (status === "succeeded" && !donation.paidAt)
          fields.paidAt = new Date();

        await DonationModel.updateOne({ _id: donation._id }, { $set: fields });
      }),
  );
}

async function buildDonationSummary(userId: string) {
  const succeeded = await DonationModel.find({ status: "succeeded", userId })
    .sort({ paidAt: -1 })
    .select("amountCents currency paidAt")
    .lean();

  const latest = succeeded[0];

  return {
    hasDonated: succeeded.length > 0,
    donationCount: succeeded.length,
    totalAmountCents: succeeded.reduce(
      (sum, d) => sum + (d.amountCents ?? 0),
      0,
    ),
    currency: latest?.currency ?? null,
    lastDonationAt: latest?.paidAt ?? null,
  };
}

donationsRouter.post(
  "/",
  rateLimit({
    keyPrefix: "donations",
    limit: 10,
    windowMs: 10 * 60_000,
  }),
  async (request, response, next) => {
    try {
      if (!env.dodoApiKey || !env.dodoDonationProductId) {
        console.error("[donations] missing config", {
          hasApiKey: Boolean(env.dodoApiKey),
          hasProductId: Boolean(env.dodoDonationProductId),
        });
        response
          .status(503)
          .json({ message: "Donations are not available right now." });
        return;
      }

      const amountCents = getAmountCents(request.body);

      if (
        amountCents === null ||
        amountCents < env.donationMinCents ||
        amountCents > env.donationMaxCents
      ) {
        console.error("[donations] invalid amount", {
          amountCents,
          min: env.donationMinCents,
          max: env.donationMaxCents,
          rawBody: request.body,
        });
        response.status(400).json({
          message: `Choose an amount between ${env.donationMinCents / 100} and ${env.donationMaxCents / 100}.`,
        });
        return;
      }

      const reference = randomUUID();
      const authSession = await auth.api
        .getSession({ headers: fromNodeHeaders(request.headers) })
        .catch(() => null);
      const userId =
        typeof authSession?.user?.id === "string" ? authSession.user.id : null;

      const couponCode = getCouponCode(request.body);

      if (couponCode) {
        const coupon = await validateCoupon(couponCode);

        if (!coupon.valid) {
          response.status(400).json({ message: coupon.message });
          return;
        }
      }

      console.log("[donations] creating checkout session", {
        apiBase: env.dodoApiBase,
        mode: getRuntimeMode(),
        amountCents,
        productId: env.dodoDonationProductId,
        apiKey: maskSecret(env.dodoApiKey),
        couponCode,
        userId,
        reference,
      });

      const checkoutResponse = await fetch(`${env.dodoApiBase}/checkouts`, {
        body: JSON.stringify({
          cancel_url: `${env.clientOrigin}/?donation=cancelled`,
          ...(couponCode ? { discount_codes: [couponCode] } : {}),
          metadata: {
            reference,
            source: "DevAtlas",
            ...(userId ? { userId } : {}),
            ...(couponCode ? { couponCode } : {}),
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
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const rawCheckoutBody = await checkoutResponse.text().catch(() => "");

      console.log("[donations] dodo checkout response", {
        url: `${env.dodoApiBase}/checkouts`,
        status: checkoutResponse.status,
        ok: checkoutResponse.ok,
        contentType: checkoutResponse.headers.get("content-type"),
        body: rawCheckoutBody,
      });

      if (!checkoutResponse.ok) {
        console.error(
          "Dodo checkout session failed",
          checkoutResponse.status,
          rawCheckoutBody,
        );
        response
          .status(502)
          .json({ message: "Could not start checkout. Please try again." });
        return;
      }

      let session: {
        checkout_url?: unknown;
        session_id?: unknown;
      } = {};

      try {
        session = JSON.parse(rawCheckoutBody) as typeof session;
      } catch (parseError) {
        console.error("[donations] failed to parse checkout response", {
          rawCheckoutBody,
          parseError,
        });
        response
          .status(502)
          .json({ message: "Checkout response could not be read." });
        return;
      }

      if (typeof session.checkout_url !== "string" || !session.checkout_url) {
        response
          .status(502)
          .json({ message: "Checkout link was not returned." });
        return;
      }

      // Record the attempt up front so a payment is never lost even if the
      // webhook is delayed or the customer abandons checkout.
      try {
        await DonationModel.create({
          amountCents,
          checkoutSessionId:
            typeof session.session_id === "string" ? session.session_id : null,
          mode: getRuntimeMode(),
          productId: env.dodoDonationProductId,
          reference,
          status: "initiated",
          userId,
        });
      } catch (recordError) {
        console.error("Failed to record pending donation", recordError);
      }

      response.json({ checkoutUrl: session.checkout_url, reference });
    } catch (error) {
      next(error);
    }
  },
);

// GET /api/donations/me — donation status for the signed-in user. Reconciles
// pending donations with Dodo first so the result is correct even without a
// configured webhook.
donationsRouter.get(
  "/me",
  requireAuth,
  rateLimit({
    getKey: (request) => (request as AuthenticatedRequest).userId,
    keyPrefix: "donations-me",
    limit: 30,
    windowMs: 60_000,
  }),
  async (request, response, next) => {
    try {
      const { userId } = request as AuthenticatedRequest;

      await reconcileDonations(userId).catch((error) => {
        console.error("[donations] reconcile failed", error);
      });

      response.json(await buildDonationSummary(userId));
    } catch (error) {
      next(error);
    }
  },
);

export async function handleDonationWebhook(
  request: Request,
  response: Response,
) {
  if (!env.dodoWebhookKey) {
    console.error(
      "[donations] webhook received but DODO_WEBHOOK_KEY is not set; set it in the Dodo dashboard (Developer > Webhooks) and the server env",
    );
    response.status(503).json({ message: "Webhook is not configured." });
    return;
  }

  const rawBody = Buffer.isBuffer(request.body)
    ? request.body.toString("utf8")
    : typeof request.body === "string"
      ? request.body
      : "";

  const webhookId = request.header("webhook-id") ?? "";

  console.log("[donations] webhook received", {
    bytes: rawBody.length,
    hasWebhookId: Boolean(webhookId),
    hasSignature: Boolean(request.header("webhook-signature")),
    hasTimestamp: Boolean(request.header("webhook-timestamp")),
  });

  let event: unknown;

  try {
    event = new Webhook(env.dodoWebhookKey).verify(rawBody, {
      "webhook-id": webhookId,
      "webhook-signature": request.header("webhook-signature") ?? "",
      "webhook-timestamp": request.header("webhook-timestamp") ?? "",
    });
  } catch (error) {
    console.error("Invalid Dodo webhook signature", error, {
      bodyPreview: rawBody.slice(0, 500),
      webhookId,
    });
    response.status(401).json({ message: "Invalid signature." });
    return;
  }

  try {
    const eventRecord = asRecord(event);
    const eventType = asString(eventRecord.type) ?? "unknown";

    console.log("[donations] webhook event", { eventType, webhookId });

    // Only payment lifecycle events are persisted; acknowledge everything else
    // so Dodo does not retry unrelated events.
    if (!eventType.startsWith("payment.") && !eventType.startsWith("refund.")) {
      response.json({ received: true, ignored: true });
      return;
    }

    if (webhookId) {
      const alreadyStored = await DonationModel.exists({
        "events.webhookId": webhookId,
      });

      if (alreadyStored) {
        response.json({ received: true, duplicate: true });
        return;
      }
    }

    const data = asRecord(eventRecord.data);
    const metadata = asRecord(data.metadata);
    const reference = asString(metadata.reference);
    const metadataUserId =
      asString(metadata.userId) ?? asString(metadata.user_id);
    const metadataCoupon =
      asString(metadata.couponCode) ?? asString(metadata.coupon_code);
    const paymentId = asString(data.payment_id) ?? asString(data.paymentId);
    const checkoutSessionId =
      asString(data.checkout_session_id) ?? asString(data.checkoutSessionId);
    const status = statusByEventType[eventType];
    const amountCents =
      asNumber(data.total_amount) ?? asNumber(data.amount) ?? 0;
    const currency =
      asString(data.currency) ?? asString(asRecord(data.billing).currency);
    const customer = asRecord(data.customer);
    const email = asString(customer.email) ?? asString(data.customer_email);
    const name = asString(customer.name) ?? asString(data.customer_name);
    const paidAt = asString(data.created_at) ?? asString(data.paid_at);
    const now = new Date();

    const setFields: UnknownRecord = {
      eventType,
      lastWebhookAt: now,
      mode: getRuntimeMode(),
    };
    const setOnInsert: UnknownRecord = {
      productId: env.dodoDonationProductId || null,
      reference: reference ?? paymentId ?? `wh-${webhookId || randomUUID()}`,
    };

    if (status) {
      setFields.status = status;
    } else {
      setOnInsert.status = "initiated";
    }

    if (paymentId) setFields.paymentId = paymentId;
    if (checkoutSessionId) setFields.checkoutSessionId = checkoutSessionId;
    if (metadataUserId) setFields.userId = metadataUserId;
    else setOnInsert.userId = null;
    if (metadataCoupon) setFields.couponCode = metadataCoupon;
    else setOnInsert.couponCode = null;
    if (amountCents > 0) setFields.amountCents = amountCents;
    else setOnInsert.amountCents = 0;
    if (currency) setFields.currency = currency;
    else setOnInsert.currency = null;
    if (email) setFields.customerEmail = email;
    if (name) setFields.customerName = name;
    if (status === "succeeded") {
      setFields.paidAt = paidAt ? new Date(paidAt) : now;
    }

    const filter: UnknownRecord = reference
      ? { reference }
      : paymentId
        ? { paymentId }
        : { checkoutSessionId: checkoutSessionId ?? `unknown-${randomUUID()}` };

    const eventEntry = {
      payload: event,
      receivedAt: now,
      type: eventType,
      webhookId,
    };

    const collection =
      DonationModel.collection as unknown as MongoCollection<Document>;

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
    );

    response.json({ received: true });
  } catch (error) {
    console.error("Failed to record Dodo webhook", error);
    response.status(500).json({ message: "Webhook could not be processed." });
    return;
  }
}
