---
title: "Composition vs Inheritance"
slug: "composition-vs-inheritance"
description: "Pros, cons, when to use each, and backend examples."
track: "Object-Oriented Programming"
---

Composition and inheritance are both reuse techniques, but they model different relationships.

## Inheritance

Inheritance models an is-a relationship.

```java
class Report {}
class MonthlyReport extends Report {}
```

A monthly report is a report.

Use inheritance when:

- The child truly is a parent type.
- The parent behavior is stable.
- Substitution works without surprises.
- Runtime polymorphism is needed.

## Composition

Composition models a has-a relationship.

```java
class ReportService {
    private PdfRenderer renderer;
}
```

A report service has a renderer.

Use composition when:

- You want to assemble behavior from smaller objects.
- The relationship is a capability or dependency.
- You want easier testing and replacement.
- Inheritance would create a fragile hierarchy.

## Composition Example

```java
class OrderService {
    private final PaymentGateway paymentGateway;
    private final EmailService emailService;
}
```

The service uses these collaborators; it does not inherit from them.

## Comparison

| Inheritance | Composition |
| --- | --- |
| Is-a | Has-a / uses-a |
| Compile-time hierarchy | Runtime assembly |
| Reuses parent behavior | Delegates to collaborators |
| Can become rigid | More flexible |
| Supports polymorphism | Supports dependency injection |

## Prefer Composition?

"Prefer composition over inheritance" means do not use inheritance only for code reuse. If the relationship is not truly is-a, composition is usually safer.

## Interview Notes

- Inheritance is good for true is-a hierarchies.
- Composition is better for has-a dependencies and replaceable behavior.
- Wrong inheritance can violate LSP.
- Backend services usually use composition heavily through dependency injection.
