---
title: "Embedding vs Referencing"
slug: "embedding-vs-referencing"
description: "Choose nested documents or separate linked collections."
track: "MongoDB"
priority: "Must Know"
---

# Embedding vs Referencing

Embedding and referencing are two ways to model relationships in MongoDB.

## Embedding

Embedding stores related data inside the same document.

Example:

```json
{
  "name": "Asha",
  "address": {
    "city": "Pune",
    "country": "India"
  }
}
```

Use embedding when:

- data is owned by parent,
- data is usually read together,
- nested data is small,
- nested data does not grow without limit.

## Referencing

Referencing stores related data in another collection and keeps an id reference.

Example:

```json
{
  "title": "MongoDB Basics",
  "authorId": "user_123"
}
```

Use referencing when:

- related data has its own lifecycle,
- data is reused by many documents,
- array can grow very large,
- separate queries make more sense.

## Common mistake

Do not embed unbounded arrays.

Example: putting all comments forever inside one post document can become a problem as comments grow.

## Interview answer

Embedding stores related data inside the same document and is good when data is owned and read together. Referencing stores related data separately and links by id, which is better for independent, reused, or unbounded data. The choice depends on access patterns and growth.

