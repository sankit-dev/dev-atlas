---
title: "Mongoose Schema and Model"
slug: "mongoose-schema-and-model"
description: "Define application-level models for MongoDB documents."
track: "MongoDB"
priority: "Must Know"
---

# Mongoose Schema and Model

Mongoose is an ODM for MongoDB in Node.js.

ODM means Object Document Mapper.

It helps define document structure and interact with MongoDB using models.

## Schema

A schema defines the shape of documents.

```js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
)
```

## Model

A model gives you methods to query and write documents.

```js
const User = mongoose.model('User', userSchema)

await User.create({
  name: 'Asha',
  email: 'asha@example.com',
})
```

## Why Mongoose is useful

Mongoose provides:

- schemas,
- validation,
- models,
- middleware/hooks,
- population,
- query helpers,
- timestamps.

## Common mistake

`unique: true` is not normal validation. It creates a unique index.

You still need to handle duplicate key errors properly.

## Interview answer

Mongoose is an ODM that provides schemas and models for MongoDB in Node.js. A schema defines document structure, validation, and options. A model is created from a schema and is used to create, query, update, and delete documents.

