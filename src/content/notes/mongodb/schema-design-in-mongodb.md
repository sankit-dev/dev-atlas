---
title: "Schema Design in MongoDB"
slug: "schema-design-in-mongodb"
description: "Design documents around access patterns."
track: "MongoDB"
priority: "Must Know"
---

# Schema Design in MongoDB

MongoDB schema design starts with access patterns.

Do not ask only:

> What data do I have?

Also ask:

> How will the app read and write this data?

## SQL thinking vs MongoDB thinking

In SQL, you often normalize first and join later.

In MongoDB, you often shape documents around common reads.

If data is usually read together, embedding may be better.

If data is independent or grows without limit, referencing may be better.

## Example

A blog post and its tags:

```json
{
  "title": "MongoDB Basics",
  "tags": ["database", "mern", "backend"]
}
```

Embedding tags is fine because tags are small and read with the post.

But comments may grow large:

```text
posts collection
comments collection
```

Referencing comments separately can be better for large comment lists.

## Real app example: notes app

Suppose you are building a notes app.

Common screens:

- list my notes,
- search my notes,
- open one note,
- filter by tag.

A practical note document:

```json
{
  "_id": "note_1",
  "userId": "user_1",
  "title": "JWT auth notes",
  "body": "Access token, refresh token...",
  "tags": ["auth", "backend"],
  "pinned": false,
  "createdAt": "2026-08-13T00:00:00.000Z",
  "updatedAt": "2026-08-13T00:00:00.000Z"
}
```

This design works because the note is usually read as one document.

Useful indexes might be:

```js
db.notes.createIndex({ userId: 1, updatedAt: -1 })
db.notes.createIndex({ userId: 1, tags: 1 })
```

The schema follows the app's access patterns.

## Real app example: order

An order often stores a snapshot of product details:

```json
{
  "userId": "user_1",
  "items": [
    {
      "productId": "product_1",
      "name": "Keyboard",
      "price": 2500,
      "quantity": 2
    }
  ],
  "totalAmount": 5000,
  "status": "placed"
}
```

Why store `name` and `price` inside the order?

Because product name or price may change later, but old orders should still show what the user actually bought.

## Questions to ask

- What are the most common queries?
- Is the related data read together?
- Can the nested array grow forever?
- Does the related data have its own lifecycle?
- Do we need atomic updates across the data?
- Which fields need indexes?

## Interview answer

MongoDB schema design should be based on access patterns. Data that is owned and usually read together can be embedded. Data that is independent, reused, or grows unbounded is often referenced. Good schema design considers query patterns, update patterns, document growth, and indexes.
