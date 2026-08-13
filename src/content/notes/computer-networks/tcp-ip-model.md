---
title: "TCP/IP Model"
slug: "tcp-ip-model"
description: "The practical 4-layer networking model used by the Internet."
track: "Computer Networks"
---

# TCP/IP Model

The **TCP/IP Model** is the practical networking model used by the Internet.

Unlike the OSI model, which has 7 conceptual layers, TCP/IP has **4 layers**.

```plain text
Application
Transport
Internet
Network Access
```

The TCP/IP model groups some OSI layers together to keep the practical model simpler.

---

# 1. Application Layer

The Application Layer contains protocols used directly by applications.

Examples:
- HTTP
- HTTPS
- DNS
- WebSocket
- SMTP
- FTP

It decides what the application wants to send.

Example:

```plain text
GET /users HTTP/1.1
Host: api.example.com
```

This is application data.

---

# 2. Transport Layer

The Transport Layer decides how data should be delivered between applications.

Main protocols:
- **TCP**
- **UDP**

TCP is used when reliability matters.

UDP is used when speed and low latency matter more than guaranteed delivery.

This layer also uses **ports**.

Example:

```plain text
Client → Server IP + Port 443
```

The IP address identifies the machine.

The port identifies the application or service on that machine.

---

# 3. Internet Layer

The Internet Layer handles addressing and routing across networks.

Main protocol:
- **IP**

It decides where the packet should go.

Example:

```plain text
Source IP      : 192.168.1.10
Destination IP : 142.250.xx.xx
```

Routers use destination IP addresses to forward packets.

---

# 4. Network Access Layer

The Network Access Layer sends data over the local physical network.

Examples:
- Ethernet
- Wi-Fi
- MAC addresses

It handles local delivery and physical transmission.

Example:

Your laptop may send data to your router using Wi-Fi. After that, the router forwards it toward the internet.

---

# TCP/IP Model Summary

<table header-row="true">
<tr>
<td>TCP/IP Layer</td>
<td>Common Protocols / Concepts</td>
</tr>
<tr>
<td>Application</td>
<td>HTTP, HTTPS, DNS, WebSocket, SMTP, FTP</td>
</tr>
<tr>
<td>Transport</td>
<td>TCP, UDP, ports</td>
</tr>
<tr>
<td>Internet</td>
<td>IP, routing, ICMP</td>
</tr>
<tr>
<td>Network Access</td>
<td>Ethernet, Wi-Fi, MAC addresses, frames</td>
</tr>
</table>

---

# Example: Opening a Website

Suppose you open:

```plain text
https://example.com/users
```

The flow looks like this:

```plain text
Application Layer
Browser creates an HTTP request

↓

Transport Layer
TCP prepares reliable delivery

↓

Internet Layer
IP adds source and destination IP addresses

↓

Network Access Layer
Wi-Fi or Ethernet sends the frame over the local network
```

At the server, the reverse happens.

The server receives the data from the network, removes each layer's information, and finally the web server reads the HTTP request.

---

# Interview Answer

If an interviewer asks:

> **Explain the TCP/IP model.**

You can answer:

The TCP/IP model is the practical 4-layer model used by the Internet. Its layers are Application, Transport, Internet, and Network Access. Application contains protocols like HTTP and DNS. Transport uses TCP or UDP for application-to-application delivery. Internet uses IP for addressing and routing. Network Access handles local network delivery using technologies like Ethernet, Wi-Fi, and MAC addresses.
