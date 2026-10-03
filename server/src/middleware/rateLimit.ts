import type { Request } from 'express'
import { isIP } from 'node:net'
import {
  ipKeyGenerator,
  rateLimit as expressRateLimit,
  type ClientRateLimitInfo,
  type Store,
} from 'express-rate-limit'
import mongoose from 'mongoose'

type RateLimitOptions = {
  keyPrefix: string
  limit: number
  windowMs: number
  getKey?: (request: Request) => string
  skip?: (request: Request) => boolean
}

type RateLimitDocument = {
  _id: string
  count: number
  resetAt: Date
}

const collectionName = 'ratelimits'
let ttlIndexRequested = false

function getCollection() {
  return mongoose.connection.collection<RateLimitDocument>(collectionName)
}

function ensureTtlIndex() {
  if (ttlIndexRequested) {
    return
  }

  ttlIndexRequested = true
  // Mongo removes expired windows on its own; the TTL monitor runs about once
  // a minute, so increment() also treats past-due windows as fresh.
  getCollection()
    .createIndex({ resetAt: 1 }, { expireAfterSeconds: 0 })
    .catch((error) => {
      ttlIndexRequested = false
      console.error('[rateLimit] failed to create TTL index', error)
    })
}

// Fixed-window counter shared by every server instance and preserved across
// restarts, unlike the default in-memory store. The request that first goes
// over the limit restarts the window, so a blocked client always gets a full
// cooldown of windowMs before it is let back in.
class MongoStore implements Store {
  prefix: string
  localKeys = false
  private windowMs = 60_000

  constructor(
    prefix: string,
    private limit: number,
  ) {
    this.prefix = `${prefix}:`
  }

  init(options: { windowMs: number }) {
    this.windowMs = options.windowMs
    ensureTtlIndex()
  }

  async get(key: string): Promise<ClientRateLimitInfo | undefined> {
    const doc = await getCollection().findOne({ _id: this.prefix + key })

    if (!doc || doc.resetAt.getTime() <= Date.now()) {
      return undefined
    }

    return { totalHits: doc.count, resetTime: doc.resetAt }
  }

  async increment(key: string): Promise<ClientRateLimitInfo> {
    const now = new Date()
    const nextReset = new Date(now.getTime() + this.windowMs)
    const windowExpired = {
      $or: [{ $not: ['$resetAt'] }, { $lte: ['$resetAt', now] }],
    }

    // Single atomic pipeline update: start a new window when the old one has
    // expired, otherwise bump the counter.
    const doc = await getCollection().findOneAndUpdate(
      { _id: this.prefix + key },
      [
        {
          $set: {
            count: { $cond: [windowExpired, 1, { $add: ['$count', 1] }] },
            resetAt: { $cond: [windowExpired, nextReset, '$resetAt'] },
          },
        },
        {
          $set: {
            resetAt: {
              $cond: [{ $eq: ['$count', this.limit + 1] }, nextReset, '$resetAt'],
            },
          },
        },
      ],
      { returnDocument: 'after', upsert: true },
    )

    return {
      totalHits: doc?.count ?? 1,
      resetTime: doc?.resetAt ?? nextReset,
    }
  }

  async decrement(key: string) {
    await getCollection().updateOne(
      { _id: this.prefix + key, count: { $gt: 0 } },
      { $inc: { count: -1 } },
    )
  }

  async resetKey(key: string) {
    await getCollection().deleteOne({ _id: this.prefix + key })
  }
}

export function getIpKey(request: Request) {
  // Groups IPv6 addresses by /56 so one client can't rotate through its range.
  return ipKeyGenerator(getClientIp(request))
}

// /api/auth/* reaches us through the Vercel rewrite, where req.ip is Vercel's
// egress address. Vercel puts the visitor's IP in x-vercel-forwarded-for.
// Anyone can send that header straight to Render, so it is only honoured on
// auth routes; everything else keeps the un-spoofable req.ip.
function getVercelClientIp(request: Request) {
  // originalUrl, not path: inside a router, path is relative to the mount.
  if (!request.originalUrl.startsWith('/api/auth')) return null

  const header = request.header('x-vercel-forwarded-for')?.split(',')[0]?.trim()

  return header && isIP(header) ? header : null
}

export function getClientIp(request: Request) {
  return (
    getVercelClientIp(request) ??
    request.ip ??
    request.socket.remoteAddress ??
    'unknown'
  )
}

export function rateLimit({
  getKey = getIpKey,
  keyPrefix,
  limit,
  skip,
  windowMs,
}: RateLimitOptions) {
  return expressRateLimit({
    keyGenerator: getKey,
    legacyHeaders: false,
    limit,
    message: { message: 'Too many requests. Please try again shortly.' },
    // If Mongo is unreachable, let traffic through rather than taking the API down.
    passOnStoreError: true,
    ...(skip ? { skip } : {}),
    standardHeaders: 'draft-7',
    store: new MongoStore(keyPrefix, limit),
    windowMs,
  })
}
