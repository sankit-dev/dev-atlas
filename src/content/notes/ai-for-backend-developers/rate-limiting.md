---
title: "Rate Limiting"
slug: "rate-limiting"
description: "Protecting AI endpoints from overuse."
track: "AI for Backend Developers"
---

Rate limiting controls how often users or systems can call AI features.

## Why it matters

AI calls can be expensive and slow. Without limits, one user, bug, or attacker can consume large amounts of budget.

Rate limiting protects:

- Cost.
- Availability.
- Provider quotas.
- User experience.
- Abuse boundaries.

## What to limit

Limit by:

- User ID.
- Tenant ID.
- IP address.
- API key.
- Feature.
- Model.

Use stricter limits for expensive features.

## Common strategies

- Fixed window.
- Sliding window.
- Token bucket.
- Leaky bucket.
- Daily quotas.

For AI, token-based quotas can be more accurate than request-based quotas.

## User experience

When a limit is hit, return a clear error with when the user can retry. Do not silently fail.

## Quick revision

- Rate limiting controls cost and abuse.
- Limit by user, tenant, feature, and token usage.
- Expensive models need stricter controls.
- Return clear retry information.
