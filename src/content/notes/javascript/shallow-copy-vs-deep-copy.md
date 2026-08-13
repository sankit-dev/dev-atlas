---
title: "Shallow Copy vs Deep Copy"
slug: "shallow-copy-vs-deep-copy"
description: "How object copying works and where reference bugs come from."
track: "JavaScript"
priority: "Important"
---

# Shallow Copy vs Deep Copy

Objects and arrays are reference values.

Copying them can be tricky.

## Shallow copy

A shallow copy copies only the first level.

```js
const user = {
  name: 'Asha',
  address: {
    city: 'Pune',
  },
}

const copy = { ...user }
copy.address.city = 'Mumbai'

console.log(user.address.city) // Mumbai
```

The top object was copied, but nested `address` is still shared.

## Deep copy

A deep copy copies nested objects too.

Modern JavaScript:

```js
const copy = structuredClone(user)
```

For simple JSON-safe data, people sometimes use:

```js
const copy = JSON.parse(JSON.stringify(user))
```

But this fails for functions, dates, `undefined`, maps, sets, and circular references.

## Interview answer

A shallow copy copies only the first level of an object, so nested objects may still share references. A deep copy recursively copies nested values. In modern JavaScript, `structuredClone` can be used for deep copying many data types, while JSON-based copying has limitations.

