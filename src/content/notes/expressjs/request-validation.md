---
title: "Request Validation"
slug: "request-validation"
description: "Validate input before it reaches business logic."
track: "Express.js"
priority: "Must Know"
---

# Request Validation

Never trust client input.

React validation improves UX, but backend validation protects the system.

## What to validate

Validate:

- required fields,
- data types,
- string length,
- number ranges,
- enum values,
- email format,
- object ids,
- file types and sizes.

## Simple validation middleware

```js
function validateCreateUser(req, res, next) {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required',
    })
  }

  next()
}

app.post('/users', validateCreateUser, createUser)
```

## Why validation should be early

Validation should happen before:

- database queries,
- business logic,
- external API calls,
- file processing.

Bad input should be rejected quickly.

## Common mistake

Do not rely only on frontend validation.

Anyone can bypass frontend validation by calling your API directly with Postman, curl, browser devtools, or custom scripts.

## Interview answer

Request validation checks incoming params, query, body, headers, or files before business logic runs. It protects the backend from invalid or malicious input. Frontend validation is useful for UX, but backend validation is required for security and correctness.

