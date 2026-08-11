---
title: "Normalization"
slug: "normalization"
description: "Data redundancy, anomalies, 1NF, 2NF, 3NF, BCNF, and denormalization."
track: "Databases & SQL"
---

Normalization organizes relational data to reduce duplication and prevent anomalies.

## Why Normalize?

Bad table:

| order_id | customer_name | customer_email | product |
| --- | --- | --- | --- |
| 1 | Rahul | r@example.com | Keyboard |
| 2 | Rahul | r@example.com | Mouse |

Customer data repeats. If email changes, many rows must update.

## Anomalies

- Insert anomaly: cannot insert one fact without another.
- Update anomaly: same data must be updated in many places.
- Delete anomaly: deleting one row accidentally removes useful data.

## 1NF

Each column should hold atomic values. No repeating groups or arrays in one cell.

## 2NF

Table is in 1NF and non-key columns depend on the whole primary key, not part of a composite key.

## 3NF

Table is in 2NF and non-key columns do not depend on other non-key columns.

## BCNF

A stricter form of 3NF where every determinant is a candidate key.

## Denormalization

Sometimes controlled duplication is added for performance.

Examples:

- Store order total instead of calculating every time.
- Keep read-optimized reporting tables.
- Cache counts or summary rows.

## Interview Notes

- Normalization reduces redundancy.
- It protects consistency.
- Denormalization improves read speed at the cost of duplication.
- Most production systems balance normalization for correctness with selective denormalization for performance.
