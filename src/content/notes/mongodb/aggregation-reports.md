---
title: "Aggregation Reports"
slug: "aggregation-reports"
description: "Calculate grouped summaries using aggregation pipeline."
track: "MongoDB"
priority: "Must Know"
---

# Aggregation Reports

Aggregation reports summarize data.

Example questions:

- total orders per user,
- revenue per month,
- top selling products,
- average rating per product.

## Example: total orders per user

```js
const report = await Order.aggregate([
  { $match: { status: 'paid' } },
  {
    $group: {
      _id: '$userId',
      totalSpent: { $sum: '$amount' },
      orderCount: { $sum: 1 },
    },
  },
  { $sort: { totalSpent: -1 } },
])
```

## Example: monthly revenue

```js
await Order.aggregate([
  { $match: { status: 'paid' } },
  {
    $group: {
      _id: {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
      },
      revenue: { $sum: '$amount' },
    },
  },
])
```

## What to explain

- `$match` filters,
- `$group` groups,
- `$sum` calculates,
- `$sort` orders,
- indexes help before aggregation.

## Interview angle

Explain that aggregation pipelines process documents through stages and are useful for reports, dashboards, and grouped calculations. Put filtering stages early when possible.

