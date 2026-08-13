---
title: "URL Shortener"
slug: "url-shortener"
description: "Build slug generation, redirects, analytics, and validation."
track: "MERN Integration"
priority: "Important"
---

# URL Shortener

A URL shortener is a common full-stack machine-coding project.

## Features

- submit long URL,
- generate short slug,
- redirect short URL,
- track click count,
- show analytics,
- optional login for managing links.

## Backend routes

```text
POST /api/urls
GET /:slug
GET /api/urls/:id/stats
```

## MongoDB model

```js
const urlSchema = new Schema({
  longUrl: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clickCount: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })
```

## Redirect flow

1. User visits `/:slug`.
2. Backend finds URL by slug.
3. Backend increments click count.
4. Backend redirects to long URL.

```js
res.redirect(url.longUrl)
```

## Edge cases

- invalid URL,
- slug collision,
- missing slug,
- expired URL,
- malicious links,
- analytics accuracy.

## What this project proves

- routing,
- validation,
- unique indexes,
- redirect behavior,
- analytics updates,
- practical API/UI integration.

