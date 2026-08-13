---
title: "Event Loop"
slug: "event-loop"
description: "Why asynchronous callbacks run after the current call stack."
track: "JavaScript"
priority: "Must Know"
---

# Event Loop

JavaScript runs synchronous code on the call stack.

Async callbacks wait until the stack is empty.

The event loop coordinates this.

## Simple example

```js
console.log('A')

setTimeout(() => {
  console.log('B')
}, 0)

console.log('C')
```

Output:

```text
A
C
B
```

Even with `0` delay, `setTimeout` does not run immediately.

It waits until the current stack finishes.

## Microtasks vs macrotasks

Promises use microtasks.

`setTimeout` uses macrotasks.

```js
console.log('A')

setTimeout(() => console.log('B'), 0)

Promise.resolve().then(() => console.log('C'))

console.log('D')
```

Output:

```text
A
D
C
B
```

Microtasks run before the next macrotask.

## Interview answer

The event loop lets JavaScript handle asynchronous work while keeping the call stack single-threaded. Synchronous code runs first. When the call stack is empty, microtasks like promise callbacks run before macrotasks like `setTimeout` callbacks.

