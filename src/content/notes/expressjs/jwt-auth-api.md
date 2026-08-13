---
title: "JWT Auth API"
slug: "jwt-auth-api"
description: "Build login, register, and protected routes."
track: "Express.js"
priority: "Must Know"
---

# JWT Auth API

A JWT auth API proves you understand authentication flow.

## Routes

```text
POST /auth/register
POST /auth/login
GET /auth/me
```

## Register flow

1. Validate name, email, password.
2. Check if email already exists.
3. Hash password.
4. Save user.
5. Return safe user data or token.

Never store plain text passwords.

## Login flow

1. Find user by email.
2. Compare password with stored hash.
3. Create JWT if valid.
4. Return token or set cookie.

## Protected route middleware

```js
function requireAuth(req, res, next) {
  const token = getTokenFromRequest(req)

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  req.user = verifyToken(token)
  next()
}
```

## Common mistake

Do not return password hash in API responses.

Even hashed passwords should stay server-side.

## Interview angle

Explain register, login, password hashing, token generation, token verification middleware, protected routes, and safe response shape.

