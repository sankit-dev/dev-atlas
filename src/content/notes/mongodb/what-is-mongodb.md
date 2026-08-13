---
title: "What is MongoDB?"
slug: "what-is-mongodb"
description: "What MongoDB is, why document databases exist, and where it fits."
track: "MongoDB"
priority: "Must Know"
---

# What is MongoDB?

MongoDB is a document database.

It stores data in flexible JSON-like documents instead of rows and columns.

## Why MongoDB exists

Many applications work with object-like data.

Example user profile:

```json
{
  "name": "Asha",
  "email": "asha@example.com",
  "skills": ["React", "Node.js"],
  "address": {
    "city": "Pune",
    "country": "India"
  }
}
```

This shape maps naturally to a MongoDB document.

## Where MongoDB fits

MongoDB fits well when:

- data is document-shaped,
- schema changes often,
- reads often need related nested data together,
- app development speed matters,
- horizontal scaling may matter later.

It does not mean SQL is bad. SQL is still excellent for strict relational data and complex joins.

## MongoDB in MERN

In MERN:

- React displays data,
- Express exposes APIs,
- Node.js runs backend code,
- MongoDB stores application documents.

Most MERN apps use MongoDB through the MongoDB driver or Mongoose.

## Interview answer

MongoDB is a NoSQL document database that stores data as flexible JSON-like documents inside collections. It fits well for applications with object-shaped data, changing schemas, and document-style access patterns. In MERN apps, MongoDB is commonly used as the backend database with Node.js and Express.

