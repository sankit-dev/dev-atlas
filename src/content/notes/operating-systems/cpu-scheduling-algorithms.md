---
title: "CPU Scheduling Algorithms"
slug: "cpu-scheduling-algorithms"
description: "FCFS, SJF, Round Robin, Priority Scheduling, Multilevel Queue."
track: "Operating Systems"
---

## What is CPU scheduling?

CPU scheduling is the process of deciding which process gets the CPU next.

Since a single CPU core can execute only one process or thread at a time, the operating system uses a CPU scheduler to decide the execution order.

Example processes waiting for the CPU:

```plain text
Chrome
Spotify
VS Code
Discord
```

The scheduler decides which one should execute first.

---

## Why is CPU scheduling needed?

Imagine three processes:

| Process | CPU Time |
| --- | --- |
| Chrome | 10 sec |
| Spotify | 2 sec |
| VS Code | 1 sec |

If Chrome executes first, Spotify and VS Code must wait 10 seconds.

A better strategy may be to execute shorter jobs first so that more processes finish quickly. This is why different scheduling algorithms exist.

---

## First Come First Serve

First Come First Serve, or FCFS, executes processes in the order they arrive.

Example arrival order:

```plain text
Chrome (10s)
Spotify (2s)
VS Code (1s)
```

Execution:

```plain text
Chrome -> Spotify -> VS Code
```

Pros:

- Simple to implement.

Cons:

- Long processes make shorter processes wait.
- It can cause the convoy effect.

---

## Shortest Job First

Shortest Job First, or SJF, executes the process with the shortest CPU burst first.

Example:

```plain text
Chrome (10s)
Spotify (2s)
VS Code (1s)
```

Execution:

```plain text
VS Code -> Spotify -> Chrome
```

Pros:

- Reduces average waiting time.

Cons:

- Long processes may starve if short jobs keep arriving.

Example:

```plain text
Chrome (10s) waits

Calculator (1s)
Notepad (1s)
Terminal (1s)
```

Chrome may keep waiting indefinitely.

---

## Round Robin

Round Robin gives each process a fixed amount of CPU time called the time quantum.

If a process does not finish within its quantum, it goes back to the end of the queue.

Example with a 2 second time quantum:

```plain text
Chrome (10s)
Spotify (2s)
VS Code (1s)
```

Execution:

```plain text
Chrome -> 2s
Spotify -> finished
VS Code -> finished
Chrome -> 2s
Chrome -> ...
```

Pros:

- Fair scheduling.
- Every process gets CPU time.
- Prevents starvation.

Cons:

- If the time quantum is too small, context switching happens too often.
- If the time quantum is too large, Round Robin behaves like FCFS.

---

## Priority Scheduling

Priority scheduling assigns each process a priority. The scheduler executes the highest-priority process first.

Example:

```plain text
Watch Movie    -> High Priority
Download Movie -> Medium Priority
App Update     -> Low Priority
```

Movie playback should receive CPU first because it is latency-sensitive, while downloads and updates can wait.

Pros:

- Important tasks are executed first.

Cons:

- Low-priority processes may starve.

---

## Interview points

### Why not always use SJF?

Because long-running processes may starve.

### Why not always use Round Robin?

Choosing the wrong time quantum can either increase context switching or make the system less responsive.

### Which algorithm do real operating systems use?

Modern operating systems such as Linux, Windows, and macOS do not use a single simple algorithm. They use hybrid schedulers that combine ideas from Round Robin, priority scheduling, aging, and other optimizations.
