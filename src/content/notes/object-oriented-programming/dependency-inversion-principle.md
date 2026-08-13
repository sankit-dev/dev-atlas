---
title: "Dependency Inversion Principle"
slug: "dependency-inversion-principle"
description: "High-level code should depend on abstractions, not concrete low-level classes."
track: "Object-Oriented Programming"
---

# Dependency Inversion Principle

# What problem is this solving?

Business logic often becomes hard to test and change when it directly creates concrete tools like email clients, payment SDKs, database clients, or storage clients.

DIP solves this by making high-level code depend on stable abstractions.

---

# Simple definition

The **Dependency Inversion Principle** says:

> **High-level modules should not depend on low-level modules. Both should depend on abstractions.**

This is the **D** in SOLID.

---

# Understand each word

### Dependency

A dependency is something a class needs to do its work.

Examples:

- database repository
- email client
- payment gateway
- file storage client
- external API client

### Inversion

Inversion means reversing the usual dependency direction.

Without DIP, business logic directly creates and uses concrete tools.

With DIP, business logic depends on an interface, and concrete tools implement that interface.

### Principle

The guideline is:

> **Business logic should depend on stable contracts, not concrete details.**

---

# Bad/naive example

Suppose order logic directly uses an email client:

```java
class OrderService {
    void placeOrder(Order order) {
        // save order

        EmailClient emailClient = new EmailClient();
        emailClient.send(order.customerEmail(), "Order placed");
    }
}
```

Problem:

`OrderService` is high-level business logic.

`EmailClient` is a low-level technical detail.

Now `OrderService` is tightly coupled to email.

If tomorrow we send SMS or WhatsApp instead, we must modify business logic.

Testing is also harder because it creates a real email client inside the method.

---

# Better explanation

Create an abstraction:

```java
interface NotificationSender {
    void send(String to, String message);
}
```

Business logic depends on the abstraction:

```java
class OrderService {
    private final NotificationSender notificationSender;

    OrderService(NotificationSender notificationSender) {
        this.notificationSender = notificationSender;
    }

    void placeOrder(Order order) {
        // save order
        notificationSender.send(order.customerEmail(), "Order placed");
    }
}
```

Concrete implementations depend on the same abstraction:

```java
class EmailNotificationSender implements NotificationSender {
    public void send(String to, String message) {
        EmailClient emailClient = new EmailClient();
        emailClient.send(to, message);
    }
}

class SmsNotificationSender implements NotificationSender {
    public void send(String to, String message) {
        SmsClient smsClient = new SmsClient();
        smsClient.send(to, message);
    }
}
```

Now `OrderService` does not care whether notification is email, SMS, or something else.

---

# Why is it called Inversion?

Normally, code often points like this:

```plain text
OrderService → EmailClient
```

High-level policy depends on low-level detail.

With DIP:

```plain text
OrderService → NotificationSender ← EmailNotificationSender
```

Both depend on the abstraction.

The dependency direction is inverted.

---

# DIP vs Dependency Injection

These two are related but not the same.

**Dependency Inversion Principle** is the design idea:

> depend on abstractions, not concrete classes

**Dependency Injection** is one way to implement it:

> pass dependencies from outside instead of creating them inside

Example:

```java
OrderService(NotificationSender notificationSender) {
    this.notificationSender = notificationSender;
}
```

That constructor is dependency injection.

---

# Common mistake

Do not confuse Dependency Inversion with simply passing objects around.

The important idea is that high-level logic depends on an abstraction, not on a concrete low-level class.

---

# Interview Answer

If an interviewer asks:

> **What is Dependency Inversion Principle?**

You can answer:

Dependency Inversion Principle means high-level business logic should not depend directly on low-level concrete classes. Both should depend on abstractions. For example, an `OrderService` should depend on a `NotificationSender` interface instead of directly creating an `EmailClient`. This makes the code easier to test and easier to extend with email, SMS, or other notification channels.
