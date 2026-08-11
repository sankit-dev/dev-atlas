---
title: "Conversation Memory"
slug: "conversation-memory"
description: "Remembering useful context across turns."
track: "AI for Backend Developers"
---

Conversation memory is the context an AI feature remembers across turns.

## Short-term memory

Short-term memory is usually recent chat history included in the next model request.

It helps with:

- Follow-up questions.
- References like "that issue".
- Conversation continuity.

But it increases token cost.

## Long-term memory

Long-term memory stores durable facts outside the model context.

Examples:

- User preferences.
- Project details.
- Previous decisions.
- Saved summaries.

Long-term memory should be retrieved only when relevant.

## Backend design

Memory is an application feature, not automatic magic.

You need to decide:

- What to store.
- Who can access it.
- When to retrieve it.
- How long to keep it.
- How users can delete it.

## Risks

- Storing sensitive data accidentally.
- Remembering incorrect facts.
- Mixing data between users.
- Sending too much history.
- Making stale context look authoritative.

## Quick revision

- Memory can be recent history or durable stored facts.
- The backend owns memory storage and retrieval.
- Memory must respect privacy and permissions.
- Retrieve only useful context.
