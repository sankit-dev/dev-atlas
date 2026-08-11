---
title: "Database Fundamentals"
slug: "database-fundamentals"
description: "DBMS, RDBMS vs NoSQL, tables, rows, columns, schemas, and constraints."
track: "Databases & SQL"
---

A database is an organized collection of data that lets applications store, retrieve, update, and delete information efficiently.

## Database vs DBMS

| Database | DBMS |
| --- | --- |
| Stored data | Software that manages stored data |
| Passive collection | Active system for operations |
| Example: student records | Example: PostgreSQL, MySQL |

Applications usually talk to a DBMS, not directly to raw files.

## Why DBMS Is Needed

A DBMS handles:

- Efficient storage.
- Querying and indexing.
- Security and permissions.
- Concurrency control.
- Data consistency.
- Backup and recovery.
- Transactions.
- Query optimization.

Without a DBMS, every application would need to implement these concerns itself.

## RDBMS

Relational databases store data in tables.

| id | name | department |
| --- | --- | --- |
| 1 | Rahul | IT |
| 2 | Priya | HR |

Characteristics:

- Fixed schema.
- Rows and columns.
- SQL.
- Relationships through keys.
- Strong transaction support.

Examples: PostgreSQL, MySQL, Oracle, SQL Server, SQLite.

## NoSQL

NoSQL databases use models like:

- Document.
- Key-value.
- Wide-column.
- Graph.

They are often used when flexible schema, high write scale, or specific access patterns matter.

## Basic Terms

- Table: collection of related records.
- Row: one record.
- Column: one attribute.
- Schema: structure of tables and fields.
- Constraint: rule enforced by the database.

## Interview Notes

- Database stores data; DBMS manages it.
- RDBMS is table-based and uses SQL.
- NoSQL is a family of non-relational database models.
- DBMS features matter most when data grows or many users act concurrently.
