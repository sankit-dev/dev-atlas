---
title: "MongoDB Roadmap"
slug: "mongodb-roadmap"
description: "How to study MongoDB for MERN apps and backend interviews."
track: "MongoDB"
priority: "Must Know"
---

# MongoDB Roadmap

MongoDB is the database commonly used in MERN apps.

It stores data as documents inside collections, which makes it flexible for JSON-like application data.

## Study order

```text
Documents -> CRUD -> Queries -> Schema design -> Embedding vs references -> Indexes -> Aggregation -> Mongoose -> Exercises
```

Do not treat MongoDB as "SQL but JSON". Document modeling has its own tradeoffs.

## What matters most

- Design around how the app reads and writes data.
- Embed data when it is owned and usually read together.
- Reference data when it is independent or reused.
- Use indexes for frequent queries.
- Aggregation is for reporting and transformations.
- Mongoose adds schemas and validation at the application layer.

## Interview angle

If asked about MongoDB, explain documents, collections, schema design, embedding vs referencing, indexes, aggregation, and how Mongoose helps in Node apps.

