---
title: "Events and EventEmitter"
slug: "events-and-eventemitter"
description: "Build event-driven code using Node.js EventEmitter."
track: "Node.js"
priority: "Must Know"
---

# Events and EventEmitter

Node.js uses event-driven programming heavily.

An event means:

> Something happened, and interested code can react to it.

## EventEmitter example

```js
import EventEmitter from 'node:events'

const emitter = new EventEmitter()

emitter.on('user:created', (user) => {
  console.log('Send welcome email to', user.email)
})

emitter.emit('user:created', {
  email: 'asha@example.com',
})
```

`on` registers a listener.

`emit` triggers the event.

## Why events are useful

Events help separate actions.

Example: when a user registers, your main code may create the user. Other listeners can:

- send welcome email,
- write audit log,
- update analytics,
- notify admin.

The registration function does not need to know every side effect directly.

## EventEmitter methods

Common methods:

- `on`: add listener,
- `once`: add listener that runs one time,
- `emit`: trigger event,
- `off` or `removeListener`: remove listener.

## Common mistake

Too many events can make code hard to trace.

Use events for clean decoupling, not to hide important business flow.

If one operation must happen before another, direct function calls may be clearer.

## Interview answer

EventEmitter is Node's event system. It lets code register listeners with `on` and trigger them with `emit`. It is useful for event-driven flows like logging, notifications, and decoupled side effects, but overusing events can make code harder to follow.

