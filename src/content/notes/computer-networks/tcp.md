---
title: "TCP"
slug: "tcp"
description: "Handshake, termination, sequence numbers, acknowledgements, retransmission, flow control, and congestion control."
track: "Computer Networks"
---

# TCP (Transmission Control Protocol)
## Why Do We Need TCP?
Imagine you want to send a **100 MB video** to a server.

Can the computer send all 100 MB at once?

**No.**

It breaks the data into **small packets**.

Now imagine these packets travel through the internet.

Problems can happen:

- Packet 5 gets lost.
- Packet 8 arrives before Packet 7.
- A packet gets corrupted.
- The receiver gets overwhelmed because packets arrive too quickly.

So we need something to ensure:

- All packets arrive.
- They arrive in the correct order.
- Lost packets are resent.
- The receiver isn't overloaded.

That's exactly what **TCP** does.
---
# What is TCP?
TCP is a **connection-oriented transport layer protocol** that provides:

- Reliable data delivery.
- Ordered delivery.
- Error detection and recovery.
- Flow control.
- Congestion control.

Think of TCP as a **reliable courier service**.

It doesn't just send a package—it tracks it until it reaches the destination.
---
# Why is it called "**Connection-Oriented**"?
Before sending any data, TCP establishes a connection between the client and the server.

Think of making a phone call.

You don't start speaking immediately.

First:

```plain text
Caller: Hello?
Receiver: Yes?
Caller: Great, let's talk.
```

Only after both sides are ready does the conversation begin.

TCP works the same way.

This setup process is called the **Three-Way Handshake**, which we'll study next.
---
# What Problems Does TCP Solve?
## 1. Reliable Delivery
Suppose you send 10 packets.

```plain text
Packet 1
Packet 2
Packet 3
Packet 4
Packet 5
```

Packet 3 gets lost.

TCP notices that Packet 3 wasn't acknowledged and **resends it**.

Without TCP, the data would be incomplete.
---
## 2. Ordered Delivery
Suppose the network delivers packets like this:

```plain text
Packet 1
Packet 4
Packet 2
Packet 3
```

TCP reorders them before giving them to the application.

The application receives:

```plain text
Packet 1
Packet 2
Packet 3
Packet 4
```
---
## 3. Error Recovery
If a packet is corrupted during transmission, TCP detects it (using checksums) and requests it again.
---
## 4. Flow Control
Imagine:

- Sender can send **1000 packets/second**.
- Receiver can process only **100 packets/second**.

If the sender keeps transmitting at full speed, the receiver's buffer will overflow.

TCP allows the receiver to tell the sender:

> "Slow down, I can only handle this much."
---
## 5. Congestion Control
Now imagine **millions of computers** are sending data through the same network.

If everyone sends at full speed, routers become overloaded and start dropping packets.

TCP detects network congestion and reduces its sending rate to avoid making the situation worse.
---
# Where Does TCP Fit?

```plain text
Application Layer
│
├── HTTP
├── HTTPS
├── FTP
└── SMTP
        │
        ▼
Transport Layer
│
├── TCP
└── UDP
        │
        ▼
Internet Layer (IP)
        │
        ▼
Network
```

HTTP, HTTPS, FTP, and many other protocols rely on TCP to deliver their data reliably.
---
## Real-Life Example
Suppose you're uploading a file to Google Drive.

Your browser doesn't send one giant block of data.

Instead:

```plain text
100 MB File

↓

Packet 1
Packet 2
Packet 3
...
Packet 25,000
```

TCP makes sure:

- Every packet arrives.
- No packet is missing.
- They are reassembled in the correct order.
- Missing packets are retransmitted.

Only then does the application receive the complete file.
---
## Interview Notes
**TCP (Transmission Control Protocol)**

- Transport layer protocol.
- Connection-oriented.
- Reliable communication.
- Ensures ordered delivery.
- Uses acknowledgements and retransmissions.
- Provides flow control and congestion control.
---
## What comes next?
Everything we discussed depends on **one thing**:

> **How do two computers establish a TCP connection before sending data?**

That is the **Three-Way Handshake**.

This is one of the **most frequently asked networking interview questions**, and once you understand it, concepts like **sequence numbers**, **acknowledgements**, and **connection termination** become much easier.
---
# Why do we need a Three-Way Handshake?
Suppose your browser wants to connect to a server.

Can it just start sending data?

Imagine this:

```plain text
Client -----------------> Server
          "Here's my data"
```

But what if:

- The server is down?
- The server isn't listening on that port?
- The network is broken?

The client would be sending data to nowhere.

So before exchanging data, **both sides need to agree** that they are ready.

Think of it like a phone call.

```plain text
You: Hello?
Friend: Hi, I can hear you.
You: Great, let's talk.
```

Only after this confirmation does the conversation start.

That's exactly what the Three-Way Handshake does.
---
## Step 1 - SYN
The client says:

> "I want to establish a TCP connection."

This is called a **SYN** packet.

```plain text
Client --------------------> Server
          SYN
```

Think of it as:

> "Hello, can we communicate?"
---
## Step 2 - SYN + ACK
The server receives the SYN.

If it's ready, it replies:

```plain text
Server --------------------> Client
        SYN + ACK
```

Meaning:

- **ACK** = "I received your request."
- **SYN** = "I'm also ready to communicate."

So the server is saying:

> "Yes, I heard you, and I'm ready too."
---
## Step 3 - ACK
Now the client confirms:

```plain text
Client --------------------> Server
            ACK
```

Meaning:

> "I received your confirmation."

Now both sides know:

- The client can reach the server.
- The server can reach the client.
- Both are ready.

The connection is established.
---
## Complete Flow

```plain text
Client                          Server

   SYN  ------------------------>

        <-------------------- SYN + ACK

   ACK  ------------------------>

========= TCP Connection Established =========
```

Now data can be exchanged.
---
## Why 3 steps? Why not 2?
This is the interview favorite.

Imagine only two steps.

```plain text
Client ---- SYN ---->

Server <--- ACK ----
```

Now suppose the server's ACK gets lost.

The client thinks:

> "The connection isn't established."

The server thinks:

> "The connection is established."

Now they disagree.

One side starts waiting for data, while the other keeps retrying.

The **third ACK** tells the server:

> "Yes, I received your reply."

Now both sides have the same understanding.
---
# Sequence Number (High-Level)
Remember earlier we said TCP keeps packets in order?

To do that, every TCP connection starts with a **Sequence Number**.

During the handshake:

```plain text
Client
Sequence Number = 1000
```

Client sends:

```plain text
SYN (Seq = 1000)
```

Server replies:

```plain text
SYN + ACK
Seq = 5000
Ack = 1001
```

The acknowledgment means:

> "I received your sequence number 1000 and now expect 1001."

Finally, the client replies:

```plain text
ACK
Seq = 1001
Ack = 5001
```

Don't worry about the exact math yet.

Just know:

- **Sequence Number** identifies bytes of data sent.
- **Acknowledgment Number** tells the sender what the receiver expects next.

We'll revisit them when we discuss reliability and retransmissions.
---
# What happens after the handshake?
Now the connection is open.

```plain text
Client
    │
    ▼
HTTP Request
    │
    ▼
Server
```

For example:

```plain text
GET /users HTTP/1.1
```

The request travels over the TCP connection that was just established.
---
# Interview Notes
### Three-Way Handshake
- Used to establish a TCP connection.
- Ensures both client and server are ready.
- Steps:
	1. SYN → Client requests a connection.
	2. SYN + ACK → Server acknowledges and accepts.
	3. ACK → Client confirms.

After the third step, the TCP connection is established and data transfer begins.
---
### Sequence Number & Acknowledgment
#### Sequence Number
- Every byte sent over a TCP connection is assigned a sequence number.
- It tells the receiver **where this data belongs** in the overall byte stream.
- It helps TCP:
	- Keep data in the correct order.
	- Detect missing data.

**Example:**

```plain text
Packet 1 → Bytes 1–1000
Packet 2 → Bytes 1001–2000
Packet 3 → Bytes 2001–3000
```
---
#### Acknowledgment Number (ACK)
- The receiver sends an acknowledgment after receiving data.
- The ACK number indicates **the next byte the receiver expects**.
- It confirms that all previous bytes have been received successfully.

**Example:**

```plain text
Sender: Bytes 1–1000
Receiver: ACK = 1001
```

Meaning:

> "I have received bytes 1–1000. Send me byte 1001 next."
---
#### If a Packet is Lost
Suppose:

```plain text
Packet 1 → Received ✅
Packet 2 → Lost ❌
Packet 3 → Received ✅
```

The receiver is still missing bytes **1001–2000**, so it sends:

```plain text
ACK = 1001
```

Meaning:

> "I'm still waiting for byte 1001."

The sender realizes data is missing and **retransmits the lost packet**.
---
### Key Points
- **Sequence Number** → Identifies the position of data in the byte stream.
- **Acknowledgment Number** → Indicates the next expected byte.
- Together, they enable **ordered delivery**, **loss detection**, and **reliable communication** in TCP.
---
# Retransmission
## Why Do We Need Retransmission?
Suppose the client sends:

```plain text
Bytes 1–1000
```

But due to a network issue, the packet is lost.

```plain text
Client ----------------X--------------> Server
        Bytes 1–1000
```

The server never receives it.

Now what?

Without retransmission, the data would be permanently lost.

TCP solves this by **sending the packet again**.
---
# How does TCP know a packet was lost?
TCP mainly uses two mechanisms:

## 1. Timeout (Most intuitive)
Whenever TCP sends a packet, it starts a **timer**.

```plain text
Client
│
├── Send Packet
├── Start Timer
└── Wait for ACK
```

Two possibilities:

### Case 1: ACK arrives

```plain text
Client -----------------> Server

          <------------- ACK
```

The timer stops.

Everything is fine.
---
### Case 2: ACK doesn't arrive

```plain text
Client ----------------X--------------> Server
```

The timer expires.

TCP assumes:

> "Either the packet or the ACK was lost."

So it **retransmits** the packet.
---
## 2. Duplicate ACKs (Faster Detection)
Suppose:

```plain text
Packet 1 → Received ✅
Packet 2 → Lost ❌
Packet 3 → Received ✅
Packet 4 → Received ✅
```

The server is still waiting for **Packet 2**.

So it keeps sending:

```plain text
ACK = 1001
ACK = 1001
ACK = 1001
```

These are called **Duplicate ACKs**.

The sender notices:

> "I'm getting the same ACK repeatedly. The receiver must be missing some data."

Instead of waiting for the timeout, TCP immediately retransmits the missing packet.

This is much faster.
---
# Example

```plain text
Client                     Server

Packet 1  ------------->

           <----------- ACK 1001

Packet 2  -----X (Lost)

Packet 3  ------------->

           <----------- ACK 1001

Packet 4  ------------->

           <----------- ACK 1001

Client detects duplicate ACKs

Packet 2 -------------> (Retransmitted)

           <----------- ACK 3001
```
---
# Why is Retransmission Important?
Without it:

- File downloads could be incomplete.
- Videos could be corrupted.
- Database replication could fail.
- HTTP requests might arrive partially.

Retransmission is one of the key reasons TCP is considered **reliable**.
---
# Interview Notes
- Retransmission is the process of resending lost TCP packets.
- TCP detects packet loss using:
	- **Timeout** (ACK not received within the expected time).
	- **Duplicate ACKs** (receiver repeatedly acknowledges the same byte because it's waiting for missing data).
- Retransmission ensures **reliable delivery**.
---
# What we've built so far

```plain text
Need reliable communication
        ↓
Three-Way Handshake
        ↓
Sequence Numbers
        ↓
Acknowledgments
        ↓
Retransmission
        ↓
Reliable Data Transfer
```
---
## Next topic: **Flow Control**
This is another favorite interview question.

We'll answer:

> **What if the sender is much faster than the receiver?**

This has nothing to do with packet loss—it's about preventing the **receiver** from being overwhelmed.

Once you understand Flow Control, we'll finish TCP with **Congestion Control**, which deals with the **network** being overwhelmed.

These two are often confused in interviews, and knowing the difference is valuable.
---
Remember this simple rule:

> **Flow Control protects the receiver.**

	**Congestion Control protects the network.**

We'll study Flow Control first.
---
# Flow Control
## Why Do We Need Flow Control?
Imagine:

```plain text
Sender can send 1000 MB/s

Receiver can process only 100 MB/s
```

If the sender keeps sending at full speed:

```plain text
Sender
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

Receiver 😵
```

The receiver's memory (buffer) will become full.

New packets will have nowhere to go and may be dropped.

So TCP needs a way for the receiver to say:

> **"Slow down, I can't process data this fast."**

That's **Flow Control**.
---
# How Does TCP Do This?
Every TCP receiver has a **receive buffer**.

When packets arrive:

```plain text
Network
    │
    ▼
Receive Buffer
    │
    ▼
Application reads data
```

If the application is reading data quickly, the buffer stays mostly empty.

If the application is slow, the buffer starts filling up.
---
## Receiver Advertises Available Space
Along with every ACK, the receiver tells the sender:

> **"This much space is still available in my buffer."**

This is called the **Receive Window (rwnd)**.

Example:

```plain text
Receiver

Buffer Size = 100 KB

Free Space = 80 KB

ACK
Receive Window = 80 KB
```

The sender now knows:

> "I should not send more than 80 KB before waiting for more acknowledgments."
---
## What if the Buffer Becomes Full?
Suppose:

```plain text
Buffer Size = 100 KB

Free Space = 0 KB
```

The receiver sends:

```plain text
ACK
Receive Window = 0
```

Meaning:

> **"Stop sending. My buffer is full."**

The sender pauses.

Later, when the application processes some data, the receiver sends another update:

```plain text
Receive Window = 40 KB
```

Now the sender resumes sending.
---
# Real-Life Analogy
Imagine you're filling bottles with water.

You (sender) can pour very fast.

Your friend (receiver) can only cap one bottle every few seconds.

If you keep pouring, bottles overflow.

So your friend says:

> "Wait... let me finish these first."

That's exactly what **Flow Control** is.
---
# Interview Notes
### Flow Control
- Prevents the **sender from overwhelming the receiver**.
- TCP uses the **Receive Window (rwnd)** to tell the sender how much data it can currently accept.
- If the receiver's buffer is full, it advertises a **window size of 0**, causing the sender to pause until space becomes available.
---
# Important Difference
Many interviewers ask this:

<table header-row="true">
<tr>
<td>Flow Control</td>
<td>Congestion Control</td>
</tr>
<tr>
<td>Protects the **receiver**.</td>
<td>Protects the **network**.</td>
</tr>
<tr>
<td>Receiver says "I can't process data this fast."</td>
<td>Network says "Too much traffic is causing congestion."</td>
</tr>
<tr>
<td>Uses the **Receive Window (rwnd)**.</td>
<td>Uses algorithms like **Slow Start** and the **Congestion Window (cwnd)**.</td>
</tr>
</table>

You don't need to memorize `rwnd` and `cwnd` in depth, but it's useful to know that **they are different concepts**.
---
## Next Topic: Congestion Control
Now we'll answer a different question:

> **What if the receiver is fast enough, but the network itself is overloaded?**

Perfect.

This is the **last major TCP topic**.

If you understand the difference between **Flow Control** and **Congestion Control**, you're already ahead of many interview candidates.
---
# Congestion Control
## Why Do We Need Congestion Control?
Imagine a highway.

Normally:

```plain text
🚗 🚗 🚗 🚗
```

Traffic moves smoothly.

Now imagine thousands of cars enter the highway at once.

```plain text
🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗
```

The highway becomes congested.

Cars slow down.

Some cars can't move.

The internet works similarly.

Instead of cars, we have **packets**.

Instead of highways, we have **routers and network links**.

If millions of devices send data too quickly, routers become overloaded and start dropping packets.

TCP tries to prevent this.
---
# What is Congestion Control?
Congestion Control is a mechanism that prevents **overloading the network** by adjusting how fast the sender transmits data.

Notice the difference:

- **Flow Control** → "The receiver is slow."
- **Congestion Control** → "The network is busy."
---
# How does TCP know the network is congested?
TCP cannot directly ask routers:

> "Are you congested?"

Instead, it **infers** congestion.

Signs include:

- Packets are lost.
- ACKs arrive very late.
- Duplicate ACKs increase.

TCP assumes:

> "The network is probably congested."
---
# What does TCP do?
It **reduces its sending rate**.

Instead of sending:

```plain text
100 packets
```

It might reduce to:

```plain text
50 packets
```

or even fewer.

As the network recovers, TCP gradually increases the sending rate again.

This prevents making congestion even worse.
---
# High-Level Algorithms
For backend interviews, you only need to know the names and the idea.

### 1. Slow Start
When a TCP connection begins, it **doesn't know** how much traffic the network can handle.

So it starts by sending a **small amount of data**.

If everything is acknowledged successfully, it gradually increases the sending rate.

Think of entering a dark room:

> You don't sprint immediately—you take a few cautious steps first.
---
### 2. Congestion Avoidance
Once TCP reaches a reasonable speed, it stops increasing rapidly.

Instead, it increases the sending rate **slowly and carefully**.

This avoids suddenly overloading the network.
---
### 3. Packet Loss
If TCP detects packet loss (through timeout or duplicate ACKs), it assumes congestion.

It reduces the sending rate and starts increasing it again cautiously.
---
# Real-Life Example
Imagine 10,000 people trying to stream a cricket match at the same time.

If every device transmitted at maximum speed:

- Routers would become overloaded.
- Packets would be dropped.
- Everyone's experience would degrade.

TCP automatically slows down the sending rate to help keep the network stable.
---
# Flow Control vs Congestion Control

<table header-row="true">
<tr>
<td>Flow Control</td>
<td>Congestion Control</td>
</tr>
<tr>
<td>Protects the **receiver**.</td>
<td>Protects the **network**.</td>
</tr>
<tr>
<td>Receiver's processing speed is the concern.</td>
<td>Router/network capacity is the concern.</td>
</tr>
<tr>
<td>Receiver tells the sender how much it can accept.</td>
<td>Sender adjusts its rate based on signs of congestion.</td>
</tr>
</table>
---
# Interview Notes
### Congestion Control
- Prevents overloading the network.
- TCP detects congestion indirectly (packet loss, timeouts, duplicate ACKs).
- When congestion is detected, TCP reduces its sending rate.
- As the network becomes less congested, TCP gradually increases the sending rate again.
- Common algorithms include **Slow Start** and **Congestion Avoidance**.
---
---
# Sliding Window
## First, think about this.
Suppose TCP worked like this:

```plain text
Sender ---> Packet 1

(wait...)

Receiver ---> ACK

(wait...)

Sender ---> Packet 2

(wait...)

Receiver ---> ACK
```

So for every packet, the sender waits for an ACK before sending the next one.

### What's the problem?
The network is mostly idle.

Example:

```plain text
Send Packet 1  → 10 ms

ACK comes back → 90 ms

Total = 100 ms
```

For 90 ms, the sender is doing **nothing**.

This is very inefficient.
---
# So what's the solution?
Instead of waiting after every packet, TCP says:

> **"I'll send multiple packets first, then wait for ACKs."**

Example:

```plain text
Sender
│
├── Packet 1
├── Packet 2
├── Packet 3
├── Packet 4
│
└── Wait for ACK
```

Now the network is being used much more efficiently.
---
# What is the "Window"?
The **window** is simply:

> **The amount of unacknowledged data the sender is allowed to send at a time.**

For example, suppose the window size is **4 packets**.

The sender can send:

```plain text
Packet 1
Packet 2
Packet 3
Packet 4
```

without waiting.
---
# Why is it called "Sliding"?
Imagine this.

Initially:

```plain text
Can Send

[1][2][3][4]
```

After the receiver acknowledges Packet 1:

```plain text
ACK = 2
```

Now the sender is allowed to send one more packet.

The window moves forward.

```plain text
Can Send

[2][3][4][5]
```

Then ACK for Packet 2 arrives.

```plain text
[3][4][5][6]
```

The window keeps **sliding forward**, which is why it's called a **Sliding Window**.
---
# Visual Example
Window size = 4

```plain text
Initial Window

[1][2][3][4]
           ^
Maximum packet that can be sent
```

Receiver acknowledges Packet 1.

Now:

```plain text
[2][3][4][5]
```

Receiver acknowledges Packet 2.

Now:

```plain text
[3][4][5][6]
```

The sender is always allowed to keep sending as acknowledgments arrive.
---
# Why is this faster?
Without Sliding Window:

```plain text
Packet 1
↓

Wait

↓

Packet 2

↓

Wait

↓

Packet 3
```

With Sliding Window:

```plain text
Packet 1
Packet 2
Packet 3
Packet 4

↓

ACKs arrive

↓

Packet 5
Packet 6
Packet 7
```

Much less waiting.

Much better utilization of the network.
---
# Connection with Flow Control
Remember **Receive Window (rwnd)**?

The receiver tells the sender:

> "You can have at most **this much unacknowledged data**."

That information is used to determine how large the sender's sliding window can be.

So:

- **Flow Control** decides **how big the window can be** (based on the receiver's capacity).
- **Sliding Window** is the mechanism that uses that window to send multiple packets efficiently.
---
# Interview Notes
### Sliding Window
- A TCP mechanism that allows the sender to transmit multiple packets before receiving acknowledgments.
- The **window** represents the maximum amount of unacknowledged data that can be in transit.
- As ACKs arrive, the window **slides forward**, allowing more data to be sent.
- Improves network utilization and overall throughput by reducing unnecessary waiting.
---
## One interview question
**Q: Is Sliding Window used for reliability or performance?**

**Answer:** Both.

- It improves **performance** by allowing multiple packets to be in flight.
- Combined with ACKs and retransmissions, it also supports **reliable** data transfer.
---
---
# Four-Way Termination
## Why Do We Need It?
Suppose you've finished downloading a file.

Should the TCP connection remain open forever?

No.

Keeping unnecessary connections open wastes:

- Memory
- CPU resources
- Network resources

So TCP needs a proper way to **close the connection**.
---
# Why 4 steps? Why not 3?
This is the first thing to understand.

Remember:

**TCP is Full-Duplex.**

That means:

- Client → Server can send data.
- Server → Client can also send data.

These are **independent**.

So one side may finish sending data while the other still has data left.

Therefore, **each direction is closed separately**.

That's why we usually need **4 packets**.
---
# Step 1 - FIN
Suppose the client has finished sending data.

It sends:

```plain text
Client -----------------> Server
          FIN
```

Meaning:

> "I'm done sending data."

Notice:

The client is **not disconnecting completely**.

It is only saying:

> "I won't send anything else."

It can still receive data from the server.
---
# Step 2 - ACK
The server replies:

```plain text
Server -----------------> Client
          ACK
```

Meaning:

> "I received your FIN."

At this point:

```plain text
Client ----X----> Server   (closed)

Server ---------> Client   (still open)
```

The server can still send any remaining data.
---
# Step 3 - FIN
Once the server has finished sending its own data, it sends:

```plain text
Server -----------------> Client
          FIN
```

Meaning:

> "Now I'm also done."
---
# Step 4 - ACK
The client replies:

```plain text
Client -----------------> Server
          ACK
```

Meaning:

> "I received your FIN."

Now both directions are closed.

The TCP connection is terminated.
---
# Complete Flow

```plain text
Client                          Server

FIN  --------------------------->

      <------------------------ ACK

      <------------------------ FIN

ACK  --------------------------->
```

Connection closed.
---
# Why not just send one "Close" packet?
Imagine this situation:

```plain text
Client → Finished uploading

Server → Still generating a response
```

If the connection closed immediately:

The server would never be able to send the response.

That's why TCP allows **half-close**.

One side can stop sending while still receiving data.
---
# Real-Life Analogy
Imagine a phone call.

You say:

> "I've told you everything."

Your friend replies:

> "Okay, but let me tell you one last thing."

After they finish:

> "I'm done."

You reply:

> "Got it. Bye."

That's exactly what TCP termination does.
---
# Interview Notes
### Four-Way Termination
- Used to gracefully close a TCP connection.
- Since TCP is **full-duplex**, each direction is closed independently.
- Steps:
	1. **FIN** → Sender indicates it has finished sending data.
	2. **ACK** → Receiver acknowledges the FIN.
	3. **FIN** → Receiver finishes sending its data and sends its own FIN.
	4. **ACK** → Original sender acknowledges the FIN.

After the final ACK, the TCP connection is closed.
---
# Interview Question
### Why does TCP use a 3-way handshake but a 4-way termination?
**Three-Way Handshake:**

- Both sides become ready to communicate at the same time, so SYN and ACK can be combined into a single packet (`SYN + ACK`).

**Four-Way Termination:**

- Each side may finish sending data at different times because TCP is full-duplex.
- Therefore, each direction must be closed separately, resulting in four packets (`FIN`, `ACK`, `FIN`, `ACK`).
---
---
