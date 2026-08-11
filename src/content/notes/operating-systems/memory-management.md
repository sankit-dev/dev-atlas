---
title: "Memory Management"
slug: "memory-management"
description: "Paging, Segmentation, Virtual Memory, Page Faults."
track: "Operating Systems"
---

# Physical Memory vs Virtual Memory
## Physical Memory (RAM)
Physical Memory is the **actual RAM installed** in the computer.

It is a hardware resource used to store data and instructions that are currently being executed.

**Example:**
- Laptop RAM = **16 GB**
---
## Virtual Memory
Virtual Memory is a **logical memory space** created by the operating system.

It gives each process the illusion of having its own large, continuous memory space, even if physical RAM is limited.

When RAM is full, the OS can temporarily move inactive data to **disk (swap space/page file)** and load it back into RAM when needed.
---
## Why Virtual Memory?
- Allows programs to use more memory than the available physical RAM.
- Provides memory isolation between processes.
- Prevents one process from accessing another process's memory.
- Simplifies memory management for applications.
---
## Physical Memory vs Virtual Memory
<table header-row="true">
<tr>
<td>Physical Memory</td>
<td>Virtual Memory</td>
</tr>
<tr>
<td>Actual RAM installed in the system.</td>
<td>Logical memory space created by the OS.</td>
</tr>
<tr>
<td>Hardware resource.</td>
<td>OS-managed abstraction.</td>
</tr>
<tr>
<td>Limited by installed RAM.</td>
<td>Can appear larger than physical RAM.</td>
</tr>
<tr>
<td>Faster access.</td>
<td>May be slower if data needs to be fetched from disk.</td>
</tr>
</table>
---
## Important Points
- Every process gets its own **virtual address space**.
- A process **does not access RAM directly**; the OS maps virtual addresses to physical memory.
- Allocating **4 GB of virtual memory does not mean 4 GB of RAM is immediately used**.
- Physical RAM is allocated as the process actually accesses its virtual memory (this is achieved through **Demand Paging**).
---
## Example
A process is allocated **4 GB** of virtual memory.

Initially:
```plain text
Virtual Memory = 4 GB
Physical RAM Used = 150 MB
```

The remaining memory is allocated only when the process needs it.
---
# Paging
## Why Do We Need Paging?
We learned that:
- Every process gets **Virtual Memory**.
- RAM is **Physical Memory**.

Now the question is:

> **How does the OS know where a process's virtual memory is stored in RAM?**

The answer is **Paging**.
---
## Definition
**Paging** is a memory management technique in which both **Virtual Memory** and **Physical Memory (RAM)** are divided into fixed-size blocks.

- Blocks in **Virtual Memory** are called **Pages**.
- Blocks in **Physical Memory (RAM)** are called **Frames**.

The OS maps **pages** to **frames**.
---
## Visualization
Suppose a process has 16 KB of virtual memory.

The page size is **4 KB**.

Virtual Memory:
```plain text
+--------+  Page 0 (4 KB)
+--------+  Page 1 (4 KB)
+--------+  Page 2 (4 KB)
+--------+  Page 3 (4 KB)
```
RAM is also divided into 4 KB blocks called frames.

```plain text
+--------+  Frame 0
+--------+  Frame 1
+--------+  Frame 2
+--------+  Frame 3
+--------+  Frame 4
+--------+  Frame 5
```
The OS may store them like this:

```plain text
Page 0 → Frame 3
Page 1 → Frame 0
Page 2 → Frame 5
Page 3 → Frame 2
```
Notice something important:

👉 **Pages do NOT need to be stored next to each other in RAM.**

They can be placed anywhere there is a free frame.
---
## Why is this useful?
Without paging, a process would need one **large continuous block** of RAM.

That can be difficult if memory is fragmented.

With paging:
- The OS simply finds free frames.
- It places each page wherever space is available.
- The process still thinks its memory is continuous because the OS handles the mapping.
---
## Example
Suppose a process needs **16 KB**.

Page size = **4 KB**.

Instead of finding one continuous 16 KB block, the OS stores:

```plain text
Page 0 → Frame 7
Page 1 → Frame 1
Page 2 → Frame 12
Page 3 → Frame 5
```
The process never notices because the OS translates the addresses behind the scenes.
---
## Key Points
- Virtual Memory is divided into **Pages**.
- Physical Memory (RAM) is divided into **Frames**.
- Pages and Frames are of the **same size**.
- The OS maps pages to frames.
- Pages can be stored anywhere in RAM; they do not need to be contiguous
---
## Page Table
The OS divided memory into pages and frames.

But how does it remember which page is stored in which frame?

The answer is **Page Table.**

A **Page Table** is a data structure maintained by the operating system that stores the mapping between a process's **virtual pages** and **physical frames**.

Simply put:

> It tells the OS **which page is stored in which frame**.

## Visualization
Imagine a small table

<table header-row="true">
<tr>
<td>Page Number</td>
<td>Frame Number</td>
</tr>
<tr>
<td>0</td>
<td>7</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
</tr>
<tr>
<td>2</td>
<td>10</td>
</tr>
<tr>
<td>3</td>
<td>5</td>
</tr>
</table>

When the CPU asks for:

```plain text
Virtual Address → Page 2
```

The OS checks:

```plain text
Page Table

Page 2 → Frame 10
```

Now it knows exactly where the data is in RAM.

## Virtual Address vs Physical Address
This is another common interview question.

### Virtual Address
The address generated by the **CPU**.

Example:
```plain text
Page 2, Offset 100
```

The process thinks:

> "My data is on Page 2."

It has no idea where the data actually is in RAM.
---
### Physical Address
The actual location in RAM after the OS translates the virtual address.

Example:
```plain text
Frame 10, Offset 100
```

Notice something:

Only the **page number changes**.

The **offset remains the same**.

We'll see why in a second.
---
## Address Translation
Suppose the CPU wants to read:

```plain text
Page 2
Offset 100
```

Step 1:

Look in the page table.

```plain text
Page 2 → Frame 10
```

Step 2:

Replace the page number.

```plain text
Frame 10
Offset 100
```

RAM now knows exactly where to read.

This process is called **Address Translation**.
---
## Why does the offset stay the same?
Imagine each page/frame is **4 KB**.

If your data is **100 bytes** from the beginning of the page, it should also be **100 bytes** from the beginning of the frame.

Example:
```plain text
Virtual Memory

Page 2
┌──────────────────────┐
│                      │
│ Data ← 100 bytes     │
│                      │
└──────────────────────┘
```
Mapped to:

```plain text
RAM

Frame 10
┌──────────────────────┐
│                      │
│ Data ← 100 bytes     │
│                      │
└──────────────────────┘
```
The page changes to a frame, but the position **inside** it doesn't change.
---
## Key Points
- Every process has its **own page table**.
- The page table maps **virtual pages** to **physical frames**.
- It is used during **address translation**.
- The **page number changes**, but the **offset stays the same**.
---
# TLB (Translation Lookaside Buffer)
## Why Do We Need a TLB?
We learned that every time the CPU accesses memory, it first checks the **Page Table** to find the corresponding frame.

So the process looks like this:

```plain text
CPU
  │
  ▼
Page Table
  │
  ▼
RAM
```
But here's the problem:

The **Page Table is itself stored in RAM**.

That means for **every memory access**, the CPU has to:

1. Read the Page Table from RAM.
2. Read the actual data from RAM.

This results in **two memory accesses** instead of one.
---
## The Problem
Suppose your program wants to read:

```c++
int x = arr[5];
```

Without a TLB:

```plain text
CPU
 │
 ▼
Read Page Table from RAM
 │
 ▼
Find Frame Number
 │
 ▼
Read Actual Data from RAM
```
Two RAM accesses are required.

Since RAM access is relatively slow compared to the CPU, this affects performance.
---
# Definition
A **TLB (Translation Lookaside Buffer)** is a **small, high-speed cache** that stores recently used **Page Table entries**.

Instead of checking the Page Table in RAM every time, the CPU first checks the TLB.
---
## How it Works
```plain text
CPU
 │
 ▼
TLB
 │
 ├── Found (TLB Hit) ──► Read Data from RAM ✅
 │
 └── Not Found (TLB Miss)
          │
          ▼
     Page Table (RAM)
          │
          ▼
     Update TLB
          │
          ▼
     Read Data from RAM
```
---
## TLB Hit
Suppose:

```plain text
Page 2 → Frame 10
```

is already stored in the TLB.

The CPU immediately gets:

```plain text
Frame 10
```

and reads the data from RAM.

Only **one RAM access** is needed.

This is called a **TLB Hit**.
---
## TLB Miss
Suppose the required page mapping is **not** in the TLB.

The CPU:

1. Looks in the Page Table.
2. Finds the frame.
3. Stores this mapping in the TLB.
4. Reads the actual data.

This is called a **TLB Miss**.
---
## Real-Life Example
Imagine a teacher who frequently looks up student roll numbers.

Without memory:

Every time, the teacher opens the attendance register.

With memory:

The teacher remembers the roll numbers of frequently called students.

The teacher doesn't need to open the register every time.

The **attendance register** is like the **Page Table**.

The teacher's **memory** is like the **TLB**.
---
## Key Points
- TLB is a **cache for Page Table entries**.
- It stores recently used page-to-frame mappings.
- **TLB Hit** → Faster address translation.
- **TLB Miss** → OS checks the Page Table and updates the TLB.
- Improves memory access performance.
---
## Interview Tip
One common question is:

> **Why is a TLB needed if we already have a Page Table?**

**Answer:**

Because the Page Table is stored in RAM.

Without a TLB, every memory access would require an additional memory access to read the Page Table.

The TLB caches recent mappings, reducing this overhead and improving performance.
---
### What you've learned so far
```plain text
Process
    │
    ▼
Virtual Memory
    │
    ▼
Paging
    │
    ▼
Page Table (Page → Frame)
    │
    ▼
TLB (Caches recent Page Table entries)
```
The next topic, **Page Fault**, will complete this entire flow by answering:

> **What happens if the required page isn't even present in RAM?**

---
# Page Fault
## Why Do We Need Page Faults?
We learned:
- A process has **Virtual Memory**.
- Virtual Memory is divided into **Pages**.
- Pages are mapped to **Frames** using the **Page Table**.
- The **TLB** speeds up this lookup.

Now here's the question:

> **What if the page the process wants is not in RAM?**

The answer is **Page Fault**.
---
# Definition
A **Page Fault** occurs when a process tries to access a page that is **not currently loaded in Physical Memory (RAM).**

The operating system then loads the required page from **disk (swap space/page file)** into RAM.
---
## Example
Suppose a process has four pages.

```plain text
Page 0
Page 1
Page 2
Page 3
```
Currently, RAM contains only:

```plain text
Page 0 → Frame 3
Page 1 → Frame 8
```

The remaining pages are on disk.

Now the process tries to access:

```plain text
Page 2
```

The OS checks the page table and finds that **Page 2 is not in RAM**.

➡️ A **Page Fault** occurs.
---
## What Happens During a Page Fault?
1. CPU requests **Page 2**.
2. OS checks the page table.
3. Page 2 is not present in RAM.
4. A **Page Fault** is raised.
5. The OS loads Page 2 from disk into a free frame in RAM.
6. The page table is updated.
7. The program continues execution.

Flow:

```plain text
CPU
 │
 ▼
Needs Page 2
 │
 ▼
Page not in RAM
 │
 ▼
Page Fault
 │
 ▼
Load Page from Disk
 │
 ▼
Update Page Table
 │
 ▼
Resume Program
```
---
## Why is a Page Fault Slow?
RAM is much faster than disk.

Approximate speeds:
- RAM → Nanoseconds
- Disk (SSD/HDD) → Microseconds to milliseconds

Since the OS has to read the page from disk, a page fault is much slower than a normal memory access.
---
## Demand Paging
This is the concept you already discovered earlier.

The OS **does not load all pages into RAM immediately**.

Instead, it loads a page **only when the process actually needs it**.

This technique is called **Demand Paging**.

Example:

A process has:

```plain text
100 Pages
```

Initially, only:

```plain text
10 Pages
```

may be loaded into RAM.

The remaining 90 pages stay on disk until they're needed.

This saves RAM and allows more processes to run simultaneously.
---
## Key Points
- A page fault occurs when a required page is **not present in RAM**.
- The OS loads the page from **disk** into RAM.
- The page table is updated.
- The program resumes execution.
- Demand Paging loads pages **only when required**, improving memory efficiency.
---
## Interview Tip
**Q: Is a page fault an error?**
**Answer:** No.

A page fault is a **normal event** in operating systems.

It simply tells the OS that the required page isn't currently in RAM and needs to be loaded from disk.
