---
title: "Vector Databases"
slug: "vector-databases"
description: "Storing and searching vectors for semantic retrieval."
track: "AI for Backend Developers"
---

> **A vector database stores embeddings and efficiently finds vectors with similar meanings.**

An embedding converts text into numbers. A vector database stores those numbers and searches for the closest ones.

## Why do we need a vector database?

A normal database is excellent for exact conditions:

```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

But semantic search asks a different question:

```plain text
Which stored document has a meaning closest to this question?
```

Suppose we have 100,000 document embeddings. Comparing the user's query with every vector one by one would become slow.

A vector database:

- stores embeddings
- indexes them for faster searching
- finds the nearest vectors
- returns the related original content
- supports metadata filters

> A normal query finds an **exact match**. A vector query finds the **nearest meaning**.

## What is stored?

A record commonly contains:

```json
{
  "id": 42,
  "text": "Employees may work remotely during severe weather.",
  "embedding": [0.018, -0.421, 0.735, "..."],
  "metadata": {
    "department": "HR",
    "country": "India"
  }
}
```

<table header-row="true">
<tr>
<td>Field</td>
<td>Purpose</td>
</tr>
<tr>
<td>ID</td>
<td>Uniquely identifies the record</td>
</tr>
<tr>
<td>Original text</td>
<td>Displayed or sent to the LLM later</td>
</tr>
<tr>
<td>Embedding</td>
<td>Used for similarity comparison</td>
</tr>
<tr>
<td>Metadata</td>
<td>Used for filtering and permissions</td>
</tr>
</table>

## How vector search works

### Storing documents

1. Split a document into smaller chunks.
2. Send each chunk to an embedding model.
3. Receive a vector for every chunk.
4. Store the chunk and vector in the database.

### Searching

1. The user asks a question.
2. Convert the question into an embedding.
3. Send that vector to the database.
4. Find the nearest stored vectors.
5. Return their original text.

```mermaid
flowchart LR
    A["User question"] --> B["Embedding model"]
    B --> C["Query vector"]
    C --> D["Vector database"]
    D --> E["Nearest document chunks"]
```

## Clear example

Stored documents:

```plain text
A: Employees may work remotely during severe weather.
B: Passwords must contain at least eight characters.
C: Annual leave requires manager approval.
```

User asks:

```plain text
Can I work from home during a red rain alert?
```

The application creates an embedding for the question. The vector database finds that Document A has the closest vector and returns it.

The search succeeds even though the question and document use different words.

## Vector database vs relational database

<table header-row="true">
<tr>
<td>Relational database</td>
<td>Vector database/search</td>
</tr>
<tr>
<td>Finds exact values and conditions</td>
<td>Finds similar vectors</td>
</tr>
<tr>
<td>Uses rows, columns, and SQL</td>
<td>Uses embeddings and similarity search</td>
</tr>
<tr>
<td>Good for users, orders, and payments</td>
<td>Good for semantic document search</td>
</tr>
<tr>
<td>Example: find order with ID 25</td>
<td>Example: find documents related to a question</td>
</tr>
</table>

You may not need two completely separate databases.

For example, PostgreSQL can support vector search through a vector extension. This lets an application keep normal business data and embeddings in the same database.

A dedicated vector database becomes useful when vector search is a major part of the application or must operate at a larger scale.

## What is a vector index?

A vector index is a special structure that helps the database find nearby vectors quickly.

Without an index:

```plain text
Compare the query with every stored vector.
```

With an index:

```plain text
Search the most promising areas and return nearby vectors faster.
```

Many indexes use **approximate nearest-neighbour search**. This means they trade a small amount of perfect precision for much faster searching.

You only need to remember:

> **A vector index makes similarity search fast when many embeddings are stored.**

## Metadata filtering

Similarity alone is not always enough.

Suppose the user should only access HR policies from India:

```plain text
Find the nearest vectors
WHERE department = "HR"
AND country = "India"
AND user has permission
```

Metadata filtering prevents unrelated or unauthorized records from being returned.

> A vector database does not automatically understand your application's permissions. Your backend must apply access-control filters.

## How it is used in RAG

```plain text
User question
    ↓
Create question embedding
    ↓
Vector database finds relevant chunks
    ↓
Send chunks + question to the LLM
    ↓
LLM generates an answer
```

The responsibilities are different:

- **Embedding model:** converts meaning into a vector
- **Vector database:** stores and searches vectors
- **LLM:** generates the final answer

The vector database does not write the answer.

## Simplified backend example

```javascript
const queryVector = await embeddingModel.embed(
  "Can I work from home during heavy rain?"
);

const matches = await vectorDatabase.search({
  vector: queryVector,
  limit: 5,
  filter: {
    department: "HR",
    country: "India"
  }
});
```

The result may contain the five most similar document chunks and their similarity scores.

The exact API depends on the database being used.

## Important things to remember

- Store the original text with its embedding.
- Use the same embedding model for stored documents and queries.
- The vector dimensions must match what the database index expects.
- Regenerate an embedding when its original text changes.
- Use metadata filters for categories, tenants, and permissions.
- Similarity does not guarantee that a document is correct or relevant.
- Vector search complements normal database queries; it does not replace them.

## Common misunderstanding

### Does a vector database create embeddings?

Usually, the embedding model creates the vectors. The database stores and searches them. Some services may integrate both steps, but they are still separate responsibilities.

### Does it replace PostgreSQL or MongoDB?

No. Users, orders, payments, and application state still fit normal databases.

Use vector search when the application needs to find information by semantic similarity.

### Must I use a dedicated vector database?

No. For many backend projects, adding vector-search support to an existing database can be enough. Choose a dedicated system only when your scale or search requirements justify it.

## Final mental model

> **Embedding = meaning converted into numbers.**
> **Vector database = stores those numbers and finds the closest ones.**
> **LLM = reads the retrieved text and writes the answer.**

## Interview answer

**A vector database is a database designed to store embeddings and perform fast similarity searches. It uses a vector index to find the stored vectors closest to a query vector and returns their associated content. Vector databases are commonly used for semantic search and retrieving relevant documents in RAG systems.**
