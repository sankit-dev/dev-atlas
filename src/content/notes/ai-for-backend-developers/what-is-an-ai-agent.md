---
title: "What is an AI Agent?"
slug: "what-is-an-ai-agent"
description: "The basic agent loop and how it differs from one-shot prompting."
track: "AI for Backend Developers"
---

An AI agent is a system where a model can decide steps, use tools, observe results, and continue toward a goal.

## Agent loop

A simple agent loop:

1. Receive goal.
2. Decide next action.
3. Call a tool or produce output.
4. Observe result.
5. Decide whether more work is needed.
6. Finish or continue.

This is different from a one-shot prompt where the model only answers once.

## Tools

Agents become useful when they can use tools.

Examples:

- Search docs.
- Read files.
- Query databases.
- Create tickets.
- Send notifications.
- Run tests.

The backend controls which tools exist and what permissions they have.

## Agent boundaries

Agents should not have unlimited access. Give them scoped tools, clear goals, time limits, and approval gates for risky actions.

## When to use agents

Use an agent when the task requires multiple steps, tool use, or adapting based on intermediate results.

Do not use an agent for simple classification or extraction.

## Quick revision

- Agents loop through planning, action, observation, and completion.
- Tools make agents useful.
- Backend systems must enforce boundaries.
- Use agents for multi-step adaptive tasks.
