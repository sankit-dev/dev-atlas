---
title: "Public vs Private IP"
slug: "public-vs-private-ip"
description: "Why local devices use private IPs and servers use public IPs."
track: "Computer Networks"
---

# Public vs Private IP

Not every IP address is directly reachable from the internet.

There are two important categories:

- **Private IP**
- **Public IP**

---

# Private IP

A **private IP** is used inside a local network.

Examples:

```plain text
192.168.1.10
10.0.0.5
172.16.2.20
```

Your laptop, phone, smart TV, and printer usually have private IP addresses at home.

Private IPs are not directly reachable from the public internet.

---

# Public IP

A **public IP** is reachable on the internet.

Your home router usually has one public IP given by your internet provider.

Public servers also have public IPs.

Example:

```plain text
Browser → Public IP of a web server
```

If a backend API is deployed on the internet, users ultimately reach it through a public IP address, directly or through a load balancer, CDN, or reverse proxy.

---

# Why do we use Private IPs?

There are not enough IPv4 addresses for every device in the world to have a unique public IPv4 address.

So local networks reuse private IP ranges.

Example:

Your laptop can be:

```plain text
192.168.1.10
```

My laptop can also be:

```plain text
192.168.1.10
```

That is okay because they are inside different private networks.

---

# Common Private IP Ranges

<table header-row="true">
<tr>
<td>Range</td>
<td>Common Use</td>
</tr>
<tr>
<td>10.0.0.0/8</td>
<td>Large private networks</td>
</tr>
<tr>
<td>172.16.0.0/12</td>
<td>Medium private networks</td>
</tr>
<tr>
<td>192.168.0.0/16</td>
<td>Home and small office networks</td>
</tr>
</table>

---

# Interview Answer

If an interviewer asks:

> **What is the difference between public and private IP?**

You can answer:

A private IP is used inside a local network and is not directly reachable from the internet. A public IP is globally reachable on the internet. Private IP ranges can be reused across different local networks, while public IPs must be globally unique.
