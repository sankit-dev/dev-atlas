---
title: "Cache Memory & Locality of Reference"
slug: "cache-memory-and-locality-of-reference"
description: "Temporal vs spatial locality and why caching improves performance."
track: "Operating Systems"
---

## Why do we need cache?

The CPU is extremely fast, but RAM is much slower.

```plain text
CPU -> wants data immediately
RAM -> takes longer to respond
```

If the CPU had to wait for RAM every time, it would spend a lot of time idle. To reduce this waiting time, computers use cache memory.

---

## Definition

Cache memory is a small, very fast memory located close to the CPU. It stores frequently or recently used data so the CPU can access it much faster than RAM.

---

## Memory hierarchy

```plain text
Fastest
        CPU Registers
              |
              v
           L1 Cache
              |
              v
           L2 Cache
              |
              v
           L3 Cache
              |
              v
             RAM
              |
              v
         SSD / HDD
Slowest
```

As you go down:

- Memory becomes larger.
- Memory becomes slower.
- Memory becomes cheaper per GB.

---

## Why cache improves performance

Many programs reuse the same data or nearby data. Instead of repeatedly accessing slower RAM, the CPU often finds the needed data in cache.

Example:

```cpp
sum += arr[i];
```

The CPU accesses the same memory region repeatedly. Cache makes this much faster.

---

## Locality of reference

Cache works because programs usually access memory in predictable patterns.

There are two important types:

- Temporal locality.
- Spatial locality.

---

## Temporal locality

Temporal locality means if a program accesses some data now, it is likely to access the same data again soon.

Example:

```cpp
for (int i = 0; i < 1000; i++) {
  count++;
}
```

The variable `count` is accessed repeatedly, so the CPU keeps it in cache.

---

## Spatial locality

Spatial locality means if a program accesses one memory location, it is likely to access nearby memory locations soon.

Example:

```cpp
for (int i = 0; i < 1000; i++) {
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

These elements are stored next to each other in memory. The CPU often loads a cache line, which is a small contiguous block of memory. When `arr[0]` is fetched, nearby elements may already be in cache.

---

## Comparison

| Temporal Locality | Spatial Locality |
| --- | --- |
| Reuse the same data soon. | Access nearby data soon. |
| Example: updating the same variable repeatedly. | Example: iterating through an array. |

---

## Real-life analogy

Imagine you are cooking.

- Temporal locality: you use the same spoon over and over, so you keep it on the counter.
- Spatial locality: when you take out salt, pepper is nearby, so keeping both nearby is useful.

---

## Interview questions

### Why is cache faster than RAM?

Cache is built using SRAM, which is faster but more expensive and smaller than the DRAM used for main memory.

### Why does a computer not use only cache?

Cache is very expensive and consumes more chip area. RAM is slower but much cheaper and available in much larger capacities.

### What is locality of reference?

It is the tendency of programs to access the same data repeatedly or nearby data soon. Cache memory relies on this behavior to improve performance.

---

## Backend connection

Even as a backend developer, this matters.

Cache-friendly code:

```cpp
for (int i = 0; i < n; i++) {
  sum += arr[i];
}
```

This benefits from spatial locality because array elements are contiguous.

Code that jumps randomly around memory, such as following scattered pointers in a large data structure, often causes more cache misses and can be slower.
