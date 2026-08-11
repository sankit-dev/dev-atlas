---
title: "Transactions"
slug: "transactions"
description: "Transaction lifecycle and ACID properties."
track: "Databases & SQL"
---

A transaction is a group of database operations treated as one logical unit.

## Example

Money transfer:

1. Debit sender.
2. Credit receiver.

Both must succeed or both must fail.

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```

If something fails:

```sql
ROLLBACK;
```

## ACID

| Property | Meaning |
| --- | --- |
| Atomicity | All or nothing |
| Consistency | Rules remain valid |
| Isolation | Concurrent transactions do not corrupt each other |
| Durability | Committed data survives crashes |

## Transaction Lifecycle

```text
Begin
Execute statements
Commit or Rollback
```

## Savepoint

```sql
SAVEPOINT before_discount;
ROLLBACK TO before_discount;
```

Allows partial rollback inside a transaction.

## Interview Notes

- Transactions protect multi-step changes.
- Commit makes changes permanent.
- Rollback undoes uncommitted changes.
- ACID is central to relational database reliability.
- Isolation level controls how transactions see each other's work.
