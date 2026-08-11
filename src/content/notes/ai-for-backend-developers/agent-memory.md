---
title: "Agent Memory"
slug: "agent-memory"
description: "Short-term and long-term memory in agent systems."
track: "AI for Backend Developers"
---

Agent memory stores information an agent can use across steps or sessions.

## Short-term agent memory

Short-term memory includes the current task context:

- Goal.
- Plan.
- Recent observations.
- Tool results.
- Current state.

This helps the agent continue without repeating work.

## Long-term agent memory

Long-term memory stores reusable facts:

- User preferences.
- Project conventions.
- Past decisions.
- Known workflows.

Long-term memory should be retrieved selectively.

## Memory quality

Bad memory can harm an agent.

Risks:

- Stale facts.
- Wrong assumptions.
- Private data leakage.
- Cross-user mixing.
- Too much irrelevant context.

## Backend controls

The backend should decide what gets written to memory, how it is indexed, and when it expires.

Users should be able to inspect or delete sensitive memory.

## Quick revision

- Agent memory can be short-term or long-term.
- Memory helps continuity but creates risk.
- Store only useful facts.
- Apply permissions and expiration.
