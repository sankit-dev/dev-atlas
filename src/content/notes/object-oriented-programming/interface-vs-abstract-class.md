---
title: "Interface vs Abstract Class"
slug: "interface-vs-abstract-class"
description: "Differences, use cases, and backend examples."
track: "Object-Oriented Programming"
---

Abstract classes and interfaces both define abstraction, but they are used for different design intentions.

## Abstract Class

An abstract class cannot be instantiated directly. It provides a common base for related classes.

It can contain:

- Abstract methods.
- Concrete methods.
- Fields.
- Constructors.

```java
abstract class Vehicle {
    void startEngine() {
        System.out.println("Engine started");
    }

    abstract void move();
}
```

Use an abstract class when related classes share common state or behavior.

## Interface

An interface defines a contract: what a class can do.

```java
interface Payment {
    void pay();
}

class UpiPayment implements Payment {
    public void pay() {
        System.out.println("Paid using UPI");
    }
}
```

Use an interface when unrelated classes share a capability.

## Key Difference

- Abstract class: what something is.
- Interface: what something can do.

Example:

- Car is a Vehicle.
- Car can be Chargeable.
- Phone can be Chargeable.

## Comparison

| Abstract Class | Interface |
| --- | --- |
| Uses `extends` | Uses `implements` |
| Is-a relationship | Can-do capability |
| Can have shared state | Usually behavior contract |
| Can have constructors | Cannot have constructors |
| One class can extend one class | One class can implement many interfaces |

## Interview Notes

- You cannot instantiate an abstract class.
- Abstract classes can have constructors.
- Interfaces cannot have constructors.
- Java classes can implement multiple interfaces.
- Prefer interfaces for flexible contracts; abstract classes for shared base behavior and state.
