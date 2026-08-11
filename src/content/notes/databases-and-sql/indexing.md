---
title: "Indexing"
slug: "indexing"
description: "B-Tree, hash indexes, clustered indexes, composite indexes, and table scans."
track: "Databases & SQL"
---

An index is a data structure that helps the database find rows faster.

Without an index, the database may scan the whole table.

## Table Scan

```sql
SELECT *
FROM users
WHERE email = 'a@example.com';
```

Without an index on `email`, the DB may check every row.

## B-Tree Index

Most relational databases use B-tree or B+tree indexes for common indexes.

Good for:

- Equality.
- Ranges.
- Sorting.
- Prefix matches.

## Hash Index

Good for equality lookups, less useful for ranges.

## Composite Index

Index on multiple columns.

```sql
CREATE INDEX idx_orders_user_status
ON orders(user_id, status);
```

Column order matters. An index on `(user_id, status)` helps queries filtering by `user_id`, and by `user_id + status`, but not usually by `status` alone.

## Clustered vs Non-Clustered

- Clustered index controls physical/logical row order in some DBMSs.
- Non-clustered index stores separate lookup structure pointing to rows.

Exact behavior depends on the database engine.

## Tradeoffs

Indexes speed reads but cost writes.

Every insert, update, or delete may need index maintenance.

## Interview Notes

- Indexes reduce search work.
- Too many indexes slow writes.
- Composite index order matters.
- Use `EXPLAIN` to verify whether an index is used.
- Index low-selectivity columns carefully; they may not help much alone.
