---
title: "Open/Closed Principle"
slug: "open-closed-principle"
description: "Code should be open for extension but closed for modification."
track: "Object-Oriented Programming"
---

# Open/Closed Principle

The **Open/Closed Principle** says:

> **Software entities should be open for extension but closed for modification.**

This is the **O** in SOLID.

---

# Understand each word

### Open

Open means we should be able to add new behavior.

Example:

- Add UPI payment.
- Add PayPal payment.
- Add card payment.

### Closed

Closed means existing stable code should not need repeated changes for every new variation.

It does not mean code can never be edited.

It means we avoid editing the same tested logic again and again just to add a new type.

### Extension

Extension means adding new behavior through a new class, function, or implementation.

### Modification

Modification means changing existing code that already works.

---

# Bad Example

Suppose payment logic is written like this:

```java
class PaymentService {
    void pay(String type, double amount) {
        if (type.equals("CARD")) {
            System.out.println("Paying by card");
        } else if (type.equals("UPI")) {
            System.out.println("Paying by UPI");
        } else if (type.equals("NET_BANKING")) {
            System.out.println("Paying by net banking");
        }
    }
}
```

Now suppose we add PayPal.

We must modify `PaymentService`:

```java
else if (type.equals("PAYPAL")) {
    System.out.println("Paying by PayPal");
}
```

Every new payment type changes old code.

That is the problem.

---

# Better Design

Create a contract:

```java
interface PaymentMethod {
    void pay(double amount);
}
```

Each payment method implements it:

```java
class CardPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paying by card");
    }
}

class UpiPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paying by UPI");
    }
}

class NetBankingPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paying by net banking");
    }
}
```

The service depends on the contract:

```java
class PaymentService {
    void pay(PaymentMethod paymentMethod, double amount) {
        paymentMethod.pay(amount);
    }
}
```

Now to add PayPal:

```java
class PayPalPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paying by PayPal");
    }
}
```

We added new behavior without changing `PaymentService`.

That is Open/Closed Principle.

---

# When not to use it

Do not create abstractions for imaginary future cases.

If there is only one payment method and no real variation, a simple class is fine.

Use OCP when:

- variations already exist
- variations are likely
- old code is becoming a long `if/else` or `switch`

---

# Interview Answer

If an interviewer asks:

> **What is Open/Closed Principle?**

You can answer:

Open/Closed Principle means code should be open for extension but closed for modification. We should be able to add new behavior by adding new implementations instead of repeatedly changing stable existing logic. For example, instead of editing a payment service every time a new payment method is added, we can define a `PaymentMethod` interface and add new implementations like `CardPayment`, `UpiPayment`, or `PayPalPayment`.
