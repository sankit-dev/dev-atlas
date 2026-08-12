---
title: "SOLID Principles"
slug: "solid-principles"
description: "Five practical design principles, their limits, and how they relate to functional programming."
track: "Object-Oriented Programming"
---

SOLID is a set of five guidelines for keeping **object-oriented** code easy to change. It is not a law and it is not a reason to create five classes for a ten-line feature.

Use it when a class is becoming hard to understand, test, or extend. The aim is low coupling and clear responsibilities.

## The five principles

| Letter | Principle | Practical question |
| --- | --- | --- |
| S | Single Responsibility | Does this class have one clear reason to change? |
| O | Open/Closed | Can I add a new variation without editing stable logic everywhere? |
| L | Liskov Substitution | Can any subtype safely stand in for its parent? |
| I | Interface Segregation | Is this contract small enough that implementers need every method? |
| D | Dependency Inversion | Does high-level logic rely on a contract rather than one concrete tool? |

## SOLID through one backend example

Suppose an application sends a receipt after an invoice is paid. This version is tightly coupled to email:

```java
class ReceiptService {
    void sendReceipt(Invoice invoice) {
        EmailClient client = new EmailClient();
        client.send(invoice.customerEmail(), "Your receipt");
    }
}
```

It is hard to test without email and awkward to add SMS later. Depend on a small contract instead:

```java
interface ReceiptChannel {
    void send(Invoice invoice);
}

class ReceiptService {
    private final ReceiptChannel channel;

    ReceiptService(ReceiptChannel channel) {
        this.channel = channel;
    }

    void sendReceipt(Invoice invoice) {
        channel.send(invoice);
    }
}

class EmailReceiptChannel implements ReceiptChannel {
    public void send(Invoice invoice) { /* email provider call */ }
}
```

This applies **DIP**: the business rule depends on `ReceiptChannel`, not `EmailClient`. It also makes an SMS channel an extension (**OCP**) and lets a test use a fake channel.

## S — Single Responsibility Principle

One class should have one coherent reason to change. It does not mean “one method” or “one tiny class.”

`InvoicePdfRenderer` changes when the PDF format changes. `InvoiceRepository` changes when persistence changes. Putting both jobs in `InvoiceService` couples unrelated changes.

## O — Open/Closed Principle

Prefer adding a new implementation behind a stable contract over repeatedly editing a long `if/else` chain. Do this only when variations are real and likely—not for imagined future options.

## L — Liskov Substitution Principle

If code accepts a `ReceiptChannel`, every implementation must honour that contract. A subtype that silently drops receipts or throws “not supported” for normal input breaks substitution.

LSP is mainly a warning: a bad inheritance hierarchy is usually a modelling problem. Prefer a smaller interface or composition.

## I — Interface Segregation Principle

Do not create a giant interface that forces every implementation to pretend it can do everything.

```java
interface Exporter { void exportCsv(); void exportPdf(); void exportXml(); }

// Better: each caller depends only on the capability it needs.
interface CsvExporter { void exportCsv(); }
interface PdfExporter { void exportPdf(); }
```

## Where does SOLID stand beside functional programming?

SOLID was named for object-oriented design, especially systems with mutable state, interfaces, and inheritance. Functional programming solves some of the same problems differently:

| Design goal | OOP / SOLID approach | Functional approach |
| --- | --- | --- |
| Limit responsibility | Focused class | Small focused function/module |
| Avoid mutation bugs | Encapsulate mutable state | Prefer immutable data and pure functions |
| Swap behaviour | Interface + implementation | Pass a function as a value |
| Make tests easy | Depend on a contract / inject a fake | Test pure functions with inputs and outputs |

For a calculation, a plain function is usually clearest:

```java
BigDecimal applyDiscount(BigDecimal amount, BigDecimal percent) {
    return amount.subtract(amount.multiply(percent));
}
```

For coordinating an external provider, an interface and object can be clearer because there is state, configuration, and a dependency to manage. Modern Java code often uses both styles in the same feature.

## A useful warning

Do not turn every function into a class, every field into a getter/setter, or every possible variation into an interface. SOLID should reduce complexity. If it adds ceremony without a real change boundary, keep the code simpler.

## Interview answer in one breath

SOLID is five object-oriented design principles that reduce coupling and make changes safer: focused responsibilities, extension through contracts, safe subtypes, focused interfaces, and dependencies on abstractions. Functional programming shares goals such as testability and low coupling, but often reaches them with pure functions and immutable data instead of objects and interfaces.
