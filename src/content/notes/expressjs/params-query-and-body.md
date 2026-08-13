---
title: "Params, Query and Body"
slug: "params-query-and-body"
description: "Understand where request input comes from."
track: "Express.js"
priority: "Must Know"
---

# Params, Query and Body

Express request data usually comes from three places:

- params,
- query,
- body.

Knowing the difference avoids messy APIs.

## Params

Params are part of the URL path.

```js
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id })
})
```

Request:

```text
GET /users/123
```

`req.params.id` is `123`.

Use params for identifying a specific resource.

## Query

Query params come after `?`.

```js
app.get('/users', (req, res) => {
  const page = req.query.page
  const search = req.query.search
})
```

Request:

```text
GET /users?page=2&search=asha
```

Use query params for filtering, sorting, pagination, and optional controls.

## Body

Body contains submitted data.

```js
app.use(express.json())

app.post('/users', (req, res) => {
  const { name, email } = req.body
})
```

Use body for creating or updating resource data.

## Simple rule

| Source | Best use |
| --- | --- |
| Params | Which resource? |
| Query | How should results be filtered/sorted/paginated? |
| Body | What data is being created or updated? |

## Common mistake

Do not put sensitive data like passwords in query params.

Query params can appear in browser history, logs, analytics, and server logs.

Use request body for sensitive submitted data over HTTPS.

## Interview answer

Params identify resources in the URL path, query params provide optional controls like filtering or pagination, and body contains submitted data for create or update operations. In Express, these are available as `req.params`, `req.query`, and `req.body`.

