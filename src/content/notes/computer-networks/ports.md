---
title: "Ports"
slug: "ports"
description: "How network services share one machine through numbered ports."
track: "Computer Networks"
---

# Ports
## What is a Port?
A **port** is a **logical communication endpoint** on a device.

Think of it as a **door** through which a particular application sends or receives network traffic.

- IP Address → Identifies the **device**
- Port Number → Identifies the **application/service** on that device

Without ports, the operating system wouldn't know **which application should receive incoming data.**
---
## Why do we need Ports?
Imagine a server running:

- Website
- Database
- SSH
- Email server

All of them share the **same IP address**.

```plain text
IP:
192.168.1.10
```

How does the OS know where incoming packets belong?

```plain text
192.168.1.10:80
→ Website

192.168.1.10:22
→ SSH

192.168.1.10:5432
→ PostgreSQL
```

The **port number tells the operating system which application should receive the packet.**
---
# IP vs Port

<table header-row="true">
<tr>
<td>IP Address</td>
<td>Port</td>
</tr>
<tr>
<td>Identifies a device</td>
<td>Identifies a process/application</td>
</tr>
<tr>
<td>Network level</td>
<td>Transport level (TCP/UDP)</td>
</tr>
<tr>
<td>Example: 192.168.1.5</td>
<td>Example: 443</td>
</tr>
</table>

Together they form:

```plain text
192.168.1.5:443
```
---
# Analogy
Imagine an apartment building.

```plain text
Building Address
↓
221B Baker Street
```

Inside the building are many apartments.

```plain text
Apartment 101
Apartment 102
Apartment 103
```

Here,

- Building Address = IP Address
- Apartment Number = Port

The postman reaches the building using the address.

The apartment number tells him exactly where to deliver the package.
---
# Port Number Range
Ports are **16-bit numbers**.

```plain text
0 - 65535
```

Because

```plain text
2^16 = 65536
```
---
# Port Categories
## 1. Well-known Ports

```plain text
0 - 1023
```

Reserved for standard protocols.

Examples

<table header-row="true">
<tr>
<td>Port</td>
<td>Service</td>
</tr>
<tr>
<td>20</td>
<td>FTP Data</td>
</tr>
<tr>
<td>21</td>
<td>FTP Control</td>
</tr>
<tr>
<td>22</td>
<td>SSH</td>
</tr>
<tr>
<td>23</td>
<td>Telnet</td>
</tr>
<tr>
<td>25</td>
<td>SMTP</td>
</tr>
<tr>
<td>53</td>
<td>DNS</td>
</tr>
<tr>
<td>80</td>
<td>HTTP</td>
</tr>
<tr>
<td>110</td>
<td>POP3</td>
</tr>
<tr>
<td>143</td>
<td>IMAP</td>
</tr>
<tr>
<td>443</td>
<td>HTTPS</td>
</tr>
</table>

These are standard ports recognised worldwide.
---
## 2. Registered Ports

```plain text
1024 - 49151
```

Used by applications.

Examples

<table header-row="true">
<tr>
<td>Port</td>
<td>Service</td>
</tr>
<tr>
<td>3306</td>
<td>MySQL</td>
</tr>
<tr>
<td>5432</td>
<td>PostgreSQL</td>
</tr>
<tr>
<td>6379</td>
<td>Redis</td>
</tr>
<tr>
<td>5672</td>
<td>RabbitMQ</td>
</tr>
<tr>
<td>8080</td>
<td>Alternative HTTP</td>
</tr>
<tr>
<td>27017</td>
<td>MongoDB</td>
</tr>
</table>
---
## 3. Dynamic / Ephemeral Ports

```plain text
49152 - 65535
```

Used temporarily by clients.

Example

Browser

```plain text
Your Laptop

192.168.1.20:52341
        │
        │
        ▼
Google Server
142.250.xxx.xxx:443
```

Here,

```plain text
52341
```

is automatically chosen by the operating system.

After the connection closes, this port is released.
---
# What is a Socket?
A socket uniquely identifies one network connection.

A socket consists of:

```plain text
IP Address
+
Port
+
Protocol (TCP/UDP)
```

Example

```plain text
192.168.1.20:52341
        ↓
        connects to
        ↓
142.250.xxx.xxx:443
```

The full connection is identified by the **5-tuple**:

```plain text
Source IP
Destination IP
Source Port
Destination Port
Protocol
```

Example:

```plain text
Source IP:      192.168.1.20
Destination IP: 142.250.1.5
Source Port:    52341
Destination Port:443
Protocol:       TCP
```

This uniquely identifies the connection.
---
# Can Two Applications Use the Same Port?
No.

Only one process can bind to a specific IP + port + protocol combination at a time (with some specialised exceptions such as socket reuse).

Example

```plain text
Node.js
Port 3000
```

Trying to start another server on the same port gives:

```plain text
Error:
EADDRINUSE
(Address already in use)
```
---
# Can One Application Use Multiple Ports?
Yes.

Example:

```plain text
Nginx

80
443
```

Both belong to the same application.
---
# Why does HTTPS use Port 443?
It's simply the standard port assigned to HTTPS.

Similarly,

```plain text
HTTP → 80

SSH → 22

DNS → 53
```

The protocol itself doesn't require those exact numbers, but using the standard ports avoids having to specify custom ones.
---
# Why do we write localhost:3000?

```plain text
localhost
```

resolves to

```plain text
127.0.0.1
```

The server is listening on

```plain text
Port 3000
```

So

```plain text
http://localhost:3000
```

means

```plain text
127.0.0.1:3000
```
---
# What happens when you visit `https://google.com`?

```plain text
Browser
      │
      ▼
DNS resolves google.com
      │
      ▼
Gets Google's IP
      │
      ▼
Browser opens TCP connection
Destination Port = 443
      │
      ▼
TLS Handshake
      │
      ▼
HTTPS communication begins
```
---
# Client Port vs Server Port
Suppose you visit:

```plain text
https://example.com
```

Connection:

```plain text
Your PC

192.168.1.15:54821
        │
        │
        ▼
Server

203.0.113.10:443
```

Server:

```plain text
443
```

Client:

```plain text
54821
```

The client port is chosen automatically by the operating system.
---
# Are Ports Part of TCP/IP?
Ports belong to the **Transport Layer** protocols such as **TCP** and **UDP**.

The IP header contains only IP addresses.

The TCP/UDP header contains:

- Source Port
- Destination Port

That's why ports are considered a **Transport Layer concept**, not a Network Layer concept.
---
# Common Ports to Remember

<table header-row="true">
<tr>
<td>Port</td>
<td>Protocol / Service</td>
</tr>
<tr>
<td>20</td>
<td>FTP Data</td>
</tr>
<tr>
<td>21</td>
<td>FTP Control</td>
</tr>
<tr>
<td>22</td>
<td>SSH</td>
</tr>
<tr>
<td>23</td>
<td>Telnet (legacy, insecure)</td>
</tr>
<tr>
<td>25</td>
<td>SMTP</td>
</tr>
<tr>
<td>53</td>
<td>DNS (TCP/UDP)</td>
</tr>
<tr>
<td>80</td>
<td>HTTP</td>
</tr>
<tr>
<td>110</td>
<td>POP3</td>
</tr>
<tr>
<td>143</td>
<td>IMAP</td>
</tr>
<tr>
<td>443</td>
<td>HTTPS</td>
</tr>
<tr>
<td>3306</td>
<td>MySQL</td>
</tr>
<tr>
<td>5432</td>
<td>PostgreSQL</td>
</tr>
<tr>
<td>6379</td>
<td>Redis</td>
</tr>
<tr>
<td>8080</td>
<td>Alternative HTTP / Development</td>
</tr>
<tr>
<td>27017</td>
<td>MongoDB</td>
</tr>
</table>
---
# Backend Interview Questions
### 1. What is a port?
A port is a logical communication endpoint that identifies the specific application or service on a device that should send or receive network traffic.
---
### 2. Why do we need ports if we already have IP addresses?
An IP address identifies the device, while a port identifies the application on that device.

Ports allow multiple networked applications to run simultaneously on the same machine.
---
### 3. What is the difference between an IP address and a port?
An IP address identifies **where** to send data (the device), whereas a port identifies **which application** on that device should receive it.
---
### 4. Why can't two servers use the same port?
Because the operating system can only bind one process to the same IP + port + protocol combination at a time.

Otherwise, it wouldn't know which process should receive incoming packets.
---
### 5. What is an ephemeral port?
An ephemeral port is a temporary client-side port automatically assigned by the operating system for the duration of a connection.

It is released after the connection ends.
---
### 6. Why is HTTP on port 80 and HTTPS on port 443?
These are standard, well-known ports assigned by convention.

The protocols can technically run on any port, but using the standard ports ensures interoperability and avoids needing to specify custom ports.
---
### 7. Can TCP and UDP use the same port number?
Yes.

TCP and UDP have separate port spaces, so one application can listen on TCP port 53 while another listens on UDP port 53 without conflict (DNS commonly does this).
---
