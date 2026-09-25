import { randomUUID } from "node:crypto";
import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { env } from "../config/env.js";
import { auth } from "../lib/auth.js";
import { dodo } from "../lib/dodo.js";
import {
  requireAuth,
  type AuthenticatedRequest,
} from "../middleware/requireAuth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { DonationModel, type DonationStatus } from "../models/Donation.js";

export const donationsRouter = Router();

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value !== null && typeof value === "object"
    ? (value as UnknownRecord)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "DA";
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
  try {
    return asRecord(await dodo.checkoutSessions.retrieve(checkoutSessionId));
  } catch (error) {
    console.error("[donations] checkout session lookup failed", {
      checkoutSessionId,
      error,
    });
    return null;
  }
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
        couponCode,
        userId,
        reference,
      });

      await DonationModel.create({
        amountCents,
        mode: getRuntimeMode(),
        productId: env.dodoDonationProductId,
        reference,
        status: "initiated",
        userId,
      });

      try {
        const session = await dodo.checkoutSessions.create({
          cancel_url: `${env.clientOrigin}/?donation=cancelled&donation_reference=${encodeURIComponent(reference)}`,
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
          return_url: `${env.clientOrigin}/?donation=success&donation_reference=${encodeURIComponent(reference)}`,
        });

        if (!session.checkout_url) {
          throw new Error("Checkout link was not returned.");
        }

        await DonationModel.updateOne(
          { reference },
          { $set: { checkoutSessionId: session.session_id } },
        );

        response.json({ checkoutUrl: session.checkout_url, reference });
      } catch (checkoutError) {
        await DonationModel.updateOne(
          { reference },
          {
            $set: {
              lastError:
                checkoutError instanceof Error
                  ? checkoutError.message
                  : "Unable to create checkout.",
              status: "failed",
            },
          },
        );
        console.error("[donations] checkout creation failed", checkoutError);
        response
          .status(502)
          .json({ message: "Could not start checkout. Please try again." });
      }
    } catch (error) {
      next(error);
    }
  },
);

// GET /api/donations/me — donation status for the signed-in user. Reconciles
// pending donations with Dodo first so the result is correct even without a
// configured webhook.
donationsRouter.get(
  "/sponsors",
  rateLimit({
    keyPrefix: "donation-sponsors",
    limit: 60,
    windowMs: 60_000,
  }),
  async (_request, response, next) => {
    try {
      const donations = await DonationModel.find({ status: "succeeded" })
        .sort({ paidAt: -1 })
        .limit(18)
        .select("customerName paidAt")
        .lean();

      response.json({
        sponsors: donations.map((donation) => {
          const displayName = donation.customerName?.trim() || "A generous supporter";

          return {
            displayName,
            donatedAt: donation.paidAt ?? null,
            initials: getInitials(displayName),
          };
        }),
      });
    } catch (error) {
      next(error);
    }
  },
);

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

donationsRouter.get(
  "/status/:reference",
  rateLimit({
    keyPrefix: "donation-status",
    limit: 30,
    windowMs: 60_000,
  }),
  async (request, response, next) => {
    try {
      const rawReference = request.params.reference;
      const reference =
        typeof rawReference === "string" ? rawReference.trim() : null;

      if (!reference) {
        response.status(400).json({ message: "Donation reference is required." });
        return;
      }

      const donation = await DonationModel.findOne({ reference })
        .select(
          "reference status amountCents currency customerName paidAt refundedAt disputeStatus",
        )
        .lean();

      if (!donation) {
        response.status(404).json({ message: "Donation not found." });
        return;
      }

      response.json({
        amountCents: donation.amountCents,
        currency: donation.currency,
        disputeStatus: donation.disputeStatus,
        donorName: donation.customerName,
        paidAt: donation.paidAt,
        reference: donation.reference,
        refundedAt: donation.refundedAt,
        status: donation.status,
      });
    } catch (error) {
      next(error);
    }
  },
);
