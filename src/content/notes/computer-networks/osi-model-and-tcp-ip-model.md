---
title: "OSI Model & TCP/IP Model"
slug: "osi-model-and-tcp-ip-model"
description: "Why networking layers exist, OSI vs TCP/IP, and which layers backend engineers touch."
track: "Computer Networks"
---

# OSI Model & TCP/IP Model
Before learning the models, remember this:

> **The OSI Model is mainly a learning model.**

	**The TCP/IP Model is what the Internet actually uses.**

Companies don't say:

> "Our server uses the OSI model."

They use the **TCP/IP model**.

We still study OSI because it's excellent for understanding networking and interview discussions.
---
# What problem are these models solving?
Imagine there were no networking layers.

When you make an HTTP request, one program would have to:

- Format the HTTP request.
- Establish a TCP connection.
- Handle retransmissions.
- Find the destination IP.
- Route packets.
- Send data over Wi-Fi or Ethernet.

One piece of software would have to do **everything**.

Instead, networking divides these responsibilities into layers.

Each layer performs **one specific job** and passes the data to the next layer.
---
# OSI Model (7 Layers)
The OSI model divides networking into seven layers.

```plain text
7. Application
6. Presentation
5. Session
4. Transport
3. Network
2. Data Link
1. Physical
```

At first glance, this looks like a lot—but don't worry.

For backend development, **you mainly interact with three layers**:

- **Application Layer**
- **Transport Layer**
- **Network Layer**

The lower layers are mostly handled by the operating system, network drivers, routers, switches, and hardware.
---
# TCP/IP Model (What We Actually Use)
The Internet simplifies the OSI model into four layers.

```plain text
Application
Transport
Internet
Network Access
```

Notice how several OSI layers are combined.
---
# OSI vs TCP/IP

```plain text
OSI (7 Layers)             TCP/IP (4 Layers)

Application      ┐
Presentation     ├──────► Application
Session          ┘

Transport  ─────────────► Transport

Network    ─────────────► Internet

Data Link  ┐
Physical   ┘────────────► Network Access
```

So when people say:

> "HTTP is in the Application Layer."

They're referring to the **TCP/IP model**, even though the OSI model also has an Application Layer.
---
# Why Do We Learn Both?
- **OSI** helps explain networking concepts and is commonly used in interviews and textbooks.
- **TCP/IP** reflects how modern networks and the Internet are actually implemented.
---
## Interview Notes
### OSI Model
- A conceptual model with **7 layers** used to understand how network communication works.
- Separates networking into different responsibilities.

### TCP/IP Model
- The practical networking model used by the Internet.
- Consists of **4 layers**.
- Combines some of the OSI layers into broader categories.

### OSI vs TCP/IP

<table header-row="true">
<tr>
<td>OSI Model</td>
<td>TCP/IP Model</td>
</tr>
<tr>
<td>7 layers</td>
<td>4 layers</td>
</tr>
<tr>
<td>Conceptual model</td>
<td>Practical implementation</td>
</tr>
<tr>
<td>Used for learning and understanding</td>
<td>Used by the Internet</td>
</tr>
</table>
---
---
# TCP/IP Model

```plain text
Application
↓
Transport
↓
Internet
↓
Network Access
```

We'll understand what **each layer is responsible for**, not memorize names.
---
# 1. Application Layer
## Responsibility
This layer is where **applications communicate with each other**.

It defines **how data should be formatted and exchanged** for different types of applications.

For example:

- Browser requesting a webpage.
- Sending an email.
- Looking up a domain name.
- Opening a WebSocket connection.

Notice something:

The Application Layer **doesn't care** how the data reaches the destination.

It only cares about:

> "What should I send?"
---
## Protocols
Examples include:

- HTTP
- HTTPS
- DNS
- WebSocket
- SMTP
- FTP

You've probably used most of these already.
---
## Example
Suppose you visit:

```plain text
https://google.com
```

The browser creates:

```plain text
GET / HTTP/1.1
Host: google.com
```

This is **Application Layer** data.

At this point:

- No TCP connection yet.
- No IP address yet.
- No routing yet.

The browser has simply prepared the request.

Then it hands it to the next layer.

```plain text
Application Layer
        │
        ▼
Transport Layer
```
---
# Backend Perspective
As a backend engineer, **this is the layer you'll work with the most**.

Examples:

- Building REST APIs.
- Handling HTTP requests.
- WebSockets.
- Authentication.
- Cookies.
- Headers.
- JSON.
- GraphQL.

Most backend frameworks (Express, Spring Boot, Django, ASP.NET, etc.) operate at the **Application Layer**.
---
# 2. Transport Layer
## Responsibility
The Transport Layer is responsible for **end-to-end communication between applications**.

It decides **how** data should be delivered.

It answers questions like:

- Should the communication be reliable?
- Should lost packets be retransmitted?
- Should data arrive in order?

The Application Layer doesn't worry about these things—it simply hands the data to the Transport Layer.
---
## Protocols
- **TCP** → Reliable, connection-oriented.
- **UDP** → Fast, connectionless.

We've already covered these in detail.
---
## Backend Perspective
As a backend developer, you usually choose between:

- HTTP/HTTPS → Uses **TCP**.
- DNS → Usually uses **UDP**.
- Video streaming or gaming → Often uses **UDP**.
---
# 3. Internet Layer
## Responsibility
The Internet Layer is responsible for **getting data from one device to another across different networks**.

Think of it like writing the destination address on a parcel.

The Transport Layer creates the data.

The Internet Layer decides:

> **"Where should this packet go?"**
---
## Protocols
- **IP (Internet Protocol)** ⭐ Most important
- ICMP (used by ping)
- ARP (often considered between Internet and Network Access depending on the model)

You've already seen IP addresses like:

```plain text
192.168.1.10
```

Those belong to this layer.
---
## Example
Suppose your laptop wants to send data to Google's server.

The Internet Layer adds:

```plain text
Source IP      : 192.168.1.10
Destination IP : 142.250.xx.xx
```

Routers use these IP addresses to forward packets toward the destination.
---
## Backend Perspective
As a backend engineer, you don't usually work directly with IP packets, but you'll often deal with:

- Client IP addresses.
- Reverse proxies.
- Load balancers.
- Firewalls.
- CIDR.
- Public vs Private IP.
---
---
# 4. Network Access Layer
## Responsibility
This layer is responsible for **actually sending the data over the physical network**.

It answers:

> "How do I send these bits over Wi-Fi, Ethernet, or another network medium?"
---
## Technologies / Protocols
Examples:

- Ethernet
- Wi-Fi
- MAC addresses

The data is converted into electrical signals, radio waves, or light signals depending on the network.
---
## Backend Perspective
As a backend engineer, you rarely interact with this layer directly.

It's mainly handled by:

- Network cards (NICs).
- Device drivers.
- Switches.
- Operating systems.
---
---
# Complete TCP/IP Model

```plain text
Application
│  HTTP, HTTPS, DNS, WebSocket
│
▼
Transport
│  TCP, UDP
│
▼
Internet
│  IP
│
▼
Network Access
   Ethernet, Wi-Fi, MAC
```
---
# Backend Engineer's Perspective

<table header-row="true">
<tr>
<td>Layer</td>
<td>Will You Work With It?</td>
</tr>
<tr>
<td>Application</td>
<td>✅ Daily</td>
</tr>
<tr>
<td>Transport</td>
<td>✅ Frequently (TCP vs UDP, ports)</td>
</tr>
<tr>
<td>Internet</td>
<td>✅ Sometimes (IPs, routing, proxies)</td>
</tr>
<tr>
<td>Network Access</td>
<td>⚪ Rarely</td>
</tr>
</table>
---
---
# 1. Protocol Mapping
Now that you know the layers, let's place the protocols you've learned into them.

## TCP/IP Model

```plain text
Application
│
├── HTTP
├── HTTPS
├── DNS
├── WebSocket
├── SMTP
└── FTP
│
▼
Transport
│
├── TCP
└── UDP
│
▼
Internet
│
└── IP
│
▼
Network Access
│
├── Ethernet
├── Wi-Fi
└── MAC
```

That's really all you need to remember.
---
### Interview Notes

<table header-row="true">
<tr>
<td>Layer</td>
<td>Common Protocols</td>
</tr>
<tr>
<td>Application</td>
<td>HTTP, HTTPS, DNS, WebSocket, SMTP, FTP</td>
</tr>
<tr>
<td>Transport</td>
<td>TCP, UDP</td>
</tr>
<tr>
<td>Internet</td>
<td>IP</td>
</tr>
<tr>
<td>Network Access</td>
<td>Ethernet, Wi-Fi, MAC</td>
</tr>
</table>
---
# 2. Encapsulation & Decapsulation
This is one of the most important networking concepts.
---
## What is Encapsulation?
Imagine you're sending a parcel.

You start with the item.

Then:

- Put it in a small box.
- Put that box in a bigger box.
- Add the shipping label.
- Give it to the delivery company.

Each step adds its own information.

Networking works the same way.

Each layer adds its own header before passing the data to the next layer.
---
## Example
Suppose your browser creates:

```plain text
GET /users HTTP/1.1
```

This starts at the **Application Layer**.
---
### Step 1 — Application Layer
Creates:

```plain text
HTTP Request
```

Passes it down.
---
### Step 2 — Transport Layer
TCP adds its own header.

```plain text
TCP Header
+
HTTP Request
```

Now it's called a **TCP Segment**.
---
### Step 3 — Internet Layer
IP adds another header.

```plain text
IP Header
+
TCP Header
+
HTTP Request
```

Now it's called an **IP Packet**.
---
### Step 4 — Network Access Layer
Ethernet (or Wi-Fi) adds its own header.

```plain text
Ethernet Header
+
IP Header
+
TCP Header
+
HTTP Request
```

Now it's called a **Frame**.

The frame is transmitted over the network.
---
## Visual Flow

```plain text
Application
HTTP Data
        │
        ▼
Transport
[TCP Header][HTTP Data]
        │
        ▼
Internet
[IP Header][TCP Header][HTTP Data]
        │
        ▼
Network Access
[Ethernet Header][IP Header][TCP Header][HTTP Data]
```

This process is called **Encapsulation** because each layer wraps the data with its own information.
---
# Decapsulation
At the server, the reverse happens.

The Network Access Layer removes its header.

↓

The Internet Layer removes the IP header.

↓

The Transport Layer removes the TCP header.

↓

The Application Layer finally receives:

```plain text
GET /users HTTP/1.1
```

Exactly what the client originally created.
---
## Visual Flow

```plain text
Frame
        │
Remove Ethernet Header
        │
Packet
        │
Remove IP Header
        │
Segment
        │
Remove TCP Header
        │
HTTP Request
```

This is called **Decapsulation**.
---
# Why is this useful?
Because every layer only understands **its own header**.

For example:

- A router looks at the **IP header** to decide where to forward the packet.
- The destination operating system looks at the **TCP header** to know which port should receive the data.
- The web server finally reads the **HTTP request**.

Each layer ignores information meant for the others.
---
# Interview Notes
### Encapsulation
- Process of adding protocol-specific headers as data moves **down** the networking stack.
- Each layer adds its own header.
- Data changes form:
	- Application Data → TCP Segment → IP Packet → Ethernet Frame.

### Decapsulation
- Reverse process performed at the receiver.
- Each layer removes its own header before passing the data upward.
- The Application Layer finally receives the original data.
---
---
