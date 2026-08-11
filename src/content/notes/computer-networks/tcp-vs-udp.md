---
title: "TCP vs UDP"
slug: "tcp-vs-udp"
description: "Reliability, speed, ordering, error recovery, and use cases."
track: "Computer Networks"
---

Instead of memorizing a table, ask one question: do I need reliability or speed?

If reliability matters, choose TCP. If low latency matters more than perfect delivery, choose UDP.

## Core Difference

TCP tries to deliver all data correctly and in order.

UDP sends data quickly and does not guarantee delivery.

## Comparison

| Feature | TCP | UDP |
| --- | --- | --- |
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed by protocol | Not guaranteed |
| Ordering | Maintains order | No ordering guarantee |
| ACKs | Yes | No |
| Retransmission | Yes | No |
| Flow control | Yes | No |
| Congestion control | Yes | No |
| Speed | More overhead | Lower overhead |
| Use cases | Web, files, email, databases | DNS, streaming, gaming, VoIP |

## TCP Use Cases

Use TCP when every byte matters:

- HTTPS APIs.
- File downloads and uploads.
- Email.
- SSH.
- Database connections.
- Payments and banking flows.

## UDP Use Cases

Use UDP when recent data is more useful than perfectly complete old data:

- Video calls.
- Live streaming.
- Multiplayer games.
- Voice calls.
- DNS.

## Ordering

TCP reorders packets before giving data to the application.

```text
Arrival: 3, 1, 2
Application receives: 1, 2, 3
```

UDP gives packets to the application as they arrive.

## Reliability

TCP retransmits missing data. UDP does not.

That does not mean UDP applications can never be reliable. It means the reliability must be implemented by the application if needed.

## Interview Notes

- TCP is not "better" than UDP.
- UDP is not "better" than TCP.
- They solve different problems.
- TCP optimizes correctness and reliable ordering.
- UDP optimizes low overhead and low latency.
