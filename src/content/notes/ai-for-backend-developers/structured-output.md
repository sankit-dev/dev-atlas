---
title: "Structured Output"
slug: "structured-output"
description: "Getting predictable JSON-shaped model responses."
track: "AI for Backend Developers"
---

Structured output means asking the model to return data in a predictable shape, usually JSON.

## Why it matters

Backend systems need output that software can parse.

Without structure, the model may return:

- Extra explanation.
- Missing fields.
- Different field names.
- Invalid JSON.
- Values in the wrong type.

Structured output reduces parsing problems.

## Common use cases

- Classification.
- Entity extraction.
- Form filling.
- Moderation results.
- Ticket routing.
- SQL query planning.
- Workflow decisions.

## Schema-first thinking

Design the output schema before writing the prompt.

Example fields:

- category.
- confidence.
- summary.
- needsHumanReview.
- extractedEntities.

The schema should match what your application actually needs.

## Validate anyway

Never trust model output blindly. Parse it, validate it, and decide what to do when it fails.

Validation should check:

- Required fields.
- Allowed enum values.
- Types.
- String length.
- Numeric ranges.

## Quick revision

- Structured output makes model responses easier to parse.
- JSON is common for backend systems.
- Define the schema first.
- Validate every response before using it.
