---
title: "URL Shortener API"
slug: "url-shortener-api"
description: "Build a common backend machine-coding project."
track: "Express.js"
priority: "Important"
---

# URL Shortener API

A URL shortener is a common backend coding project.

It tests routing, validation, database design, redirects, and edge cases.

## Core routes

```text
POST /urls
GET /:slug
GET /urls/:id/stats
```

## Create short URL

Input:

```json
{
  "longUrl": "https://example.com/some/long/path"
}
```

Response:

```json
{
  "slug": "aB12xY",
  "shortUrl": "https://short.ly/aB12xY"
}
```

## Data model

```js
const urlSchema = new Schema(
  {
    longUrl: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    clickCount: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    expiresAt: Date,
  },
  { timestamps: true },
)
```

Useful indexes:

```js
urlSchema.index({ slug: 1 }, { unique: true })
urlSchema.index({ createdBy: 1, createdAt: -1 })
```

## Slug generation

Simple version:

```js
function createSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let slug = ''

  for (let i = 0; i < length; i += 1) {
    slug += chars[Math.floor(Math.random() * chars.length)]
  }

  return slug
}
```

In real code, handle collision by checking whether the slug already exists.

## Redirect flow

When user visits:

```text
GET /aB12xY
```

Server:

1. finds slug in database,
2. increments click count,
3. redirects to long URL.

```js
res.redirect(url.longUrl)
```

## Edge cases

Handle:

- invalid URL,
- duplicate slug,
- missing slug,
- expired links,
- analytics count,
- malicious URLs if required.

## Test cases

- creates short URL for valid long URL,
- rejects invalid URL,
- redirects existing slug,
- returns `404` for missing slug,
- increments click count after redirect,
- handles slug collision.

## Interview angle

Explain slug generation, uniqueness, redirect route, validation, database schema, and analytics. Mention that high-scale URL shorteners need caching and collision handling.
