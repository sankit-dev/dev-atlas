---
title: "Documents and Collections"
slug: "documents-and-collections"
description: "How MongoDB stores JSON-like records."
track: "MongoDB"
priority: "Must Know"
---

# Documents and Collections

MongoDB stores data in **documents**.

Documents are grouped inside **collections**.

## Document

A document is one record.

Example:

```json
{
  "_id": "65a123...",
  "title": "Learn MongoDB",
  "completed": false,
  "tags": ["database", "mern"]
}
```

Documents look like JSON, but MongoDB stores them internally as BSON.

## Collection

A collection is a group of documents.

Example:

```text
database: dev_atlas
collection: notes
document: one note
```

SQL comparison:

| SQL | MongoDB |
| --- | --- |
| Table | Collection |
| Row | Document |
| Column | Field |

## Flexible schema

Documents in the same collection can have different fields.

That flexibility is useful, but it can also create messy data if the application does not enforce rules.

Mongoose is often used to add schema structure in Node.js apps.

## Interview answer

In MongoDB, a document is a JSON-like record stored in BSON format. A collection is a group of documents, similar to a table in SQL. MongoDB allows flexible document shapes, but applications often use schema validation or Mongoose to keep data consistent.

