---
title: "Intermediate SQL"
slug: "intermediate-sql"
description: "Subqueries, correlated subqueries, EXISTS, ANY, ALL, UNION, INTERSECT, and EXCEPT."
track: "Databases & SQL"
---

This is where SQL starts feeling like a programming language. Many interview questions can be solved in two ways:

1. Using **JOIN + GROUP BY**
2. Using **Subqueries**

Don't worry if these seem confusing at first. Once you understand the execution order, everything clicks.

---

## Intermediate SQL

We'll cover:

1. Subqueries
2. Correlated Subqueries
3. EXISTS
4. ANY
5. ALL
6. UNION
7. UNION ALL
8. INTERSECT
9. EXCEPT

We'll use this table throughout.

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

---

## 1. Subquery

A **Subquery** is simply a query inside another query.

Think of it like calling one function from another.

```java
int max = getMaxSalary();
print(max);
```

SQL does something similar.

```sql
SELECT ...
WHERE Salary > (SELECT ...);
```

The inner query runs first. Its result is passed to the outer query.

---

## Example

Question:

> Find employees earning more than the average salary.

Can we write this?

```sql
SELECT *
FROM Employees
WHERE Salary > AVG(Salary);
```

No.

Why?

Because `AVG(Salary)` is an aggregate function, and `WHERE` cannot directly use it this way.

Instead:

```sql
SELECT *
FROM Employees
WHERE Salary >
(
    SELECT AVG(Salary)
    FROM Employees
);
```

Step 1: the inner query executes first.

```sql
SELECT AVG(Salary)
FROM Employees;
```

Returns:

```plain text
60000
```

Step 2: the outer query becomes:

```sql
SELECT *
FROM Employees
WHERE Salary > 60000;
```

Output:

<table header-row="true">
<tr>
<td>Name</td>
<td>Salary</td>
</tr>
<tr>
<td>Amit</td>
<td>70000</td>
</tr>
<tr>
<td>Rohan</td>
<td>65000</td>
</tr>
</table>

---

## Easy Memory Trick

```plain text
Outer Query
    |
    v
Needs a value
    |
    v
Runs Inner Query
    |
    v
Gets value
    |
    v
Continues
```

---

## Subquery Types

<table header-row="true">
<tr>
<td>Type</td>
<td>Returns</td>
</tr>
<tr>
<td>Scalar Subquery</td>
<td>One value</td>
</tr>
<tr>
<td>Multiple Row Subquery</td>
<td>Multiple rows</td>
</tr>
<tr>
<td>Multiple Column Subquery</td>
<td>Multiple columns</td>
</tr>
</table>

For interviews, scalar and multiple-row subqueries are the most important.

---

## 2. Multiple Row Subquery

Example: find employees belonging to departments that have IT or HR.

```sql
SELECT *
FROM Employees
WHERE Department IN
(
    SELECT Department
    FROM Employees
    WHERE Department IN ('IT','HR')
);
```

The inner query returns multiple values:

```plain text
IT
HR
```

Then the outer query checks whether each employee's department is in that list.

---

## 3. Correlated Subquery

This is where many people get confused.

## Normal Subquery

Runs **once**.

```plain text
Inner Query
    |
    v
Returns result
    |
    v
Outer Query uses it
```

## Correlated Subquery

Runs **once for every row** of the outer query.

Think of it as a loop.

```plain text
For each employee
    |
    v
Run inner query
    |
    v
Compare result
```

Example: find employees earning above their department's average salary.

```sql
SELECT *
FROM Employees e1
WHERE Salary >
(
    SELECT AVG(Salary)
    FROM Employees e2
    WHERE e2.Department = e1.Department
);
```

Notice:

```sql
e1.Department
```

The inner query is using a value from the outer query. That's why it is called **correlated**.

For Rahul, the inner query calculates the IT average salary. Rahul's salary is not greater than that average.

For Amit, the IT average salary is lower than Amit's salary, so Amit is returned.

## Memory Trick

Normal Subquery:

```plain text
Runs once.
```

Correlated Subquery:

```plain text
Runs once per outer row.
```

---

## 4. EXISTS

Checks whether **at least one row exists**.

Returns:

- TRUE
- FALSE

Example: show users who placed orders.

```sql
SELECT *
FROM Users u
WHERE EXISTS
(
    SELECT *
    FROM Orders o
    WHERE o.User_ID = u.ID
);
```

For Rahul, an order exists, so Rahul is returned.

For Amit, no order exists, so Amit is not returned.

## Why EXISTS?

It stops searching as soon as it finds the first matching row, so it can be more efficient than counting all matches when you only care whether a match exists.

---

## EXISTS vs IN

```sql
WHERE ID IN (...)
```

Checks whether a value belongs to a list.

```sql
WHERE EXISTS (...)
```

Checks whether a matching row exists.

`EXISTS` is often preferred for correlated checks, while `IN` is useful when comparing against a known list or the result of a subquery.

---

## 5. ANY

```sql
WHERE Salary > ANY
(
   50000,
   60000,
   70000
)
```

Meaning:

> Greater than at least one value.

So `55000 > ANY (...)` is true because it is greater than 50000.

---

## 6. ALL

```sql
WHERE Salary > ALL
(
   50000,
   60000,
   70000
)
```

Meaning:

> Greater than every value.

Only salaries above 70000 qualify.

## Easy Memory Trick

ANY:

```plain text
At least one
```

ALL:

```plain text
Every one
```

---

## 7. UNION

Combines results from multiple queries and removes duplicates.

```sql
SELECT Name FROM A

UNION

SELECT Name FROM B;
```

If table A has `Rahul, Priya` and table B has `Priya, Amit`, the result is:

```plain text
Rahul
Priya
Amit
```

Duplicate `Priya` is removed.

---

## 8. UNION ALL

Same as `UNION`, but keeps duplicates.

```sql
SELECT Name FROM A

UNION ALL

SELECT Name FROM B;
```

Result:

```plain text
Rahul
Priya
Priya
Amit
```

## UNION vs UNION ALL

<table header-row="true">
<tr>
<td>UNION</td>
<td>UNION ALL</td>
</tr>
<tr>
<td>Removes duplicates</td>
<td>Keeps duplicates</td>
</tr>
<tr>
<td>Slightly slower because it removes duplicates</td>
<td>Faster</td>
</tr>
<tr>
<td>Used when uniqueness matters</td>
<td>Used when duplicates are acceptable</td>
</tr>
</table>

---

## 9. INTERSECT

Returns only common rows.

If table A has:

```plain text
Rahul
Priya
```

and table B has:

```plain text
Priya
Amit
```

Result:

```plain text
Priya
```

> MySQL does not support `INTERSECT` directly. PostgreSQL, SQL Server, and Oracle do.

---

## 10. EXCEPT

Returns rows from the first query that are not present in the second.

If table A has:

```plain text
Rahul
Priya
```

and table B has:

```plain text
Priya
```

Result:

```plain text
Rahul
```

> MySQL commonly uses alternatives such as `LEFT JOIN` or `NOT EXISTS` because it does not support `EXCEPT` directly.

---

## Summary Table

<table header-row="true">
<tr>
<td>Topic</td>
<td>Purpose</td>
</tr>
<tr>
<td>Subquery</td>
<td>Query inside another query</td>
</tr>
<tr>
<td>Correlated Subquery</td>
<td>Inner query depends on the outer row</td>
</tr>
<tr>
<td>EXISTS</td>
<td>Check if matching rows exist</td>
</tr>
<tr>
<td>ANY</td>
<td>Compare against at least one value</td>
</tr>
<tr>
<td>ALL</td>
<td>Compare against every value</td>
</tr>
<tr>
<td>UNION</td>
<td>Combine results, remove duplicates</td>
</tr>
<tr>
<td>UNION ALL</td>
<td>Combine results, keep duplicates</td>
</tr>
<tr>
<td>INTERSECT</td>
<td>Return common rows</td>
</tr>
<tr>
<td>EXCEPT</td>
<td>Return rows present only in the first query</td>
</tr>
</table>

---

## Interview Questions

### 1. What is the difference between a subquery and a correlated subquery?

- A **subquery** executes independently, typically once.
- A **correlated subquery** depends on the outer query and executes once for each row processed by the outer query.

### 2. Difference between `UNION` and `UNION ALL`?

- `UNION` removes duplicate rows.
- `UNION ALL` keeps duplicates and is generally faster because it does not perform duplicate elimination.

### 3. Difference between `EXISTS` and `IN`?

- `IN` checks whether a value exists in a list or subquery result.
- `EXISTS` checks whether a matching row exists and is commonly used with correlated subqueries.

### 4. Difference between `ANY` and `ALL`?

- `ANY` requires the condition to be true for **at least one** value.
- `ALL` requires the condition to be true for **every** value.

---

## Should You Memorize `ANY`, `ALL`, `INTERSECT`, and `EXCEPT`?

For most backend interviews:

- Master **Subqueries**
- Master **Correlated Subqueries**
- Master **EXISTS**
- Master **UNION** and **UNION ALL**

Know what `ANY`, `ALL`, `INTERSECT`, and `EXCEPT` do, but don't spend much time memorizing their syntax. They are asked less frequently, and some are not supported by every SQL database.

The next topic is **Window Functions**, which helps solve ranking, running total, and "Nth highest" problems without complex subqueries.
