---
title: "Todo App with Auth"
slug: "todo-app-with-auth"
description: "Build auth, CRUD, protected routes, and user-owned data."
track: "MERN Integration"
priority: "Must Know"
---

# Todo App with Auth

This is the best first MERN project.

It is small, but it touches the full stack.

## Features

- register,
- login,
- logout,
- create todo,
- list my todos,
- update todo,
- delete todo,
- mark complete,
- protected dashboard.

## Backend routes

```text
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
POST /api/todos
GET /api/todos
PATCH /api/todos/:id
DELETE /api/todos/:id
```

## API contract examples

Create todo:

```text
POST /api/todos
```

Request:

```json
{
  "title": "Revise event loop"
}
```

Response:

```json
{
  "data": {
    "id": "todo_1",
    "title": "Revise event loop",
    "completed": false
  }
}
```

List todos:

```text
GET /api/todos
```

Response:

```json
{
  "data": [
    {
      "id": "todo_1",
      "title": "Revise event loop",
      "completed": false
    }
  ]
}
```

## MongoDB model

```js
const todoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true })
```

## Important rule

Every todo query must include `userId`.

Bad:

```js
Todo.findById(req.params.id)
```

Better:

```js
Todo.findOne({ _id: req.params.id, userId: req.user.id })
```

## Frontend screens

Build these screens:

- register,
- login,
- todo dashboard,
- create/edit form,
- empty state,
- loading state,
- error state.

## Test scenarios

- logged-out user cannot see dashboard,
- logged-out user cannot call todo APIs,
- user can create a todo,
- user can update only their own todo,
- user can delete only their own todo,
- empty todo list shows a clean empty state.

## What this project proves

- auth flow,
- protected APIs,
- protected React routes,
- CRUD,
- ownership checks,
- form handling,
- loading/error UI states.
