---
title: "Isolation Levels"
slug: "isolation-levels"
description: "Read uncommitted, read committed, repeatable read, and serializable."
track: "Databases & SQL"
---

Isolation levels define how much one transaction is protected from concurrent transactions.

## Read Uncommitted

Lowest isolation. May allow dirty reads.

Rarely appropriate for critical data.

## Read Committed

A transaction sees only committed data.

Prevents dirty reads, but non-repeatable reads can still happen.

Common default in databases like PostgreSQL and SQL Server.

## Repeatable Read

Rows read once stay stable for the transaction.

Prevents dirty and non-repeatable reads. Phantom behavior depends on DBMS implementation.

## Serializable

Highest isolation. Transactions behave as if executed one by one.

Most correct, but can reduce concurrency or cause retries.

## Comparison

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| --- | --- | --- | --- |
| Read Uncommitted | Possible | Possible | Possible |
| Read Committed | Prevented | Possible | Possible |
| Repeatable Read | Prevented | Prevented | DB-dependent |
| Serializable | Prevented | Prevented | Prevented |

## Tradeoff

Higher isolation means stronger correctness but lower concurrency and more locking/retry costs.

## Interview Notes

- Isolation is the I in ACID.
- Read committed prevents dirty reads.
- Serializable is safest but most expensive.
- Real DBMS behavior can vary, especially with MVCC implementations.
