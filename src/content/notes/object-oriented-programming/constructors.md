---
title: "Constructors"
slug: "constructors"
description: "Why constructors exist, how they protect valid objects, and how this() and super() work."
track: "Object-Oriented Programming"
---

A constructor is the code Java runs when you create an object with `new`. Its main job is to make sure the object starts life in a **valid, usable state**.

## Why do we need a constructor?

Imagine an `ApiKey` object. It should never exist without an owner and an expiry date. If any code can create a blank object and fill fields later, another piece of code might use it before it is complete.

```java
// Easy to create an invalid object.
ApiKey key = new ApiKey();
key.ownerId = null;
```

A constructor makes the required information impossible to skip:

```java
class ApiKey {
    private final String ownerId;
    private final Instant expiresAt;

    ApiKey(String ownerId, Instant expiresAt) {
        if (ownerId == null || ownerId.isBlank()) {
            throw new IllegalArgumentException("ownerId is required");
        }
        this.ownerId = ownerId;
        this.expiresAt = expiresAt;
    }
}

ApiKey key = new ApiKey("user-42", Instant.parse("2027-01-01T00:00:00Z"));
```

That is the real purpose: constructors establish an object’s invariants—the facts that must be true whenever the object exists.

## What happens during `new`?

When Java evaluates `new ApiKey(...)`, it allocates space for the object, gives fields their default values, then calls the constructor. Only after the constructor finishes does your variable receive the reference.

So a constructor is not an ordinary method. It has the class name, has no return type, and runs automatically during creation.

## No-argument and parameterized constructors

A **no-argument constructor** needs no values. A **parameterized constructor** receives the values needed to create the object.

```java
class RetryPolicy {
    private final int maxAttempts;

    RetryPolicy() {              // no-argument constructor
        this(3);                 // choose a sensible default
    }

    RetryPolicy(int maxAttempts) { // parameterized constructor
        if (maxAttempts < 1) throw new IllegalArgumentException("Must retry at least once");
        this.maxAttempts = maxAttempts;
    }
}
```

If you write no constructor at all, Java provides a no-argument constructor. Once you write any constructor, Java stops providing that automatic one.

## Constructor overloading and `this()`

One class can offer more than one creation path. This is **constructor overloading**. Use `this(...)` to delegate to the most complete constructor, so validation and setup live in one place.

```java
class AuditEvent {
    private final String action;
    private final Instant occurredAt;

    AuditEvent(String action) {
        this(action, Instant.now());
    }

    AuditEvent(String action, Instant occurredAt) {
        this.action = action;
        this.occurredAt = occurredAt;
    }
}
```

`this(...)` must be the first statement because it hands construction to another constructor of the same object.

## `super()` and parent setup

When a class extends another class, Java must initialise the parent part first. `super(...)` calls the parent constructor.

```java
class DomainEvent {
    final String eventId;

    DomainEvent(String eventId) { this.eventId = eventId; }
}

class SubscriptionCancelled extends DomainEvent {
    final String subscriptionId;

    SubscriptionCancelled(String eventId, String subscriptionId) {
        super(eventId);
        this.subscriptionId = subscriptionId;
    }
}
```

`super(...)` also has to be first. You cannot use both `this(...)` and `super(...)` directly in the same constructor, because both must be first. If you write neither, Java inserts `super()` only when the parent has a no-argument constructor.

## When not to put work in a constructor

Constructors should establish valid state, not do slow or failure-prone work such as network requests, database queries, or sending email. That makes objects difficult to create and test. Use a factory or service method for that work instead.

## Interview answer in one breath

**What is a constructor and why is it needed?**

A constructor is special code that runs when an object is created. It initialises required state and validates invariants, so the rest of the program cannot observe an incomplete or invalid object. Constructors can be overloaded; `this()` chains constructors in the same class and `super()` initialises the parent class first.
