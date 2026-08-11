---
title: "System Calls"
slug: "system-calls"
description: "fork, exec, and how user mode transitions to kernel mode."
track: "Operating Systems"
---

# System Calls
## Why Do We Need System Calls?
Suppose your program wants to:
- Read a file
- Write to a file
- Create a new process
- Allocate memory
- Open a network socket

Can your program directly access the hard disk, RAM, or CPU?

**No.**

The operating system controls all hardware resources.

So whenever a program needs a service from the OS, it makes a **System Call**.
---
## Definition
A **System Call** is a mechanism through which a user program requests services from the operating system's kernel.
Think of it as:
> **A bridge between User Space and Kernel Space.**
---
## User Space vs Kernel Space
Applications like:
- Chrome
- VS Code
- Node.js
- Python
run in **User Space**.
The operating system runs in **Kernel Space**.
```plain text
+----------------------+
|      User Space      |
|----------------------|
| Chrome               |
| VS Code              |
| Node.js              |
+----------------------+
          │
     System Call
          │
          ▼
+----------------------+
|     Kernel Space     |
|----------------------|
| File System          |
| Memory Manager       |
| Process Scheduler    |
| Device Drivers       |
+----------------------+
```
Applications cannot directly access kernel resources.
They must use **System Calls**.
---
# Example
Suppose your Node.js application reads a file.

```javascript
fs.readFile("data.txt")
```

What actually happens?

```plain text
Node.js Application
        │
        ▼
System Call (read/open)
        │
        ▼
Kernel
        │
        ▼
Disk
```
Your program never talks directly to the disk.

The kernel does.
---
# Common Types of System Calls
### 1. Process Management
Used for:

- Creating processes
- Terminating processes
- Waiting for processes

Examples:
- `fork()`
- `exec()`
- `exit()`
- `wait()`
---
### 2. File Management
Used for:

- Creating files
- Opening files
- Reading files
- Writing files
- Closing files

Examples:
- `open()`
- `read()`
- `write()`
- `close()`
---
### 3. Memory Management
Used for:

- Allocating memory
- Freeing memory

Examples:
- `mmap()`
- `brk()`
---
### 4. Device Management
Used for interacting with hardware devices.

Examples:
- Reading from keyboard
- Writing to printer
---
### 5. Communication
Used for communication between processes or over a network.

Examples:
- `socket()`
- `send()`
- `recv()`
- `pipe()`
---
# Why Not Let Applications Access Hardware Directly?
Imagine any application could directly access RAM or the disk.

Problems:
- One application could overwrite another application's memory.
- Malware could access sensitive files.
- Multiple applications could conflict while using hardware.

The kernel acts as a **security and resource manager**.
---
# Real-Life Analogy
Imagine a bank.

You (the application) cannot enter the vault directly.

You ask the bank employee (the kernel).

The employee checks your request and then accesses the vault.

The **request** you make is the **System Call**.
---
# Key Points
- Applications run in **User Space**.
- The OS runs in **Kernel Space**.
- Applications use **System Calls** to request OS services.
- System Calls provide controlled access to hardware and system resources.
---
# How does User Mode transition to Kernel Mode?
Remember:
```plain text
+------------------------+
| User Mode              |
| Chrome                 |
| Node.js                |
| VS Code                |
+------------------------+
           │
     System Call
           │
           ▼
+------------------------+
| Kernel Mode            |
| File System            |
| Process Scheduler      |
| Memory Manager         |
+------------------------+
```
The question is:
> **How does the CPU move from User Mode to Kernel Mode?**
---
## Step-by-Step
Suppose your Node.js program executes:

```javascript
fs.readFile("data.txt");
```

### Step 1: Program runs in User Mode
Initially, your program is running normally.

```plain text
CPU
│
└── User Mode
```

User mode has **restricted permissions**.

It cannot:
- Read the disk directly
- Access hardware
- Change page tables
- Execute privileged CPU instructions
---
### Step 2: Program requests an OS service
The runtime eventually executes a **system call**.

Think of it as saying:

> "Kernel, please read this file for me."
---
### Step 3: Special CPU instruction
The program executes a **special CPU instruction**.

Examples:
- `syscall` (x86-64)
- `sysenter`
- `svc` (ARM)

This instruction is recognized by the CPU as:

> "Switch to Kernel Mode."
---
### Step 4: CPU switches to Kernel Mode
The CPU automatically:

- Changes its privilege level from **User Mode** to **Kernel Mode**.
- Saves the current program's state (registers, instruction pointer, etc.).
- Jumps to the kernel's system call handler.

```plain text
User Mode
    │
    │ syscall instruction
    ▼
Kernel Mode
```
---
### Step 5: Kernel performs the work
The kernel now has full privileges.

It can:
- Read the disk
- Allocate memory
- Open sockets
- Create processes

In our example:

```plain text
Kernel
      │
      ▼
Read data.txt from disk
```
---
### Step 6: Return to User Mode
Once finished, the kernel:

- Places the result where the program expects it.
- Restores the saved CPU state.
- Executes a special **return-from-system-call** instruction.

The CPU switches back to **User Mode**, and your program continues.

```plain text
User Mode
     │
     ▼
System Call
     │
     ▼
Kernel Mode
     │
     ▼
Do the work
     │
     ▼
Return to User Mode
```
---
# Complete Flow
```plain text
Node.js Program (User Mode)
        │
        ▼
fs.readFile()
        │
        ▼
System Call (syscall instruction)
        │
        ▼
CPU switches to Kernel Mode
        │
        ▼
Kernel reads file from disk
        │
        ▼
Kernel returns data
        │
        ▼
CPU switches back to User Mode
        │
        ▼
Program continues
```
---
# Why can't the program just switch to Kernel Mode itself?
Because that would be a huge security risk.

Imagine any program could enter Kernel Mode whenever it wanted.

It could:
- Delete operating system files.
- Read another application's memory.
- Disable security features.
- Crash the entire system.

The CPU prevents this.

Only the **special system call instruction** can legally trigger the transition, and control always goes to a predefined entry point in the kernel.
---
## Interview Answer
> **How does User Mode transition to Kernel Mode?**

A program executes a **system call**, which uses a special CPU instruction such as `syscall` on x86-64.

The CPU saves the current execution state and switches from **User Mode** to **Kernel Mode**.

Control goes to the kernel's system call handler.

After the requested operation is complete, the CPU restores the state and returns to **User Mode**.

This is the explanation interviewers usually expect for backend and systems roles.

# Interview Questions
### Q1. What is a System Call?
A System Call is a mechanism that allows a user program to request services from the operating system's kernel.
---
### Q2. Why are System Calls needed?
Because user applications cannot directly access hardware or privileged OS resources.

They must request these services from the kernel.
---
### Q3. Give some examples of System Calls.
- `read()`
- `write()`
- `open()`
- `close()`
- `fork()`
- `exec()`
- `socket()`
