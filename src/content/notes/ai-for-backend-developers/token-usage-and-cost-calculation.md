---
title: "Token Usage & Cost Calculation"
slug: "token-usage-and-cost-calculation"
description: "Estimating AI feature cost from token usage."
track: "AI for Backend Developers"
---

> **AI API cost is commonly calculated from the number of input and output tokens used.**

Input and output tokens may have different prices.

## What counts as input tokens?

- system and developer instructions
- user message
- conversation history
- retrieved RAG documents
- tool definitions and results

## What counts as output tokens?

- generated answer
- structured output
- tool-call arguments created by the model

## Basic cost formula

```plain text
Input cost  = input tokens  × input price per token
Output cost = output tokens × output price per token
Total cost  = input cost + output cost
```

Prices are often listed per one million tokens:

```plain text
Input cost =
(input tokens ÷ 1,000,000) × input price per million

Output cost =
(output tokens ÷ 1,000,000) × output price per million
```

## Example calculation

Assume these **illustrative prices**:

```plain text
Input:  ₹100 per 1,000,000 tokens
Output: ₹400 per 1,000,000 tokens
```

One request uses:

```plain text
5,000 input tokens
1,000 output tokens
```

Calculation:

```plain text
Input  = (5,000 ÷ 1,000,000) × ₹100 = ₹0.50
Output = (1,000 ÷ 1,000,000) × ₹400 = ₹0.40

Total = ₹0.90
```

These prices are examples only. Always use the current pricing for the exact model.

## Reading usage from a response

A provider may return something like:

```json
{
  "input_tokens": 5000,
  "output_tokens": 1000,
  "total_tokens": 6000
}
```

Store usage by user, feature, model, and request.

## Why input can become expensive

In a long conversation, your application may resend the conversation history with every request.

```plain text
Request 1: short history
Request 20: large history + new message
```

RAG documents, tool definitions, and repeated instructions also add input tokens.

## How to control cost

- choose an appropriate model for the task
- limit output tokens
- send only relevant conversation history
- retrieve fewer and better RAG chunks
- summarize older messages
- cache safe repeated results
- avoid retry loops without limits
- rate-limit users
- monitor cost per feature

## Cost should be controlled on the server

The frontend can request a long answer, but the backend should enforce:

- maximum input size
- maximum output tokens
- requests per user
- daily or monthly usage budget
- allowed models

## Cost vs context window

These are related but different:

- **Context window:** maximum tokens the model can process at once
- **Token cost:** money charged for tokens processed or generated

A request may fit inside the context window and still be unnecessarily expensive.

> Track cost per request, per user, and per feature. A small cost multiplied by thousands of requests becomes a large bill.
