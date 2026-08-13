---
title: "Custom EventEmitter"
slug: "custom-eventemitter"
description: "Implement a small event emitter from scratch."
track: "Node.js"
priority: "Must Know"
---

# Custom EventEmitter

This exercise checks whether you understand events, callbacks, arrays, and maps.

## Requirements

Implement:

- `on(event, callback)`,
- `emit(event, payload)`,
- `off(event, callback)`,
- `once(event, callback)`.

## Basic implementation

```js
class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  on(event, callback) {
    const callbacks = this.events.get(event) || []
    callbacks.push(callback)
    this.events.set(event, callbacks)
  }

  emit(event, payload) {
    const callbacks = this.events.get(event) || []
    callbacks.forEach((callback) => callback(payload))
  }

  off(event, callback) {
    const callbacks = this.events.get(event) || []
    this.events.set(
      event,
      callbacks.filter((item) => item !== callback),
    )
  }
}
```

## once idea

`once` should remove the listener after first execution.

```js
once(event, callback) {
  const wrapper = (payload) => {
    callback(payload)
    this.off(event, wrapper)
  }

  this.on(event, wrapper)
}
```

## Interview angle

Explain how listeners are stored, how `emit` triggers callbacks, how `off` removes a callback, and why `once` needs a wrapper function.

