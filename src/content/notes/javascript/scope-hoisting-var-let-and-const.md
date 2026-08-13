---
title: "Scope, Hoisting, var, let and const"
slug: "scope-hoisting-var-let-and-const"
description: "How variable visibility and declaration behavior work."
track: "JavaScript"
priority: "Must Know"
---

# Scope, Hoisting, var, let and const

Scope decides where a variable can be accessed.

Hoisting decides how declarations are treated before code runs.

## Scope

Common scopes:

- global scope,
- function scope,
- block scope.

Example:

```js
if (true) {
  const name = 'DevAtlas'
}

console.log(name) // ReferenceError
```

`name` is block-scoped, so it cannot be used outside the `if` block.

## var vs let vs const

| Keyword | Scope | Reassign | Redeclare |
| --- | --- | --- | --- |
| `var` | function | yes | yes |
| `let` | block | yes | no |
| `const` | block | no | no |

Prefer `const` by default.

Use `let` when reassignment is needed.

Avoid `var` in modern JavaScript.

## Hoisting

Declarations are processed before code executes.

`var` is hoisted and initialized with `undefined`:

```js
console.log(a) // undefined
var a = 10
```

`let` and `const` are also hoisted, but they are not usable before declaration:

```js
console.log(b) // ReferenceError
let b = 10
```

This unavailable period is called the temporal dead zone.

## Interview answer

Scope controls where variables are accessible. `var` is function-scoped, while `let` and `const` are block-scoped. Hoisting means declarations are processed before execution. `var` is initialized as `undefined`, but `let` and `const` stay in the temporal dead zone until their declaration line is reached.

