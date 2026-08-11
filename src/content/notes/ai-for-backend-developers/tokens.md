---
title: "Tokens"
slug: "tokens"
description: "The units AI models read, write, and charge for."
track: "AI for Backend Developers"
---

Tokens are the units that language models read and write. They matter because they affect context limits, latency, and cost.

## What a token is

A token can be:

- A whole word.
- Part of a word.
- Punctuation.
- Whitespace.
- A symbol.

For example, a short sentence may become more tokens than words because uncommon words can be split into pieces.

## Why tokens matter

AI APIs usually charge based on token usage.

Total token usage includes:

- Input tokens: prompt, system message, conversation history, retrieved context.
- Output tokens: model response.

More tokens usually means:

- Higher cost.
- More latency.
- More context used.
- Higher chance of hitting model limits.

## Context window

The context window is the maximum number of tokens a model can consider in one request. If you send too much text, the request may fail or older content may need to be removed.

Backend systems should control context carefully instead of sending everything.

## Token budgeting

Before calling a model, estimate:

- How much instruction text is needed.
- How much user input is included.
- How much retrieved context is included.
- How large the answer can be.

For RAG systems, chunk size and number of retrieved chunks directly affect token usage.

## Common mistakes

- Sending entire documents when only one section is needed.
- Keeping full chat history forever.
- Asking for long output without a limit.
- Ignoring output token costs.
- Not logging usage per request.

## Quick revision

- Tokens are model-readable pieces of text.
- Both input and output tokens can cost money.
- Token count affects latency and limits.
- Good backend systems budget tokens deliberately.
