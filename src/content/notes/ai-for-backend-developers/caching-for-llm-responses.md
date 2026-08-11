---
title: "Caching for LLM responses"
slug: "caching-for-llm-responses"
description: "Caching model responses where it is correct and useful."
track: "AI for Backend Developers"
---

Caching stores reusable AI results so repeated requests can avoid another model call.

## When caching is safe

Caching works best for deterministic or low-risk outputs.

Examples:

- Summaries of public docs.
- Generated explanations for static content.
- Embeddings for unchanged text.
- Classification for immutable records.

## When caching is risky

Avoid blind caching when output depends on:

- User permissions.
- Personal data.
- Frequently changing facts.
- Conversation state.
- Current time.
- Random creative generation.

Wrong caching can leak data or return stale answers.

## Cache keys

A cache key should include everything that affects the output:

- Model.
- Prompt version.
- Input text hash.
- Relevant settings.
- User or tenant when needed.
- Retrieved context version.

## Embedding cache

Embedding unchanged text is a strong caching use case. Store the embedding and recompute only when the source text changes.

## Quick revision

- Cache only when reuse is correct.
- Include prompt and model version in cache keys.
- Be careful with user-specific data.
- Embedding caching is usually valuable.
