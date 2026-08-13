---
title: "Authentication and JWT"
slug: "authentication-and-jwt"
description: "Verify user identity with tokens."
track: "Express.js"
priority: "Must Know"
---

# Authentication and JWT

Authentication answers:

> Who is this user?

JWT is one common way to represent authenticated user identity.

## Basic login flow

1. User sends email and password.
2. Server verifies credentials.
3. Server creates a JWT.
4. Client stores the token.
5. Client sends token with future requests.
6. Server verifies token before allowing protected access.

## Token in Authorization header

```text
Authorization: Bearer <token>
```

Express middleware:

```js
function requireAuth(req, res, next) {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = header.slice('Bearer '.length)
  // verify token here
  next()
}
```

## Real Express example

Login route:

```js
app.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !(await comparePassword(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = signToken({
      userId: user._id,
      role: user.role,
    })

    res.json({ token })
  } catch (error) {
    next(error)
  }
})
```

Protected route:

```js
app.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})
```

The login route creates the token. The protected route trusts only verified tokens.

## What JWT contains

A JWT can contain claims like:

- user id,
- role,
- issued time,
- expiry time.

Do not store sensitive secrets inside JWT payload. JWT payload can be decoded by the client.

## Common mistake

JWT signing is not encryption.

Signed means the server can verify the token was not modified.

It does not mean the payload is hidden.

## Interview answer

Authentication verifies user identity. With JWT authentication, the server verifies credentials and issues a signed token. The client sends that token on future requests, and middleware verifies it before allowing protected routes. JWT payload should not contain sensitive secrets because it is encoded, not encrypted.
