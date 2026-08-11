---
title: "Reverse Proxy"
slug: "reverse-proxy"
description: "Nginx and why backend servers use reverse proxies."
track: "Computer Networks"
---

# 1. What is a Reverse Proxy?
A **Reverse Proxy** is a server that sits **in front of one or more backend servers**.

Clients never communicate with the backend servers directly.

Instead:

```plain text
Client
   │
   ▼
Reverse Proxy
   │
   ▼
Backend Server
```

The client thinks it's talking to the application, but it's actually talking to the reverse proxy first.

The reverse proxy receives the request and forwards it to the appropriate backend server.
---
## Without Reverse Proxy

```plain text
Client

↓

Backend Server
```

Every client directly accesses your application.
---
## With Reverse Proxy

```plain text
          Client
             │
             ▼
      Reverse Proxy
             │
             ▼
      Backend Server
```

The backend server may not even be exposed to the internet.
---
# 2. Why Use a Reverse Proxy?
A reverse proxy does much more than simply forward requests.

## A. Hide Backend Servers
Instead of exposing:

```plain text
203.0.113.10
203.0.113.11
203.0.113.12
```

Clients only know:

```plain text
api.example.com
```

The backend infrastructure remains hidden.
---
## B. SSL/TLS Termination
Imagine HTTPS requests.

Without a reverse proxy:

```plain text
Client

↓

HTTPS

↓

Every backend server
```

Every backend server needs:

- SSL certificates
- TLS handshake
- Encryption/decryption

Instead:

```plain text
Client

↓

HTTPS

↓

Reverse Proxy

↓

HTTP

↓

Backend Server
```

The reverse proxy handles TLS once and forwards the request internally (often over a trusted private network).

This reduces complexity because backend servers don't all need to manage certificates.

> **Note:** In higher-security environments, traffic between the reverse proxy and backend servers may also use HTTPS/TLS.
---
## C. Load Balancing
A reverse proxy can distribute traffic.

```plain text
            Reverse Proxy
           /      |      \
          ▼       ▼       ▼
      Server1 Server2 Server3
```

This is exactly what we learned in the previous topic.
---
## D. Caching
Suppose 10,000 users request:

```plain text
/logo.png
```

Without caching:

```plain text
10,000 requests

↓

Backend Server
```

With a reverse proxy:

```plain text
First request

↓

Backend

↓

Cache
```

Every later request:

```plain text
Reverse Proxy

↓

Cached Response
```

The backend doesn't need to generate or fetch the same response repeatedly.
---
## E. Compression
Large responses can be compressed before being sent.

Example:

```plain text
500 KB JSON

↓

Compression

↓

100 KB
```

This reduces bandwidth and can improve response times.
---
## F. Security
A reverse proxy can:

- Block malicious requests.
- Rate limit excessive traffic.
- Restrict access to certain endpoints.
- Hide internal server details.
---
# 3. What is Nginx?
**Nginx** (pronounced *"Engine-X"*) is a high-performance web server that is also widely used as a:

- Reverse Proxy
- Load Balancer
- HTTP Cache
- Static File Server

One piece of software can perform several of these roles.
---
## Example Architecture

```plain text
             Internet
                 │
                 ▼
             Nginx
          /     |     \
         ▼      ▼      ▼
      Node1  Node2  Node3
```

Nginx receives every request.

It decides where to send it.
---
# 4. Why Backend Servers Use Reverse Proxies
Imagine a Node.js application.

Without Nginx:

```plain text
Internet

↓

Node.js
```

Node.js now has to:

- Handle HTTPS
- Serve images
- Serve CSS
- Serve JavaScript
- Compress responses
- Cache files
- Load balance
- Handle application logic

That's a lot of responsibilities.

Instead:

```plain text
Internet

↓

Nginx

↓

Node.js
```

Now the responsibilities are divided.

**Nginx handles:**

- HTTPS
- Static files
- Compression
- Caching
- Load balancing
- Reverse proxying

**Node.js handles:**

- Business logic
- Database operations
- Authentication
- APIs

Each component focuses on what it does best.
---
# Reverse Proxy vs Load Balancer
Many people think they're the same, but they're not.

<table header-row="true">
<tr>
<td>Reverse Proxy</td>
<td>Load Balancer</td>
</tr>
<tr>
<td>Sits in front of backend servers</td>
<td>Distributes requests across servers</td>
</tr>
<tr>
<td>Can forward to one or many servers</td>
<td>Usually forwards to multiple servers</td>
</tr>
<tr>
<td>May cache, compress, terminate TLS, secure traffic</td>
<td>Primarily focuses on distributing traffic efficiently</td>
</tr>
</table>

A reverse proxy **can also act as a load balancer**, which is why tools like Nginx are so popular.
---
# Real-World Example
When you visit:

```plain text
https://amazon.com
```

You are typically not connecting directly to an application server.

Instead, the request often follows a path like:

```plain text
Browser

↓

Reverse Proxy / Load Balancer

↓

Application Servers

↓

Database
```

The browser only knows `amazon.com`; the internal server architecture is hidden behind the reverse proxy.
---
# Interview Summary
- A **Reverse Proxy** sits between clients and backend servers, forwarding client requests to the appropriate backend.
- Clients communicate with the reverse proxy rather than directly with application servers.
- Reverse proxies can provide **TLS termination, load balancing, caching, compression, security, and request routing**.
- **Nginx** is a popular web server that is commonly used as a reverse proxy and load balancer.
- Using a reverse proxy lets backend applications (such as Node.js services) focus on business logic while infrastructure concerns are handled separately.
---
## Connection with Previous Topics

```plain text
Client
   │
 HTTPS
   │
   ▼
Nginx (Reverse Proxy)
   │
 HTTP/HTTPS
   │
   ▼
Load Balancing
   ├────────► Backend Server 1
   ├────────► Backend Server 2
   └────────► Backend Server 3
```

This ties together everything you've studied so far:

- **HTTP/HTTPS** → How communication happens.
- **REST API** → How APIs are designed.
- **WebSocket** → How real-time communication works.
- **Load Balancer** → How traffic is distributed.
- **Reverse Proxy (Nginx)** → The entry point that can terminate TLS, route requests, cache responses, and optionally load balance traffic before forwarding requests to backend services.
