---
title: "Aggregation Pipeline"
slug: "aggregation-pipeline"
description: "Transform and summarize data with pipeline stages."
track: "MongoDB"
priority: "Must Know"
---

# Aggregation Pipeline

The aggregation pipeline processes documents through stages.

Each stage transforms or filters the data and passes results to the next stage.

## Simple example

Find total orders per user:

```js
db.orders.aggregate([
  { $match: { status: 'paid' } },
  {
    $group: {
      _id: '$userId',
      totalAmount: { $sum: '$amount' },
      orderCount: { $sum: 1 }
    }
  },
  { $sort: { totalAmount: -1 } }
])
```

## Common stages

| Stage | Use |
| --- | --- |
| `$match` | filter documents |
| `$project` | select or reshape fields |
| `$group` | group and aggregate |
| `$sort` | sort results |
| `$limit` | limit result count |
| `$lookup` | join with another collection |
| `$unwind` | expand array items |

## Why aggregation matters

Aggregation is used for:

- reports,
- dashboards,
- analytics,
- summaries,
- grouped totals,
- joins through `$lookup`.

## Common mistake

Put `$match` early when possible.

Filtering early reduces how many documents later stages process.

## Interview answer

MongoDB aggregation pipeline processes documents through stages such as `$match`, `$group`, `$project`, `$sort`, and `$lookup`. It is used for transformations, summaries, reports, and analytics. A good pipeline filters early and only processes the data needed.

