---
title: "Subnet Mask"
slug: "subnet-mask"
description: "How devices know which part of an IP address is the network part."
track: "Computer Networks"
---

# Subnet Mask

Before understanding subnet masks, remember this:

An IP address has:

- Network part
- Host part

The subnet mask tells the computer **where that split is**.

---

# What does a Subnet Mask do?

A **subnet mask** tells which part of the IP address represents the network.

Example:

```plain text
IP Address  : 192.168.1.10
Subnet Mask : 255.255.255.0
```

This usually means:

```plain text
192.168.1 | 10
─────────   ──
 Network    Host
```

So devices from `192.168.1.1` to `192.168.1.254` are usually in the same local network.

---

# Why is it called a Mask?

Because it hides the host part and keeps the network part visible.

Think of the mask as saying:

```plain text
255 → this part belongs to the network
0   → this part belongs to the host
```

For:

```plain text
255.255.255.0
```

the first three octets are the network part.

The last octet is the host part.

---

# Same Network Example

```plain text
Device A
IP:   192.168.1.10
Mask: 255.255.255.0

Device B
IP:   192.168.1.20
Mask: 255.255.255.0
```

Both share:

```plain text
192.168.1
```

So they are on the same network.

---

# Different Network Example

```plain text
Device A: 192.168.1.10
Device B: 192.168.2.20
Mask    : 255.255.255.0
```

Device A belongs to:

```plain text
192.168.1.0
```

Device B belongs to:

```plain text
192.168.2.0
```

They are on different networks.

To communicate, traffic must go through a router.

---

# Interview Answer

If an interviewer asks:

> **What is a subnet mask?**

You can answer:

A subnet mask tells a device which part of an IP address is the network part and which part is the host part. It is used to decide whether a destination IP is inside the local network or must be sent to a router.
