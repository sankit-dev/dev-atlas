---
title: "HTTP"
slug: "http"
description: "Request/response, headers, methods, status codes, cookies, sessions, and keep-alive."
track: "Computer Networks"
---

# HTTP (HyperText Transfer Protocol)

## What is HTTP?

> **HTTP is an application-layer protocol that defines the rules and format for communication between a client and a server over the web.**

HTTP specifies:

- How a client sends a request.
- How a server responds.
- The structure of requests and responses.
- HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`.
- Headers.
- Status codes.
- Message bodies.

HTTP itself does not transfer data over the network. It relies on TCP, or QUIC in HTTP/3, to transport its messages.

---

## Why do we need HTTP?

Imagine if every browser and server used its own message format.

```plain text
Please give me all users.
```

Another server may not understand that format. HTTP solves this by defining a standard language every browser, mobile app, and web server can understand.

```plain text
GET /users HTTP/1.1
Host: api.example.com
```

Any HTTP-compliant server knows how to interpret this request.

---

## Client-server communication

HTTP follows the request-response model.

```plain text
Client
  |
  | HTTP Request
  v
Server
  |
  | HTTP Response
  v
Client
```

The client always initiates communication. The server processes the request and returns a response.

---

## Responsibilities of HTTP

HTTP defines:

- Request format.
- Response format.
- HTTP methods.
- Headers.
- Status codes.
- Message body.
- URL structure.
- Protocol version.

HTTP does not define:

- How packets travel across the network.
- Reliable delivery.
- Encryption.
- API design.

---

## HTTP vs REST

A common misconception is that `GET`, `POST`, status codes, and headers belong to REST. They do not. Those are part of HTTP.

REST is an architectural style that uses HTTP to design APIs.

HTTP provides:

```plain text
GET
POST
PUT
DELETE
Headers
Status Codes
```

REST says: use these HTTP features consistently to build well-designed APIs.

---

## Structure of an HTTP request

An HTTP request has four parts.

```plain text
1. Request Line
2. Headers
3. Empty Line
4. Body (optional)
```

Example:

```plain text
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer xyz

{
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

### Request line

```plain text
GET /users HTTP/1.1
```

This line answers three questions:

- What action should be performed?
- Which resource is being requested?
- Which HTTP version is being used?

### Headers

Headers provide additional information about the request.

```plain text
Authorization: Bearer token
Content-Type: application/json
Accept: application/json
User-Agent: Chrome
```

Think of headers as instructions that accompany the request.

### Body

The body contains the actual data being sent to the server.

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

Not every request has a body.

| Method | Usually has body? |
| --- | --- |
| GET | No |
| DELETE | No |
| POST | Yes |
| PUT | Yes |
| PATCH | Yes |

---

## Structure of an HTTP response

The response also has four parts.

```plain text
1. Status Line
2. Headers
3. Empty Line
4. Body
```

Example:

```plain text
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 101,
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

---

## HTTP methods

HTTP methods tell the server what action the client wants to perform.

| Method | Purpose |
| --- | --- |
| GET | Retrieve data |
| POST | Create new data |
| PUT | Replace existing data |
| PATCH | Update part of existing data |
| DELETE | Remove data |

### GET

`GET` retrieves data.

```plain text
GET /users
GET /users/5
```

A `GET` request should not modify anything. It only reads information.

### POST

`POST` creates a new resource.

```plain text
POST /users
```

The server usually responds with `201 Created`.

### PUT

`PUT` replaces an existing resource completely.

### PATCH

`PATCH` updates only specific fields.

### DELETE

`DELETE` removes a resource.

---

## HTTP status codes

Status codes tell the client what happened after the server processed the request.

| Range | Meaning |
| --- | --- |
| 1xx | Informational |
| 2xx | Success |
| 3xx | Redirection |
| 4xx | Client Error |
| 5xx | Server Error |

Common codes:

| Code | Meaning |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 301 | Permanent redirect |
| 302 | Temporary redirect |
| 400 | Bad request |
| 401 | Authentication required |
| 403 | Permission denied |
| 404 | Resource not found |
| 409 | Conflict |
| 422 | Validation failed |
| 429 | Too many requests |
| 500 | Internal server error |
| 502 | Bad gateway |
| 503 | Service unavailable |
| 504 | Gateway timeout |

### 401 vs 403

- `401 Unauthorized` means authentication is missing or invalid.
- `403 Forbidden` means authentication succeeded, but permission is denied.

### 400 vs 422

- `400 Bad Request` means the request is malformed.
- `422 Unprocessable Entity` means the request format is valid, but the data violates validation or business rules.

---

## HTTP headers

HTTP headers are key-value pairs sent with a request or response. They provide metadata about the message.

```plain text
Content-Type: application/json
Authorization: Bearer xyz
User-Agent: Chrome
```

The body is the actual data. Headers explain how to interpret or process that data.

---

## Statelessness

HTTP is stateless. Each request is treated as a completely new request.

The server does not automatically remember:

- Who you are.
- Whether you logged in.
- What you requested previously.
- Which page you visited.

This is why cookies, sessions, and JWTs exist. They add identity and state on top of HTTP.

---

## Cookies

A cookie is a small piece of data that a server asks the browser to store. The browser stores it and automatically sends it back with future requests to the same website.

```plain text
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax
```

On the next request:

```plain text
Cookie: sessionId=abc123
```

Important cookie attributes:

- `HttpOnly`: JavaScript cannot access the cookie.
- `Secure`: cookie is sent only over HTTPS.
- `SameSite`: controls whether cookies are sent with cross-site requests.
- `Max-Age` or `Expires`: controls how long the cookie lives.

---

## Sessions

A session is data stored on the server that keeps track of a user's state. The browser stores only the session ID, usually inside a cookie.

Browser stores:

```plain text
sessionId=abc123
```

Server stores:

```plain text
abc123 -> { userId: 5, role: "Admin" }
```

The cookie transports the session ID. The session stores the user state.

| Cookie | Session |
| --- | --- |
| Stored in the browser | Stored on the server |
| Contains small data, often a session ID | Contains user state |
| Sent automatically with requests | Looked up by the server |
| Created with `Set-Cookie` | Created by the server application |

---

## Keep-alive

Without keep-alive, every HTTP request could require a new TCP connection.

```plain text
TCP Handshake
HTTP Request
HTTP Response
Close Connection
```

Keep-alive allows the client and server to reuse the same TCP connection for multiple HTTP requests and responses.

Benefits:

- Fewer TCP handshakes.
- Lower network overhead.
- Faster page loading.
- Lower server CPU usage.

HTTP/1.1 uses persistent connections by default. HTTP/2 improves this further with multiplexing.

---

## Quick revision

- HTTP is an application-layer communication protocol.
- It defines how clients and servers exchange messages.
- It uses a request-response model.
- It is stateless.
- It defines methods, headers, status codes, and message structure.
- Cookies, sessions, and JWTs add state or identity on top of HTTP.
- Keep-alive reuses TCP connections for better performance.
