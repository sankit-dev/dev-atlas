---
title: "Context Window"
slug: "context-window"
description: "How much information a model can consider at once."
track: "AI for Backend Developers"
---

The context window is the amount of information a model can consider in a single request.

## What it includes

The context window includes all input sent to the model:

- System instructions.
- User message.
- Conversation history.
- Retrieved documents.
- Tool results.
- Examples.

The generated answer also consumes part of the total request capacity in many APIs.

## Why it matters

If context is too small, the model may miss important information. If context is too large, cost and latency increase and important details can get buried.

More context is not automatically better.

## Backend strategies

Use these patterns to manage context:

- Keep only relevant conversation turns.
- Summarize old history.
- Retrieve only the top matching documents.
- Trim repeated boilerplate.
- Prefer structured context over raw dumps.
- Set output token limits.

## RAG and context

In RAG, retrieved chunks are inserted into the prompt. If chunks are too large or too many, they waste context. If they are too small, they may miss important details.

Good RAG design balances chunk size, retrieval count, and answer requirements.

## Failure modes

- Request exceeds model limit.
- Important instruction gets diluted.
- Model answers from irrelevant context.
- Latency becomes too high.
- Cost grows unexpectedly.

## Quick revision

- Context window is the model's working input space.
- It includes instructions, history, documents, and tool results.
- Bigger context costs more and can be noisy.
- Backend systems should curate context before calling the model.
