---
title: "Locking"
slug: "locking"
description: "Shared locks, exclusive locks, row locks, table locks, optimistic locking, and pessimistic locking."
track: "Databases & SQL"
---

Locks control concurrent access to database data.

## Shared Lock

Used for reading. Multiple transactions can usually hold shared locks on the same data.

## Exclusive Lock

Used for writing. Prevents other transactions from writing and often from reading depending on isolation and DBMS.

## Row Lock

Locks specific rows.

```sql
SELECT *
FROM accounts
WHERE id = 1
FOR UPDATE;
```

## Table Lock

Locks an entire table. Simpler but reduces concurrency.

## Pessimistic Locking

Assumes conflicts are likely. Lock before modifying.

Useful for high-conflict data like account balances or inventory.

## Optimistic Locking

Assumes conflicts are rare. Detect conflict at update time, often using a version column.

```sql
UPDATE products
SET stock = stock - 1,
    version = version + 1
WHERE id = 10
  AND version = 3;
```

If zero rows update, someone else changed it first.

## Interview Notes

- Shared locks are read-oriented.
- Exclusive locks are write-oriented.
- Row locks allow more concurrency than table locks.
- Optimistic locking is common in backend applications.
- Pessimistic locking is useful when conflicts are expensive or likely.
