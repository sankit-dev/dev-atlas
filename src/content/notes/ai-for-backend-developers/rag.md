---
title: "RAG"
slug: "rag"
description: "Retrieval augmented generation."
track: "AI for Backend Developers"
---

RAG means Retrieval Augmented Generation. It combines search with a language model.

## The problem RAG solves

Models do not automatically know your private documents, latest policies, internal APIs, or user-specific records.

RAG adds relevant information at request time instead of retraining the model.

## Basic flow

1. Store documents.
2. Split documents into chunks.
3. Create embeddings for chunks.
4. Store embeddings in a vector database.
5. Embed the user's question.
6. Retrieve relevant chunks.
7. Send chunks plus question to the model.
8. Generate an answer grounded in the retrieved context.

## Why RAG is useful

- Uses private knowledge.
- Keeps content updateable.
- Reduces hallucinations.
- Avoids expensive model retraining.
- Can cite sources.

## RAG is not magic

Bad retrieval leads to bad answers.

Common issues:

- Wrong chunks retrieved.
- Missing permissions filters.
- Chunks are too large.
- Chunks are too small.
- Outdated indexed content.
- Prompt does not force grounding.

## Backend responsibilities

The backend owns ingestion, chunking, embedding, retrieval, permission filtering, prompt assembly, response validation, and logging.

## Quick revision

- RAG retrieves relevant context before generation.
- It is useful for private or changing knowledge.
- Retrieval quality controls answer quality.
- Production RAG must handle permissions and freshness.
