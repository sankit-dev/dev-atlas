---
title: "Query and Update Operators"
slug: "query-and-update-operators"
description: "Use operators like $set, $inc, $in, $gt, and $or."
track: "MongoDB"
priority: "Must Know"
---

# Query and Update Operators

MongoDB operators let you express conditions and updates.

They usually start with `$`.

## Query operators

Greater than:

```js
db.products.find({ price: { $gt: 100 } })
```

In list:

```js
db.products.find({ category: { $in: ['books', 'electronics'] } })
```

Or condition:

```js
db.users.find({
  $or: [{ role: 'admin' }, { verified: true }],
})
```

## Update operators

Set a field:

```js
db.users.updateOne(
  { email: 'asha@example.com' },
  { $set: { active: true } },
)
```

Increment:

```js
db.posts.updateOne(
  { _id: postId },
  { $inc: { views: 1 } },
)
```

Push into array:

```js
db.posts.updateOne(
  { _id: postId },
  { $push: { tags: 'mongodb' } },
)
```

## Common operators

| Operator | Use |
| --- | --- |
| `$set` | set field value |
| `$inc` | increment number |
| `$push` | add to array |
| `$in` | match any value in list |
| `$gt` / `$lt` | greater than / less than |
| `$or` | match any condition |

## Common mistake

Be careful with update without operators.

Depending on API usage, you may replace more of the document than expected.

Use `$set` when updating specific fields.

## Interview answer

MongoDB query operators define matching conditions, such as `$gt`, `$in`, and `$or`. Update operators modify documents, such as `$set`, `$inc`, and `$push`. Operators make queries and updates expressive without manually reading and rewriting whole documents.

