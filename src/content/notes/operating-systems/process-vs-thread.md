---
title: "Process vs Thread"
slug: "process-vs-thread"
description: "Core difference, context switching cost, when to prefer one over the other."
track: "Operating Systems"
---

## Program

A program is an executable file that contains instructions or code to run.

Examples:

- Chrome
- VS Code
- Microsoft Word
- Spotify

A program in execution is called a process.

---

## Process

A process is an instance of a running program. In simpler words, a process is a running program.

- Each process is isolated by the operating system.
- One process cannot directly access another process's memory.
- Each process gets its own memory and resources when it is created.
- Two processes cannot communicate directly. They require Inter-Process Communication (IPC).

Examples:

- Running Google Chrome.
- Running VS Code.
- Running Spotify.
- Running a Node.js server.

> If you open Chrome and VS Code, the operating system creates two separate processes.

---

## Thread

A thread is the smallest unit of execution within a process.

- A process can have one or more threads.
- Threads of the same process share memory and resources.
- Multiple threads allow a process to perform multiple tasks at the same time.

Examples:

- Chrome may use one thread to render the webpage, another to handle user input, and another to download files.
- A writing app may use one thread for typing and another for spell checking.
- A music player may use one thread to play music and another to update the UI.
- Node.js runs JavaScript on the main thread, while worker threads can handle CPU-intensive tasks.

---

## Key difference

| Process | Thread |
| --- | --- |
| A process is an independent running program. | A thread is the smallest unit of execution within a process. |
| Each process has its own memory and resources. | Threads share the memory and resources of their process. |
| Processes are isolated from each other. | Threads can directly communicate through shared memory. |
| A process can contain one or more threads. | A thread cannot exist without a process. |

---

## Context switching

Context switching is the process of the CPU saving the state of the currently running process or thread and loading the state of another so execution can continue.

A process context switch is slower because the operating system also switches memory address spaces.

A thread context switch is faster because threads share the same memory, so only the execution state needs to be switched.

The key idea is:

> The CPU pauses one execution, saves its place, and resumes another.

---

## When to prefer a process

Use a process when:

- Isolation is required.
- One application's failure should not affect another.
- Security is important.

Examples:

- Chrome and Spotify run as separate processes.
- A database server and a web server should run as separate processes.

---

## When to prefer threads

Use threads when:

- Multiple tasks belong to the same application.
- Tasks need to share memory and data.
- Better performance and responsiveness are required.

Examples:

- Spell checking while typing.
- Downloading a file while browsing.
- Handling multiple client requests in a server.

---

## Quick revision

- A program is code stored on disk.
- A process is a running program.
- A thread is a unit of execution inside a process.
- Processes are isolated.
- Threads share memory inside the same process.
- Process context switching is usually heavier than thread context switching.
