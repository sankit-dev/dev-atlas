---
title: "this & super"
slug: "this-and-super"
description: "Common use cases for this and super."
track: "Object-Oriented Programming"
---

`this` refers to the current object. `super` refers to the parent class part of the current object.

## this

Use `this` to access current object members.

```java
class Student {
    String name;

    Student(String name) {
        this.name = name;
    }
}
```

Without `this.name`, the parameter can shadow the field.

## Uses of this

- Access current object's variables.
- Call another method of the same object.
- Call another constructor using `this()`.

```java
Student() {
    this("Unknown");
}
```

## super

Use `super` to access parent members or call the parent constructor.

```java
class Car extends Vehicle {
    Car() {
        super();
    }

    void start() {
        super.start();
        System.out.println("Car started");
    }
}
```

## this vs super

| this | super |
| --- | --- |
| Current object | Parent class part |
| Current class fields/methods | Parent fields/methods |
| `this()` calls same-class constructor | `super()` calls parent constructor |

## Interview Notes

- `this()` and `super()` must be first statement in a constructor.
- They cannot both be called in the same constructor.
- Static methods cannot use `this` or `super`.
- Java inserts `super()` automatically if no parent constructor call is written and the parent has a no-arg constructor.
