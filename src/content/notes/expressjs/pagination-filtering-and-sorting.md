---
title: "Pagination, Filtering and Sorting"
slug: "pagination-filtering-and-sorting"
description: "Return large datasets in a controlled API shape."
track: "Express.js"
priority: "Must Know"
---

# Pagination, Filtering and Sorting

APIs should not return unlimited data.

If `/products` returns one million rows, the API becomes slow and the UI becomes unusable.

## Pagination

Example request:

```text
GET /products?page=2&limit=20
```

Express reads:

```js
const page = Number(req.query.page || 1)
const limit = Number(req.query.limit || 20)
const skip = (page - 1) * limit
```

## Filtering

Example:

```text
GET /products?category=books&minPrice=100
```

Filtering narrows results.

## Sorting

Example:

```text
GET /products?sort=price
GET /products?sort=-createdAt
```

Sorting controls order.

## Response shape

```json
{
  "data": [],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150
  }
}
```

## Common mistake

Validate query params.

Do not allow unlimited `limit`, random sort fields, or unsafe filters.

Set max limits and whitelist sortable fields.

## Interview answer

Pagination limits how much data an API returns at once. Filtering narrows results based on query params, and sorting controls order. Backend APIs should validate these query params, set maximum limits, and return pagination metadata so the frontend can render lists correctly.

