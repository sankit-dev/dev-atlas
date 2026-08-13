---
title: "API Contract"
slug: "api-contract"
description: "Define request and response shapes between frontend and backend."
track: "MERN Integration"
priority: "Must Know"
---

# API Contract

An API contract is the agreement between frontend and backend.

It defines:

- endpoint URL,
- HTTP method,
- request body,
- query params,
- response shape,
- error shape,
- status codes.

## Example contract

Create note:

```text
POST /api/notes
```

Request:

```json
{
  "title": "MongoDB notes",
  "body": "Learn schema design"
}
```

Success response:

```json
{
  "data": {
    "id": "123",
    "title": "MongoDB notes",
    "body": "Learn schema design"
  }
}
```

Error response:

```json
{
  "error": {
    "message": "Title is required"
  }
}
```

## Frontend usage example

React code becomes simpler when the contract is stable:

```js
async function createNote(input) {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error.message)
  }

  return result.data
}
```

This works because the frontend knows:

- success response has `data`,
- error response has `error.message`,
- validation failure returns non-2xx status.

## Backend usage example

Express should intentionally return the same shape:

```js
app.post('/api/notes', async (req, res, next) => {
  try {
    const note = await noteService.create(req.body)
    res.status(201).json({ data: note })
  } catch (error) {
    next(error)
  }
})
```

## Why contracts matter

Without a contract:

- frontend guesses response shapes,
- backend changes break UI,
- error handling becomes inconsistent,
- teams block each other.

## Common mistake

Do not return different response shapes from similar endpoints.

If one endpoint returns `{ data }` and another returns raw arrays, frontend code becomes messy.

## Interview answer

An API contract defines how frontend and backend communicate: method, URL, request shape, response shape, errors, and status codes. A clear contract prevents frontend/backend mismatch and makes full-stack development easier to test and maintain.
