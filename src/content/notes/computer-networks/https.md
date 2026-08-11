---
title: "HTTPS"
slug: "https"
description: "SSL/TLS, certificates, encryption, and HTTPS request flow."
track: "Computer Networks"
---

# 1. Why HTTPS?
Before HTTPS existed, websites used only HTTP.

Remember what we learned:

```plain text
Browser
   │
HTTP Request
   │
──────── Internet ────────
   │
Server
```

The problem is that **HTTP sends data in plain text**.

Suppose you log in to a website.

```plain text
POST /login HTTP/1.1

username=asingh
password=myPassword123
```

Anyone who can intercept the network traffic can read it.

This could be:

- Someone on the same public Wi-Fi.
- A malicious ISP (in some scenarios).
- An attacker who has positioned themselves between you and the server.

They don't need to "hack" your computer—they just read the packets travelling across the network.
---
## Problem 1 — No Confidentiality
Everything is visible.

Example:

```plain text
HTTP Request

Username: asingh
Password: myPassword123
Credit Card: 4111....
```

An attacker can simply read it.

This is why you should never log into a website that uses plain HTTP.
---
## Problem 2 — No Integrity
Even worse, an attacker can **modify** the data before it reaches the server.

Imagine you send:

```plain text
Transfer ₹1,000 to Rahul
```

An attacker intercepts it and changes it to:

```plain text
Transfer ₹10,000 to Rahul
```

The server has no way to know the request was altered.

The same applies to downloaded files.

You download:

```plain text
software.exe
```

An attacker replaces it with malware before it reaches you.

Since HTTP doesn't verify that the data stayed unchanged, the browser accepts it.
---
## Problem 3 — No Authentication
When using HTTP, how do you know you're actually talking to your bank?

Suppose you type:

```plain text
mybank.com
```

An attacker could impersonate the bank.

Your browser cannot reliably verify:

> "Yes, this is really the legitimate server."

So you might unknowingly send your username and password to the attacker instead of the real bank.
---
## The Man-in-the-Middle (MITM) Attack
These three problems come together in a common attack called a **Man-in-the-Middle (MITM)** attack.

Instead of communicating directly:

```plain text
You
 │
 ▼
Server
```

An attacker secretly places themselves in the middle:

```plain text
You
 │
 ▼
Attacker
 │
 ▼
Server
```

Now the attacker can:

1. Read your data.
2. Modify your data.
3. Forward it to the server.
4. Send the server's response back to you.

To both you and the server, everything appears normal.
---
## How HTTPS Solves These Problems
HTTPS combines HTTP with **TLS (Transport Layer Security)**.

```plain text
HTTPS = HTTP + TLS
```

TLS provides three important guarantees:

### 1. Confidentiality
Data is encrypted before it is sent.

Instead of:

```plain text
password=myPassword123
```

the network sees something like:

```plain text
8F91A0E7B93D...
```

Only the browser and server can decrypt it.
---
### 2. Integrity
TLS ensures that if even a single bit of data changes during transmission, the browser or server detects it.

This prevents attackers from silently modifying requests or responses.
---
### 3. Authentication
The browser verifies that it is communicating with the genuine server using a **digital certificate** issued by a trusted Certificate Authority (CA).

This helps prevent attackers from impersonating legitimate websites.
---
## Does HTTPS Encrypt Everything?
Not quite.

The **HTTP request and response** (headers, body, cookies, etc.) are encrypted.

Some information still needs to remain visible so the network can route your traffic.

Examples include:

- Source IP address
- Destination IP address
- The fact that you're using TCP
- Port number (typically 443)

The contents of the HTTP message are what TLS protects.
---
## Summary
HTTP has three major security weaknesses:

<table header-row="true">
<tr>
<td>Problem</td>
<td>What can happen?</td>
</tr>
<tr>
<td>No Confidentiality</td>
<td>Attackers can read your data.</td>
</tr>
<tr>
<td>No Integrity</td>
<td>Attackers can modify your data.</td>
</tr>
<tr>
<td>No Authentication</td>
<td>Attackers can impersonate a website.</td>
</tr>
</table>

HTTPS solves these by using TLS to provide:

- **Confidentiality** through encryption.
- **Integrity** through tamper detection.
- **Authentication** through digital certificates.
---
### Interview Questions
1. Why was HTTPS introduced when HTTP already existed?
2. What are the three major security problems with HTTP?
3. What is confidentiality in HTTPS?
4. What is integrity, and why is it important?
5. What is authentication in HTTPS?
6. Explain a Man-in-the-Middle attack.
7. What does HTTPS actually add on top of HTTP?
8. Does HTTPS encrypt the entire network packet? Why or why not?
---
# 2. SSL/TLS
## What is SSL/TLS?
HTTP itself doesn't know anything about security.

HTTP can:

- Send requests
- Send responses
- Define methods (GET, POST, PUT, DELETE)
- Define headers
- Define status codes

But HTTP **cannot**:

- Encrypt data
- Verify the server's identity
- Detect if data has been modified

That's where **SSL/TLS** comes in.

Think of it like this:

```plain text
Application Layer
┌──────────────────────┐
│       HTTP           │
└──────────────────────┘
          │
          ▼
┌──────────────────────┐
│      TLS (Security)  │
└──────────────────────┘
          │
          ▼
┌──────────────────────┐
│        TCP           │
└──────────────────────┘
```

HTTP creates the message.

TLS secures the message.

TCP transports the message.
---
## What is SSL?
SSL stands for **Secure Sockets Layer**.

It was developed by Netscape in the 1990s to secure internet communication.

Its purpose was simple:

> "Allow two computers to communicate securely over an insecure network."

Earlier versions included:

- SSL 2.0
- SSL 3.0

However, researchers discovered several security vulnerabilities.

As a result, SSL is now considered **obsolete** and should not be used.

Today, when people casually say "SSL certificate," they almost always mean a **TLS certificate**.
---
## What is TLS?
TLS stands for **Transport Layer Security**.

It is the modern replacement for SSL.

Current versions include:

- TLS 1.2 (still widely used)
- TLS 1.3 (recommended and faster)

TLS provides three guarantees:

- **Confidentiality** → Encryption keeps data secret.
- **Integrity** → Detects if data is modified.
- **Authentication** → Confirms you're talking to the correct server.
---
# Why is it called Transport Layer Security?
TLS operates **above TCP and below HTTP**.

When your browser sends an HTTP request:

```plain text
GET /profile HTTP/1.1
Host: example.com
```

The request doesn't go directly to TCP.

Instead:

```plain text
HTTP
  │
  ▼
TLS encrypts it
  │
  ▼
TCP sends encrypted bytes
```

The server performs the reverse process:

```plain text
Encrypted bytes
      │
      ▼
TLS decrypts
      │
      ▼
HTTP processes the request
```

Neither HTTP nor TCP needs to know how encryption works.
---
# Before TLS Can Encrypt...
Here's an important question:

Imagine you're talking to a friend.

You both decide to use a secret code where:

```plain text
A → X
B → Y
C → Z
```

How do you tell your friend about this secret code without anyone else hearing?

That's the exact problem computers face.

Before encryption can begin, the browser and server must **agree on a shared secret key**.

This is the purpose of the **TLS Handshake**.
---
# What is the TLS Handshake?
The TLS Handshake is the conversation that happens **before any HTTP data is exchanged**.

Its goals are to:

1. Verify the server's identity.
2. Agree on encryption algorithms.
3. Securely create a shared session key.
4. Start encrypted communication.

Only after the handshake completes does the browser send the HTTP request.

So the flow becomes:

```plain text
DNS Lookup
      │
TCP 3-Way Handshake
      │
TLS Handshake
      │
Encrypted HTTP Request
      │
Encrypted HTTP Response
```
---
# High-Level TLS Handshake
We'll keep this conceptual for now.

Later, when we study the complete HTTPS request flow, we'll revisit each step in detail.

### Step 1: Client Hello
The browser contacts the server and says:

```plain text
Hi!

I support:
- TLS 1.3
- TLS 1.2

These are the encryption algorithms I understand.

Here's a random number.
```
---
### Step 2: Server Hello
The server replies:

```plain text
Great!

We'll use TLS 1.3.

We'll use this encryption algorithm.

Here's my random number.

Here's my certificate.
```

The browser now knows which TLS version and encryption algorithms will be used.
---
### Step 3: Browser Verifies the Certificate
The browser checks:

- Is the certificate valid?
- Has it expired?
- Was it issued by a trusted Certificate Authority (CA)?
- Does it belong to this domain?

If these checks fail, you'll usually see a warning like:

```plain text
Your connection is not private.
```

We'll cover certificates in depth in the next topic.
---
### Step 4: Session Key is Created
Using the information exchanged during the handshake (including the random values and modern key exchange algorithms like ECDHE), both the browser and the server independently derive the **same symmetric session key**.

The key itself is **not sent over the network**.

This is one of the clever parts of TLS.
---
### Step 5: Secure Communication Begins
Now both sides share the same session key.

Every HTTP request and response is encrypted using that symmetric key.

```plain text
GET /profile

        │

TLS Encrypts

        │

Encrypted Data

        │

Internet

        │

Server

        │

TLS Decrypts

        │

GET /profile
```
---
# Why Doesn't TLS Use Asymmetric Encryption for Everything?
You might wonder:

> If public/private keys are so secure, why not use them for all communication?

Because they're **computationally expensive**.

TLS uses them only during the handshake to establish trust and securely derive a shared key.

After that, it switches to **symmetric encryption**, which is much faster and better suited for encrypting large amounts of data.

This combination gives us both **security** and **performance**.
---
# Summary
- **SSL** was the original security protocol but is now obsolete.
- **TLS** is its modern replacement.
- TLS sits between HTTP and TCP.
- Before any HTTP data is sent, the browser and server perform a **TLS Handshake**.
- The handshake authenticates the server and securely establishes a shared session key.
- Once the handshake is complete, all HTTP traffic is encrypted using **symmetric encryption**.
---
## Interview Questions
1. What is TLS, and why do we need it?
2. What is the difference between SSL and TLS?
3. Where does TLS sit in the networking stack?
4. Why is the TLS Handshake necessary?
5. What are the goals of the TLS Handshake?
6. Why does TLS switch to symmetric encryption after the handshake?
7. What happens if certificate verification fails?
8. Does the browser send HTTP data before the TLS Handshake completes?
---
The next topic, **Digital Certificates**, ties directly into Step 3 of the handshake.

It explains **how your browser knows that ****`google.com`**** is actually Google and not an attacker pretending to be Google**.
