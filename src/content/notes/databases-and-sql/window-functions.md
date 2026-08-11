---
title: "Window Functions"
slug: "window-functions"
description: "ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), and LAG()."
track: "Databases & SQL"
---

Window functions calculate values across related rows without collapsing rows like `GROUP BY`.

## Basic Shape

```sql
SELECT
  employee_id,
  department,
  salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary
FROM employees;
```

Each row remains visible, but each row also gets a department average.

## ROW_NUMBER

```sql
SELECT *,
  ROW_NUMBER() OVER (
    PARTITION BY department
    ORDER BY salary DESC
  ) AS row_num
FROM employees;
```

Assigns unique sequence numbers.

## RANK vs DENSE_RANK

| Function | Ties | Next rank |
| --- | --- | --- |
| RANK | Same rank | Skips numbers |
| DENSE_RANK | Same rank | No gaps |

## LEAD and LAG

Compare current row with next or previous row.

```sql
SELECT
  order_date,
  amount,
  LAG(amount) OVER (ORDER BY order_date) AS previous_amount,
  LEAD(amount) OVER (ORDER BY order_date) AS next_amount
FROM orders;
```

## Top N Per Group

```sql
WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY department
      ORDER BY salary DESC
    ) AS rn
  FROM employees
)
SELECT *
FROM ranked
WHERE rn <= 3;
```

## Interview Notes

- Window functions keep row detail.
- `PARTITION BY` defines the window group.
- `ORDER BY` defines ordering inside the window.
- Common use cases: ranking, running totals, top N per group, previous/next comparison.
