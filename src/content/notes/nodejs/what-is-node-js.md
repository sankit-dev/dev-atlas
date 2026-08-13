---
title: "What is Node.js?"
slug: "what-is-node-js"
description: "What Node.js is, why it exists, and when to use it."
track: "Node.js"
priority: "Must Know"
---

# What is Node.js?

Before learning Express, APIs, streams, or npm, first understand what Node.js actually is.

**Node.js is a JavaScript runtime that lets JavaScript run outside the browser.**

In the browser, JavaScript can work with the DOM, buttons, forms, and browser APIs.

In Node.js, JavaScript can work with backend things:

- files,
- network requests,
- servers,
- databases,
- environment variables,
- operating system processes.

## Why Node.js exists

Originally, JavaScript mostly ran in browsers.

That meant JavaScript was used mainly for frontend behavior.

Node.js made it possible to use JavaScript for backend development too.

Now one language can be used for:

- React frontend,
- Express backend,
- scripts and CLI tools,
- API servers,
- real-time apps,
- database access.

## What problem does Node solve?

Backend servers spend a lot of time waiting:

- waiting for database response,
- waiting for file read,
- waiting for another API,
- waiting for network IO.

Node.js is good at handling many IO-heavy tasks without blocking the whole server for each request.

That is why Node is commonly used for APIs, dashboards, chat apps, and real-time systems.

## Node.js is not Express

This is important:

| Tool | Meaning |
| --- | --- |
| Node.js | Runtime that runs JavaScript on the server |
| Express.js | Web framework built on top of Node.js |

You can create a server using only Node.js.

Express just makes server routing and middleware easier.

## When should you use Node.js?

Node.js fits well for:

- REST APIs,
- real-time apps,
- chat systems,
- dashboards,
- proxy servers,
- microservices,
- CLI tools,
- IO-heavy backend work.

Node.js is not always the best choice for CPU-heavy work like video encoding, large image processing, or heavy mathematical computation unless you move that work to workers or another service.

## Interview answer

Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run outside the browser. It provides backend APIs for files, networking, processes, and servers. It is commonly used for IO-heavy backend applications because its event-driven, non-blocking model can handle many concurrent operations efficiently.

