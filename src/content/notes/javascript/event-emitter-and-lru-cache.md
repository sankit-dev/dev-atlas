---
title: "Event Emitter and LRU Cache"
slug: "event-emitter-and-lru-cache"
description: "Build two common machine-coding round utilities."
track: "JavaScript"
priority: "Important"
---

# Event Emitter and LRU Cache

These are common machine-coding style exercises.

## Event emitter

An event emitter lets code subscribe to and emit events.

```js
class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }

    this.events.get(eventName).push(callback)
  }

  emit(eventName, payload) {
    const callbacks = this.events.get(eventName) || []

    callbacks.forEach((callback) => callback(payload))
  }
}
```

## LRU cache idea

LRU means Least Recently Used.

When cache is full, remove the item that has not been used for the longest time.

JavaScript `Map` keeps insertion order, so it helps.

```js
class LRUCache {
  constructor(limit) {
    this.limit = limit
    this.cache = new Map()
  }

  get(key) {
    if (!this.cache.has(key)) return undefined

    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    this.cache.set(key, value)

    if (this.cache.size > this.limit) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }
  }
}
```

## What to explain

For event emitter:

- how subscribers are stored,
- how emit triggers callbacks,
- how to add `off` later.

For LRU:

- why recently used keys are moved to the end,
- why oldest key is removed,
- why `Map` is useful.

