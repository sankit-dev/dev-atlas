import { Router } from 'express'
import {
  requireAuth,
  type AuthenticatedRequest,
} from '../middleware/requireAuth.js'
import { rateLimit } from '../middleware/rateLimit.js'
import {
  DsaProgressModel,
  dsaProgressOutcomes,
  type DsaProgressOutcome,
} from '../models/DsaProgress.js'

export const dsaProgressRouter = Router()

const reviewIntervalsInDays = [1, 3, 8, 21]

function addDays(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

function isValidOutcome(value: unknown): value is DsaProgressOutcome {
  return dsaProgressOutcomes.includes(value as DsaProgressOutcome)
}

function getQuestIdParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value.trim() : ''
}

dsaProgressRouter.use(requireAuth)

dsaProgressRouter.use(
  rateLimit({
    getKey: (request) => (request as AuthenticatedRequest).userId,
    keyPrefix: 'dsa-progress',
    limit: 120,
    windowMs: 60_000,
  }),
)

// GET /api/dsa/progress — return all DSA progress for the current user
dsaProgressRouter.get('/', async (request, response, next) => {
  try {
    const { userId } = request as AuthenticatedRequest

    const records = await DsaProgressModel.find({ userId })
      .select('questId outcome reviewStep reviewDueAt updatedAt')
      .lean()

    response.json({
      progress: records.map((r) => ({
        questId: r.questId,
        outcome: r.outcome,
        reviewStep: r.reviewStep,
        reviewDueAt: r.reviewDueAt ?? null,
        updatedAt: r.updatedAt,
      })),
    })
  } catch (error) {
    next(error)
  }
})

// POST /api/dsa/progress/sync — bulk upsert (used on login to merge localStorage)
dsaProgressRouter.post('/sync', async (request, response, next) => {
  try {
    const { userId } = request as AuthenticatedRequest
    const body = request.body as unknown

    if (
      !body ||
      typeof body !== 'object' ||
      !('progress' in body) ||
      !Array.isArray((body as { progress: unknown }).progress)
    ) {
      response.status(400).json({ message: 'Invalid request body' })
      return
    }

    const items = (body as { progress: unknown[] }).progress.filter(
      (item): item is { questId: string; outcome: DsaProgressOutcome; reviewStep: number; reviewDueAt?: string | null } =>
        item !== null &&
        typeof item === 'object' &&
        typeof (item as Record<string, unknown>).questId === 'string' &&
        isValidOutcome((item as Record<string, unknown>).outcome) &&
        typeof (item as Record<string, unknown>).reviewStep === 'number',
    )

    if (items.length > 500) {
      response.status(400).json({ message: 'Too many items in one sync. Limit is 500.' })
      return
    }

    if (items.length > 0) {
      await DsaProgressModel.bulkWrite(
        items.map((item) => ({
          updateOne: {
            filter: { userId, questId: item.questId },
            update: {
              $set: {
                outcome: item.outcome,
                reviewStep: item.reviewStep,
                reviewDueAt: item.reviewDueAt ? new Date(item.reviewDueAt) : null,
              },
            },
            upsert: true,
          },
        })),
      )
    }

    const records = await DsaProgressModel.find({ userId })
      .select('questId outcome reviewStep reviewDueAt updatedAt')
      .lean()

    response.json({
      progress: records.map((r) => ({
        questId: r.questId,
        outcome: r.outcome,
        reviewStep: r.reviewStep,
        reviewDueAt: r.reviewDueAt ?? null,
        updatedAt: r.updatedAt,
      })),
    })
  } catch (error) {
    next(error)
  }
})

// PUT /api/dsa/progress/:questId — set outcome (solved / guided / review)
dsaProgressRouter.put(
  '/:questId',
  rateLimit({
    getKey: (request) =>
      `${(request as AuthenticatedRequest).userId}:${request.params.questId}`,
    keyPrefix: 'dsa-progress-save',
    limit: 30,
    windowMs: 60_000,
  }),
  async (request, response, next) => {
    try {
      const { userId } = request as AuthenticatedRequest
      const questId = getQuestIdParam(request.params.questId)

      if (!questId || questId.length > 120) {
        response.status(400).json({ message: 'Invalid quest ID' })
        return
      }

      const { outcome } = request.body as { outcome?: unknown }

      if (!isValidOutcome(outcome)) {
        response.status(400).json({
          message: `Invalid outcome. Must be one of: ${dsaProgressOutcomes.join(', ')}`,
        })
        return
      }

      const reviewDueAt =
        outcome === 'review'
          ? new Date() // due immediately → show on review shelf today
          : addDays(reviewIntervalsInDays[0])

      const record = await DsaProgressModel.findOneAndUpdate(
        { userId, questId },
        {
          $set: {
            outcome,
            reviewStep: 0,
            reviewDueAt,
          },
        },
        { new: true, upsert: true },
      ).lean()

      response.json({
        questId: record.questId,
        outcome: record.outcome,
        reviewStep: record.reviewStep,
        reviewDueAt: record.reviewDueAt ?? null,
        updatedAt: record.updatedAt,
      })
    } catch (error) {
      next(error)
    }
  },
)

// PUT /api/dsa/progress/:questId/review — advance the spaced-repetition review step
dsaProgressRouter.put(
  '/:questId/review',
  rateLimit({
    getKey: (request) =>
      `${(request as AuthenticatedRequest).userId}:${request.params.questId}`,
    keyPrefix: 'dsa-review-step',
    limit: 30,
    windowMs: 60_000,
  }),
  async (request, response, next) => {
    try {
      const { userId } = request as AuthenticatedRequest
      const questId = getQuestIdParam(request.params.questId)

      if (!questId || questId.length > 120) {
        response.status(400).json({ message: 'Invalid quest ID' })
        return
      }

      const existing = await DsaProgressModel.findOne({ userId, questId }).lean()

      if (!existing) {
        response.status(404).json({ message: 'No progress found for this quest' })
        return
      }

      const nextReviewStep = existing.reviewStep + 1
      const nextInterval = reviewIntervalsInDays[nextReviewStep]
      const nextReviewDueAt = nextInterval ? addDays(nextInterval) : null

      const record = await DsaProgressModel.findOneAndUpdate(
        { userId, questId },
        {
          $set: {
            reviewStep: nextReviewStep,
            reviewDueAt: nextReviewDueAt,
          },
        },
        { new: true },
      ).lean()

      if (!record) {
        response.status(404).json({ message: 'Progress record not found' })
        return
      }

      response.json({
        questId: record.questId,
        outcome: record.outcome,
        reviewStep: record.reviewStep,
        reviewDueAt: record.reviewDueAt ?? null,
        updatedAt: record.updatedAt,
      })
    } catch (error) {
      next(error)
    }
  },
)
