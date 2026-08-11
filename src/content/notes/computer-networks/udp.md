---
title: "UDP"
slug: "udp"
description: "Difference from TCP, when to use UDP, and real-world examples."
track: "Computer Networks"
---

The easiest way to understand UDP is to ask:

> **What if we remove almost everything that makes TCP reliable?**

The answer is **UDP**.
---
# UDP (User Datagram Protocol)
## Why Do We Need UDP?
TCP is reliable, but reliability comes with a cost.

Before sending data, TCP:

- Establishes a connection (3-way handshake).
- Keeps track of sequence numbers.
- Waits for acknowledgments.
- Retransmits lost packets.
- Uses flow control.
- Uses congestion control.

All of this adds **overhead** and **latency**.

Now imagine you're on a video call.

If one video packet is lost, do you want to stop the video and wait for that packet?

**No.**

You'd rather continue with the next frame.

For real-time communication, **speed is more important than perfect reliability**.

That's why UDP exists.
---
# What is UDP?
UDP is a **connectionless transport layer protocol** that sends data **without guaranteeing delivery, order, or retransmission**.

Think of UDP like sending a postcard.

You drop it in the mailbox and hope it reaches the destination.

You don't wait for confirmation.
---
# Connectionless
Unlike TCP:

```plain text
Client
    │
3-Way Handshake
    │
Server
```

UDP does this:

```plain text
Client
   │
Send Data
   │
Server
```

No handshake.

No connection setup.

Data is sent immediately.
---
# What UDP Does NOT Do
UDP does **not** provide:

- ❌ Connection establishment.
- ❌ Acknowledgments.
- ❌ Retransmissions.
- ❌ Ordered delivery.
- ❌ Flow control.
- ❌ Congestion control.

It simply sends the packet.
---
# Example
Suppose you send three packets:

```plain text
Packet 1
Packet 2
Packet 3
```

The receiver might get:

```plain text
Packet 1
Packet 3
```

Packet 2 may be lost.

UDP doesn't resend it.

It also doesn't care if packets arrive out of order.
---
# Why Would Anyone Use UDP?
Because it's **fast**.

There's no waiting for:

- Handshakes.
- ACKs.
- Retransmissions.

This makes UDP ideal when **low latency matters more than perfect reliability**.
---
# Real-Life Examples
### Video Calls (Zoom, Google Meet)
If one video frame is lost:

- Better to skip it.
- Waiting for retransmission would freeze the call.
---
### Online Games
Player positions are updated many times every second.

If one update is lost:

- The next update arrives almost immediately.

Retransmitting old position data isn't useful.
---
### Live Streaming
Missing one frame is better than buffering for several seconds.
---
### DNS
DNS queries are usually very small.

Using TCP would require a connection setup for each lookup.

UDP lets the client send a query and get a response quickly.

(There are exceptions—DNS can use TCP in some cases—but for most lookups, UDP is used.)
---
# Interview Notes
### UDP (User Datagram Protocol)
- Transport layer protocol.
- Connectionless.
- Does not guarantee delivery or ordering.
- No acknowledgments or retransmissions.
- Lower overhead and lower latency than TCP.
- Used when speed is more important than reliability.
---
## Interview Question
### Why is UDP faster than TCP?
Because UDP:

- Does not establish a connection.
- Does not wait for acknowledgments.
- Does not retransmit lost packets.
- Does not maintain sequence numbers or perform flow/congestion control.

This reduces overhead and allows data to be sent immediately.
---
