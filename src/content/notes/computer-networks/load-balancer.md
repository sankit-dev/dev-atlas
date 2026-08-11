---
title: "Load Balancer"
slug: "load-balancer"
description: "Why load balancers are needed, round robin, least connections, and health checks."
track: "Computer Networks"
---

# Load Balancer
## What is a Load Balancer?
A **Load Balancer** is a component that **distributes incoming requests across multiple servers**.

Instead of all requests going to one server, the load balancer decides **which server should handle each request**.
---
## Why Do We Need a Load Balancer?
Imagine your application has only one server.

```plain text
        Users
          │
          ▼
     App Server
```

If 10 users visit, everything is fine.

But what if 100,000 users visit at the same time?

Problems:

- Server becomes overloaded.
- Response time increases.
- Requests may fail.
- If the server crashes, the entire application goes down.

One server becomes a **single point of failure**.
---
## Solution
Add more servers.

```plain text
App Server 1

App Server 2

App Server 3
```

But now another problem appears.

How does the client know **which server to send the request to?**

This is where the load balancer comes in.

```plain text
           Users
             │
             ▼
      Load Balancer
        /    |    \
       ▼     ▼     ▼
   Server1 Server2 Server3
```

Clients send requests only to the **load balancer**.

The load balancer forwards each request to one of the available servers.
---
# Benefits
### 1. Better Performance
Instead of one server handling everything:

```plain text
1000 requests

↓

1 server
```

The work is shared:

```plain text
1000 requests

↓

Server1 → 333

Server2 → 333

Server3 → 334
```

Each server handles less work.
---
### 2. High Availability
Suppose Server 2 crashes.

Without a load balancer:

```plain text
Client

↓

Server 2

❌ Failed
```

With a load balancer:

```plain text
Server2 ❌

↓

Request automatically goes to

Server1

or

Server3
```

Users may not even notice the failure.
---
### 3. Scalability
Traffic increases?

Just add another server.

```plain text
Before

LB

↓

3 servers
```

Later

```plain text
LB

↓

6 servers
```

The load balancer starts using the new servers automatically.
---
# How Does It Decide Which Server?
The load balancer uses a routing algorithm.

### 1. Round Robin
Requests are distributed one after another.

```plain text
Request 1 → Server1

Request 2 → Server2

Request 3 → Server3

Request 4 → Server1

Request 5 → Server2
```

Simple and commonly used.
---
### 2. Least Connections
The request goes to the server with the fewest active connections.

Example:

```plain text
Server1 → 80 users

Server2 → 25 users

Server3 → 10 users
```

Next request goes to:

```plain text
Server3
```

Useful when requests take different amounts of time.
---
### 3. IP Hash (Session Affinity)
The client's IP address determines the server.

```plain text
User A

↓

Server2
```

Every future request from User A goes to Server2 (unless the configuration changes).

Useful when an application stores session data in memory on a specific server.
---
# Health Checks
A load balancer continuously checks whether servers are healthy.

Example:

```plain text
Server1 ✅

Server2 ❌

Server3 ✅
```

Requests are sent only to healthy servers.

This improves reliability.
---
# Types of Load Balancers
### Layer 4 (Transport Layer)
Makes routing decisions using network information such as IP addresses and TCP/UDP ports.

Fast and efficient because it doesn't inspect the HTTP request.
---
### Layer 7 (Application Layer)
Makes decisions based on HTTP information.

Examples:

```plain text
/api

↓

Backend API
```

```plain text
/images

↓

Image Server
```

```plain text
/admin

↓

Admin Service
```

This enables smarter routing based on URLs, headers, cookies, or hostnames.
---
# Common Load Balancers
Examples you may encounter:

- Nginx
- HAProxy
- AWS Application Load Balancer (ALB)
- AWS Network Load Balancer (NLB)
- Google Cloud Load Balancer
- Azure Load Balancer
---
# Real-World Example
Suppose Amazon receives **1 million requests per minute**.

Without a load balancer:

```plain text
Users

↓

One Server

💥 Crashes
```

With a load balancer:

```plain text
Users

↓

Load Balancer

↓

100 App Servers
```

Each server handles only a small portion of the traffic.
---
