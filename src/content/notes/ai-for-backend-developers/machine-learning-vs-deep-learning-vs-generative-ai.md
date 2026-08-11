---
title: "Machine Learning vs Deep Learning vs Generative AI"
slug: "machine-learning-vs-deep-learning-vs-generative-ai"
description: "How common AI terms relate to each other."
track: "AI for Backend Developers"
---

Think of it like this:

```plain text
                 Artificial Intelligence
                         |
          ---------------------------------
          |                               |
   Rule-Based AI                 Machine Learning
                                          |
                              ---------------------
                              |                   |
                       Traditional ML       Deep Learning
                                                  |
                                           ----------------
                                           |
                                     Generative AI
```

---

# 1. Artificial Intelligence (AI)

AI is the biggest umbrella.

Definition:

> Any system that allows machines to perform tasks that normally require human intelligence.

Examples:

- Chess-playing computer
- Voice assistant
- Face recognition
- Self-driving cars
- Chatbots

AI does not necessarily mean the machine learned.

---

## Example: Old Chess Computer

A chess engine can have millions of rules:

```plain text
If opponent moves here:
    respond with this

If this position happens:
    play this move
```

Even though the rules are hardcoded, it is still considered AI because it performs a task that normally requires human thinking.

But it may not learn anything.

**AI does not require learning.**

It only requires the system to act intelligently.

Learning, or ML, is one way to achieve that. It is not a requirement.

That old chess engine is a good example of **rule-based AI**: smart behavior, but hand-coded, not learned.

---

# 2. Machine Learning (ML)

Machine Learning is a subset of AI.

The idea:

> Instead of programming rules manually, let the machine learn rules from data.

Traditional programming:

```plain text
Input + Rules
      |
      ↓
   Output
```

Example:

```plain text
Age > 18
Salary > 50000
Credit score > 700

      ↓

Loan Approved
```

Human writes rules.

---

Machine Learning:

```plain text
Input + Output Examples
          |
          ↓
     ML Algorithm
          |
          ↓
     Learns Rules
```

Example:

Give it:

```plain text
Person A:
Age: 25
Salary: 80000
Credit Score: 750
Loan: Approved

Person B:
Age: 20
Salary: 20000
Credit Score: 400
Loan: Rejected
```

The algorithm discovers patterns.

---

# Real World ML Examples

## Netflix Recommendation

Netflix does not have a developer writing:

```plain text
If user likes Avengers:
    recommend Iron Man

If user likes Comedy:
    recommend Friends
```

Instead:

Millions of users watch millions of movies.

ML finds patterns:

```plain text
People who watched X
also watched Y
```

---

## Spam Detection

Input:

```plain text
Email text
Sender
Links
Attachments
```

Output:

```plain text
Spam / Not Spam
```

ML learns the relationship.

---

# 3. Deep Learning (DL)

Deep Learning is a special type of Machine Learning.

The difference:

Traditional ML:

Humans often choose important features.

Example:

For house price prediction, a human tells the model:

```plain text
Number of rooms
Location
Area
Age
```

Then ML learns.

---

Deep Learning:

The model learns features by itself using raw data.

Example:

Image recognition.

Traditional ML:

Human says:

```plain text
Look at:
- edges
- colors
- shapes
```

Deep Learning:

Give it:

```plain text
10 million images
```

It automatically learns:

```plain text
Pixels
 ↓
Edges
 ↓
Shapes
 ↓
Objects
```

---

# Neural Networks

Deep Learning uses something called:

## Artificial Neural Networks

Inspired loosely by the human brain.

Human brain:

```plain text
Neuron
Neuron
Neuron
```

Computer:

```plain text
Artificial Neuron
Artificial Neuron
Artificial Neuron
```

Connected together:

```plain text
Input Layer

     ↓

Hidden Layers

     ↓

Output Layer
```

Many layers = **Deep** learning.

---

Example:

Image:

```plain text
Cat image
```

Deep Learning network:

```plain text
Pixels

 ↓

Lines

 ↓

Eyes

 ↓

Ears

 ↓

Cat
```

---

# 4. Generative AI

Now we reach today's boom.

Generative AI means:

> AI that can create new content.

Examples:

Text:

- ChatGPT
- Claude
- Gemini

Images:

- DALL-E
- Midjourney

Music:

- AI music generators

Code:

- GitHub Copilot

---

Traditional AI:

Question:

```plain text
Is this email spam?
```

Output:

```plain text
Yes
```

It classifies.

---

Generative AI:

Question:

```plain text
Write an email to my manager
```

Output:

```plain text
Creates new text
```

It generates.

---

# Where do LLMs Fit?

LLM = Large Language Model

LLMs are:

```plain text
AI
 |
Machine Learning
 |
Deep Learning
 |
Generative AI
 |
Large Language Models
```

Examples:

- GPT
- Gemini
- Claude
- Llama

They specialize in language.

---

# Simple Comparison Table

<table header-row="true">
<tr>
<td>Technology</td>
<td>Purpose</td>
<td>Example</td>
</tr>
<tr>
<td>AI</td>
<td>Make machines intelligent</td>
<td>Chess AI</td>
</tr>
<tr>
<td>ML</td>
<td>Learn patterns from data</td>
<td>Spam detection</td>
</tr>
<tr>
<td>Deep Learning</td>
<td>Learn complex patterns</td>
<td>Face recognition</td>
</tr>
<tr>
<td>Generative AI</td>
<td>Create new content</td>
<td>ChatGPT</td>
</tr>
<tr>
<td>LLM</td>
<td>Generate and understand language</td>
<td>GPT</td>
</tr>
</table>
