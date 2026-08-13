---
title: "Network ID & Host ID"
slug: "network-id-and-host-id"
description: "How an IP address is split into network and device parts."
track: "Computer Networks"
---

# Network ID & Host ID

An IP address has two logical parts:

- **Network ID**: which network the device belongs to
- **Host ID**: which device inside that network

Think of a home address:

```plain text
City      → Network
House No. → Host
```

The city tells you the area.

The house number tells you the exact house inside that area.

---

# Simple Example

Suppose two laptops are connected to the same Wi-Fi:

```plain text
Laptop A: 192.168.1.10
Laptop B: 192.168.1.20
```

Both start with:

```plain text
192.168.1
```

Only the last number changes.

In a common home network, you can think of it like this:

```plain text
192.168.1 | 10
─────────   ──
 Network    Host
```

So:

- `192.168.1` identifies the network
- `10` identifies the device inside that network

---

# Why do we need this split?

The split helps a device answer:

> **Is the destination on my local network, or do I need to send this to the router?**

Example:

```plain text
My IP        : 192.168.1.10
Destination : 192.168.1.20
```

Both are in the same network.

The device can send locally.

But:

```plain text
My IP        : 192.168.1.10
Destination : 8.8.8.8
```

This is outside the local network.

The device sends it to the **default gateway**, usually your router.

---

# Important Point

You cannot always tell the network and host parts just by looking at the IP address.

You need a **subnet mask** or **CIDR notation** to know the exact split.

Example:

```plain text
192.168.1.10/24
```

Here `/24` tells us how much of the address is the network part.

---

# Interview Answer

If an interviewer asks:

> **What are Network ID and Host ID?**

You can answer:

Network ID identifies the network a device belongs to. Host ID identifies the specific device inside that network. The subnet mask or CIDR prefix tells us where the IP address is split between network and host parts.
