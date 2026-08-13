---
title: "Promises and async await"
slug: "promises-and-async-await"
description: "How JavaScript represents and handles future async results."
track: "JavaScript"
priority: "Must Know"
---

# Promises and async await

A promise represents a value that may be available later.

It can be:

- pending,
- fulfilled,
- rejected.

## Promise example

```js
fetch('/api/users')
  .then((response) => response.json())
  .then((users) => console.log(users))
  .catch((error) => console.error(error))
```

## async await

`async/await` is cleaner syntax for working with promises.

```js
async function loadUsers() {
  try {
    const response = await fetch('/api/users')
    const users = await response.json()
    console.log(users)
  } catch (error) {
    console.error(error)
  }
}
```

`await` pauses the async function, not the entire JavaScript runtime.

## Common mistake

Do not forget to handle rejected promises.

Bad:

```js
async function loadUsers() {
  const response = await fetch('/api/users')
  return response.json()
}
```

Better:

```js
async function loadUsers() {
  try {
    const response = await fetch('/api/users')
    return await response.json()
  } catch (error) {
    throw new Error('Failed to load users')
  }
}
```

## Interview answer

A promise represents the eventual result of an asynchronous operation. It can be pending, fulfilled, or rejected. `async/await` is syntax built on promises that makes asynchronous code easier to read. Rejections should be handled with `.catch` or `try/catch`.

