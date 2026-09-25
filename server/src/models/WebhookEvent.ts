import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from 'mongoose'

const webhookEventStatuses = [
  'pending',
  'processed',
  'ignored',
  'failed',
] as const

const webhookEventSchema = new Schema(
  {
    // Value of the `webhook-id` header. Unique so duplicate deliveries are
    // recognised atomically even under concurrent retries.
    webhookId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    businessId: {
      type: String,
      trim: true,
      default: null,
    },
    payloadType: {
      type: String,
      trim: true,
      default: null,
    },
    eventTimestamp: {
      type: Date,
      default: null,
    },
    receivedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    processedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: webhookEventStatuses,
      required: true,
      default: 'pending',
      index: true,
    },
    // Whether the event could be projected onto a donation record.
    matched: {
      type: Boolean,
      default: false,
    },
    donationId: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    error: {
      type: String,
      default: null,
    },
    // Full verified event as received, kept for audit and replay.
    payload: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

export type WebhookEventStatus = (typeof webhookEventStatuses)[number]
export type WebhookEvent = InferSchemaType<typeof webhookEventSchema>
export type WebhookEventDocument = HydratedDocument<WebhookEvent>

export const WebhookEventModel = model('WebhookEvent', webhookEventSchema)
