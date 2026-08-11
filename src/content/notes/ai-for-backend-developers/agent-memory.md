---
title: "Agent Memory"
slug: "agent-memory"
description: "Short-term and long-term memory in agent systems."
track: "AI for Backend Developers"
---

> **Agent memory is information preserved so an agent can use earlier facts, actions, and results while working toward a goal.**

## Why is it needed?

An agent may perform several steps:

```plain text
1. Fetch failed orders
2. Find the common error
3. Inspect service logs
4. Create a report
```

Without memory or state, it may forget what it already checked, repeat tools, or contradict an earlier result.

## Short-term memory

Short-term memory contains information needed for the current task.

Examples:

- current goal
- recent messages
- completed steps
- tool results
- temporary plan
- remaining work

```json
{
  "goal": "Investigate failed orders",
  "completed": ["Fetched 50 failed orders"],
  "finding": "38 failures contain INVENTORY_TIMEOUT",
  "nextStep": "Inspect inventory logs"
}
```

It usually expires when the task or session ends.

## Long-term memory

Long-term memory stores useful information that may help in future tasks.

Examples:

- user preferences
- stable project facts
- previously approved decisions
- summaries of completed work

```json
{
  "userId": 25,
  "projectDatabase": "PostgreSQL",
  "preferredReportFormat": "short Markdown summary"
}
```

Long-term memory belongs in external storage such as a database. The model itself is not the permanent storage.

## Short-term vs long-term

<table header-row="true">
<tr>
<td>Short-term memory</td>
<td>Long-term memory</td>
</tr>
<tr>
<td>Used for the current task</td>
<td>Used across future tasks</td>
</tr>
<tr>
<td>Plans and recent tool results</td>
<td>Stable facts and preferences</td>
</tr>
<tr>
<td>Usually temporary</td>
<td>Stored persistently</td>
</tr>
<tr>
<td>Often placed directly in context</td>
<td>Retrieved only when relevant</td>
</tr>
</table>

## Memory and context window are different

- **Memory storage:** information saved outside the model
- **Context window:** information included in the current model request

The application retrieves relevant memory and places it inside the context window.

```plain text
Database memory → retrieve useful facts → current context → model
```

## What should be remembered?

Before storing a memory, ask:

- Will it be useful later?
- Is it stable or likely to change?
- Is the user allowed to store it?
- Is it sensitive?
- When should it expire?

Do not turn every message or model guess into permanent truth.

## Common problems

### Incorrect memory

The agent may infer something incorrectly and save it as a fact. Validate important memories or let the user correct them.

### Irrelevant memory

Too many unrelated memories distract the model and waste tokens. Retrieve only what helps the current goal.

### Cross-user leakage

Memory must be isolated by user or tenant. One user's facts must never appear in another user's context.

### Outdated memory

Facts can change. Store timestamps and update or expire old information.

## Practical strategy

1. Keep structured task state for the current run.
2. Summarize long histories when necessary.
3. Store only useful and permitted long-term facts.
4. Retrieve memories based on the current goal.
5. Allow correction and deletion.
6. Never store secrets unnecessarily.

> **Short-term memory tracks the current job. Long-term memory preserves useful facts for future jobs. Both are managed by the application, not magically remembered by the model.**
