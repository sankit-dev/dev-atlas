---
title: "CDN"
slug: "cdn"
description: "Why images load faster, edge servers, and caching."
track: "Computer Networks"
---

# What is a CDN?
A **Content Delivery Network (CDN)** is a network of geographically distributed servers that stores and serves copies of content closer to users.

Instead of serving every request from your main server, the CDN delivers content from the nearest location.
---
# Why Do We Need a CDN?
Imagine your server is in **Mumbai**.

```plain text
User (Delhi)
        │
        ▼
     Mumbai Server
```

A user from Delhi experiences relatively low latency.

But a user from London has to travel a much longer network path.

```plain text
User (London)
        │
        ▼
     Mumbai Server
```

The greater the distance, the higher the latency.

Now imagine millions of users from different countries requesting the same image.

Your server has to send that image repeatedly, consuming bandwidth and processing resources.
---
# Solution
Place copies of the content around the world.

```plain text
             CDN Network

 Delhi      London      Singapore

   ●            ●             ●

        \      |      /

         Origin Server
          (Mumbai)
```

Now:

- Users in Delhi get content from the Delhi CDN server.
- Users in London get content from the London CDN server.
- Users in Singapore get content from the Singapore CDN server.

The content travels a much shorter distance.
---
# How Does a CDN Work?
Suppose a browser requests:

```plain text
GET /images/logo.png
```

### First Request

```plain text
User

↓

Nearest CDN

↓

Content not found

↓

Origin Server

↓

Returns image

↓

CDN stores a copy

↓

Returns image to user
```

This is called a **Cache Miss**.
---
### Later Requests

```plain text
User

↓

Nearest CDN

↓

Image found

↓

Returned immediately
```

The origin server is not contacted.

This is called a **Cache Hit**.
---
# Cache Hit vs Cache Miss
### Cache Hit
The requested content already exists in the CDN cache.

```plain text
User

↓

CDN

↓

Response
```

Fast.
---
### Cache Miss
The content is not in the CDN cache.

```plain text
User

↓

CDN

↓

Origin Server

↓

CDN stores response

↓

User
```

Slightly slower the first time.
---
# What Can a CDN Cache?
Mostly **static content**, such as:

- Images
- CSS
- JavaScript
- Fonts
- Videos
- PDFs
- Downloads

Some CDNs can also cache dynamic API responses when configured appropriately.
---
# Benefits of a CDN
## 1. Faster Loading
Content comes from a nearby server.

```plain text
Before

User (London)

↓

Mumbai
```

After

```plain text
User (London)

↓

London CDN
```

Lower latency leads to faster page loads.
---
## 2. Reduced Server Load
Without a CDN:

```plain text
1,000,000 image requests

↓

Origin Server
```

With a CDN:

```plain text
999,000

↓

CDN

1,000

↓

Origin Server
```

The origin server handles far fewer requests.
---
## 3. Saves Bandwidth
The same file is not sent repeatedly from the origin server.

Bandwidth usage decreases.
---
## 4. Better Availability
If one CDN edge server has problems, traffic can often be routed to another nearby location.

This improves reliability.
---
## 5. DDoS Protection
Many CDN providers include protection against Distributed Denial of Service (DDoS) attacks.

Instead of malicious traffic reaching your server directly:

```plain text
Attack

↓

CDN

↓

Filtered

↓

Origin Server
```

The CDN absorbs or filters much of the unwanted traffic.
---
# Real-World Example
Suppose YouTube stores a video in one central data centre.

Every viewer worldwide would have to stream it from there.

Instead:

```plain text
User (India)

↓

Indian CDN
```

```plain text
User (Germany)

↓

German CDN
```

```plain text
User (USA)

↓

US CDN
```

Each user streams from a nearby CDN edge server, improving performance.
---
# CDN vs Reverse Proxy
Many people confuse these concepts.

<table header-row="true">
<tr>
<td>CDN</td>
<td>Reverse Proxy</td>
</tr>
<tr>
<td>Distributed across many geographic locations</td>
<td>Usually sits in front of your backend servers</td>
</tr>
<tr>
<td>Mainly optimises content delivery</td>
<td>Mainly routes and manages requests</td>
</tr>
<tr>
<td>Primarily caches content close to users</td>
<td>May cache, but also handles TLS termination, routing, compression, etc.</td>
</tr>
<tr>
<td>Focuses on reducing latency globally</td>
<td>Focuses on protecting and managing backend infrastructure</td>
</tr>
</table>

Think of it this way:

- **Reverse Proxy** → Protects and manages your backend servers.
- **CDN** → Brings content physically closer to users.
---
# CDN + Reverse Proxy + Load Balancer
A common production architecture looks like this:

```plain text
                Users
                   │
                   ▼
              CDN (Cloudflare)
                   │
                   ▼
       Reverse Proxy (Nginx)
                   │
                   ▼
          Load Balancer
          /      |      \
         ▼       ▼       ▼
   Backend1 Backend2 Backend3
                   │
                   ▼
               Database
```

Flow:

1. User requests a page or asset.
2. CDN serves cached content if available.
3. If not cached, the request goes to the reverse proxy.
4. The reverse proxy handles HTTPS, routing, compression, and security.
5. The load balancer distributes the request to a healthy backend server.
6. The backend processes the request and, if needed, accesses the database.
---
# Popular CDN Providers
Some well-known CDN providers include:

- Cloudflare
- Amazon CloudFront
- Google Cloud CDN
- Azure CDN
- Fastly
- Akamai
---
