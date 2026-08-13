---
title: "Debounce and Throttle"
slug: "debounce-and-throttle"
description: "Control how often a function runs during frequent events."
track: "JavaScript"
priority: "Must Know"
---

# Debounce and Throttle

Debounce and throttle control how often a function runs.

They are useful for events that fire many times quickly.

Examples:

- search input typing,
- window resize,
- scroll tracking,
- button spam prevention.

## Debounce

Debounce waits until the user stops triggering the event.

Example use case: search box.

Do not call API on every key press. Wait until typing pauses.

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

## Throttle

Throttle runs a function at most once in a fixed time window.

Example use case: scroll handler.

```js
function throttle(fn, delay) {
  let lastRun = 0

  return function (...args) {
    const now = Date.now()

    if (now - lastRun >= delay) {
      lastRun = now
      fn.apply(this, args)
    }
  }
}
```

## Simple difference

| Concept | Meaning | Example |
| --- | --- | --- |
| Debounce | Run after events stop | Search input |
| Throttle | Run at fixed intervals | Scroll listener |

## Interview answer

Debounce delays execution until events stop for a given time, which is useful for search inputs. Throttle limits execution to once per interval, which is useful for scroll or resize events. Both improve performance by reducing unnecessary function calls.

