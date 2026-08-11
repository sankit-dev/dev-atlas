---
title: "Query Optimization"
slug: "query-optimization"
description: "EXPLAIN, execution plans, optimizers, predicate pushdown, N+1, pagination, and SELECT *."
track: "Databases & SQL"
---

Query optimization means making database queries return correct results with less work.

## EXPLAIN

```sql
EXPLAIN
SELECT *
FROM orders
WHERE user_id = 10;
```

Execution plans show whether the DB uses indexes, scans tables, sorts rows, joins efficiently, and estimates row counts.

## Common Problems

### Missing Index

Filtering a large table without an index can cause full scans.

### SELECT *

Pulls unnecessary data, increases network and memory cost, and can prevent covering index usage.

### N+1 Queries

Application fetches one parent list, then one query per parent.

```text
1 query for users
N queries for each user's orders
```

Fix with joins, batching, eager loading, or data loader patterns.

### Bad Pagination

```sql
LIMIT 50 OFFSET 100000
```

Large offsets can be expensive. Keyset pagination is often better.

### Functions on Indexed Columns

```sql
WHERE LOWER(email) = 'a@example.com'
```

May prevent normal index use unless a function index exists.

## Predicate Pushdown

Filter as early as possible so later operations process fewer rows.

## Interview Notes

- Use `EXPLAIN` instead of guessing.
- Index columns used in filters, joins, and sorting.
- Avoid N+1 queries.
- Avoid unnecessary columns.
- Pagination strategy matters at scale.
