---
title: "Socket Programming"
slug: "socket-programming"
description: "The programming interface behind network communication."
track: "Computer Networks"
---

Socket programming is how applications communicate over a network using sockets.

A socket is an operating-system-managed endpoint for sending and receiving data.

## Why Sockets Are Needed

Applications do not directly manipulate TCP or IP packets. They use the socket API, and the OS handles the network stack.

```text
Application
Socket API
TCP/UDP
IP
Ethernet/Wi-Fi
```

## What Is a Socket?

A socket allows an application to:

- Send data.
- Receive data.
- Establish connections.
- Close connections.

## Socket vs Port

| Socket | Port |
| --- | --- |
| Communication endpoint | Numeric service identifier |
| Created by OS | Defined by TCP/UDP |
| Used to send/receive data | Used to route to correct application |

## TCP Socket

TCP sockets are:

- Connection-oriented.
- Reliable.
- Ordered.
- Used by HTTP, HTTPS, SSH, FTP, SMTP, and many database drivers.

## UDP Socket

UDP sockets are:

- Connectionless.
- Lower latency.
- No delivery guarantee.
- Used by DNS, games, voice, and streaming systems.

## TCP Server Flow

```text
socket()
bind(IP + port)
listen()
accept()
recv()/read()
send()/write()
close()
```

## TCP Client Flow

```text
socket()
connect(server IP + port)
send()
recv()
close()
```

## Why accept Creates a New Socket

The listening socket must remain open for future clients. Each accepted client receives its own connected socket.

```text
Listening socket on 8080
  -> Client A socket
  -> Client B socket
  -> Client C socket
```

## Node.js Example

When you write:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello");
});

server.listen(3000);
```

Node creates a TCP socket, binds to port 3000, listens for connections, accepts clients, parses HTTP, and writes responses.

## Interview Notes

- Socket programming is not a protocol.
- It is the API applications use to communicate over TCP or UDP.
- Sockets are managed by the OS kernel.
- A connected TCP socket is uniquely identified by source IP, source port, destination IP, destination port, and protocol.
- HTTP and WebSocket both rely on sockets.
