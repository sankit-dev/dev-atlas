---
title: "Full-stack Error Handling"
slug: "full-stack-error-handling"
description: "Handle errors consistently from database to UI."
track: "MERN Integration"
priority: "Must Know"
---

# Full-stack Error Handling

Errors should move through the stack in a predictable way.

```text
MongoDB/Mongoose error -> service -> controller -> Express error middleware -> React UI
```

## Backend error shape

Use a consistent response:

```json
{
  "error": {
    "message": "Note not found"
  }
}
```

## Express error middleware

```js
function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500

  res.status(statusCode).json({
    error: {
      message: error.message || 'Internal server error',
    },
  })
}
```

## React error handling

React should show useful states:

- loading,
- empty,
- validation error,
- unauthorized,
- server error,
- retry option where useful.

## Common mistake

Do not expose raw database or stack errors to users.

Bad:

```json
{
  "error": "MongoServerError: E11000 duplicate key..."
}
```

Map internal errors to user-safe messages.

## Interview answer

Full-stack error handling means backend errors are converted into consistent status codes and response shapes, and React displays appropriate UI states. Internal errors should be logged server-side but not leaked to users. The frontend should handle loading, validation, auth, empty, and server error states clearly.

