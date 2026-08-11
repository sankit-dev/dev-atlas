---
title: "Multithreading vs Multiprocessing vs Multitasking"
slug: "multithreading-vs-multiprocessing-vs-multitasking"
description: "Clear distinction with real-world examples."
track: "Operating Systems"
---

# Multitasking
## Definition
**Multitasking** means the operating system can manage **multiple programs or applications** at the same time.

The OS rapidly switches the CPU between programs.

Because this switching happens very fast, it feels like all programs are running together.

In simple words:

> **Multiple applications are active at the same time.**
---
## Example
You are using:
- Chrome
- VS Code
- Spotify
- Terminal

All of them appear to run together.

This is **Multitasking**.
---
## Key Points
- It is an **OS-level concept**.
- Multiple applications run **concurrently**.
- The OS uses **CPU scheduling** and **context switching**.
- On a single-core CPU, tasks are switched rapidly.
- On a multi-core CPU, some tasks may actually run in parallel.
---
# Multiprocessing
## Definition
**Multiprocessing** means using **multiple CPU cores or processors** to run multiple processes.

Here, work can actually happen at the same time on different CPU cores.

Unlike basic multitasking, multiprocessing can provide **true parallel execution**.

In simple words:

> **Multiple CPU cores execute multiple processes in parallel.**
---
## Example
Suppose your computer has:
```plain text
CPU = 8 Cores
```
The OS can run:
- Chrome on Core 1
- VS Code on Core 2
- Docker on Core 3
- Spotify on Core 4

These can execute at the same time on different cores.

This is **Multiprocessing**.
---
## Key Points
- It is mainly a **hardware + OS concept**.
- It uses **multiple CPU cores**.
- Each process has its **own memory space**.
- It provides **true parallelism**.
- It improves performance for CPU-heavy workloads.
---
# Multithreading
## Definition
**Multithreading** means running multiple threads inside the **same process**.

Threads share the same memory and resources of that process.

Each thread can still execute independently.

In simple words:

> **One application is split into multiple smaller execution paths.**
---
## Example
Chrome is one process.

Inside Chrome:
- UI Thread
- Network Thread
- Rendering Thread
- JavaScript Engine Thread

These threads work together.

This is **Multithreading**.
---
## Key Points
- Multiple threads exist **inside one process**.
- Threads share the same memory.
- Communication between threads is faster than communication between separate processes.
- It requires synchronization, such as **Mutex** or **Semaphore**.
- If synchronization is not handled properly, race conditions can occur.
---
# Comparison
<table header-row="true">
<tr>
<td>Multitasking</td>
<td>Multiprocessing</td>
<td>Multithreading</td>
</tr>
<tr>
<td>Multiple applications run together.</td>
<td>Multiple processes execute on multiple CPU cores.</td>
<td>Multiple threads execute within the same process.</td>
</tr>
<tr>
<td>OS-level feature.</td>
<td>Hardware + OS feature.</td>
<td>Process-level feature.</td>
</tr>
<tr>
<td>May use one or many CPU cores.</td>
<td>Requires multiple CPU cores/processors for true parallelism.</td>
<td>Threads share the same memory space.</td>
</tr>
<tr>
<td>Example: Chrome + VS Code + Spotify.</td>
<td>Chrome on Core 1, VS Code on Core 2.</td>
<td>UI Thread + Network Thread + Rendering Thread in Chrome.</td>
</tr>
</table>
---
# Relationship
This picture helps remember everything:
```plain text
Operating System
│
├── Multitasking
│      ├── Chrome (Process)
│      ├── VS Code (Process)
│      └── Spotify (Process)
│
└── Chrome (One Process)
        ├── UI Thread
        ├── Network Thread
        ├── Rendering Thread
        └── JS Thread
```
- **Multitasking** → Multiple applications/processes.
- **Multithreading** → Multiple threads inside one application.
- **Multiprocessing** → Multiple CPU cores executing processes in parallel.
---
# One thing that interviewers like to ask
> **Can a computer do all three at the same time?**
**Yes.**

Example:
- You're running **Chrome**, **VS Code**, and **Spotify** → **Multitasking**.
- Chrome has multiple threads (UI, rendering, networking) → **Multithreading**.
- Your 8-core CPU runs different processes on different cores simultaneously → **Multiprocessing**.

All three concepts can exist **at the same time**.
---
This is usually all that's expected for backend interviews. The important thing is to understand **what is "multiple"** in each term:

- **Multitasking** → Multiple **tasks/applications**.
- **Multiprocessing** → Multiple **processes on multiple CPU cores**.
- **Multithreading** → Multiple **threads within a process**.
