---
title: "DHCP"
slug: "dhcp"
description: "How devices automatically receive IP configuration."
track: "Computer Networks"
---

# DHCP

DHCP stands for **Dynamic Host Configuration Protocol**.

It automatically gives network configuration to devices.

Without DHCP, you would manually configure:

- IP address
- Subnet mask
- Default gateway
- DNS server

for every device.

That would be painful and error-prone.

---

# What does DHCP provide?

When your laptop joins Wi-Fi, DHCP usually provides:

- IP address
- Subnet mask
- Default gateway
- DNS server
- Lease time

Example:

```plain text
IP Address      : 192.168.1.25
Subnet Mask     : 255.255.255.0
Default Gateway : 192.168.1.1
DNS Server      : 8.8.8.8
Lease Time      : 24 hours
```

---

# Who is the DHCP Server?

In home networks, the router usually acts as the DHCP server.

When a new device joins Wi-Fi, it asks:

```plain text
Can someone give me network settings?
```

The router replies with available configuration.

---

# Simple DHCP Flow

```plain text
1. Device joins network
2. Device asks for IP configuration
3. DHCP server offers an IP address
4. Device accepts it
5. DHCP server confirms it
```

This process lets the device start communicating on the network automatically.

---

# What is Lease Time?

The IP address is usually not given forever.

It is given for a limited time called a **lease**.

Example:

```plain text
Lease Time: 24 hours
```

Before the lease expires, the device can renew it.

If the device leaves the network, the IP can later be reused.

---

# Interview Answer

If an interviewer asks:

> **What happens when your laptop connects to a new Wi-Fi network?**

You can answer:

The laptop uses DHCP to request network configuration. The DHCP server, usually the router, assigns an IP address, subnet mask, default gateway, DNS server, and lease time. After that, the laptop can communicate on the local network and access the internet through the default gateway.
