---
title: "Embeddings"
slug: "embeddings"
description: "Representing meaning as vectors."
track: "AI for Backend Developers"
---

Embeddings represent text, images, or other data as vectors of numbers. Similar meanings should produce vectors that are close to each other.

## Why embeddings exist

Computers do not understand meaning directly. Embeddings convert meaning into numeric form so software can compare similarity.

Example:

- "reset password"
- "forgot my login"
- "cannot access account"

These phrases use different words, but they are semantically related. Embeddings help search systems find that relationship.

## How they are used

Common backend use cases:

- Semantic search.
- RAG document retrieval.
- Duplicate detection.
- Recommendation systems.
- Clustering support tickets.
- Finding related knowledge base articles.

## Vector similarity

After generating embeddings, compare vectors using similarity metrics.

Common metrics:

- Cosine similarity.
- Dot product.
- Euclidean distance.

The database returns items whose vectors are closest to the query vector.

## Embeddings are not answers

Embeddings help find relevant content. They do not generate final responses by themselves. In RAG, embeddings retrieve context, then a language model writes the answer.

## Quick revision

- Embeddings convert meaning into vectors.
- Similar content should have nearby vectors.
- They power semantic search and RAG.
- They retrieve context; they do not replace the model response.
