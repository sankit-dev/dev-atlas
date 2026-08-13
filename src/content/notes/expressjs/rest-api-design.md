---
title: "REST API Design"
slug: "rest-api-design"
description: "Design resource-based APIs using HTTP methods and status codes."
track: "Express.js"
priority: "Must Know"
---

# REST API Design

REST API design is about exposing resources through predictable URLs and HTTP methods.

## Resource-based URLs

Use nouns, not actions.

Good:

```text
GET /users
POST /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

Avoid:

```text
POST /createUser
POST /deleteUser
GET /getAllUsers
```

HTTP method already describes the action.

## Status codes

Common status codes:

| Code | Meaning |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict |
| 500 | Server error |

## Example response shape

Success:

```json
{
  "data": {
    "id": "123",
    "name": "Asha"
  }
}
```

Error:

```json
{
  "error": {
    "message": "User not found"
  }
}
```

## Common mistake

Do not return `200 OK` for every response.

If validation fails, use `400`.

If user is not logged in, use `401`.

If resource does not exist, use `404`.

## Interview answer

REST APIs model data as resources and use HTTP methods to perform actions on them. URLs should be noun-based, methods should express actions, status codes should describe results, and responses should follow a consistent shape.

