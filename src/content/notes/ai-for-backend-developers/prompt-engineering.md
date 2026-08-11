---
title: "Prompt Engineering"
slug: "prompt-engineering"
description: "Writing instructions that produce useful model behavior."
track: "AI for Backend Developers"
---

Prompt engineering is the practice of writing instructions and context so the model produces useful output.

## Good prompts are specific

A good backend prompt usually defines:

- Task.
- Input format.
- Output format.
- Constraints.
- Examples.
- What to do when information is missing.

Vague prompts produce vague outputs.

## Prompt structure

A practical structure:

1. Role or behavior.
2. Task.
3. Context.
4. Rules.
5. Output schema.
6. Examples.

For backend systems, the output schema is often the most important part.

## Bad prompt

Summarize this.

## Better prompt

Summarize this support ticket in 3 bullet points. Include problem, suspected cause, and next action. If the ticket lacks enough detail, return "needs_more_info": true.

## Use delimiters

When inserting user content, separate it clearly from instructions.

Example:

- Instructions: classify the ticket.
- User content: the actual ticket text.

This reduces instruction confusion and prompt injection risk.

## Version prompts

Prompts are application logic. Store them in code, version them, test them, and review changes.

## Quick revision

- Prompt engineering controls model behavior.
- Be specific about task, constraints, and output.
- Use examples when behavior is subtle.
- Keep user content separated from instructions.
- Treat prompts like code.
