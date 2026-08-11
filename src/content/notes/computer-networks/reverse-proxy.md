---
title: "Reverse Proxy"
slug: "reverse-proxy"
description: "Nginx and why backend servers use reverse proxies."
track: "Computer Networks"
---

A reverse proxy sits in front of backend servers. Clients talk to the reverse proxy, and the reverse proxy forwards requests to backend services.

## Basic Flow

```text
Client -> Reverse Proxy -> Backend Server
```

The client usually does not know the backend server's real address.

## Why Backend Servers Use Reverse Proxies

Reverse proxies can handle infrastructure concerns before requests reach app code.

Common responsibilities:

- Hide backend servers.
- TLS termination.
- Request routing.
- Load balancing.
- Caching.
- Compression.
- Rate limiting.
- Security filtering.
- Static file serving.

## TLS Termination

The reverse proxy can handle HTTPS from the client and forward traffic internally.

```text
Client --HTTPS--> Nginx --HTTP/HTTPS--> Backend
```

In high-security systems, the internal hop may also use TLS.

## Nginx

Nginx is a common reverse proxy, load balancer, HTTP cache, and static file server.

Example architecture:

```text
Internet -> Nginx -> Node.js app
                 -> API service
                 -> Static files
```

## Reverse Proxy vs Load Balancer

| Reverse Proxy | Load Balancer |
| --- | --- |
| Sits in front of backends | Distributes requests |
| Can forward to one or many servers | Usually targets many servers |
| Handles TLS, cache, compression, security | Focuses on traffic distribution |

A reverse proxy can also act as a load balancer.

## Interview Notes

- A reverse proxy protects and manages backend access.
- It can terminate TLS and route requests.
- It can cache and compress responses.
- Nginx is a popular reverse proxy.
- Backend apps can focus on business logic while the proxy handles edge concerns.
