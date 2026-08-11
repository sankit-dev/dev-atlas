---
title: "HTTP"
slug: "http"
description: "Request/response, headers, methods, status codes, cookies, sessions, and keep-alive."
track: "Computer Networks"
---

# HTTP (HyperText Transfer Protocol)
## 1. What is HTTP?
> **HTTP (HyperText Transfer Protocol) is an application-layer protocol that defines the rules and format for communication between a client and a server over the web.**

It specifies:

- How a client sends a request.
- How a server responds.
- The structure of requests and responses.
- HTTP methods (GET, POST, PUT, DELETE, etc.).
- Headers.
- Status codes.
- Message bodies.

HTTP itself **does not transfer data** over the network.

It relies on **TCP** (or **QUIC** in HTTP/3) to transport its messages.
---
## Why do we need HTTP?
Imagine if every browser and every server used their own message format.

Browser A:

```plain text
Please give me all users.
```

Server B:

```plain text
ERROR: Unknown format.
```

Communication would fail.

HTTP solves this by defining a **standard language** that every browser, mobile app, and web server understands.

Example:

```plain text
GET /users HTTP/1.1
Host: api.example.com
```

Any HTTP-compliant server knows how to interpret this request.
---
## Client-Server Communication
HTTP follows the **Request–Response model**.

```plain text
Client (Browser/App)
        │
        │ HTTP Request
        ▼
      Server
        │
        │ HTTP Response
        ▼
Client
```

The client **always initiates** communication.

The server processes the request and returns a response.
---
## Responsibilities of HTTP
HTTP defines:

- Request format
- Response format
- HTTP methods
- Headers
- Status codes
- Message body
- URL structure
- Protocol version

HTTP **does not define**:

- How packets travel across the network (IP)
- Reliable delivery (TCP)
- Encryption (TLS/HTTPS)
- API design (REST)
---
## HTTP vs REST
A common misconception is that GET, POST, status codes, and headers belong to REST.

They do **not**.

Those are part of **HTTP**.

REST is an architectural style that **uses HTTP** to design APIs.

Example:

HTTP provides:

```plain text
GET
POST
PUT
DELETE
Headers
Status Codes
```

REST says:

> Use these HTTP features consistently to build well-designed APIs.
---
## Key Characteristics of HTTP
### Stateless
Each request is independent.

The server does not automatically remember previous requests.

This is why technologies like **Cookies**, **Sessions**, and **JWTs** exist.
---
### Application Layer Protocol
HTTP operates at the **Application Layer**.

It focuses only on communication between applications.

It relies on lower layers (TCP/IP) for transporting data.
---
### Human Readable (HTTP/1.1)
HTTP requests are plain text.

Example:

```plain text
GET /products HTTP/1.1
Host: api.example.com
```

This makes debugging easy.
---
## Where HTTP Fits

```plain text
Application Layer
│
├── HTTP
├── HTTPS
├── DNS
│
Transport Layer
│
└── TCP
│
Internet Layer
│
└── IP
│
Link Layer
│
└── Ethernet / Wi-Fi
```
---
## Summary
- HTTP is an **application-layer communication protocol**.
- It defines **how clients and servers exchange messages**.
- It defines **methods, headers, request/response structure, status codes, and message bodies**.
- It follows a **request–response** model.
- HTTP is **stateless**.
- It relies on **TCP** (or QUIC for HTTP/3) for data transport.
- REST is **not HTTP**—REST is a way of designing APIs using HTTP.
---
# HTTP Request & Response
---
# Imagine you're ordering food
You open Zomato and click **"Order Now."**

What actually happens?

Your app sends a message to Zomato's server.

```plain text
App
   │
   │ "I want to order Pizza."
   ▼
Server
```

The server receives it, processes it, and replies.

```plain text
Server
   │
   │ "Order placed successfully."
   ▼
App
```

This is exactly how HTTP works.

The client asks for something.

The server processes it.

The server replies.

Every HTTP communication is simply:

```plain text
Request
      ↓
Processing
      ↓
Response
```
---
# What is an HTTP Request?
An **HTTP Request** is a message sent by the client to the server asking it to perform some action.

Examples:

- Get all users
- Login
- Upload an image
- Delete a product

The client always starts the conversation.
---
# What is an HTTP Response?
After receiving the request, the server processes it and sends back another message called the **HTTP Response**.

The response tells the client:

- Was the request successful?
- What data should be returned?
- Was there an error?
---
# Complete Flow
Suppose you're building an e-commerce website.

The browser needs all products.

```plain text
Browser
    │
    │ GET /products
    ▼
Server
```

Server searches the database.

```plain text
Database

Laptop
Phone
Mouse
```

Server sends them back.

```plain text
HTTP/1.1 200 OK

[
   {
      "name":"Laptop"
   },
   {
      "name":"Phone"
   }
]
```

Browser displays them on the page.
---
# Structure of an HTTP Request
An HTTP request has **four parts**.

```plain text
1. Request Line

2. Headers

3. Empty Line

4. Body (optional)
```

Let's understand each one.
---
## 1. Request Line
Example:

```plain text
GET /users HTTP/1.1
```

This single line contains three things.

```plain text
GET         → Method

/users      → Resource (URL)

HTTP/1.1    → HTTP Version
```

Think of it as answering three questions:

- What do you want?
- Where?
- Which HTTP version are we using?
---
## 2. Headers
Headers provide **additional information** about the request.

Example:

```plain text
Authorization: Bearer token

Content-Type: application/json

Accept: application/json

User-Agent: Chrome
```

Think of headers as **instructions** that accompany your request.

For example:

> "Here's my authentication token."
> "I'm sending JSON."
> "I can accept JSON in the response."

We'll study each important header later.
---
## 3. Empty Line
You'll notice a blank line after the headers.

```plain text
POST /users HTTP/1.1

Content-Type: application/json

{
   "name":"Rahul"
}
```

That empty line simply tells the server:

> **"Headers are finished. The body starts next."**
---
## 4. Body (Optional)
The body contains the actual data being sent to the server.

Example:

```json
{
   "name":"Rahul",
   "email":"rahul@gmail.com"
}
```

If you're creating a user, the body contains the user's details.

If you're uploading an image, the body contains the image.

If you're logging in, the body contains the username and password.
---
## Does every request have a body?
No.

A request body is **optional**.

Usually:

<table header-row="true">
<tr>
<td>Method</td>
<td>Has Body?</td>
</tr>
<tr>
<td>GET</td>
<td>❌ Usually No</td>
</tr>
<tr>
<td>DELETE</td>
<td>❌ Usually No</td>
</tr>
<tr>
<td>POST</td>
<td>✅ Yes</td>
</tr>
<tr>
<td>PUT</td>
<td>✅ Yes</td>
</tr>
<tr>
<td>PATCH</td>
<td>✅ Yes</td>
</tr>
</table>

A GET request is asking for information, so it generally doesn't need to send data.
---
# Structure of an HTTP Response
The response also has four parts.

```plain text
1. Status Line

2. Headers

3. Empty Line

4. Body
```
---
## 1. Status Line
Example:

```plain text
HTTP/1.1 200 OK
```

It contains:

```plain text
HTTP/1.1

200

OK
```

Meaning:

- HTTP Version
- Status Code
- Status Message
---
## 2. Response Headers
Example:

```plain text
Content-Type: application/json

Content-Length: 128

Set-Cookie: sessionId=abc123
```

These tell the client things like:

- What type of data is being returned.
- How large it is.
- Whether a cookie should be stored.
---
## 3. Empty Line
Just like in the request, this separates the headers from the response body.
---
## 4. Response Body
This is the data the server sends back.

Example:

```json
[
   {
      "id":1,
      "name":"Laptop"
   }
]
```
---
# Complete Example
### Request

```plain text
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer xyz

{
   "name":"Rahul",
   "email":"rahul@gmail.com"
}
```

↓

### Response

```plain text
HTTP/1.1 201 Created
Content-Type: application/json

{
   "id":101,
   "name":"Rahul",
   "email":"rahul@gmail.com"
}
```
---
# Quick Revision
**HTTP Request**

- Sent by the client.
- Contains:
	- Request Line
	- Headers
	- Empty Line
	- Body (optional)

**HTTP Response**

- Sent by the server.
- Contains:
	- Status Line
	- Headers
	- Empty Line
	- Body
---
### 💡 Interview Tip
A common misconception is that the **body** and **payload** are different.

In most backend discussions, they're used interchangeably:

- **Body** = The section of the HTTP message after the headers.
- **Payload** = The actual data inside that body.

For example, in:

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

This JSON is the **payload**, and it is carried in the **request body**.
---
# HTTP Methods
---
# Imagine a Restaurant
You walk into a restaurant.

Depending on what you want, you'll ask the waiter differently.

```plain text
"I want to see the menu."

"I want to place an order."

"I want to change my order."

"I want to cancel my order."
```

Even though you're talking to the same waiter, **your intention is different every time.**

HTTP works exactly the same way.

Whenever a client sends a request, it tells the server **what action it wants to perform.**

That action is called an **HTTP Method**.
---
# Why do we need HTTP Methods?
Imagine if every request looked like this:

```plain text
/request
```

The server wouldn't know what you wanted.

- Read data?
- Create data?
- Update data?
- Delete data?

Instead, HTTP adds a method before the URL.

```plain text
GET /users
```

```plain text
POST /users
```

```plain text
DELETE /users/10
```

Now the server immediately knows what operation is being requested.
---
# The Most Common HTTP Methods
As a backend developer, you'll use these five almost every day.

<table header-row="true">
<tr>
<td>Method</td>
<td>Purpose</td>
</tr>
<tr>
<td>GET</td>
<td>Retrieve data</td>
</tr>
<tr>
<td>POST</td>
<td>Create new data</td>
</tr>
<tr>
<td>PUT</td>
<td>Replace existing data</td>
</tr>
<tr>
<td>PATCH</td>
<td>Update part of existing data</td>
</tr>
<tr>
<td>DELETE</td>
<td>Remove data</td>
</tr>
</table>

Let's understand each one.
---
# 1. GET
A GET request is used to **retrieve data**.

Example:

```plain text
GET /users
```

Meaning:

> "Give me all users."

Another example:

```plain text
GET /users/5
```

Meaning:

> "Give me user with ID 5."

A GET request **should not modify anything**.

It only reads information.

Think of it like reading a book.

Reading doesn't change the book.
---
# 2. POST
POST is used to **create new resources**.

Example:

```plain text
POST /users
```

Body

```json
{
   "name":"Rahul",
   "email":"rahul@gmail.com"
}
```

Meaning:

> "Create a new user using this information."

The server usually responds with

```plain text
201 Created
```
---
# 3. PUT
PUT is used to **replace an existing resource completely**.

Suppose this user exists.

```json
{
   "id":5,
   "name":"Rahul",
   "age":22,
   "city":"Surat"
}
```

Now you send

```plain text
PUT /users/5
```

```json
{
   "name":"Aman",
   "age":25,
   "city":"Mumbai"
}
```

The old resource is completely replaced.

New result:

```json
{
   "id":5,
   "name":"Aman",
   "age":25,
   "city":"Mumbai"
}
```

Think of PUT as replacing an entire document with a new version.
---
# 4. PATCH
PATCH updates **only specific fields**.

Current user

```json
{
   "id":5,
   "name":"Rahul",
```
---
# HTTP Status Codes
---
# Imagine You're Ordering Food
You place an order on Zomato.

After a few seconds, the restaurant replies.

Possible replies could be:

```plain text
✅ Order placed successfully.

❌ Payment failed.

❌ Restaurant not found.

⏳ Please wait...

❌ Restaurant is temporarily closed.
```

Notice something.

The restaurant doesn't just send food.

It first tells you **what happened**.

HTTP does exactly the same thing.

Whenever the server processes a request, it sends back a **status code** to tell the client the result.
---
# Why do we need Status Codes?
Imagine every server always responded like this.

```json
{
    "message": "Something happened"
}
```

The browser wouldn't know:

- Was the request successful?
- Was the user not logged in?
- Was the resource missing?
- Did the server crash?

Status codes solve this problem.

They provide a **standard way** for every client to understand the result.
---
# What is a Status Code?
A status code is a **3-digit number** sent in the HTTP response.

Example

```plain text
HTTP/1.1 200 OK
```

The first line of every HTTP response contains:

```plain text
HTTP Version

Status Code

Status Message
```

Example

```plain text
HTTP/1.1 404 Not Found
```

Means

- HTTP Version → HTTP/1.1
- Status Code → 404
- Status Message → Not Found
---
# Status Code Categories
Instead of memorising every status code, remember the first digit.

<table header-row="true">
<tr>
<td>Range</td>
<td>Meaning</td>
</tr>
<tr>
<td>1xx</td>
<td>Informational</td>
</tr>
<tr>
<td>2xx</td>
<td>Success</td>
</tr>
<tr>
<td>3xx</td>
<td>Redirection</td>
</tr>
<tr>
<td>4xx</td>
<td>Client Error</td>
</tr>
<tr>
<td>5xx</td>
<td>Server Error</td>
</tr>
</table>

Once you know the categories, remembering individual codes becomes much easier.
---
# 1xx — Informational
The request has been received, and processing is continuing.

Example:

```plain text
100 Continue
```

You won't use these often in day-to-day backend development.
---
# 2xx — Success
The request was processed successfully.

These are the most common success responses.
---
## 200 OK
Everything worked.

Example

```plain text
GET /users
```

Response

```plain text
200 OK
```

The requested data is returned.
---
## 201 Created
A new resource was successfully created.

Example

```plain text
POST /users
```

Response

```plain text
201 Created
```

Usually returned after creating a new user.
---
## 204 No Content
The request succeeded, but there's nothing to return.

Example

```plain text
DELETE /users/5
```

Response

```plain text
204 No Content
```

The user was deleted successfully, so no response body is needed.
---
# 3xx — Redirection
The requested resource has moved somewhere else.

The client should make another request to the new location.

Example

```plain text
301 Moved Permanently

302 Found
```

You'll mainly encounter these when dealing with websites, redirects, or load balancers.
---
# 4xx — Client Errors
The server understood the request, but **the problem is on the client's side**.
---
## 400 Bad Request
The request itself is invalid.

Example

```json
{
   "age":"abc"
}
```

The server expected a number but received a string.
---
## 401 Unauthorized
The client has **not authenticated**.

Example

```plain text
Authorization header missing.
```

The user needs to log in.
---
## 403 Forbidden
The client is authenticated, but **doesn't have permission**.

Example

An employee tries to access the admin dashboard.

The server knows who they are but refuses access.
---
## 404 Not Found
The requested resource doesn't exist.

Example

```plain text
GET /users/9999
```

If user 9999 doesn't exist:

```plain text
404 Not Found
```
---
## 409 Conflict
The request conflicts with the current state of the resource.

Example

Trying to create a user with an email that already exists.
---
## 422 Unprocessable Entity
The request format is valid, but the data fails business validation.

Example

```json
{
    "password":"123"
}
```

The JSON is correct, but the password is too weak.
---
## 429 Too Many Requests
The client has exceeded the allowed request limit.

Commonly returned by rate limiters.
---
# 5xx — Server Errors
These indicate that **the problem is on the server**.

The client did nothing wrong.
---
## 500 Internal Server Error
An unexpected error occurred.

Example

Database connection failed.

Null pointer exception.

Unhandled exception.
---
## 502 Bad Gateway
One server received an invalid response from another server.

Common when using reverse proxies like Nginx.
---
## 503 Service Unavailable
The server is temporarily unavailable.

Example

Maintenance.

Server overload.
---
## 504 Gateway Timeout
One server waited too long for another server to respond.

Common in microservice architectures.
---
# Quick Revision

<table header-row="true">
<tr>
<td>Code</td>
<td>Meaning</td>
</tr>
<tr>
<td>200</td>
<td>Success</td>
</tr>
<tr>
<td>201</td>
<td>Resource created</td>
</tr>
<tr>
<td>204</td>
<td>Success, no response body</td>
</tr>
<tr>
<td>301</td>
<td>Permanent redirect</td>
</tr>
<tr>
<td>302</td>
<td>Temporary redirect</td>
</tr>
<tr>
<td>400</td>
<td>Bad request</td>
</tr>
<tr>
<td>401</td>
<td>Authentication required</td>
</tr>
<tr>
<td>403</td>
<td>Permission denied</td>
</tr>
<tr>
<td>404</td>
<td>Resource not found</td>
</tr>
<tr>
<td>409</td>
<td>Conflict</td>
</tr>
<tr>
<td>422</td>
<td>Validation failed</td>
</tr>
<tr>
<td>429</td>
<td>Too many requests</td>
</tr>
<tr>
<td>500</td>
<td>Internal server error</td>
</tr>
<tr>
<td>502</td>
<td>Bad gateway</td>
</tr>
<tr>
<td>503</td>
<td>Service unavailable</td>
</tr>
<tr>
<td>504</td>
<td>Gateway timeout</td>
</tr>
</table>
---
# Interview Notes
### **400 vs 422**
- **400 Bad Request** → The request itself is malformed or syntactically incorrect.
- **422 Unprocessable Entity** → The request is syntactically valid, but the data violates business rules or validation.

Example:

```plain text
400 → Invalid JSON format.

422 → Valid JSON, but email is already taken or password is too short.
```
---
### **401 vs 403**
This is one of the most common interview questions.

Think of it this way:

- **401 Unauthorized** → "Who are you?" (Authentication is missing or invalid.)
- **403 Forbidden** → "I know who you are, but you're not allowed to do this." (Authentication succeeded, but permission is denied.)
---
These status codes are worth memorising because you'll use them constantly when building APIs and discussing backend design.

The next topic is **HTTP Headers**, which ties directly into authentication, content negotiation, cookies, caching, and much more.
---
# HTTP Headers
---
# Imagine You're Sending a Courier
Suppose you want to send a parcel.

The parcel contains a laptop.

But just sending the parcel isn't enough.

You also attach some information outside the box.

```plain text
From: Rahul

To: Aman

Fragile: Yes

Weight: 2kg

Priority: High
```

Notice something.

This information is **not the laptop itself.**

It simply **describes the package** and tells the courier how it should be handled.

HTTP Headers work exactly the same way.
---
# What are HTTP Headers?
HTTP Headers are **key-value pairs** sent along with an HTTP request or response.

They provide **additional information (metadata)** about the message.

Example

```plain text
Content-Type: application/json

Authorization: Bearer xyz

User-Agent: Chrome
```

The actual data might be:

```json
{
   "name":"Rahul"
}
```

The JSON is the **body**.

The headers describe **how to interpret or process** that body.
---
# Why do we need Headers?
Imagine sending this request.

```plain text
POST /users
```

with this body

```plain text
Rahul
```

The server has questions.

- Is this JSON?
- Is it XML?
- Is it plain text?
- Is it compressed?
- Who is making this request?
- Is the user logged in?

Without headers, the server has no context.

Headers solve this by carrying **metadata**.
---
# Where are Headers Located?
Headers sit **between the request/response line and the body**.

Request

```plain text
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer xyz

{
   "name":"Rahul"
}
```

Response

```plain text
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 58

{
   "id":1,
   "name":"Rahul"
}
```
---
# Request Headers vs Response Headers
Headers can travel in **both directions**.

### Request Headers
Sent by the client.

Example:

```plain text
Authorization: Bearer xyz

Content-Type: application/json

Accept: application/json
```

They tell the server about the request.
---
### Response Headers
Sent by the server.

Example:

```plain text
Content-Type: application/json

Set-Cookie: session=abc123

Cache-Control: no-cache
```

They tell the client about the response.
---
# Common HTTP Headers
Let's look at the ones you'll use the most as a backend developer.
---
## 1. Host
Example

```plain text
Host: api.example.com
```

It tells the server **which website or domain** the client wants to access.

This is important because one server can host multiple websites.
---
## 2. Content-Type
Probably the most common header.

Example

```plain text
Content-Type: application/json
```

It tells the receiver:

> **"The body is JSON."**

Other examples:

```plain text
application/json

text/html

text/plain

multipart/form-data

image/png
```

Without this header, the receiver may not know how to interpret the body.
---
## 3. Accept
Example

```plain text
Accept: application/json
```

This tells the server:

> "I would like the response in JSON."

Another example:

```plain text
Accept: text/html
```

Meaning:

> "Please send me HTML."

### Content-Type vs Accept
This is a common interview question.

Think of it this way:

```plain text
Content-Type

"What am I sending?"
```

```plain text
Accept

"What do I want back?"
```

Example:

```plain text
POST /users

Content-Type: application/json

Accept: application/json
```

The client is saying:

- I'm sending JSON.
- I expect JSON in return.
---
## 4. Authorization
Example

```plain text
Authorization: Bearer eyJhbGciOi...
```

This header carries authentication information.

The server uses it to identify the user.

Without it, many protected APIs return:

```plain text
401 Unauthorized
```

You'll see this header constantly when working with JWTs and OAuth.
---
## 5. User-Agent
Example

```plain text
User-Agent: Mozilla/5.0 Chrome/138
```

This identifies the client making the request.

Examples:

- Chrome
- Firefox
- Safari
- Postman
- Mobile App

Servers sometimes use it for analytics, debugging, or serving different content.
---
## 6. Content-Length
Example

```plain text
Content-Length: 348
```

It tells the receiver the **size of the message body in bytes**.
---
## 7. Cookie
Example

```plain text
Cookie: sessionId=abc123
```

The browser sends stored cookies to the server on subsequent requests.

The server uses them to recognize the user.

We'll study cookies in detail later.
---
## 8. Set-Cookie
Example

```plain text
Set-Cookie: sessionId=abc123; HttpOnly
```

This is sent **by the server**.

The browser receives it and stores the cookie.

On future requests, the browser automatically sends it back using the `Cookie` header.
---
## 9. Cache-Control
Example

```plain text
Cache-Control: max-age=3600
```

This tells browsers and proxies how long the response can be cached.

We'll revisit caching in its own chapter.
---
## 10. Origin
Example

```plain text
Origin: https://myapp.com
```

The browser sends this to indicate where the request originated.

It's mainly used when enforcing **CORS (Cross-Origin Resource Sharing)**.
---
## 11. Referer
Example

```plain text
Referer: https://google.com
```

This tells the server which page the user came from.

It's often used for analytics and logging.
---
# Complete Example

```plain text
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer xyz
User-Agent: Chrome

{
   "name":"Rahul"
}
```

What each header means:

<table header-row="true">
<tr>
<td>Header</td>
<td>Meaning</td>
</tr>
<tr>
<td>Host</td>
<td>Which website to contact</td>
</tr>
<tr>
<td>Content-Type</td>
<td>I'm sending JSON</td>
</tr>
<tr>
<td>Accept</td>
<td>I want JSON back</td>
</tr>
<tr>
<td>Authorization</td>
<td>Here's my login token</td>
</tr>
<tr>
<td>User-Agent</td>
<td>I'm using Chrome</td>
</tr>
</table>
---
# Quick Revision

<table header-row="true">
<tr>
<td>Header</td>
<td>Purpose</td>
</tr>
<tr>
<td>Host</td>
<td>Target website/domain</td>
</tr>
<tr>
<td>Content-Type</td>
<td>Format of the body being sent</td>
</tr>
<tr>
<td>Accept</td>
<td>Preferred response format</td>
</tr>
<tr>
<td>Authorization</td>
<td>Authentication information</td>
</tr>
<tr>
<td>User-Agent</td>
<td>Information about the client</td>
</tr>
<tr>
<td>Content-Length</td>
<td>Size of the body</td>
</tr>
<tr>
<td>Cookie</td>
<td>Sends stored cookies</td>
</tr>
<tr>
<td>Set-Cookie</td>
<td>Instructs the browser to store a cookie</td>
</tr>
<tr>
<td>Cache-Control</td>
<td>Caching rules</td>
</tr>
<tr>
<td>Origin</td>
<td>Where the request came from</td>
</tr>
<tr>
<td>Referer</td>
<td>Previous page</td>
</tr>
</table>
---
# Interview Notes
### Are headers mandatory?
No.

Some headers are required or expected in specific situations (for example, `Host` in HTTP/1.1), while many others are optional and depend on what the client and server need to communicate.
---
### Are headers encrypted?
- **HTTP:** No. Headers are sent in plain text.
- **HTTPS:** Yes. Both the headers and the body are encrypted during transit using TLS.
---
### What's the difference between a header and a body?
- **Headers** contain **metadata** about the message—information that helps the receiver understand how to process it.
- **Body** contains the **actual payload** or data being sent.

A simple way to remember it:

> **Headers describe the message. The body carries the message.**
---
> **"If HTTP forgets everything, how does Amazon know I'm still logged in?"**

Let's understand it from first principles.
---
# Statelessness
---
# Imagine You're Talking to a Stranger
Suppose you meet someone on the road.

Conversation 1

```plain text
You: Hi, I'm Rahul.

Stranger: Nice to meet you.
```

Five minutes later you meet the same person again.

```plain text
You: Do you remember me?

Stranger: Sorry, I don't.
```

Every conversation starts from scratch.

The stranger has **no memory** of the previous interaction.

This is exactly how HTTP works.
---
# What does Stateless mean?
A protocol is **stateless** if it **does not automatically remember previous requests.**

Each HTTP request is treated as a completely new request.

The server does **not** automatically remember:

- Who you are
- Whether you logged in
- What you requested previously
- Which page you visited

Every request is independent.
---
# Example
You make this request.

```plain text
GET /profile
```

The server responds.

A few seconds later you make another request.

```plain text
GET /orders
```

Does the server automatically know these two requests came from the same user?

**No.**

Unless the client sends some identifying information (such as a cookie or an authentication token), the server treats the second request as coming from an unknown client.
---
# Why was HTTP designed this way?
At first, it may seem like a bad idea.

Why not let the server remember every user?

Because the web was designed to be:

- Simple
- Fast
- Scalable

Imagine a server with one million users.

If it had to automatically remember every client's state, it would need to store and manage a huge amount of information for every active connection.

By making each request independent, the server can process requests more efficiently and scale to many users.
---
# Advantages of Statelessness
### 1. Easy to Scale
Any server can process any request because no request depends on previous ones.

This is especially useful when using **multiple backend servers** behind a load balancer.
---
### 2. Better Reliability
If one server crashes, another server can handle the next request.

There's no built-in conversation state to lose.
---
### 3. Simpler Design
Each request contains all the information needed to process it.

The server doesn't have to remember what happened earlier.
---
# Disadvantages of Statelessness
The biggest drawback is obvious.

The server forgets everything.

Without additional mechanisms, users would have to log in again for every single request.

Imagine this.

```plain text
GET /profile

→ Login
```

```plain text
GET /orders

→ Login again
```

```plain text
GET /cart

→ Login again
```

That would be a terrible user experience.
---
# So how do websites remember us?
They don't rely on HTTP itself.

Instead, they use mechanisms that **add state** on top of HTTP.

The most common ones are:

- Cookies
- Sessions
- JWT (JSON Web Tokens)

These allow the client to send identifying information with every request.
---
# Example Flow
### First Request

```plain text
Browser
      │
      │ Login
      ▼
Server
```

The server verifies the credentials and sends back a session identifier or token.
---
### Second Request
The browser automatically includes that identifier.

```plain text
GET /profile

Cookie: sessionId=abc123
```

or

```plain text
GET /profile

Authorization: Bearer eyJhbGciOi...
```

Now the server can recognise the user.

Notice something important:

The **server didn't remember the previous request by itself**.

The **client sent information that allowed the server to identify the user again.**
---
# Stateless vs Stateful

<table header-row="true">
<tr>
<td>Stateless</td>
<td>Stateful</td>
</tr>
<tr>
<td>Doesn't automatically remember previous requests</td>
<td>Remembers previous interactions</td>
</tr>
<tr>
<td>Every request is independent</td>
<td>Requests depend on earlier interactions</td>
</tr>
<tr>
<td>Easier to scale</td>
<td>More complex to scale</td>
</tr>
<tr>
<td>HTTP is stateless</td>
<td>A phone call is stateful</td>
</tr>
</table>
---
# Quick Revision
- HTTP is a **stateless protocol**.
- Every request is processed independently.
- The server does **not automatically remember** previous requests.
- Statelessness improves scalability, reliability, and simplicity.
- To maintain user identity across requests, applications use **Cookies**, **Sessions**, or **JWTs**.
---
# Interview Notes
### Is HTTP completely stateless?
Yes.

**The HTTP protocol itself is stateless.**

However, applications built on top of HTTP can maintain state using mechanisms such as cookies, sessions, or JWTs.
---
### Why is statelessness good for load balancing?
Imagine you have three backend servers:

```plain text
           Client
              │
              ▼
        Load Balancer
        /     |      \
       ▼      ▼       ▼
   Server A Server B Server C
```

If every request is independent, the load balancer can send any request to **any server**.

No server needs to remember what another server processed previously.

This makes horizontal scaling much easier.
---
---
# Cookies
---
# The Problem
From the previous topic, we learned:

> **HTTP is stateless.**

That means the server forgets every request once it has responded.

Imagine logging into Amazon.

```plain text
Request 1

POST /login

↓

Login Successful
```

Now you click **My Orders**.

```plain text
Request 2

GET /orders
```

How does the server know this request is coming from **you**?

HTTP itself doesn't remember.

So there has to be another mechanism.

That's where **Cookies** come in.
---
# What is a Cookie?
A **Cookie** is a **small piece of data** that a server asks the browser to store.

The browser stores it and automatically sends it back with future requests to the same website.

Think of it as an **ID card**.
---
# Imagine a Hotel
You check into a hotel.

The receptionist verifies your identity and gives you a room key.

```plain text
Receptionist
      │
      │ Room Key #204
      ▼
You
```

Later you come back.

Instead of showing your passport again, you simply show the room key.

```plain text
You
   │
   │ Room Key #204
   ▼
Receptionist
```

The receptionist immediately knows who you are.

A cookie works exactly like that room key.
---
# How Cookies Work
## Step 1 – User Logs In
You enter:

```plain text
Email

Password
```

The browser sends them to the server.

```plain text
POST /login
```
---
## Step 2 – Server Verifies
The server checks the credentials.

If they're correct, it creates an identifier.

Example:

```plain text
abc123xyz
```

This identifier is **not your password**.

It's simply an ID representing your session.
---
## Step 3 – Server Sends a Cookie
The server responds with a special header.

```plain text
Set-Cookie: sessionId=abc123xyz
```

Notice something.

The server didn't send this in the body.

It sent it in a **response header**.

The browser understands this header automatically.
---
## Step 4 – Browser Stores the Cookie
The browser saves it.

```plain text
sessionId = abc123xyz
```

You don't have to write any code for this behaviour—it is built into web browsers.
---
## Step 5 – Future Requests
Now you request your profile.

```plain text
GET /profile
```

The browser automatically adds:

```plain text
Cookie: sessionId=abc123xyz
```

The server receives it.

```plain text
sessionId

↓

abc123xyz

↓

Rahul
```

Now it knows who made the request.
---
# Complete Flow

```plain text
Browser
   │
   │ Login
   ▼
Server

↓

Set-Cookie: sessionId=abc123
```

Browser stores it.

```plain text
Browser

sessionId = abc123
```

Next request:

```plain text
Browser
   │
   │ Cookie: sessionId=abc123
   ▼
Server
```

Server identifies the user.
---
# Important Point
Many beginners think:

> "The server remembers me."

Not exactly.

The browser remembers the cookie.

The browser sends it with every request.

The server recognises the cookie and then identifies the user.
---
# Where are Cookies Stored?
Usually inside the browser.

For example:

```plain text
Chrome

↓

Website Data

↓

Cookies
```

Every website has its own cookies.

Google cannot read Amazon's cookies.

Amazon cannot read Facebook's cookies.

This isolation is an important browser security feature.
---
# Types of Cookies
You don't need to memorise every type, but know the common ones.

### Session Cookie
Lives only until the browser is closed.

```plain text
Open Browser

↓

Login

↓

Close Browser

↓

Cookie disappears
```
---
### Persistent Cookie
Has an expiry date.

Example:

```plain text
Remember Me
```

You close Chrome today.

Open it tomorrow.

You're still logged in.
---
# Common Cookie Attributes
When the server sends a cookie, it can include attributes that control its behaviour.

Example:

```plain text
Set-Cookie: sessionId=abc123;
HttpOnly;
Secure;
SameSite=Lax;
Max-Age=3600
```

Let's understand the important ones.
---
## HttpOnly

```plain text
HttpOnly
```

JavaScript **cannot access** this cookie.

This protects it from many XSS (Cross-Site Scripting) attacks.

Very commonly used for session cookies.
---
## Secure

```plain text
Secure
```

The cookie is sent **only over HTTPS**.

Never over plain HTTP.
---
## SameSite
Controls whether cookies are sent with cross-site requests.

Common values:

```plain text
Strict

Lax

None
```

We'll study this in more detail when we cover CORS and CSRF.
---
## Max-Age / Expires
Defines how long the cookie should live.

Example:

```plain text
Max-Age=3600
```

The cookie expires after one hour.
---
# Advantages
- Browser automatically sends cookies.
- Great for maintaining login state.
- Small and efficient.
- Supported by every browser.
---
# Limitations
Cookies are **small**.

Typically around **4 KB per cookie**.

They are meant for identifiers and small pieces of data—not entire user profiles or images.

A common pattern is:

```plain text
Cookie

↓

sessionId=abc123
```

The actual user data stays on the server or is encoded in a token, not inside the cookie itself.
---
# Quick Revision
- A cookie is a **small piece of data** stored by the browser.
- The server creates the cookie using the **`Set-Cookie`**** response header**.
- The browser stores it automatically.
- On future requests, the browser sends it back using the **`Cookie`**** request header**.
- Cookies help applications recognise users across multiple HTTP requests.
- Common attributes:
	- `HttpOnly`
	- `Secure`
	- `SameSite`
	- `Max-Age` / `Expires`
---
# Interview Notes
### Do cookies store passwords?
**No.**

A cookie should never store a user's password.

Instead, it usually stores a **session ID** or another identifier that the server can use to recognise the user.
---
### Does the browser automatically send cookies?
**Yes**, provided the cookie matches the request's domain/path and its attributes (such as `Secure` or `SameSite`) allow it to be sent.
---
### Are cookies part of HTTP?
**Yes.**

Cookies are implemented using HTTP headers:

- **`Set-Cookie`** → Response header sent by the server.
- **`Cookie`** → Request header sent by the browser.
---
## Before we move on
One thing to keep in mind:

> **Cookies are just a storage and transport mechanism.**

A cookie **doesn't log you in** by itself.

It simply carries some data (often a session ID or a token) between the browser and the server.

The next topic—**Sessions**—explains **what that ****`sessionId`**** actually points to** and how the server uses it to identify a logged-in user.

That's where the full picture comes together.

Until now, we've been saying:

```plain text
Cookie

↓

sessionId = abc123
```

But the obvious question is...

> **"What is ****`abc123`****? Where does it come from? What does the server do with it?"**

The answer is **Sessions**.
---
# Sessions
---
# The Problem
From the previous topic, we learned that a cookie stores something like:

```plain text
sessionId = abc123
```

But that ID alone is meaningless.

The server needs a way to know:

- Which user owns `abc123`?
- Is the user logged in?
- When should they be logged out?

That's where **Sessions** come in.
---
# What is a Session?
A **Session** is data stored on the **server** that keeps track of a user's state.

The browser **does not store the session**.

It only stores the **Session ID** (usually inside a cookie).

Think of it like a hotel.
---
# Hotel Analogy
You check into a hotel.

The receptionist creates a record.

```plain text
Guest Name : Rahul

Room : 204

Check-in : Today

Checkout : Tomorrow
```

This record stays with the hotel.

Then the receptionist gives you a room key.

```plain text
Room Key

↓

204
```

Notice:

The key **doesn't contain** your information.

It only points to your record.

Exactly the same thing happens with sessions.
---
# How Sessions Work
## Step 1 – User Logs In
The browser sends:

```plain text
POST /login
```

```json
{
   "email":"rahul@gmail.com",
   "password":"******"
}
```
---
## Step 2 – Server Verifies Credentials
The server checks:

```plain text
Email

↓

Password

↓

Database
```

If everything is correct...
---
## Step 3 – Server Creates a Session
The server creates a session object.

Example:

```plain text
Session ID

abc123
```

Stored on the server as:

```plain text
abc123

↓

{
   userId: 5,
   username: "Rahul",
   role: "Admin"
}
```

Notice:

This information stays **on the server**, not in the browser.
---
## Step 4 – Server Sends Session ID
The server sends:

```plain text
Set-Cookie:

sessionId=abc123
```

The browser stores it.
---
## Step 5 – Future Requests
The browser requests:

```plain text
GET /profile
```

Automatically including:

```plain text
Cookie:

sessionId=abc123
```
---
## Step 6 – Server Looks Up the Session
The server receives:

```plain text
abc123
```

Searches its session storage.

```plain text
abc123

↓

Rahul

↓

Authenticated
```

Now the server knows exactly who made the request.
---
# Complete Flow

```plain text
Browser

Login
   │
   ▼
Server

Creates Session

↓

abc123

↓

Stores Session

↓

Returns Cookie

↓

Browser stores sessionId
```

Later:

```plain text
Browser

Cookie: abc123

↓

Server

↓

Find Session

↓

Find User

↓

Return Response
```
---
# Where are Sessions Stored?
Sessions live on the **server**.

Common storage options:

- Server Memory (development or small apps)
- Redis (most common in production)
- Database
- Distributed session stores

The browser never sees the session data itself—only the session ID.
---
# Why not store everything in the Cookie?
Imagine storing this in a cookie:

```json
{
   "userId":5,
   "role":"Admin",
   "password":"..."
}
```

That would be insecure and inefficient.

Instead:

Browser stores:

```plain text
sessionId=abc123
```

Server stores:

```plain text
abc123

↓

Complete User Session
```

This keeps sensitive data on the server.
---
# Advantages of Sessions
### More Secure
Sensitive information stays on the server.
---
### Easy to Invalidate
Want to log out a user?

Delete the session.

Immediately:

```plain text
abc123

↓

Doesn't exist anymore
```

Even if the browser still sends the cookie, the server won't find a matching session.
---
### Good for Traditional Web Applications
Frameworks like Express, Django, Spring Boot and Laravel commonly support session-based authentication.
---
# Disadvantages
### Server Memory
The server must store sessions for every logged-in user.

Thousands or millions of users mean thousands or millions of session records.
---
### Scaling Problems
Imagine this setup:

```plain text
          Load Balancer
           /         \
          ▼           ▼
     Server A     Server B
```

A user logs in.

The session is created on **Server A**.

The next request goes to **Server B**.

```plain text
Browser

↓

sessionId=abc123

↓

Server B

↓

No session found
```

The user appears logged out because Server B doesn't have the session.

Production systems solve this by using **shared session storage**, most commonly Redis, so every server can access the same session data.
---
# Session vs Cookie
This is one of the most common interview questions.

<table header-row="true">
<tr>
<td>Cookie</td>
<td>Session</td>
</tr>
<tr>
<td>Stored in the browser</td>
<td>Stored on the server</td>
</tr>
<tr>
<td>Contains small data (often a session ID)</td>
<td>Contains user state and session information</td>
</tr>
<tr>
<td>Sent automatically with requests</td>
<td>Looked up by the server using the session ID</td>
</tr>
<tr>
<td>Created using the `Set-Cookie` header</td>
<td>Created by the server application</td>
</tr>
</table>

The simplest way to remember it:

> **Cookie = ID card.**

	**Session = User record.**
---
# Quick Revision
- A **session** stores user state on the server.
- The browser stores only the **session ID**, usually in a cookie.
- Every request automatically includes that session ID.
- The server uses it to find the user's session.
- Sessions make it possible to keep users logged in across multiple HTTP requests.
---
# Interview Notes
### Are Cookies and Sessions the same?
**No.**

They solve different problems but are often used together.

- A **cookie** transports the session ID between the browser and the server.
- A **session** stores the user's state on the server.
---
### Can Sessions exist without Cookies?
Yes.

The session ID can also be sent in other ways (such as a URL parameter or a custom header), though **cookies are by far the most common and recommended approach** for web applications.
---
### Can Cookies exist without Sessions?
Yes.

Cookies can store many kinds of small data, for example:

- Language preference
- Theme (dark/light mode)
- Consent preferences
- Shopping cart identifier
- JWT token

They are not limited to session IDs.
---
# Keep-Alive
---
# The Problem
Let's say you open Amazon.

Your browser doesn't make just one request.

It requests:

```plain text
GET /home

GET /logo.png

GET /style.css

GET /script.js

GET /products

GET /reviews
```

One webpage can easily require **50–100 HTTP requests**.

Now imagine if every request had to create a brand new TCP connection.

```plain text
TCP Handshake
↓

HTTP Request
↓

HTTP Response
↓

Close Connection
```

Then repeat...

```plain text
TCP Handshake
↓

HTTP Request
↓

HTTP Response
↓

Close Connection
```

Again...

```plain text
TCP Handshake
↓

HTTP Request
↓

HTTP Response
↓

Close Connection
```

This is expensive.

Remember from the TCP chapter:

- TCP needs a **3-way handshake** to establish a connection.
- Closing it also takes packets (typically a **4-way termination**).

Doing that for every request wastes time and network resources.
---
# What is Keep-Alive?
**Keep-Alive** allows the client and server to **reuse the same TCP connection for multiple HTTP requests and responses** instead of creating a new connection every time.
---
# Without Keep-Alive

```plain text
Browser

TCP Connection #1
↓

GET /home

↓

Close

TCP Connection #2
↓

GET /logo

↓

Close

TCP Connection #3
↓

GET /style.css

↓

Close
```

Three requests.

Three TCP connections.
---
# With Keep-Alive

```plain text
Browser

TCP Connection

↓

GET /home

↓

GET /logo

↓

GET /style.css

↓

GET /products

↓

Close
```

One TCP connection.

Multiple HTTP requests.

Much faster.
---
# Why is it Faster?
Because the expensive part (creating the TCP connection) happens only once.

Benefits:

- Fewer TCP handshakes
- Lower network overhead
- Faster page loading
- Lower server CPU usage
- Better user experience
---
# How does it work?
In HTTP/1.1, connections are **persistent by default**.

The client and server keep the TCP connection open for a short period after a response.

If another request arrives during that time, they reuse the same connection.

If no more requests arrive, the connection is eventually closed.
---
# HTTP/1.0 vs HTTP/1.1
### HTTP/1.0
By default:

```plain text
Request

↓

Response

↓

Connection Closed
```

Every request created a new TCP connection unless `Connection: keep-alive` was explicitly used.
---
### HTTP/1.1
By default:

```plain text
Request

↓

Response

↓

Keep Connection Open

↓

More Requests

↓

Eventually Close
```

Persistent connections became the default behaviour.
---
# Does Keep-Alive mean one connection stays open forever?
No.

Connections stay open only for a limited time.

If no new requests arrive, the client or server closes the connection.

This prevents idle connections from consuming resources indefinitely.
---
# Keep-Alive in HTTP/2
HTTP/2 goes a step further.

Instead of sending one request at a time over a connection, it allows **multiple requests and responses to be in flight simultaneously over the same TCP connection** (called **multiplexing**).

So HTTP/2 is even more efficient than HTTP/1.1's Keep-Alive.

You don't need to know the internals yet—just remember that HTTP/2 improves on the idea of connection reuse.
---
# Quick Revision
- Creating a TCP connection is expensive because of the handshake.
- Without Keep-Alive, every HTTP request would create a new TCP connection.
- Keep-Alive allows multiple HTTP requests to reuse the same TCP connection.
- This reduces latency and improves performance.
- HTTP/1.1 uses persistent connections by default.
- HTTP/2 further improves efficiency with multiplexing.
---
# Interview Notes
### Is Keep-Alive an HTTP feature or a TCP feature?
This is a subtle but common interview question.

- **The TCP connection** is what gets reused.
- **HTTP Keep-Alive** is the mechanism that tells the client and server to **keep that TCP connection open** for additional HTTP requests.

So while the optimisation benefits the TCP connection, the behaviour is controlled by the HTTP protocol.
---
## One thing to remember
Don't confuse **HTTP Keep-Alive** with **TCP Keepalive**.

They sound similar but solve different problems.

- **HTTP Keep-Alive** → Reuses a TCP connection for multiple HTTP requests to improve performance.
- **TCP Keepalive** → Sends periodic probes on an idle TCP connection to check whether the other endpoint is still reachable.

For backend interviews, when someone says **"Keep-Alive"**, they almost always mean **HTTP Keep-Alive** unless they specifically mention TCP.
