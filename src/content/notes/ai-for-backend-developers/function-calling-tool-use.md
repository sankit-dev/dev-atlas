---
title: "Function Calling / Tool Use"
slug: "function-calling-tool-use"
description: "Letting models request typed actions from your backend."
track: "AI for Backend Developers"
---

Function calling lets a model request a typed backend action instead of only returning text.

## The idea

You define available functions or tools. The model decides when a tool is needed and returns arguments for that tool.

Your backend executes the tool, then sends the result back to the model or user.

## Example tools

- Search documentation.
- Create a support ticket.
- Get order status.
- Query a database.
- Send an email draft.
- Calculate a price.

## Why it is useful

Function calling gives the model controlled access to real systems.

Benefits:

- Typed inputs.
- Safer integration.
- Less fragile parsing.
- Clear audit logs.
- Deterministic execution in backend code.

## Backend responsibilities

The model should not directly perform privileged work. Your backend must check:

- User permissions.
- Argument validity.
- Tool allowlist.
- Rate limits.
- Idempotency.
- Audit logging.

## Important rule

The model chooses or suggests a tool call. Your application decides whether to execute it.

## Quick revision

- Function calling connects models to backend actions.
- Tools should have typed schemas.
- Backend code executes tools, not the model.
- Validate permissions and arguments before execution.
