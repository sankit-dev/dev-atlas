---
title: "OSI vs TCP/IP & Encapsulation"
slug: "osi-vs-tcp-ip-and-encapsulation"
description: "How OSI maps to TCP/IP and how encapsulation moves data through layers."
track: "Computer Networks"
---

# OSI vs TCP/IP & Encapsulation

Now that you know the OSI model and the TCP/IP model separately, let's connect them.

The main idea:

- **OSI** is a 7-layer conceptual model.
- **TCP/IP** is a 4-layer practical model used by the Internet.

---

# OSI vs TCP/IP Mapping

```plain text
OSI Model                         TCP/IP Model

7. Application     ┐
6. Presentation    ├────────────► Application
5. Session         ┘

4. Transport       ─────────────► Transport

3. Network         ─────────────► Internet

2. Data Link       ┐
1. Physical        ┘────────────► Network Access
```

TCP/IP combines some OSI layers:

- OSI Application, Presentation, and Session become TCP/IP Application.
- OSI Transport maps to TCP/IP Transport.
- OSI Network maps to TCP/IP Internet.
- OSI Data Link and Physical become TCP/IP Network Access.

---

# Why does TCP/IP combine layers?

The OSI model separates concepts very clearly.

That is useful for learning.

But in real systems, some responsibilities are often handled together.

For example:
- Encryption may be handled by TLS libraries inside the application stack.
- Session behavior may be handled by application code or protocols.
- Physical and local network delivery are usually handled together by hardware, drivers, and network interfaces.

So TCP/IP uses fewer, broader layers.

---

# Encapsulation

**Encapsulation** means each layer adds its own header as data moves down the network stack.

Imagine your browser creates this data:

```plain text
GET /users HTTP/1.1
```

That starts at the Application Layer.

As it moves down, each layer adds information.

```plain text
Application Data

↓ TCP adds header

TCP Header + Application Data

↓ IP adds header

IP Header + TCP Header + Application Data

↓ Ethernet adds header

Ethernet Header + IP Header + TCP Header + Application Data
```

This is how one application message becomes something that can travel across a network.

---

# Decapsulation

**Decapsulation** is the reverse process.

At the receiver:

```plain text
Ethernet header is removed
↓
IP header is removed
↓
TCP header is removed
↓
Application receives the original data
```

Each layer only cares about its own header.

For example:
- A router mainly looks at the IP header.
- The operating system uses the transport header to identify the port.
- The web server reads the HTTP request.

---

# Simple Example

When you open:

```plain text
https://example.com
```

the request moves down the stack:

```plain text
HTTP request
↓
TCP segment
↓
IP packet
↓
Ethernet/Wi-Fi frame
```

At the server, it moves upward:

```plain text
Ethernet/Wi-Fi frame
↓
IP packet
↓
TCP segment
↓
HTTP request
```

---

# Interview Answer

If an interviewer asks:

> **What is the difference between OSI and TCP/IP?**

You can answer:

OSI is a 7-layer conceptual model used for learning and explaining networking. TCP/IP is the practical 4-layer model used by the Internet. TCP/IP combines OSI's Application, Presentation, and Session layers into Application, and combines Data Link and Physical into Network Access.

If they ask:

> **What is encapsulation?**

You can answer:

Encapsulation is the process where each networking layer adds its own header as data moves down the stack. Application data gets a TCP or UDP header, then an IP header, then a Data Link header before being sent over the network. At the receiver, decapsulation removes these headers in reverse order.
