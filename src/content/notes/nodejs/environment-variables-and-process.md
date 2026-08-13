---
title: "Environment Variables and process"
slug: "environment-variables-and-process"
description: "Use process.env, argv, exit codes, and runtime metadata."
track: "Node.js"
priority: "Must Know"
---

# Environment Variables and process

Node.js provides a global `process` object.

It gives information and control over the running Node process.

## process.env

Environment variables store configuration outside the code.

Example:

```js
const port = process.env.PORT || 3000
const dbUrl = process.env.DATABASE_URL
```

Common values:

- `PORT`,
- `DATABASE_URL`,
- `JWT_SECRET`,
- `NODE_ENV`,
- API keys.

## Why env vars matter

Do not hardcode secrets:

```js
const jwtSecret = 'my-secret'
```

Better:

```js
const jwtSecret = process.env.JWT_SECRET
```

Different environments can use different values:

- local,
- staging,
- production.

## process.argv

`process.argv` contains command line arguments.

```js
console.log(process.argv)
```

Useful for CLI scripts.

## process.exit

Exit with success:

```js
process.exit(0)
```

Exit with failure:

```js
process.exit(1)
```

## Interview answer

The `process` object provides information about the running Node.js process. `process.env` is used for configuration and secrets through environment variables. `process.argv` reads command-line arguments, and exit codes communicate success or failure to the operating system.

