---
title: "NoSQL"
slug: "nosql"
description: "SQL vs NoSQL, document DB, key-value DB, column-family DB, graph DB, and when to use each."
track: "Databases & SQL"
---

NoSQL is a broad category of databases that do not use the traditional relational table model as their primary model.

## Types

### Document Database

Stores JSON-like documents.

Examples: MongoDB, CouchDB.

Good for flexible object-shaped data.

### Key-Value Store

Stores values by key.

Examples: Redis, DynamoDB key-value patterns.

Good for caching, sessions, counters, simple lookups.

### Wide-Column Store

Stores rows with flexible columns across distributed nodes.

Examples: Cassandra, HBase.

Good for massive write-heavy workloads.

### Graph Database

Stores nodes and relationships.

Examples: Neo4j.

Good for relationship-heavy data like recommendations, fraud graphs, social networks.

## SQL vs NoSQL

| SQL | NoSQL |
| --- | --- |
| Tables and schema | Flexible models |
| Strong relationships | Often denormalized |
| SQL query language | DB-specific APIs |
| ACID common | Varies by system |
| Great for structured relational data | Great for scale/flexible access patterns |

## When to Use SQL

- Strong relationships.
- Complex joins.
- Transactions.
- Structured data.
- Reporting and ad hoc queries.

## When to Use NoSQL

- Flexible schema.
- Very high scale.
- Simple key-based access.
- Document-oriented data.
- Graph traversal.

## Interview Notes

- NoSQL does not mean no queries.
- NoSQL does not automatically mean faster.
- Choose based on data model and access patterns.
- Many systems use both SQL and NoSQL together.
