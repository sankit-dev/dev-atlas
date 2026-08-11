---
title: "Abstraction"
slug: "abstraction"
description: "Abstract classes, interfaces, examples, and abstraction vs encapsulation."
track: "Object-Oriented Programming"
---

Abstraction hides implementation details and exposes only the functionality the user needs.

The caller knows what to do, but not how it is done internally.

## Why Abstraction Is Needed

Instead of making every caller know payment internals:

- Validate card.
- Encrypt payload.
- Contact bank.
- Retry failures.
- Store transaction.
- Send confirmation.

Expose a simple method:

```java
paymentService.pay();
```

## Examples

```javascript
app.listen(3000);
```

This hides socket creation, binding, and listening.

```java
Collections.sort(list);
```

The caller does not need to know the internal sorting implementation.

## Abstraction in Java

Common tools:

- Interfaces.
- Abstract classes.
- Public APIs that hide complex internal logic.

## Abstraction vs Encapsulation

| Abstraction | Encapsulation |
| --- | --- |
| Hides implementation complexity | Hides and protects data |
| Focuses on what is exposed | Focuses on access control |
| Example: `pay()` hides payment flow | Example: private balance with deposit/withdraw |

## Interview Notes

- Abstraction exposes essential behavior.
- It reduces complexity for callers.
- Interfaces and abstract classes are common abstraction tools.
- A function is a useful abstraction only when it hides meaningful complexity behind a simpler interface.
