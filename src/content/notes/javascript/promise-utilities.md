---
title: "Promise Utilities"
slug: "promise-utilities"
description: "Implement Promise.all, sequential execution, retry, and timeout helpers."
track: "JavaScript"
priority: "Must Know"
---

# Promise Utilities

Promise exercises test async understanding.

## Promise.all basic polyfill

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = []
    let completed = 0

    if (promises.length === 0) {
      resolve([])
      return
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value
          completed += 1

          if (completed === promises.length) {
            resolve(results)
          }
        })
        .catch(reject)
    })
  })
}
```

## Retry async function

```js
async function retry(fn, attempts) {
  let lastError

  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
    }
  }

  throw lastError
}
```

## Sequential execution

```js
async function runSequentially(tasks) {
  const results = []

  for (const task of tasks) {
    results.push(await task())
  }

  return results
}
```

## What to explain

- `Promise.all` keeps result order.
- It rejects as soon as one promise rejects.
- Sequential execution waits for one task before starting the next.
- Retry should stop after max attempts.

