---
title: "Implement Debounce and Throttle"
slug: "implement-debounce-and-throttle"
description: "Write reusable debounce and throttle helpers."
track: "JavaScript"
priority: "Must Know"
---

# Implement Debounce and Throttle

This exercise is commonly asked because it tests closures, timers, and function arguments.

## Debounce

```js
function debounce(fn, delay) {
  let timerId

  return function (...args) {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```

Use case:

```js
const search = debounce((value) => {
  console.log('search', value)
}, 500)
```

## Throttle

```js
function throttle(fn, delay) {
  let waiting = false

  return function (...args) {
    if (waiting) return

    fn.apply(this, args)
    waiting = true

    setTimeout(() => {
      waiting = false
    }, delay)
  }
}
```

## What interviewer checks

- Do you preserve `this`?
- Do you pass arguments correctly?
- Do you understand closure?
- Do you know debounce vs throttle use cases?

