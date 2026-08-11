---
title: "Temperature"
slug: "temperature"
description: "How randomness affects model output."
track: "AI for Backend Developers"
---

Temperature controls how much randomness the model uses when choosing output tokens.

## Low temperature

Low temperature makes output more focused and predictable.

Use it for:

- JSON generation.
- Classification.
- Data extraction.
- SQL generation.
- Policy decisions.
- Backend automation.

Low temperature does not guarantee correctness, but it reduces variation.

## High temperature

High temperature makes output more varied and creative.

Use it for:

- Brainstorming.
- Writing alternatives.
- Naming ideas.
- Creative drafts.

High temperature can also increase inconsistency.

## Backend defaults

For most backend features, prefer a low temperature because systems need predictable behavior.

Examples:

- Support ticket routing: low.
- Invoice field extraction: low.
- Code explanation: medium.
- Marketing copy ideas: higher.

## Temperature is not validation

Even with temperature set to zero or near zero, the model can still produce incorrect output. You still need validation, schemas, and tests.

## Quick revision

- Temperature controls randomness.
- Lower means more deterministic.
- Higher means more creative.
- Backend workflows usually prefer lower values.
- Temperature does not replace correctness checks.
