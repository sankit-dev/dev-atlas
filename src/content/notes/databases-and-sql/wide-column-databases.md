---
title: "Wide-Column Databases"
slug: "wide-column-databases"
description: "Distributed write-heavy storage using databases such as Cassandra."
track: "Databases & SQL"
---

# Wide-Column Databases

# What problem is this solving?

Some systems write huge amounts of data continuously across many machines.

Traditional relational modeling may not be the best fit when the workload is massive, distributed, and mostly query-pattern based.

---

# Simple definition

A wide-column database stores rows with flexible columns across distributed machines.

Popular examples:

- Cassandra
- HBase
- ScyllaDB

These databases are often used for huge write-heavy workloads.

---

# Real example

Imagine millions of devices continuously sending events:

```plain text
device_1 → temperature reading
device_2 → temperature reading
device_3 → temperature reading
...
```

The system needs:

- very high write throughput
- distributed storage
- predictable query patterns
- horizontal scaling

Wide-column databases can fit this type of workload.

---

# Better explanation

```plain text
device_id   timestamp           temperature
d_101       2026-08-13 10:00    31.2
d_101       2026-08-13 10:01    31.4
d_102       2026-08-13 10:01    29.8
```

The table is usually designed around how you will query it.

Example query:

```plain text
Get readings for device d_101 between 10:00 and 11:00
```

The database model is optimized around that access pattern.

---

# When wide-column databases fit well

Use them when:

- writes are massive
- data is distributed
- access patterns are known
- horizontal scale is critical
- joins are not central

Good examples:

- IoT sensor data
- logs
- analytics events
- time-series style workloads
- large-scale activity feeds

---

# When not to use them

Avoid wide-column databases when:

- you need flexible ad hoc queries
- joins are important
- transaction workflows are complex
- data volume is moderate and SQL works fine

For many normal backend apps, PostgreSQL or MySQL is simpler.

---

# Common mistake

Do not choose Cassandra for a normal CRUD application just because it scales.

It is powerful, but it expects careful data modeling around known access patterns.

---

# Interview Answer

If an interviewer asks:

> **When would you use Cassandra?**

You can answer:

I would use Cassandra or another wide-column database for massive distributed write-heavy workloads with predictable access patterns, such as IoT events, logs, analytics events, or time-series style data. I would avoid it for relational transaction-heavy systems where joins, ad hoc queries, and strong consistency are more important.
