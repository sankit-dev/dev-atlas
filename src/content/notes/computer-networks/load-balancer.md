---
title: "Load Balancer"
slug: "load-balancer"
description: "Why load balancers are needed, round robin, least connections, and health checks."
track: "Computer Networks"
---

A load balancer distributes incoming requests across multiple backend servers.

## Why Load Balancers Are Needed

One server can become overloaded or fail.

```text
Users -> One App Server
```

With multiple servers, another problem appears: which server should receive each request?

```text
Users -> Load Balancer -> Server 1
                       -> Server 2
                       -> Server 3
```

## Benefits

- Better performance by sharing work.
- High availability when one server fails.
- Easier scaling by adding more servers.
- Centralized health checks.

## Algorithms

### Round Robin

Requests are sent one after another.

```text
Request 1 -> Server 1
Request 2 -> Server 2
Request 3 -> Server 3
Request 4 -> Server 1
```

### Least Connections

The request goes to the server with the fewest active connections. This is useful when requests have different durations.

### IP Hash

The client IP determines the backend server. This can support session affinity when sessions are stored in server memory.

## Health Checks

The load balancer checks whether each backend is healthy.

```text
Server 1: healthy
Server 2: unhealthy
Server 3: healthy
```

Traffic is sent only to healthy servers.

## Layer 4 vs Layer 7

Layer 4 load balancers route using IPs and TCP/UDP ports.

Layer 7 load balancers inspect HTTP data like paths, headers, cookies, and hostnames.

## Interview Notes

- A load balancer distributes traffic across servers.
- It improves availability and scalability.
- Round robin is simple rotation.
- Least connections chooses the least busy server.
- Health checks prevent sending traffic to failed instances.
