---
title: "Cookie Sessions"
slug: "cookie-sessions"
description: "Store auth state with cookies and server/session strategy."
track: "Express.js"
priority: "Important"
---

# Cookie Sessions

Cookie/session auth is another common authentication strategy.

Instead of sending a JWT in an Authorization header, the browser sends a cookie automatically.

## Basic session idea

1. User logs in.
2. Server creates a session id.
3. Server stores session data.
4. Server sends session id in a cookie.
5. Browser sends cookie on future requests.
6. Server uses session id to find the user session.

## Cookie settings

Important cookie options:

- `httpOnly`: JavaScript cannot read the cookie.
- `secure`: send only over HTTPS.
- `sameSite`: controls cross-site sending.
- `maxAge`: expiration time.

Example:

```js
res.cookie('sessionId', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
})
```

## JWT vs sessions

| Strategy | Where auth state lives |
| --- | --- |
| JWT | Usually in token claims |
| Session | Server-side session store |

Sessions make invalidation easier because the server can delete the session.

JWT can be more stateless, but invalidation needs extra design.

## Common mistake

Do not store sensitive auth cookies without `httpOnly` in real apps.

If JavaScript can read the cookie, XSS risk becomes worse.

## Interview answer

Cookie-session authentication stores a session id in a browser cookie and keeps session data on the server or a session store. The browser sends the cookie automatically. Secure session cookies should use options like `httpOnly`, `secure`, and `sameSite`.

