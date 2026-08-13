---
title: "Authorization"
slug: "authorization"
description: "Control what authenticated users are allowed to do."
track: "Express.js"
priority: "Must Know"
---

# Authorization

Authorization answers:

> What is this user allowed to do?

Authentication comes first. Authorization comes after.

## Example

A user is logged in.

Can they delete another user's account?

That is an authorization question.

## Role-based authorization

```js
function requireRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    next()
  }
}

app.delete('/users/:id', requireAuth, requireRole('admin'), deleteUser)
```

## Ownership check

Not all authorization is role-based.

Sometimes the user must own the resource.

```js
if (note.userId !== req.user.id) {
  return res.status(403).json({ error: 'Forbidden' })
}
```

## 401 vs 403

| Status | Meaning |
| --- | --- |
| 401 | User is not authenticated |
| 403 | User is authenticated but not allowed |

## Interview answer

Authentication verifies who the user is. Authorization checks what that authenticated user is allowed to do. Express apps commonly implement authorization with middleware for roles and ownership checks. `401` means unauthenticated, while `403` means authenticated but forbidden.

