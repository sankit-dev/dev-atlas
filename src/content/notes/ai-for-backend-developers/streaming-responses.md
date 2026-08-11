---
title: "Streaming Responses"
slug: "streaming-responses"
description: "Sending partial model output to users as it arrives."
track: "AI for Backend Developers"
---

Streaming responses send model output to the user as it is generated.

## Why streaming helps

Large model responses can take time. Streaming improves perceived latency because the user sees progress quickly.

Common use cases:

- Chat assistants.
- Long explanations.
- Document summaries.
- Code generation.
- Agents showing progress.

## How it works

Instead of waiting for the full response, the backend receives chunks of output and forwards them to the client.

Transport options:

- Server-Sent Events.
- WebSockets.
- Chunked HTTP responses.

## Backend concerns

Streaming adds complexity:

- Client disconnect handling.
- Partial output state.
- Error display after partial text.
- Cancellation.
- Moderation.
- Logging final output.
- Retry behavior.

## UX concern

Streaming should not reveal unsafe intermediate data. If the final answer requires validation, you may need to buffer first and stream only after checks.

## Quick revision

- Streaming sends output incrementally.
- It improves perceived speed.
- SSE is common for one-way chat streaming.
- Handle disconnects, cancellation, and partial failures.
