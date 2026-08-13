---
title: "Rate Limiting in Express"
slug: "rate-limiting-in-express"
description: "Protect APIs from repeated abusive requests."
track: "Express.js"
priority: "Important"
---

# Rate Limiting in Express

Rate limiting controls how often a client can call an API.

Example:

> Allow 100 requests per 15 minutes per IP.

## Why rate limiting exists

It protects against:

- brute force login attempts,
- spam,
- scraping,
- accidental frontend loops,
- expensive repeated requests.

## Middleware idea

```js
function rateLimiter(req, res, next) {
  const key = req.ip

  if (!isAllowed(key)) {
    return res.status(429).json({
      error: 'Too many requests',
    })
  }

  next()
}
```

Then:

```js
app.use('/login', rateLimiter)
```

## In-memory vs shared store

In-memory rate limiting works only for one server process.

If you run multiple servers, each server has separate memory.

For production, use a shared store like Redis.

## Interview answer

Rate limiting restricts repeated API calls from a client over a time window. In Express, it is usually implemented as middleware. In-memory rate limiting can work for simple single-process apps, but production multi-instance systems usually need a shared store like Redis.

