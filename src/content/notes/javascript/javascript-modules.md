---
title: "JavaScript Modules"
slug: "javascript-modules"
description: "CommonJS vs ES Modules and how imports/exports organize code."
track: "JavaScript"
priority: "Must Know"
---

# JavaScript Modules

Modules let you split code into separate files.

Without modules, large apps become one messy file.

## ES Modules

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

Default export:

```js
export default function logger(message) {
  console.log(message)
}
```

Default import:

```js
import logger from './logger.js'
```

## CommonJS

CommonJS is common in older Node.js code.

```js
const fs = require('fs')

module.exports = {
  add,
}
```

## MERN practical view

React usually uses ES Modules.

Node.js can use CommonJS or ES Modules depending on project setup.

Do not mix them randomly in one project unless you understand the configuration.

## Interview answer

Modules help organize JavaScript code into separate files. ES Modules use `import` and `export`. CommonJS uses `require` and `module.exports`. React usually uses ES Modules, while Node.js projects may use either CommonJS or ES Modules depending on configuration.

