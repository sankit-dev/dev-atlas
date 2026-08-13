---
title: "Role-based Authorization API"
slug: "role-based-authorization-api"
description: "Restrict routes by user role."
track: "Express.js"
priority: "Must Know"
---

# Role-based Authorization API

Role-based authorization restricts actions based on user role.

Example roles:

- user,
- moderator,
- admin.

## Requirement

Only admins can delete users:

```text
DELETE /users/:id
```

## Middleware

```js
function requireRole(...allowedRoles) {
  return function (req, res, next) {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    next()
  }
}
```

Usage:

```js
app.delete('/users/:id', requireAuth, requireRole('admin'), deleteUser)
```

## Test cases

Test:

- unauthenticated user gets `401`,
- normal user gets `403`,
- admin can delete,
- invalid user id returns `404`.

## Interview angle

Explain that authentication must run before authorization. Authentication sets `req.user`; authorization checks whether that user has the required role or permission.

