---
title: "ARP"
slug: "arp"
description: "How local networks resolve IP addresses to hardware addresses."
track: "Computer Networks"
---

ARP (Address Resolution Protocol) maps an IP address to a MAC address on a local network.

## Why ARP Is Needed

IP addresses identify devices logically, but Ethernet frames on a LAN are delivered using MAC addresses.

Your laptop may know:

```text
Destination IP: 192.168.1.20
Destination MAC: unknown
```

ARP finds the missing MAC address.

## MAC Address

A MAC address is a hardware identifier for a network interface.

```text
IP : 192.168.1.20
MAC: 00:1A:2B:3C:4D:5E
```

## ARP Request

If the mapping is not in the ARP cache, the sender broadcasts:

```text
Who has 192.168.1.20?
Tell 192.168.1.10
```

Broadcast MAC:

```text
FF:FF:FF:FF:FF:FF
```

Every device on the LAN receives it, but only the matching device replies.

## ARP Reply

The matching device sends back:

```text
192.168.1.20 is 00:1A:2B:3C:4D:5E
```

The reply is usually unicast.

## ARP Cache

The sender stores the result:

```text
192.168.1.20 -> 00:1A:2B:3C:4D:5E
```

Future packets can use the cached mapping until it expires.

## ARP Works Only Locally

Your laptop does not ARP for Google's MAC address. If Google is outside your network, your laptop ARPs for the default gateway's MAC address and sends the frame to the router.

## ARP vs DNS

| DNS | ARP |
| --- | --- |
| Domain -> IP | IP -> MAC |
| Works across networks | Works on local network |
| Example: google.com -> IP | Example: 192.168.1.1 -> MAC |

## Interview Notes

- ARP maps IP addresses to MAC addresses.
- ARP request is broadcast.
- ARP reply is usually unicast.
- ARP cache reduces repeated broadcasts.
- ARP does not use TCP or UDP.
