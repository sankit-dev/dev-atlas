---
title: "Process States & Lifecycle"
slug: "process-states-and-lifecycle"
description: "New, Ready, Running, Waiting, Terminated."
track: "Operating Systems"
---

A process goes through different states from creation to termination.

---

## New

- The process is being created.
- The operating system allocates memory and resources.

Example: you double-click Chrome.

---

## Ready

- The process is ready to run.
- It is waiting for the CPU.

Example: Chrome is loaded into memory but is waiting for the CPU to execute it.

---

## Running

- The CPU is executing the process.

Example: Chrome is opening a webpage.

---

## Waiting or blocked

- The process is waiting for an event or I/O operation to complete.
- During this time, it does not use the CPU.

Examples:

- Waiting for a file to be read.
- Waiting for data from the internet.
- Waiting for user input.

---

## Terminated or exit

- The process has finished execution or has been stopped.
- The operating system releases its memory and resources.

Example: you close Chrome.

---

## Process lifecycle

```plain text
New
  |
  v
Ready
  |
  v
Running
  |------------- Terminated
  |
  v
Waiting
  |
  v
Ready
```

---

## State transitions

- **New -> Ready**: the process is created.
- **Ready -> Running**: the CPU scheduler assigns the CPU.
- **Running -> Waiting**: the process requests I/O or waits for an event.
- **Waiting -> Ready**: I/O or the event completes.
- **Running -> Ready**: the CPU time slice expires and a context switch happens.
- **Running -> Terminated**: the process finishes execution.

---

## Interview tip

> A process spends most of its lifetime alternating between Ready, Running, and Waiting until it eventually reaches Terminated.
