---
title: "Compound and Text Indexes"
slug: "compound-and-text-indexes"
description: "Use multi-field and text search indexes."
track: "MongoDB"
priority: "Important"
---

# Compound and Text Indexes

Indexes can cover one field or multiple fields.

MongoDB also supports text indexes for text search.

## Compound index

A compound index uses more than one field.

Example query:

```js
db.orders.find({
  userId: 'u1',
  status: 'paid',
}).sort({ createdAt: -1 })
```

Possible index:

```js
db.orders.createIndex({
  userId: 1,
  status: 1,
  createdAt: -1,
})
```

Order matters in compound indexes.

Design the index around actual query patterns.

## Text index

Text index:

```js
db.posts.createIndex({
  title: 'text',
  body: 'text',
})
```

Search:

```js
db.posts.find({
  $text: { $search: 'mongodb indexing' },
})
```

## Common mistake

Do not create indexes without checking queries.

Indexes cost storage and slow down writes.

Use `explain()` to inspect whether queries use indexes.

## Interview answer

A compound index includes multiple fields and is useful for queries that filter or sort by those fields together. Field order matters. A text index supports text search over string fields. Indexes improve reads but add storage and write overhead, so they should match real query patterns.

