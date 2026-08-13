---
title: "MongoDB & Document Databases"
slug: "mongodb-and-document-databases"
description: "How document databases store JSON-like data and when MongoDB fits."
track: "Databases & SQL"
---

# MongoDB & Document Databases

# What problem is this solving?

Some application data is naturally object-shaped.

If one screen usually needs the full object, splitting the data into many relational tables can make reads more awkward.

Document databases solve this by storing related nested data together.

---

# Simple definition

A document database stores data as JSON-like documents.

Popular examples:

- MongoDB
- CouchDB
- Firebase Firestore

MongoDB is the most common example discussed in interviews.

---

# Better explanation

In SQL, you usually think like this:

```plain text
Database → Tables → Rows
```

In MongoDB, you think like this:

```plain text
Database → Collections → Documents
```

Example:

```plain text
Database   : ecommerce
Collection : users
Document   : one user object
```

---

# Real example

```json
{
  "_id": "u_101",
  "name": "Riya",
  "email": "riya@example.com",
  "cart": [
    {
      "productId": "p_1",
      "quantity": 2
    },
    {
      "productId": "p_2",
      "quantity": 1
    }
  ],
  "preferences": {
    "theme": "dark",
    "language": "en"
  }
}
```

This works well when the application usually reads the user profile, cart, and preferences together.

---

# When this fits well

Use a document database when:

- data is object-shaped
- nested fields are natural
- schema changes often
- one screen/API often needs the full object
- denormalized reads are acceptable

Good examples:

- user profiles
- product catalogs
- CMS articles
- app configuration
- event metadata

---

# Product catalog example

Different products can have different attributes.

Laptop:

```json
{
  "type": "laptop",
  "ram": "16GB",
  "storage": "512GB SSD",
  "processor": "M3"
}
```

Shirt:

```json
{
  "type": "shirt",
  "size": "M",
  "color": "black",
  "material": "cotton"
}
```

Forcing every product type into one SQL table can become awkward.

MongoDB can fit better here.

---

# Common mistake

MongoDB is not always the right choice.

Avoid using it as the default when:

- strong relational joins are central
- transactions across many entities are critical
- reporting and ad hoc SQL queries matter a lot
- your schema is stable and relational

Example:

Banking transactions are usually a better fit for SQL.

---

# Interview Answer

If an interviewer asks:

> **When would you use MongoDB?**

You can answer:

I would use MongoDB when the data is naturally document-shaped, nested, and often read together, such as user profiles, product catalogs, CMS content, or flexible metadata. MongoDB stores JSON-like documents in collections, so it fits cases where schema flexibility and object-shaped reads are useful. I would avoid it as the default for strongly relational transaction-heavy systems like banking or payments.
