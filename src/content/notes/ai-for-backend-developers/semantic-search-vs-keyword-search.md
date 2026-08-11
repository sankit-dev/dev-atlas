---
title: "Semantic Search vs Keyword Search"
slug: "semantic-search-vs-keyword-search"
description: "Meaning-based search compared with exact matching."
track: "AI for Backend Developers"
---

> **Keyword search finds matching words. Semantic search finds matching meanings.**

## Clear example

Stored document:

```plain text
Employees may work remotely during severe weather.
```

User search:

```plain text
Can I work from home during heavy rain?
```

Keyword search may struggle because the exact words are different.

Semantic search uses embeddings and can understand that:

- work from home is related to remote work
- heavy rain is related to severe weather

## Comparison

<table header-row="true">
<tr>
<td>Keyword search</td>
<td>Semantic search</td>
</tr>
<tr>
<td>Matches words and phrases</td>
<td>Matches meaning</td>
</tr>
<tr>
<td>Good for exact IDs and names</td>
<td>Good for natural-language questions</td>
</tr>
<tr>
<td>Fast and easy to explain</td>
<td>Understands synonyms and related concepts</td>
</tr>
<tr>
<td>May miss different wording</td>
<td>May retrieve conceptually related but incorrect results</td>
</tr>
</table>

## When keyword search is better

Use keyword search for:

- order ID: `ORD-1042`
- exact error code: `ECONNREFUSED`
- email address
- product name
- quoted phrase
- filters such as status or date

Embeddings may treat similar IDs as related even though only one exact ID is correct.

## When semantic search is better

Use semantic search for:

- questions written in natural language
- support articles
- policies and documentation
- synonyms
- recommendations
- similar tickets or documents

## Hybrid search

Production systems often combine both:

```plain text
Final results =
keyword matches + semantic matches + metadata filters
```

Example query:

```plain text
Find documents related to "payment failed"
AND product = "mobile app"
AND version = "4.2"
```

- Semantic search understands "payment failed."
- Keyword or metadata filters precisely match product and version.

## Reranking

A search system may retrieve several possible results and then use another scoring step to reorder them.

```plain text
Retrieve candidates → rerank by relevance → send best chunks to LLM
```

You only need reranking when basic retrieval quality is not good enough.

## Common mistakes

- using embeddings for exact identifiers
- using only keywords for natural questions
- returning too many loosely related chunks
- ignoring metadata and permissions
- assuming a high similarity score guarantees correctness

> Use **keyword search for exactness**, **semantic search for meaning**, and **hybrid search when you need both**.
