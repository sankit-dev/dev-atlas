---
title: "CORS in MERN"
slug: "cors-in-mern"
description: "Understand why local React and Express apps hit CORS errors."
track: "MERN Integration"
priority: "Must Know"
---

# CORS in MERN

CORS often appears during local MERN development.

Example:

```text
React dev server: http://localhost:5173
Express API:      http://localhost:3000
```

Different port means different origin.

## Why browser blocks it

The browser protects users by not allowing random websites to read responses from other origins unless the server allows it.

Express must explicitly allow the React origin.

## Express setup

```js
import cors from 'cors'

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
```

## With cookies

If using cookies:

Frontend request:

```js
fetch('/api/me', {
  credentials: 'include',
})
```

Backend CORS must allow credentials.

Cookie options also matter.

## Common mistake

CORS is not authentication.

It does not stop non-browser clients. It only controls browser cross-origin access.

## Interview answer

CORS errors in MERN happen because React and Express often run on different origins during development. The Express server must allow the frontend origin using CORS headers. If cookies are used, both frontend requests and backend CORS config must include credentials. CORS is browser protection, not authentication.

