---
title: "Indexes in MongoDB"
slug: "indexes-in-mongodb"
description: "Speed up queries with indexes and understand write tradeoffs."
track: "MongoDB"
priority: "Must Know"
---

# Indexes in MongoDB

An index helps MongoDB find documents faster.

Without an index, MongoDB may scan many documents to find matches.

## Simple example

Query:

```js
db.users.find({ email: 'asha@example.com' })
```

Index:

```js
db.users.createIndex({ email: 1 })
```

Now MongoDB can find users by email more efficiently.

## Unique index

```js
db.users.createIndex({ email: 1 }, { unique: true })
```

This prevents duplicate emails.

## Index tradeoff

Indexes improve reads but add cost to writes.

When documents are inserted, updated, or deleted, indexes must also be updated.

So do not index every field blindly.

## Real API example

Suppose your API lists a user's notes:

```text
GET /api/notes?page=1&tag=backend
```

Query:

```js
db.notes
  .find({ userId: 'user_1', tags: 'backend' })
  .sort({ updatedAt: -1 })
  .limit(20)
```

Useful compound index:

```js
db.notes.createIndex({
  userId: 1,
  tags: 1,
  updatedAt: -1,
})
```

This index matches the way the API filters and sorts.

That is the key idea:

> Indexes should come from real query patterns, not guesses.

## What to index

Index fields used often in:

- filtering,
- sorting,
- unique lookup,
- joins/lookups,
- pagination queries.

## Common mistake

Creating an index does not automatically make every query fast.

The query must match the index pattern well.

Use explain plans when performance matters.

## Interview answer

Indexes in MongoDB speed up queries by letting the database find matching documents without scanning the whole collection. They are useful for common filters, sorting, and unique constraints. The tradeoff is extra storage and slower writes because indexes must be maintained.
