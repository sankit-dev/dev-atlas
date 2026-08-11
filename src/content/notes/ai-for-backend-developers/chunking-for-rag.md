---
title: "Chunking for RAG"
slug: "chunking-for-rag"
description: "Splitting documents for better retrieval."
track: "AI for Backend Developers"
---

> **Chunking means splitting a large document into smaller pieces before creating embeddings for RAG.**

Each piece is called a **chunk**.

## Why is chunking needed?

Suppose a 50-page employee handbook contains:

- leave policy
- remote-work policy
- salary policy
- security rules

If the whole handbook becomes one embedding, its meaning is too broad. A question about remote work may retrieve the entire handbook instead of the relevant paragraph.

Chunking creates focused pieces:

```plain text
Large handbook
    ↓
Leave-policy chunk
Remote-work chunk
Salary-policy chunk
Security chunk
```

## Chunk size trade-off

### Chunks that are too large

- contain unrelated topics
- waste context-window space
- make retrieval less focused

### Chunks that are too small

- lose surrounding meaning
- may separate a heading from its explanation
- return incomplete information

The correct size depends on the content. Test it using real user questions rather than memorizing one universal number.

## Example

Original text:

```plain text
Remote Work Policy

Employees may work remotely during severe-weather alerts.
They must inform their manager before the shift begins.

Annual Leave Policy

Annual leave requires manager approval.
```

Good chunks:

```plain text
Chunk 1:
Remote Work Policy
Employees may work remotely during severe-weather alerts.
They must inform their manager before the shift begins.

Chunk 2:
Annual Leave Policy
Annual leave requires manager approval.
```

Do not split a sentence or separate an important rule from its heading.

## Chunk overlap

Sometimes a small amount of text is repeated between neighbouring chunks so that information near a boundary is not lost.

```plain text
Chunk 1: paragraphs 1–3
Chunk 2: paragraphs 3–5
```

Too much overlap creates duplicates, increases storage, and may return the same information repeatedly.

## Useful chunking strategies

- split by headings and sections
- split by paragraphs
- split source code by functions or classes
- use a token limit when sections are too large
- preserve tables or lists that belong together

Structure-aware chunking is usually better than blindly cutting after every fixed number of characters.

## Store metadata with every chunk

```json
{
  "text": "Employees may work remotely...",
  "documentId": 10,
  "section": "Remote Work Policy",
  "page": 8,
  "updatedAt": "2026-08-01"
}
```

Metadata helps with permissions, filtering, source links, and updates.

## How do you know chunking is good?

Test sample questions and check:

- Was the correct chunk retrieved?
- Does the chunk contain enough information to answer?
- Is unrelated content included?
- Are important details split across chunks?

> Good chunking creates pieces that are **small enough to retrieve accurately but large enough to keep their meaning**.
