import { Router } from "express";
import { DonationModel, type DonationStatus } from "../models/Donation.js";

export const webhooksRouter = Router();

// Dodo event type -> donation status
const statusByEventType: Record<string, DonationStatus> = {
  "payment.succeeded": "succeeded",
  "payment.failed": "failed",
  "payment.processing": "processing",
  "payment.cancelled": "cancelled",
  "refund.succeeded": "refunded",
  "refund.created": "refunded",
};

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value !== null && typeof value === "object"
    ? (value as UnknownRecord)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

webhooksRouter.post("/dodo", async (request, response, next) => {
  try {
    const event = asRecord(request.body);
    const eventType = asString(event.type) ?? "unknown";

    console.log("[webhook] dodo event", eventType);

    const status = statusByEventType[eventType];

    // Ignore event types we don't track, but still ack so Dodo stops retrying.
    if (!status) {
      response.json({ received: true, ignored: true, eventType });
      return;
    }

    const data = asRecord(event.data);
    const metadata = asRecord(data.metadata);
    const reference = asString(metadata.reference);
    const paymentId = asString(data.payment_id) ?? asString(data.paymentId);
    const userId = asString(metadata.userId) ?? asString(metadata.user_id);

    const filter = reference ? { reference } : paymentId ? { paymentId } : null;

    if (!filter) {
      response.json({ received: true, unmatched: true, eventType });
      return;
    }

    await DonationModel.updateOne(filter, {
      $set: {
        eventType,
        lastWebhookAt: new Date(),
        status,
        ...(paymentId ? { paymentId } : {}),
        ...(userId ? { userId } : {}),
        ...(status === "succeeded" ? { paidAt: new Date() } : {}),
      },
    });

    response.json({ received: true, eventType, status });
  } catch (error) {
    next(error);
  }
});
