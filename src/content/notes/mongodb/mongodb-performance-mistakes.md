---
title: "MongoDB Performance Mistakes"
slug: "mongodb-performance-mistakes"
description: "Avoid unindexed queries, huge documents, and bad pagination."
track: "MongoDB"
priority: "Important"
---

# MongoDB Performance Mistakes

MongoDB can be fast, but poor design can make it slow.

Most beginner performance issues come from bad queries, missing indexes, or poor schema design.

## Unindexed queries

If a common query has no useful index, MongoDB may scan many documents.

Example:

```js
db.users.find({ email: 'asha@example.com' })
```

If email lookup is common, add an index:

```js
db.users.createIndex({ email: 1 })
```

## Huge documents

Do not let documents grow forever.

Bad example:

```json
{
  "post": "MongoDB Basics",
  "comments": [ "...thousands of comments forever..." ]
}
```

Large unbounded arrays can make documents slow and hard to update.

## Bad pagination

Large `skip` values can become expensive.

```js
db.posts.find().skip(100000).limit(20)
```

For large datasets, cursor/range-based pagination is often better.

## Returning too much data

Use projection when only some fields are needed:

```js
db.users.find({}, { name: 1, email: 1 })
```

## Interview answer

Common MongoDB performance mistakes include missing indexes for frequent queries, creating too many indexes, using huge unbounded documents, relying on large skip pagination, returning unnecessary fields, and modeling data without considering access patterns.

