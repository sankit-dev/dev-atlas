---
title: "Prompt Engineering"
slug: "prompt-engineering"
description: "Writing instructions that produce useful model behavior."
track: "AI for Backend Developers"
---

> **Prompt engineering means giving clear instructions to an AI so it produces a useful answer.**

## Why is it needed?

An AI cannot automatically know exactly what you want.

A vague prompt gives the AI more room to guess.

A clear prompt tells it:

- what task to perform
- what context it should use
- what rules it should follow
- what the final answer should look like

## Simple example

**Vague prompt:**

```plain text
Explain APIs.
```

This may produce an answer that is too broad or too advanced.

**Better prompt:**

```plain text
Explain REST APIs to a beginner backend developer.
Use simple language, one real-world analogy, and a small Node.js example.
Keep the answer under 300 words.
```

The second prompt is better because the AI knows the **audience, depth, format, and limit**.

## A useful prompt structure

<table header-row="true">
<tr>
<td>Part</td>
<td>Meaning</td>
<td>Example</td>
</tr>
<tr>
<td>Role</td>
<td>Who should the AI act as?</td>
<td>You are a backend mentor.</td>
</tr>
<tr>
<td>Task</td>
<td>What should it do?</td>
<td>Explain JWT authentication.</td>
</tr>
<tr>
<td>Context</td>
<td>What background does it need?</td>
<td>I know basic Node.js but not security.</td>
</tr>
<tr>
<td>Constraints</td>
<td>What rules should it follow?</td>
<td>Use simple language and avoid unnecessary theory.</td>
</tr>
<tr>
<td>Output format</td>
<td>How should the answer be presented?</td>
<td>Give notes, an example, and interview questions.</td>
</tr>
</table>

## Important techniques

### Zero-shot prompting

Ask the AI to do a task without giving an example.

```plain text
Classify this review as positive, negative, or neutral:
"The product is useful, but delivery was late."
```

### Few-shot prompting

Give a few examples so the AI can copy the pattern.

```plain text
"Excellent product" → Positive
"Waste of money" → Negative
"It is okay" → Neutral

Classify: "Good quality, but expensive."
```

### Step-by-step instruction

Break a complex task into smaller steps.

```plain text
Review this API design:
1. Find security problems.
2. Find performance problems.
3. Suggest improvements.
4. Show the corrected design.
```

### Give the AI boundaries

Tell it what to do when information is missing.

```plain text
Use only the information I provide.
If something is unknown, say "I don't have enough information."
Do not guess.
```

This helps reduce hallucinations, but it cannot remove them completely.

## Prompt template

```plain text
You are a [role].

Your task is to [task].

Context:
[important background]

Requirements:
- [rule 1]
- [rule 2]

Return the answer as:
[output format]
```

> **Simple rule:** Better context + clearer instructions = a more useful answer.

## Interview answer

**Prompt engineering is the process of designing clear instructions, context, examples, and output constraints so an AI model produces a more accurate and useful response.**
