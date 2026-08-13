---
title: "Arrays, Objects and Common Methods"
slug: "arrays-objects-and-common-methods"
description: "Working with data using map, filter, reduce, spread, rest, and destructuring."
track: "JavaScript"
priority: "Must Know"
---

# Arrays, Objects and Common Methods

Most MERN code is data transformation.

You receive data from APIs, transform it, render it, validate it, or store it.

## Important array methods

```js
const nums = [1, 2, 3, 4]

nums.map((n) => n * 2) // [2, 4, 6, 8]
nums.filter((n) => n > 2) // [3, 4]
nums.reduce((sum, n) => sum + n, 0) // 10
```

Use:

- `map` to transform,
- `filter` to keep matching items,
- `reduce` to build one result from many items,
- `find` to get first matching item,
- `some` to check if at least one item matches,
- `every` to check if all items match.

## Objects

```js
const user = {
  id: 1,
  name: 'Asha',
}
```

Common operations:

```js
Object.keys(user)
Object.values(user)
Object.entries(user)
```

## Spread and rest

Copy and update:

```js
const updatedUser = {
  ...user,
  name: 'Ravi',
}
```

Collect remaining values:

```js
const { id, ...profile } = updatedUser
```

## Interview answer

Arrays and objects are the main data structures used in JavaScript apps. Methods like `map`, `filter`, `reduce`, `find`, `some`, and `every` are used to transform and query arrays. Spread, rest, and destructuring help copy, update, and extract object or array data cleanly.

