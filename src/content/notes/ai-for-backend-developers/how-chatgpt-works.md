---
title: "How ChatGPT works"
slug: "how-chatgpt-works"
description: "A high-level explanation of language model behavior."
track: "AI for Backend Developers"
---

ChatGPT is an application built on a large language model. At a high level, it receives text, converts it into tokens, predicts useful next tokens, and returns a response.

## Language model idea

A language model learns statistical patterns in text. It does not look up a perfect answer from memory for every question. It predicts likely continuations based on the input and its training.

When you ask a question, the model considers:

- The system instructions.
- The conversation history.
- Your latest message.
- Any retrieved or tool-provided context.
- Model parameters like temperature.

## Tokens

The model does not read raw characters exactly like humans do. Text is split into tokens. A token can be a word, part of a word, punctuation, or whitespace.

The model receives tokens as input and generates tokens as output.

## Prediction loop

The model repeatedly predicts the next token.

1. Read the current context.
2. Score possible next tokens.
3. Choose one token based on probabilities and settings.
4. Append the token to the response.
5. Repeat until the answer is complete or a limit is reached.

This is why responses can be fluent but still need validation.

## Chat format

Chat APIs usually send a list of messages.

- System message: behavior and constraints.
- User message: request from the user.
- Assistant message: previous model responses.
- Tool messages: results from external tools.

The model uses all of these to decide what to produce next.

## Why it can be wrong

The model is optimized to produce likely and useful text, not to guarantee truth. If it lacks enough context, it may guess.

Common causes:

- Missing data.
- Ambiguous prompt.
- Outdated knowledge.
- Conflicting context.
- Overly broad instructions.

## Backend developer view

Treat the model like a probabilistic service. Add validation, logging, retries, rate limits, output schemas, and fallback behavior.

## Quick revision

- ChatGPT is powered by a language model.
- Text becomes tokens.
- The model predicts output token by token.
- It uses messages and context to respond.
- Correctness still requires system design around the model.
