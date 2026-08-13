---
title: "Population in Mongoose"
slug: "population-in-mongoose"
description: "Replace referenced ids with related documents."
track: "MongoDB"
priority: "Must Know"
---

# Population in Mongoose

Population replaces referenced document ids with actual documents.

## Example schemas

Post references a user:

```js
const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})
```

Query with populate:

```js
const posts = await Post.find().populate('author')
```

Without populate:

```json
{
  "title": "MongoDB Basics",
  "author": "65a123..."
}
```

With populate:

```json
{
  "title": "MongoDB Basics",
  "author": {
    "_id": "65a123...",
    "name": "Asha"
  }
}
```

## When to use populate

Use populate when referenced data is needed in the response.

Avoid overusing it for large lists or deep nested relations because it can hurt performance.

## Common mistake

Do not use populate as a replacement for data modeling.

If data is always needed together and small, embedding may be simpler.

## Interview answer

Mongoose population replaces referenced ObjectIds with documents from another collection. It is useful for relationships like post-author, but overusing populate can hurt performance. The choice between populate and embedding depends on access patterns.

