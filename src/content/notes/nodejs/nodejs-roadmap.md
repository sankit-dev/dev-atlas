---
title: "Node.js Roadmap"
slug: "nodejs-roadmap"
description: "How to study Node.js for backend development and interviews."
track: "Node.js"
priority: "Must Know"
---

# Node.js Roadmap

Node.js lets JavaScript run outside the browser.

For MERN, Node.js is the backend runtime. Express runs on top of it, and your API uses it to talk to files, databases, network, environment variables, and external services.

## Study order

```text
Runtime -> Event loop -> Modules -> Files -> Events -> Streams -> HTTP -> Errors -> Exercises
```

Start with why Node exists, then understand non-blocking IO. After that, modules, files, events, streams, and HTTP become much easier.

## What matters most

- Node is not a framework. It is a runtime.
- Node is excellent for IO-heavy backend work.
- Node uses an event loop and non-blocking APIs.
- Node can still struggle with CPU-heavy work unless you move it elsewhere.
- Express hides many HTTP details, but Node's `http` module is the foundation.

## Interview angle

If asked about Node.js, explain that it runs JavaScript on the server using V8, provides runtime APIs unavailable in browsers, and is commonly used for scalable IO-heavy backend applications.

