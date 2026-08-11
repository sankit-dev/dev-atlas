---
title: "Stored Procedures & Triggers"
slug: "stored-procedures-and-triggers"
description: "Stored procedures, functions, and triggers."
track: "Databases & SQL"
---

Stored procedures, functions, and triggers move logic into the database.

## Stored Procedure

A stored procedure is a saved block of SQL that can perform operations.

Use cases:

- Batch updates.
- Complex multi-step DB operations.
- Administrative tasks.
- Data migration routines.

## Function

A function returns a value and is often used inside queries.

```sql
SELECT calculate_tax(amount)
FROM orders;
```

## Trigger

A trigger runs automatically when an event happens.

Events:

- BEFORE INSERT.
- AFTER INSERT.
- BEFORE UPDATE.
- AFTER DELETE.

Example use cases:

- Audit logs.
- Updated timestamp.
- Prevent invalid changes.
- Maintain derived tables.

## Tradeoffs

Benefits:

- Runs close to data.
- Centralizes database rules.
- Can reduce application round trips.

Risks:

- Logic becomes hidden from application code.
- Harder to test and version.
- Can surprise developers.
- Database-specific syntax.

## Interview Notes

- Procedure performs actions.
- Function returns a value.
- Trigger runs automatically on DB events.
- Use triggers carefully; hidden side effects can make systems harder to reason about.
