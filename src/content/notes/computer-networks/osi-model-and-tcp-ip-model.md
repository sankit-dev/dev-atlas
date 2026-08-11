---
title: "OSI Model & TCP/IP Model"
slug: "osi-model-and-tcp-ip-model"
description: "Why networking layers exist, OSI vs TCP/IP, and which layers backend engineers touch."
track: "Computer Networks"
---

The OSI model is mainly a learning model. The TCP/IP model is what the Internet actually uses.

We study both because OSI gives useful vocabulary, while TCP/IP maps more directly to real systems.

## Why Networking Layers Exist

Without layers, one program would need to:

- Format HTTP requests.
- Establish TCP connections.
- Handle retransmission.
- Find destination IP addresses.
- Route packets.
- Send bits over Wi-Fi or Ethernet.

Layers split these responsibilities. Each layer does one job and passes data to the next layer.

## OSI Model

```text
7. Application
6. Presentation
5. Session
4. Transport
3. Network
2. Data Link
1. Physical
```

Backend engineers mostly discuss Application, Transport, and Network layers. The lower layers are usually handled by operating systems, drivers, switches, routers, and hardware.

## TCP/IP Model

```text
Application
Transport
Internet
Network Access
```

## OSI vs TCP/IP

| OSI | TCP/IP |
| --- | --- |
| Application, Presentation, Session | Application |
| Transport | Transport |
| Network | Internet |
| Data Link, Physical | Network Access |

## Application Layer

This is where applications define how data is formatted and exchanged.

Common protocols:

- HTTP
- HTTPS
- DNS
- WebSocket
- SMTP
- FTP

Backend work happens here daily: REST APIs, headers, cookies, authentication, JSON, GraphQL, and WebSockets.

## Transport Layer

Responsible for end-to-end communication between applications.

Common protocols:

- TCP: reliable, ordered, connection-oriented.
- UDP: fast, connectionless, no delivery guarantee.

Ports also belong to this layer.

## Internet Layer

Responsible for getting packets from one device to another across networks.

Main protocol:

- IP

Backend engineers touch this indirectly through client IPs, CIDR, firewalls, load balancers, reverse proxies, and private networks.

## Network Access Layer

Responsible for sending frames over the physical or wireless network.

Examples:

- Ethernet
- Wi-Fi
- MAC addresses

## Encapsulation

As data moves down the stack, each layer adds its own header.

```text
HTTP data
[TCP header][HTTP data]
[IP header][TCP header][HTTP data]
[Ethernet header][IP header][TCP header][HTTP data]
```

At the receiver, decapsulation removes those headers in reverse order.

## Interview Notes

- OSI has 7 conceptual layers.
- TCP/IP has 4 practical layers.
- HTTP, HTTPS, DNS, and WebSocket are Application Layer protocols.
- TCP and UDP are Transport Layer protocols.
- IP belongs to the Internet Layer.
- Encapsulation adds headers while data moves down the stack.
