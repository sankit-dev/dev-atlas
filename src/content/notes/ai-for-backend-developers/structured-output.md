---
title: "Structured Output"
slug: "structured-output"
description: "Getting predictable JSON-shaped model responses."
track: "AI for Backend Developers"
---

> **Structured output makes the model return data in a predictable format that your backend can safely process.**

## Why is it needed?

Humans can understand this:

```plain text
The customer is Aman, and his plan is Pro.
```

A backend usually needs this:

```json
{
  "name": "Aman",
  "plan": "pro"
}
```

Free-form text can change between requests. The model might add headings, explanations, or different property names, breaking your parser.

## Prompting for JSON is not always enough

This instruction helps:

```plain text
Return JSON only.
```

But the model may still return:

- invalid JSON
- missing fields
- wrong data types
- unexpected values
- extra explanation

A structured-output feature lets you define the expected schema.

## Example schema

```javascript
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    plan: { enum: ["free", "pro"] },
    active: { type: "boolean" }
  },
  required: ["name", "plan", "active"],
  additionalProperties: false
};
```

Conceptual request:

```javascript
const result = await ai.generate({
  input: "Aman has an active Pro subscription.",
  outputSchema: schema
});
```

Expected result:

```json
{
  "name": "Aman",
  "plan": "pro",
  "active": true
}
```

## Where it is useful

- extracting invoice fields
- classifying support tickets
- generating API-ready objects
- moderation results
- creating database records
- returning lists with fixed fields

## Still validate on the backend

A valid structure does not guarantee correct information.

For example, this is valid JSON but may be factually wrong:

```json
{
  "total": 5000
}
```

Validate:

- business rules
- allowed ranges
- IDs against your database
- permissions
- required relationships

## Structured output vs tool calling

- **Structured output:** return data in a required shape
- **Tool calling:** request that your backend perform an action

Use structured output when you need data. Use tool calling when the model needs to interact with a system.

## Common mistakes

- parsing ordinary prose with fragile string operations
- using an overly complex schema
- treating schema-valid output as factually correct
- directly inserting model output into a database without validation

> Structured output guarantees a **shape**, not the **truth**.
