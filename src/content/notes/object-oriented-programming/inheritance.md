---
title: "Inheritance"
slug: "inheritance"
description: "Types of inheritance, extends, and method overriding."
track: "Object-Oriented Programming"
---

Inheritance allows a child class to acquire properties and methods from a parent class.

It is used for code reuse and for modeling an is-a relationship.

## Example

```java
class Vehicle {
    void start() {
        System.out.println("Vehicle started");
    }
}

class Car extends Vehicle {
    void openSunroof() {
        System.out.println("Sunroof opened");
    }
}
```

`Car` inherits `start()` from `Vehicle`.

## Why Inheritance Is Used

- Reduce duplicated code.
- Reuse common behavior.
- Organize related classes.
- Enable runtime polymorphism through overriding.

## Types of Inheritance

### Single

```text
Vehicle -> Car
```

### Multilevel

```text
Vehicle -> Car -> SportsCar
```

### Hierarchical

```text
Vehicle -> Car
Vehicle -> Bike
```

### Multiple

Java does not support multiple inheritance with classes because it can create ambiguity. Java supports multiple inheritance of capability through interfaces.

## What Is Inherited?

A child inherits non-private fields and methods.

Constructors are not inherited.

## Is-A Rule

Use inheritance when the child truly is a parent type.

- Car is a Vehicle: good.
- Car is an Engine: wrong; this is composition.

## Interview Notes

- Inheritance represents an is-a relationship.
- It allows reuse of parent behavior.
- Method overriding lets child classes customize inherited behavior.
- Use inheritance carefully; wrong hierarchies create fragile code.
