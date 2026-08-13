---
title: "Search and Pagination in MongoDB"
slug: "search-and-pagination-in-mongodb"
description: "Implement query search and paginated lists."
track: "MongoDB"
priority: "Must Know"
---

# Search and Pagination in MongoDB

List APIs need search and pagination.

Returning every document is not scalable.

## Basic pagination

```js
const page = Math.max(Number(req.query.page || 1), 1)
const limit = Math.min(Number(req.query.limit || 20), 100)
const skip = (page - 1) * limit

const notes = await Note.find({ userId: req.user.id })
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 })
```

## Basic search

```js
const search = req.query.search || ''

const filter = {
  userId: req.user.id,
  title: { $regex: search, $options: 'i' },
}
```

## Response shape

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 84,
    "totalPages": 5
  }
}
```

## Performance note

Regex search can be slow on large collections.

For serious search, consider text indexes or dedicated search tools.

Large `skip` can also become expensive. Cursor-based pagination may be better for big datasets.

## Interview angle

Explain page, limit, skip, sorting, total count, and metadata. Mention that regex and large skip can become performance problems, so indexes or cursor-based pagination may be needed.

