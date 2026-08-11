---
title: "Database Scaling"
slug: "database-scaling"
description: "Vertical scaling, horizontal scaling, read replicas, partitioning, and sharding."
track: "Databases & SQL"
---

Database scaling handles increased data volume, traffic, and availability requirements.

## Vertical Scaling

Make one database server stronger:

- More CPU.
- More RAM.
- Faster disk.

Simple but limited.

## Horizontal Scaling

Add more machines.

More complex because data must be replicated, partitioned, or sharded.

## Read Replicas

Primary handles writes; replicas serve reads.

```text
App writes -> Primary
App reads  -> Replica
```

Tradeoff: replicas may lag behind primary.

## Partitioning

Split a large table into smaller parts.

Examples:

- By date.
- By region.
- By tenant.

## Sharding

Distribute data across multiple database servers.

```text
users 1-1M    -> shard A
users 1M-2M   -> shard B
users 2M-3M   -> shard C
```

Sharding improves capacity but complicates joins, transactions, rebalancing, and operations.

## Caching

Use Redis or application caches for hot reads. Cache invalidation becomes the hard part.

## Interview Notes

- Vertical scaling is easier but has limits.
- Read replicas scale reads, not writes.
- Sharding scales writes/storage but adds complexity.
- Partitioning can improve manageability and query performance.
- Always measure bottlenecks before scaling.
