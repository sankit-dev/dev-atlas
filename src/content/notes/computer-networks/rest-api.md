---
title: "REST API"
slug: "rest-api"
description: "REST principles, statelessness, resources, idempotency, and HTTP methods."
track: "Computer Networks"
---

# REST API (Representational State Transfer)
## What is REST?
REST (Representational State Transfer) is a set of design principles used to build web APIs.

It defines **how clients and servers should communicate** over HTTP in a clean and predictable way.

Think of it like this:

- **HTTP = the language**
- **REST = the rules for speaking that language properly**

HTTP gives us methods like GET, POST, PUT, DELETE.

REST tells us **when and how** to use them.
---
## Why REST?
Without REST, every API could behave differently.

Example:

Instead of

```plain text
GET /users/10
```

someone could create

```plain text
POST /fetchUser
```

or

```plain text
GET /get-user-data?id=10
```

Both may work, but every API would look different.

REST provides consistency.
---
## REST Resource
REST treats everything as a **resource**.

Examples:

```plain text
User
Product
Order
Comment
Invoice
```

Each resource has a unique URL.

Example:

```plain text
/users
/users/10
/products
/orders/45
```

Notice these are **nouns**, not actions.
---
## HTTP Methods in REST
REST uses HTTP methods according to their intended purpose.

<table header-row="true">
<tr>
<td>Method</td>
<td>Purpose</td>
<td>Example</td>
</tr>
<tr>
<td>GET</td>
<td>Read data</td>
<td>GET /users/10</td>
</tr>
<tr>
<td>POST</td>
<td>Create new resource</td>
<td>POST /users</td>
</tr>
<tr>
<td>PUT</td>
<td>Replace entire resource</td>
<td>PUT /users/10</td>
</tr>
<tr>
<td>PATCH</td>
<td>Update part of resource</td>
<td>PATCH /users/10</td>
</tr>
<tr>
<td>DELETE</td>
<td>Remove resource</td>
<td>DELETE /users/10</td>
</tr>
</table>
---
## Example
Imagine a Book API.

```plain text
GET /books
```

Returns all books.

```plain text
GET /books/5
```

Returns book with ID 5.

```plain text
POST /books
```

Creates a new book.

```plain text
PUT /books/5
```

Replaces the entire book.

```plain text
PATCH /books/5
```

Updates only specific fields.

```plain text
DELETE /books/5
```

Deletes the book.
---
## REST Principles (High Level)
### 1. Stateless
Each request contains everything needed to process it.

The server should not remember previous requests from the client.

Example:

```plain text
GET /profile
Authorization: Bearer token
```

The token is sent with every request.
---
### 2. Resource-Based URLs
Use nouns instead of verbs.

Good

```plain text
GET /users/15
```

Bad

```plain text
GET /getUser
```
---
### 3. Standard HTTP Methods
Use HTTP methods according to their meaning.

Don't create APIs like

```plain text
POST /deleteUser
```

Instead use

```plain text
DELETE /users/15
```
---
### 4. Standard HTTP Status Codes
REST APIs use HTTP status codes to indicate the result.

Examples:

```plain text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```
---
## REST API Request Flow

```plain text
Client
   │
   │ GET /users/10
   ▼
HTTP Request
   ▼
REST API Server
   ▼
Business Logic
   ▼
Database
   ▼
HTTP Response (JSON)
```
---
# REST vs HTTP

<table header-row="true">
<tr>
<td>HTTP</td>
<td>REST</td>
</tr>
<tr>
<td>A communication protocol</td>
<td>An architectural style</td>
</tr>
<tr>
<td>Defines methods, headers, status codes, message format</td>
<td>Defines how APIs should be designed using HTTP</td>
</tr>
<tr>
<td>Can be used without REST</td>
<td>Usually built on top of HTTP</td>
</tr>
</table>
---
# REST vs API
An **API (Application Programming Interface)** is any interface that allows software to communicate with other software.

A **REST API** is simply an API that follows REST principles.

Examples:

- A REST API uses HTTP and follows REST conventions.
- A GraphQL API is an API, but not a REST API.
- A gRPC service is an API, but not a REST API.

So:

```plain text
API
├── REST API
├── GraphQL API
├── SOAP API
└── gRPC API
```
---
## Interview Summary
- REST (Representational State Transfer) is an architectural style for designing web APIs.
- REST typically uses HTTP as the communication protocol.
- Resources are represented by URLs (e.g., `/users/10`).
- REST uses standard HTTP methods like GET, POST, PUT, PATCH, and DELETE.
- REST is stateless, meaning each request contains all the information needed to process it.
- REST APIs commonly exchange data in JSON format and use standard HTTP status codes.
---
# Idempotency
## What is Idempotency?
An operation is **idempotent** if performing it **multiple times has the same effect as performing it once**.

In other words:

> Sending the same request again does not change the final state after the first successful request.
---
## Example 1 – GET (Idempotent)

```plain text
GET /users/10
```

Call it once:

```plain text
Returns user data
```

Call it 100 times:

```plain text
Returns the same user data
```

The server's data never changes.

✅ Idempotent
---
## Example 2 – DELETE (Idempotent)

```plain text
DELETE /users/10
```

First request:

```plain text
User is deleted.
```

Second request:

```plain text
User is already gone.
```

The response might be `404 Not Found` or `204 No Content`, but the **final state** is still:

```plain text
User does not exist.
```

✅ Still idempotent.
---
## Example 3 – PUT (Idempotent)
Current user:

```json
{
  "name": "John",
  "age": 25
}
```

Request:

```plain text
PUT /users/10
```

```json
{
  "name": "John",
  "age": 30
}
```

First request:

```plain text
Age becomes 30.
```

Second request:

```plain text
Still 30.
```

Nothing changes after the first update.

✅ Idempotent
---
## Example 4 – PATCH (Usually Not Guaranteed)

```plain text
PATCH /users/10
```

If the request is:

```json
{
  "age": 30
}
```

Sending it repeatedly keeps the age at 30.

✅ This particular PATCH is idempotent.

But if the request is:

```json
{
  "incrementViews": 1
}
```

Each request increases the count.

```plain text
10 → 11 → 12 → 13
```

❌ Not idempotent.

So **PATCH can be idempotent or non-idempotent depending on the operation**.
---
## Example 5 – POST (Not Idempotent)

```plain text
POST /orders
```

Request:

```json
{
  "product": "Laptop"
}
```

First request:

```plain text
Creates Order #101
```

Second identical request:

```plain text
Creates Order #102
```

Now two separate orders exist.

❌ Not idempotent.
---
# HTTP Methods and Idempotency

<table header-row="true">
<tr>
<td>HTTP Method</td>
<td>Idempotent?</td>
<td>Reason</td>
</tr>
<tr>
<td>GET</td>
<td>✅ Yes</td>
<td>Only reads data</td>
</tr>
<tr>
<td>POST</td>
<td>❌ No</td>
<td>Usually creates a new resource</td>
</tr>
<tr>
<td>PUT</td>
<td>✅ Yes</td>
<td>Replaces the resource with the same data</td>
</tr>
<tr>
<td>PATCH</td>
<td>⚠️ Depends</td>
<td>Depends on what it does</td>
</tr>
<tr>
<td>DELETE</td>
<td>✅ Yes</td>
<td>After the first delete, the resource remains deleted</td>
</tr>
</table>
---
# Why is Idempotency Important?
Imagine a client sends a request but the network times out before receiving the response.

```plain text
Client
   │
POST /orders
   │
(Network timeout)
```

The client doesn't know whether the server processed the request.

- If the operation is **idempotent**, the client can safely retry.
- If it's **not idempotent**, retrying might create duplicate resources (e.g., duplicate orders or duplicate payments).

For this reason, payment APIs often support **idempotency keys** (a unique identifier sent with the request).

If the same key is received again, the server returns the original result instead of processing the request twice.
---
# Interview Summary
- **Idempotency** means performing the same operation multiple times has the same final effect as performing it once.
- `GET`, `PUT`, and `DELETE` are idempotent.
- `POST` is generally **not** idempotent because it often creates new resources.
- `PATCH` may or may not be idempotent depending on the specific update.
- Idempotency is valuable because it allows clients to safely retry requests after network failures without causing unintended side effects.
