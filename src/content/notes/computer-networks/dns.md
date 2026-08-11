---
title: "DNS"
slug: "dns"
description: "DNS lookup process, caching, recursive resolvers, and why DNS is needed."
track: "Computer Networks"
---

# DNS (Domain Name System)
## Why do we need DNS?
Imagine I tell you:

> "Visit Google's website."

Which is easier to remember?

```plain text
google.com
```

or

```plain text
142.250.183.78
```

Obviously:

```plain text
google.com
```

Humans are good at remembering names.

Computers are good at understanding numbers.

This creates a problem.
---
## The Problem
Earlier, we learned something important:

> **Routers route packets using IP addresses, not domain names.**

So when you type:

```plain text
google.com
```

Your computer **cannot** send packets using the name "google.com".

It first needs to know:

```plain text
google.com

↓

142.250.xxx.xxx
```

Only then can it build an IP packet and send it over the network.
---
## Imagine the Internet without DNS
Suppose there was no DNS.

Every website would have to be opened like this:

```plain text
142.250.183.78
```

Want YouTube?

```plain text
142.xxx.xxx.xxx
```

Want GitHub?

```plain text
140.xxx.xxx.xxx
```

You'd have to remember the IP address of every website you visit.

That's impossible for humans.
---
## The Solution
Instead of remembering IP addresses, we remember **domain names**.

DNS acts like a translator.

```plain text
google.com
        │
        ▼
DNS
        │
        ▼
142.250.xxx.xxx
```

Once the IP address is found:

```plain text
Browser
      │
      ▼
TCP Connection
      │
      ▼
HTTP Request
```

Notice something important.

**DNS happens before TCP and HTTP.**

Because without an IP address, your computer doesn't know where to send the TCP connection.
---
## Real-Life Analogy
Think about your phone.

You save:

```plain text
Mom
Dad
John
Alice
```

Not:

```plain text
+91xxxxxxxxxx
```

When you call **Mom**, your phone first looks up the stored phone number.

Then it places the call.

DNS works the same way.

```plain text
google.com

↓

Find IP Address

↓

Connect
```
---
# Backend Perspective
As a backend developer, you'll use domain names all the time.

Examples:

```plain text
api.mycompany.com

db.mycompany.internal

auth.example.com
```

But underneath, every one of these names eventually resolves to one or more IP addresses.
---
# Interview Notes
### Why do we need DNS?
- Humans remember domain names more easily than IP addresses.
- Computers communicate using IP addresses.
- DNS translates a domain name into its corresponding IP address before communication begins.
- DNS resolution happens **before** establishing a TCP connection.
---
## Think about the request flow
When you type:

```plain text
https://google.com
```

Your computer **doesn't** immediately start the TCP three-way handshake.

Instead, it thinks:

```plain text
1. What is the IP address of google.com?

↓

2. Got the IP.

↓

3. Start TCP handshake.

↓

4. Send HTTP request.
```

This ordering is important and is a common interview point.
---
### Next Topic
Now that you understand **why DNS exists**, we'll move to:

> **What is DNS?**

Then we'll dive into the most important part of this section:

> **DNS Resolution Process** — the complete journey from typing `google.com` in your browser to getting back an IP address. This is one of the highest-yield networking topics for backend interviews.
---
# What is DNS?
Now we know **why** DNS exists.

The next question is:

> **What exactly is DNS?**

The simple answer is:

> **DNS (Domain Name System) is a distributed system that translates domain names into IP addresses.**

Let's understand what that actually means.
---
## Is DNS one server?
Many beginners think there is one giant server somewhere that stores every website.

Something like:

```plain text
google.com  → 142.250.xxx.xxx
youtube.com → 142.251.xxx.xxx
github.com  → 140.82.xxx.xxx
```

That would never work.

Imagine storing information for hundreds of millions of domains on a single server.

- It would become a bottleneck.
- If it went down, the entire Internet would stop working.

So DNS is **not one server**.
---
# DNS is a Distributed System
Instead, DNS is made up of **thousands of DNS servers** spread across the world.

Each server is responsible for only a small part of the DNS database.

Think of it like this:

```plain text
             DNS

      ┌─────────────┐
      │ Root Servers│
      └──────┬──────┘
             │
     ┌───────┴────────┐
     │                │
   .com             .org
     │                │
 ┌───┴───┐        ┌───┴───┐
google  github   wikipedia
```

No single server knows everything.

Instead, DNS servers help direct queries to the right place.
---
# Think of a Library
Imagine the world's largest library.

Would one librarian know where every book is?

No.

Instead:

- Reception tells you which floor.
- The floor guide tells you which section.
- The section guide tells you which shelf.
- The shelf contains the book.

DNS works exactly like that.

Instead of one server knowing everything, each server knows where to send you next.
---
# What information does DNS store?
The most common mapping is:

```plain text
google.com
        │
        ▼
142.250.xxx.xxx
```

But DNS stores much more than IP addresses.

For example:

- Which mail server should receive emails?
- Which server handles a subdomain like `api.example.com`?
- Which domains are aliases of another domain?

We'll learn these as **DNS Records** later.
---
# Why is DNS called a "System"?
Notice the name:

> **Domain Name System**

Not:

> "Domain Name Server"

That's because DNS is an entire ecosystem of:

- Different types of DNS servers.
- Different DNS records.
- Caching.
- Protocols.
- Resolution rules.

A DNS server is **one component** of the DNS system.
---
# Backend Perspective
When your backend application calls:

```plain text
https://api.stripe.com
```

It doesn't know Stripe's IP address.

The operating system first performs a DNS lookup.

Only after obtaining the IP address can it establish the TCP connection and send the HTTPS request.

This is why DNS failures can cause your application to fail even when your code is perfectly fine.
---
# Interview Notes
### What is DNS?
- DNS stands for **Domain Name System**.
- It is a distributed system that translates domain names into IP addresses.
- DNS is made up of many DNS servers distributed across the Internet.
- It allows humans to use easy-to-remember domain names instead of IP addresses.
---
## What's next?
Now comes the **most important topic in DNS** and one of the most frequently asked networking interview questions:

> **DNS Resolution Process**

We'll trace exactly what happens when you type:

```plain text
https://google.com
```

We'll cover:

1. Browser cache
2. Operating System cache
3. Router (briefly)
4. ISP DNS Resolver
5. Root DNS Server
6. TLD Server
7. Authoritative DNS Server
8. IP address returned
9. TCP handshake begins

This is where everything you've learned about TCP, IP, routers, and DNS comes together into one complete flow.
---
# DNS Resolution Process
Let's say you type:

```plain text
https://google.com
```

Your browser **doesn't immediately contact Google**.

The first thing it asks is:

> **"What is the IP address of google.com?"**

Only after getting the IP can it start the TCP handshake.
---
# Step 1: Browser Cache
The browser first checks:

> **"Have I visited google.com recently?"**

Browsers maintain a small DNS cache.

Example:

```plain text
Browser Cache

google.com → 142.250.xxx.xxx
github.com → 140.82.xxx.xxx
```

If the entry exists and hasn't expired:

```plain text
Browser
      │
Found IP ✅
      │
      ▼
Start TCP Handshake
```

No network request is needed.

This makes websites load faster.
---
# Step 2: Operating System Cache
If the browser doesn't know the IP, it asks the operating system.

```plain text
Browser
      │
      ▼
Operating System
```

The OS also keeps a DNS cache because multiple applications need DNS.

For example:

- Chrome
- VS Code
- Spotify
- Slack

Instead of each maintaining its own complete cache, the OS keeps one as well.

If the OS finds the IP:

```plain text
OS Cache

google.com → 142.250.xxx.xxx
```

It returns it to the browser.

Again, no Internet request is needed.
---
# Step 3: Recursive DNS Resolver (Usually Your ISP)
If neither the browser nor the OS knows the answer, the OS sends the query to a **Recursive DNS Resolver**.

This is usually:

- Your ISP's DNS server.
- Or a public DNS service like Google DNS (`8.8.8.8`) or Cloudflare DNS (`1.1.1.1`).

Think of the resolver as your DNS helper.

Your computer asks it one simple question:

> **"Please find the IP address of ****`google.com`**** for me."**

From this point onward, **the resolver does the hard work**.
---
# What if the Resolver Already Knows?
Resolvers also maintain a cache.

Suppose another customer asked for `google.com` just a few seconds ago.

The resolver might already have:

```plain text
Resolver Cache

google.com → 142.250.xxx.xxx
```

If so:

```plain text
Resolver
      │
Found IP ✅
      │
      ▼
Returns IP to your computer
```

Again, no need to contact Google's DNS servers.
---
# What if the Resolver Doesn't Know?
Now the interesting part begins.

The resolver has to **walk through the DNS hierarchy** to find the answer.

It queries:

```plain text
Root DNS Server
      ↓
TLD Server (.com)
      ↓
Authoritative DNS Server
      ↓
Gets Google's IP
```

These servers don't all know the final answer—they guide the resolver step by step.

We'll cover each one in detail next.
---
# Current Flow

```plain text
You type:

https://google.com

        │
        ▼
Browser Cache
        │
        ▼
OS Cache
        │
        ▼
Recursive DNS Resolver
        │
        ▼
(Cache miss)
        │
        ▼
Root DNS Server
        │
        ▼
TLD Server
        │
        ▼
Authoritative DNS Server
        │
        ▼
Returns IP
        │
        ▼
Browser starts TCP Handshake
```
---
## Interview Notes (Part 1)
### DNS Resolution (Initial Steps)
1. Browser checks its DNS cache.
2. If not found, it asks the OS cache.
3. If still not found, the OS sends the query to a **Recursive DNS Resolver**.
4. The resolver checks its own cache before querying other DNS servers.
---
### Why stop here?
Because the next three servers:

- **Root DNS Server**
- **TLD Server**
- **Authoritative DNS Server**

are the heart of DNS and deserve their own discussion.

Once you understand their roles, the entire DNS lookup process becomes crystal clear.

> Root → TLD → Authoritative

But they don't understand **what each server actually does**.
---
# Step 4: Root DNS Server
Suppose the resolver wants to find:

```plain text
google.com
```

Does the Root DNS Server know Google's IP?

**No.**

This surprises many people.

The Root DNS Server **doesn't store the IP addresses of websites**.

Instead, it knows:

> **"Which server is responsible for each Top-Level Domain (TLD)?"**

For example:

```plain text
.com
.org
.net
.in
.io
```

Think of it like a receptionist.

Imagine you walk into a huge university and ask:

> "Where is the Computer Science department?"

The receptionist doesn't know where Professor John sits.

They simply say:

> "Go to Building C."

That's exactly what the Root Server does.
---
### Example
Resolver asks:

```plain text
Where is google.com?
```

Root Server replies:

```plain text
I don't know Google's IP.

But I know who manages .com.

Ask the .com TLD Server.
```

Notice:

**No IP address has been returned yet.**
---
# Step 5: TLD (Top-Level Domain) Server
Now the resolver asks the `.com` server.

Question:

```plain text
Where is google.com?
```

Does the TLD server know Google's IP?

Again,

**No.**

Instead, it knows:

> **Which DNS server is authoritative for google.com.**

It replies:

```plain text
Ask Google's Authoritative DNS Server.
```

Think of it like this:

```plain text
Root
        │
        ▼
Go to .com

.com
        │
        ▼
Go to Google's DNS Server
```

Still, no IP address.
---
# Step 6: Authoritative DNS Server
Now the resolver reaches Google's Authoritative DNS Server.

This server **owns the DNS records** for `google.com`.

So when it asks:

```plain text
What is the IP of google.com?
```

The authoritative server replies:

```plain text
google.com

↓

142.250.xxx.xxx
```

Finally!

This is the first server that actually knows the answer.
---
# Step 7: Return Journey
Now the response travels back.

```plain text
Authoritative DNS Server
        │
        ▼
Recursive Resolver
```

The resolver stores it in its cache.

Then:

```plain text
Recursive Resolver
        │
        ▼
Operating System
```

The OS caches it.

Then:

```plain text
Operating System
        │
        ▼
Browser
```

The browser caches it.

Now the browser finally knows:

```plain text
google.com

↓

142.250.xxx.xxx
```

Only **now** does networking continue.
---
# Step 8: TCP Begins
Now your browser says:

> "Great. I finally know the destination IP."

It starts:

```plain text
TCP Three-Way Handshake

↓

HTTPS

↓

HTTP Request
```

Everything you've studied before DNS now comes into play.
---
# Complete Flow

```plain text
User types:

google.com

        │
        ▼
Browser Cache
        │
        ▼
OS Cache
        │
        ▼
Recursive DNS Resolver
        │
        ▼
Root DNS Server
        │
        ▼
".com TLD Server"
        │
        ▼
Google's Authoritative DNS Server
        │
        ▼
Returns IP Address
        │
        ▼
Recursive Resolver caches it
        │
        ▼
OS caches it
        │
        ▼
Browser caches it
        │
        ▼
TCP Handshake
        │
        ▼
HTTPS Request
```
---
# Easy way to remember
Each server has a different responsibility:

<table header-row="true">
<tr>
<td>Server</td>
<td>Responsibility</td>
</tr>
<tr>
<td>**Root**</td>
<td>Knows where each TLD (`.com`, `.org`, `.in`) is managed.</td>
</tr>
<tr>
<td>**TLD**</td>
<td>Knows which authoritative server manages a specific domain.</td>
</tr>
<tr>
<td>**Authoritative**</td>
<td>Stores the actual DNS records (IP addresses, MX records, etc.).</td>
</tr>
</table>
---
# Interview Notes
### DNS Resolution Process
1. Browser checks DNS cache.
2. OS checks DNS cache.
3. Recursive Resolver checks its cache.
4. Root DNS Server points to the correct TLD server.
5. TLD Server points to the domain's Authoritative DNS Server.
6. Authoritative DNS Server returns the IP address.
7. The resolver, OS, and browser cache the result.
8. The browser starts the TCP handshake using the returned IP.
---
## This is the most commonly asked DNS interview question
> **"Explain what happens when you type ****`google.com`**** into your browser."**

If you can explain the flow above confidently, you'll answer one of the most common networking interview questions.
---
### Next Topic
Now that you know **how DNS finds the server**, we'll study **DNS Record Types** (`A`, `AAAA`, `CNAME`, `MX`, `TXT`, `NS`).

These are very practical because you'll encounter them whenever you deploy applications, configure domains, or work with cloud services.
---
# DNS Records
So far, we've said:

> "The Authoritative DNS Server returns the IP."

But **where does it get that IP from?**

It stores information called **DNS Records**.

Think of the Authoritative DNS Server as a database.

Example:

```plain text
google.com

↓

DNS Database

A      → 142.250.xxx.xxx
MX     → mail.google.com
TXT    → "v=spf1 ..."
```

Each entry is called a **DNS Record**.
---
# 1. A Record (Address Record) ⭐⭐⭐
This is the most common DNS record.

Its job is simple:

> **Maps a domain name to an IPv4 address.**

Example:

```plain text
google.com

↓

142.250.xxx.xxx
```

When your browser asks:

> "What's the IP of google.com?"

The Authoritative DNS Server returns the **A Record**.
---
### Example

```plain text
example.com

↓

93.184.216.34
```
---
### Backend Perspective
Suppose your backend server has:

```plain text
203.0.113.10
```

You buy:

```plain text
api.mycompany.com
```

You create an **A Record**:

```plain text
api.mycompany.com

↓

203.0.113.10
```

Now anyone visiting:

```plain text
https://api.mycompany.com
```

reaches your server.
---
# 2. AAAA Record
Exactly like an A Record, but for **IPv6**.

Instead of:

```plain text
IPv4

192.168.1.10
```

It stores:

```plain text
IPv6

2001:db8::1
```

Unless you're working heavily with IPv6, interviewers usually just expect you to know its purpose.
---
# 3. CNAME Record ⭐⭐⭐
This one confuses many people.

Imagine:

```plain text
mycompany.com
```

and

```plain text
www.mycompany.com
```

Should they have separate IP addresses?

Usually, **no**.

Instead:

```plain text
www.mycompany.com

↓

mycompany.com
```

The CNAME record says:

> **"This domain is an alias of another domain."**

Notice:

It points to **another domain**, **not directly to an IP address**.
---
### Example

```plain text
www.example.com

↓

example.com

↓

93.184.216.34
```
---
# 4. MX Record ⭐⭐
MX stands for:

> **Mail Exchange**

It tells the Internet:

> **"Which mail server handles emails for this domain?"**

Example:

```plain text
company.com

↓

mail.company.com
```

Without MX records, email wouldn't know where to deliver messages.
---
# 5. TXT Record ⭐⭐
TXT stores text information.

Originally it was just for text.

Today it's heavily used for:

- Domain verification
- SPF
- DKIM
- Security policies

Example:

```plain text
google-site-verification=abc123...
```

You'll often add TXT records when:

- Deploying apps
- Configuring Google Workspace
- Setting up SendGrid, AWS SES, Mailgun, etc.
---
# 6. NS Record ⭐⭐
NS stands for:

> **Name Server**

It tells the Internet:

> **"Which Authoritative DNS Server is responsible for this domain?"**

Example:

```plain text
example.com

↓

ns1.cloudflare.com
ns2.cloudflare.com
```

This tells resolvers where to find the DNS records for `example.com`.
---
# Summary

<table header-row="true">
<tr>
<td>Record</td>
<td>Purpose</td>
</tr>
<tr>
<td>**A**</td>
<td>Domain → IPv4 Address</td>
</tr>
<tr>
<td>**AAAA**</td>
<td>Domain → IPv6 Address</td>
</tr>
<tr>
<td>**CNAME**</td>
<td>Domain → Another Domain</td>
</tr>
<tr>
<td>**MX**</td>
<td>Mail Server</td>
</tr>
<tr>
<td>**TXT**</td>
<td>Verification / Security / Text</td>
</tr>
<tr>
<td>**NS**</td>
<td>Authoritative DNS Server</td>
</tr>
</table>
---
# Real Deployment Example
Suppose you own:

```plain text
mycompany.com
```

Your DNS might look like:

```plain text
A
mycompany.com
        ↓
203.0.113.10

CNAME
www.mycompany.com
        ↓
mycompany.com

MX
mycompany.com
        ↓
mail.google.com

TXT
google-site-verification=...

NS
ns1.cloudflare.com
ns2.cloudflare.com
```

Every record has a different purpose, but together they define how your domain behaves.
---
# Interview Notes
### A Record
- Maps a domain name to an IPv4 address.

### AAAA Record
- Maps a domain name to an IPv6 address.

### CNAME Record
- Creates an alias from one domain to another domain.

### MX Record
- Specifies which mail server receives emails for the domain.

### TXT Record
- Stores text information, commonly used for domain verification and email security.

### NS Record
- Specifies the authoritative name servers for the domain.
---
## Which ones should you remember?
For backend interviews, prioritize:

- ⭐ A
- ⭐ CNAME
- ⭐ MX
- ⭐ TXT

Know that:

- AAAA is for IPv6.
- NS identifies the authoritative name servers.

Those six are sufficient for the vast majority of backend interviews.
---
## Next Topic
The next topic is **DNS Caching & TTL (Time To Live)**.

This explains why:

- You don't query DNS servers every time you visit Google.
- DNS changes can sometimes take minutes or hours to be visible.
- You'll often hear people say, **"Wait for DNS propagation."**

This is another very common real-world topic when deploying applications.
---
# DNS Caching & TTL
## Why do we need DNS Caching?
Imagine there was **no caching**.

Every time you opened:

```plain text
google.com
```

Your computer would have to contact:

- Browser → ❌ No cache
- OS → ❌ No cache
- Resolver → ❌ No cache
- Root Server
- TLD Server
- Authoritative Server

...for **every single request**.

Imagine millions of users doing this every second.

The DNS infrastructure would be overwhelmed, and websites would load more slowly.

Caching solves this problem.
---
# What is DNS Caching?
DNS caching means:

> **Once a domain has been resolved, store the result temporarily so it can be reused.**

Instead of asking:

```plain text
google.com

↓

142.250.xxx.xxx
```

100 times,

your computer asks **once** and remembers the answer for a while.
---
# Where is DNS Cached?
Remember the DNS resolution process?

Caching happens at multiple levels.

```plain text
Browser
   │
   ▼
OS
   │
   ▼
Recursive Resolver
```

Each of these can cache the result.

### Browser Cache

```plain text
google.com

↓

142.250.xxx.xxx
```

The next time you visit Google, the browser may already know the answer.
---
### OS Cache
If another application (like VS Code or Slack) needs `google.com`, it can reuse the operating system's cache.
---
### Recursive Resolver Cache
Your ISP's DNS resolver also caches answers.

This benefits everyone using that resolver.

For example:

```plain text
Person A

↓

Resolver asks Google's DNS

↓

Caches result
```

A few seconds later:

```plain text
Person B

↓

Resolver already knows the answer ✅
```

No need to contact Google's DNS servers again.
---
# But should the cache live forever?
Imagine this situation.

Yesterday:

```plain text
api.mycompany.com

↓

203.0.113.10
```

Today you move your backend to a new server.

Now the correct IP is:

```plain text
198.51.100.25
```

If everyone's computer cached the old IP forever,

they would **never reach the new server**.

So caches need an expiry time.
---
# TTL (Time To Live)
TTL tells caches:

> **"Keep this DNS record for this long, then discard it and ask again."**

Example:

```plain text
A Record

api.mycompany.com

↓

203.0.113.10

TTL = 300 seconds
```

This means:

```plain text
Store for 5 minutes.

↓

After 5 minutes,

perform another DNS lookup.
```
---
# High TTL vs Low TTL
### High TTL
Example:

```plain text
TTL = 86400

(24 hours)
```

Advantages:

- Fewer DNS lookups
- Faster browsing
- Less load on DNS servers

Disadvantage:

If you change the server's IP, users may continue using the old IP for up to a day.
---
### Low TTL
Example:

```plain text
TTL = 60 seconds
```

Advantages:

- DNS changes become visible quickly.

Disadvantage:

- More DNS queries.
- More work for DNS servers.
---
# Real Deployment Example
Suppose you're moving your backend from:

```plain text
Old Server

203.0.113.10
```

to

```plain text
New Server

198.51.100.25
```

If the current TTL is:

```plain text
24 hours
```

many users may continue connecting to the old server until their cached entry expires.

A common deployment strategy is:

1. Lower the TTL (for example, from 24 hours to 5 minutes) **before** the migration.
2. Wait for the old TTL to expire.
3. Update the DNS record.
4. After everything is stable, increase the TTL again.

This reduces the time users might be directed to the old server.
---
# Interview Notes
### DNS Caching
- DNS responses are cached to reduce lookup time and decrease load on DNS servers.
- Caching occurs in:
	- Browser
	- Operating System
	- Recursive DNS Resolver

### TTL (Time To Live)
- TTL specifies how long a DNS record can remain in a cache.
- When the TTL expires, the cached entry is discarded and a new DNS lookup is performed.
---
# Common Interview Questions
### Q: Why is DNS caching important?
**Answer:**

- Reduces DNS lookup latency.
- Improves website performance.
- Reduces traffic to DNS servers.
---
### Q: What is TTL?
**Answer:**

TTL (Time To Live) is the duration for which a DNS record can be cached before it must be looked up again.
---
## One thing to remember
People often say:

> **"DNS propagation takes time."**

In most cases, it's **not** that DNS servers are slowly updating across the Internet.

The authoritative DNS server can update almost immediately.

What usually delays things is that **different caches around the Internet are still holding the old record until its TTL expires**.
---
### Next Topic
The final core DNS concept is **Recursive vs Iterative DNS Queries**.

It's a short topic, but it's a favourite interview question because it explains **who does the work** during DNS resolution: your computer or the recursive resolver.
---
# Recursive vs Iterative DNS Query
## Imagine you're new in a company
You walk up to the receptionist and ask:

> "Where does John sit?"

There are two ways the receptionist can help.

### Option 1: Recursive
The receptionist says:

> "Wait here. I'll find John for you."

The receptionist:

- Calls another department.
- That department calls another.
- Eventually finds John.
- Comes back and tells you:

> "John is on the 4th floor."

You asked **one person**, and they did all the work.

This is a **Recursive Query**.
---
### Option 2: Iterative
The receptionist says:

> "Go to Building C."

You go there.

Building C says:

> "Go to Floor 4."

You go there.

Floor 4 says:

> "Room 412."

You go there.

You do all the walking.

This is an **Iterative Query**.
---
# In DNS
Suppose your computer wants:

```plain text
google.com
```

## Recursive Query
Your computer asks the Recursive Resolver:

> "Tell me the IP of google.com."

The resolver says:

> "Okay, I'll find it."

Then the resolver contacts:

```plain text
Root
   ↓
TLD
   ↓
Authoritative
```

Finally, it returns:

```plain text
google.com

↓

142.250.xxx.xxx
```

Your computer doesn't need to know about Root, TLD, or Authoritative servers.
---
## Iterative Query
Now imagine there is **no recursive resolver**.

Your computer asks the Root Server:

> "Where is google.com?"

Root replies:

> "Ask the .com server."

Your computer now asks:

```plain text
.com
```

The `.com` server replies:

> "Ask Google's Authoritative Server."

Your computer asks Google's server.

Finally it gets the IP.

So the client performs every step itself.
---
# Visual Comparison
## Recursive

```plain text
Computer
    │
    ▼
Recursive Resolver
    │
    ├──► Root
    ├──► TLD
    └──► Authoritative
    │
    ▼
Returns Final IP
```

The resolver does all the work.
---
## Iterative

```plain text
Computer
    │
    ▼
Root
    │
"Ask TLD"

Computer
    │
    ▼
TLD
    │
"Ask Authoritative"

Computer
    │
    ▼
Authoritative
    │
Returns IP
```

The computer follows each referral itself.
---
# Which one is used on the Internet?
In a typical DNS lookup:

### Between your computer and the resolver
✅ **Recursive Query**

Your computer simply asks:

> "Find the IP for me."
---
### Between the resolver and DNS servers
Usually **Iterative Queries**

The resolver asks:

- Root
- TLD
- Authoritative

Each server points it to the next one until it gets the answer.

This combination keeps the system efficient and scalable.
---
# Why not make everything recursive?
Imagine billions of computers talking directly to Root DNS Servers.

The Root Servers would have to perform all the work for every request.

Instead, recursive resolvers (run by ISPs, Google Public DNS, Cloudflare, etc.) take on that responsibility, reducing the load on the global DNS infrastructure.
---
# Interview Notes
### Recursive Query
- The client asks a Recursive DNS Resolver for the final answer.
- The resolver performs all the required lookups and returns the IP address.

### Iterative Query
- Each DNS server returns the best information it has, usually pointing to the next server.
- The requester follows these referrals until it reaches the Authoritative DNS Server.
---
# One common interview question
### Q: Does my browser communicate directly with the Root DNS Server?
**Answer:**

**No.**

The browser (through the operating system) sends a **recursive query** to a Recursive DNS Resolver.

The resolver then performs **iterative queries** to the Root, TLD, and Authoritative DNS Servers if the answer isn't already cached.
---
At this point, you're well prepared for the DNS questions that commonly appear in backend interviews.

The next logical topic in your networking roadmap is **HTTP & HTTPS**, where you'll build on DNS by following the request after the IP address has been resolved.
