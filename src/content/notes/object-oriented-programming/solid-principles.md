---
title: "SOLID Principles"
slug: "solid-principles"
description: "SRP, OCP, LSP, ISP, and DIP."
track: "Object-Oriented Programming"
---

SOLID is a set of five design principles for maintainable object-oriented code.

## Summary

| Letter | Principle | Simple Meaning |
| --- | --- | --- |
| S | Single Responsibility | One class should have one job |
| O | Open/Closed | Extend behavior without modifying stable code |
| L | Liskov Substitution | Child classes should safely replace parent classes |
| I | Interface Segregation | Do not force unused methods |
| D | Dependency Inversion | Depend on abstractions, not concrete classes |

## Single Responsibility Principle

A class should have one reason to change.

Bad:

```java
class UserService {
    void saveUser() {}
    void sendEmail() {}
    void generateReport() {}
}
```

Better:

```java
class UserService {}
class EmailService {}
class ReportService {}
```

## Open/Closed Principle

Code should be open for extension but closed for modification.

Instead of adding `if/else` for every payment type, depend on a common interface and add new implementations.

```java
interface Payment {
    void pay();
}

class CardPayment implements Payment {}
class UpiPayment implements Payment {}
```

## Liskov Substitution Principle

A child class should be replaceable wherever the parent is expected.

If `Bird.fly()` exists, then `Penguin extends Bird` and throws from `fly()` is a bad hierarchy. Model it with `Bird` and `FlyingBird` instead.

## Interface Segregation Principle

Do not force classes to implement methods they do not need.

Bad:

```java
interface Machine {
    void print();
    void scan();
    void fax();
}
```

Better:

```java
interface Printer { void print(); }
interface Scanner { void scan(); }
interface FaxMachine { void fax(); }
```

## Dependency Inversion Principle

High-level code should depend on abstractions, not concrete implementations.

Bad:

```java
class NotificationService {
    EmailService email = new EmailService();
}
```

Better:

```java
interface Notification {
    void send();
}

class NotificationService {
    private final Notification notification;

    NotificationService(Notification notification) {
        this.notification = notification;
    }
}
```

## Interview Notes

- SOLID reduces coupling and makes code easier to change.
- SRP keeps classes focused.
- OCP uses interfaces, abstract classes, and polymorphism.
- LSP keeps inheritance safe.
- ISP keeps interfaces small.
- DIP supports dependency injection and testability.
