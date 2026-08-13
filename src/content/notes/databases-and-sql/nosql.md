---
title: "NoSQL"
slug: "nosql"
description: "Non-relational database models and when they fit better than SQL."
track: "Databases & SQL"
---

# NoSQL

# What problem is this solving?

Some data does not fit naturally into strict tables and joins.

For example, user preferences, product attributes, cached sessions, graph relationships, and large event streams can have very different shapes.

NoSQL databases exist to support these different data models.

---

# Simple definition

NoSQL is a broad category of databases that do not primarily use the traditional relational table model.

SQL databases store data in tables:

```plain text
users
orders
payments
products
```

NoSQL databases use other models, such as:

- documents
- key-value pairs
- wide-column rows
- graphs

---

# Common mistake

NoSQL does **not** mean:

> **No queries**

It also does **not** mean:

> **Always faster than SQL**

NoSQL means the database uses a non-relational model as its main way of storing and accessing data.

---

# Real example

Suppose you are storing a user profile:

```json
{
  "name": "Riya",
  "email": "riya@example.com",
  "addresses": [
    {
      "type": "home",
      "city": "Pune"
    },
    {
      "type": "work",
      "city": "Mumbai"
    }
  ],
  "preferences": {
    "theme": "dark",
    "language": "en"
  }
}
```

This is object-shaped data.

A document database like MongoDB can store it as one document.

In SQL, you may split it into multiple tables.

---

# Better explanation

```plain text
NoSQL
├── Types of NoSQL Databases
├── MongoDB & Document Databases
├── Key-Value Databases
├── Wide-Column Databases
├── Graph Databases
└── When to Use SQL vs NoSQL
```

Read the types first, then study each model separately.

---

# Interview Answer

If an interviewer asks:

> **What is NoSQL?**

You can answer:

NoSQL is a category of databases that do not primarily use the relational table model. It includes document databases like MongoDB, key-value stores like Redis, wide-column databases like Cassandra, and graph databases like Neo4j. NoSQL is useful when the data model is flexible, document-shaped, key-based, graph-heavy, or designed for distributed scale.
