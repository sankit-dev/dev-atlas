---
title: "Tools / Function Calling in Agents"
slug: "tools-function-calling-in-agents"
description: "How agents use tools to affect external systems."
track: "AI for Backend Developers"
---

Agents use tools to interact with external systems. Function calling is the structured way to request those tool actions.

## Tool schema

Each tool should define:

- Name.
- Description.
- Required arguments.
- Argument types.
- Allowed values.
- Result shape.

Clear schemas reduce bad tool calls.

## Execution flow

1. Model decides a tool is needed.
2. Model returns tool name and arguments.
3. Backend validates the request.
4. Backend checks permissions.
5. Backend executes the tool.
6. Tool result is returned to the model or user.

## Tool design

Prefer narrow tools over broad tools.

Good:

- getOrderStatus(orderId)
- searchHelpCenter(query)

Risky:

- runAnySql(query)
- executeShell(command)

Narrow tools are easier to validate and secure.

## Idempotency

Actions that change state should use idempotency keys or confirmation steps. This prevents duplicate actions when retries happen.

## Quick revision

- Tools let agents act.
- Backend validates and executes tool calls.
- Narrow tools are safer than broad tools.
- Risky state-changing actions need approvals or idempotency.
