---
title: "Cache Memory & Locality of Reference"
slug: "cache-memory-and-locality-of-reference"
description: "Temporal vs spatial locality and why caching improves performance."
track: "Operating Systems"
---

# Cache Memory
## Why Do We Need Cache?
The CPU is **extremely fast**, but RAM is much slower.

Imagine:
```plain text
CPU → Wants data immediately
RAM → Takes longer to respond
```

If the CPU had to wait for RAM every time, it would spend a lot of time idle.

To reduce this waiting time, computers use **Cache Memory**.
---
## Definition
**Cache Memory** is a **small, very fast memory** located close to the CPU.

It stores **frequently or recently used data** so the CPU can access it much faster than RAM.
---
## Memory Hierarchy
```plain text
Fastest
        CPU Registers
              │
              ▼
           L1 Cache
              │
              ▼
           L2 Cache
              │
              ▼
           L3 Cache
              │
              ▼
             RAM
              │
              ▼
         SSD / HDD
Slowest
```
As you go down:
- Memory becomes **larger**
- Memory becomes **slower**
- Memory becomes **cheaper per GB**
---
## Example
Suppose your program repeatedly does:

```c++
sum += arr[i];
```

The CPU accesses the same memory region again and again.

Instead of fetching from RAM every time:

```plain text
CPU
 │
 ▼
Cache ✅
 │
 ▼
RAM (only if needed)
```
This is much faster.
---
# Why Does Cache Improve Performance?
Because many programs tend to reuse the same data or nearby data.

Instead of repeatedly accessing slower RAM, the CPU finds the data in the cache.

This significantly reduces memory access time.
---
# Locality of Reference
Cache works because programs usually access memory in predictable patterns.

There are two important types.
---
## 1. Temporal Locality
**Meaning:**

If a program accesses some data now, it's likely to access the **same data again soon**.

### Example
```c++
for(int i = 0; i < 1000; i++) {
    count++;
}
```
The variable `count` is accessed repeatedly.

The CPU keeps it in cache.

This is **Temporal Locality**.
---
## 2. Spatial Locality
**Meaning:**

If a program accesses one memory location, it's likely to access **nearby memory locations** soon.

### Example
```c++
for(int i = 0; i < 1000; i++) {
    sum += arr[i];
}
```
The CPU reads:

```plain text
arr[0]
arr[1]
arr[2]
arr[3]
...
```
These elements are stored next to each other in memory.

The CPU often loads a whole **cache line**.

So when `arr[0]` is fetched, `arr[1]`, `arr[2]`, etc., are likely already in cache.

This is **Spatial Locality**.
---
# Comparison
<table header-row="true">
<tr>
<td>Temporal Locality</td>
<td>Spatial Locality</td>
</tr>
<tr>
<td>Reuse the **same** data soon.</td>
<td>Access **nearby** data soon.</td>
</tr>
<tr>
<td>Example: Updating the same variable repeatedly.</td>
<td>Example: Iterating through an array.</td>
</tr>
</table>
---
# Real-Life Analogy
Imagine you're cooking.

- **Temporal Locality:** You use the same spoon over and over, so you keep it on the counter instead of putting it back in the drawer each time.
- **Spatial Locality:** When you take out the salt, the pepper is right next to it, so keeping both nearby is useful because you'll probably use them together.
---
# Interview Questions
### Why is cache faster than RAM?
Because cache is built using **SRAM**, which is faster but more expensive and smaller than the **DRAM** used for main memory.
---
### Why doesn't a computer use only cache?
Because cache is **very expensive** and consumes more chip area.

RAM is slower but much cheaper and available in much larger capacities.
---
### What is locality of reference?
It is the tendency of programs to access the **same data repeatedly (temporal locality)** or **nearby data (spatial locality)**.

Cache memory relies on this behavior to improve performance.
---
# Backend Connection
Even as a backend developer, this concept matters.
For example:
```c++
// Cache-friendly
for (int i = 0; i < n; i++) {
    sum += arr[i];
}
```
This benefits from **spatial locality** because array elements are contiguous.

Whereas code that jumps randomly around memory (for example, following scattered pointers in a large data structure) often results in more **cache misses**, reducing performance.

You don't usually optimize for cache in day-to-day backend work, but understanding why some code is more cache-friendly is valuable in performance-critical systems.
