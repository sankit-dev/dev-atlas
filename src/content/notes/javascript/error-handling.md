---
title: "Error Handling"
slug: "error-handling"
description: "try/catch, throwing errors, and handling async failures."
track: "JavaScript"
priority: "Must Know"
---

# Error Handling

Errors are part of real applications.

Good JavaScript code should fail clearly instead of silently breaking.

## try catch

```js
try {
  JSON.parse('{bad json}')
} catch (error) {
  console.error('Invalid JSON')
}
```

`try/catch` handles synchronous errors.

## Throwing custom errors

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero')
  }

  return a / b
}
```

Throw when the function cannot continue correctly.

## Async errors

Use `try/catch` inside async functions:

```js
async function getUser() {
  try {
    const response = await fetch('/api/user')
    return await response.json()
  } catch (error) {
    console.error('Request failed', error)
    throw error
  }
}
```

## Common mistake

Do not swallow errors without action.

Bad:

```js
catch (error) {}
```

If you catch an error, log it, transform it, show a message, retry, or rethrow it.

## Interview answer

JavaScript errors can be handled with `try/catch`. For async code, rejected promises should be handled with `.catch` or `try/catch` inside async functions. I avoid swallowing errors silently and prefer clear error messages or rethrowing when a higher layer should handle the failure.

