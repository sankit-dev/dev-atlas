---
title: "HTTP Server without Express"
slug: "http-server-without-express"
description: "Build a tiny router with Node.js http module."
track: "Node.js"
priority: "Must Know"
---

# HTTP Server without Express

This exercise helps you understand what Express simplifies.

## Goal

Build a small server with these routes:

```text
GET /health
GET /users
POST /users
```

## Starter solution

```js
import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'GET' && req.url === '/health') {
    res.statusCode = 200
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  if (req.method === 'GET' && req.url === '/users') {
    res.statusCode = 200
    res.end(JSON.stringify(users))
    return
  }

  res.statusCode = 404
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(3000)
```

## What to add next

- parse JSON request body for `POST /users`,
- validate required fields,
- return correct status codes,
- handle bad JSON,
- extract route handling into functions.

## Interview angle

Explain that Express automates route matching, body parsing, middleware flow, and error handling, but the foundation is still Node's HTTP request and response model.

