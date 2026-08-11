---
title: "Aggregation"
slug: "aggregation"
description: "COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING."
track: "Databases & SQL"
---

## What is Aggregation?

Aggregation means:

> **Taking multiple rows and producing a single summarized value.**

Instead of looking at every employee individually, you ask questions like:

- How many employees are there?
- What's the average salary?
- What's the highest salary?
- What's the total salary paid?
- How many employees are in each department?

These are **aggregate** questions.

---

## Example Table

### Employees

<table header-row="true">
<tr>
<td>Employee_ID</td>
<td>Name</td>
<td>Department</td>
<td>Salary</td>
</tr>
<tr>
<td>101</td>
<td>Rahul</td>
<td>IT</td>
<td>60000</td>
</tr>
<tr>
<td>102</td>
<td>Priya</td>
<td>HR</td>
<td>55000</td>
</tr>
<tr>
<td>103</td>
<td>Amit</td>
<td>IT</td>
<td>70000</td>
</tr>
<tr>
<td>104</td>
<td>Neha</td>
<td>Sales</td>
<td>50000</td>
</tr>
<tr>
<td>105</td>
<td>Rohan</td>
<td>Finance</td>
<td>65000</td>
</tr>
<tr>
<td>106</td>
<td>Ankit</td>
<td>IT</td>
<td>60000</td>
</tr>
</table>

---

## Aggregate Functions

There are five main aggregate functions.

<table header-row="true">
<tr>
<td>Function</td>
<td>Purpose</td>
</tr>
<tr>
<td>COUNT()</td>
<td>Count rows</td>
</tr>
<tr>
<td>SUM()</td>
<td>Total</td>
</tr>
<tr>
<td>AVG()</td>
<td>Average</td>
</tr>
<tr>
<td>MIN()</td>
<td>Smallest value</td>
</tr>
<tr>
<td>MAX()</td>
<td>Largest value</td>
</tr>
</table>

---

## 1. COUNT()

Counts rows.

Count all employees:

```sql
SELECT COUNT(*)
FROM Employees;
```

Count only IT employees:

```sql
SELECT COUNT(*)
FROM Employees
WHERE Department = 'IT';
```

## COUNT(column)

```sql
SELECT COUNT(Salary)
FROM Employees;
```

This counts **non-NULL** salary values.

## Important Interview Question

Difference between:

```sql
COUNT(*)
```

and:

```sql
COUNT(column)
```

Answer:

- `COUNT(*)` counts **all rows**.
- `COUNT(column)` counts only rows where that column is **NOT NULL**.

Example:

<table header-row="true">
<tr>
<td>Name</td>
<td>Bonus</td>
</tr>
<tr>
<td>Rahul</td>
<td>1000</td>
</tr>
<tr>
<td>Priya</td>
<td>NULL</td>
</tr>
<tr>
<td>Amit</td>
<td>500</td>
</tr>
</table>

`COUNT(*)` returns **3**.

`COUNT(Bonus)` returns **2**.

---

## 2. SUM()

Adds values.

```sql
SELECT SUM(Salary)
FROM Employees;
```

Output:

```plain text
360000
```

---

## 3. AVG()

Returns average.

```sql
SELECT AVG(Salary)
FROM Employees;
```

---

## 4. MIN()

Returns the smallest value.

```sql
SELECT MIN(Salary)
FROM Employees;
```

---

## 5. MAX()

Returns the largest value.

```sql
SELECT MAX(Salary)
FROM Employees;
```

---

## GROUP BY

This is the most important part of aggregation.

Without `GROUP BY`:

```sql
SELECT AVG(Salary)
FROM Employees;
```

This returns the average of **everyone**.

Suppose the manager asks:

> Show average salary for each department.

Now one average isn't enough. We need one average **per department**.

That is exactly what `GROUP BY` does.

## GROUP BY Mental Model

It groups rows that have the same value.

```plain text
Employees
    |
    v
Separate into groups
    |
    v
Perform aggregation
```

Average salary by department:

```sql
SELECT Department,
       AVG(Salary)
FROM Employees
GROUP BY Department;
```

Output:

<table header-row="true">
<tr>
<td>Department</td>
<td>AVG Salary</td>
</tr>
<tr>
<td>IT</td>
<td>63333</td>
</tr>
<tr>
<td>HR</td>
<td>55000</td>
</tr>
<tr>
<td>Sales</td>
<td>50000</td>
</tr>
<tr>
<td>Finance</td>
<td>65000</td>
</tr>
</table>

Count employees in each department:

```sql
SELECT Department,
       COUNT(*)
FROM Employees
GROUP BY Department;
```

Total salary by department:

```sql
SELECT Department,
       SUM(Salary)
FROM Employees
GROUP BY Department;
```

Highest salary in each department:

```sql
SELECT Department,
       MAX(Salary)
FROM Employees
GROUP BY Department;
```

---

## HAVING

People often confuse `WHERE` and `HAVING`.

Suppose you ask:

> Show only departments having more than 2 employees.

This is wrong:

```sql
SELECT Department,
       COUNT(*)
FROM Employees
WHERE COUNT(*) > 2
GROUP BY Department;
```

Why?

Because `WHERE` executes **before** grouping. At that point, `COUNT(*)` does not exist yet.

Correct:

```sql
SELECT Department,
       COUNT(*)
FROM Employees
GROUP BY Department
HAVING COUNT(*) > 2;
```

## Easy Memory Trick

```plain text
WHERE
  |
  v
Filters rows

GROUP BY
  |
  v
Creates groups

HAVING
  |
  v
Filters groups
```

---

## SQL Logical Execution Order

For:

```sql
SELECT Department,
       COUNT(*)
FROM Employees
WHERE Salary > 50000
GROUP BY Department
HAVING COUNT(*) >= 2
ORDER BY COUNT(*) DESC;
```

Logical order:

```plain text
FROM
  |
  v
WHERE
  |
  v
GROUP BY
  |
  v
HAVING
  |
  v
SELECT
  |
  v
ORDER BY
```

This explains why `WHERE` cannot use aggregate functions, while `HAVING` can.

---

## WHERE vs HAVING

<table header-row="true">
<tr>
<td>WHERE</td>
<td>HAVING</td>
</tr>
<tr>
<td>Filters rows</td>
<td>Filters groups</td>
</tr>
<tr>
<td>Before GROUP BY</td>
<td>After GROUP BY</td>
</tr>
<tr>
<td>Cannot use aggregate functions directly</td>
<td>Can use aggregate functions</td>
</tr>
</table>

---

## Common Interview Questions

Highest salary department:

```sql
SELECT Department,
       MAX(Salary)
FROM Employees
GROUP BY Department;
```

Number of employees in each department:

```sql
SELECT Department,
       COUNT(*)
FROM Employees
GROUP BY Department;
```

Departments with more than two employees:

```sql
SELECT Department,
       COUNT(*)
FROM Employees
GROUP BY Department
HAVING COUNT(*) > 2;
```

Average salary of IT department:

```sql
SELECT AVG(Salary)
FROM Employees
WHERE Department = 'IT';
```

We filter rows first, then compute the average. No `GROUP BY` is needed because we are asking about only one department.

---

## Summary Table

<table header-row="true">
<tr>
<td>Function / Clause</td>
<td>Purpose</td>
</tr>
<tr>
<td>COUNT()</td>
<td>Count rows</td>
</tr>
<tr>
<td>SUM()</td>
<td>Add values</td>
</tr>
<tr>
<td>AVG()</td>
<td>Calculate average</td>
</tr>
<tr>
<td>MIN()</td>
<td>Smallest value</td>
</tr>
<tr>
<td>MAX()</td>
<td>Largest value</td>
</tr>
<tr>
<td>GROUP BY</td>
<td>Group rows before aggregation</td>
</tr>
<tr>
<td>HAVING</td>
<td>Filter groups after aggregation</td>
</tr>
</table>

---

## Interview Questions

### 1. Difference between `COUNT(*)` and `COUNT(column)`?

- `COUNT(*)` counts all rows.
- `COUNT(column)` counts only non-NULL values in that column.

### 2. Difference between `WHERE` and `HAVING`?

- `WHERE` filters individual rows before grouping.
- `HAVING` filters groups after aggregation.

### 3. Why can't we use `COUNT()` in the `WHERE` clause?

Because `WHERE` is evaluated before `GROUP BY` and before aggregate values are computed. Aggregate functions are only available after grouping, which is why they belong in the `HAVING` clause.

---

## Mental Model

```plain text
Raw Table
    |
    v
WHERE        -> Remove unwanted rows
    |
    v
GROUP BY     -> Create groups
    |
    v
Aggregate    -> COUNT, SUM, AVG, MIN, MAX
    |
    v
HAVING       -> Remove unwanted groups
    |
    v
SELECT       -> Return final columns
    |
    v
ORDER BY     -> Sort results
```

If you remember this flow, you'll be able to solve most aggregation questions in interviews without getting confused.
