---
title: "Single Responsibility Principle"
slug: "single-responsibility-principle"
description: "A class should have one clear reason to change."
track: "Object-Oriented Programming"
---

# Single Responsibility Principle

# What problem is this solving?

Some classes become difficult to change because they contain many unrelated jobs.

When validation, calculation, database saving, and email sending all live in one class, many unrelated changes touch the same file.

SRP solves this by keeping each class focused.

---

# Simple definition

The **Single Responsibility Principle** says:

> **A class should have one reason to change.**

This is the **S** in SOLID.

---

# Understand each word

### Single

Single means one focused responsibility.

It does not mean one method.

A class can have multiple methods if all of them support the same responsibility.

### Responsibility

Responsibility means a job or concern owned by the class.

Examples:

- validating an invoice
- calculating tax
- saving data
- sending email
- formatting a PDF

### Principle

Principle means a design guideline.

It is not a compiler rule.

You apply it when one class is becoming hard to understand or change.

---

# Bad/naive example

Suppose we have this class:

```java
class InvoiceService {
    void processInvoice(Invoice invoice) {
        if (invoice.amount() <= 0) {
            throw new IllegalArgumentException("Invalid amount");
        }

        double tax = invoice.amount() * 0.18;
        double total = invoice.amount() + tax;

        Database.save(invoice, total);
        EmailClient.send(invoice.customerEmail(), "Invoice paid");
    }
}
```

This class is doing too many things:

- validating invoice
- calculating tax
- saving to database
- sending email

So it has many reasons to change:

- validation rule changes
- tax rule changes
- database changes
- email provider changes

That violates SRP.

---

# Better explanation

Split responsibilities into focused classes:

```java
class InvoiceValidator {
    void validate(Invoice invoice) {
        if (invoice.amount() <= 0) {
            throw new IllegalArgumentException("Invalid amount");
        }
    }
}

class TaxCalculator {
    double calculateTax(Invoice invoice) {
        return invoice.amount() * 0.18;
    }
}

class InvoiceRepository {
    void save(Invoice invoice, double total) {
        Database.save(invoice, total);
    }
}

class ReceiptSender {
    void send(Invoice invoice) {
        EmailClient.send(invoice.customerEmail(), "Invoice paid");
    }
}
```

Now the main service coordinates the workflow:

```java
class InvoiceService {
    private final InvoiceValidator validator;
    private final TaxCalculator taxCalculator;
    private final InvoiceRepository repository;
    private final ReceiptSender receiptSender;

    InvoiceService(
        InvoiceValidator validator,
        TaxCalculator taxCalculator,
        InvoiceRepository repository,
        ReceiptSender receiptSender
    ) {
        this.validator = validator;
        this.taxCalculator = taxCalculator;
        this.repository = repository;
        this.receiptSender = receiptSender;
    }

    void processInvoice(Invoice invoice) {
        validator.validate(invoice);
        double tax = taxCalculator.calculateTax(invoice);
        double total = invoice.amount() + tax;
        repository.save(invoice, total);
        receiptSender.send(invoice);
    }
}
```

Now each class has one clear reason to change.

---

# Common mistake

SRP does not mean:

> **Every class should have only one method.**

That is wrong.

This is fine:

```java
class InvoiceRepository {
    void save(Invoice invoice) {}
    Invoice findById(String id) {}
    List<Invoice> findByCustomer(String customerId) {}
}
```

All methods are related to invoice persistence.

The responsibility is still focused.

---

# Interview Answer

If an interviewer asks:

> **What is Single Responsibility Principle?**

You can answer:

Single Responsibility Principle means a class should have one clear reason to change. It should own one focused responsibility. For example, invoice validation, tax calculation, database persistence, and email sending should not all live inside one class because they change for different reasons.
