import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from 'mongoose'

const donationStatuses = [
  'initiated',
  'processing',
  'succeeded',
  'failed',
  'cancelled',
  'refunded',
  'charged_back',
] as const

const donationEventSchema = new Schema(
  {
    type: { type: String, required: true, trim: true },
    webhookId: { type: String, trim: true, default: null },
    receivedAt: { type: Date, required: true, default: Date.now },
    payload: { type: Schema.Types.Mixed, default: null },
  },
  { _id: false },
)

const donationSchema = new Schema(
  {
    // Our own id, sent to Dodo as checkout metadata so webhook events can be
    // matched back to the session even before a payment id exists.
    reference: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    // Set when a signed-in user donates; null for anonymous donations.
    userId: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    checkoutSessionId: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    paymentId: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    status: {
      type: String,
      enum: donationStatuses,
      required: true,
      default: 'initiated',
      index: true,
    },
    amountCents: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
      default: null,
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    customerName: {
      type: String,
      trim: true,
      default: null,
    },
    productId: {
      type: String,
      trim: true,
      default: null,
    },
    mode: {
      type: String,
      trim: true,
      default: null,
    },
    eventType: {
      type: String,
      trim: true,
      default: null,
    },
    lastWebhookAt: {
      type: Date,
      default: null,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    refundId: {
      type: String,
      trim: true,
      default: null,
    },
    refundedAt: {
      type: Date,
      default: null,
    },
    refundAmountCents: {
      type: Number,
      default: null,
    },
    disputeId: {
      type: String,
      trim: true,
      default: null,
    },
    disputeStatus: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    disputedAt: {
      type: Date,
      default: null,
    },
    // Set when a verified payment amount disagrees with the recorded amount.
    amountMismatch: {
      type: Boolean,
      default: false,
    },
    // Last provider-reported failure reason (payment.error_message).
    lastError: {
      type: String,
      default: null,
    },
    // Full history of every payment event (success or failure), oldest first.
    events: {
      type: [donationEventSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

donationSchema.index({ 'events.webhookId': 1 })

export type DonationStatus = (typeof donationStatuses)[number]
export type Donation = InferSchemaType<typeof donationSchema> & {
  reference: string
  status: DonationStatus
}
export type DonationDocument = HydratedDocument<Donation>

export const DonationModel = model('Donation', donationSchema)
