---
title: "Key-Value Databases"
slug: "key-value-databases"
description: "Fast key-based lookup using databases such as Redis."
track: "Databases & SQL"
---

# Key-Value Databases

A key-value database stores data like a dictionary:

```plain text
key → value
```

Popular examples:

- Redis
- Memcached
- DynamoDB in key-value access patterns

---

# Simple Example

```plain text
session:user_101 → { "loggedIn": true, "role": "admin" }
```

You ask by key:

```plain text
session:user_101
```

The database returns the value.

No joins.

No complex relational model.

Just fast lookup.

---

# Redis Example

Redis is commonly used for:

- cache
- sessions
- counters
- queues
- rate limiting

Example:

```plain text
rate_limit:user_101 → 43
```

If the user sends another request, increment the counter.

If the counter crosses the limit, block or slow down the user.

---

# When key-value databases fit well

Use a key-value database when:

- lookup is mostly by key
- speed matters
- access pattern is simple
- data is temporary or cache-like
- joins are not needed

Good examples:

- sessions
- cache
- OTP storage
- feature flags
- rate limit counters
- shopping cart cache

---

# When not to use key-value stores

Avoid key-value stores as the main database when:

- you need complex queries
- relationships matter
- reporting is important
- transactions across entities are required

Example:

An order/payment system should usually not be modeled only as Redis keys.

SQL is a better default there.

---

# Interview Answer

If an interviewer asks:

> **When would you use Redis or a key-value database?**

You can answer:

I would use a key-value database when access is mostly by key and speed matters, such as caching, sessions, OTPs, feature flags, and rate limiting. Redis is a common example. It is not a good default for complex relational data because it does not naturally support joins and rich querying like SQL.
