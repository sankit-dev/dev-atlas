---
title: "Process Management"
slug: "process-management"
description: "How the OS creates, runs, switches, and schedules executing programs."
track: "Operating Systems"
---

# Process Management

Process management is the part of the operating system that handles running programs.

When you open Chrome, VS Code, Spotify, or a terminal, the OS has to decide:

- What should be loaded into memory?
- Which process gets CPU time?
- What happens when a process waits for I/O?
- How does the CPU switch from one process to another?
- How are multiple tasks kept responsive?

These questions belong to **process management**.

---

# What comes under Process Management?

```plain text
Process Management
├── Process vs Thread
├── Process States & Lifecycle
├── CPU Scheduling Algorithms
└── Multithreading vs Multiprocessing vs Multitasking
```

Start with **Process vs Thread**, because the rest of the topic depends on knowing what the OS is scheduling and switching between.
