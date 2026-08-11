---
title: "Ports"
slug: "ports"
description: "How network services share one machine through numbered ports."
track: "Computer Networks"
---

A port is a logical endpoint that identifies a process or service on a device.

IP address identifies the device. Port identifies the application on that device.

## Why Ports Are Needed

A server may run many services on one IP:

```text
192.168.1.10:80   -> HTTP
192.168.1.10:22   -> SSH
192.168.1.10:5432 -> PostgreSQL
```

The operating system uses the destination port to deliver data to the right process.

## IP vs Port

| IP Address | Port |
| --- | --- |
| Identifies device | Identifies service/process |
| Network layer | Transport layer |
| Example: 192.168.1.5 | Example: 443 |

## Port Range

Ports are 16-bit numbers:

```text
0 - 65535
```

## Port Categories

| Range | Name | Use |
| --- | --- | --- |
| 0-1023 | Well-known | Standard services |
| 1024-49151 | Registered | Application services |
| 49152-65535 | Dynamic/ephemeral | Temporary client ports |

## Common Ports

| Port | Service |
| --- | --- |
| 20/21 | FTP |
| 22 | SSH |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 8080 | Alternative HTTP/dev |
| 27017 | MongoDB |

## Client Port vs Server Port

When you visit HTTPS:

```text
Client: 192.168.1.15:54821
Server: 203.0.113.10:443
```

The server listens on a known port. The client uses an ephemeral port chosen by the OS.

## Socket 5-Tuple

A TCP connection is identified by:

- Source IP.
- Source port.
- Destination IP.
- Destination port.
- Protocol.

## Interview Notes

- Ports belong to TCP/UDP at the transport layer.
- Only one process can bind the same IP + port + protocol combination at a time.
- TCP and UDP have separate port spaces.
- `localhost:3000` means `127.0.0.1` on port `3000`.
