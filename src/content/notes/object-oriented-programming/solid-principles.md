---
title: "SOLID Principles"
slug: "solid-principles"
description: "Five object-oriented design principles that make code easier to change."
track: "Object-Oriented Programming"
---

# SOLID Principles

SOLID is a group of five object-oriented design principles.

They help you write code that is easier to:

- understand
- test
- extend
- change safely

SOLID is not a rule that says every feature needs many classes.

It is a way to notice design problems when code starts becoming hard to change.

---

# What does SOLID stand for?

```plain text
S → Single Responsibility Principle
O → Open/Closed Principle
L → Liskov Substitution Principle
I → Interface Segregation Principle
D → Dependency Inversion Principle
```

Each word matters.

---

# The main idea

Bad object-oriented code usually has these problems:

- One class does too many things.
- Adding a new feature requires editing old stable code again and again.
- Child classes break behavior expected from parent classes.
- Interfaces force classes to implement methods they do not need.
- Business logic is tightly coupled to concrete tools like database clients, email clients, or payment SDKs.

SOLID gives names to these problems and suggests better structure.

---

# SOLID as a tree

```plain text
SOLID Principles
├── S: Single Responsibility Principle
├── O: Open/Closed Principle
├── L: Liskov Substitution Principle
├── I: Interface Segregation Principle
└── D: Dependency Inversion Principle
```

Read them one by one.

Do not try to memorize definitions first.

Understand the problem each principle solves.

---

# Quick Summary

<table header-row="true">
<tr>
<td>Letter</td>
<td>Principle</td>
<td>Simple Question</td>
</tr>
<tr>
<td>S</td>
<td>Single Responsibility</td>
<td>Does this class have one clear reason to change?</td>
</tr>
<tr>
<td>O</td>
<td>Open/Closed</td>
<td>Can I add new behavior without rewriting stable code?</td>
</tr>
<tr>
<td>L</td>
<td>Liskov Substitution</td>
<td>Can a child type safely replace its parent type?</td>
</tr>
<tr>
<td>I</td>
<td>Interface Segregation</td>
<td>Is this interface small enough for every implementer?</td>
</tr>
<tr>
<td>D</td>
<td>Dependency Inversion</td>
<td>Does business logic depend on an abstraction instead of a concrete tool?</td>
</tr>
</table>

---

# One Common Example

Imagine an application that handles invoice payment.

Bad design often puts everything in one class:

```java
class InvoiceService {
    void payInvoice(Invoice invoice) {
        // validate invoice
        // calculate tax
        // save payment in database
        // send receipt email
        // write audit log
    }
}
```

This looks convenient at first.

But later, different changes hit the same class:

- Tax rules change.
- Database storage changes.
- Email provider changes.
- Audit logging changes.
- Payment validation changes.

That is where SOLID becomes useful.

It helps separate responsibilities, hide change behind contracts, and make extension safer.

---

# Interview Answer

If an interviewer asks:

> **What is SOLID?**

You can answer:

SOLID is a set of five object-oriented design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. These principles help reduce coupling and make code easier to understand, test, and extend. They are guidelines, not strict rules, and should be applied when they reduce complexity.
