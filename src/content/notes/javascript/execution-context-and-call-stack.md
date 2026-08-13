---
title: "Execution Context and Call Stack"
slug: "execution-context-and-call-stack"
description: "How JavaScript runs code step by step."
track: "JavaScript"
priority: "Must Know"
---

# Execution Context and Call Stack

Before understanding hoisting, closures, or async code, you need to know how JavaScript runs code.

## Execution context

An execution context is the environment where JavaScript code runs.

It contains:

- variables,
- functions,
- current scope,
- value of `this`,
- reference to outer scope.

When a script starts, JavaScript creates a global execution context.

When a function is called, JavaScript creates a function execution context.

## Call stack

The call stack tracks which function is currently running.

Example:

```js
function first() {
  second()
}

function second() {
  console.log('hello')
}

first()
```

Flow:

```text
global -> first -> second -> console.log
```

When `second` finishes, it leaves the stack. Then `first` finishes. Then global code finishes.

## Why this matters

JavaScript runs synchronous code line by line on the call stack.

Async callbacks do not interrupt the current stack. They wait until the stack is empty.

This is why event loop understanding depends on call stack understanding.

## Interview answer

An execution context is the environment created to run JavaScript code. The call stack is the stack structure JavaScript uses to track active function calls. Each function call creates a new execution context, pushed onto the stack, and it is popped when the function finishes.

