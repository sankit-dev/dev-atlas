---
title: "SQL Filtering & Sorting"
slug: "sql-filtering-and-sorting"
description: "Logical operators, aliases, and expressions."
track: "Databases & SQL"
---

We'll use the same **Employees** table throughout so it's easy to follow.

## Employees

<table header-row="true">
<tr>
<td>Employee_ID</td>
<td>Name</td>
<td>Age</td>
<td>Department</td>
<td>Salary</td>
<td>City</td>
</tr>
<tr>
<td>101</td>
<td>Rahul</td>
<td>25</td>
<td>IT</td>
<td>60000</td>
<td>Surat</td>
</tr>
<tr>
<td>102</td>
<td>Priya</td>
<td>28</td>
<td>HR</td>
<td>55000</td>
<td>Mumbai</td>
</tr>
<tr>
<td>103</td>
<td>Amit</td>
<td>30</td>
<td>IT</td>
<td>70000</td>
<td>Surat</td>
</tr>
<tr>
<td>104</td>
<td>Neha</td>
<td>24</td>
<td>Sales</td>
<td>50000</td>
<td>Delhi</td>
</tr>
<tr>
<td>105</td>
<td>Rohan</td>
<td>29</td>
<td>Finance</td>
<td>65000</td>
<td>Mumbai</td>
</tr>
<tr>
<td>106</td>
<td>Ankit</td>
<td>27</td>
<td>IT</td>
<td>60000</td>
<td>Delhi</td>
</tr>
</table>

---

## 1. WHERE Clause

The `WHERE` clause is used to **filter rows**.

Think of it as asking:

> Give me only the rows that satisfy this condition.

Syntax:

```sql
SELECT column_name
FROM Employees
WHERE condition;
```

Example: get all IT employees.

```sql
SELECT *
FROM Employees
WHERE Department = 'IT';
```

Example: employees older than 27.

```sql
SELECT *
FROM Employees
WHERE Age > 27;
```

---

## Comparison Operators

<table header-row="true">
<tr>
<td>Operator</td>
<td>Meaning</td>
</tr>
<tr>
<td>=</td>
<td>Equal</td>
</tr>
<tr>
<td>!= or &lt;&gt;</td>
<td>Not Equal</td>
</tr>
<tr>
<td>&gt;</td>
<td>Greater Than</td>
</tr>
<tr>
<td>&lt;</td>
<td>Less Than</td>
</tr>
<tr>
<td>&gt;=</td>
<td>Greater Than or Equal</td>
</tr>
<tr>
<td>&lt;=</td>
<td>Less Than or Equal</td>
</tr>
</table>

Examples:

```sql
WHERE Salary > 60000
```

```sql
WHERE Age <= 25
```

```sql
WHERE Department != 'HR'
```

---

## 2. AND Operator

Returns rows only if **all conditions are true**.

Example: IT employees earning more than 60,000.

```sql
SELECT *
FROM Employees
WHERE Department = 'IT'
AND Salary > 60000;
```

Think of `AND` as:

```plain text
Condition 1 true
AND
Condition 2 true

Return row
```

Even if one condition is false, the row is excluded.

---

## 3. OR Operator

Returns rows if **any one condition is true**.

```sql
SELECT *
FROM Employees
WHERE Department = 'HR'
OR Department = 'Sales';
```

Think of `OR` as:

```plain text
Condition 1 true
OR
Condition 2 false

Still returned
```

---

## 4. NOT Operator

Reverses a condition.

Employees who are **not** in IT:

```sql
SELECT *
FROM Employees
WHERE NOT Department = 'IT';
```

---

## Combining AND & OR

```sql
SELECT *
FROM Employees
WHERE Department = 'IT'
OR Salary > 65000;
```

SQL evaluates `AND` **before** `OR`.

So this:

```sql
SELECT *
FROM Employees
WHERE Department = 'IT'
OR Department = 'HR'
AND Salary > 55000;
```

is read as:

```plain text
Department='IT'
OR
(Department='HR' AND Salary>55000)
```

If your intention is different, use parentheses.

```sql
SELECT *
FROM Employees
WHERE
(Department='IT'
OR Department='HR')
AND Salary > 55000;
```

**Interview Tip:** always use parentheses when mixing `AND` and `OR` to make your intent explicit.

---

## 5. DISTINCT

Removes duplicate values.

```sql
SELECT DISTINCT Department
FROM Employees;
```

Without `DISTINCT`, duplicate departments appear. With `DISTINCT`, each department appears once.

---

## 6. ORDER BY

Sorts data.

Ascending:

```sql
SELECT *
FROM Employees
ORDER BY Salary;
```

Descending:

```sql
SELECT *
FROM Employees
ORDER BY Salary DESC;
```

Multiple columns:

```sql
SELECT *
FROM Employees
ORDER BY Department, Salary DESC;
```

SQL first sorts by `Department`, then by `Salary` within each department.

---

## 7. LIMIT

Returns only the first **N** rows.

```sql
SELECT *
FROM Employees
LIMIT 3;
```

Highest salary:

```sql
SELECT *
FROM Employees
ORDER BY Salary DESC
LIMIT 1;
```

> `LIMIT` is used in MySQL and PostgreSQL. SQL Server uses `TOP`, and Oracle may use `FETCH FIRST` or `ROWNUM`.

---

## 8. LIKE

Used for **pattern matching**.

<table header-row="true">
<tr>
<td>Wildcard</td>
<td>Meaning</td>
</tr>
<tr>
<td>`%`</td>
<td>Zero or more characters</td>
</tr>
<tr>
<td>`_`</td>
<td>Exactly one character</td>
</tr>
</table>

Starts with R:

```sql
SELECT *
FROM Employees
WHERE Name LIKE 'R%';
```

Ends with t:

```sql
WHERE Name LIKE '%t';
```

Contains `ha`:

```sql
WHERE Name LIKE '%ha%';
```

Exactly five letters:

```sql
WHERE Name LIKE '_____';
```

Each `_` matches exactly one character.

---

## 9. IN

Instead of writing multiple `OR` conditions:

```sql
WHERE City='Surat'
OR City='Delhi'
OR City='Mumbai'
```

write:

```sql
SELECT *
FROM Employees
WHERE City IN ('Surat','Delhi','Mumbai');
```

Much cleaner.

---

## 10. BETWEEN

Checks whether a value lies within a range. It is inclusive.

```sql
SELECT *
FROM Employees
WHERE Salary BETWEEN 50000 AND 65000;
```

Equivalent to:

```sql
WHERE Salary >= 50000
AND Salary <= 65000;
```

---

## 11. IS NULL

`NULL` means **missing or unknown**, not zero or an empty string.

Find employees whose city is missing:

```sql
SELECT *
FROM Employees
WHERE City IS NULL;
```

Find employees whose city is available:

```sql
SELECT *
FROM Employees
WHERE City IS NOT NULL;
```

> **Interview Tip:** never compare `NULL` using `=` or `!=`. Always use `IS NULL` or `IS NOT NULL`.

---

## Logical SQL Execution Order

For a query like:

```sql
SELECT Name, Salary
FROM Employees
WHERE Department = 'IT'
ORDER BY Salary DESC
LIMIT 2;
```

The database logically processes it as:

```plain text
FROM
   |
   v
WHERE
   |
   v
SELECT
   |
   v
ORDER BY
   |
   v
LIMIT
```

This execution order is a favorite interview question.

---

## Summary Table

<table header-row="true">
<tr>
<td>Clause</td>
<td>Purpose</td>
</tr>
<tr>
<td>WHERE</td>
<td>Filter rows</td>
</tr>
<tr>
<td>=, &gt;, &lt;, &gt;=, &lt;=, !=</td>
<td>Compare values</td>
</tr>
<tr>
<td>AND</td>
<td>All conditions must be true</td>
</tr>
<tr>
<td>OR</td>
<td>At least one condition must be true</td>
</tr>
<tr>
<td>NOT</td>
<td>Negates a condition</td>
</tr>
<tr>
<td>DISTINCT</td>
<td>Remove duplicate values</td>
</tr>
<tr>
<td>ORDER BY</td>
<td>Sort results</td>
</tr>
<tr>
<td>LIMIT</td>
<td>Return first N rows</td>
</tr>
<tr>
<td>LIKE</td>
<td>Pattern matching</td>
</tr>
<tr>
<td>IN</td>
<td>Match any value from a list</td>
</tr>
<tr>
<td>BETWEEN</td>
<td>Filter within a range</td>
</tr>
<tr>
<td>IS NULL</td>
<td>Check for NULL values</td>
</tr>
</table>

---

## Interview Questions

### 1. What is the difference between `WHERE` and `HAVING`?

- `WHERE` filters **rows before grouping**.
- `HAVING` filters **groups after `GROUP BY`**.

### 2. What is the difference between `LIKE` and `IN`?

- `LIKE` is used for pattern matching.
- `IN` checks whether a value matches one of several exact values.

### 3. Does `BETWEEN` include the boundary values?

Yes. `BETWEEN 10 AND 20` includes both `10` and `20`.

### 4. Why can't we use `= NULL`?

Because `NULL` represents an unknown value. SQL uses three-valued logic, so comparisons with `NULL` do not behave like normal equality checks.

Use `IS NULL` or `IS NOT NULL` instead.

---

At this point, you can write and understand a large percentage of everyday SQL queries. The next major topic is **Joins**, where relational databases really start to shine.
