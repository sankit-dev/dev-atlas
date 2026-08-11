---
title: "Deadlocks"
slug: "deadlocks"
description: "Causes, detection, prevention, and resolution."
track: "Databases & SQL"
---

A deadlock happens when transactions wait on each other forever.

## Example

```text
Transaction A locks row 1.
Transaction B locks row 2.
A waits for row 2.
B waits for row 1.
```

Neither can continue.

## Why Deadlocks Happen

- Multiple locks acquired in different order.
- Long transactions.
- User interaction inside transactions.
- Missing indexes causing wider locks.
- High contention hot rows.

## Detection

Databases detect deadlocks by building a wait-for graph. When a cycle is found, the DB aborts one transaction.

## Resolution

One transaction is chosen as the victim and rolled back. The application should retry when safe.

## Prevention

- Acquire locks in consistent order.
- Keep transactions short.
- Index filtering columns.
- Avoid unnecessary locks.
- Retry deadlock failures.
- Do not wait for external services while holding DB locks.

## Deadlock vs Lock Wait

| Lock Wait | Deadlock |
| --- | --- |
| One transaction waits | Transactions wait cyclically |
| May resolve naturally | Cannot resolve without abort |

## Interview Notes

- Deadlock is circular waiting.
- DBMS usually detects and aborts one transaction.
- Applications should handle retries.
- Consistent lock ordering is a common prevention technique.
