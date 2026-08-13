---
title: "CORS in Express"
slug: "cors-in-express"
description: "Allow controlled browser access from other origins."
track: "Express.js"
priority: "Must Know"
---

# CORS in Express

CORS means Cross-Origin Resource Sharing.

It is a browser security mechanism.

## Why CORS happens

During local MERN development:

```text
React:   http://localhost:5173
Express: http://localhost:3000
```

These are different origins because the ports are different.

When React calls Express, the browser checks whether the Express server allows that origin.

## Express CORS setup

```js
import cors from 'cors'

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
```

## What CORS is not

CORS is not backend authentication.

It does not stop non-browser clients like curl or Postman from calling your API.

It only controls browser-based cross-origin access.

## Common mistake

Do not blindly use:

```js
app.use(cors())
```

for every production API without thinking.

Be explicit about allowed origins, especially when credentials/cookies are involved.

## Interview answer

CORS is a browser security mechanism that controls whether a frontend from one origin can access resources from another origin. In Express, the `cors` middleware can allow specific origins and credentials. CORS is not authentication; it only affects browser-enforced cross-origin requests.

