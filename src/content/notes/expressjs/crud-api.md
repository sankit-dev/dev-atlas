---
title: "CRUD API"
slug: "crud-api"
description: "Build create, read, update, and delete routes."
track: "Express.js"
priority: "Must Know"
---

# CRUD API

CRUD means:

- Create,
- Read,
- Update,
- Delete.

Most backend APIs start here.

## Example resource

Use `notes` as a resource.

Routes:

```text
POST /notes
GET /notes
GET /notes/:id
PATCH /notes/:id
DELETE /notes/:id
```

## Basic route shape

```js
app.post('/notes', createNote)
app.get('/notes', getNotes)
app.get('/notes/:id', getNoteById)
app.patch('/notes/:id', updateNote)
app.delete('/notes/:id', deleteNote)
```

## Requirements

Your CRUD API should handle:

- validation,
- not found responses,
- proper status codes,
- consistent response shape,
- async errors,
- database operations.

## Status codes

| Action | Status |
| --- | --- |
| Create success | 201 |
| Read success | 200 |
| Update success | 200 |
| Delete success | 204 or 200 |
| Invalid input | 400 |
| Missing resource | 404 |

## Interview angle

Explain the resource, routes, methods, validation, status codes, and how errors are handled.

