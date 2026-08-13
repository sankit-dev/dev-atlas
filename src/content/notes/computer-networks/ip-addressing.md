---
title: "IP Addressing"
slug: "ip-addressing"
description: "What an IP address is and how it identifies devices on a network."
track: "Computer Networks"
---

# IP Addressing

Before learning subnet masks, CIDR, routers, NAT, or DHCP, first understand the core question:

> **How does a packet know where to go?**

The answer starts with an **IP address**.

---

# Why do we need an IP Address?

Imagine you want to send a parcel.

Can the delivery company deliver it if the parcel only says:

```plain text
To:
John
```

No.

There could be thousands of people named John.

You need a proper address.

Computers are the same.

If your laptop wants to send data to Google, it needs to know **which device** on the internet should receive it.

That is why devices on a network use **IP addresses**.

---

# What is an IP Address?

An **IP address** is a logical address assigned to a device on a network.

It helps identify:

- **Source IP**: who is sending the data
- **Destination IP**: who should receive the data

Example:

```plain text
Your Laptop
IP: 192.168.1.20

↓

Google Server
IP: 142.250.xxx.xxx
```

When your laptop sends a packet, the packet contains:

```plain text
Source IP      : 192.168.1.20
Destination IP : 142.250.xxx.xxx
```

Routers read the destination IP and forward the packet toward the correct network.

---

# IPv4 Structure

The most common IP format you see is **IPv4**.

Example:

```plain text
192.168.1.20
```

It has:

- 4 numbers
- Dots between them
- Each number ranges from 0 to 255

Each number is called an **octet**.

```plain text
192 . 168 . 1 . 20
```

Each octet is 8 bits.

So IPv4 is:

```plain text
4 octets × 8 bits = 32 bits
```

---

# Why does each octet go from 0 to 255?

Because each octet is 8 bits.

An 8-bit binary number can represent:

```plain text
00000000 = 0
11111111 = 255
```

So each part of an IPv4 address has a valid range of `0` to `255`.

---

# IP Address vs MAC Address

Do not confuse IP address and MAC address.

<table header-row="true">
<tr>
<td>IP Address</td>
<td>MAC Address</td>
</tr>
<tr>
<td>Logical address</td>
<td>Hardware address</td>
</tr>
<tr>
<td>Used across networks</td>
<td>Used inside the local network</td>
</tr>
<tr>
<td>Can change</td>
<td>Usually fixed to the network interface</td>
</tr>
</table>

For now, remember:

> **IP tells us where the device is in the network. MAC helps with local delivery inside one network.**

---

# What comes under IP Addressing?

IP addressing becomes easier if you learn it as a tree:

```plain text
IP Addressing
├── Network ID & Host ID
├── Subnet Mask
├── CIDR
├── Public vs Private IP
├── Router & Default Gateway
├── NAT
└── DHCP
```

Each child topic answers one specific question.

Start with **Network ID & Host ID**, because subnet masks and CIDR depend on that idea.

---

# Interview Answer

If an interviewer asks:

> **What is an IP address?**

You can answer:

An IP address is a logical address assigned to a device on a network. It identifies the source and destination of network packets. Routers use destination IP addresses to forward packets across networks. IPv4 addresses are 32-bit addresses written as four octets, such as `192.168.1.20`.
