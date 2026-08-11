---
title: "Cookies vs Sessions vs JWT"
slug: "cookies-vs-sessions-vs-jwt"
description: "Authentication state mechanisms and when each one fits."
track: "Computer Networks"
---

A lot of beginners think Cookies, Sessions, and JWT are competing technologies.

They're not.

- **Cookies** are a way to **store data in the browser**.
- **Sessions** are a way to **store user state on the server**.
- **JWT** is a way to **store user information inside a signed token**, usually without server-side session storage.
---
# 1. Why Do We Need Authentication?
HTTP is **stateless**.

That means every request is independent.

Example:

```plain text
GET /profile
```

The server receives:

- Method
- Headers
- Body

But it has **no memory** of previous requests.

Imagine:

```plain text
POST /login
```

You log in successfully.

Five seconds later:

```plain text
GET /profile
```

How does the server know **this request is from the same logged-in user?**

It doesn't—unless some form of identity is sent with every request.

This is where Cookies, Sessions, and JWT come in.
---
# 2. Cookies
A cookie is a **small piece of data stored by the browser**.

The server tells the browser to save it.

Example login response:

```plain text
HTTP/1.1 200 OK

Set-Cookie: sessionId=abc123
```

The browser stores:

```plain text
sessionId = abc123
```

Every future request to the same domain automatically includes it:

```plain text
GET /profile

Cookie: sessionId=abc123
```

Notice:

The frontend doesn't need to manually add the cookie.

The browser handles it automatically.
---
## Important
A cookie is **just storage**.

It doesn't authenticate users by itself.

It can store:

- Session IDs
- JWTs
- User preferences
- Theme
- Language

Think of it like a small key-value storage managed by the browser.
---
# 3. Sessions
A session means **the server stores the user's login state**.

Example:

User logs in.

Server creates:

```plain text
Session ID:
abc123
```

Server database (or memory):

```plain text
abc123
↓

User ID = 42
Name = Alice
Role = Admin
Expires = 30 minutes
```

The server sends only the session ID:

```plain text
Set-Cookie:

sessionId=abc123
```

Browser stores:

```plain text
sessionId=abc123
```

Future request:

```plain text
Cookie:

sessionId=abc123
```

Server:

```plain text
Find session

↓

User ID = 42

↓

Authenticated
```
---
## Session Flow

```plain text
User Login
      │
      ▼
Server creates Session
      │
      ▼
sessionId = abc123
      │
      ▼
Browser stores Cookie
      │
      ▼
Every request sends Cookie
      │
      ▼
Server looks up session
      │
      ▼
User authenticated
```
---
## Advantages
- Easy logout (delete the session)
- Server controls everything
- Easy to invalidate sessions
- Sensitive user data stays on the server
---
## Disadvantages
Server must store every user's session.

If you have:

```plain text
5 million users
```

You need somewhere to store 5 million sessions.

Large applications often use shared stores like Redis so multiple backend servers can access the same sessions.
---
# 4. JWT (JSON Web Token)
JWT takes a different approach.

Instead of storing user data on the server...

...the server stores it **inside the token**.

Example payload:

```json
{
  "userId": 42,
  "role": "admin",
  "exp": 1783000000
}
```

The server signs it with a secret key.

Result:

```plain text
eyJhbGciOi...
```

This long string is the JWT.
---
Login:

```plain text
POST /login
```

Server:

```plain text
Create JWT

↓

Return JWT
```

Browser stores it.

For future requests:

```plain text
Authorization:

Bearer eyJhbGc...
```

Server verifies:

- Signature
- Expiry
- Integrity

If valid:

Authenticated.
---
## JWT Flow

```plain text
Login
   │
   ▼
Server creates JWT
   │
   ▼
Browser stores JWT
   │
   ▼
Authorization:
Bearer <token>
   │
   ▼
Server verifies signature
   │
   ▼
Authenticated
```
---
# 5. Where Is JWT Stored?
JWT can be stored in:

- Memory
- Local Storage
- Session Storage
- Cookies

JWT is **not** tied to one storage mechanism.

Many people incorrectly think JWT always means Local Storage.

It doesn't.
---
# 6. Sessions vs JWT
## Sessions

```plain text
Browser
↓

sessionId = abc123

↓

Server

Session Table

abc123

↓

User 42
```

Server stores state.
---
## JWT

```plain text
Browser

JWT

↓

Server

Verify Signature

↓

Done
```

No session lookup is required if you're relying solely on the token.
---
# 7. Comparison

<table header-row="true">
<tr>
<td>Feature</td>
<td>Session</td>
<td>JWT</td>
</tr>
<tr>
<td>User data stored</td>
<td>Server</td>
<td>Token</td>
</tr>
<tr>
<td>Server storage</td>
<td>Required</td>
<td>Not required (for basic validation)</td>
</tr>
<tr>
<td>Easy logout</td>
<td>✅ Yes</td>
<td>Harder (token remains valid until expiry unless additional revocation is implemented)</td>
</tr>
<tr>
<td>Horizontal scaling</td>
<td>Needs shared session storage</td>
<td>Easier because servers only need the signing key</td>
</tr>
<tr>
<td>Token size</td>
<td>Small (session ID)</td>
<td>Larger</td>
</tr>
<tr>
<td>Can carry user claims</td>
<td>No (stored on server instead)</td>
<td>Yes</td>
</tr>
</table>
---
# 8. Cookies vs Sessions vs JWT
This is where many people get confused.

```plain text
Cookie

↓

Storage mechanism
```

```plain text
Session

↓

Authentication strategy
```

```plain text
JWT

↓

Authentication token format
```

A cookie is **not an alternative** to JWT or sessions.

Examples:

### Session Authentication

```plain text
Cookie

↓

sessionId

↓

Server session
```

### JWT Authentication

```plain text
Cookie

↓

JWT

↓

Server verifies JWT
```

Or:

```plain text
Local Storage

↓

JWT

↓

Authorization Header
```

JWT can live inside a cookie, and sessions almost always use a cookie to hold the session ID.
---
# 9. Security Considerations
## Cookies
If marked as:

```plain text
HttpOnly
```

JavaScript cannot read them.

This helps protect against XSS attacks.
---
```plain text
Secure
```

Cookie is only sent over HTTPS.
---
```plain text
SameSite
```

Helps protect against CSRF by controlling when cookies are sent on cross-site requests.
---
## JWT
JWTs should always:

- Use HTTPS
- Have an expiration time
- Be signed with a strong secret or private key
- Avoid storing sensitive information (payload is encoded, not encrypted)
---
# Interview Questions
### Is a cookie encrypted?
No.

Cookies are plain text unless **your application encrypts their contents** before storing them.

HTTPS protects cookies **in transit**, not while they're stored in the browser.
---
### Can JWT be stored in cookies?
Yes.

This is a common production setup.
---
### Can sessions work without cookies?
Yes.

A session ID could be sent in a custom header or URL, though cookies are by far the most common and recommended transport.
---
### Which is better: Session or JWT?
Neither is universally better.

- **Sessions** are great when you want simple logout, server-side control, and easy revocation.
- **JWTs** are useful for stateless APIs, distributed systems, and scenarios where carrying user claims in the token is beneficial.

The best choice depends on your application's requirements.
---
# Notion Notes (Short Version)
### Cookies
- Small key-value data stored by the browser.
- Set by the server using `Set-Cookie`.
- Automatically sent with future requests to the same domain.
- Can store session IDs, JWTs, preferences, etc.
- Common security flags: `HttpOnly`, `Secure`, `SameSite`.

### Sessions
- Server stores user login state.
- Browser stores only a session ID (typically in a cookie).
- Each request includes the session ID.
- Server looks up the session to authenticate the user.

### JWT (JSON Web Token)
- Signed token containing user claims.
- Usually sent in the `Authorization: Bearer <token>` header, but it can also be stored in a cookie.
- Server verifies the signature instead of looking up a server-side session.

### Key Difference

<table header-row="true">
<tr>
<td>Cookies</td>
<td>Sessions</td>
<td>JWT</td>
</tr>
<tr>
<td>Browser storage mechanism</td>
<td>Server-side authentication state</td>
<td>Signed authentication token</td>
</tr>
<tr>
<td>Stores small data</td>
<td>Stores user state on server</td>
<td>Stores claims inside the token</td>
</tr>
<tr>
<td>Often used with sessions or JWT</td>
<td>Usually uses cookies for session ID</td>
<td>Can be stored in cookies or browser storage</td>
</tr>
</table>

This understanding is strong enough for most backend interviews and gives you a solid foundation for topics like OAuth, refresh tokens, and modern authentication flows.
