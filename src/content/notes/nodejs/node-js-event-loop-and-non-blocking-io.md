---
title: "Node.js Event Loop and Non-blocking IO"
slug: "node-js-event-loop-and-non-blocking-io"
description: "libuv, event loop phases, microtasks, macrotasks, and callback priority in Node.js."
track: "Node.js"
priority: "Must Know"
---

# Node.js Event Loop and Non-blocking IO

This is one of the most asked Node.js interview topics.

The core idea:

> Node.js runs JavaScript on the main thread, but it handles slow IO through the event loop, the operating system, and libuv.

## Why Node.js needs an event loop

Backend code often waits for slow work:

- database queries,
- file reads,
- HTTP requests,
- network sockets,
- timers,
- crypto or compression work.

If Node blocked the main JavaScript thread every time it waited, one slow request could freeze the server.

Instead, Node starts async work, continues running other code, and later runs the callback or promise continuation when the work is ready.

## Important parts

| Part | Responsibility |
| --- | --- |
| V8 | Executes JavaScript code |
| Call stack | Runs the current synchronous function |
| Node.js APIs | Expose backend features like `fs`, `http`, `crypto`, timers, streams |
| libuv | Implements the event loop, async IO support, and worker thread pool |
| OS kernel | Handles many network IO operations in the background |
| Worker pool | Runs expensive work that cannot be handled as pure non-blocking OS IO |

## What is libuv?

`libuv` is a C library used by Node.js.

It provides:

- the event loop,
- async TCP and UDP sockets,
- file system operations,
- DNS support,
- timers,
- child process handling,
- a worker thread pool.

Interview point:

> Node.js is not just V8. V8 runs JavaScript, while libuv provides the async event loop and many low-level IO features.

## Is Node.js single-threaded?

JavaScript execution is mostly single-threaded.

That means only one piece of JavaScript runs on the main call stack at a time.

But the whole Node.js runtime is not strictly single-threaded:

- the OS can handle network IO in the background,
- libuv has a worker thread pool,
- Node can use worker threads for CPU-heavy JavaScript,
- some native operations run outside the main JavaScript thread.

Better interview answer:

> Node.js has a single main JavaScript thread, but it uses the OS and libuv worker pool to handle async work without blocking the main thread.

## Non-blocking IO flow

Example:

```js
import fs from 'node:fs/promises'

async function readFile() {
  const data = await fs.readFile('notes.txt', 'utf8')
  console.log(data)
}

readFile()
console.log('After readFile call')
```

Output:

```text
After readFile call
file content later
```

What happens:

1. JavaScript starts `readFile()`.
2. `fs.readFile()` begins async work.
3. `await` pauses only that async function, not the whole Node process.
4. The call stack becomes free.
5. Node can handle other work.
6. When the file read finishes, Node schedules the promise continuation.
7. The event loop runs it when the current stack and higher-priority queues are clear.

## Blocking vs non-blocking

Blocking:

```js
import fs from 'node:fs'

const data = fs.readFileSync('notes.txt', 'utf8')
console.log(data)
console.log('Runs after file is fully read')
```

`readFileSync` blocks the main thread.

Non-blocking:

```js
import fs from 'node:fs/promises'

fs.readFile('notes.txt', 'utf8').then((data) => {
  console.log(data)
})

console.log('Can run before file read finishes')
```

The async version lets Node continue.

## Event loop lifecycle

When a Node.js program starts:

1. Node initializes the runtime.
2. Node executes the main script from top to bottom.
3. Synchronous code runs on the call stack.
4. Async work is registered with Node APIs, libuv, or the OS.
5. After the main script finishes, Node enters the event loop if there is pending work.
6. The event loop checks queues phase by phase.
7. Ready callbacks are pushed to the call stack and executed.
8. Microtasks are drained after callbacks.
9. If no timers, IO, handles, or pending work remain, Node exits.

## Event loop phases

The main phases are:

| Phase | What runs here |
| --- | --- |
| Timers | `setTimeout()` and `setInterval()` callbacks whose delay has expired |
| Pending callbacks | Some deferred system-level IO callbacks |
| Idle / prepare | Internal Node/libuv work |
| Poll | Receives new IO events and runs most IO callbacks |
| Check | `setImmediate()` callbacks |
| Close callbacks | Close events like `socket.on('close')` |

Simple flow:

```text
main script
microtasks
event loop starts
timers
pending callbacks
poll
check
close callbacks
repeat while work exists
```

Important modern Node detail:

> Since Node.js 20, timers are run after the poll phase during each event loop iteration. Node still may run timers before entering the loop for compatibility, so do not depend on tiny timing differences between `setTimeout(..., 0)` and `setImmediate()` outside IO.

## What each phase does

### Timers phase

Runs callbacks scheduled by:

- `setTimeout()`,
- `setInterval()`.

Example:

```js
setTimeout(() => {
  console.log('timer')
}, 1000)
```

The delay is a minimum threshold, not a guarantee.

If the call stack or poll phase is busy, the timer callback runs late.

### Pending callbacks phase

Runs some IO callbacks deferred to the next loop iteration.

You rarely control this directly in normal application code.

### Poll phase

This is where Node handles most IO callbacks.

Examples:

- file read callback,
- network data callback,
- incoming socket activity,
- database driver IO callback.

The poll phase can wait for new IO if nothing else is ready.

### Check phase

Runs `setImmediate()` callbacks.

```js
setImmediate(() => {
  console.log('immediate')
})
```

Inside an IO callback, `setImmediate()` usually runs before `setTimeout(..., 0)`.

### Close callbacks phase

Runs close event callbacks.

Example:

```js
socket.on('close', () => {
  console.log('socket closed')
})
```

## Microtasks vs macrotasks

Interviewers often ask this.

### Macrotasks

Macrotasks are normal event loop tasks from phases such as timers, IO, and check.

Examples:

- `setTimeout`,
- `setInterval`,
- `setImmediate`,
- IO callbacks.

### Microtasks

Microtasks run with higher priority than normal event loop callbacks.

Examples:

- promise callbacks: `.then`, `.catch`, `.finally`,
- `queueMicrotask`,
- async function continuations after `await`.

Node.js also has a special queue:

- `process.nextTick`.

`process.nextTick()` is not a normal event loop phase. Node runs it before promise microtasks after the current operation completes.

## Priority order in Node.js

For most interview examples, remember this priority:

```text
1. Synchronous code
2. process.nextTick queue
3. Promise microtask queue
4. Macrotask queues: timers, IO, check, close callbacks
```

Example:

```js
console.log('A')

setTimeout(() => console.log('timeout'), 0)
setImmediate(() => console.log('immediate'))

Promise.resolve().then(() => console.log('promise'))

process.nextTick(() => console.log('nextTick'))

console.log('B')
```

Common output:

```text
A
B
nextTick
promise
timeout/immediate order can vary outside IO
```

`setTimeout(..., 0)` and `setImmediate()` order can vary when scheduled from the main script.

Inside IO, `setImmediate()` is more predictable:

```js
import fs from 'node:fs'

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0)
  setImmediate(() => console.log('immediate'))
})
```

Common output:

```text
immediate
timeout
```

## process.nextTick vs Promise

```js
Promise.resolve().then(() => console.log('promise'))

process.nextTick(() => console.log('nextTick'))

console.log('sync')
```

Output:

```text
sync
nextTick
promise
```

Why?

`process.nextTick()` has higher priority than promise microtasks in Node.js.

Be careful:

```js
function loop() {
  process.nextTick(loop)
}

loop()
```

This can starve the event loop because Node keeps running `nextTick` callbacks and may not reach IO or timers.

## setTimeout vs setImmediate

| API | Meaning |
| --- | --- |
| `setTimeout(fn, 0)` | Run after at least 0 ms, in the timers phase |
| `setImmediate(fn)` | Run in the check phase, after poll |

Rules:

- from the main script, order can vary,
- inside an IO callback, `setImmediate()` usually runs before `setTimeout(..., 0)`,
- neither should be used for exact timing.

## Where does async work run?

Not all async work is handled the same way.

| Work type | Usually handled by |
| --- | --- |
| Network IO | OS async mechanisms through libuv |
| File system | libuv worker pool |
| DNS `dns.lookup()` | libuv worker pool |
| Crypto | libuv worker pool |
| Zlib compression | libuv worker pool |
| Timers | event loop |
| JavaScript callbacks | main JS thread |

Default libuv worker pool size is commonly 4.

It can be changed with `UV_THREADPOOL_SIZE`, but increasing it blindly is not a fix for blocking code.

## What blocks Node.js?

These block the main JavaScript thread:

- large synchronous loops,
- `fs.readFileSync()` in server code,
- heavy JSON parsing/stringifying,
- expensive regex,
- CPU-heavy encryption or image processing in JS,
- while loops that do not yield.

Bad example:

```js
app.get('/slow', (req, res) => {
  let total = 0

  for (let i = 0; i < 5_000_000_000; i++) {
    total += i
  }

  res.json({ total })
})
```

While this loop runs, the event loop cannot serve other requests.

For CPU-heavy work, use:

- worker threads,
- child processes,
- a job queue,
- a separate service,
- streaming or chunking when possible.

## Common interview questions

### Why can Node.js handle many requests with one thread?

Because most backend requests are IO-heavy. Node starts IO work, frees the main thread, and later resumes the callback when the result is ready.

### Does `await` block Node.js?

No. `await` pauses the current async function. It does not block the entire event loop.

### Are promises handled by libuv?

No. Promise callbacks are JavaScript microtasks managed by the JS runtime and Node integration. libuv handles event loop phases, IO polling, timers, and the worker pool.

### Is the event loop a queue?

Not exactly. It is a loop with multiple phases. Each phase has callbacks to process. Microtasks are drained between operations with higher priority.

### Why should we avoid blocking the event loop?

Because one long-running callback delays all other callbacks, requests, timers, and IO handling.

## Interview answer

Node.js runs JavaScript on a single main thread, but it uses libuv, the operating system, and a worker pool to perform async work without blocking the main thread. The event loop runs callbacks in phases such as timers, poll, check, and close callbacks. Microtasks like promises run before normal event loop callbacks, and `process.nextTick()` runs before promise microtasks in Node.js. This model makes Node efficient for IO-heavy servers, but CPU-heavy or synchronous work can block the event loop and delay every request.
