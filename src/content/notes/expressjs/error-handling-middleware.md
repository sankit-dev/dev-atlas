---
title: "Error Handling Middleware"
slug: "error-handling-middleware"
description: "Centralize errors and responses in Express."
track: "Express.js"
priority: "Must Know"
---

# Error Handling Middleware

Errors should be handled consistently.

If every route builds its own error response, the API becomes inconsistent.

Express supports centralized error-handling middleware.

## Error middleware shape

Error middleware has four parameters:

```js
function errorHandler(error, req, res, next) {
  res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  })
}
```

The four parameters matter. Express recognizes it as error middleware because of them.

## Passing errors

Use `next(error)`:

```js
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await findUser(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})
```

## Custom error class

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}
```

Then:

```js
throw new AppError('User not found', 404)
```

## Common mistake

Do not leak internal error details in production.

Bad:

```js
res.status(500).json({ stack: error.stack })
```

Stack traces can reveal sensitive implementation details.

## Interview answer

Express error-handling middleware centralizes API error responses. Route handlers can pass errors with `next(error)`, and the error middleware decides the status code and response shape. In production, internal details like stack traces should not be exposed to clients.

