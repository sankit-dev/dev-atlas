---
title: "Node.js Event Loop and Non-blocking IO"
slug: "node-js-event-loop-and-non-blocking-io"
description: "How Node handles many IO tasks without one thread per request."
track: "Node.js"
priority: "Must Know"
---

# Node.js Event Loop and Non-blocking IO

Node.js is famous for handling many requests efficiently.

The reason is its event-driven, non-blocking IO model.

## The basic problem

Backend code often waits for slow things:

- database query,
- file read,
- API request,
- network response.

If the server blocks during every wait, it wastes time.

## Blocking example

```js
import fs from 'node:fs'

const data = fs.readFileSync('large-file.txt', 'utf8')
console.log(data)
```

`readFileSync` blocks. Node waits until the file is fully read before moving on.

## Non-blocking example

```js
import fs from 'node:fs/promises'

async function readFile() {
  const data = await fs.readFile('large-file.txt', 'utf8')
  console.log(data)
}

readFile()
console.log('Node can continue')
```

The file read is started, and Node can continue handling other work while waiting.

## Real backend example

Imagine an Express API:

```js
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})
```

While MongoDB is finding the user, Node does not need to freeze the entire server.

Another request can still be accepted.

That is the practical value of non-blocking IO.

The important detail:

```text
await pauses this request handler, not the whole Node.js process.
```

This is why Node can handle many concurrent IO-heavy requests with a small number of threads.

## Bad mental model

Bad understanding:

> Node creates one new thread for every request.

Better understanding:

> Node runs JavaScript on the main thread and uses non-blocking IO/event loop behavior so waiting work does not block other requests.

## Event loop role

The event loop coordinates callbacks and async work.

Simple mental model:

```text
Run current JavaScript
Start async IO
Continue other work
When IO finishes, schedule callback/promise continuation
Run it when call stack is free
```

## Is Node.js single-threaded?

JavaScript execution in Node mostly runs on one main thread.

But Node uses the operating system and libuv thread pool for some background work, such as file system operations, DNS, crypto, and compression.

So the better answer is:

> Node.js has a single main JavaScript thread, but the runtime can use background threads and OS async features for IO.

## Interview answer

Node.js uses an event loop and non-blocking IO to handle many concurrent operations efficiently. JavaScript runs on a main thread, but slow IO work can be delegated to the OS or libuv. When the operation completes, its callback or promise continuation is scheduled back on the event loop.
