---
title: "Memory Leaks in JavaScript"
slug: "memory-leaks-in-javascript"
description: "Common ways references stay alive longer than expected."
track: "JavaScript"
priority: "Important"
---

# Memory Leaks in JavaScript

JavaScript has garbage collection.

That means memory is freed automatically when objects are no longer reachable.

But memory leaks can still happen when references are kept accidentally.

## Common causes

### Forgotten timers

```js
setInterval(() => {
  // keeps running forever
}, 1000)
```

Clear intervals when they are no longer needed.

### Event listeners not removed

If you attach listeners and never remove them, they may keep objects alive.

### Global references

Storing growing data on global objects can prevent cleanup.

### Closures holding large data

A closure can keep access to variables longer than expected.

That is useful, but it can also keep memory alive.

## React example

If a component creates subscriptions, timers, or listeners, cleanup should happen when the component unmounts.

```js
useEffect(() => {
  const id = setInterval(work, 1000)

  return () => clearInterval(id)
}, [])
```

## Interview answer

A memory leak happens when unused data remains reachable, so garbage collection cannot free it. Common causes are forgotten timers, event listeners, global references, subscriptions, and closures holding large objects. Cleanup is important in long-running apps.

