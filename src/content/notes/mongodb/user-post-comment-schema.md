---
title: "User Post Comment Schema"
slug: "user-post-comment-schema"
description: "Design social-style collections and relationships."
track: "MongoDB"
priority: "Must Know"
---

# User Post Comment Schema

This exercise tests MongoDB relationship design.

## Requirement

Design data for:

- users,
- posts,
- comments.

Users create posts. Users also write comments on posts.

## Collections

```text
users
posts
comments
```

## User document

```json
{
  "_id": "user_1",
  "name": "Asha",
  "email": "asha@example.com"
}
```

## Post document

```json
{
  "_id": "post_1",
  "authorId": "user_1",
  "title": "MongoDB Basics",
  "body": "...",
  "commentCount": 12,
  "createdAt": "2026-08-13T00:00:00.000Z"
}
```

## Comment document

```json
{
  "_id": "comment_1",
  "postId": "post_1",
  "authorId": "user_2",
  "body": "Nice explanation",
  "createdAt": "2026-08-13T00:00:00.000Z"
}
```

## Why comments are separate

Comments can grow without limit.

Keeping all comments embedded inside the post can make the post document huge.

Separate comments allow pagination:

```text
GET /posts/:id/comments?page=1
```

## Indexes

Useful indexes:

```js
db.posts.createIndex({ authorId: 1, createdAt: -1 })
db.comments.createIndex({ postId: 1, createdAt: -1 })
db.users.createIndex({ email: 1 }, { unique: true })
```

## Interview angle

Explain why posts reference users, comments reference posts and users, and comments are separate because they can grow large and need pagination.

