---
title: "Normalization"
slug: "normalization"
description: "Data redundancy, anomalies, 1NF, 2NF, 3NF, BCNF, and denormalization."
track: "Databases & SQL"
---

## 1. What is Normalization?

**Normalization is the process of organizing data in a database to reduce data redundancy and prevent data anomalies.**

In simple words:

> Normalization means breaking a large table into smaller related tables so that data is stored efficiently and consistently.

---

## Why do we need Normalization?

Imagine we create a college database.

### Without Normalization

### Student Table

<table header-row="true">
<tr>
<td>Student_ID</td>
<td>Student_Name</td>
<td>Course</td>
<td>Instructor</td>
<td>Instructor_Phone</td>
</tr>
<tr>
<td>101</td>
<td>Rahul</td>
<td>DBMS</td>
<td>Amit</td>
<td>999999</td>
</tr>
<tr>
<td>102</td>
<td>Neha</td>
<td>DBMS</td>
<td>Amit</td>
<td>999999</td>
</tr>
<tr>
<td>103</td>
<td>Raj</td>
<td>Java</td>
<td>Priya</td>
<td>888888</td>
</tr>
</table>

Problems:

### 1. Data Redundancy

Instructor Amit's phone number is stored multiple times.

```plain text
Amit -> 999999
Amit -> 999999
```

If 10,000 students take DBMS, the same information repeats thousands of times.

### 2. Update Anomaly

Suppose Amit changes his phone number. You need to update every row.

If one row is missed, inconsistent data exists.

### 3. Insert Anomaly

Suppose a new instructor joins but doesn't have any students yet.

Where do you store:

```plain text
Instructor = John
Phone = 555555
```

You cannot insert it cleanly because `Student_ID` is required.

### 4. Delete Anomaly

Suppose the last student drops the DBMS course.

Deleting that student also removes:

```plain text
DBMS course information
Instructor Amit information
```

because everything was stored together.

Normalization solves these problems.

---

## Normal Forms

Normalization happens in stages called **Normal Forms**.

<table header-row="true">
<tr>
<td>Normal Form</td>
<td>Removes</td>
</tr>
<tr>
<td>1NF</td>
<td>Repeating groups / multi-valued attributes</td>
</tr>
<tr>
<td>2NF</td>
<td>Partial dependency</td>
</tr>
<tr>
<td>3NF</td>
<td>Transitive dependency</td>
</tr>
<tr>
<td>BCNF</td>
<td>Stronger version of 3NF</td>
</tr>
</table>

For interviews: **1NF, 2NF, 3NF, and BCNF are must know.**

---

## 1NF

A table is in **1NF** if:

1. Every column contains atomic values.
2. There are no repeating groups.
3. Each row is unique.

### Not 1NF

<table header-row="true">
<tr>
<td>Student_ID</td>
<td>Name</td>
<td>Phone Numbers</td>
</tr>
<tr>
<td>1</td>
<td>Rahul</td>
<td>9999,8888</td>
</tr>
</table>

Problem: `Phone Numbers` contains multiple values.

### Convert to 1NF

<table header-row="true">
<tr>
<td>Student_ID</td>
<td>Name</td>
<td>Phone</td>
</tr>
<tr>
<td>1</td>
<td>Rahul</td>
<td>9999</td>
</tr>
<tr>
<td>1</td>
<td>Rahul</td>
<td>8888</td>
</tr>
</table>

Now every cell has one value.

---

## 2NF

Before understanding 2NF, we need **Functional Dependency**.

## Functional Dependency

It means:

> One attribute determines another attribute.

Represented as:

```plain text
A -> B
```

Meaning: if we know A, we can find B.

Example:

```plain text
Student_ID -> Student_Name
```

because `Student_ID` uniquely identifies `Student_Name`.

## 2NF Rules

A table is in 2NF if:

1. It is already in 1NF.
2. No partial dependency exists.

## What is Partial Dependency?

It happens when a non-key attribute depends on only part of a composite key.

Example:

<table header-row="true">
<tr>
<td>Student_ID</td>
<td>Course_ID</td>
<td>Student_Name</td>
<td>Course_Name</td>
</tr>
<tr>
<td>101</td>
<td>C1</td>
<td>Rahul</td>
<td>DBMS</td>
</tr>
<tr>
<td>102</td>
<td>C1</td>
<td>Neha</td>
<td>DBMS</td>
</tr>
<tr>
<td>101</td>
<td>C2</td>
<td>Rahul</td>
<td>Java</td>
</tr>
</table>

Primary Key:

```plain text
(Student_ID, Course_ID)
```

Dependencies:

```plain text
Student_ID -> Student_Name
Course_ID -> Course_Name
```

Only part of the key determines those columns. This is a partial dependency.

Solution: split the table.

### Student

<table header-row="true">
<tr>
<td>Student_ID</td>
<td>Student_Name</td>
</tr>
<tr>
<td>101</td>
<td>Rahul</td>
</tr>
<tr>
<td>102</td>
<td>Neha</td>
</tr>
</table>

### Course

<table header-row="true">
<tr>
<td>Course_ID</td>
<td>Course_Name</td>
</tr>
<tr>
<td>C1</td>
<td>DBMS</td>
</tr>
<tr>
<td>C2</td>
<td>Java</td>
</tr>
</table>

### Enrollment

<table header-row="true">
<tr>
<td>Student_ID</td>
<td>Course_ID</td>
</tr>
<tr>
<td>101</td>
<td>C1</td>
</tr>
<tr>
<td>102</td>
<td>C1</td>
</tr>
<tr>
<td>101</td>
<td>C2</td>
</tr>
</table>

Now there is no duplicate data and no partial dependency.

---

## 3NF

A table is in 3NF if:

1. It is already in 2NF.
2. No transitive dependency exists.

## What is Transitive Dependency?

When a non-key attribute depends on another non-key attribute.

Example:

<table header-row="true">
<tr>
<td>Emp_ID</td>
<td>Emp_Name</td>
<td>Dept_ID</td>
<td>Dept_Name</td>
</tr>
<tr>
<td>1</td>
<td>Rahul</td>
<td>10</td>
<td>Engineering</td>
</tr>
<tr>
<td>2</td>
<td>Amit</td>
<td>20</td>
<td>HR</td>
</tr>
</table>

Primary Key:

```plain text
Emp_ID
```

Dependencies:

```plain text
Emp_ID -> Dept_ID
Dept_ID -> Dept_Name
```

Therefore:

```plain text
Emp_ID -> Dept_Name
```

indirectly. This is transitive dependency.

Solution: split into Employee and Department tables.

### Employee

<table header-row="true">
<tr>
<td>Emp_ID</td>
<td>Emp_Name</td>
<td>Dept_ID</td>
</tr>
<tr>
<td>1</td>
<td>Rahul</td>
<td>10</td>
</tr>
<tr>
<td>2</td>
<td>Amit</td>
<td>20</td>
</tr>
</table>

### Department

<table header-row="true">
<tr>
<td>Dept_ID</td>
<td>Dept_Name</td>
</tr>
<tr>
<td>10</td>
<td>Engineering</td>
</tr>
<tr>
<td>20</td>
<td>HR</td>
</tr>
</table>

Now the relationship is handled using a foreign key.

---

## BCNF

BCNF is a stronger version of 3NF.

Rule:

> Every determinant must be a candidate key.

Meaning:

```plain text
If A -> B, then A should be a candidate key.
```

If a determinant is not a candidate key, a BCNF violation exists.

---

## Normalization Summary

<table header-row="true">
<tr>
<td>Normal Form</td>
<td>Main Idea</td>
<td>Removes</td>
</tr>
<tr>
<td>1NF</td>
<td>Atomic values</td>
<td>Repeating data</td>
</tr>
<tr>
<td>2NF</td>
<td>No partial dependency</td>
<td>Duplicate dependency on composite keys</td>
</tr>
<tr>
<td>3NF</td>
<td>No transitive dependency</td>
<td>Non-key dependency</td>
</tr>
<tr>
<td>BCNF</td>
<td>Every determinant is key</td>
<td>Advanced dependency issues</td>
</tr>
</table>

---

## Interview One-Liner

**Q: Why do we normalize databases?**

Normalization is used to reduce redundancy, maintain data consistency, and avoid insertion, update, and deletion anomalies by organizing data into multiple related tables.

---

## Key Takeaway

Normalization is good because it keeps data consistent and avoids repeated information. But in real systems, excessive normalization can make reads slower because data must be joined from many tables. That is why denormalization is sometimes used intentionally for performance.
