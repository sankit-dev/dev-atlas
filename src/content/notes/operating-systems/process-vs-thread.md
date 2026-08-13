---
title: "Process vs Thread"
slug: "process-vs-thread"
description: "Core difference, context switching cost, when to prefer one over the other."
track: "Operating Systems"
---

# 1. Process vs Thread
## Program
Before understanding **Process**, let's first define what a **Program** is.

A **program** is a file that contains instructions or code.

It is stored on disk, but it is not running yet.

**Examples:** Chrome, VS Code, Microsoft Word, Spotify.

When you install Chrome on your laptop, Chrome exists as a program.

But at this point, it is just software stored on disk.

Now the question is:

> **What happens when you double-click Chrome and it starts running?**

At that moment, the Operating System loads that program into memory and starts executing it.

A **program in execution** is called a **Process**.
---
## Process
A **process** is an instance of a running program.

In simple words, a process is a **running program**.

- Each process is isolated by the Operating System.
- One process cannot directly access another process's memory.
- Each process gets its own memory and resources when created.
- Two processes cannot communicate directly.
- They require Inter-Process Communication (IPC).

**Examples:**
- Running Google Chrome.
- Running VS Code.
- Running Spotify.
- Running a Node.js server.

> If you open Chrome and VS Code, the OS creates two separate processes.
---
## Thread
A thread is the smallest unit of execution within a process.

- A process can have one or more threads.
- Threads of the same process share memory and resources.
- Multiple threads allow a process to perform multiple tasks simultaneously.

**Examples:**
- **Chrome**
	- One thread renders the webpage.
	- Another handles user input.
	- Another downloads files.
- **Notion**
	- One thread handles typing.
	- Another performs spell checking.
- **Music Player**
	- One thread plays music.
	- Another updates the UI.
- **Node.js**
	- Main thread executes JavaScript.
	- Worker threads can handle CPU-intensive tasks.
---
## Key Difference
<table header-row="true">
<tr>
<td>Process</td>
<td>Thread</td>
</tr>
<tr>
<td>A process is an independent running program.</td>
<td>A thread is the smallest unit of execution within a process.</td>
</tr>
<tr>
<td>Each process has its own memory and resources.</td>
<td>Threads share the memory and resources of their process.</td>
</tr>
<tr>
<td>Processes are isolated from each other.</td>
<td>Threads can directly communicate through shared memory.</td>
</tr>
<tr>
<td>A process can contain one or more threads.</td>
<td>A thread cannot exist without a process.</td>
</tr>
</table>

> **Context Switching:** The process of the CPU saving the state of the currently running process/thread and loading the state of another so execution can continue.

> **Process context switch** is slower because the OS also switches memory address spaces.

> **Thread context switch** is faster because threads share the same memory, so only the execution state needs to be switched.

The key idea is: **the CPU pauses one execution, saves its place, and resumes another.**

## When to Prefer a Process
Use a **Process** when:
- Isolation is required.
- One application's failure should not affect another.
- Security is important.

**Examples:**
- Chrome and Spotify run as separate processes.
- Database server and web server.
---
## When to Prefer Threads
Use **Threads** when:
- Multiple tasks belong to the same application.
- Tasks need to share memory and data.
- Better performance and responsiveness are required.

**Examples:**
- Spell checking while typing.
- Downloading a file while browsing.
- Handling multiple client requests in a server.
