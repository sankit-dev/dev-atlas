---
title: "What is Express?"
slug: "what-is-express"
description: "What Express adds on top of Node.js and why it exists."
track: "Express.js"
priority: "Must Know"
---

# What is Express?

Before learning middleware, controllers, JWT, or REST APIs, first understand what Express is.

**Express is a minimal web framework for Node.js.**

Node.js can already create HTTP servers, but raw Node HTTP code becomes repetitive when building real APIs.

Express makes backend API development easier by providing:

- routing,
- middleware,
- request and response helpers,
- error handling flow,
- static file serving,
- cleaner project structure.

## Why Express exists

Using only Node's `http` module, you manually check:

- request method,
- request URL,
- request body,
- headers,
- response status,
- routing logic.

Express gives you a simpler API:

```js
import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(3000)
```

This is easier to read and organize.

## Express is not Node.js

| Tool | Meaning |
| --- | --- |
| Node.js | Runtime that runs JavaScript on the server |
| Express.js | Framework that helps build HTTP APIs on Node.js |

Express runs inside Node.js.

## When to use Express

Use Express when building:

- REST APIs,
- backend services,
- authentication APIs,
- CRUD apps,
- admin dashboards,
- webhooks,
- simple full-stack backends.

## Interview answer

Express is a lightweight Node.js web framework used to build HTTP servers and APIs. It simplifies routing, middleware, request parsing, responses, and error handling compared to using Node's built-in HTTP module directly.

