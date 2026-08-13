---
title: "In-memory Rate Limiter"
slug: "in-memory-rate-limiter"
description: "Limit repeated requests using Map and time windows."
track: "Node.js"
priority: "Must Know"
---

# In-memory Rate Limiter

A rate limiter restricts how often a user or IP can perform an action.

Example:

> Allow only 5 login attempts per minute.

## Why rate limiting exists

Rate limiting protects APIs from:

- brute force login attempts,
- spam,
- accidental loops,
- abusive clients,
- expensive repeated requests.

## Simple fixed-window limiter

```js
const attempts = new Map()

function isAllowed(key, limit, windowMs) {
  const now = Date.now()
  const record = attempts.get(key)

  if (!record || now > record.resetAt) {
    attempts.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count += 1
  return true
}
```

Usage:

```js
if (!isAllowed('user-ip', 5, 60_000)) {
  return { error: 'Too many requests' }
}
```

## Express middleware version

```js
function createRateLimiter({ limit, windowMs }) {
  const attempts = new Map()

  return function rateLimiter(req, res, next) {
    const key = req.ip

    if (!isAllowedWithStore(attempts, key, limit, windowMs)) {
      return res.status(429).json({
        error: 'Too many requests',
      })
    }

    next()
  }
}
```

Usage:

```js
app.post(
  '/auth/login',
  createRateLimiter({ limit: 5, windowMs: 60_000 }),
  loginController,
)
```

This is a realistic coding-round extension: first build the pure function, then wrap it as middleware.

## Test cases

Test these cases:

- first request is allowed,
- request within limit is allowed,
- request after limit is blocked,
- request after window reset is allowed,
- different IPs have separate counters.

## Limitations

In-memory rate limiters reset when the server restarts.

They also do not work correctly across multiple server instances.

For production distributed systems, use Redis or another shared store.

## Interview answer

A rate limiter controls how often a client can perform an action. A simple in-memory fixed-window limiter can store request counts in a Map with reset times. It works for one server process, but production multi-instance systems usually need a shared store like Redis.
