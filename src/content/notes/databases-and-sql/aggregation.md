---
title: "Aggregation"
slug: "aggregation"
description: "COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING."
track: "Databases & SQL"
---

Aggregation summarizes multiple rows into calculated results.

## Common Aggregate Functions

| Function | Meaning |
| --- | --- |
| COUNT | Number of rows |
| SUM | Total |
| AVG | Average |
| MIN | Smallest value |
| MAX | Largest value |

## Examples

```sql
SELECT COUNT(*) AS employee_count
FROM employees;
```

```sql
SELECT AVG(salary) AS avg_salary
FROM employees;
```

## GROUP BY

Groups rows before aggregation.

```sql
SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department;
```

Every selected non-aggregated column should appear in `GROUP BY`.

## HAVING

`WHERE` filters rows before grouping. `HAVING` filters groups after aggregation.

```sql
SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

## COUNT(*) vs COUNT(column)

- `COUNT(*)` counts rows.
- `COUNT(column)` counts non-null values in that column.

## Interview Notes

- Aggregates summarize rows.
- `GROUP BY` creates groups.
- `HAVING` filters aggregate groups.
- `WHERE` cannot directly filter on aggregate results.
