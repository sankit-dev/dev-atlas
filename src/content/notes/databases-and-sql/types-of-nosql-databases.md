---
title: "Types of NoSQL Databases"
slug: "types-of-nosql-databases"
description: "Document, key-value, wide-column, and graph database models."
track: "Databases & SQL"
---

# Types of NoSQL Databases

NoSQL is not one database type.

It is a broad category.

The main types are:

```plain text
NoSQL
├── Document Database
├── Key-Value Store
├── Wide-Column Store
└── Graph Database
```

Each type stores and reads data differently.

---

# Quick Comparison

<table header-row="true">
<tr>
<td>Type</td>
<td>Data Shape</td>
<td>Examples</td>
<td>Best For</td>
</tr>
<tr>
<td>Document</td>
<td>JSON-like documents</td>
<td>MongoDB, CouchDB, Firestore</td>
<td>Object-shaped flexible data</td>
</tr>
<tr>
<td>Key-Value</td>
<td>key → value</td>
<td>Redis, Memcached</td>
<td>Cache, sessions, simple lookup</td>
</tr>
<tr>
<td>Wide-Column</td>
<td>Distributed rows with flexible columns</td>
<td>Cassandra, HBase, ScyllaDB</td>
<td>Huge write-heavy workloads</td>
</tr>
<tr>
<td>Graph</td>
<td>Nodes and relationships</td>
<td>Neo4j, Amazon Neptune</td>
<td>Relationship traversal</td>
</tr>
</table>

---

# How to choose the type

Ask:

> **What shape is my data and how will I read it?**

Examples:

- User profile with nested preferences → document database
- Session lookup by ID → key-value database
- Millions of time-series writes → wide-column database
- Friends of friends recommendation → graph database

---

# Interview Answer

If an interviewer asks:

> **What are the types of NoSQL databases?**

You can answer:

The main NoSQL types are document databases, key-value stores, wide-column stores, and graph databases. Document databases store JSON-like documents, key-value stores provide fast lookup by key, wide-column stores handle massive distributed writes, and graph databases store nodes and relationships for traversal-heavy data.
