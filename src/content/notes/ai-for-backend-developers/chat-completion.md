---
title: "Chat Completion"
slug: "chat-completion"
description: "Sending messages to a model and reading responses."
track: "AI for Backend Developers"
---

Chat completion is the common API pattern for sending messages to a model and receiving a response.

## Message roles

Most chat APIs use roles:

- System: behavior and rules.
- User: the user's request.
- Assistant: previous model replies.
- Tool: external tool results.

The model sees these messages as context.

## Basic request shape

A backend request usually includes:

- Model name.
- Messages.
- Temperature.
- Maximum output tokens.
- Optional tools.
- Optional structured output schema.

## Stateless API, stateful app

The API call is usually stateless. If you want conversation memory, your backend must store and resend relevant context.

Do not blindly resend infinite history. Summarize or select important turns.

## Response handling

Production code should handle:

- Empty or refused responses.
- Provider errors.
- Timeouts.
- Rate limits.
- Partial streaming responses.
- Invalid JSON.
- Retries with backoff.

## Common backend use cases

- Support assistants.
- Code explanation.
- Document summarization.
- Natural language search.
- Data extraction.
- Draft generation.

## Quick revision

- Chat completion sends role-based messages.
- The backend controls context and parameters.
- Conversation state must be managed by your app.
- Always handle failures and invalid output.
