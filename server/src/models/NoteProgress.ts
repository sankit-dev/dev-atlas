import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from 'mongoose'

const noteProgressSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    noteSlug: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
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
    lastReviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

noteProgressSchema.index({ userId: 1, noteSlug: 1 }, { unique: true })
noteProgressSchema.index({ userId: 1, reviewDueAt: 1 })

export type NoteProgress = InferSchemaType<typeof noteProgressSchema> & {
  userId: string
}
export type NoteProgressDocument = HydratedDocument<NoteProgress>

export const NoteProgressModel = model('NoteProgress', noteProgressSchema)
