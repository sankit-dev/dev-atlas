---
title: "Node.js Error Handling"
slug: "node-js-error-handling"
description: "Handle sync errors, async errors, callbacks, and rejected promises."
track: "Node.js"
priority: "Must Know"
---

# Node.js Error Handling

Backend code should fail clearly.

In Node.js, errors can come from synchronous code, callbacks, promises, streams, HTTP requests, and databases.

## Synchronous errors

```js
try {
  JSON.parse('{bad json}')
} catch (error) {
  console.error('Invalid JSON', error.message)
}
```

## Promise errors

```js
async function loadUser(id) {
  try {
    const user = await getUserFromDb(id)
    return user
  } catch (error) {
    console.error('Failed to load user', error)
    throw error
  }
}
```

## Callback errors

Many older Node APIs use error-first callbacks.

```js
fs.readFile('notes.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error)
    return
  }

  console.log(data)
})
```

The first argument is usually the error.

## Operational vs programmer errors

Operational errors are expected runtime failures:

- database unavailable,
- file missing,
- invalid user input,
- network timeout.

Programmer errors are bugs:

- undefined variable,
- wrong function call,
- invalid assumption.

Handle operational errors gracefully. Fix programmer errors in code.

## Interview answer

Node.js errors can be synchronous, callback-based, promise-based, or stream-based. Synchronous errors use `try/catch`, promise errors use `.catch` or `try/catch` with async/await, and callback APIs often use error-first callbacks. Good backend code handles operational errors clearly and does not silently swallow failures.

