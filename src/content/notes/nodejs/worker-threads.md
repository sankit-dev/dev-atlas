---
title: "Worker Threads"
slug: "worker-threads"
description: "Run CPU-heavy JavaScript work off the main thread."
track: "Node.js"
priority: "Important"
---

# Worker Threads

Node.js is good at IO-heavy work.

CPU-heavy work is different.

If a long calculation runs on the main JavaScript thread, it can block the event loop and slow down all requests.

## What worker threads solve

Worker threads let you run JavaScript in separate threads.

Use them for CPU-heavy tasks like:

- image processing,
- large calculations,
- parsing huge data,
- encryption-heavy custom work.

## Simple mental model

```text
Main thread handles requests
Worker thread handles heavy calculation
Main thread receives result later
```

## When not to use worker threads

Do not use workers for normal database calls or HTTP requests.

Those are IO tasks, and Node already handles them well asynchronously.

Workers are mainly for CPU-heavy JavaScript work.

## Interview answer

Worker threads allow Node.js to run CPU-heavy JavaScript work outside the main event loop. They are useful when computation would block the main thread. They are usually not needed for normal IO tasks like database queries or HTTP calls, because Node already handles IO asynchronously.

