---
title: "SQL Joins"
slug: "sql-joins"
description: "INNER, LEFT, RIGHT, FULL, CROSS, and SELF JOIN."
track: "Databases & SQL"
---

## Why do we need joins?

Imagine you are building an e-commerce application. Instead of storing everything in one table, relational databases usually split data into multiple related tables.

### Users table

| User_ID | Name |
| --- | --- |
| 1 | Rahul |
| 2 | Priya |
| 3 | Amit |
| 4 | Neha |

### Orders table

| Order_ID | User_ID | Product |
| --- | --- | --- |
| 101 | 1 | Laptop |
| 102 | 1 | Mouse |
| 103 | 2 | Keyboard |
| 104 | 5 | Monitor |

The orders table stores `User_ID`, not the user's name. This avoids duplicate data.

If the business asks, "Show me user name plus product purchased", neither table alone can answer it. We need to combine both tables. That is what a join does.

---

## What is a join?

A join combines rows from two or more tables based on a related column. Usually the related columns are a primary key and a foreign key.

```plain text
Users.User_ID
    |
    v
Orders.User_ID
```

---

## Types of joins

| Join | Purpose | Interview importance |
| --- | --- | --- |
| INNER JOIN | Only matching rows | Very high |
| LEFT JOIN | All left rows plus matching right rows | Very high |
| RIGHT JOIN | All right rows plus matching left rows | High |
| FULL OUTER JOIN | Everything from both tables | High |
| CROSS JOIN | Every possible combination | Medium |
| SELF JOIN | Join a table with itself | High |

---

## INNER JOIN

`INNER JOIN` returns only rows that match in both tables.

```sql
SELECT
  u.Name,
  o.Product
FROM Users u
INNER JOIN Orders o
ON u.User_ID = o.User_ID;
```

Output:

| Name | Product |
| --- | --- |
| Rahul | Laptop |
| Rahul | Mouse |
| Priya | Keyboard |

The monitor order is gone because `User_ID = 5` does not exist in `Users`.

Memory trick:

```plain text
INNER JOIN = only the intersection
```

---

## LEFT JOIN

`LEFT JOIN` returns every row from the left table and matching rows from the right table. If no match exists, the right-side columns are `NULL`.

```sql
SELECT
  u.Name,
  o.Product
FROM Users u
LEFT JOIN Orders o
ON u.User_ID = o.User_ID;
```

Output:

| Name | Product |
| --- | --- |
| Rahul | Laptop |
| Rahul | Mouse |
| Priya | Keyboard |
| Amit | NULL |
| Neha | NULL |

Think:

```plain text
LEFT JOIN = everything on the left + matching right
```

---

## RIGHT JOIN

`RIGHT JOIN` is the opposite of `LEFT JOIN`. It keeps every row from the right table and matching rows from the left table.

```sql
SELECT
  u.Name,
  o.Product
FROM Users u
RIGHT JOIN Orders o
ON u.User_ID = o.User_ID;
```

Output:

| Name | Product |
| --- | --- |
| Rahul | Laptop |
| Rahul | Mouse |
| Priya | Keyboard |
| NULL | Monitor |

The monitor order appears because it exists in `Orders`, even though there is no matching user.

---

## FULL OUTER JOIN

`FULL OUTER JOIN` returns everything:

- All left rows.
- All right rows.
- Matching rows merged.

Example output:

| Name | Product |
| --- | --- |
| Rahul | Laptop |
| Rahul | Mouse |
| Priya | Keyboard |
| Amit | NULL |
| Neha | NULL |
| NULL | Monitor |

Note: MySQL does not support `FULL OUTER JOIN` directly. It is commonly simulated with `LEFT JOIN`, `RIGHT JOIN`, and `UNION`.

---

## CROSS JOIN

`CROSS JOIN` returns every possible combination.

If there are 2 users and 2 products, the result has 4 rows.

```sql
SELECT *
FROM Users
CROSS JOIN Products;
```

Formula:

```plain text
Rows = A x B
```

Use it carefully because result size grows quickly.

---

## SELF JOIN

A self join joins a table with itself.

Example: employees and managers.

| ID | Name | Manager_ID |
| --- | --- | --- |
| 1 | CEO | NULL |
| 2 | Rahul | 1 |
| 3 | Priya | 1 |
| 4 | Amit | 2 |

Query:

```sql
SELECT
  e.Name AS Employee,
  m.Name AS Manager
FROM Employees e
JOIN Employees m
ON e.Manager_ID = m.ID;
```

The same table is treated as two logical tables using aliases.

---

## Table aliases

Instead of writing:

```sql
SELECT Users.Name
FROM Users;
```

We write:

```sql
SELECT u.Name
FROM Users u;
```

Aliases make join queries shorter and easier to read.

---

## ON vs WHERE

`ON` defines how tables should be matched.

`WHERE` filters the result after the join.

```sql
SELECT
  u.Name,
  o.Product
FROM Users u
JOIN Orders o
ON u.User_ID = o.User_ID
WHERE o.Product = 'Laptop';
```

- `ON`: match users with orders.
- `WHERE`: keep only laptop orders.

---

## Business requirement mindset

Different joins answer different business questions.

| Business question | Join |
| --- | --- |
| Show customers who placed an order | INNER JOIN |
| Show every customer, even if they never ordered | LEFT JOIN |
| Show every order, even if customer data is missing | RIGHT JOIN |
| Show absolutely everything | FULL OUTER JOIN |

The foreign key defines the relationship. The join decides which result set you want.

---

## Interview notes

### INNER JOIN vs LEFT JOIN

- `INNER JOIN` returns only rows with matching values in both tables.
- `LEFT JOIN` returns all rows from the left table and matching rows from the right table. If no match exists, the right-side columns are `NULL`.

### Why do we use aliases?

Aliases make SQL queries shorter and are especially useful when joining multiple tables or performing self joins.

### What is a SELF JOIN?

A self join joins a table with itself, usually with aliases, to represent relationships inside the same table.

### Why is it called LEFT JOIN or RIGHT JOIN?

It depends on which table you write first.

```sql
FROM Users
LEFT JOIN Orders
```

Here `Users` is the left table and `Orders` is the right table.

---

## Big picture

A foreign key only defines the relationship. It does not define what result you want.

The relationship is the road. The join tells SQL how to travel that road and which records to keep.
