---
title: "What is Computer Networking?"
slug: "what-is-computer-networking"
description: "What networking is, why it exists, and real examples from everyday apps."
track: "Computer Networks"
---

# What is Computer Networking?

Before learning TCP, UDP, DNS, HTTP, ports, or load balancers, we should first understand one basic question:

> **What is networking, and why do we need it?**

**Computer networking** means connecting computers, servers, phones, and other devices so they can exchange data.

In simple words:

> **Networking is how one device talks to another device.**

When your laptop opens a website, your laptop is not doing everything alone.

It is communicating with another computer somewhere else, usually a server.

---

## Why do we need Networking?

Imagine every computer worked alone and could not communicate with any other computer.

Then:
- You could write a document on your laptop, but you could not share it through Google Docs.
- You could store photos on your phone, but you could not upload them to cloud storage.
- You could create a backend server, but users could not send requests to it.
- You could build a payment system, but it could not talk to banks or payment gateways.
- You could install WhatsApp, but your message could never reach another person.

Networking exists because modern software is not isolated.

Applications need to send and receive data across machines.

The network provides the path for that communication.

---

## Real Examples

### Opening a website

When you open:

```plain text
https://devatlas.com
```

your browser talks to a server.

The browser sends a request:

```plain text
Give me this web page.
```

The server sends a response:

```plain text
Here is the HTML, CSS, JavaScript, and images.
```

This happens because of networking.

---

### Sending a WhatsApp message

When you send a message, your phone does not directly place the message inside your friend's phone.

Usually the flow is:

```plain text
Your phone → WhatsApp server → Friend's phone
```

The message travels over a network.

---

### Calling an API from a frontend app

Suppose your React app calls:

```javascript
fetch("https://api.example.com/users")
```

Your browser sends a network request to a backend server.

The backend processes it and returns data.

Without networking, frontend and backend applications could not communicate.

---

### Watching a video online

When you watch a video, the full video is not magically inside your device.

Your device keeps downloading chunks of video data from remote servers.

If the network is slow, the video buffers.

If the network is fast, playback feels smooth.

---

## What does a Network need to solve?

For two devices to communicate properly, the network has to answer many questions:

- Where is the destination device?
- Which application should receive the data?
- How should large data be split into smaller pieces?
- What if some data is lost?
- What if data arrives out of order?
- How do we keep communication secure?
- How do we route data across many machines?

Different networking concepts solve different parts of this problem.

For example:
- **IP addressing** helps identify machines.
- **Ports** help identify applications on a machine.
- **DNS** converts domain names into IP addresses.
- **TCP** provides reliable delivery.
- **UDP** provides faster, lightweight delivery.
- **HTTP** defines how web clients and servers communicate.
- **HTTPS** protects communication using encryption.

---

## Simple Summary

Computer networking is the foundation that allows devices and applications to communicate.

It exists because modern software depends on data moving between browsers, phones, servers, databases, APIs, and cloud systems.

Before studying individual protocols, remember the core idea:

> **Networking is about moving data from one place to another correctly, efficiently, and safely.**
