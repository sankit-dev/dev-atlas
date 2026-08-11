---
title: "Intermediate SQL"
slug: "intermediate-sql"
description: "Subqueries, correlated subqueries, EXISTS, ANY, ALL, UNION, INTERSECT, and EXCEPT."
track: "Databases & SQL"
---

Intermediate SQL helps express multi-step questions without moving data into application code.

## Subquery

A query inside another query.

```sql
SELECT name
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);
```

## Correlated Subquery

Uses values from the outer query.

```sql
SELECT e.name
FROM employees e
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE department = e.department
);
```

Correlated subqueries can be slower because they may run per outer row.

## EXISTS

Checks whether a matching row exists.

```sql
SELECT u.name
FROM users u
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.user_id = u.id
);
```

## IN vs EXISTS

- `IN` compares values in a set.
- `EXISTS` checks matching row existence.
- `EXISTS` is often clearer for correlated relationship checks.

## Set Operators

```sql
SELECT email FROM customers
UNION
SELECT email FROM leads;
```

| Operator | Meaning |
| --- | --- |
| UNION | Combine unique rows |
| UNION ALL | Combine including duplicates |
| INTERSECT | Rows in both result sets |
| EXCEPT | Rows in first but not second |

## ANY and ALL

```sql
WHERE salary > ANY (SELECT salary FROM employees WHERE department = 'HR')
WHERE salary > ALL (SELECT salary FROM employees WHERE department = 'HR')
```

## Interview Notes

- Subqueries can return scalar, row, or table results.
- Correlated subqueries depend on the outer query.
- `UNION ALL` is faster than `UNION` when duplicates do not matter.
- Prefer joins or window functions when they make the query clearer and faster.
