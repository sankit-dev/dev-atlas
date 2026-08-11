---
title: "Agentic Workflows"
slug: "agentic-workflows"
description: "Workflow patterns that combine model decisions and deterministic code."
track: "AI for Backend Developers"
---

Agentic workflows combine model decisions with deterministic backend steps.

## Workflow vs agent

A pure agent decides many steps dynamically. A workflow has a more defined structure.

Agentic workflows are often safer for products because the backend controls the overall path while the model handles flexible decisions inside steps.

## Example workflow

Support automation:

1. Classify ticket.
2. Retrieve relevant policy.
3. Draft response.
4. Validate tone and policy match.
5. Send to human review if confidence is low.

The model helps, but the workflow controls the process.

## Why workflows are practical

They are easier to:

- Test.
- Monitor.
- Debug.
- Secure.
- Estimate for cost.
- Explain to users.

## Design principles

- Use deterministic code where possible.
- Use the model where flexibility is needed.
- Add validation between steps.
- Keep audit logs.
- Define clear failure states.

## Quick revision

- Agentic workflows mix AI decisions and normal backend code.
- They are more controllable than open-ended agents.
- Each step should have inputs, outputs, and validation.
- Use workflows for production reliability.
