---
title: "SQL Filtering & Sorting"
slug: "sql-filtering-and-sorting"
description: "Logical operators, aliases, and expressions."
track: "Databases & SQL"
---

Filtering and sorting are the daily SQL basics used to find the exact rows you need.

## Comparison Operators

```sql
SELECT *
FROM employees
WHERE salary >= 60000;
```

Common operators:

- `=`
- `!=` or `<>`
- `>`
- `<`
- `>=`
- `<=`

## Logical Operators

```sql
SELECT *
FROM employees
WHERE department = 'IT'
  AND salary > 70000;
```

Use parentheses when mixing `AND` and `OR`.

```sql
WHERE department = 'IT'
  AND (salary > 70000 OR role = 'Lead')
```

## IN

```sql
SELECT *
FROM employees
WHERE department IN ('IT', 'Finance');
```

## BETWEEN

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 50000 AND 90000;
```

`BETWEEN` is usually inclusive.

## LIKE

```sql
SELECT *
FROM employees
WHERE name LIKE 'A%';
```

- `%` matches many characters.
- `_` matches one character.

## NULL

Never compare null using `= NULL`.

```sql
WHERE manager_id IS NULL
WHERE manager_id IS NOT NULL
```

## Aliases

```sql
SELECT salary * 12 AS annual_salary
FROM employees;
```

## Interview Notes

- `WHERE` filters rows.
- `ORDER BY` sorts rows.
- `NULL` means unknown or missing, not zero.
- Use aliases to make derived columns readable.
