---
title: "WebSockets"
slug: "websockets"
description: "Why HTTP is not enough, full-duplex communication, handshakes, and real-time apps."
track: "Computer Networks"
---

HTTP is request-response based. The server responds only after the client asks. That is inefficient for real-time updates.

## Why HTTP Is Not Enough

For live data, polling creates repeated requests:

```text
GET /messages
GET /messages
GET /messages
```

Problems:

- Wasted requests.
- Higher server load.
- Delayed updates.
- More bandwidth.

## WebSocket

A WebSocket creates a persistent full-duplex connection.

```text
Client <==================> Server
```

Both sides can send messages at any time.

## Full Duplex

HTTP:

```text
Request -> Response
Request -> Response
```

WebSocket:

```text
Client -> Server
Server -> Client
Server -> Client
Client -> Server
```

## WebSocket Handshake

WebSockets start as an HTTP request.

```text
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade
```

If the server accepts:

```text
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
```

After that, the connection stays open and uses the WebSocket protocol.

## ws vs wss

- `ws://`: plain WebSocket.
- `wss://`: WebSocket over TLS, like HTTPS for WebSockets.

## Use Cases

- Chat applications.
- Live notifications.
- Multiplayer games.
- Stock prices.
- GPS tracking.
- Real-time dashboards.
- Live sports scores.

## HTTP vs WebSocket

| Feature | HTTP | WebSocket |
| --- | --- | --- |
| Model | Request-response | Full duplex |
| Connection | Short-lived or reused | Persistent |
| Server push | No | Yes |
| Best for | APIs, pages, uploads | Real-time updates |

## Interview Notes

- WebSocket solves real-time bidirectional communication.
- It starts with an HTTP upgrade request.
- `101 Switching Protocols` confirms the upgrade.
- It is useful when the server must push data without waiting for client polling.
