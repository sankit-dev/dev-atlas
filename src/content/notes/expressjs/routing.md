---
title: "Routing"
slug: "routing"
description: "Map HTTP methods and URLs to handler functions."
track: "Express.js"
priority: "Must Know"
---

# Routing

Routing decides what code should run for a specific HTTP request.

A route usually depends on:

- HTTP method,
- URL path.

## Basic routes

```js
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Asha' }])
})

app.post('/users', (req, res) => {
  res.status(201).json({ message: 'User created' })
})
```

`GET /users` and `POST /users` are different routes.

They use the same path, but different HTTP methods.

## Common HTTP methods

| Method | Meaning |
| --- | --- |
| GET | Read data |
| POST | Create data |
| PUT | Replace data |
| PATCH | Partially update data |
| DELETE | Delete data |

## Route params

```js
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id })
})
```

For `/users/42`, `req.params.id` is `42`.

## Router

For larger apps, use `express.Router`.

```js
import { Router } from 'express'

const router = Router()

router.get('/', getUsers)
router.post('/', createUser)

export default router
```

Then mount it:

```js
app.use('/users', userRouter)
```

## Common mistake

Route order matters.

Put specific routes before broad dynamic routes.

```js
app.get('/users/me', getCurrentUser)
app.get('/users/:id', getUserById)
```

If `/:id` comes first, `/me` may be treated as an id.

## Interview answer

Routing in Express maps an HTTP method and path to a handler function. For example, `GET /users` can return users, while `POST /users` can create a user. Express Router helps split routes into separate modules for maintainability.

