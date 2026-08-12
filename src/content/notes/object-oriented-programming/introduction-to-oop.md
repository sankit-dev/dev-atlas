---
title: "Introduction to OOP"
slug: "introduction-to-oop"
description: "Why OOP emerged, where it is useful today, and how it relates to functional programming."
track: "Object-Oriented Programming"
---

Object-oriented programming (OOP) is a way to organise code around **objects**: small units that keep related data and the operations allowed on that data together.

For example, a subscription in a backend system has a plan, a status, and a renewal date. It also has rules: it can be cancelled, renewed, or paused. OOP lets one object own both the subscription’s state and those rules.

```java
class Subscription {
    private String plan;
    private boolean active;

    Subscription(String plan) {
        this.plan = plan;
        this.active = true;
    }

    void cancel() {
        if (!active) throw new IllegalStateException("Already cancelled");
        active = false;
    }
}
```

## Why did OOP emerge?

Early programs were often small: data sat in variables and functions changed it. As software grew into systems with many developers, shared data became difficult to protect. Any function could change it in the wrong order, and changing one feature could unexpectedly affect another.

OOP became popular because it gives code boundaries. A `Subscription` can protect its own rules instead of allowing every part of the application to edit its state directly. Teams can then reason about the system as collaborating parts instead of one large collection of functions and variables.

This is the problem OOP is trying to solve—not “make everything look like a real-world object.”

## What are class, object, state, and behaviour?

- A **class** is code that defines a kind of thing and its rules, such as `Subscription`.
- An **object** is one actual instance, such as the subscription for user 42.
- **State** is the data it currently holds: `plan = "pro"`, `active = true`.
- **Behaviour** is what it can do: `cancel()` or `renew()`.

The class is not valuable just because it groups fields and methods. It is valuable when it protects an important rule or makes a responsibility easier to understand.

## OOP vs procedural code

Here is a procedural style. The state is exposed, so callers must remember the rules themselves:

```java
record SubscriptionData(String plan, boolean active) {}

SubscriptionData cancel(SubscriptionData subscription) {
    if (!subscription.active()) throw new IllegalStateException("Already cancelled");
    return new SubscriptionData(subscription.plan(), false);
}
```

Here is an object-oriented style. The object keeps the rule beside the state it protects:

```java
class Subscription {
    private boolean active = true;

    void cancel() {
        if (!active) throw new IllegalStateException("Already cancelled");
        active = false;
    }
}
```

Neither style is automatically better. The important question is: **where should this rule live so that it stays clear and hard to misuse?**

## Is OOP still relevant when functional programming is growing?

Yes. Modern applications commonly use both.

- Use **objects** when you have long-lived state, business rules, infrastructure collaborators, or framework boundaries. Java/Spring, C#/.NET, Android, and many backend codebases are still heavily object-oriented.
- Use **functions** when a task is a straightforward transformation: format a date, calculate tax, filter a list, or map an API response to a DTO.

Functional programming encourages pure functions and immutable data, which makes code easier to test and reason about. OOP encourages clear ownership and boundaries around changing state. They are complementary tools, not competing teams.

```java
// Functional: input in, result out; no hidden state changes.
BigDecimal addTax(BigDecimal amount) {
    return amount.multiply(new BigDecimal("1.18"));
}

// OOP: the service coordinates collaborators and owns a responsibility.
class InvoiceService {
    private final TaxPolicy taxPolicy;

    InvoiceService(TaxPolicy taxPolicy) { this.taxPolicy = taxPolicy; }

    Invoice createFor(Subscription subscription) {
        return new Invoice(subscription, taxPolicy.rateFor(subscription));
    }
}
```

## Where do the four pillars fit?

- **Encapsulation**: protect valid state and expose meaningful operations.
- **Abstraction**: show a simple useful interface while hiding details.
- **Polymorphism**: use one contract with several implementations.
- **Inheritance**: reuse a true parent-child relationship. Use it carefully; composition is often more flexible.

These are tools for managing complexity, not boxes every class must tick.

> **Make this stick:** build a tiny subscription or order feature. First write it with freely editable fields; then move one business rule into a class. Notice which version makes invalid states harder to create.

## Interview answer in one breath

**What is OOP and why do we use it?**

OOP is a programming paradigm that groups related state and behaviour into objects. It became useful as software grew because it gives data and business rules clear boundaries, reducing accidental coupling. Today, teams often combine it with functional style: objects for stateful responsibilities and functions for simple, predictable transformations.
