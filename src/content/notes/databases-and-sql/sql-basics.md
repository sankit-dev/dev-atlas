---
title: "SQL Basics"
slug: "sql-basics"
description: "SELECT, WHERE, ORDER BY, DISTINCT, LIMIT, LIKE, IN, BETWEEN, IS NULL, and CASE."
track: "Databases & SQL"
---

SQL is the language used to communicate with relational databases.

## SQL Command Categories

| Category | Purpose | Examples |
| --- | --- | --- |
| DDL | Define structure | CREATE, ALTER, DROP, TRUNCATE |
| DML | Manipulate data | INSERT, UPDATE, DELETE |
| DQL | Query data | SELECT |
| DCL | Control permissions | GRANT, REVOKE |
| TCL | Control transactions | COMMIT, ROLLBACK, SAVEPOINT |

## SELECT

```sql
SELECT name, salary
FROM employees;
```

`SELECT *` is fine for quick exploration, but production queries should usually select only needed columns.

## WHERE

```sql
SELECT *
FROM employees
WHERE department = 'IT';
```

## ORDER BY

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC;
```

## LIMIT

```sql
SELECT *
FROM employees
LIMIT 10;
```

## DISTINCT

```sql
SELECT DISTINCT department
FROM employees;
```

## CASE

```sql
SELECT name,
  CASE
    WHEN salary >= 100000 THEN 'high'
    ELSE 'normal'
  END AS salary_band
FROM employees;
```

## Logical Execution Order

```text
FROM
WHERE
GROUP BY
HAVING
SELECT
ORDER BY
LIMIT
```

## DELETE vs TRUNCATE vs DROP

| DELETE | TRUNCATE | DROP |
| --- | --- | --- |
| Removes selected rows | Removes all rows | Removes table |
| Can use WHERE | No WHERE | Structure gone |
| Table remains | Table remains | Table gone |

## Interview Notes

- SQL is case-insensitive for keywords.
- Avoid `SELECT *` in production.
- `WHERE` filters rows before grouping.
- `HAVING` filters groups after aggregation.
