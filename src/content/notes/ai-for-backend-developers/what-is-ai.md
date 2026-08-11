---
title: "What is AI?"
slug: "what-is-ai"
description: "Artificial intelligence as pattern learning and problem solving."
track: "AI for Backend Developers"
---

First, forget ChatGPT for a moment. Let's understand the actual goal of AI.

## What is intelligence?

Suppose I ask:

> **2 + 2 = ?**

You immediately answer:

> **4**

Why? Because your brain learned patterns over many years.

Now I ask:

> **A dog has 4 legs. How many legs do 3 dogs have?**

You answer:

> **12**

Again, your brain is not following a hardcoded program. It is using what it has learned.

That ability to learn patterns and use them to solve new problems is what we call intelligence.

---

## What is artificial intelligence?

Artificial means made by humans.

Intelligence means the ability to solve problems.

So:

> **Artificial Intelligence = a computer system that can perform tasks that normally require human intelligence.**

Examples:

- Understanding language.
- Recognizing faces.
- Driving a car.
- Translating languages.
- Writing code.
- Answering questions.

---

## Traditional programming vs AI

This is one of the most important concepts.

### Traditional programming

Imagine writing a simple program.

```java
if (temperature > 30) {
  System.out.println("Hot");
} else {
  System.out.println("Cold");
}
```

You wrote every rule. The computer does not think. It follows instructions.

```plain text
Human
  |
  v
Write rules
  |
  v
Computer executes rules
```

Everything is deterministic.

### AI programming

Now imagine showing a computer 10,000 photos. Some contain cats. Some contain dogs.

Instead of writing:

```java
if (ears == pointy && tail == long) {
  return "cat";
}
```

You say:

> Here are thousands of examples. Learn the difference.

The computer discovers patterns by itself.

```plain text
Examples
  |
  v
AI learns patterns
  |
  v
Classifies new images
```

No human writes the exact rule for every case. That is the biggest shift.

---

## Real example: spam detection

Suppose you want software that identifies spam emails.

### Traditional programming

You might write rules:

```plain text
if email contains "FREE MONEY" -> spam
if email contains "Lottery" -> spam
if sender is unknown -> spam
```

The problem is that spammers constantly invent new tricks.

Tomorrow they might write:

> Congratulations! You have won.

Your hardcoded program may miss it.

### AI

Instead, feed the AI:

- 1 million spam emails.
- 1 million genuine emails.

The AI studies them. Later someone sends:

> Congratulations! Claim your prize.

Even if it has never seen that exact sentence, it can recognize patterns and predict that it is likely spam.

That is learning instead of explicit rules.

---

## Does AI actually think?

Not really.

AI does not have consciousness, feelings, desires, or understanding in the human sense. It is extremely good at finding patterns and making predictions.

For example, when ChatGPT replies, it is not thinking like a person. At a high level, it predicts:

> Given everything so far, what token is the most likely next token?

We unpack tokens in a separate lesson.

---

## Everyday AI examples

You have probably used AI without realizing it.

- YouTube recommends videos.
- Spotify recommends songs.
- Netflix suggests movies.
- Gmail filters spam.
- Google Maps predicts traffic.
- Phone cameras recognize faces.
- Amazon recommends products.
- ChatGPT answers questions.

Different products, same underlying idea: learn from data to make useful predictions.

---

## AI is a huge umbrella

People often say "AI" as if it is one thing, but it is an umbrella covering many areas.

```plain text
Artificial Intelligence
|
|-- Machine Learning
|   |
|   |-- Deep Learning
|   |   |
|   |   |-- Large Language Models
|   |
|   |-- Recommendation Systems
|
|-- Computer Vision
|-- Robotics
|-- Speech Recognition
|-- Generative AI
```

---

## Backend developer analogy

Think of AI as another service your backend can use.

Without AI:

```plain text
Frontend
  |
  v
Backend
  |
  v
Database
```

With AI:

```plain text
Frontend
  |
  v
Backend
  |
  v
AI Service
  |
  v
Database / APIs / Tools
```

From your perspective as a backend developer, AI is often another component in your architecture. It has unique behavior: probabilistic outputs, token limits, latency, and cost.

---

## Key takeaways

1. AI is software that performs tasks requiring human-like intelligence.
2. Traditional programming follows explicit rules written by humans.
3. AI learns patterns from data instead of relying only on hand-written rules.
4. Modern AI systems are powerful pattern predictors, not conscious beings.
5. ChatGPT is one application built using AI, not AI itself.
