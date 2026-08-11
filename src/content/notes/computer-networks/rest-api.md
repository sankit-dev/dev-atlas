---
title: "REST API"
slug: "rest-api"
description: "REST principles, statelessness, resources, idempotency, and HTTP methods."
track: "Computer Networks"
---

REST is an architectural style for designing web APIs. HTTP gives us methods and status codes; REST gives us conventions for using them cleanly.

## Resources

REST treats application concepts as resources.

```text
/users
/users/10
/products
/orders/45
```

Use nouns for resources, not action names.

Good:

```text
GET /users/10
DELETE /users/10
```

Avoid:

```text
GET /getUser
POST /deleteUser
```

## HTTP Methods

| Method | Purpose | Example |
| --- | --- | --- |
| GET | Read | `GET /users/10` |
| POST | Create | `POST /users` |
| PUT | Replace | `PUT /users/10` |
| PATCH | Partially update | `PATCH /users/10` |
| DELETE | Remove | `DELETE /users/10` |

## Statelessness

REST APIs should be stateless. Each request must contain enough information for the server to process it.

```text
GET /profile
Authorization: Bearer <token>
```

The server should not depend on remembering a previous request from the same client.

## Status Codes

Common REST responses:

- `200 OK`
- `201 Created`
- `204 No Content`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `500 Internal Server Error`

## Idempotency

An operation is idempotent if repeating it has the same final effect as doing it once.

| Method | Idempotent? | Reason |
| --- | --- | --- |
| GET | Yes | Reads only |
| POST | Usually no | Often creates a new resource |
| PUT | Yes | Replaces with the same representation |
| PATCH | Depends | Depends on operation |
| DELETE | Yes | Resource remains deleted |

Idempotency matters because clients often retry after network failures.

## REST vs HTTP

HTTP is the protocol. REST is a design style that commonly uses HTTP.

## Interview Notes

- REST APIs expose resources through URLs.
- REST uses standard HTTP methods.
- REST is stateless.
- JSON is common, but REST does not require JSON.
- Idempotency helps clients safely retry requests.
