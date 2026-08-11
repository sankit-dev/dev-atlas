---
title: "WebSockets"
slug: "websockets"
description: "Why HTTP is not enough, full-duplex communication, handshakes, and real-time apps."
track: "Computer Networks"
---

# 1. Why HTTP Isn't Enough
## The Problem
HTTP follows a **Request → Response** model.

```plain text
Client --------Request--------> Server
Client <-------Response-------- Server
```

After the response is sent:

- Connection is usually closed (or kept alive for reuse, but idle).
- The server **cannot send data on its own**.
- If the client wants new information, it must ask again.

Example:

A stock price changes.

```plain text
Server: "Stock is ₹120."
```

After 2 seconds:

```plain text
Stock becomes ₹125.
```

Can the server notify the client?

❌ No.

The client has to keep asking:

```plain text
GET /stock

GET /stock

GET /stock

GET /stock
```

This is called **Polling**.

Problems with polling:

- Many unnecessary requests.
- Higher server load.
- Wasted bandwidth.
- Updates are delayed depending on the polling interval.
---
## Real Example
Imagine WhatsApp.

You receive:

```plain text
Hi!
```

With HTTP only:

```plain text
Phone:
Any new messages?
No.

Any new messages?
No.

Any new messages?
No.

Any new messages?
Yes!
```

That would be inefficient.

Instead, WhatsApp needs the server to instantly push the message.
---
# 2. Full Duplex Communication
This is where WebSockets come in.

A WebSocket creates a **persistent connection** between the client and server.

```plain text
Client <==================> Server
```

Both sides can send messages **at any time**.

This is called **Full Duplex Communication**.

Unlike HTTP:

```plain text
Request
↓

Response

(wait)

New Request

↓

New Response
```

WebSocket works like:

```plain text
Client ---------------------- Server

Client ---> Server

Server ---> Client

Client ---> Server

Server ---> Client
```

Nobody has to wait for a request first.
---
## Half Duplex vs Full Duplex
### Half Duplex
Only one side talks at a time.

Example:

Walkie-talkie

```plain text
You:
"Hello"

(wait)

Friend:
"Hi"

(wait)
```
---
### Full Duplex
Both sides can talk simultaneously.

Example:

Phone call

```plain text
You: "Hello"

Friend: "Yes?"

You interrupt

Friend interrupts

Both speak anytime
```

WebSockets work like a phone call.
---
# 3. WebSocket Handshake
WebSockets don't replace HTTP completely.

They **start as an HTTP request**.

### Step 1
Browser sends a normal HTTP request.

```plain text
GET /chat HTTP/1.1

Upgrade: websocket
Connection: Upgrade
```

The client is essentially saying:

> "Let's switch this HTTP connection into a WebSocket connection."
---
### Step 2
Server agrees.

```plain text
HTTP/1.1 101 Switching Protocols

Upgrade: websocket
Connection: Upgrade
```

**101 Switching Protocols** means:

> "Okay, we're no longer using HTTP on this connection. We'll now communicate using the WebSocket protocol."
---
### Step 3
The connection stays open.

```plain text
Client <=====================> Server
```

Now either side can send messages whenever needed.
---
## Visual Flow

```plain text
Browser
    │
    │ HTTP GET
    │ Upgrade: websocket
    ▼
Server
    │
    │ 101 Switching Protocols
    ▼

═══════════════════════════════

Persistent WebSocket Connection

Client <===================> Server

Messages

Messages

Messages

Messages
```
---
# 4. Real-Time Applications
WebSockets are ideal when data changes frequently and users should see updates immediately.

Examples include:

- 💬 Chat applications (WhatsApp, Slack, Discord)
- 📈 Live stock prices
- 🪙 Cryptocurrency exchanges
- 🎮 Multiplayer games
- 🚗 Ride tracking (Uber, Ola)
- 📍 Live GPS/location tracking
- ⚽ Live sports scores
- 📊 Real-time dashboards and monitoring
- 🔔 Instant notifications
---
# HTTP vs WebSocket

<table header-row="true">
<tr>
<td>Feature</td>
<td>HTTP</td>
<td>WebSocket</td>
</tr>
<tr>
<td>Communication</td>
<td>Request → Response</td>
<td>Two-way communication</td>
</tr>
<tr>
<td>Connection</td>
<td>Short-lived (or reused but request-based)</td>
<td>Persistent</td>
</tr>
<tr>
<td>Server can send data anytime</td>
<td>❌ No</td>
<td>✅ Yes</td>
</tr>
<tr>
<td>Best for</td>
<td>REST APIs, websites, file uploads</td>
<td>Chats, live updates, gaming, streaming</td>
</tr>
<tr>
<td>Protocol</td>
<td>HTTP/HTTPS</td>
<td>WebSocket (`ws://` or secure `wss://`)</td>
</tr>
</table>

> **Note:** `wss://` is to WebSocket what `https://` is to HTTP—it encrypts the WebSocket connection using TLS.
---
# Interview Summary
- HTTP is request-response based, so the server cannot initiate communication with the client.
- Polling can simulate real-time updates but is inefficient because it generates many unnecessary requests.
- WebSocket solves this by creating a persistent, full-duplex connection where both client and server can send messages at any time.
- A WebSocket connection begins with an HTTP handshake using the `Upgrade: websocket` header. If accepted, the server responds with **101 Switching Protocols**, and communication continues using the WebSocket protocol.
- WebSockets are commonly used for chat applications, live notifications, multiplayer games, stock tickers, GPS tracking, and other real-time systems.

This level of understanding is sufficient for backend interviews.

Later, when you work with Node.js, you'll see how libraries like `ws` or `Socket.IO` implement these concepts in practice.
