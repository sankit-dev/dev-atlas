---
title: "Prototypes and Prototype Chain"
slug: "prototypes-and-prototype-chain"
description: "How JavaScript objects inherit behavior."
track: "JavaScript"
priority: "Must Know"
---

# Prototypes and Prototype Chain

JavaScript inheritance is prototype-based.

Objects can use properties and methods from another object through the prototype chain.

## Simple example

```js
const user = {
  login() {
    return 'logged in'
  },
}

const admin = Object.create(user)
admin.role = 'admin'

console.log(admin.login()) // logged in
```

`admin` does not directly have `login`.

JavaScript looks up the prototype chain and finds `login` on `user`.

## Prototype chain lookup

When you access:

```js
admin.login
```

JavaScript checks:

1. Does `admin` have `login`?
2. If not, check `admin`'s prototype.
3. Continue until found or chain ends.

## Classes use prototypes

JavaScript `class` syntax is mostly cleaner syntax over prototypes.

```js
class User {
  login() {
    return 'logged in'
  }
}
```

Methods like `login` live on `User.prototype`.

## Interview answer

JavaScript uses prototype-based inheritance. When a property is not found on an object, JavaScript looks up its prototype chain. Class syntax in JavaScript is built on top of this prototype system.

