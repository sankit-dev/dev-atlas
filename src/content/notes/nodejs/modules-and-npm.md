---
title: "Modules and NPM"
slug: "modules-and-npm"
description: "CommonJS, ES Modules, npm packages, and project dependencies."
track: "Node.js"
priority: "Must Know"
---

# Modules and NPM

Large Node.js apps are split into modules.

A module is a file or package that exposes some functionality and imports functionality from somewhere else.

## Why modules exist

Without modules, all backend code would sit in one huge file.

Modules let you separate:

- routes,
- controllers,
- services,
- config,
- database logic,
- utilities.

## CommonJS

Older Node.js projects often use CommonJS.

Export:

```js
function add(a, b) {
  return a + b
}

module.exports = { add }
```

Import:

```js
const { add } = require('./math')
```

## ES Modules

Modern JavaScript uses ES Modules.

Export:

```js
export function add(a, b) {
  return a + b
}
```

Import:

```js
import { add } from './math.js'
```

In Node.js, ES Modules usually need `"type": "module"` in `package.json` or `.mjs` files.

## What is npm?

`npm` is the package manager commonly used with Node.js.

It helps you:

- install packages,
- manage dependencies,
- run scripts,
- publish packages.

Example:

```bash
npm install express
```

This adds Express as a dependency.

## dependencies vs devDependencies

```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "vitest": "^2.0.0"
  }
}
```

`dependencies` are needed to run the app.

`devDependencies` are needed only during development, testing, or building.

## Interview answer

Modules help organize Node.js code into reusable files. Node supports CommonJS with `require/module.exports` and ES Modules with `import/export`. npm is the package manager used to install dependencies, run scripts, and manage project packages through `package.json`.

