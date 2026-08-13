---
title: "Transactions in MongoDB"
slug: "transactions-in-mongodb"
description: "Make multiple writes succeed or fail together."
track: "MongoDB"
priority: "Important"
---

# Transactions in MongoDB

A transaction makes multiple database operations succeed or fail together.

This matters when partial updates would corrupt business state.

## Example problem

Order placement may need to:

1. create order,
2. reduce product stock,
3. create payment record,
4. update user's order list.

If stock is reduced but order creation fails, data becomes inconsistent.

A transaction can roll everything back.

## Basic idea

```text
start transaction
write order
update stock
write payment
commit transaction
```

If something fails:

```text
abort transaction
```

## When to use transactions

Use transactions when:

- multiple writes must be atomic,
- money/order/inventory state is involved,
- partial success would be harmful.

Do not use transactions for every operation. They add overhead.

## MongoDB modeling note

Good document design can reduce the need for transactions.

If related data can be embedded in one document, single-document updates are already atomic in MongoDB.

## Interview answer

MongoDB transactions allow multiple operations across documents or collections to commit or roll back together. They are useful for workflows like order placement or payments where partial updates would create inconsistent data. They should be used when atomic multi-document writes are truly needed.

