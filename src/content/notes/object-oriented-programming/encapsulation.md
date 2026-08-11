---
title: "Encapsulation"
slug: "encapsulation"
description: "Data hiding, getters and setters, and benefits."
track: "Object-Oriented Programming"
---

Encapsulation wraps data and methods into one class and controls access to the data.

In simple words: keep data protected and allow changes only through controlled methods.

## Why Encapsulation Is Needed

Without encapsulation, external code can make an object invalid.

```java
account.balance = -1000;
```

Instead, expose meaningful operations.

```java
account.deposit(1000);
account.withdraw(500);
```

The object can validate each operation before changing state.

## Java Example

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

The balance cannot be changed directly from outside the class.

## Encapsulation vs Data Hiding

| Encapsulation | Data Hiding |
| --- | --- |
| Combines data and methods | Restricts direct access to data |
| Controls interaction with state | Usually done with `private` |

Data hiding is part of encapsulation, not the whole definition.

## Getter and Setter Caution

Not every field needs a getter and setter. Prefer behavior-focused methods when possible.

Prefer:

```java
deposit(amount);
withdraw(amount);
```

Over:

```java
setBalance(amount);
```

## Benefits

- Protects object state.
- Allows validation.
- Reduces coupling.
- Improves maintainability.
- Supports safer changes.

## Interview Notes

- Encapsulation means data + methods + controlled access.
- Private fields protect internal state.
- Public methods expose safe behavior.
