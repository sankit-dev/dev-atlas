---
title: "Currying and Memoization"
slug: "currying-and-memoization"
description: "Function patterns often asked in interviews and coding rounds."
track: "JavaScript"
priority: "Important"
---

# Currying and Memoization

Currying and memoization are function techniques often asked in interviews.

## Currying

Currying transforms a function with multiple arguments into a chain of functions.

```js
function add(a) {
  return function (b) {
    return a + b
  }
}

add(2)(3) // 5
```

Why this works: the inner function remembers `a` through closure.

## Memoization

Memoization caches the result of an expensive function.

```js
function memoize(fn) {
  const cache = new Map()

  return function (value) {
    if (cache.has(value)) return cache.get(value)

    const result = fn(value)
    cache.set(value, result)
    return result
  }
}
```

Use memoization when the same inputs repeat and the function is expensive.

## Interview answer

Currying converts a multi-argument function into a sequence of single-argument functions, usually using closures. Memoization caches function results for repeated inputs so expensive calculations do not run again unnecessarily.

