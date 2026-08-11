---
title: "Window Functions"
slug: "window-functions"
description: "ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), and LAG()."
track: "Databases & SQL"
---

This is one of the **most asked SQL interview topics** in product-based companies.

Many candidates know `GROUP BY`, but very few truly understand **Window Functions**. Once you learn them, you'll solve problems that otherwise require messy subqueries.

---

## Why were Window Functions invented?

Suppose we have this table.

## Employees

<table header-row="true">
<tr>
<td>ID</td>
<td>Name</td>
<td>Department</td>
<td>Salary</td>
</tr>
<tr>
<td>1</td>
<td>Rahul</td>
<td>IT</td>
<td>60000</td>
</tr>
<tr>
<td>2</td>
<td>Priya</td>
<td>HR</td>
<td>55000</td>
</tr>
<tr>
<td>3</td>
<td>Amit</td>
<td>IT</td>
<td>70000</td>
</tr>
<tr>
<td>4</td>
<td>Neha</td>
<td>Sales</td>
<td>50000</td>
</tr>
<tr>
<td>5</td>
<td>Rohan</td>
<td>Finance</td>
<td>65000</td>
</tr>
<tr>
<td>6</td>
<td>Ankit</td>
<td>IT</td>
<td>60000</td>
</tr>
</table>

Suppose your manager asks:

> Show every employee along with their department's average salary.

Expected output:

<table header-row="true">
<tr>
<td>Name</td>
<td>Department</td>
<td>Salary</td>
<td>Department Avg</td>
</tr>
<tr>
<td>Rahul</td>
<td>IT</td>
<td>60000</td>
<td>63333</td>
</tr>
<tr>
<td>Amit</td>
<td>IT</td>
<td>70000</td>
<td>63333</td>
</tr>
<tr>
<td>Ankit</td>
<td>IT</td>
<td>60000</td>
<td>63333</td>
</tr>
</table>

Can `GROUP BY` do this?

---

## Problem with GROUP BY

If we write:

```sql
SELECT Department,
       AVG(Salary)
FROM Employees
GROUP BY Department;
```

we get one row per department.

Where did Rahul go? Where is Amit? Where is Ankit?

Gone.

Why?

## GROUP BY collapses multiple rows into one.

Window Functions solve this. They calculate aggregated values **without collapsing rows**.

Every employee remains visible.

---

## What is a Window Function?

A Window Function performs a calculation over a set of rows, called a **window**, while keeping each original row in the result.

```plain text
GROUP BY

6 rows
  |
  v
4 rows
```

Window Function:

```plain text
6 rows
  |
  v
Still 6 rows
+ extra calculated column
```

This is the biggest difference.

---

## OVER()

Every Window Function uses:

```sql
OVER(...)
```

Think of `OVER()` as saying:

> On which set of rows should this calculation be performed?

Simplest example:

```sql
SELECT
    Name,
    Salary,
    AVG(Salary) OVER()
FROM Employees;
```

Average appears beside every employee. No rows disappear.

---

## PARTITION BY

This is the heart of Window Functions.

Suppose we want average salary **per department** while keeping every employee.

```sql
SELECT
    Name,
    Department,
    Salary,
    AVG(Salary)
    OVER(PARTITION BY Department)
FROM Employees;
```

SQL internally creates partitions.

```plain text
IT

Rahul
Amit
Ankit
  |
  v
Average
```

Each department becomes its own window.

---

## GROUP BY vs PARTITION BY

## GROUP BY

```sql
SELECT Department,
       AVG(Salary)
FROM Employees
GROUP BY Department;
```

One row per department.

## PARTITION BY

```sql
SELECT Name,
       AVG(Salary)
OVER(PARTITION BY Department)
FROM Employees;
```

Employees remain.

## Easy Memory Trick

GROUP BY:

```plain text
Group
  |
  v
Collapse rows
```

PARTITION BY:

```plain text
Group
  |
  v
Keep rows
```

---

## ROW_NUMBER()

Assigns a unique number.

```sql
SELECT
    Name,
    Salary,
    ROW_NUMBER()
    OVER(ORDER BY Salary DESC)
FROM Employees;
```

Every row gets a unique number. Even ties get different numbers.

---

## RANK()

Similar to `ROW_NUMBER`, but ties receive the same rank.

If salaries are:

```plain text
70000
65000
60000
60000
55000
```

Ranks become:

```plain text
1
2
3
3
5
```

Rank 4 is skipped.

---

## DENSE_RANK()

Same as `RANK`, but does not skip numbers.

```plain text
1
2
3
3
4
```

## Difference

ROW_NUMBER:

```plain text
1
2
3
4
5
```

RANK:

```plain text
1
2
3
3
5
```

DENSE_RANK:

```plain text
1
2
3
3
4
```

## Easy Memory Trick

- `ROW_NUMBER`: every row unique.
- `RANK`: competition ranking with gaps.
- `DENSE_RANK`: ranking without gaps.

---

## Interview Question: Find the 2nd highest salary

```sql
SELECT *
FROM
(
    SELECT *,
           DENSE_RANK()
           OVER(ORDER BY Salary DESC) AS rnk
    FROM Employees
) t
WHERE rnk = 2;
```

This is a very common interview problem.

---

## LAG()

Returns the previous row's value.

```sql
SELECT
    Salary,
    LAG(Salary)
    OVER(ORDER BY Salary)
FROM Employees;
```

The first row has no previous row, so it returns `NULL`.

---

## LEAD()

Returns the next row's value.

```sql
SELECT
    Salary,
    LEAD(Salary)
    OVER(ORDER BY Salary)
FROM Employees;
```

The final row has no next row, so it returns `NULL`.

---

## Running Total

Another favorite interview problem.

```sql
SELECT
    Name,
    Salary,
    SUM(Salary)
    OVER(
        ORDER BY ID
    ) AS RunningTotal
FROM Employees;
```

Each row accumulates the previous total.

---

## Common Window Functions

<table header-row="true">
<tr>
<td>Function</td>
<td>Purpose</td>
</tr>
<tr>
<td>ROW_NUMBER()</td>
<td>Unique row numbering</td>
</tr>
<tr>
<td>RANK()</td>
<td>Ranking with gaps</td>
</tr>
<tr>
<td>DENSE_RANK()</td>
<td>Ranking without gaps</td>
</tr>
<tr>
<td>AVG() OVER()</td>
<td>Running average or partition average</td>
</tr>
<tr>
<td>SUM() OVER()</td>
<td>Running total or partition total</td>
</tr>
<tr>
<td>COUNT() OVER()</td>
<td>Count while keeping rows</td>
</tr>
<tr>
<td>LAG()</td>
<td>Previous row</td>
</tr>
<tr>
<td>LEAD()</td>
<td>Next row</td>
</tr>
</table>

---

## Interview Questions

### 1. Difference between GROUP BY and PARTITION BY?

<table header-row="true">
<tr>
<td>GROUP BY</td>
<td>PARTITION BY</td>
</tr>
<tr>
<td>Collapses rows</td>
<td>Keeps rows</td>
</tr>
<tr>
<td>Returns one row per group</td>
<td>Returns all original rows</td>
</tr>
<tr>
<td>Used with aggregate queries</td>
<td>Used with window functions</td>
</tr>
</table>

### 2. Difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?

<table header-row="true">
<tr>
<td>Function</td>
<td>Duplicate Values</td>
<td>Gaps in Ranking</td>
</tr>
<tr>
<td>ROW_NUMBER()</td>
<td>No, every row is unique</td>
<td>N/A</td>
</tr>
<tr>
<td>RANK()</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>DENSE_RANK()</td>
<td>Yes</td>
<td>No</td>
</tr>
</table>

### 3. What does `OVER()` do?

It defines the **window of rows** over which the window function should operate. You can customize the window using `PARTITION BY` and `ORDER BY`.

---

## Mental Model

```plain text
GROUP BY

Rows
  |
  v
Grouped
  |
  v
Rows disappear
```

```plain text
Window Function

Rows
  |
  v
Look around neighboring rows
  |
  v
Calculate value
  |
  v
Keep every row
```

That's why they're called **Window Functions**: each row gets to look through a window of related rows to perform calculations while still remaining in the final result.

---

## Where Are Window Functions Used?

You'll frequently use them for:

- Finding the **Nth highest salary**
- Leaderboards and rankings
- Running totals
- Month-over-month sales comparisons
- Previous/next event analysis
- Top-N records per department
- Detecting trends over time
