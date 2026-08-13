---
title: "Polyfills: map, filter and reduce"
slug: "polyfills-map-filter-and-reduce"
description: "Implement common array methods from scratch."
track: "JavaScript"
priority: "Must Know"
---

# Polyfills: map, filter and reduce

A polyfill recreates behavior that may not exist in an environment.

In interviews, polyfills test whether you understand how methods work internally.

## map polyfill

```js
Array.prototype.myMap = function (callback) {
  const result = []

  for (let i = 0; i < this.length; i += 1) {
    result.push(callback(this[i], i, this))
  }

  return result
}
```

## filter polyfill

```js
Array.prototype.myFilter = function (callback) {
  const result = []

  for (let i = 0; i < this.length; i += 1) {
    if (callback(this[i], i, this)) {
      result.push(this[i])
    }
  }

  return result
}
```

## reduce polyfill

```js
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue
  let startIndex = 0

  if (accumulator === undefined) {
    accumulator = this[0]
    startIndex = 1
  }

  for (let i = startIndex; i < this.length; i += 1) {
    accumulator = callback(accumulator, this[i], i, this)
  }

  return accumulator
}
```

## Practice requirements

After writing these, test:

- empty arrays,
- missing initial value for reduce,
- callback arguments,
- original array should not be mutated.

