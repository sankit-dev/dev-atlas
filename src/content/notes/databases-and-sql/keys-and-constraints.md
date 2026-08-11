---
title: "Keys & Constraints"
slug: "keys-and-constraints"
description: "Primary keys, foreign keys, candidate keys, composite keys, super keys, alternate keys, and unique keys."
track: "Databases & SQL"
---

## First, what is a Key?

A **key** is one or more columns used to **identify, relate, or enforce uniqueness** in a table.

Think of it as an identity card for data.

### Employees Table

<table header-row="true">
<tr>
<td>Employee_ID</td>
<td>Name</td>
<td>Email</td>
<td>Department</td>
</tr>
<tr>
<td>101</td>
<td>Rahul</td>
<td>rahul@gmail.com</td>
<td>IT</td>
</tr>
<tr>
<td>102</td>
<td>Priya</td>
<td>priya@gmail.com</td>
<td>HR</td>
</tr>
<tr>
<td>103</td>
<td>Amit</td>
<td>amit@gmail.com</td>
<td>Finance</td>
</tr>
</table>

Here:

- `Employee_ID` identifies every employee.
- `Email` also uniquely identifies every employee.

Both can uniquely identify a row.

---

## Why do we need Keys?

Imagine this table:

<table header-row="true">
<tr>
<td>Name</td>
<td>Department</td>
</tr>
<tr>
<td>Rahul</td>
<td>IT</td>
</tr>
<tr>
<td>Rahul</td>
<td>HR</td>
</tr>
<tr>
<td>Rahul</td>
<td>Sales</td>
</tr>
</table>

Now suppose someone asks:

> "Update Rahul's department."

**Which Rahul?**

The database has no way to know. That's why every table should have a way to uniquely identify each row.

---

## Types of Keys

There are six main keys you'll encounter:

1. Super Key
2. Candidate Key
3. Primary Key
4. Alternate Key
5. Composite Key
6. Foreign Key

Learn them in this order because each builds on the previous one.

---

## 1. Super Key

A **Super Key** is **any combination of columns that can uniquely identify a row**.

Possible Super Keys:

- Employee_ID
- Email
- Employee_ID + Name
- Employee_ID + Email
- Employee_ID + Email + Name

Some combinations contain extra unnecessary columns.

For example:

```plain text
Employee_ID + Name
```

`Employee_ID` alone is enough. Adding `Name` does not make it more unique. It still works, but it is unnecessary.

## Definition

A **Super Key** is any set of one or more columns that uniquely identifies each row in a table.

---

## 2. Candidate Key

A **Candidate Key** is the **smallest possible Super Key**.

It has **no unnecessary columns**.

Candidate Keys:

- Employee_ID
- Email

Not Candidate Keys:

- Employee_ID + Name
- Email + Name

Because `Name` is unnecessary.

## Easy way to remember

Super Key:

> Can uniquely identify.

Candidate Key:

> Can uniquely identify **using the minimum columns**.

---

## Super Key vs Candidate Key

<table header-row="true">
<tr>
<td>Super Key</td>
<td>Candidate Key</td>
</tr>
<tr>
<td>Can have extra columns</td>
<td>No extra columns allowed</td>
</tr>
<tr>
<td>Many possible</td>
<td>Few possible</td>
</tr>
<tr>
<td>Every Candidate Key is a Super Key</td>
<td>Not every Super Key is a Candidate Key</td>
</tr>
</table>

---

## 3. Primary Key

Among all Candidate Keys, we choose **one** to become the **Primary Key**.

Example:

Candidate Keys:

- Employee_ID
- Email

Choose:

```plain text
Employee_ID
```

Now `Employee_ID` becomes the Primary Key.

## Rules of Primary Key

- Must be unique
- Cannot be NULL
- One Primary Key per table
- Used to identify every row

---

## 4. Alternate Key

The Candidate Keys **not selected** as the Primary Key become **Alternate Keys**.

Example:

Candidate Keys:

- Employee_ID
- Email

Choose `Employee_ID` as Primary Key.

Then:

```plain text
Email = Alternate Key
```

---

## 5. Composite Key

A **Composite Key** consists of **two or more columns together** that uniquely identify a row.

Neither column alone is sufficient.

### Student_Course

<table header-row="true">
<tr>
<td>Student_ID</td>
<td>Course_ID</td>
</tr>
<tr>
<td>1</td>
<td>101</td>
</tr>
<tr>
<td>1</td>
<td>102</td>
</tr>
<tr>
<td>2</td>
<td>101</td>
</tr>
</table>

Can `Student_ID` identify a row? No.

Can `Course_ID` identify a row? No.

But together:

```plain text
(Student_ID, Course_ID)
```

identify each enrollment uniquely. That pair is a Composite Key.

---

## 6. Foreign Key

A **Foreign Key** creates a relationship between two tables.

## Users

<table header-row="true">
<tr>
<td>User_ID</td>
<td>Name</td>
</tr>
<tr>
<td>1</td>
<td>Rahul</td>
</tr>
<tr>
<td>2</td>
<td>Priya</td>
</tr>
</table>

## Orders

<table header-row="true">
<tr>
<td>Order_ID</td>
<td>User_ID</td>
<td>Amount</td>
</tr>
<tr>
<td>101</td>
<td>1</td>
<td>500</td>
</tr>
<tr>
<td>102</td>
<td>2</td>
<td>900</td>
</tr>
</table>

The `User_ID` in the **Orders** table refers to the `User_ID` in the **Users** table.

That column is called a **Foreign Key**.

```plain text
Users

User_ID (PK)
    ^
    |
Orders
User_ID (FK)
```

## Why Foreign Keys?

Without them, you could accidentally insert an order like:

<table header-row="true">
<tr>
<td>Order_ID</td>
<td>User_ID</td>
</tr>
<tr>
<td>103</td>
<td>999</td>
</tr>
</table>

But `User_ID` **999 doesn't exist**.

With a Foreign Key, the database prevents this and maintains **referential integrity**.

---

## Constraints

Constraints are rules enforced by the database to maintain valid and consistent data.

## PRIMARY KEY Constraint

Ensures:

- Unique
- Not NULL

Duplicate? Not allowed.

NULL? Not allowed.

## FOREIGN KEY Constraint

Ensures:

- Referenced row exists
- Invalid relationships are prevented

## UNIQUE Constraint

Allows only unique values.

Unlike a Primary Key, a UNIQUE column can typically contain NULL values. Exact behavior depends on the database system.

## NOT NULL Constraint

Column cannot be empty.

## DEFAULT Constraint

Provides a default value if none is supplied.

Example:

```plain text
Status = Active
```

## CHECK Constraint

Ensures values satisfy a condition.

Example:

```plain text
Age >= 18
```

Trying to insert:

```plain text
Age = 12
```

is rejected.

---

## Summary Table

<table header-row="true">
<tr>
<td>Key / Constraint</td>
<td>Purpose</td>
</tr>
<tr>
<td>Super Key</td>
<td>Any combination that uniquely identifies a row</td>
</tr>
<tr>
<td>Candidate Key</td>
<td>Minimal Super Key</td>
</tr>
<tr>
<td>Primary Key</td>
<td>Chosen Candidate Key</td>
</tr>
<tr>
<td>Alternate Key</td>
<td>Candidate Key not chosen as Primary Key</td>
</tr>
<tr>
<td>Composite Key</td>
<td>Multiple columns together uniquely identify a row</td>
</tr>
<tr>
<td>Foreign Key</td>
<td>Creates relationships between tables</td>
</tr>
<tr>
<td>UNIQUE</td>
<td>Prevents duplicate values</td>
</tr>
<tr>
<td>NOT NULL</td>
<td>Prevents NULL values</td>
</tr>
<tr>
<td>DEFAULT</td>
<td>Assigns a default value</td>
</tr>
<tr>
<td>CHECK</td>
<td>Enforces custom conditions</td>
</tr>
</table>

---

## Interview Questions

### 1. Difference between Super Key and Candidate Key?

A Super Key uniquely identifies a row but may include extra columns. A Candidate Key is a minimal Super Key with no unnecessary columns.

### 2. Difference between Primary Key and Candidate Key?

A Candidate Key is any minimal unique identifier. A Primary Key is the Candidate Key chosen to uniquely identify rows in the table.

### 3. Can a table have multiple Candidate Keys?

Yes.

### 4. Can a table have multiple Primary Keys?

No. A table can have only one Primary Key, though it may consist of multiple columns as a composite primary key.

### 5. Why do we use Foreign Keys?

To establish relationships between tables and enforce referential integrity by ensuring referenced records exist.

---

## Key Takeaways

- **Super Key**: any unique identifier, possibly with extra columns.
- **Candidate Key**: minimal unique identifier.
- **Primary Key**: the chosen Candidate Key.
- **Alternate Key**: Candidate Keys not chosen as Primary Key.
- **Composite Key**: multiple columns together uniquely identify a row.
- **Foreign Key**: links tables and maintains referential integrity.
- **Constraints** enforce data quality by preventing invalid or inconsistent data.
