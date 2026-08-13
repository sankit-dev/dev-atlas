---
title: "TCP vs UDP"
slug: "tcp-vs-udp"
description: "Reliability, speed, ordering, error recovery, and use cases."
track: "Computer Networks"
---

Instead of memorizing a table, ask yourself one question:

> **Do I need reliability, or do I need speed?**

If reliability matters → **TCP**

If speed matters → **UDP**

Everything else follows from that.
---
## 1. Connection
**TCP**

Before sending data:

```plain text
Client
   │
Three-Way Handshake
   │
Server
```

Connection must be established.
---
**UDP**

```plain text
Client
   │
Send Data
   │
Server
```

No connection setup.

Data is sent immediately.
---
## 2. Reliability
**TCP**

If a packet is lost:

```plain text
Packet Lost

↓

Retransmit
```

The receiver eventually gets all the data.
---
**UDP**

If a packet is lost:

```plain text
Packet Lost

↓

Ignore
```

UDP simply moves on.
---
## 3. Ordering
**TCP**

Suppose packets arrive:

```plain text
3
1
2
```

TCP rearranges them:

```plain text
1
2
3
```
---
**UDP**

Packets are delivered as they arrive.

If they come:

```plain text
3
1
2
```

The application receives:

```plain text
3
1
2
```
---
## 4. Speed
TCP performs:

- Handshake
- ACKs
- Retransmissions
- Flow Control
- Congestion Control

These make it reliable but add overhead.

UDP skips all of that, making it faster.
---
## 5. Overhead
TCP maintains connection state and tracking information.

UDP only sends the packet.

So UDP has much lower overhead.
---
## 6. Use Cases
### TCP
Use TCP when **every byte matters**.

Examples:

- Web browsing (HTTP/HTTPS)
- File downloads
- File uploads
- Email
- Database communication
---
### UDP
Use UDP when **low latency matters more than perfect delivery**.

Examples:

- Video calls
- Voice calls
- Live streaming
- Online gaming
- DNS
---
# Interview Comparison Table

<table header-row="true">
<colgroup>
<col>
<col width="151">
<col width="189">
</colgroup>
<tr>
<td>Feature</td>
<td>TCP</td>
<td>UDP</td>
</tr>
<tr>
<td>Connection</td>
<td>Connection-oriented</td>
<td>Connectionless</td>
</tr>
<tr>
<td>Reliability</td>
<td>Guaranteed</td>
<td>Not guaranteed</td>
</tr>
<tr>
<td>Ordering</td>
<td>Maintains order</td>
<td>No ordering guarantee</td>
</tr>
<tr>
<td>Acknowledgments</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Retransmission</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Flow Control</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Congestion Control</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Speed</td>
<td>Slower</td>
<td>Faster</td>
</tr>
<tr>
<td>Overhead</td>
<td>Higher</td>
<td>Lower</td>
</tr>
<tr>
<td>Use Cases</td>
<td>HTTP, HTTPS, Email, FTP</td>
<td>DNS, Streaming, Gaming, VoIP</td>
</tr>
</table>
---
# Real-Life Analogy
### TCP
Imagine sending important legal documents through a courier.

You want:

- Delivery confirmation
- Tracking
- Signature
- Resending if lost

That's TCP.
---
### UDP
Imagine announcing scores over a loudspeaker.

If someone misses one announcement, you don't repeat the previous one.

You simply continue.

That's UDP.
---
# Interview Questions
### When would you choose TCP?
When reliability and correct ordering are important.

Examples:

- Banking applications
- File transfers
- Database communication
- Web applications
---
### When would you choose UDP?
When low latency is more important than perfect delivery.

Examples:

- Online gaming
- Video conferencing
- Live streaming
- DNS
---
# One Common Misconception
Many people say:

> **"UDP is better because it's faster."**

That's not correct.

UDP is **not better**.

It simply solves a different problem.

- If you're transferring a bank transaction, losing one packet is unacceptable → **TCP**.
- If you're on a video call, waiting for a lost frame would make the call feel laggy → **UDP**.

The choice depends on the application's requirements.
