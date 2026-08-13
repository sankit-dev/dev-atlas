---
title: "Node.js vs Browser JavaScript"
slug: "node-js-vs-browser-javascript"
description: "Same language, different runtime capabilities and APIs."
track: "Node.js"
priority: "Must Know"
---

# Node.js vs Browser JavaScript

Node.js and browser JavaScript use the same language, but they run in different environments.

The difference is not the syntax.

The difference is what APIs are available.

## Browser JavaScript

Browser JavaScript is used for frontend behavior.

It can access browser APIs like:

- `document`,
- `window`,
- DOM events,
- localStorage,
- fetch,
- browser history,
- forms and UI elements.

Example:

```js
document.querySelector('button').addEventListener('click', () => {
  console.log('clicked')
})
```

This works in a browser.

It does not work in Node.js because Node does not have a DOM.

## Node.js JavaScript

Node.js is used for backend and system-level work.

It can access Node APIs like:

- `fs`,
- `path`,
- `http`,
- `process`,
- `Buffer`,
- streams,
- environment variables.

Example:

```js
import fs from 'node:fs'

const data = fs.readFileSync('notes.txt', 'utf8')
console.log(data)
```

This works in Node.js.

It does not work directly in a browser because browsers should not freely read your computer's files.

## Same language, different runtime

| Feature | Browser | Node.js |
| --- | --- | --- |
| JavaScript syntax | Yes | Yes |
| DOM access | Yes | No |
| File system access | No direct access | Yes |
| Create HTTP server | No | Yes |
| `window` object | Yes | No |
| `process` object | No | Yes |

## Why this matters in MERN

React code runs in the browser.

Express code runs in Node.js.

So this works in React:

```js
window.location.href
```

But backend code should use Node concepts:

```js
process.env.PORT
```

Mixing these up causes common beginner errors.

## Interview answer

Browser JavaScript and Node.js use the same JavaScript language, but different runtime APIs. Browsers provide DOM, window, and UI-related APIs. Node.js provides backend APIs such as file system, HTTP server, streams, Buffer, and process. React runs in the browser, while Express runs in Node.js.

