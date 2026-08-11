---
title: "Process States & Lifecycle"
slug: "process-states-and-lifecycle"
description: "New, Ready, Running, Waiting, Terminated."
track: "Operating Systems"
---

A process goes through different states from creation to termination.

## 1. New
- The process is being created.
- The OS allocates memory and resources.

**Example:** You double-click Chrome.
---
## 2. Ready
- The process is ready to run.
- It is waiting for the CPU.

**Example:** Chrome is loaded into memory but waiting for the CPU to execute it.
---
## 3. Running
- The CPU is executing the process.

**Example:** Chrome is opening a webpage.
---
## 4. Waiting (Blocked)
- The process is waiting for an event or I/O operation to complete.
- During this time, it does not use the CPU.

**Example:**
- Waiting for a file to be read.
- Waiting for data from the internet.
- Waiting for user input.
---
## 5. Terminated (Exit)
- The process has finished execution or has been stopped.
- The OS releases its memory and resources.

**Example:** You close Chrome.
---
# Process Lifecycle
```plain text
New
  │
  ▼
Ready
  │
  ▼
Running
 ├─────────────► Terminated
 │
 ▼
Waiting
 │
 ▼
Ready
```
---
## State Transitions
- **New → Ready** : Process is created.
- **Ready → Running** : CPU scheduler assigns the CPU.
- **Running → Waiting** : Process requests I/O or waits for an event.
- **Waiting → Ready** : I/O or event completes.
- **Running → Ready** : CPU time slice expires (context switch).
- **Running → Terminated** : Process finishes execution.
---
### Interview Tip
> A process spends most of its lifetime alternating between **Ready**, **Running**, and **Waiting** until it eventually reaches **Terminated**.
