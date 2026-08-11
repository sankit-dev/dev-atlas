---
title: "Concurrency Control"
slug: "concurrency-control"
description: "Dirty reads, non-repeatable reads, and phantom reads."
track: "Databases & SQL"
---

Concurrency control keeps simultaneous transactions from corrupting each other.

## Why It Matters

Many users can read and write the same data at the same time. Without control, results become inconsistent.

## Dirty Read

Transaction B reads uncommitted data from Transaction A.

```text
A updates balance but has not committed.
B reads that new balance.
A rolls back.
B saw data that never really existed.
```

## Non-Repeatable Read

A transaction reads the same row twice and gets different values because another transaction updated and committed between reads.

## Phantom Read

A transaction repeats a query and sees new rows because another transaction inserted matching rows.

## Lost Update

Two transactions update the same value, and one update overwrites the other.

## Techniques

- Locks.
- MVCC.
- Isolation levels.
- Optimistic concurrency.
- Pessimistic concurrency.

## Interview Notes

- Dirty read involves uncommitted data.
- Non-repeatable read involves changed existing rows.
- Phantom read involves new or removed matching rows.
- Isolation levels decide which anomalies are allowed.
- Higher isolation improves correctness but can reduce concurrency.
