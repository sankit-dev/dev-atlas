---
title: "IP Addressing"
slug: "ip-addressing"
description: "IPv4, subnet masks, CIDR, gateway, router, DHCP, and public/private IPs."
track: "Computer Networks"
---

> **"How does a packet know where to go?"**

To answer that, we first need to understand **what an IP address actually is**.
---
# IP Addressing
## Why do we need an IP Address?
Imagine you want to send a parcel.

Can the delivery company deliver it if the parcel only says:

```plain text
To:
John
```

No.

There could be thousands of people named John.

You need a complete address.

Computers are the same.

If your laptop wants to send data to Google, it needs to know **which device** on the Internet should receive it.

That's why every device on a network is identified by an **IP address**.
---
# What is an IP Address?
An **IP (Internet Protocol) address** is a unique logical address assigned to a device on a network.

Its purpose is to identify:

- **Who is sending the data?** (Source IP)
- **Who should receive the data?** (Destination IP)

Routers use these addresses to forward packets across networks.
---
## Example

```plain text
Your Laptop
IP: 192.168.1.20

↓

Google Server
IP: 142.250.xxx.xxx
```

When you visit Google, the packet contains something like:

```plain text
Source IP      : 192.168.1.20
Destination IP : 142.250.xxx.xxx
```

Each router reads the **destination IP** and forwards the packet toward the correct network.
---
# IPv4 Structure
The most common format you'll see is IPv4.

Example:

```plain text
192.168.1.20
```

It has:

- **4 numbers (octets)**.
- Each octet ranges from **0 to 255**.

```plain text
192
168
1
20
```

Each octet is **8 bits (1 byte)**.

So:

```plain text
4 octets × 8 bits = 32 bits
```

or

```plain text
4 bytes = 32 bits
```

This is a very common interview question.
---
# Why can each octet only go from 0 to 255?
Because one octet is **8 bits**.

An 8-bit binary number can represent:

```plain text
00000000 = 0

11111111 = 255
```

So each part of an IPv4 address has a valid range of **0–255**.
---
# Visual Representation

```plain text
192.168.1.20

| 192 | 168 | 1 | 20 |
   ↓      ↓    ↓    ↓
 8 bits 8 bits 8 bits 8 bits
```

Total:

```plain text
32 bits
```
---
# Interview Notes
### IP Address
- A unique logical address assigned to a device on a network.
- Used to identify the source and destination of data.
- Routers use IP addresses to forward packets.

### IPv4
- Consists of **32 bits (4 bytes)**.
- Written as **4 octets** separated by dots.
- Each octet is **8 bits**.
- Each octet ranges from **0 to 255**.

**Example:**

```plain text
192.168.1.20
```
---
## Don't confuse this
Many beginners confuse **IP address** with **MAC address**.

For now, remember:

- **IP address** → Identifies a device across networks (logical address).
- **MAC address** → Identifies the network interface on the local network (hardware address).

We'll study MAC addresses in more detail later when discussing ARP.
---
## Next Topic
Now comes one of the most important concepts in IP addressing:

> **Network ID and Host ID**

Once you understand that, topics like **Subnet Mask**, **CIDR**, and **Routing** become much easier because they all build on this idea.
---
# Network ID & Host ID
## First, let's ask a simple question.
Suppose two laptops are connected to the same Wi-Fi.

```plain text
Laptop A
IP: 192.168.1.10

Laptop B
IP: 192.168.1.20
```

Look carefully.

Both IP addresses start with:

```plain text
192.168.1
```

Only the last number is different.

Why?

Because:

- `192.168.1` identifies the **network**.
- `10` and `20` identify the individual **devices** on that network.

This is the idea behind **Network ID** and **Host ID**.
---
# Think of it like a city
Imagine this address:

```plain text
221B Baker Street
London
```

The address has two parts.

```plain text
London          → Which city?
221B Baker St.  → Which house?
```

Similarly, an IP address has two parts:

```plain text
Network ID → Which network?
Host ID    → Which device on that network?
```
---
# Example
Consider:

```plain text
192.168.1.25
```

Suppose the subnet mask is:

```plain text
255.255.255.0
```

(Don't worry about how we got this—we'll study subnet masks next.)

For now, just know that this means:

```plain text
192.168.1 | 25
─────────   ──
 Network    Host
```

So:

- **Network ID:** `192.168.1.0`
- **Host ID:** `25`

Every device on this network shares the same Network ID but has a different Host ID.

Example:

```plain text
192.168.1.10
192.168.1.20
192.168.1.35
192.168.1.99
```

All belong to the same network because they all have the same Network ID.
---
# Why do we need this?
Imagine you want to send data from:

```plain text
192.168.1.10
```

to

```plain text
192.168.1.25
```

Your computer first checks:

> "Are we on the same network?"

It compares the **Network ID**.

```plain text
192.168.1 ✅
192.168.1 ✅
```

Same network.

So it can communicate directly (using ARP to find the MAC address—we'll cover ARP later).
---
Now consider:

```plain text
192.168.1.10
```

sending to:

```plain text
10.0.0.5
```

Network IDs:

```plain text
192.168.1 ❌
10.0.0
```

Different networks.

Your computer now knows:

> "I can't reach this device directly. I need to send the packet to my router (default gateway)."

This is why the Network ID is so important.
---
# How do we know where the split is?
You might ask:

> "How did we know that `192.168.1` is the Network ID and `25` is the Host ID?"

Great question.

**The subnet mask decides that.**

That's why **Subnet Mask** is the very next topic.

Without a subnet mask, you **cannot determine** which part of an IP address is the network and which part is the host.
---
# Interview Notes
### Network ID & Host ID
- An IPv4 address is divided into two parts:
	- **Network ID** → Identifies the network.
	- **Host ID** → Identifies a specific device within that network.
- Devices on the same network share the same **Network ID** but have different **Host IDs**.
- The **Subnet Mask** determines where the Network ID ends and the Host ID begins.

**Example:**

```plain text
IP Address : 192.168.1.25
Subnet Mask: 255.255.255.0

Network ID : 192.168.1.0
Host ID    : 25
```
---
## One thing to remember
Right now, you don't need to understand **how** `255.255.255.0` gives us `192.168.1.0`.

We'll learn that in the next topic, **Subnet Mask**, and everything will click into place.
---
# Subnet Mask
## Why do we need a Subnet Mask?
Suppose I give you this IP:

```plain text
192.168.1.25
```

Can you tell me:

- Which part is the **Network ID**?
- Which part is the **Host ID**?

**No.**

The IP address alone doesn't tell you where the split happens.

That's why we need a **Subnet Mask**.
---
# What does a Subnet Mask do?
A Subnet Mask tells the computer:

> **"These bits belong to the Network ID, and these bits belong to the Host ID."**

Think of it as a divider.

For example:

```plain text
IP Address
192.168.1.25

Subnet Mask
255.255.255.0
```

This means:

```plain text
192.168.1 | 25
─────────   ──
 Network    Host
```

So:

- Network ID = **192.168.1.0**
- Host ID = **25**
---
# Another Example
Suppose:

```plain text
IP Address
10.0.15.8

Subnet Mask
255.255.0.0
```

Now the split changes.

```plain text
10.0 | 15.8
────   ────
Network Host
```

So:

- Network ID = **10.0.0.0**
- Host ID = **15.8**

Notice that **the IP address didn't change**.

Only the **Subnet Mask** changed, so the Network ID and Host ID changed.

This is why the subnet mask is important.
---
# Why is it called a "Mask"?
Think of putting a mask over part of the IP address.

The mask says:

```plain text
Keep these bits (Network)

Ignore these bits (Host)
```

It "masks" the host portion when identifying the network.
---
# But why 255?
This is where a tiny bit of binary helps.

Remember:

Each octet is **8 bits**.

```plain text
255

↓

11111111
```

All 1s means:

> "This entire octet belongs to the Network ID."

Similarly:

```plain text
0

↓

00000000
```

All 0s means:

> "This entire octet belongs to the Host ID."

So:

```plain text
255.255.255.0
```

means:

```plain text
11111111.11111111.11111111.00000000
```

Which means:

```plain text
Network Network Network Host
```

Or:

```plain text
192.168.1 | 25
```
---
# How the computer checks if two devices are on the same network
Suppose:

```plain text
Laptop A
IP: 192.168.1.10

Laptop B
IP: 192.168.1.25

Subnet Mask
255.255.255.0
```

The computer calculates the Network ID for both.

Result:

```plain text
192.168.1.0
192.168.1.0
```

Same Network ID.

So it knows:

> "These devices are on the same local network."

Now suppose:

```plain text
Laptop A
192.168.1.10

Server
10.0.0.5
```

The Network IDs are different.

So the computer says:

> "This is another network. I'll send the packet to my default gateway (router)."
---
# Interview Notes
### Subnet Mask
- A subnet mask divides an IP address into:
	- **Network ID**
	- **Host ID**
- It tells the computer which part of the IP address identifies the network.
- Devices with the same Network ID are on the same local network.

**Example:**

```plain text
IP Address : 192.168.1.25
Subnet Mask: 255.255.255.0

Network ID : 192.168.1.0
Host ID    : 25
```
---
## One common interview question
**Q: Can two devices communicate directly if they have different Network IDs?**

**Answer:**

No.

If they are on different networks, the sender forwards the packet to its **default gateway (router)**, which routes it to the destination network.
---
### Next Topic: CIDR
Now that you understand **Subnet Masks**, **CIDR notation** becomes very easy.

It's simply a **shorter way of writing the subnet mask** (for example, `255.255.255.0` becomes `/24`).
---
# CIDR (Classless Inter-Domain Routing)
## Why do we need CIDR?
Suppose I tell you the subnet mask is:

```plain text
255.255.255.0
```

It's a bit long to write every time.

Instead, we write:

```plain text
/24
```

That's called **CIDR notation**.

So:

```plain text
255.255.255.0
```

and

```plain text
/24
```

mean **exactly the same thing**.
---
# But why "/24"?
Remember from the previous topic:

```plain text
255.255.255.0
```

in binary is:

```plain text
11111111.11111111.11111111.00000000
```

Now count the number of **1s**.

```plain text
11111111 = 8 ones
11111111 = 8 ones
11111111 = 8 ones
00000000 = 0 ones

Total = 24
```

So we simply write:

```plain text
/24
```

The number after `/` represents:

> **The number of bits used for the Network ID.**
---
# More Examples
### Example 1

```plain text
255.0.0.0
```

Binary:

```plain text
11111111.00000000.00000000.00000000
```

Only **8** network bits.

So:

```plain text
/8
```
---
### Example 2

```plain text
255.255.0.0
```

Binary:

```plain text
11111111.11111111.00000000.00000000
```

Total:

```plain text
16 ones
```

So:

```plain text
/16
```
---
### Example 3

```plain text
255.255.255.0
```

↓

```plain text
/24
```
---
# How do you read it?
Suppose someone says:

```plain text
192.168.1.25/24
```

This means:

- IP Address = **192.168.1.25**
- Subnet Mask = **255.255.255.0**

So immediately you know:

```plain text
Network ID = 192.168.1.0

Host ID = 25
```
---
# Why is CIDR useful?
Imagine a company has this network:

```plain text
10.20.30.0/24
```

It's much easier to write than:

```plain text
10.20.30.0

Subnet Mask:
255.255.255.0
```

CIDR is shorter, easier to read, and widely used in documentation and cloud platforms.

For example, in AWS, Azure, or Google Cloud, you'll often create networks like:

```plain text
10.0.0.0/16
```

or

```plain text
192.168.1.0/24
```

rather than writing the subnet mask explicitly.
---
# Interview Notes
### CIDR (Classless Inter-Domain Routing)
- CIDR is a shorthand notation for representing a subnet mask.
- The number after `/` indicates the number of bits used for the **Network ID**.
- Common examples:

<table header-row="true">
<tr>
<td>CIDR</td>
<td>Subnet Mask</td>
</tr>
<tr>
<td>/8</td>
<td>255.0.0.0</td>
</tr>
<tr>
<td>/16</td>
<td>255.255.0.0</td>
</tr>
<tr>
<td>/24</td>
<td>255.255.255.0</td>
</tr>
</table>

**Example:**

```plain text
192.168.1.25/24
```

means:

```plain text
IP Address : 192.168.1.25
Subnet Mask: 255.255.255.0
```
---
# One common interview question
**Q: What does ****`/24`**** mean?**

It means the **first 24 bits** of the IP address represent the **Network ID**, and the remaining **8 bits** represent the **Host ID**.
---
The next topic is **Public vs Private IP**, where you'll learn why your laptop usually has an address like `192.168.x.x`, but websites on the Internet have completely different IP addresses.

This also leads naturally into **Router**, **Default Gateway**, and **NAT**.
---
> **"If my laptop has an IP address, why can't someone on the Internet directly access it?"**

The answer lies in **Public IP** and **Private IP**.

# Public vs Private IP
## First, imagine your home.
Your home has:

- **One postal address** (everyone in the world can send mail to it).
- Multiple rooms inside.

Example:

```plain text
123 Main Street
```

Inside there are:

- Bedroom
- Kitchen
- Living Room

People outside only know the **house address**, not the individual rooms.

Networking works similarly.
---
# Private IP
A **Private IP** is used **inside a local network (LAN)**.

Example:

```plain text
192.168.1.10
192.168.1.20
192.168.1.30
```

Your:

- Laptop
- Phone
- Smart TV
- Tablet

usually have **private IP addresses**.

These devices can communicate with each other within your home or office network.
---
## Can Private IPs be used on the Internet?
**No.**

Routers on the Internet **do not route private IP addresses**.

For example, if you try to send a packet to:

```plain text
192.168.1.10
```

from somewhere else on the Internet, routers won't know where to send it because **millions of homes use the same private IP ranges**.
---
# Public IP
A **Public IP** is globally unique.

Example:

```plain text
49.xxx.xxx.xxx
142.250.xxx.xxx
```

Every website or server on the Internet is reachable through a public IP.

Your Internet Service Provider (ISP) usually assigns **one public IP** to your home router.
---
# Example
At home:

```plain text
Laptop
192.168.1.10

Phone
192.168.1.20

TV
192.168.1.30
```

All of them connect to:

```plain text
Router

Public IP:
49.xxx.xxx.xxx
```

When your laptop opens Google:

```plain text
Laptop (192.168.1.10)
        │
        ▼
Router (49.xxx.xxx.xxx)
        │
        ▼
Google Server
```

Google **doesn't see your laptop's private IP**.

It sees the **public IP of your router**.
---
# Why do we use Private IPs?
Imagine every device needed its own public IP.

One house could have:

- 4 phones
- 3 laptops
- 2 TVs
- 5 IoT devices

That's already 14 public IPs.

Now multiply that by billions of homes.

There simply aren't enough IPv4 addresses.

Private IPs solve this problem by allowing the **same private address ranges to be reused** in different networks.
---
# Private IP Ranges
For interviews, remember these three ranges:

<table header-row="true">
<tr>
<td>Range</td>
<td>CIDR</td>
</tr>
<tr>
<td>10.0.0.0 – 10.255.255.255</td>
<td>/8</td>
</tr>
<tr>
<td>172.16.0.0 – 172.31.255.255</td>
<td>/12</td>
</tr>
<tr>
<td>192.168.0.0 – 192.168.255.255</td>
<td>/16</td>
</tr>
</table>

You don't need to memorise every number immediately, but you should recognise:

- `192.168.x.x` → Private
- `10.x.x.x` → Private
---
# Backend Perspective
As a backend developer, you'll often see:

```plain text
Client IP:
192.168.1.10
```

during local development.

But when your application is deployed:

```plain text
203.xxx.xxx.xxx
```

or another public IP will often appear (sometimes the IP of a reverse proxy or load balancer).

Understanding the difference helps when debugging networking issues or configuring servers.
---
# Interview Notes
### Private IP
- Used within a local network (LAN).
- Cannot be routed over the public Internet.
- Can be reused in different private networks.

### Public IP
- Globally unique.
- Assigned by an ISP.
- Used for communication over the Internet.

### Common Private IP Ranges
- `10.0.0.0/8`
- `172.16.0.0/12` to `172.31.255.255/12`
- `192.168.0.0/16`
---
## One thing you'll probably ask next
You might be wondering:

> **"If my laptop has a private IP, how does Google know where to send the response?"**

That's answered by **NAT (Network Address Translation)**, which happens inside your **router**.
---
# Router
## What is a Router?
A router is a device that **connects different networks**.

Remember:

Devices on the **same network** can communicate directly.

Example:

```plain text
Laptop      192.168.1.10
Phone       192.168.1.20
Printer     192.168.1.30
```

All are on the same network (`192.168.1.x`).

No router is needed for them to communicate.
---
Now suppose your laptop wants to access Google.

```plain text
Laptop
192.168.1.10

↓

Google
142.250.xxx.xxx
```

These are **different networks**.

Your laptop cannot send packets directly to Google.

It needs someone who knows how to reach other networks.

That's the router.
---
# Think of the Router as a Traffic Police
Imagine your city.

If you want to visit your neighbour:

You simply walk there.

If you want to visit another city:

You first reach the highway.

The highway connects cities.

The router plays a similar role.

It connects your local network to other networks.
---
# Example
Suppose:

```plain text
Laptop
192.168.1.10

Google
142.250.xxx.xxx
```

Your laptop checks:

> "Is Google on my network?"

No.

So it sends the packet to:

```plain text
Router
192.168.1.1
```

The router then forwards it towards Google.
---
## Visual Flow

```plain text
Laptop
192.168.1.10
        │
        ▼
Router
192.168.1.1
        │
        ▼
Internet
        │
        ▼
Google
142.250.xxx.xxx
```

The router's job is simply:

> **"Find the next network that moves this packet closer to its destination."**
---
# How does the Laptop know to send it to the Router?
Great question.

The laptop compares:

```plain text
My Network ID

↓

Destination Network ID
```

If they are different:

It says:

> "This packet isn't for my local network."

Then it sends the packet to its **Default Gateway**.

And in almost every home or office:

> **The Default Gateway is the Router.**

This brings us naturally to the next topic.
---
# Default Gateway
## What is it?
The **Default Gateway** is the device your computer sends packets to **when the destination is on another network**.

In most cases:

```plain text
Default Gateway = Router
```

Example:

```plain text
Laptop IP

192.168.1.10

Default Gateway

192.168.1.1
```

When sending to:

```plain text
192.168.1.25
```

Same network.

The laptop communicates directly.
---
When sending to:

```plain text
142.250.xxx.xxx
```

Different network.

The laptop sends the packet to:

```plain text
192.168.1.1
```

which is the router.
---
---
# Interview Notes
### Router
- Connects different networks.
- Forwards packets between networks using IP addresses.
- Used when the destination is outside the local network.

### Default Gateway
- The device a host sends packets to when the destination is on another network.
- In most home and office networks, the default gateway is the router.
---
## Before moving on
Let's connect everything you've learned so far.

Suppose your laptop has:

```plain text
IP Address       : 192.168.1.10
Subnet Mask      : 255.255.255.0
Default Gateway  : 192.168.1.1
```

You open:

```plain text
https://google.com
```

Your laptop thinks like this:

```plain text
Destination IP = 142.250.xxx.xxx

↓

Is it on my network?

No

↓

Send packet to my Default Gateway (192.168.1.1)

↓

Router forwards it towards Google
```

Notice how we've used almost every concept you've learned:

- ✅ IP Address
- ✅ Network ID
- ✅ Host ID
- ✅ Subnet Mask
- ✅ Default Gateway
- ✅ Router

Everything connects together.
---
## Next Topic: NAT (Network Address Translation)
This answers the question you've probably been wondering:

> **"If my laptop has a private IP (192.168.1.10), how does Google send the response back?"**

NAT is one of the most practical networking concepts for backend developers because it explains how private networks communicate with the public Internet.
---
# NAT (Network Address Translation)
## Why do we need NAT?
Let's say your home network looks like this:

```plain text
Laptop      192.168.1.10
Phone       192.168.1.20
TV          192.168.1.30

        │
        ▼
Router

Public IP: 49.36.120.50
```

Now your laptop opens:

```plain text
https://google.com
```

The request initially looks like:

```plain text
Source IP      : 192.168.1.10
Destination IP : 142.250.xxx.xxx
```

Can this packet go onto the Internet?

**No.**

Because `192.168.1.10` is a **private IP**, and routers on the Internet don't route private addresses.

So something has to change the source IP.
---
# What NAT Does
When the packet reaches your router, the router changes:

```plain text
Before NAT

Source IP      : 192.168.1.10
Destination IP : 142.250.xxx.xxx
```

↓

```plain text
After NAT

Source IP      : 49.36.120.50
Destination IP : 142.250.xxx.xxx
```

Notice what changed.

Only the **source IP**.

Now Google thinks:

> "This request came from **49.36.120.50**."

## More on how Router IPs
A home router usually has **two IP addresses**, because it connects **two different networks**.

Think of the router as standing between your home network and the Internet.

```plain text
            Internet
                │
     Public IP: 49.36.120.50
                │
        ┌──────────────┐
        │    Router    │
        └──────────────┘
                │
     Private IP: 192.168.1.1
                │
      Home Network (LAN)
      ├── Laptop 192.168.1.10
      ├── Phone  192.168.1.20
      └── TV     192.168.1.30
```

Notice that the router has **two interfaces**:

- **LAN interface** (inside your home)
	- IP: `192.168.1.1`
	- This is your **Default Gateway**.
- **WAN interface** (connected to your ISP)
	- IP: `49.36.120.50` (example)
	- This is your **Public IP**, usually assigned by your ISP.
---
## So when your laptop sends a packet...
Initially:

```plain text
Source IP      : 192.168.1.10
Destination IP : 142.250.xxx.xxx
```

The laptop sends it to its **Default Gateway** (`192.168.1.1`).

The router receives it and performs NAT.

After NAT:

```plain text
Source IP      : 49.36.120.50
Destination IP : 142.250.xxx.xxx
```

Now the packet goes out to the Internet.
---
## Does the router itself have a default gateway?
**Yes!**

Just like your laptop needs to know where to send packets outside your home network, the router needs to know where to send packets outside **its** directly connected networks.

Usually it looks like this:

```plain text
Laptop
IP: 192.168.1.10
Gateway: 192.168.1.1

        │

Router
LAN IP: 192.168.1.1
WAN IP: 49.36.120.50
Gateway: ISP Router

        │

ISP Router

        │

Internet
```

So your home router also has a **default gateway**, which is typically your ISP's next router.
---
## The complete journey

```plain text
Laptop
192.168.1.10
        │
        │  (Default Gateway = 192.168.1.1)
        ▼
Home Router
LAN: 192.168.1.1
WAN: 49.36.120.50
        │
        │  (Default Gateway = ISP Router)
        ▼
ISP Router
        │
        ▼
Internet
        │
        ▼
Google
```

### The key idea to remember
A **router connects multiple networks**, so it has an IP address **on each network it is connected to**.

In a typical home setup:

- **LAN IP** → `192.168.1.1` (private, used by devices in your home)
- **WAN IP** → `49.x.x.x` (public, assigned by your ISP)

That's why the router can communicate with both your private network and the public Internet.

This dual identity is what makes NAT possible.
---
# But how does the reply reach the correct device?
Good question.

Suppose:

- Your laptop opens Google.
- Your phone opens YouTube.

Both go through the same router.

```plain text
Laptop → Google

Phone → YouTube
```

From the Internet's perspective, both requests come from:

```plain text
49.36.120.50
```

How does the router know which response belongs to which device?
---
# NAT Translation Table
The router keeps a small table.

Something like:

<table header-row="true">
<tr>
<td>Private Device</td>
<td>Public Connection</td>
</tr>
<tr>
<td>192.168.1.10:52001</td>
<td>49.36.120.50:52001</td>
</tr>
<tr>
<td>192.168.1.20:52002</td>
<td>49.36.120.50:52002</td>
</tr>
</table>

Notice the **port numbers**.

The router doesn't just translate IP addresses—it also tracks ports.

When Google's response arrives:

```plain text
Destination

49.36.120.50:52001
```

The router checks its table and says:

> "52001 belongs to Laptop."

Then it changes the destination back to:

```plain text
192.168.1.10
```

and forwards the packet.
---
# Complete Journey

```plain text
Laptop
192.168.1.10
      │
      ▼
Router

NAT

192.168.1.10
      │
      ▼
49.36.120.50
      │
      ▼
Internet
      │
      ▼
Google
```

Response:

```plain text
Google
      │
      ▼
49.36.120.50
      │
      ▼
Router

NAT Table

      │
      ▼
192.168.1.10
```
---
# Why is NAT important?
Imagine a family of four.

Without NAT, you'd need four public IP addresses.

With NAT:

```plain text
4 Devices

↓

1 Router

↓

1 Public IP
```

This conserves IPv4 addresses and is one of the main reasons IPv4 has lasted so long.
---
# Backend Perspective
You'll often deploy an application like this:

```plain text
Users

↓

Internet

↓

Public IP

↓

Load Balancer / Reverse Proxy

↓

Backend Server
```

Your backend server may itself have a **private IP**, while the reverse proxy or load balancer has the **public IP**.

This is a common production setup.
---
# Interview Notes
### NAT (Network Address Translation)
- NAT allows devices with **private IP addresses** to communicate over the Internet.
- The router replaces the private source IP with its own public IP before sending packets.
- It maintains a translation table (using IPs and ports) to route responses back to the correct private device.
- NAT reduces the number of public IPv4 addresses required.
---
# One Interview Question
### Why is NAT needed?
**Answer:**

- Private IP addresses cannot be routed over the Internet.
- NAT translates private IP addresses to a public IP so devices can communicate with external networks.
- It also helps conserve the limited IPv4 address space.
---
## Where does DHCP fit?
there's one remaining question:

> **When your laptop joins a Wi-Fi network, who gives it its IP address, subnet mask, default gateway, and DNS server automatically?**

The answer is **DHCP (Dynamic Host Configuration Protocol)**, which is the final topic in your IP Addressing section.

Perfect.

This is the last topic in **IP Addressing**, and it ties together everything we've learned.

Up to now, we've been manually writing things like:

```plain text
IP Address      : 192.168.1.10
Subnet Mask     : 255.255.255.0
Default Gateway : 192.168.1.1
DNS Server      : 8.8.8.8
```

But imagine buying a new phone.

When you connect it to your Wi-Fi, do you manually enter all of these?

**No.**

So who does it?
---
# DHCP (Dynamic Host Configuration Protocol)
## Why do we need DHCP?
Suppose you have:

- 5 laptops
- 4 phones
- 2 TVs

Without DHCP, you'd have to manually configure every device:

- IP Address
- Subnet Mask
- Default Gateway
- DNS Server

That would be time-consuming and could easily cause mistakes.

DHCP automates this process.
---
# What is DHCP?
DHCP is a protocol that **automatically assigns network configuration** to devices when they join a network.

Instead of configuring everything manually, the device simply asks:

> **"Can someone give me an IP address and the network settings?"**
---
# What does DHCP provide?
Typically, a DHCP server gives the device:

- ✅ IP Address
- ✅ Subnet Mask
- ✅ Default Gateway
- ✅ DNS Server
- ✅ Lease Time (how long the device can use the IP)

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
In most home networks:

```plain text
Laptop
      │
      ▼
Home Router
      │
DHCP Server ✅
```

Your **router** acts as the DHCP server.

In companies, there is often a dedicated DHCP server instead of the router.
---
# How does DHCP work?
You only need a high-level understanding for backend interviews.

### Step 1 – Device joins the network
Your laptop connects to Wi-Fi.

It doesn't have an IP address yet.

So it broadcasts:

> **"Is there a DHCP server?"**
---
### Step 2 – DHCP Server replies
Usually the router responds:

> **"Yes. I can give you an IP address."**
---
### Step 3 – Device requests it
The laptop says:

> **"Great! I'd like to use that IP address."**
---
### Step 4 – Server confirms
The router confirms:

> **"Done. Here are your network settings."**

Now the laptop can communicate on the network.
---
# Real-Life Analogy
Imagine checking into a hotel.

You arrive and don't have a room.

Reception says:

> "Room 203 is available."

You accept.

Reception gives you:

- Room number
- Key
- Wi-Fi password
- Checkout time

Similarly, DHCP gives your device:

- IP address
- Network settings
- Lease time
---
# What is Lease Time?
The IP address isn't permanently assigned.

It's **leased** for a period of time.

For example:

```plain text
Lease Time = 24 hours
```

After some time, your device renews the lease.

This allows IP addresses to be reused when devices disconnect.
---
# Complete Picture
Now you can see the full process:

```plain text
New Laptop Joins Wi-Fi

        │

DHCP

↓

Gets:
• IP Address
• Subnet Mask
• Default Gateway
• DNS Server

↓

Can communicate on the network

↓

Uses Router as Default Gateway

↓

Router performs NAT

↓

Internet
```
---
# Interview Notes
### DHCP (Dynamic Host Configuration Protocol)
- Automatically assigns network configuration to devices.
- Eliminates the need for manual IP configuration.
- Typically provides:
	- IP Address
	- Subnet Mask
	- Default Gateway
	- DNS Server
	- Lease Time
- In home networks, the router usually acts as the DHCP server.
---
# One Common Interview Question
### Q: What happens when you connect your laptop to a new Wi-Fi network?
**Answer (high level):**

1. The device requests network configuration using DHCP.
2. The DHCP server (usually the router) assigns an IP address, subnet mask, default gateway, and DNS server.
3. The device can now communicate with other devices and access the Internet.
---
# 🎉 IP Addressing Section Complete
You've now covered:

- ✅ IPv4
- ✅ Network ID & Host ID
- ✅ Subnet Mask
- ✅ CIDR
- ✅ Public vs Private IP
- ✅ Router
- ✅ Default Gateway
- ✅ NAT
- ✅ DHCP

At this point, you have a solid backend interview understanding of IP addressing.

The next major topic in your networking roadmap is typically **DNS (Domain Name System)**—one of the most important concepts for understanding how a request like `https://google.com` actually reaches Google's servers.
