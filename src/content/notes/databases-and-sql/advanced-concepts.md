---
title: "Advanced Concepts"
slug: "advanced-concepts"
description: "MVCC, WAL, replication, CAP theorem, BASE, connection pooling, and Redis caching."
track: "Databases & SQL"
---

These advanced DBMS concepts show up often in backend system design discussions.

## MVCC

Multi-Version Concurrency Control lets readers and writers work concurrently by keeping multiple row versions.

Readers can see a consistent snapshot while writers update newer versions.

## WAL

Write-Ahead Log records changes before applying them to data files.

If the DB crashes, WAL helps recover committed changes.

## Replication

Copies data from one database node to another.

Common forms:

- Primary-replica.
- Multi-primary.
- Synchronous.
- Asynchronous.

## CAP Theorem

In a network partition, a distributed system must choose between:

- Consistency.
- Availability.

Partition tolerance is unavoidable in distributed systems.

## BASE

Often discussed with distributed NoSQL systems:

- Basically Available.
- Soft state.
- Eventually consistent.

## Connection Pooling

Opening DB connections is expensive. A pool reuses connections.

Benefits:

- Lower latency.
- Controlled DB connection count.
- Better resource usage.

## Redis Caching

Redis is often used for:

- Cache.
- Sessions.
- Rate limits.
- Queues.
- Counters.

Hard parts:

- Cache invalidation.
- Stale data.
- Choosing TTLs.
- Avoiding cache stampedes.

## Interview Notes

- MVCC improves read/write concurrency.
- WAL supports durability and crash recovery.
- Replication improves read scale and availability.
- CAP explains tradeoffs during network partitions.
- Connection pools protect both app and database resources.
