---
title: "Views"
slug: "views"
description: "Views and materialized views."
track: "Databases & SQL"
---

A view is a saved SQL query that behaves like a virtual table.

## View

```sql
CREATE VIEW active_users AS
SELECT id, name, email
FROM users
WHERE active = true;
```

Query it like a table:

```sql
SELECT *
FROM active_users;
```

The data is usually not stored separately; the underlying query runs when the view is used.

## Why Use Views?

- Hide query complexity.
- Restrict visible columns.
- Provide stable API over tables.
- Improve readability.
- Reuse common joins/filters.

## Materialized View

A materialized view stores the query result physically.

Good for expensive reporting queries.

Tradeoff: it can become stale and must be refreshed.

```sql
REFRESH MATERIALIZED VIEW sales_summary;
```

## View vs Materialized View

| View | Materialized View |
| --- | --- |
| Virtual query | Stored result |
| Always reflects current base data | Can be stale |
| No separate storage for result | Uses storage |
| Good for abstraction/security | Good for performance/reporting |

## Interview Notes

- A view is a virtual table based on a query.
- A materialized view stores results.
- Views can simplify access and limit exposed columns.
- Materialized views trade freshness for speed.
