import { Router } from 'express'
import {
  requireAuth,
  type AuthenticatedRequest,
} from '../middleware/requireAuth.js'
import { rateLimit } from '../middleware/rateLimit.js'
import { NoteProgressModel } from '../models/NoteProgress.js'

export const noteProgressRouter = Router()

const noteSaveDeduplicationWindowMs = 15_000
const maxSyncBatchSize = 500

noteProgressRouter.use(requireAuth)

noteProgressRouter.use(
  rateLimit({
    getKey: (request) => (request as AuthenticatedRequest).userId,
    keyPrefix: 'note-progress',
    limit: 120,
    windowMs: 60_000,
  }),
)

function getCompletedNoteSlugs(body: unknown) {
  if (
    !body ||
    typeof body !== 'object' ||
    !('completedNoteSlugs' in body) ||
    !Array.isArray(body.completedNoteSlugs)
  ) {
    return []
  }

  return body.completedNoteSlugs.filter(
    (noteSlug): noteSlug is string =>
      typeof noteSlug === 'string' &&
      noteSlug.trim().length > 0 &&
      noteSlug.length <= 160,
  )
}

function getNoteSlugParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value.trim() : ''
}

noteProgressRouter.get(
  '/',
  rateLimit({
    getKey: (request) => (request as AuthenticatedRequest).userId,
    keyPrefix: 'note-progress-get',
    limit: 60,
    windowMs: 60_000,
  }),
  async (request, response, next) => {
  try {
    const { userId } = request as AuthenticatedRequest

    const progress = await NoteProgressModel.find({
      userId,
      completed: true,
    })
      .select('noteSlug completed updatedAt')
      .lean()

    response.json({
      completedNoteSlugs: progress.map((item) => item.noteSlug),
    })
  } catch (error) {
    next(error)
  }
})

noteProgressRouter.post(
  '/sync',
  rateLimit({
    getKey: (request) => (request as AuthenticatedRequest).userId,
    keyPrefix: 'note-progress-sync',
    limit: 10,
    windowMs: 60_000,
  }),
  async (request, response, next) => {
  try {
    const { userId } = request as AuthenticatedRequest

    const completedNoteSlugs = [...new Set(getCompletedNoteSlugs(request.body))]

    if (completedNoteSlugs.length > maxSyncBatchSize) {
      response.status(400).json({
        message: `Too many notes in one sync. Limit is ${maxSyncBatchSize}.`,
      })
      return
    }

    const now = new Date()

    if (completedNoteSlugs.length > 0) {
      await NoteProgressModel.bulkWrite(
        completedNoteSlugs.map((noteSlug) => ({
          updateOne: {
            filter: { userId, noteSlug },
            update: {
              $set: {
                completed: true,
                lastReviewedAt: now,
              },
              $setOnInsert: {
                reviewStep: 0,
              },
            },
            upsert: true,
          },
        })),
      )
    }

    const progress = await NoteProgressModel.find({
      userId,
      completed: true,
    })
      .select('noteSlug')
      .lean()

    response.json({
      completedNoteSlugs: progress.map((item) => item.noteSlug),
    })
  } catch (error) {
    next(error)
  }
})

noteProgressRouter.put(
  '/:noteSlug',
  rateLimit({
    getKey: (request) =>
      `${(request as AuthenticatedRequest).userId}:${request.params.noteSlug}`,
    keyPrefix: 'note-progress-save',
    limit: 6,
    windowMs: 60_000,
  }),
  async (request, response, next) => {
    try {
      const { userId } = request as AuthenticatedRequest
      const noteSlug = getNoteSlugParam(request.params.noteSlug)

      if (!noteSlug || noteSlug.length > 160) {
        response.status(400).json({ message: 'Invalid note slug' })
        return
      }

      const existingProgress = await NoteProgressModel.findOne({
        userId,
        noteSlug,
      }).lean()

      if (existingProgress?.completed) {
        const updatedAt = existingProgress.updatedAt
          ? new Date(existingProgress.updatedAt).getTime()
          : 0
        const isDuplicateSave =
          Date.now() - updatedAt < noteSaveDeduplicationWindowMs

        response.json({
          completed: true,
          duplicate: isDuplicateSave,
          noteSlug: existingProgress.noteSlug,
        })
        return
      }

      const progress = await NoteProgressModel.findOneAndUpdate(
        { userId, noteSlug },
        {
          $set: {
            completed: true,
            lastReviewedAt: new Date(),
          },
          $setOnInsert: {
            reviewStep: 0,
          },
        },
        {
          new: true,
          upsert: true,
        },
      ).lean()

      response.json({
        completed: progress.completed,
        duplicate: false,
        noteSlug: progress.noteSlug,
      })
    } catch (error) {
      next(error)
    }
  },
)
