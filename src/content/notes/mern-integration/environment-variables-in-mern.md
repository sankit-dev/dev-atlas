---
title: "Environment Variables in MERN"
slug: "environment-variables-in-mern"
description: "Separate frontend and backend configuration safely."
track: "MERN Integration"
priority: "Must Know"
---

# Environment Variables in MERN

Environment variables keep configuration outside code.

But frontend and backend env vars are different.

## Backend env vars

Backend env vars can contain secrets:

```text
DATABASE_URL=
JWT_SECRET=
PORT=
NODE_ENV=
```

Use them in Node:

```js
const dbUrl = process.env.DATABASE_URL
```

## Frontend env vars

React/Vite env vars are bundled into browser code if exposed.

They are not secret.

Example Vite variable:

```text
VITE_API_URL=http://localhost:3000
```

Use:

```js
const apiUrl = import.meta.env.VITE_API_URL
```

## Important rule

Never put secrets in frontend env vars.

If React can use it in the browser, users can inspect it.

## Common mistake

Putting `JWT_SECRET`, database URL, or private API keys into frontend `.env` is unsafe.

Those belong only on the backend.

## Interview answer

In MERN, backend environment variables can contain secrets and are read through `process.env`. Frontend environment variables are bundled into browser code and must not contain secrets. Frontend env vars are suitable for public config like API base URL, while database URLs and JWT secrets belong only on the server.

