---
title: "Token Usage & Cost Calculation"
slug: "token-usage-and-cost-calculation"
description: "Estimating AI feature cost from token usage."
track: "AI for Backend Developers"
---

Token usage determines the cost of many AI features.

## Cost components

Most providers charge separately for:

- Input tokens.
- Output tokens.
- Embedding tokens.
- Image, audio, or tool usage when applicable.

Some models have different prices for cached input or batch requests.

## Basic formula

Cost is usually:

Input tokens multiplied by input price plus output tokens multiplied by output price.

Always check the current provider pricing before committing to business estimates.

## What increases cost

- Long prompts.
- Full conversation history.
- Too many retrieved chunks.
- Large model choice.
- Long generated answers.
- Retries.
- Agents that make many calls.

## Backend tracking

Log usage per request:

- User ID or tenant ID.
- Feature name.
- Model.
- Input tokens.
- Output tokens.
- Total cost estimate.
- Request status.

This helps with billing, quotas, debugging, and abuse detection.

## Cost controls

- Set output token limits.
- Use smaller models when enough.
- Cache safe repeated responses.
- Summarize history.
- Limit retrieved chunks.
- Add user quotas.

## Quick revision

- AI cost often depends on token usage.
- Input and output may have different prices.
- RAG and agents can multiply costs.
- Log usage by feature and user.
