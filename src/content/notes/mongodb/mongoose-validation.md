---
title: "Mongoose Validation"
slug: "mongoose-validation"
description: "Validate document shape and values before saving."
track: "MongoDB"
priority: "Must Know"
---

# Mongoose Validation

Mongoose validation checks document values before saving them.

It helps keep application data consistent.

## Basic validation

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: 18,
  },
})
```

## Custom validation

```js
const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    validate: {
      validator(value) {
        return value >= 0
      },
      message: 'Price cannot be negative',
    },
  },
})
```

## Validation is not enough

Mongoose validation runs in the application.

It does not replace:

- database indexes,
- authorization,
- request validation,
- business rules,
- unique constraint handling.

## Common mistake

Do not rely only on Mongoose validation for API input.

Validate request input before it reaches the database layer too.

## Interview answer

Mongoose validation enforces rules on documents before saving, such as required fields, min/max values, enum values, and custom validators. It helps maintain data consistency, but it should be used along with request validation, indexes, and proper business logic.

