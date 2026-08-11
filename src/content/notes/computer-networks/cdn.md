---
title: "CDN"
slug: "cdn"
description: "Why images load faster, edge servers, and caching."
track: "Computer Networks"
---

A CDN (Content Delivery Network) is a network of geographically distributed edge servers that cache and serve content close to users.

## Why CDN Is Needed

If your origin server is in Mumbai and a user is in London, the data travels far. Distance adds latency.

A CDN stores copies near users.

```text
User in London -> London edge server
User in Delhi  -> Delhi edge server
Origin server  -> Used when cache misses
```

## Cache Hit and Cache Miss

Cache miss:

```text
User -> CDN -> Origin -> CDN stores copy -> User
```

Cache hit:

```text
User -> CDN -> Cached response
```

## What CDNs Cache

- Images.
- CSS.
- JavaScript.
- Fonts.
- Videos.
- PDFs.
- Downloads.
- Sometimes configured API responses.

## Benefits

- Lower latency.
- Faster page loads.
- Reduced origin server load.
- Lower bandwidth from origin.
- Better availability.
- DDoS absorption or filtering in many CDN providers.

## CDN vs Reverse Proxy

| CDN | Reverse Proxy |
| --- | --- |
| Distributed globally | Usually near your backend |
| Optimizes content delivery | Manages backend access |
| Caches close to users | Routes, secures, compresses, terminates TLS |

## Common Providers

- Cloudflare.
- Amazon CloudFront.
- Fastly.
- Akamai.
- Google Cloud CDN.
- Azure CDN.

## Interview Notes

- A CDN serves cached content from edge servers near users.
- It improves latency and reduces origin load.
- First request may be a cache miss; later requests can be cache hits.
- CDNs are especially useful for static assets.
