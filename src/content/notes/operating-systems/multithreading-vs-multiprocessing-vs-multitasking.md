---
title: "Multithreading vs Multiprocessing vs Multitasking"
slug: "multithreading-vs-multiprocessing-vs-multitasking"
description: "Clear distinction with real-world examples."
track: "Operating Systems"
---

## Multitasking

Multitasking is the ability of an operating system to run multiple programs or applications at the same time.

The operating system rapidly switches the CPU between programs, making it appear as if they are running simultaneously.

Example:

- Chrome.
- VS Code.
- Spotify.
- Terminal.

All are running together. This is multitasking.

Key points:

- Operating-system-level concept.
- Multiple applications run concurrently.
- Uses CPU scheduling and context switching.

---

## Multiprocessing

Multiprocessing is the use of multiple CPU cores or processors to execute multiple processes simultaneously.

Unlike multitasking, multiprocessing can provide true parallel execution.

Example:

```plain text
CPU = 8 cores
```

The operating system can run:

- Chrome on Core 1.
- VS Code on Core 2.
- Docker on Core 3.
- Spotify on Core 4.

Key points:

- Hardware plus operating-system concept.
- Uses multiple CPU cores.
- Each process has its own memory space.
- Provides true parallelism.

---

## Multithreading

Multithreading is the execution of multiple threads within the same process.

The threads share the same memory and resources but execute independently.

Example: Chrome is one process. Inside Chrome there may be:

- UI thread.
- Network thread.
- Rendering thread.
- JavaScript engine thread.

These threads work together. This is multithreading.

Key points:

- Multiple threads inside one process.
- Threads share memory.
- Communication is faster than communication between processes.
- Requires synchronization mechanisms such as mutexes and semaphores.

---

## Comparison

| Multitasking | Multiprocessing | Multithreading |
| --- | --- | --- |
| Multiple applications run together. | Multiple processes execute on multiple CPU cores. | Multiple threads execute within the same process. |
| OS-level feature. | Hardware plus OS feature. | Process-level feature. |
| May use one or many CPU cores. | Requires multiple CPU cores for true parallelism. | Threads share the same memory space. |
| Example: Chrome, VS Code, and Spotify. | Chrome on Core 1, VS Code on Core 2. | UI thread, network thread, and rendering thread in Chrome. |

---

## Relationship

```plain text
Operating System
|
|-- Multitasking
|   |-- Chrome (Process)
|   |-- VS Code (Process)
|   |-- Spotify (Process)
|
|-- Chrome (One Process)
    |-- UI Thread
    |-- Network Thread
    |-- Rendering Thread
    |-- JS Thread
```

- Multitasking means multiple applications or processes.
- Multithreading means multiple threads inside one application.
- Multiprocessing means multiple CPU cores executing processes in parallel.

---

## Can a computer do all three at the same time?

Yes.

Example:

- You are running Chrome, VS Code, and Spotify: multitasking.
- Chrome has multiple threads for UI, rendering, and networking: multithreading.
- Your 8-core CPU runs different processes on different cores: multiprocessing.

All three concepts can exist at the same time.

---

## Quick memory hook

- Multitasking: multiple tasks or applications.
- Multiprocessing: multiple processes on multiple CPU cores.
- Multithreading: multiple threads within a process.
