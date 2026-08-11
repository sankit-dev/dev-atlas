---
title: "CORS"
slug: "cors"
description: "Same Origin Policy, preflight requests, and Access-Control-Allow-Origin."
track: "Computer Networks"
---

# 1. Same Origin Policy (SOP)
Before understanding CORS, you first need to know **why CORS exists.**

### What is an Origin?
An **Origin** is made up of **3 things**:

```plain text
Protocol + Domain + Port
```

Example:

<table header-row="true">
<tr>
<td>URL</td>
<td>Origin</td>
</tr>
<tr>
<td>[https://example.com](https://example.com/)</td>
<td>https + example.com + 443</td>
</tr>
<tr>
<td>[http://example.com](http://example.com/)</td>
<td>http + example.com + 80</td>
</tr>
<tr>
<td>[https://api.example.com](https://api.example.com/)</td>
<td>https + api.example.com + 443</td>
</tr>
<tr>
<td>[https://example.com:3000](https://example.com:3000/)</td>
<td>https + example.com + 3000</td>
</tr>
</table>

If **any one** of these changes, the origin is different.

Example:

```plain text
https://example.com
https://api.example.com      ❌ Different domain

https://example.com
http://example.com           ❌ Different protocol

https://example.com
https://example.com:3000     ❌ Different port
```
---
## What is Same Origin Policy?
The **Same Origin Policy (SOP)** is a **browser security policy**.

It prevents a webpage from making requests to another origin unless that server explicitly allows it.

Example:

Frontend:

```plain text
https://myapp.com
```

Backend:

```plain text
https://api.myapp.com
```

Browser:

```plain text
fetch("https://api.myapp.com/users")
```

Although both belong to the same company, the **origins are different** because the domain differs.

The browser blocks the response unless CORS allows it.
---
## Why was SOP introduced?
Imagine you're logged into your bank.

```plain text
https://mybank.com
```

Without SOP:

You visit:

```plain text
https://evil.com
```

That malicious website secretly executes:

```javascript
fetch("https://mybank.com/account")
```

Your browser automatically sends your bank cookies.

Without protection, `evil.com` could read:

- Account balance
- Transactions
- Personal details

This would be a massive security issue.

So browsers enforce:

> "A website can only read responses from the same origin unless the other server explicitly allows it."
---
## Important Point
SOP does **NOT** stop the request from being sent in every case.

It mainly stops JavaScript from **reading the response**.

This distinction is important.
---
# 2. What is CORS?
CORS stands for:

**Cross-Origin Resource Sharing**

It is a mechanism that allows servers to tell browsers:

> "It's okay. I trust this other origin."

Without CORS:

```plain text
Frontend
https://myapp.com

↓

Request

↓

https://api.example.com

↓

Browser blocks response
```

With CORS:

Server sends permission.

```plain text
Access-Control-Allow-Origin:
https://myapp.com
```

Now the browser allows JavaScript to read the response.
---
## Example
Frontend:

```javascript
fetch("https://api.example.com/users")
```

Server responds:

```plain text
HTTP/1.1 200 OK

Access-Control-Allow-Origin: https://myapp.com
```

Browser checks:

```plain text
Did the server allow my origin?

Yes.

Return response to JavaScript.
```
---
# 3. Access-Control-Allow-Origin
This is the most important CORS header.

Example:

```plain text
Access-Control-Allow-Origin:
https://myapp.com
```

Meaning:

> Only requests coming from `https://myapp.com` can access this response.
---
Allow everyone:

```plain text
Access-Control-Allow-Origin: *
```

This means:

Every website is allowed.

Useful for:

- Public APIs
- Images
- Fonts
- Public documentation

Not suitable for authenticated APIs that rely on credentials (cookies or HTTP authentication).
---
# 4. Simple Requests
Some requests are considered **simple**.

Example:

```javascript
fetch("/users")
```

or

```plain text
GET /users
```

Browser sends the request immediately.

Server responds:

```plain text
HTTP/1.1 200 OK

Access-Control-Allow-Origin:
https://myapp.com
```

Browser checks the header.

If allowed:

```plain text
Response → JavaScript
```

Otherwise:

```plain text
Blocked by CORS
```
---
# 5. Preflight Request
Some requests are considered potentially more risky.

Examples:

```plain text
PUT
DELETE
PATCH
```

or

Custom headers:

```plain text
Authorization
X-API-Key
```

or certain content types such as `application/json` in many cross-origin scenarios.

Before sending the actual request, the browser first asks:

> "Server, are you okay with this type of request?"

This check is called a **Preflight Request**.
---
## Browser Flow
Suppose JavaScript does:

```javascript
fetch("/users", {
    method: "DELETE"
})
```

Browser does **NOT** send DELETE immediately.

Instead:

```plain text
OPTIONS /users
```

This is the preflight request.
---
### Browser asks

```plain text
OPTIONS /users

Origin:
https://myapp.com

Access-Control-Request-Method:
DELETE

Access-Control-Request-Headers:
Authorization
```

Meaning:

> I want to send a DELETE request with these headers. Is that allowed?
---
## Server replies

```plain text
HTTP/1.1 204 No Content

Access-Control-Allow-Origin:
https://myapp.com

Access-Control-Allow-Methods:
GET, POST, DELETE

Access-Control-Allow-Headers:
Authorization
```

Browser checks:

- Origin allowed ✅
- DELETE allowed ✅
- Authorization header allowed ✅

Everything is okay.

Now the browser sends the real request:

```plain text
DELETE /users
```
---
# 6. Complete Flow

```plain text
Frontend
    │
    │ DELETE /users
    │
    ▼
Browser
    │
    │ OPTIONS /users
    ▼
Server
    │
    │ Access-Control-Allow-Methods
    │ Access-Control-Allow-Origin
    ▼
Browser
    │
    │ DELETE /users
    ▼
Server
    │
    │ 200 OK
    ▼
Browser
    │
    ▼
JavaScript receives response
```
---
# Common CORS Headers

<table header-row="true">
<tr>
<td>Header</td>
<td>Purpose</td>
</tr>
<tr>
<td>`Access-Control-Allow-Origin`</td>
<td>Which origins may access the response</td>
</tr>
<tr>
<td>`Access-Control-Allow-Methods`</td>
<td>Allowed HTTP methods</td>
</tr>
<tr>
<td>`Access-Control-Allow-Headers`</td>
<td>Allowed request headers</td>
</tr>
<tr>
<td>`Access-Control-Allow-Credentials`</td>
<td>Whether credentials like cookies may be sent</td>
</tr>
<tr>
<td>`Access-Control-Max-Age`</td>
<td>How long the browser can cache a successful preflight response</td>
</tr>
</table>
---
# Interview Questions
### Why do we need CORS?
Because browsers enforce the Same Origin Policy.

CORS lets a server explicitly allow trusted cross-origin requests.
---
### Does Postman enforce CORS?
**No.**

Postman is **not a browser**, so it does not enforce the Same Origin Policy.

That's why an API can work perfectly in Postman but fail in the browser with a CORS error.
---
### Is CORS a frontend feature or backend feature?
It's a **browser security mechanism** that relies on the **backend** to send the appropriate CORS headers.
---
### Who enforces CORS?
The **browser**.

If the server doesn't send the required headers, the browser blocks JavaScript from accessing the response.
---
# Notion Notes (Short Version)
### Same Origin Policy (SOP)
- Browser security policy.
- An origin = Protocol + Domain + Port.
- JavaScript can only read responses from the same origin by default.
- Prevents malicious websites from reading sensitive data from other sites.

### CORS (Cross-Origin Resource Sharing)
- Mechanism that allows a server to permit specific cross-origin requests.
- The browser checks CORS response headers before exposing the response to JavaScript.

### Access-Control-Allow-Origin
- Specifies which origin(s) may access the response.
-  allows any origin (not appropriate for credentialed requests).

### Preflight Request
- An automatic `OPTIONS` request sent before certain cross-origin requests (for example, `PUT`, `PATCH`, `DELETE`, or requests with non-simple headers).
- The browser checks whether the server allows the intended method and headers before sending the actual request.
