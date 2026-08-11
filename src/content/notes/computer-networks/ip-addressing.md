---
title: "IP Addressing"
slug: "ip-addressing"
description: "IPv4, subnet masks, CIDR, gateway, router, DHCP, and public/private IPs."
track: "Computer Networks"
---

An IP address is a logical address assigned to a device on a network. Routers use IP addresses to move packets toward the correct destination.

## IPv4

IPv4 uses 32 bits, written as four octets.

```text
192.168.1.20
```

Each octet is 8 bits, so each number ranges from 0 to 255.

## Network ID and Host ID

An IPv4 address has two parts:

- Network ID: which network?
- Host ID: which device on that network?

With:

```text
IP Address : 192.168.1.25
Subnet Mask: 255.255.255.0
```

The network is `192.168.1.0` and the host portion is `25`.

## Subnet Mask

The subnet mask decides where the network part ends and the host part begins.

```text
255.255.255.0
11111111.11111111.11111111.00000000
```

The 1 bits identify the network portion. The 0 bits identify the host portion.

## CIDR

CIDR is shorthand for the subnet mask.

| CIDR | Subnet Mask |
| --- | --- |
| /8 | 255.0.0.0 |
| /16 | 255.255.0.0 |
| /24 | 255.255.255.0 |

`192.168.1.25/24` means the first 24 bits are the network part.

## Public vs Private IP

Private IPs are used inside local networks and are not routed across the public Internet.

Common private ranges:

- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

Public IPs are globally unique and reachable over the Internet.

## Router and Default Gateway

A router connects different networks. If a destination is outside the local network, your device sends the packet to the default gateway, which is usually the router.

```text
Laptop -> Default Gateway -> Internet -> Destination
```

## NAT

NAT allows devices with private IPs to communicate with the public Internet. The router replaces the private source IP with its public IP and tracks the mapping using ports.

```text
Before NAT: 192.168.1.10 -> google.com
After NAT : 49.x.x.x     -> google.com
```

When the response returns, the router uses its translation table to forward it back to the correct private device.

## DHCP

DHCP automatically gives devices their network settings when they join a network:

- IP address.
- Subnet mask.
- Default gateway.
- DNS server.
- Lease time.

In home networks, the router usually acts as the DHCP server.

## Interview Notes

- IP identifies a device logically on a network.
- IPv4 is 32 bits.
- A subnet mask separates network ID from host ID.
- CIDR is shorthand for subnet mask length.
- Private IPs are reused inside LANs.
- NAT lets private IP devices access the Internet.
- DHCP assigns network configuration automatically.
