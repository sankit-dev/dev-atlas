---
title: "Classes in JavaScript"
slug: "classes-in-javascript"
description: "Class syntax over prototype-based behavior."
track: "JavaScript"
priority: "Important"
---

# Classes in JavaScript

JavaScript classes are syntax for creating objects with shared behavior.

They are built on top of prototypes.

## Example

```js
class User {
  constructor(name) {
    this.name = name
  }

  login() {
    return `${this.name} logged in`
  }
}

const user = new User('Asha')
console.log(user.login())
```

## What constructor does

The constructor runs when you create a new object with `new`.

```js
const user = new User('Asha')
```

It initializes object state.

## Class methods

Methods are shared through the prototype.

That means every object does not get a separate copy of the method.

## Interview answer

JavaScript classes provide cleaner syntax for creating objects and shared methods, but under the hood they use the prototype system. The constructor initializes object state, and class methods are placed on the prototype.

