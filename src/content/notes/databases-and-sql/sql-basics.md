---
title: "SQL Basics"
slug: "sql-basics"
description: "SELECT, WHERE, ORDER BY, DISTINCT, LIMIT, LIKE, IN, BETWEEN, IS NULL, and CASE."
track: "Databases & SQL"
---

## What is SQL?

**SQL (Structured Query Language)** is the language used to communicate with a relational database.

Think of it like this:

```plain text
Java  ---> JVM
Browser ---> Web Server
SQL ---> Database
```

Whenever you want to:

- Store data
- Retrieve data
- Update data
- Delete data

You use SQL.

---

## Example

Suppose we have this table.

### Employees

<table header-row="true">
<tr>
<td>Employee_ID</td>
<td>Name</td>
<td>Age</td>
<td>Department</td>
<td>Salary</td>
</tr>
<tr>
<td>101</td>
<td>Rahul</td>
<td>25</td>
<td>IT</td>
<td>60000</td>
</tr>
<tr>
<td>102</td>
<td>Priya</td>
<td>28</td>
<td>HR</td>
<td>55000</td>
</tr>
<tr>
<td>103</td>
<td>Amit</td>
<td>30</td>
<td>IT</td>
<td>70000</td>
</tr>
<tr>
<td>104</td>
<td>Neha</td>
<td>24</td>
<td>Sales</td>
<td>50000</td>
</tr>
<tr>
<td>105</td>
<td>Rohan</td>
<td>29</td>
<td>Finance</td>
<td>65000</td>
</tr>
</table>

Now suppose you ask:

> Show all employees.

SQL:

```sql
SELECT * FROM Employees;
```

SQL is simply a language for asking questions to the database.

---

## Categories of SQL Commands

Interviewers often ask:

> How many types of SQL commands are there?

There are five categories.

<table header-row="true">
<tr>
<td>Category</td>
<td>Purpose</td>
</tr>
<tr>
<td>DDL</td>
<td>Define database structure</td>
</tr>
<tr>
<td>DML</td>
<td>Manipulate data</td>
</tr>
<tr>
<td>DQL</td>
<td>Retrieve data</td>
</tr>
<tr>
<td>DCL</td>
<td>Control permissions</td>
</tr>
<tr>
<td>TCL</td>
<td>Manage transactions</td>
</tr>
</table>

---

## 1. DDL (Data Definition Language)

Used to create or modify the database structure.

Commands:

- CREATE
- ALTER
- DROP
- TRUNCATE
- RENAME

Create a table:

```sql
CREATE TABLE Employees (
    Employee_ID INT,
    Name VARCHAR(50),
    Age INT
);
```

Add a new column:

```sql
ALTER TABLE Employees
ADD Salary INT;
```

Delete the table completely:

```sql
DROP TABLE Employees;
```

Remove all rows but keep the table:

```sql
TRUNCATE TABLE Employees;
```

Rename the table:

```sql
RENAME TABLE Employees TO Employee;
```

---

## 2. DML (Data Manipulation Language)

Used to work with the data inside tables.

Commands:

- INSERT
- UPDATE
- DELETE

Insert:

```sql
INSERT INTO Employees
VALUES (101,'Rahul',25,'IT',60000);
```

Update:

```sql
UPDATE Employees
SET Salary = 70000
WHERE Employee_ID = 101;
```

Delete:

```sql
DELETE FROM Employees
WHERE Employee_ID = 101;
```

Notice: the table still exists. Only rows are affected.

---

## 3. DQL (Data Query Language)

Used to retrieve data.

Command:

- SELECT

Example:

```sql
SELECT * FROM Employees;
```

Only reads data. It doesn't modify anything.

---

## 4. DCL (Data Control Language)

Used to give or remove permissions.

Commands:

- GRANT
- REVOKE

Allow a user to read a table:

```sql
GRANT SELECT
ON Employees
TO Rahul;
```

Remove permission:

```sql
REVOKE SELECT
ON Employees
FROM Rahul;
```

Mostly used by Database Administrators.

---

## 5. TCL (Transaction Control Language)

Used to manage transactions.

Commands:

- COMMIT
- ROLLBACK
- SAVEPOINT

Example:

```sql
UPDATE Employees
SET Salary = Salary + 5000;
```

If everything looks good:

```sql
COMMIT;
```

If something goes wrong:

```sql
ROLLBACK;
```

Transactions are covered in detail later.

---

## SELECT Statement

The most used SQL statement.

General syntax:

```sql
SELECT column1, column2
FROM table_name;
```

Example:

```sql
SELECT Name, Salary
FROM Employees;
```

---

## SELECT *

Returns every column.

```sql
SELECT *
FROM Employees;
```

## Should we use `SELECT *`?

**In interviews:** yes, it is fine for quick examples.

**In production code:** usually no.

Why?

Suppose a table has **50 columns**, but your application only needs **Name** and **Salary**.

Instead of:

```sql
SELECT *
FROM Employees;
```

Write:

```sql
SELECT Name, Salary
FROM Employees;
```

Benefits:

- Transfers less data.
- Uses less memory.
- Can improve performance.
- Makes the query's intent clearer.

---

## SQL Execution Order

Many people think SQL executes left to right. It doesn't.

For this query:

```sql
SELECT Name
FROM Employees
WHERE Department = 'IT';
```

The logical execution order is:

```plain text
1. FROM Employees
        |
        v
2. WHERE Department = 'IT'
        |
        v
3. SELECT Name
```

This explains why the database first identifies the source table, then filters rows, and only then returns the requested columns.

---

## SQL is Case Insensitive

These are equivalent:

```sql
SELECT * FROM Employees;
```

```sql
select * from employees;
```

However, the convention is:

- SQL keywords: UPPERCASE
- Table names: PascalCase or snake_case
- Column names: snake_case or camelCase, depending on the project style

Example:

```sql
SELECT employee_id, employee_name
FROM employees;
```

---

## Summary Table

<table header-row="true">
<tr>
<td>Command</td>
<td>Purpose</td>
</tr>
<tr>
<td>CREATE</td>
<td>Create a table</td>
</tr>
<tr>
<td>ALTER</td>
<td>Modify a table</td>
</tr>
<tr>
<td>DROP</td>
<td>Delete a table</td>
</tr>
<tr>
<td>TRUNCATE</td>
<td>Remove all rows, keep the table</td>
</tr>
<tr>
<td>INSERT</td>
<td>Add new rows</td>
</tr>
<tr>
<td>UPDATE</td>
<td>Modify existing rows</td>
</tr>
<tr>
<td>DELETE</td>
<td>Remove rows</td>
</tr>
<tr>
<td>SELECT</td>
<td>Retrieve data</td>
</tr>
<tr>
<td>GRANT</td>
<td>Give permissions</td>
</tr>
<tr>
<td>REVOKE</td>
<td>Remove permissions</td>
</tr>
<tr>
<td>COMMIT</td>
<td>Save transaction</td>
</tr>
<tr>
<td>ROLLBACK</td>
<td>Undo transaction</td>
</tr>
</table>

---

## Interview Questions

### 1. What is SQL?

SQL is the standard language used to create, retrieve, update, and manage data in relational databases.

### 2. What are the five categories of SQL commands?

- DDL: Data Definition Language
- DML: Data Manipulation Language
- DQL: Data Query Language
- DCL: Data Control Language
- TCL: Transaction Control Language

### 3. What is the difference between DELETE, TRUNCATE, and DROP?

<table header-row="true">
<tr>
<td>DELETE</td>
<td>TRUNCATE</td>
<td>DROP</td>
</tr>
<tr>
<td>Removes selected rows</td>
<td>Removes all rows</td>
<td>Deletes the entire table</td>
</tr>
<tr>
<td>Can use WHERE</td>
<td>No WHERE</td>
<td>Removes table structure too</td>
</tr>
<tr>
<td>Table remains</td>
<td>Table remains</td>
<td>Table no longer exists</td>
</tr>
<tr>
<td>Generally logged row by row</td>
<td>Typically minimally logged, DBMS-dependent</td>
<td>Removes metadata and data</td>
</tr>
</table>

### 4. Why should we avoid `SELECT *` in production?

Because it retrieves unnecessary columns, increasing network transfer, memory usage, and potentially reducing query performance.

---

## Next Topic

The next step is **SQL Filtering & Sorting**, where you'll use:

- `WHERE`
- Comparison operators
- Logical operators
- `ORDER BY`
- `LIMIT`
- `DISTINCT`
- `LIKE`
- `IN`
- `BETWEEN`
- `IS NULL`

These are the commands you'll use in almost every SQL query.
