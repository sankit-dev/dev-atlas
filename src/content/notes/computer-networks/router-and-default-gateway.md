---
title: "Router & Default Gateway"
slug: "router-and-default-gateway"
description: "How traffic leaves your local network."
track: "Computer Networks"
---

# Router & Default Gateway

Once you understand private IPs, the next question is:

> **How does your laptop talk to a server outside your home network?**

That is where the router and default gateway come in.

---

# What is a Router?

A **router** connects different networks.

At home, your router connects:

```plain text
Your local Wi-Fi network
↓
Internet provider network
↓
Internet
```

Inside your home, devices talk using private IPs.

To reach the internet, they send traffic to the router.

---

# What is a Default Gateway?

A **default gateway** is the device your computer sends traffic to when the destination is outside the local network.

In most home networks:

```plain text
Default Gateway = Router IP
```

Example:

```plain text
Laptop IP       : 192.168.1.10
Default Gateway : 192.168.1.1
```

If the laptop wants to reach:

```plain text
8.8.8.8
```

that destination is not inside `192.168.1.0/24`.

So the laptop sends the packet to:

```plain text
192.168.1.1
```

which is the router.

---

# Simple Flow

```plain text
Laptop
192.168.1.10

↓ sends to default gateway

Router
192.168.1.1

↓ forwards toward internet

Google DNS
8.8.8.8
```

---

# Router vs Default Gateway

<table header-row="true">
<tr>
<td>Router</td>
<td>Default Gateway</td>
</tr>
<tr>
<td>A device that connects networks</td>
<td>The router address your device uses to leave the local network</td>
</tr>
<tr>
<td>Physical or virtual network device</td>
<td>A configuration value on your machine</td>
</tr>
</table>

---

# Interview Answer

If an interviewer asks:

> **What is a default gateway?**

You can answer:

A default gateway is the router address a device uses when it needs to send traffic outside its local network. If the destination IP is not in the local subnet, the device sends the packet to the default gateway, which forwards it toward another network.
