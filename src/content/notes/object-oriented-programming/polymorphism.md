---
title: "Polymorphism"
slug: "polymorphism"
description: "Method overloading, method overriding, and dynamic dispatch."
track: "Object-Oriented Programming"
---

Polymorphism means one interface, many forms.

The same method call can behave differently depending on the object.

## Runtime Polymorphism

```java
interface ReceiptChannel { void send(); }

class EmailChannel implements ReceiptChannel {
    public void send() { System.out.println("Email sent"); }
}

ReceiptChannel channel = new EmailChannel();
channel.send();
```

The reference type is `ReceiptChannel`, but the actual object is `EmailChannel`, so its `send()` method runs.

## Compile-Time Polymorphism

Method overloading:

```java
add(int a, int b)
add(int a, int b, int c)
add(double a, double b)
```

The compiler selects the method based on arguments.

## Overloading vs Overriding

| Overloading | Overriding |
| --- | --- |
| Same method name, different parameters | Same signature, child changes implementation |
| Same class usually | Parent-child relationship |
| Compile-time polymorphism | Runtime polymorphism |
| Inheritance not required | Inheritance required |

## Why Polymorphism Matters

You can write code against a common parent or interface and plug in different implementations.

```java
Payment payment = new UpiPayment();
payment.pay();
payment = new CardPayment();
payment.pay();
```

## Interview Notes

- Polymorphism means one interface, many forms.
- Overloading is compile-time polymorphism.
- Overriding is runtime polymorphism.
- Runtime method dispatch uses the actual object type.
