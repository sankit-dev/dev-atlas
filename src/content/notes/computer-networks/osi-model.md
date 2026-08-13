---
title: "OSI Model"
slug: "osi-model"
description: "The 7 OSI layers and what each layer is responsible for."
track: "Computer Networks"
---

# OSI Model

Before understanding the OSI layers, first understand why layers exist.

When you open a website, many things happen:

- The browser creates a request.
- The data is delivered from your device to a server.
- The server is identified using an IP address.
- The data travels through Wi-Fi, routers, and cables.

If one system had to handle everything together, networking would become very hard to understand and debug.

So networking is divided into **layers**.

Each layer has one responsibility.

---

# What is the OSI Model?

The **OSI Model** is a conceptual model used to understand how network communication works.

It has **7 layers**:

```plain text
7. Application
6. Presentation
5. Session
4. Transport
3. Network
2. Data Link
1. Physical
```

The easiest way to read it:

- Top layers are closer to applications.
- Bottom layers are closer to hardware.

---

# Layer 7: Application Layer

The Application Layer is where network applications communicate.

It defines what kind of message is being sent.

Examples:
- HTTP
- HTTPS
- DNS
- SMTP
- FTP

Example:

When your browser sends this request:

```plain text
GET /users HTTP/1.1
```

that is Application Layer data.

---

# Layer 6: Presentation Layer

The Presentation Layer handles how data is represented.

It deals with:
- Encoding
- Compression
- Encryption and decryption
- Data format conversion

Example:

If data is encrypted, compressed, or converted into a specific format, that is conceptually a Presentation Layer responsibility.

---

# Layer 5: Session Layer

A **session** means an ongoing conversation between two systems.

Not just one message.

It is the context that says:

> **These messages belong to the same communication.**

Imagine a video call.

The call has a beginning:

```plain text
User A starts call with User B
```

Then many messages flow during the call:

```plain text
Audio packets
Video packets
Connection checks
State updates
```

Then the call ends:

```plain text
User A or User B disconnects
```

The full call is a **session**.

The Session Layer concept is about managing that conversation lifecycle:

- Start the communication.
- Keep track that later messages belong to the same communication.
- Recover or reconnect if needed.
- End the communication cleanly.

Important clarification:

A **web login session** is not exactly the OSI Session Layer.

When a website says "login session", it usually means the server remembers that you are logged in using a cookie, session ID, or token.

That is an application-level idea.

But it is still a useful analogy because both ideas involve remembering context across multiple requests or messages.

So in simple words:

> **The Session Layer is about managing the lifecycle of a conversation between two systems.**

---

# Layer 4: Transport Layer

The Transport Layer handles end-to-end communication between applications.

Main protocols:
- **TCP**
- **UDP**

It deals with:
- Ports
- Reliability
- Ordering
- Retransmission
- Flow control

Example:

HTTP usually uses TCP because web data should arrive correctly and in order.

---

# Layer 3: Network Layer

The Network Layer moves packets between different networks.

Main protocol:
- **IP**

It deals with:
- Source IP address
- Destination IP address
- Routing
- Packet forwarding

Example:

Routers use IP addresses to decide where a packet should go next.

---

# Layer 2: Data Link Layer

The Data Link Layer handles communication inside the same local network.

It deals with:
- MAC addresses
- Frames
- Switches
- Local delivery

Examples:
- Ethernet
- Wi-Fi

Example:

Inside your home Wi-Fi network, devices use MAC addresses for local delivery.

---

# Layer 1: Physical Layer

The Physical Layer sends raw bits over a physical medium.

It deals with:
- Electrical signals
- Radio waves
- Fiber optic light
- Cables
- Network cards

Example:

Wi-Fi sends data using radio waves. Ethernet sends data using cable signals.

---

# OSI Model Summary

<table header-row="true">
<tr>
<td>Layer</td>
<td>Name</td>
<td>Responsibility</td>
</tr>
<tr>
<td>7</td>
<td>Application</td>
<td>Application protocols like HTTP and DNS</td>
</tr>
<tr>
<td>6</td>
<td>Presentation</td>
<td>Encoding, compression, encryption, data format</td>
</tr>
<tr>
<td>5</td>
<td>Session</td>
<td>Start, maintain, and close sessions</td>
</tr>
<tr>
<td>4</td>
<td>Transport</td>
<td>End-to-end delivery using TCP or UDP</td>
</tr>
<tr>
<td>3</td>
<td>Network</td>
<td>IP addressing and routing</td>
</tr>
<tr>
<td>2</td>
<td>Data Link</td>
<td>MAC addresses and local network delivery</td>
</tr>
<tr>
<td>1</td>
<td>Physical</td>
<td>Raw bits over wire, radio, or fiber</td>
</tr>
</table>

---

# Interview Answer

If an interviewer asks:

> **Explain the OSI model.**

You can answer:

The OSI model is a 7-layer conceptual model used to understand network communication. The layers are Physical, Data Link, Network, Transport, Session, Presentation, and Application. Physical sends raw bits, Data Link handles local delivery using MAC addresses, Network handles IP addressing and routing, Transport handles end-to-end delivery using TCP or UDP, Session manages sessions, Presentation handles encoding, encryption, and data format, and Application contains protocols like HTTP and DNS.
