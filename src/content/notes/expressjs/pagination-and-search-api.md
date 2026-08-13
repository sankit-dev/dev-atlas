---
title: "Pagination and Search API"
slug: "pagination-and-search-api"
description: "Add query-based list controls to an endpoint."
track: "Express.js"
priority: "Must Know"
---

# Pagination and Search API

This exercise tests query params and database query construction.

## Goal

Build:

```text
GET /products?page=1&limit=20&search=phone&sort=-createdAt
```

## Parse query params

```js
const page = Math.max(Number(req.query.page || 1), 1)
const limit = Math.min(Number(req.query.limit || 20), 100)
const search = String(req.query.search || '')
const sort = String(req.query.sort || '-createdAt')
```

## Response shape

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 93,
    "totalPages": 5
  }
}
```

## Requirements

- validate page and limit,
- set max limit,
- whitelist sort fields,
- return pagination metadata,
- handle empty results,
- avoid returning unlimited data.

## Interview angle

Explain how query params control pagination, filtering, and sorting, and why the backend must validate and limit those params.

