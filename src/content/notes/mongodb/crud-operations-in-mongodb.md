---
title: "CRUD Operations in MongoDB"
slug: "crud-operations-in-mongodb"
description: "Create, read, update, and delete documents."
track: "MongoDB"
priority: "Must Know"
---

# CRUD Operations in MongoDB

CRUD means:

- Create,
- Read,
- Update,
- Delete.

These are the basic database operations.

## Create

```js
await db.collection('users').insertOne({
  name: 'Asha',
  email: 'asha@example.com',
})
```

Create many:

```js
await db.collection('users').insertMany([
  { name: 'Asha' },
  { name: 'Ravi' },
])
```

## Read

Find one:

```js
await db.collection('users').findOne({ email: 'asha@example.com' })
```

Find many:

```js
await db.collection('users').find({ active: true }).toArray()
```

## Update

```js
await db.collection('users').updateOne(
  { email: 'asha@example.com' },
  { $set: { active: true } },
)
```

Use update operators like `$set`. Do not replace documents accidentally.

## Delete

```js
await db.collection('users').deleteOne({
  email: 'asha@example.com',
})
```

## Interview answer

MongoDB CRUD operations are insert, find, update, and delete. `insertOne` creates documents, `find` and `findOne` read documents, `updateOne` modifies matching documents using update operators like `$set`, and `deleteOne` removes matching documents.

