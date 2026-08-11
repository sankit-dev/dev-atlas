---
title: "Access Modifiers"
slug: "access-modifiers"
description: "Public, private, protected, and package-private access."
track: "Object-Oriented Programming"
---

Access modifiers control who can access classes, fields, methods, and constructors.

## Java Access Levels

- `public`
- `protected`
- default/package-private
- `private`

## Visibility Table

| Modifier | Same Class | Same Package | Child Different Package | Other Classes |
| --- | --- | --- | --- | --- |
| public | Yes | Yes | Yes | Yes |
| protected | Yes | Yes | Yes | No |
| default | Yes | Yes | No | No |
| private | Yes | No | No | No |

## public

Accessible from anywhere.

## private

Accessible only inside the same class. This is the most restrictive and is commonly used for encapsulation.

```java
class BankAccount {
    private double balance;
}
```

## protected

Accessible within the same package and by child classes, even in different packages.

Useful when designing inheritance hierarchies.

## default

If no modifier is written, the member is package-private. It is accessible only inside the same package.

## Interview Notes

- `private` is most restrictive.
- `public` is least restrictive.
- Default means package-private.
- `private` helps enforce encapsulation.
- `protected` is usually used when subclasses need access.
