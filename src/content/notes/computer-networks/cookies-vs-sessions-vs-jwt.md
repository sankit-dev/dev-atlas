---
title: "Cookies vs Sessions vs JWT"
slug: "cookies-vs-sessions-vs-jwt"
description: "Authentication state mechanisms and when each one fits."
track: "Computer Networks"
---

Cookies, sessions, and JWTs are related but not the same thing.

- Cookies store small data in the browser.
- Sessions store login state on the server.
- JWT is a signed token format that can carry claims.

## Why We Need Them

HTTP is stateless. After login, every later request must carry some proof of identity.

## Cookies

A cookie is browser-managed key-value storage.

```text
Set-Cookie: sessionId=abc123
```

Future requests to the same domain include:

```text
Cookie: sessionId=abc123
```

Cookies can store session IDs, JWTs, preferences, theme, or language.

Important flags:

- `HttpOnly`: JavaScript cannot read it.
- `Secure`: sent only over HTTPS.
- `SameSite`: controls cross-site sending and helps reduce CSRF risk.

## Sessions

With sessions, the server stores user state.

```text
sessionId abc123 -> userId 42, role admin, expires 30 min
```

The browser stores only the session ID, usually in a cookie.

Advantages:

- Easy logout.
- Easy revocation.
- Sensitive data stays on the server.

Tradeoff:

- Server needs shared session storage when scaled across many instances.

## JWT

A JWT stores claims inside a signed token.

```json
{
  "userId": 42,
  "role": "admin",
  "exp": 1783000000
}
```

The server verifies the signature and expiry. It does not need a session lookup for basic validation.

JWTs are commonly sent as:

```text
Authorization: Bearer <token>
```

They can also be stored in cookies.

## Comparison

| Feature | Session | JWT |
| --- | --- | --- |
| User data stored | Server | Token |
| Server storage | Required | Not required for basic validation |
| Easy logout | Yes | Harder without revocation |
| Token size | Small session ID | Larger |
| Claims in token | No | Yes |

## Key Difference

| Cookie | Session | JWT |
| --- | --- | --- |
| Browser storage mechanism | Server-side auth state | Signed token format |

## Interview Notes

- Cookies are not an alternative to sessions or JWTs.
- Sessions often use cookies to store session IDs.
- JWTs can be stored in cookies or browser storage.
- JWT payload is encoded, not encrypted, unless additional encryption is used.
- HTTPS protects tokens in transit.
