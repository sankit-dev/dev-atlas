---
title: "NAT"
slug: "nat"
description: "How many private devices share one public IP address."
track: "Computer Networks"
---

# NAT

NAT stands for **Network Address Translation**.

It solves an important problem:

> **How can many private devices access the internet using one public IP?**

---

# Why do we need NAT?

At home, many devices may use private IPs:

```plain text
Laptop : 192.168.1.10
Phone  : 192.168.1.11
TV     : 192.168.1.12
```

But your internet provider usually gives your router one public IP.

So when all these devices access the internet, the outside world usually sees:

```plain text
Router Public IP
```

not each private device IP.

NAT makes this possible.

---

# What does NAT do?

When your laptop sends a request to the internet:

```plain text
192.168.1.10 → google.com
```

the router changes the source address.

```plain text
Before NAT:
Source IP = 192.168.1.10

After NAT:
Source IP = Router's Public IP
```

When the reply comes back, the router remembers which private device made the request and forwards the reply to that device.

---

# NAT Translation Table

The router keeps a temporary table.

Example:

```plain text
Private Device        Public Mapping
192.168.1.10:51510 → 49.x.x.x:60001
192.168.1.11:51511 → 49.x.x.x:60002
```

This helps the router know where to send replies.

---

# Simple Flow

```plain text
Laptop
192.168.1.10

↓

Router performs NAT
Private IP becomes Public IP

↓

Internet Server
```

Reply:

```plain text
Internet Server

↓

Router checks NAT table

↓

Laptop
192.168.1.10
```

---

# Interview Answer

If an interviewer asks:

> **Why is NAT needed?**

You can answer:

NAT allows multiple private devices inside a local network to access the internet using a shared public IP address. The router translates private source IPs into its public IP and keeps a translation table so replies can be sent back to the correct internal device.
