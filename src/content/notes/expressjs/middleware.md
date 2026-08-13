---
title: "Middleware"
slug: "middleware"
description: "How Express runs request logic in a chain."
track: "Express.js"
priority: "Must Know"
---

# Middleware

Middleware is one of the most important Express concepts.

A middleware function runs during the request-response cycle.

It can:

- read the request,
- modify the request,
- send a response,
- call the next middleware,
- handle errors.

## Basic middleware

```js
function logger(req, res, next) {
  console.log(req.method, req.url)
  next()
}

app.use(logger)
```

`next()` passes control to the next middleware or route handler.

## Request flow

```text
request -> middleware -> middleware -> route handler -> response
```

Example:

```js
app.use(express.json())
app.use(logger)
app.get('/users', getUsers)
```

Express runs them in order.

## Real request pipeline example

For a protected create-note API, the request may pass through this pipeline:

```text
POST /notes
-> express.json()
-> requestLogger
-> requireAuth
-> validateCreateNote
-> createNoteController
-> errorHandler if something fails
```

Express code:

```js
app.post(
  '/notes',
  requireAuth,
  validateCreateNote,
  createNoteController,
)
```

Each middleware has one job:

- `requireAuth`: checks who the user is.
- `validateCreateNote`: checks request body.
- `createNoteController`: creates the note.

This keeps route logic readable.

## Middleware can protect routes

```js
function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  next()
}

app.get('/profile', requireAuth, getProfile)
```

## Error middleware

Error middleware has four parameters:

```js
function errorHandler(error, req, res, next) {
  res.status(500).json({ error: 'Something went wrong' })
}
```

## Common mistake

If middleware does not send a response and does not call `next()`, the request hangs.

Bad:

```js
function broken(req, res, next) {
  console.log('hello')
}
```

## Interview answer

Middleware functions run in order during Express's request-response cycle. They can inspect or modify the request, send a response, call `next()` to continue, or pass errors to error-handling middleware. Middleware is commonly used for logging, authentication, validation, parsing, and error handling.
