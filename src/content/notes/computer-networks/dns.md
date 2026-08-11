---
title: "DNS"
slug: "dns"
description: "DNS lookup process, caching, recursive resolvers, and why DNS is needed."
track: "Computer Networks"
---

DNS (Domain Name System) translates human-friendly domain names into IP addresses.

Humans remember `google.com`; computers route packets to IP addresses.

## Why DNS Is Needed

Routers do not route packets using domain names. Before a browser can start a TCP connection to `google.com`, it needs the IP address for that domain.

```text
google.com -> DNS -> 142.250.x.x
```

DNS happens before TCP and HTTP.

## DNS Is Distributed

DNS is not one giant server. It is a distributed hierarchy of servers.

```text
Root
  -> TLD (.com, .org, .in)
    -> Authoritative DNS server
      -> DNS records
```

## DNS Lookup Process

When you type `https://google.com`:

1. Browser checks its DNS cache.
2. Operating system checks its DNS cache.
3. OS asks a recursive DNS resolver.
4. Resolver checks its own cache.
5. Resolver asks a root DNS server.
6. Root points to the `.com` TLD server.
7. TLD points to Google's authoritative DNS server.
8. Authoritative server returns the IP.
9. Resolver, OS, and browser cache the answer.
10. Browser starts the TCP handshake.

## Recursive Resolver

Your computer usually asks a recursive resolver for the final answer. The resolver does the hard work of querying root, TLD, and authoritative servers.

Examples:

- ISP DNS resolver.
- Google DNS `8.8.8.8`.
- Cloudflare DNS `1.1.1.1`.

## DNS Records

| Record | Purpose |
| --- | --- |
| A | Domain to IPv4 address |
| AAAA | Domain to IPv6 address |
| CNAME | Domain alias to another domain |
| MX | Mail server for a domain |
| TXT | Text metadata, verification, SPF, DKIM |
| NS | Authoritative name servers |

## DNS Caching and TTL

DNS answers are cached at the browser, OS, and resolver. Caching reduces lookup latency and load on DNS infrastructure.

TTL (Time To Live) tells caches how long they can keep a DNS record.

```text
api.example.com -> 203.0.113.10
TTL = 300 seconds
```

After 300 seconds, the cached record expires and a new lookup is needed.

## Recursive vs Iterative

Recursive query: client asks a resolver for the final answer.

Iterative query: each DNS server points the requester to the next server.

Typical lookup:

- Browser/OS to resolver: recursive.
- Resolver to root/TLD/authoritative: iterative.

## Interview Notes

- DNS translates domain names to IP addresses.
- DNS resolution happens before TCP and HTTP.
- Root servers do not know website IPs; they know where TLD servers are.
- TLD servers point to authoritative DNS servers.
- Authoritative DNS servers store the actual records.
- TTL controls cache expiry.
