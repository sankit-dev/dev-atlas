---
title: "Controllers and Services"
slug: "controllers-and-services"
description: "Separate HTTP handling from business logic."
track: "Express.js"
priority: "Must Know"
---

# Controllers and Services

As an Express app grows, putting all logic inside route handlers becomes messy.

Controllers and services help separate responsibilities.

## Controller

A controller handles HTTP concerns:

- read params/query/body,
- call service,
- choose response status,
- send JSON response,
- pass errors to middleware.

Example:

```js
export async function createUserController(req, res, next) {
  try {
    const user = await userService.createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}
```

## Service

A service handles business logic:

- validation rules beyond shape,
- database operations,
- calculations,
- domain decisions,
- calling other services.

Example:

```js
export async function createUser(input) {
  const existingUser = await User.findOne({ email: input.email })

  if (existingUser) {
    throw new Error('Email already exists')
  }

  return User.create(input)
}
```

## Why this matters

If everything sits inside routes:

- code becomes hard to test,
- logic gets duplicated,
- controllers become huge,
- changing business rules becomes risky.

## Simple folder idea

```text
src/
  routes/
  controllers/
  services/
  models/
  middlewares/
```

## Interview answer

Controllers handle HTTP-specific work such as reading request data and sending responses. Services contain business logic and database operations. Separating them makes Express apps easier to test, reuse, and maintain.

