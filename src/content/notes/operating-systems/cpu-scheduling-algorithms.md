---
title: "CPU Scheduling Algorithms"
slug: "cpu-scheduling-algorithms"
description: "FCFS, SJF, Round Robin, Priority Scheduling, Multilevel Queue."
track: "Operating Systems"
---

# What is CPU Scheduling?
CPU Scheduling is the process of deciding **which process gets the CPU next**.

Since a CPU (single core) can execute **only one process/thread at a time**, the Operating System uses a **CPU Scheduler** to decide the execution order.

**Example:**
Processes waiting for the CPU:
```plain text
Chrome
Spotify
VS Code
Discord
```
The scheduler decides which one should execute first.
---
# Why is CPU Scheduling Needed?
Imagine three processes:

<table header-row="true">
<tr>
<td>Process</td>
<td>CPU Time</td>
</tr>
<tr>
<td>Chrome</td>
<td>10 sec</td>
</tr>
<tr>
<td>Spotify</td>
<td>2 sec</td>
</tr>
<tr>
<td>VS Code</td>
<td>1 sec</td>
</tr>
</table>

If Chrome executes first, Spotify and VS Code must wait 10 seconds.

A better strategy may be to execute shorter jobs first so that more processes finish quickly.

This is why different scheduling algorithms exist.
---
# CPU Scheduling Algorithms
## 1. First Come First Serve (FCFS)
Processes are executed in the order they arrive.

### Example
```plain text
Arrival Order

Chrome (10s)
Spotify (2s)
VS Code (1s)
```
Execution:
```plain text
Chrome → Spotify → VS Code
```
### Pros
- Simple to implement.
### Cons
- Long processes make shorter processes wait.
- Causes **Convoy Effect**.
---
## 2. Shortest Job First (SJF)
The process with the shortest CPU burst executes first.
### Example
```plain text
Chrome (10s)
Spotify (2s)
VS Code (1s)
```
Execution:
```plain text
VS Code → Spotify → Chrome
```
### Pros
- Reduces average waiting time.
### Cons
- Long processes may **starve** if short jobs keep arriving.

Example:
```plain text
Chrome (10s)  ← Waiting

Calculator (1s)
Notepad (1s)
Terminal (1s)
```
Chrome may keep waiting indefinitely.
---
## 3. Round Robin (RR)
Each process gets a fixed amount of CPU time called the **Time Quantum**.

If it doesn't finish within its quantum, it goes back to the end of the queue.

### Example
Time Quantum = **2 seconds**

```plain text
Chrome (10s)
Spotify (2s)
VS Code (1s)
```
Execution:
```plain text
Chrome → 2s
Spotify → Finished
VS Code → Finished
Chrome → 2s
Chrome → ...
```
### Pros
- Fair scheduling.
- Every process gets CPU time.
- Prevents starvation.
### Cons
**Time Quantum too small**
- Frequent context switching.
- CPU spends more time switching than executing.
**Time Quantum too large**
- Behaves like FCFS.
- One process can hold the CPU for a long time.
- System becomes less responsive.
---
## 4. Priority Scheduling
Each process is assigned a priority.

The scheduler executes the highest-priority process first.

### Example (Netflix as an operating system)
```plain text
Watch Movie      → High Priority
Download Movie   → Medium Priority
App Update       → Low Priority
```
Movie playback should receive CPU first because it is latency-sensitive, while downloads and updates can wait.

### Pros
- Important tasks are executed first.

### Cons
- Low-priority processes may starve.
---
# Interview Points
### Why not always use SJF?
Because long-running processes may starve.

### Why not always use Round Robin?
Choosing the wrong Time Quantum can either:
- increase context switching (too small), or
- make the system unresponsive (too large).

### Which algorithm do real operating systems use?
Modern operating systems (Linux, Windows, macOS) **do not use a single algorithm**. They use hybrid schedulers that combine ideas from:
- Round Robin
- Priority Scheduling
- Aging
- Other optimization techniques
