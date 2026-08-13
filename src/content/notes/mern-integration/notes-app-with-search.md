---
title: "Notes App with Search"
slug: "notes-app-with-search"
description: "Build notes, search, pagination, and ownership."
track: "MERN Integration"
priority: "Must Know"
---

# Notes App with Search

A notes app is useful for practicing search, pagination, and private data.

## Features

- auth,
- create note,
- edit note,
- delete note,
- search notes,
- filter by tag,
- paginate results,
- sort by updated date.

## API example

```text
GET /api/notes?search=mongodb&tag=backend&page=1&limit=20&sort=-updatedAt
```

## MongoDB query idea

```js
const filter = {
  userId: req.user.id,
}

if (search) {
  filter.title = { $regex: search, $options: 'i' }
}

if (tag) {
  filter.tags = tag
}
```

## Important backend rules

- all note queries must include `userId`,
- limit must have a max value,
- sort fields should be whitelisted,
- search should be indexed or improved later if data grows.

## What this project proves

- authenticated CRUD,
- search API,
- pagination,
- filters,
- React list states,
- ownership security.

