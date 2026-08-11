---
title: "Method Overloading vs Overriding"
slug: "method-overloading-vs-overriding"
description: "Differences, rules, and interview questions."
track: "Object-Oriented Programming"
---

Overloading and overriding both reuse a method name, but they solve different problems.

## Method Overloading

Multiple methods with the same name but different parameter lists.

```java
class Calculator {
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
    double add(double a, double b) { return a + b; }
}
```

The compiler decides which method to call.

## Method Overriding

A child class provides its own implementation of a parent method.

```java
class Vehicle {
    void start() {
        System.out.println("Vehicle started");
    }
}

class Car extends Vehicle {
    @Override
    void start() {
        System.out.println("Car started");
    }
}
```

The JVM chooses the actual implementation at runtime.

## Comparison

| Overloading | Overriding |
| --- | --- |
| Same class usually | Parent and child classes |
| Parameters must differ | Signature must be same |
| Inheritance not required | Inheritance required |
| Compile-time polymorphism | Runtime polymorphism |
| Compiler decides | Runtime dispatch decides |

## Interview Rules

- Constructors can be overloaded.
- Constructors cannot be overridden.
- Static methods can be overloaded.
- Static methods are not truly overridden; they are hidden.
- Changing only return type does not overload a method.

## Interview Notes

- Overloading gives one operation multiple input forms.
- Overriding changes inherited behavior.
- Overriding is central to runtime polymorphism.
