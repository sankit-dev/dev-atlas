---
title: "MERN Architecture"
slug: "mern-architecture"
description: "How React, Express, Node, and MongoDB communicate."
track: "MERN Integration"
priority: "Must Know"
---

# MERN Architecture

MERN architecture explains how the four parts work together.

```text
React UI -> Express API -> Node.js runtime -> MongoDB database
```

Then the response comes back:

```text
MongoDB -> Express API -> React UI
```

## What each part does

| Part | Responsibility |
| --- | --- |
| React | User interface and user interactions |
| Express | API routes, middleware, validation, auth, responses |
| Node.js | Runtime that executes backend JavaScript |
| MongoDB | Stores application data |

## Example flow

User clicks "Create note" in React.

1. React sends `POST /api/notes`.
2. Express receives the request.
3. Middleware checks auth and validates body.
4. Controller calls service.
5. Service writes to MongoDB.
6. Express returns JSON response.
7. React updates the UI.

## Common mistake

Do not put backend secrets or database code inside React.

React runs in the user's browser. Anything bundled into React can be exposed to the user.

## Interview answer

In MERN architecture, React handles the frontend UI, Express exposes API routes, Node.js runs the backend JavaScript, and MongoDB stores data. A typical request starts from React, reaches an Express route, executes backend logic in Node.js, reads or writes MongoDB, then returns a JSON response to update the UI.

