---
title: "UDP"
slug: "udp"
description: "Difference from TCP, when to use UDP, and real-world examples."
track: "Computer Networks"
---

The easiest way to understand UDP is to ask: what if we remove almost everything that makes TCP reliable?

UDP (User Datagram Protocol) is a connectionless transport layer protocol. It sends packets without guaranteeing delivery, ordering, acknowledgements, retransmission, flow control, or congestion control.

## Why UDP Exists

TCP is reliable, but reliability has cost:

- Connection setup.
- Sequence tracking.
- ACKs.
- Retransmissions.
- Flow control.
- Congestion control.

For real-time systems, waiting for missing data can be worse than skipping it. In a video call, if one frame is lost, you usually prefer the next frame to arrive immediately instead of freezing the call.

## UDP Is Connectionless

TCP starts with a handshake.

```text
Client -> SYN
Server -> SYN + ACK
Client -> ACK
```

UDP sends immediately.

```text
Client ---- datagram ----> Server
```

There is no connection setup.

## What UDP Does Not Provide

- No connection establishment.
- No delivery guarantee.
- No ordering guarantee.
- No acknowledgements.
- No retransmission.
- No flow control.
- No congestion control.

If packet 2 is lost, UDP simply moves on.

## Why Use UDP?

UDP is useful when low latency matters more than perfect reliability.

Common examples:

- Video calls.
- Voice calls.
- Online games.
- Live streaming.
- DNS lookups.

## DNS Example

DNS queries are usually small. Using TCP would add a connection setup for many lookups. UDP lets the client send a small query and receive a quick response. DNS can use TCP in some cases, but many common lookups use UDP.

## Interview Notes

- UDP is a transport layer protocol.
- It is connectionless.
- It has lower overhead than TCP.
- It does not guarantee delivery or order.
- It is used when speed and latency matter more than perfect correctness.
