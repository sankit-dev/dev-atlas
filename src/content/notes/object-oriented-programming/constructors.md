---
title: "Constructors"
slug: "constructors"
description: "Default constructors, parameterized constructors, constructor chaining, this(), and super()."
track: "Object-Oriented Programming"
---

A constructor is a special member called automatically when an object is created. Its job is to initialize the object.

## Rules

- Constructor name matches the class name.
- It has no return type, not even `void`.
- It runs automatically during object creation.
- A class can have multiple constructors.

## Default Constructor

A no-argument constructor.

```java
class Car {
    Car() {
        System.out.println("Car created");
    }
}
```

If no constructor is written, Java provides a default no-argument constructor. If you write any constructor, Java does not generate one automatically.

## Parameterized Constructor

```java
class Car {
    String brand;

    Car(String brand) {
        this.brand = brand;
    }
}

Car car = new Car("BMW");
```

## Constructor Overloading

```java
class Car {
    Car() {}
    Car(String brand) {}
    Car(String brand, String color) {}
}
```

Different constructor signatures initialize objects in different ways.

## Constructor Chaining with this()

```java
class Car {
    Car() {
        this("Unknown", "White");
    }

    Car(String brand, String color) {
        // initialize
    }
}
```

`this()` calls another constructor in the same class and must be the first statement.

## super()

`super()` calls the parent constructor.

```java
class Car extends Vehicle {
    Car() {
        super();
    }
}
```

If you do not write it, Java inserts `super()` if the parent has a no-argument constructor.

## this() vs super()

| this() | super() |
| --- | --- |
| Calls same-class constructor | Calls parent constructor |
| Used for constructor chaining | Used for parent initialization |
| Must be first statement | Must be first statement |

You cannot call both in the same constructor because both must be first.

## Interview Notes

- Constructors initialize objects.
- Constructors are not inherited.
- Constructors can be overloaded but not overridden.
- Parent constructor runs before child initialization.
