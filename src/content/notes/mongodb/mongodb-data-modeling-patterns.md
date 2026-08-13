---
title: "MongoDB Data Modeling Patterns"
slug: "mongodb-data-modeling-patterns"
description: "Use common document modeling patterns for real apps."
track: "MongoDB"
priority: "Important"
---

# MongoDB Data Modeling Patterns

MongoDB schema design often uses repeatable patterns.

Patterns help solve common document modeling problems.

## Embedded document pattern

Use when child data is owned by parent and read together.

Example:

```json
{
  "user": "Asha",
  "address": {
    "city": "Pune"
  }
}
```

## Reference pattern

Use when related data is independent or reused.

```json
{
  "postTitle": "MongoDB",
  "authorId": "user_123"
}
```

## Subset pattern

Store frequently needed child data inside parent, and full data separately.

Example: product page stores latest 3 reviews embedded, all reviews in another collection.

## Computed pattern

Store precomputed values when calculating them every time is expensive.

Example:

```json
{
  "productId": "p1",
  "reviewCount": 128,
  "averageRating": 4.6
}
```

## Interview answer

MongoDB data modeling patterns include embedding, referencing, subset pattern, and computed fields. These patterns are chosen based on read/write access patterns, data growth, and consistency needs. Good MongoDB design avoids blindly normalizing everything or embedding everything.

