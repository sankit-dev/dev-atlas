---
title: "Security Headers"
slug: "security-headers"
description: "Use headers to reduce common web risks."
track: "Express.js"
priority: "Important"
---

# Security Headers

Security headers tell browsers to enforce safer behavior.

They do not replace authentication, validation, or authorization, but they reduce common web risks.

## Examples

Common security-related headers:

- `Content-Security-Policy`,
- `X-Frame-Options`,
- `X-Content-Type-Options`,
- `Referrer-Policy`,
- `Strict-Transport-Security`.

## Helmet

Express apps often use Helmet:

```js
import helmet from 'helmet'

app.use(helmet())
```

Helmet sets several useful security headers by default.

## What headers help with

Security headers can reduce risk from:

- clickjacking,
- MIME sniffing,
- insecure transport,
- some XSS scenarios,
- unsafe resource loading.

## Common mistake

Do not install Helmet and assume the app is secure.

Security also requires:

- input validation,
- output escaping where needed,
- auth checks,
- safe cookies,
- dependency updates,
- secure secrets.

## Interview answer

Security headers are HTTP headers that instruct browsers to apply safer behavior, such as preventing clickjacking, MIME sniffing, or unsafe resource loading. In Express, Helmet is commonly used to set many security headers, but it is only one part of application security.

