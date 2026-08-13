---
title: "HTTP Server in Node.js"
slug: "http-server-in-node-js"
description: "Create a basic server without Express to understand the foundation."
track: "Node.js"
priority: "Must Know"
---

# HTTP Server in Node.js

Express is built on top of Node.js HTTP concepts.

Before Express, it helps to see a basic server without any framework.

## Basic server

```js
import http from 'node:http'

const server = http.createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

## What req and res mean

`req` is the incoming request.

It contains:

- method,
- URL,
- headers,
- body stream.

`res` is the outgoing response.

You use it to send:

- status code,
- headers,
- response body.

## Why Express exists

Doing everything manually gets repetitive:

- parsing request body,
- matching routes,
- handling params,
- running middleware,
- centralizing errors.

Express makes these easier.

## Interview answer

Node.js can create HTTP servers using the built-in `http` module. The request object contains request details like method, URL, headers, and body stream. The response object is used to send status, headers, and body. Express builds on these concepts and makes routing and middleware easier.

