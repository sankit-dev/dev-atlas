---
title: "Hallucinations"
slug: "hallucinations"
description: "Why models can produce plausible but wrong answers."
track: "AI for Backend Developers"
---

A hallucination is when a model produces information that sounds plausible but is false, unsupported, or invented.

## Why hallucinations happen

Language models generate likely text. They do not automatically know whether every statement is true.

Hallucinations can happen when:

- The prompt lacks enough context.
- The model is asked about unknown facts.
- The question assumes a false premise.
- Retrieved context is irrelevant.
- The model is pushed to answer instead of saying it does not know.

## Examples

- Inventing an API parameter.
- Creating a fake citation.
- Claiming a file contains code it has not read.
- Giving outdated pricing.
- Explaining a bug without enough logs.

## How to reduce them

Use system design, not hope.

- Provide source context.
- Ask the model to cite only provided material.
- Use retrieval for private knowledge.
- Validate structured output.
- Add tool calls for live data.
- Allow "I do not know" responses.
- Keep human review for high-risk decisions.

## Backend guardrails

For production systems, log the prompt, retrieved context IDs, model response, and validation result. This makes hallucinations debuggable.

For critical workflows, separate generation from verification.

## Quick revision

- Hallucinations are plausible but wrong outputs.
- They happen because models predict text.
- More context helps only if it is relevant.
- Validation and retrieval reduce risk.
- Never rely on raw model output for high-stakes actions.
