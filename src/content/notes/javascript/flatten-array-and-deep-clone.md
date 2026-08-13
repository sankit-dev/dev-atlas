---
title: "Flatten Array and Deep Clone"
slug: "flatten-array-and-deep-clone"
description: "Handle nested arrays and object copying safely."
track: "JavaScript"
priority: "Must Know"
---

# Flatten Array and Deep Clone

These exercises test recursion and reference handling.

## Flatten array

```js
function flatten(input) {
  const result = []

  for (const item of input) {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else {
      result.push(item)
    }
  }

  return result
}

flatten([1, [2, [3, 4]]]) // [1, 2, 3, 4]
```

## Deep clone

Simple version:

```js
function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(deepClone)
  }

  const result = {}

  for (const key in value) {
    result[key] = deepClone(value[key])
  }

  return result
}
```

## Edge cases to discuss

Real deep clone can be harder because of:

- Date,
- Map,
- Set,
- functions,
- circular references,
- class instances.

For interviews, mention these limitations.

