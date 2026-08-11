---
title: "Common OOP Interview Questions"
slug: "common-oop-interview-questions"
description: "Frequently asked OOP interview questions."
track: "Object-Oriented Programming"
---

Use this as a quick revision page before interviews.

## What are the four pillars of OOP?

- Encapsulation: protect data and expose controlled methods.
- Abstraction: hide implementation details.
- Inheritance: reuse and specialize parent behavior.
- Polymorphism: one interface, many implementations.

## Class vs Object

A class is a blueprint. An object is an instance created from that blueprint.

## Encapsulation vs Abstraction

| Encapsulation | Abstraction |
| --- | --- |
| Hides/protects data | Hides implementation details |
| Uses private fields and methods | Uses interfaces, abstract classes, simple APIs |

## Overloading vs Overriding

| Overloading | Overriding |
| --- | --- |
| Same name, different parameters | Same signature, child implementation |
| Compile-time | Runtime |
| Inheritance not required | Inheritance required |

## Abstract Class vs Interface

Abstract class is useful for related classes sharing state or behavior. Interface is useful for common capabilities across related or unrelated classes.

## Association vs Aggregation vs Composition

- Association: objects know each other.
- Aggregation: weak has-a, child can exist independently.
- Composition: strong has-a, child lifecycle depends on parent.

## Why prefer composition over inheritance?

Composition is more flexible, easier to test, and avoids fragile parent-child hierarchies. Use inheritance only when the relationship is truly is-a.

## What is polymorphism?

Polymorphism allows the same method or interface to behave differently depending on the object or method signature.

## What is dynamic dispatch?

Dynamic dispatch is runtime method selection based on the actual object type, not just the reference type.

## What is SOLID?

- SRP: one responsibility.
- OCP: extend without modifying.
- LSP: child can replace parent safely.
- ISP: small focused interfaces.
- DIP: depend on abstractions.

## What is the difference between 401 and 403 in OOP?

This is not an OOP question; it belongs to authentication/authorization. In OOP interviews, be careful not to mix domains. For OOP, focus on identity of objects, relationships, responsibilities, and behavior.

## Interview Advice

Do not just define concepts. Explain:

- The problem the concept solves.
- A small example.
- When it can be misused.
- How it appears in backend systems.
