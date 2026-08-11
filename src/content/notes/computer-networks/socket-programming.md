---
title: "Socket Programming"
slug: "socket-programming"
description: "The programming interface behind network communication."
track: "Computer Networks"
---

## What is Socket Programming?
Socket programming is a way for two applications running on different (or the same) machines to communicate over a network using **sockets**.

A **socket** acts as an endpoint for sending and receiving data.

Without sockets, applications cannot exchange data over TCP or UDP.
---
# Why do we need Socket Programming?
Consider this scenario:

- A browser wants to communicate with a web server.
- Both applications are running as separate processes.
- They may even be on different machines.

The operating system provides **sockets** as the interface that applications use to communicate over the network.

```plain text
Browser
     │
     ▼
 Socket
     │
 TCP/IP Stack
     │
 Internet
     │
 TCP/IP Stack
     │
 Socket
     ▼
Web Server
```

Applications **do not directly use TCP or IP**.

Instead, they use the **socket API**, and the operating system handles the networking details.
---
# What is a Socket?
A socket is a software object created by the operating system that represents one endpoint of a network connection.

It allows an application to:

- Send data
- Receive data
- Establish connections
- Close connections

You can think of a socket as a **communication channel** between an application and the network stack.
---
# Socket vs Port
Many beginners confuse these.

<table header-row="true">
<tr>
<td>Socket</td>
<td>Port</td>
</tr>
<tr>
<td>Communication endpoint</td>
<td>Numeric identifier for an application</td>
</tr>
<tr>
<td>Created by the OS</td>
<td>Defined by TCP/UDP</td>
</tr>
<tr>
<td>Used to send/receive data</td>
<td>Used to route packets to the correct application</td>
</tr>
</table>

Example:

```plain text
192.168.1.10:8080
```

Here,

- IP = Device
- Port = Application
- Socket = The actual communication endpoint using that IP and port
---
# Types of Sockets
## 1. TCP Socket
Uses TCP.

Characteristics:

- Connection-oriented
- Reliable
- Ordered delivery
- Error checking
- Retransmission

Used by:

- HTTP
- HTTPS
- SSH
- FTP
- SMTP
---
## 2. UDP Socket
Uses UDP.

Characteristics:

- Connectionless
- Faster
- No guarantee of delivery
- No retransmission
- No ordering

Used by:

- DNS
- Video streaming
- Online games
- Voice calls
---
# Client-Server Architecture
Socket programming generally involves two applications:

```plain text
Server
↑
Waits for connections
```

```plain text
Client
↑
Initiates connection
```
---
# TCP Socket Programming Flow
## Server Side

```plain text
Create Socket
      │
Bind to IP + Port
      │
Listen
      │
Accept Connection
      │
Receive Data
      │
Send Response
      │
Close Connection
```
---
## Client Side

```plain text
Create Socket
      │
Connect to Server
      │
Send Request
      │
Receive Response
      │
Close Connection
```
---
# Step-by-Step Example
Suppose you open:

```plain text
https://example.com
```

### Step 1
Browser creates a TCP socket.

```plain text
Socket()
```
---
### Step 2
Browser asks the OS to connect.

```plain text
connect()
```

Destination:

```plain text
example.com:443
```
---
### Step 3
TCP Three-Way Handshake occurs.

```plain text
SYN
SYN-ACK
ACK
```
---
### Step 4
TLS Handshake begins.
---
### Step 5
Browser sends HTTP request.

```plain text
GET /
```
---
### Step 6
Server receives request through its socket.
---
### Step 7
Server sends response.
---
### Step 8
Connection eventually closes.

```plain text
FIN
ACK
```
---
# Common Socket API Functions
Most programming languages expose similar APIs because they wrap the operating system's socket interface.

## Server

```plain text
socket()
```

Creates a socket.
---
```plain text
bind()
```

Associates the socket with an IP address and port.

Example:

```plain text
0.0.0.0:8080
```
---
```plain text
listen()
```

Marks the socket as ready to accept incoming connections.
---
```plain text
accept()
```

Accepts a client's connection request and returns a **new socket** dedicated to that client.

The original listening socket continues waiting for more connections.
---
```plain text
recv() / read()
```

Receives data.
---
```plain text
send() / write()
```

Sends data.
---
```plain text
close()
```

Closes the socket.
---
## Client

```plain text
socket()
```

Creates a socket.
---
```plain text
connect()
```

Connects to the server.
---
```plain text
send()
```

Sends data.
---
```plain text
recv()
```

Receives data.
---
```plain text
close()
```

Ends communication.
---
# Why does `accept()` create a new socket?
This is a common interview question.

The listening socket must remain available to accept future clients.

```plain text
Listening Socket
Port 8080
        │
        ├──────── Client A
        │
        ├──────── Client B
        │
        ├──────── Client C
```

Each client gets its **own connected socket**, while the listening socket stays open to accept more connections.
---
# Can one server handle multiple clients?
Yes.

Typical approaches include:

- One thread per client
- Thread pool
- Event loop (Node.js)
- Async I/O (e.g. Java NIO, Python asyncio)

Each active client has its own connected socket.
---
# Where are sockets created?
Sockets are created **inside the operating system kernel**.

Applications only hold a **socket descriptor/handle** (an integer or object depending on the language).

Example (Linux):

```plain text
int fd = socket(...);
```

`fd` is a **file descriptor** that refers to a kernel-managed socket.
---
# Socket Programming in Node.js
When you write:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello");
});

server.listen(3000);
```

Node internally:

- Creates a TCP socket.
- Binds it to port `3000`.
- Calls `listen()`.
- Accepts incoming client connections.
- Parses HTTP requests received over those sockets.
- Sends HTTP responses back through the same connected sockets.

You rarely call low-level socket APIs directly because libraries such as `http`, `https`, and `net` do it for you.
---
# Relationship Between Socket Programming and Protocols

```plain text
Application
        │
Socket API
        │
TCP / UDP
        │
IP
        │
Ethernet / Wi-Fi
```

The socket API is the bridge between your application and the transport layer.
---
# Real-World Examples

<table header-row="true">
<tr>
<td>Application</td>
<td>Socket Type</td>
</tr>
<tr>
<td>Web browser</td>
<td>TCP</td>
</tr>
<tr>
<td>REST API</td>
<td>TCP</td>
</tr>
<tr>
<td>SSH</td>
<td>TCP</td>
</tr>
<tr>
<td>Database connection</td>
<td>TCP</td>
</tr>
<tr>
<td>DNS query</td>
<td>Usually UDP (TCP for some cases)</td>
</tr>
<tr>
<td>Video streaming</td>
<td>Often UDP</td>
</tr>
<tr>
<td>Multiplayer games</td>
<td>Often UDP</td>
</tr>
</table>
---
# Backend Interview Questions
### 1. What is socket programming?
Socket programming is the process of building networked applications that communicate using sockets, which provide endpoints for sending and receiving data over protocols such as TCP or UDP.
---
### 2. What is a socket?
A socket is an operating system-managed communication endpoint that applications use to exchange data over a network.
---
### 3. What is the difference between a socket and a port?
A port is just a numeric identifier that helps the operating system deliver traffic to the correct service.

A socket is the actual communication endpoint that an application uses to send and receive data.

A connected TCP socket is uniquely identified by the source IP, source port, destination IP, destination port, and protocol.
---
### 4. Why does the server call `listen()`?
`listen()` tells the operating system to put the bound socket into a passive state so it can queue and accept incoming connection requests.
---
### 5. Why does `accept()` return a new socket?
The listening socket must continue accepting future clients, so each accepted client connection gets its own connected socket.
---
### 6. Does every TCP connection have its own socket?
Yes.

On the server, each accepted TCP connection is represented by its own connected socket, allowing the server to communicate independently with multiple clients.
---
### 7. Do HTTP and WebSocket use socket programming?
Yes.

Both rely on socket programming.

HTTP typically uses a TCP socket for request/response communication, while WebSocket starts as an HTTP request and then upgrades to a persistent TCP connection for full-duplex communication.
---
### Key takeaway
**Socket programming is not another network protocol.** It's the programming interface that applications use to communicate over protocols like TCP and UDP.

The operating system implements the networking stack, and your code interacts with it through sockets.
