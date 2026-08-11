---
title: "Vector Databases"
slug: "vector-databases"
description: "Storing and searching vectors for semantic retrieval."
track: "AI for Backend Developers"
---

A vector database stores embeddings and lets you search by semantic similarity.

## Why normal databases are not enough

Traditional databases are strong at exact matching:

- Find user by ID.
- Filter orders by status.
- Search title with a keyword.

Semantic search needs meaning-based matching. A vector database can answer "which chunks are closest in meaning to this query?"

## What gets stored

A vector record usually contains:

- ID.
- Embedding vector.
- Original text or pointer to text.
- Metadata such as source, tenant, permissions, date, or document type.

Metadata is important because semantic similarity alone is not enough for production filtering.

## Query flow

1. User asks a question.
2. Backend generates an embedding for the question.
3. Vector database finds nearest vectors.
4. Backend fetches matching chunks.
5. Model answers using those chunks.

## Production concerns

- Tenant isolation.
- Permission filtering.
- Re-indexing when documents change.
- Chunk versioning.
- Duplicate content.
- Retrieval quality evaluation.
- Cost and latency.

## When to use one

Use a vector database when keyword search is not enough and you need meaning-based retrieval across many documents.

For small datasets, a simple database with vector extension can be enough.

## Quick revision

- Vector databases store embeddings.
- They search by similarity.
- Metadata filters are critical.
- They are commonly used in RAG systems.
