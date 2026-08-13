---
title: "CIDR"
slug: "cidr"
description: "The slash notation used to describe network size, such as /24."
track: "Computer Networks"
---

# CIDR

CIDR stands for **Classless Inter-Domain Routing**.

In simple words, CIDR is a shorter way to write subnet information.

Instead of writing:

```plain text
IP Address  : 192.168.1.10
Subnet Mask : 255.255.255.0
```

we can write:

```plain text
192.168.1.10/24
```

The `/24` is the CIDR prefix.

---

# What does /24 mean?

IPv4 has 32 bits.

`/24` means:

```plain text
First 24 bits  → Network part
Remaining 8    → Host part
```

So:

```plain text
192.168.1.10/24
```

usually means:

```plain text
Network: 192.168.1.0
Host   : 10
```

---

# Common CIDR Values

<table header-row="true">
<tr>
<td>CIDR</td>
<td>Subnet Mask</td>
<td>Simple Meaning</td>
</tr>
<tr>
<td>/24</td>
<td>255.255.255.0</td>
<td>Common home/local network size</td>
</tr>
<tr>
<td>/16</td>
<td>255.255.0.0</td>
<td>Larger private network</td>
</tr>
<tr>
<td>/8</td>
<td>255.0.0.0</td>
<td>Very large network</td>
</tr>
<tr>
<td>/32</td>
<td>255.255.255.255</td>
<td>One exact IP address</td>
</tr>
</table>

---

# Why is CIDR useful?

CIDR makes it easier to describe network ranges.

Example:

```plain text
192.168.1.0/24
```

This represents the network:

```plain text
192.168.1.0 to 192.168.1.255
```

In practice, not every address is usable by a device because some addresses are reserved for network and broadcast purposes.

---

# Interview Answer

If an interviewer asks:

> **What is CIDR?**

You can answer:

CIDR is slash notation used to describe how many bits of an IP address belong to the network part. For example, `192.168.1.10/24` means the first 24 bits are the network part and the remaining 8 bits are the host part. It is a compact way to represent subnet masks and network ranges.
