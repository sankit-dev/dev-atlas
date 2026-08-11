---
title: "System Calls"
slug: "system-calls"
description: "fork, exec, and how user mode transitions to kernel mode."
track: "Operating Systems"
---

## Why do we need system calls?

Suppose your program wants to:

- Read a file.
- Write to a file.
- Create a new process.
- Allocate memory.
- Open a network socket.

Can your program directly access the hard disk, RAM, or CPU?

No. The operating system controls hardware resources. Whenever a program needs a service from the operating system, it makes a system call.

---

## Definition

A system call is a mechanism through which a user program requests services from the operating system kernel.

Think of it as:

> A bridge between user space and kernel space.

---

## User space vs kernel space

Applications such as Chrome, VS Code, Node.js, and Python run in user space.

The operating system kernel runs in kernel space.

```plain text
+----------------------+
|      User Space      |
|----------------------|
| Chrome               |
| VS Code              |
| Node.js              |
+----------------------+
          |
     System Call
          |
          v
+----------------------+
|     Kernel Space     |
|----------------------|
| File System          |
| Memory Manager       |
| Process Scheduler    |
| Device Drivers       |
+----------------------+
```

Applications cannot directly access kernel resources. They must use system calls.

---

## Example

Suppose a Node.js application reads a file:

```javascript
fs.readFile("data.txt")
```

What actually happens:

```plain text
Node.js Application
        |
        v
System Call (read/open)
        |
        v
Kernel
        |
        v
Disk
```

Your program never talks directly to the disk. The kernel does.

---

## Common types of system calls

### Process management

Used for creating, terminating, and waiting for processes.

Examples:

- `fork()`
- `exec()`
- `exit()`
- `wait()`

### File management

Used for creating, opening, reading, writing, and closing files.

Examples:

- `open()`
- `read()`
- `write()`
- `close()`

### Memory management

Used for allocating and freeing memory.

Examples:

- `mmap()`
- `brk()`

### Device management

Used for interacting with hardware devices such as keyboards and printers.

### Communication

Used for communication between processes or over a network.

Examples:

- `socket()`
- `send()`
- `recv()`
- `pipe()`

---

## Why not let applications access hardware directly?

If any application could directly access RAM or disk:

- One application could overwrite another application's memory.
- Malware could access sensitive files.
- Multiple applications could conflict while using hardware.

The kernel acts as a security and resource manager.

---

## User mode to kernel mode

The CPU moves from user mode to kernel mode through a system call.

Suppose your program executes:

```javascript
fs.readFile("data.txt")
```

### Step 1: Program runs in user mode

User mode has restricted permissions. It cannot:

- Read the disk directly.
- Access hardware.
- Change page tables.
- Execute privileged CPU instructions.

### Step 2: Program requests an OS service

The runtime eventually executes a system call.

### Step 3: Special CPU instruction

The program executes a special CPU instruction such as:

- `syscall` on x86-64.
- `sysenter`.
- `svc` on ARM.

This instruction tells the CPU to switch to kernel mode.

### Step 4: CPU switches to kernel mode

The CPU automatically:

- Changes privilege level from user mode to kernel mode.
- Saves the current program state.
- Jumps to the kernel's system call handler.

### Step 5: Kernel performs the work

The kernel can now read the disk, allocate memory, open sockets, or create processes.

### Step 6: Return to user mode

When finished, the kernel:

- Places the result where the program expects it.
- Restores the saved CPU state.
- Executes a return-from-system-call instruction.

The CPU switches back to user mode and the program continues.

---

## Complete flow

```plain text
Node.js Program (User Mode)
        |
        v
fs.readFile()
        |
        v
System Call
        |
        v
CPU switches to Kernel Mode
        |
        v
Kernel reads file from disk
        |
        v
Kernel returns data
        |
        v
CPU switches back to User Mode
        |
        v
Program continues
```

---

## Why can't a program switch to kernel mode itself?

That would be a huge security risk. A malicious program could delete operating system files, read another application's memory, disable security features, or crash the entire system.

The CPU prevents this. Only special system call instructions can legally trigger the transition, and control goes to a predefined entry point in the kernel.

---

## Interview answer

> A program executes a system call, which uses a special CPU instruction such as `syscall`. The CPU saves the current execution state, switches from user mode to kernel mode, transfers control to the kernel's system call handler, and after the requested operation completes, restores the state and returns to user mode.

---

## Interview questions

### What is a system call?

A system call is a mechanism that allows a user program to request services from the operating system kernel.

### Why are system calls needed?

Because user applications cannot directly access hardware or privileged operating system resources.

### Give examples of system calls.

- `read()`
- `write()`
- `open()`
- `close()`
- `fork()`
- `exec()`
- `socket()`
