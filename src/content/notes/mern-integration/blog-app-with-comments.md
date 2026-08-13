---
title: "Blog App with Comments"
slug: "blog-app-with-comments"
description: "Build posts, comments, authors, and moderation basics."
track: "MERN Integration"
priority: "Must Know"
---

# Blog App with Comments

A blog app teaches relationships and nested UI.

## Features

- create post,
- edit own post,
- list posts,
- view post details,
- add comment,
- delete own comment,
- author profile,
- basic moderation if admin exists.

## Backend routes

```text
GET /api/posts
POST /api/posts
GET /api/posts/:id
PATCH /api/posts/:id
DELETE /api/posts/:id
GET /api/posts/:id/comments
POST /api/posts/:id/comments
DELETE /api/comments/:id
```

## Schema approach

Posts reference author:

```js
authorId: ObjectId
```

Comments reference post and author:

```js
postId: ObjectId
authorId: ObjectId
```

Comments are separate because they can grow and need pagination.

## UI states

Handle:

- loading post,
- no comments,
- validation error,
- unauthorized edit/delete,
- optimistic or normal comment update.

## What this project proves

- relationships,
- ownership,
- pagination,
- nested resource routes,
- role/permission thinking.

