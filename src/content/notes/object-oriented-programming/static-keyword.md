---
title: "Static Keyword"
slug: "static-keyword"
description: "Static variables, methods, blocks, and static vs instance members."
track: "Object-Oriented Programming"
---

The `static` keyword means the member belongs to the class, not to individual objects.

Only one copy of a static member exists and is shared by all objects of the class.

## Static Variable

```java
class Student {
    String name;
    static String college = "ABC College";
}
```

Every object has its own `name`, but all objects share `college`.

## Static Method

A static method can be called without creating an object.

```java
class MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
}

MathUtils.add(10, 20);
```

## Why main Is Static

When a Java program starts, no objects exist yet. `main` is static so the JVM can call it without first creating an object.

## Static Block

A static block runs once when the class is loaded.

```java
class AppConfig {
    static {
        System.out.println("Class loaded");
    }
}
```

## Static vs Instance

| Static | Instance |
| --- | --- |
| Belongs to class | Belongs to object |
| One shared copy | One copy per object |
| Access using class name | Access using object reference |
| Created when class loads | Created when object is created |

## Rules

- Static methods can directly access static members.
- Static methods cannot directly access instance members.
- Instance methods can access static members.
- Constructors cannot be static.

## Interview Notes

- Static belongs to the class.
- Static variables are shared.
- Static methods do not need an object.
- Prefer `ClassName.member` for static access.
