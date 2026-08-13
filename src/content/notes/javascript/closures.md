---
title: "Closures"
slug: "closures"
description: "How functions remember variables from their outer scope."
track: "JavaScript"
priority: "Must Know"
---

# Closures

A closure happens when a function remembers variables from its outer scope even after the outer function has finished.

## Simple example

```js
function createCounter() {
  let count = 0

  return function increment() {
    count += 1
    return count
  }
}

const counter = createCounter()

console.log(counter()) // 1
console.log(counter()) // 2
```

`createCounter` has finished, but `increment` still remembers `count`.

That is closure.

## Why closures matter

Closures are used for:

- private variables,
- callbacks,
- event handlers,
- React hooks,
- memoization,
- currying,
- async code.

## Common mistake

Closure does not copy the variable value.

It keeps access to the variable itself.

That is why the counter keeps increasing.

## Interview answer

A closure is created when an inner function keeps access to variables from its outer lexical scope, even after the outer function has returned. Closures are useful for private state, callbacks, memoization, currying, and React hook behavior.

