import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from 'mongoose'

export const dsaProgressOutcomes = ['solved', 'guided', 'review'] as const
export type DsaProgressOutcome = (typeof dsaProgressOutcomes)[number]

const dsaProgressSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    questId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    outcome: {
      type: String,
      required: true,
      enum: dsaProgressOutcomes,
    },
    reviewStep: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    reviewDueAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

dsaProgressSchema.index({ userId: 1, questId: 1 }, { unique: true })
dsaProgressSchema.index({ userId: 1, reviewDueAt: 1 })

export type DsaProgress = InferSchemaType<typeof dsaProgressSchema> & {
  userId: string
}
export type DsaProgressDocument = HydratedDocument<DsaProgress>

export const DsaProgressModel = model('DsaProgress', dsaProgressSchema)
