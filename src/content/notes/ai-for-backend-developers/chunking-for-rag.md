---
title: "Chunking for RAG"
slug: "chunking-for-rag"
description: "Splitting documents for better retrieval."
track: "AI for Backend Developers"
---

Chunking is the process of splitting documents into smaller pieces for retrieval.

## Why chunking matters

RAG systems retrieve chunks, not usually entire documents. Bad chunks produce weak answers.

If chunks are too large:

- They waste tokens.
- They include irrelevant text.
- Retrieval becomes noisy.

If chunks are too small:

- They miss context.
- The answer may be incomplete.
- Related ideas get separated.

## Common strategies

- Split by headings.
- Split by paragraphs.
- Use fixed token windows.
- Add overlap between chunks.
- Keep tables or code blocks together when possible.

The best strategy depends on the document type.

## Metadata

Each chunk should keep metadata:

- Document ID.
- Title.
- Section heading.
- Source URL or file path.
- Updated time.
- Permissions.

Metadata helps filtering, citations, and debugging.

## Evaluation

Test chunking with real questions. Check whether retrieved chunks contain enough information to answer accurately.

## Quick revision

- Chunking controls what RAG can retrieve.
- Too large is noisy; too small loses context.
- Preserve headings and metadata.
- Evaluate using realistic queries.
