---
title: "MongoDB vs SQL"
slug: "mongodb-vs-sql"
description: "How document databases differ from relational databases."
track: "MongoDB"
priority: "Must Know"
---

# MongoDB vs SQL

MongoDB and SQL databases solve different data modeling problems.

MongoDB is document-oriented.

SQL databases are relational.

## SQL model

SQL stores data in tables with rows and columns.

Example:

```text
users
orders
order_items
products
```

Relationships are usually represented through foreign keys and joins.

## MongoDB model

MongoDB stores data as documents.

Example order document:

```json
{
  "userId": "u1",
  "items": [
    { "productId": "p1", "quantity": 2 },
    { "productId": "p2", "quantity": 1 }
  ],
  "status": "placed"
}
```

Related data can be embedded when it is usually read together.

## Decision guide

Use SQL when:

- relationships are complex,
- transactions are central,
- strict schema matters,
- reporting needs many joins.

Use MongoDB when:

- data is document-shaped,
- schema evolves frequently,
- nested data is read together,
- high write scale or flexible modeling matters.

## Common mistake

Do not choose MongoDB only because "it has no schema".

Your application still has a data shape. If you ignore schema design, the database becomes inconsistent and hard to query.

## Interview answer

SQL databases model relational data with tables, rows, columns, constraints, and joins. MongoDB models data as documents inside collections. MongoDB is useful for flexible document-shaped data, while SQL is often better for strict relational data and complex joins. The right choice depends on access patterns and consistency needs.

