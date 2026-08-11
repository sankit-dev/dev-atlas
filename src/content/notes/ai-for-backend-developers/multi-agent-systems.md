---
title: "Multi-Agent Systems"
slug: "multi-agent-systems"
description: "Multiple agents coordinating on a task."
track: "AI for Backend Developers"
---

Multi-agent systems use more than one agent to complete a task.

## Why use multiple agents

Different agents can specialize.

Examples:

- Research agent.
- Planning agent.
- Coding agent.
- Review agent.
- Testing agent.

Specialization can improve organization, but it also adds complexity.

## Coordination patterns

Common patterns:

- Manager-worker: one agent delegates tasks.
- Peer collaboration: agents exchange results.
- Reviewer loop: one agent produces, another critiques.
- Pipeline: each agent handles one stage.

## Risks

Multi-agent systems can be expensive and hard to debug.

Risks include:

- Too many model calls.
- Repeated work.
- Conflicting decisions.
- Weak ownership.
- Hard-to-follow logs.

## Backend requirements

Track:

- Which agent did what.
- Tool calls.
- Intermediate outputs.
- Costs.
- Final decision owner.

Without observability, multi-agent systems become hard to operate.

## Quick revision

- Multi-agent systems split work across agents.
- They help with complex workflows.
- They increase cost and debugging complexity.
- Use them only when one agent or deterministic code is not enough.
