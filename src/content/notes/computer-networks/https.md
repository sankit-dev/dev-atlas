---
title: "HTTPS"
slug: "https"
description: "SSL/TLS, certificates, encryption, and HTTPS request flow."
track: "Computer Networks"
---

HTTPS is HTTP protected by TLS. HTTP defines the request and response format; TLS protects that communication with encryption, integrity, and authentication.

## Why HTTPS Exists

Plain HTTP sends data in readable text. A login request could expose usernames, passwords, cookies, and private data to anyone who can intercept the traffic.

HTTP has three big problems:

| Problem | Risk |
| --- | --- |
| No confidentiality | Attackers can read data |
| No integrity | Attackers can modify data |
| No authentication | Attackers can impersonate the server |

HTTPS solves these problems by using TLS.

## HTTPS = HTTP + TLS

TLS gives HTTPS three guarantees:

- Confidentiality: data is encrypted.
- Integrity: changes are detected.
- Authentication: certificates help verify the real server.

## Where TLS Fits

```text
HTTP
TLS
TCP
IP
```

HTTP creates the message. TLS encrypts and verifies it. TCP transports it reliably.

## TLS Handshake

Before HTTP data is sent, the browser and server perform a TLS handshake.

High-level flow:

1. Client Hello: browser lists supported TLS versions and cipher suites.
2. Server Hello: server chooses TLS parameters and sends its certificate.
3. Browser verifies the certificate.
4. Browser and server derive a shared session key.
5. Encrypted HTTP communication begins.

## Certificates

A certificate proves that a public key belongs to a domain. Browsers trust certificates issued by trusted Certificate Authorities.

The browser checks:

- Is the certificate expired?
- Was it issued by a trusted CA?
- Does it match the domain?
- Has it been revoked?

If verification fails, the browser shows a security warning.

## What HTTPS Encrypts

HTTPS encrypts HTTP headers, body, cookies, query content inside the HTTP request, and response data.

Some routing information remains visible:

- Source IP.
- Destination IP.
- Port, usually 443.
- Packet timing and sizes.

## Complete HTTPS Request Flow

```text
DNS lookup
TCP three-way handshake
TLS handshake
Encrypted HTTP request
Encrypted HTTP response
```

## Interview Notes

- SSL is obsolete; TLS is the modern protocol.
- People often say "SSL certificate" but usually mean TLS certificate.
- TLS uses asymmetric cryptography during setup and symmetric encryption for data transfer.
- HTTPS protects confidentiality, integrity, and authentication.
