---
title: "Database Fundamentals"
slug: "database-fundamentals"
description: "DBMS, RDBMS vs NoSQL, tables, rows, columns, schemas, and constraints."
track: "Databases & SQL"
---

## What is a Database?

A **database** is an organized collection of data that allows us to **store, retrieve, update, and delete information efficiently**.

### Real-world Example

Imagine you're managing a college.

Without a database, you might store student details in notebooks or Excel files.

```plain text
Student 1
Name: Rahul
Age: 20
Branch: CS

Student 2
Name: Priya
Age: 21
Branch: IT
```

Now imagine **10 lakh students**.

Finding one student's information manually becomes slow and difficult.

A database organizes this information so you can quickly find, update, or delete records.

---

## What is DBMS?

**DBMS (Database Management System)** is software that helps users and applications interact with a database.

Think of it as the **middleman** between your application and the stored data.

```plain text
User
   |
   v
Application
   |
   v
 DBMS
   |
   v
Database
```

The application never directly manipulates the files where data is stored. It communicates with the DBMS.

Examples of DBMS:

- MySQL
- PostgreSQL
- Oracle
- SQL Server
- SQLite

---

## Why do we need a DBMS?

Without a DBMS, an application would have to manage everything itself:

- Store data in files
- Search through files
- Prevent duplicate data
- Handle multiple users accessing data simultaneously
- Recover from crashes
- Manage security
- Create backups

That's a huge amount of work.

A DBMS provides these features out of the box.

### Responsibilities of a DBMS

- Store data efficiently
- Retrieve data quickly
- Update and delete data safely
- Handle multiple users through concurrency control
- Ensure data consistency
- Provide security
- Create backups and recovery
- Optimize queries

---

## Database vs DBMS

<table header-row="true">
<tr>
<td>Database</td>
<td>DBMS</td>
</tr>
<tr>
<td>Collection of data</td>
<td>Software that manages the data</td>
</tr>
<tr>
<td>Stores information</td>
<td>Performs operations on the data</td>
</tr>
<tr>
<td>Passive</td>
<td>Active</td>
</tr>
<tr>
<td>Example: Student records</td>
<td>Example: MySQL, PostgreSQL</td>
</tr>
</table>

Think of it like this:

- **Database = Books**
- **DBMS = Librarian**

The books contain the information.

The librarian helps you find, update, organize, and protect the books.

---

## Types of Databases

For interviews, you mainly need to know two categories.

## 1. Relational Database (RDBMS)

Stores data in **tables**.

### Users Table

<table header-row="true">
<tr>
<td>ID</td>
<td>Name</td>
<td>Age</td>
</tr>
<tr>
<td>1</td>
<td>Rahul</td>
<td>22</td>
</tr>
<tr>
<td>2</td>
<td>Priya</td>
<td>24</td>
</tr>
</table>

### Orders Table

<table header-row="true">
<tr>
<td>Order ID</td>
<td>User ID</td>
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
<td>700</td>
</tr>
</table>

The `User ID` links the two tables.

Characteristics:

- Data stored in rows and columns
- Uses SQL
- Supports relationships
- Strong consistency
- Follows ACID properties

Examples:

- MySQL
- PostgreSQL
- Oracle
- SQL Server

---

## 2. NoSQL Database

Doesn't require data to be stored in tables.

Instead, data can be stored as:

- Documents
- Key-value pairs
- Graphs
- Wide columns

Example document:

```json
{
  "id": 1,
  "name": "Rahul",
  "age": 22,
  "skills": ["Java", "Spring", "React"]
}
```

Examples:

- MongoDB
- Redis
- Cassandra
- Neo4j

We'll cover NoSQL in detail later.

---

## RDBMS vs NoSQL

<table header-row="true">
<tr>
<td>RDBMS</td>
<td>NoSQL</td>
</tr>
<tr>
<td>Tables</td>
<td>Documents / Key-Value / Graph / Column</td>
</tr>
<tr>
<td>Fixed schema</td>
<td>Flexible schema</td>
</tr>
<tr>
<td>SQL</td>
<td>Database-specific APIs or query languages</td>
</tr>
<tr>
<td>Strong relationships</td>
<td>Fewer or no enforced relationships</td>
</tr>
<tr>
<td>ACID transactions</td>
<td>Often optimized for scalability and flexible consistency models</td>
</tr>
<tr>
<td>Best for structured data</td>
<td>Best for rapidly changing or unstructured data</td>
</tr>
</table>

---

## Where is DBMS used?

Almost every backend application uses one.

Examples:

- Banking systems
- E-commerce
- Hospital management
- Social media
- Food delivery
- Ride-sharing
- HR systems
- Inventory management

Whenever an application needs to persist data, a database is usually involved.

---

## Interview Questions

### 1. What is a database?

A database is an organized collection of data that enables efficient storage, retrieval, updating, and deletion of information.

### 2. What is a DBMS?

A DBMS is software that manages databases and provides services like data storage, querying, security, concurrency control, backup, and recovery.

### 3. What is the difference between a database and a DBMS?

A database is the stored data itself, while a DBMS is the software used to create, manage, and access that data.

### 4. Give examples of DBMS.

- MySQL
- PostgreSQL
- Oracle
- SQL Server
- SQLite

### 5. Why do we use a DBMS instead of files?

Because a DBMS provides efficient querying, security, concurrency control, consistency, backup and recovery, and reduces the complexity of managing data manually.

---

## Key Takeaways

- **Database** = organized collection of data.
- **DBMS** = software that manages the database.
- Applications interact with the **DBMS**, not directly with the data files.
- **RDBMS** stores data in related tables and uses SQL.
- **NoSQL** supports flexible data models like documents, key-value pairs, graphs, and wide-column stores.
- A DBMS handles storage, querying, security, concurrency, and recovery, allowing developers to focus on building applications.
