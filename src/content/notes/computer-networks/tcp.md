---
title: "TCP"
slug: "tcp"
description: "Handshake, termination, sequence numbers, acknowledgements, retransmission, flow control, and congestion control."
track: "Computer Networks"
---

TCP (Transmission Control Protocol) exists because real network communication is unreliable. Data is split into packets, and packets can be lost, delayed, corrupted, duplicated, or delivered out of order. TCP adds the machinery needed to turn that unreliable packet network into a reliable byte stream for applications.

## Why TCP Exists

Imagine uploading a 100 MB file. The computer cannot send the whole file as one block, so it breaks the data into smaller packets.

Problems can happen:

- A packet gets lost.
- Packet 8 arrives before packet 7.
- A packet gets corrupted.
- The receiver gets overwhelmed.
- The network itself becomes congested.

TCP solves these problems by providing reliable, ordered delivery with error recovery, flow control, and congestion control.

## What TCP Provides

- Connection-oriented communication.
- Reliable delivery.
- Ordered delivery.
- Error detection and recovery.
- Acknowledgements.
- Retransmission.
- Flow control.
- Congestion control.

Think of TCP as a reliable courier service. It does not just send data; it tracks what was delivered and resends what was missing.

## Connection-Oriented Communication

Before data is exchanged, TCP establishes a connection between client and server.

```text
Client --------------------> Server
          SYN

Server --------------------> Client
        SYN + ACK

Client --------------------> Server
          ACK
```

After this three-way handshake, both sides know the other side is reachable and ready.

## Three-Way Handshake

### Step 1: SYN

The client says: "I want to establish a TCP connection."

### Step 2: SYN + ACK

The server replies: "I received your request, and I am ready too."

### Step 3: ACK

The client confirms: "I received your confirmation."

Now the connection is established and application data can flow.

## Why Three Steps?

If there were only two steps, one side could believe the connection is open while the other side does not. The third ACK confirms that both client and server have the same understanding.

## Sequence Numbers

TCP treats data as a byte stream. Every byte has a sequence number.

```text
Packet 1 -> bytes 1-1000
Packet 2 -> bytes 1001-2000
Packet 3 -> bytes 2001-3000
```

Sequence numbers help TCP:

- Reorder data.
- Detect missing bytes.
- Retransmit missing data.

## Acknowledgements

The receiver sends an ACK number that means: "I have received everything before this byte; send this byte next."

```text
Sender sends: bytes 1-1000
Receiver sends: ACK 1001
```

If the receiver keeps sending the same ACK, it means it is still waiting for missing data.

## Retransmission

TCP retransmits lost data using two main signals.

### Timeout

The sender starts a timer when it sends data. If no ACK arrives before the timer expires, TCP assumes the packet or ACK was lost and sends the data again.

### Duplicate ACKs

If packet 2 is lost but packets 3 and 4 arrive, the receiver repeatedly sends the ACK for the missing byte. The sender can retransmit the missing packet before waiting for a timeout.

## Flow Control

Flow control protects the receiver.

If the sender can send faster than the receiver can process, the receiver's buffer can overflow. TCP prevents this with the receive window.

```text
Receiver buffer size = 100 KB
Free space = 40 KB
Receive Window = 40 KB
```

The sender should not have more unacknowledged data in flight than the receiver can accept.

## Sliding Window

Without a sliding window, TCP would send one packet and wait for one ACK before sending the next. That wastes network capacity.

With a sliding window, TCP sends multiple packets before waiting.

```text
Window size = 4

[1][2][3][4]

ACK for 1 arrives

[2][3][4][5]
```

The window slides forward as ACKs arrive, improving throughput while still supporting reliability.

## Congestion Control

Congestion control protects the network.

TCP cannot directly ask routers if they are overloaded, so it infers congestion from signals like packet loss, timeouts, delayed ACKs, and duplicate ACKs.

When congestion is detected, TCP reduces its sending rate. As the network recovers, TCP slowly increases the rate again.

Important high-level ideas:

- Slow Start begins cautiously and increases quickly while ACKs arrive.
- Congestion Avoidance increases more carefully after reaching a threshold.
- Packet loss usually causes TCP to reduce its sending rate.

## Flow Control vs Congestion Control

| Flow Control | Congestion Control |
| --- | --- |
| Protects the receiver | Protects the network |
| Receiver says how much it can accept | Sender adjusts based on network conditions |
| Uses receive window `rwnd` | Uses congestion window `cwnd` |

## Four-Way Termination

TCP is full duplex: client to server and server to client are independent directions.

That is why closing usually takes four packets.

```text
Client                          Server

FIN  -------------------------->

      <------------------------ ACK

      <------------------------ FIN

ACK  -------------------------->
```

One side can finish sending while still receiving remaining data from the other side.

## Interview Notes

- TCP is a transport layer protocol.
- It is connection-oriented and reliable.
- It uses a three-way handshake to establish a connection.
- It uses sequence numbers and ACKs for ordered delivery.
- Lost data is retransmitted.
- Flow control protects the receiver.
- Congestion control protects the network.
- Four-way termination closes both directions of a full-duplex connection.
