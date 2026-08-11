---
title: "Design Patterns"
slug: "design-patterns"
description: "Singleton, Factory, Adapter, Decorator, Strategy, and Observer."
track: "Object-Oriented Programming"
---

Design patterns are reusable solutions to common software design problems.

They are not code snippets to memorize; they are names for proven object collaboration patterns.

## Singleton

Ensures only one instance exists.

Use carefully for shared configuration or infrastructure-like objects. Avoid using it as global mutable state.

## Factory

Creates objects without exposing creation logic to callers.

```java
Payment payment = PaymentFactory.create("UPI");
```

Useful when object creation depends on input or configuration.

## Strategy

Encapsulates interchangeable algorithms behind a common interface.

```java
interface DiscountStrategy {
    int apply(int price);
}
```

Useful for payment methods, pricing rules, sorting behavior, or notification channels.

## Adapter

Converts one interface into another expected interface.

Example: wrapping a third-party payment SDK so your code can use your own `PaymentGateway` interface.

## Decorator

Adds behavior without changing the original object.

Examples:

- Add logging.
- Add caching.
- Add retry behavior.
- Add compression.

## Observer

Allows subscribers to react when something changes.

Examples:

- Event listeners.
- Notification systems.
- Domain events.

## Backend Examples

| Pattern | Backend Use |
| --- | --- |
| Factory | Create payment provider by type |
| Strategy | Choose pricing or auth logic |
| Adapter | Wrap external APIs |
| Decorator | Add logging/retry/cache |
| Observer | Publish events after order creation |
| Singleton | Shared app config or connection manager |

## Interview Notes

- Patterns are communication tools.
- Use them when they reduce real complexity.
- Do not force patterns into simple code.
- Strategy, Factory, Adapter, and Decorator are especially common in backend systems.
