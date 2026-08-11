---
title: "Rate Limiting"
slug: "rate-limiting"
description: "Protecting AI endpoints from overuse."
track: "AI for Backend Developers"
---

> **Rate limiting controls how frequently a user or application can call an AI feature.**

## Why is it especially important for AI?

Every request may consume:

- provider quota
- tokens
- money
- server connections
- tool calls
- database and vector-search resources

Without limits, one user, a bug, or an attacker could create a large bill or make the feature unavailable.

## Simple example

```plain text
Maximum 20 AI requests per user every minute.
```

After the limit:

```javascript
HTTP 429 Too Many Requests
Retry-After: 30
```

## What should be limited?

Do not rely only on request count.

Possible limits include:

- requests per minute
- input tokens per request
- output tokens per request
- total tokens per day
- concurrent generations
- tool actions per hour
- spending per user or organization

One request containing 100,000 tokens is not equivalent to a small request.

## Where to apply limits

Use multiple scopes when needed:

<table header-row="true">
<tr>
<td>Scope</td>
<td>Purpose</td>
</tr>
<tr>
<td>User ID</td>
<td>Fair usage for signed-in users</td>
</tr>
<tr>
<td>Organization</td>
<td>Shared team budget</td>
</tr>
<tr>
<td>IP address</td>
<td>Basic protection for anonymous traffic</td>
</tr>
<tr>
<td>Endpoint</td>
<td>Stricter limits for expensive features</td>
</tr>
<tr>
<td>Global</td>
<td>Protect provider quota and system capacity</td>
</tr>
</table>

IP limits alone are unreliable because many users can share an IP and attackers can rotate addresses.

## Common algorithms

- **Fixed window:** count requests during a fixed minute; simple but can allow bursts at the boundary
- **Sliding window:** count over the most recent time period; smoother but more work
- **Token bucket:** users collect tokens over time and spend one per request; allows controlled bursts

You only need to understand the behaviour. A rate-limit library or gateway can implement the algorithm.

## Simplified backend example

```javascript
const allowed = await limiter.consume({
  key: `ai:user:${user.id}`,
  cost: 1,
  limit: 20,
  windowSeconds: 60
});

if (!allowed) {
  return response.status(429).json({
    error: "AI request limit reached. Try again shortly."
  });
}
```

For multiple backend instances, store counters in a shared system such as Redis rather than local memory.

## Rate limiting vs budget limiting

- **Rate limit:** controls how fast requests arrive
- **Budget limit:** controls total usage or cost over a longer period

A production AI feature may need both.

## Common mistakes

- limiting only at the frontend
- trusting a user-provided ID as the key
- keeping counters separately on each server
- using the same limit for cheap and expensive endpoints
- retrying provider rate-limit errors immediately
- returning no information about when to retry

> Rate limiting protects **availability and speed**. Token and spending budgets protect **cost**.
