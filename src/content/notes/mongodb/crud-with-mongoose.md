---
title: "CRUD with Mongoose"
slug: "crud-with-mongoose"
description: "Build model-based create, read, update, and delete operations."
track: "MongoDB"
priority: "Must Know"
---

# CRUD with Mongoose

Mongoose models provide methods for common database operations.

## Create

```js
const note = await Note.create({
  title: 'Learn MongoDB',
  body: 'Start with documents',
  userId: req.user.id,
})
```

## Read

Find many:

```js
const notes = await Note.find({ userId: req.user.id })
```

Find one:

```js
const note = await Note.findById(req.params.id)
```

## Update

```js
const note = await Note.findOneAndUpdate(
  { _id: req.params.id, userId: req.user.id },
  { $set: req.body },
  { new: true, runValidators: true },
)
```

`new: true` returns the updated document.

`runValidators: true` applies schema validators during update.

## Delete

```js
await Note.findOneAndDelete({
  _id: req.params.id,
  userId: req.user.id,
})
```

Including `userId` prevents deleting another user's note.

## Interview angle

Explain model methods like `create`, `find`, `findById`, `findOneAndUpdate`, and `findOneAndDelete`. Mention validation, ownership checks, and proper not-found handling.

