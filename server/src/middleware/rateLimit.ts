import type { NextFunction, Request, Response } from 'express'

type RateLimitOptions = {
  keyPrefix: string
  limit: number
  windowMs: number
  getKey?: (request: Request) => string
}

type RateLimitBucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, RateLimitBucket>()

function getDefaultKey(request: Request) {
  return request.ip || request.socket.remoteAddress || 'unknown'
}

function pruneExpiredBuckets(now: number) {
  if (buckets.size < 1000) {
    return
  }

  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) {
      buckets.delete(key)
    }
  })
}

export function rateLimit({
  getKey = getDefaultKey,
  keyPrefix,
  limit,
  windowMs,
}: RateLimitOptions) {
  return (request: Request, response: Response, next: NextFunction) => {
    const now = Date.now()
    const key = `${keyPrefix}:${getKey(request)}`
    const existingBucket = buckets.get(key)
    const bucket =
      existingBucket && existingBucket.resetAt > now
        ? existingBucket
        : { count: 0, resetAt: now + windowMs }

    bucket.count += 1
    buckets.set(key, bucket)
    pruneExpiredBuckets(now)

    response.setHeader('RateLimit-Limit', String(limit))
    response.setHeader('RateLimit-Remaining', String(Math.max(0, limit - bucket.count)))
    response.setHeader('RateLimit-Reset', String(Math.ceil(bucket.resetAt / 1000)))

    if (bucket.count > limit) {
      response
        .status(429)
        .json({ message: 'Too many requests. Please try again shortly.' })
      return
    }

    next()
  }
}
