---
title: "ARP"
slug: "arp"
description: "How local networks resolve IP addresses to hardware addresses."
track: "Computer Networks"
---

# ARP (Address Resolution Protocol)
## Why do we need ARP?
We know that every device has an **IP address**.

Example:

```plain text
Laptop
IP: 192.168.1.10
```

```plain text
Router
IP: 192.168.1.1
```

But computers don't send Ethernet frames using IP addresses.

On a local network (LAN), devices communicate using **MAC addresses**.

So a computer often knows:

```plain text
Destination IP:
192.168.1.20
```

But it doesn't know:

```plain text
Destination MAC:
??
```

That's the problem ARP solves.

> **ARP maps an IP address to its corresponding MAC address on a local network.**
---
# What is a MAC Address?
A **MAC (Media Access Control) address** is a unique hardware identifier assigned to a network interface card (NIC).

Example:

```plain text
IP Address:
192.168.1.20

MAC Address:
00:1A:2B:3C:4D:5E
```

Think of it like:

- IP Address → House address (can change depending on the network)
- MAC Address → Person's unique identity card for that network interface
---
# Why isn't the IP address enough?
Suppose your laptop wants to send data.

```plain text
Laptop

↓

Destination IP:
192.168.1.20
```

When the packet reaches the Data Link Layer (Ethernet), it must be placed inside an Ethernet frame.

That frame requires:

```plain text
Destination MAC
```

Without the MAC address, the frame cannot be delivered on the local network.
---
# ARP Request
Suppose:

```plain text
Laptop

IP:
192.168.1.10

MAC:
AA-AA-AA-AA-AA-AA
```

Needs to send data to:

```plain text
192.168.1.20
```

It checks its ARP cache.

```plain text
192.168.1.20

↓

Not Found
```

So it broadcasts an ARP request.
---
## ARP Request
The laptop sends:

```plain text
Who has 192.168.1.20?

Tell 192.168.1.10
```

This is sent as a **broadcast**.

Broadcast MAC:

```plain text
FF:FF:FF:FF:FF:FF
```

Meaning:

> Every device on this local network, please listen.
---
# Every Device Receives It
Imagine the LAN:

```plain text
Laptop

↓

Broadcast

↓

PC1

PC2

Printer

Router

Phone
```

Every device receives the request.

Each device checks:

```plain text
Is my IP 192.168.1.20?
```

Most devices answer:

```plain text
No.

```

One device answers:

```plain text
Yes.

```
---
# ARP Reply
The matching device responds:

```plain text
192.168.1.20

is

00:1A:2B:3C:4D:5E
```

Unlike the request, this reply is usually **unicast** (sent only to the requester).
---
# ARP Cache
The laptop stores the mapping.

```plain text
ARP Cache

192.168.1.20

↓

00:1A:2B:3C:4D:5E
```

Now future packets don't need another ARP request until the cache entry expires.
---
# Complete ARP Flow

```plain text
Laptop wants to send data
        │
        ▼
Knows destination IP
        │
        ▼
Checks ARP Cache
        │
        ├── Found
        │      │
        │      ▼
        │  Send Ethernet Frame
        │
        ▼
Not Found
        │
        ▼
Broadcast ARP Request
        │
        ▼
Destination replies with MAC
        │
        ▼
Store in ARP Cache
        │
        ▼
Send Data
```
---
# Example
Suppose:

```plain text
Laptop

IP:
192.168.1.10
```

Wants to reach:

```plain text
Web Server

IP:
192.168.1.20
```

Step 1:

```plain text
Need MAC for

192.168.1.20
```

Step 2:

```plain text
Broadcast

Who has 192.168.1.20?
```

Step 3:

```plain text
Server replies

My MAC is

00:AB:CD:EF:12:34
```

Step 4:

```plain text
Laptop stores

192.168.1.20

↓

00:AB:CD:EF:12:34
```

Step 5:

Data transmission begins.
---
# Where Does ARP Work?
ARP works only on the **local network (LAN)**.

It cannot discover the MAC address of a device on another network.

Example:

```plain text
Your Laptop

↓

192.168.1.x

↓

Internet

↓

Google Server
```

Your laptop does **not** use ARP to find Google's MAC address.

Instead, it uses ARP to find the **MAC address of its default gateway (router)**.

The router then forwards the packet towards its destination.
---
# ARP vs DNS
Many beginners confuse these.

<table header-row="true">
<tr>
<td>DNS</td>
<td>ARP</td>
</tr>
<tr>
<td>Domain → IP</td>
<td>IP → MAC</td>
</tr>
<tr>
<td>Works across networks</td>
<td>Works only on the local network</td>
</tr>
<tr>
<td>Example: `google.com` → `142.x.x.x`</td>
<td>Example: `192.168.1.20` → `00:1A:2B:3C:4D:5E`</td>
</tr>
</table>
---
# ARP Cache
Operating systems maintain an ARP cache to avoid broadcasting for every packet.

Example:

```plain text
IP Address          MAC Address

192.168.1.1         11:22:33:44:55:66

192.168.1.20        00:1A:2B:3C:4D:5E
```

Entries expire after a period so that changes on the network can be discovered.
---
# Interview Questions
### Why do we need ARP?
Because Ethernet delivers frames using **MAC addresses**, while applications and IP routing use **IP addresses**.

ARP translates an IP address into a MAC address on the local network.
---
### Is ARP used on the internet?
**No.**

ARP is used only within a local network.

Across the internet, routers forward packets using IP routing.

Each router may use ARP on its own local network to communicate with the next hop.
---
### Is ARP a broadcast protocol?
- **ARP Request:** Yes, it is broadcast.
- **ARP Reply:** Usually unicast.
---
### Does ARP use TCP or UDP?
Neither.

ARP is its own protocol that operates at the boundary of the **Data Link Layer (Layer 2)** and **Network Layer (Layer 3)**.

It does not use TCP or UDP.
---
# Notion Notes (Short Version)
### ARP (Address Resolution Protocol)
- Maps an **IP address** to a **MAC address** on a local network.
- Required because Ethernet frames are delivered using MAC addresses.

### ARP Request
- Sent as a **broadcast** (`FF:FF:FF:FF:FF:FF`).
- Asks: *"Who has this IP address?"*

### ARP Reply
- Sent as a **unicast** response.
- Returns the MAC address associated with the requested IP.

### ARP Cache
- Stores recently resolved IP → MAC mappings.
- Reduces unnecessary ARP broadcasts.

### Key Points
- Works only on a **LAN**.
- Does **not** use TCP or UDP.
- If the destination is on another network, the host resolves the **router's MAC address**, not the remote host's MAC address.
