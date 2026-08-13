---
title: "this Keyword"
slug: "this-keyword"
description: "How this is decided in different call sites."
track: "JavaScript"
priority: "Must Know"
---

# this Keyword

`this` is not decided by where a function is written.

In most cases, `this` is decided by how the function is called.

## Object method call

```js
const user = {
  name: 'Asha',
  sayName() {
    console.log(this.name)
  },
}

user.sayName() // Asha
```

Here `this` points to `user` because the function is called as `user.sayName()`.

## Detached function

```js
const speak = user.sayName
speak()
```

Now the function is not called through `user`.

So `this` is no longer `user`.

## Arrow functions

Arrow functions do not have their own `this`.

They capture `this` from the surrounding scope.

```js
const user = {
  name: 'Asha',
  sayLater() {
    setTimeout(() => {
      console.log(this.name)
    }, 1000)
  },
}
```

The arrow function uses `this` from `sayLater`.

## Interview answer

In JavaScript, `this` usually depends on the call site. In an object method call, `this` refers to the object before the dot. Arrow functions do not bind their own `this`; they use `this` from the surrounding lexical scope.

