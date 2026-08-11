---
title: "Concurrency"
slug: "concurrency"
description: "Race Conditions, Critical Section, Mutex vs Semaphore."
track: "Operating Systems"
---

Concurrency is the ability of an operating system to execute multiple processes or threads **simultaneously or in overlapping time periods**.

On a single-core CPU, this is achieved by rapidly switching between tasks using **context switching**.

On a multi-core CPU, tasks can actually execute in parallel.

### Example
Suppose you are:
- Downloading a file
- Listening to music
- Editing a document

The operating system manages all these tasks concurrently, giving the impression that they are running at the same time.

### Why Concurrency is Needed
- Improves CPU utilization
- Increases system throughput
- Enhances responsiveness
- Allows resource sharing among multiple processes
- Supports multitasking

### Types of Concurrency
1. **Process Concurrency**
	- Multiple independent processes execute concurrently.
	- Each process has its own memory space.
2. **Thread Concurrency**
	- Multiple threads within the same process execute concurrently.
	- Threads share the same memory and resources.

### Issues in Concurrency
Concurrency introduces several challenges:

- **Race Condition:** Multiple threads/processes access shared data simultaneously, causing incorrect results.
- **Deadlock:** Two or more processes wait indefinitely for resources held by each other.
- **Starvation:** A process waits indefinitely because other processes continuously receive resources.
- **Livelock:** Processes keep changing their states in response to each other but make no progress.

### Synchronization Mechanisms
To solve concurrency problems, operating systems use:

- Mutex (Mutual Exclusion)
- Semaphores
- Monitors
- Condition Variables
- Locks (Spinlocks, Read-Write Locks)

<table header-row="true">
<colgroup>
<col width="299">
<col width="323">
</colgroup>
<tr>
<td>**Advantages of Concurrency**</td>
<td>**Disadvantages of Concurrency**</td>
</tr>
<tr>
<td>Better CPU utilization by keeping the CPU busy.</td>
<td>Programming becomes more complex.</td>
</tr>
<tr>
<td>Improves system responsiveness (applications remain interactive).</td>
<td>Race conditions can occur when accessing shared data.</td>
</tr>
<tr>
<td>Increases overall system throughput.</td>
<td>Deadlocks may occur if resources are not managed properly.</td>
</tr>
<tr>
<td>Allows multiple tasks to progress at the same time.</td>
<td>Synchronization introduces additional overhead.</td>
</tr>
<tr>
<td>Efficient sharing of system resources.</td>
<td>Debugging and testing concurrent programs is difficult.</td>
</tr>
<tr>
<td>Supports multitasking and multi-user environments.</td>
<td>Starvation and livelock may occur in some scheduling scenarios.</td>
</tr>
</table>

### Diagram
```plain text
          CPU
           |
   -----------------
   |       |       |
 Process1 Process2 Process3
   |       |       |
  Runs concurrently
 (via context switching or multiple cores)
```
---
## Critical Section
A **Critical Section** is a part of a program where a **shared resource** is accessed or modified.

It should be executed by only one thread or process at a time to maintain data consistency.

### Key Points
- It is a **section of code**, not the resource itself.
- It accesses or modifies a **shared resource**.
- If multiple threads/processes execute it simultaneously, it may lead to a **race condition**.
- Synchronization mechanisms like **Mutex** and **Semaphore** are used to protect critical sections.

### Example
```c++
counter++;      // Critical Section
balance -= 500; // Critical Section
```
Here:
- `counter` and `balance` are **shared resources**.
- The statements modifying them are **critical sections**.

### Interview Tip
**Shared Resource ≠ Critical Section**

- **Shared Resource** → Data being shared (e.g., `counter`, file, database row).
- **Critical Section** → Code that accesses or modifies that shared resource.
---
# Race Condition
A **Race Condition** occurs when two or more threads/processes access and modify a **shared resource** at the same time, causing the final result to depend on the order in which they execute.
---
## Key Points
- Occurs only when there is a **shared resource**.
- Usually happens inside a **critical section**.
- The output becomes **unpredictable** because it depends on thread scheduling.
- Can lead to **data inconsistency**.
- Prevented using synchronization mechanisms like **Mutex** and **Semaphore**.
---
## Example
```c++
counter = 0

Thread A:
counter++;

Thread B:
counter++;
```
**Expected Result:**
```plain text
counter = 2
```
**Possible Result (Race Condition):**
```plain text
counter = 1
```
Because both threads read the same value before either writes the updated value.
---
## Relationship with Critical Section
```plain text
Shared Resource
      ↓
Critical Section
      ↓
Multiple threads enter together
      ↓
Race Condition
```
A race condition **can occur only if** multiple threads/processes access a critical section without proper synchronization.
---
## Interview Tip
**Critical Section vs Race Condition**
<table header-row="true">
<tr>
<td>Critical Section</td>
<td>Race Condition</td>
</tr>
<tr>
<td>A section of code that accesses a shared resource.</td>
<td>A problem that occurs when multiple threads/processes execute a critical section simultaneously.</td>
</tr>
<tr>
<td>It is not an error by itself.</td>
<td>It leads to incorrect or inconsistent results.</td>
</tr>
</table>
---
### One thing interviewers often ask
**Is every critical section a race condition?**
**Answer:** No.

A critical section is just code that accesses shared data.

It only becomes a race condition if multiple threads/processes execute it concurrently **without synchronization**.
---
Everything we've learned so far leads to this question:
> **How do we prevent a race condition?**
The simplest answer is **Mutex**.
---
# Mutex (Mutual Exclusion)
A **Mutex (Mutual Exclusion)** is a synchronization mechanism that allows **only one thread or process** to access a critical section at a time.
---
## How it Works
Think of a mutex as a **lock**.

Before entering a critical section:

1. Acquire the lock.
2. Execute the critical section.
3. Release the lock.

If another thread tries to enter while the lock is held, it **waits** until the lock is released.
---
## Example
Without Mutex:
```c++
counter++;
```
If two threads execute this simultaneously, a race condition may occur.

With Mutex:
```c++
lock();

counter++;

unlock();
```
Now only one thread can execute `counter++` at a time.
---
## Key Points
- Prevents **race conditions**.
- Protects **critical sections**.
- Only **one thread/process** can hold the mutex at a time.
- Other threads/processes wait until the mutex is released.
---
## Real-Life Example
Imagine a room with **one key**.

- Whoever has the key can enter the room.
- Everyone else must wait.
- When the person leaves, they return the key.
- The next person can then enter.

The **key** is the **mutex**.
---
## Flow
```plain text
Thread A
    │
Acquire Mutex
    │
Critical Section
    │
Release Mutex
    │
Thread B can now enter
```
---
## Interview Tip
A mutex **doesn't make code faster**.

It makes the code **safe** by ensuring only one thread accesses the critical section at a time.

Sometimes using a mutex can even reduce performance because threads may spend time waiting for the lock.
---
### One important interview question
**Q: Can a race condition still happen if a mutex is used correctly?**
**Answer:** No.

If **every access** to the shared resource is protected by the same mutex and the mutex is used correctly (always locked before access and unlocked afterward), only one thread can execute the critical section at a time, so a race condition is prevented.
---
# Semaphore
A **Semaphore** is a synchronization mechanism that controls access to a shared resource by allowing a **fixed number of threads/processes** to access it at the same time.

Unlike a mutex, which allows **only one** thread, a semaphore allows **multiple** threads depending on its count.
---
## How it Works
A semaphore maintains a **counter**.

For example:
```plain text
Semaphore = 3
```
This means only **3 threads** can enter the critical section simultaneously.

When a thread enters:
```plain text
Semaphore = 2
```
Another enters:

```plain text
Semaphore = 1
```
Another enters:

```plain text
Semaphore = 0
```

Now if a fourth thread arrives, it **waits** until one of the existing threads finishes and releases the semaphore.
---
## Types of Semaphore
### 1. Binary Semaphore
```plain text
Count = 1
```
Allows only one thread at a time.

It behaves similarly to a mutex, but **it is not the same thing**.
---
### 2. Counting Semaphore
```plain text
Count = N
```
Allows **N threads** to access the resource simultaneously.
---
## Example
Imagine a database connection pool with **10 connections**.

Only **10 requests** can use the database at the same time.

If the 11th request arrives, it waits until a connection becomes available.

This is a perfect use case for a **counting semaphore**.
---
## Real-Life Example
Think of a parking lot with **50 parking spaces**.

- 50 cars can park.
- The 51st car must wait.
- When a car leaves, another car can enter.

The available parking spaces are like the semaphore count.
---
## Mutex vs Semaphore
<table header-row="true">
<tr>
<td>Mutex</td>
<td>Semaphore</td>
</tr>
<tr>
<td>Allows only **1** thread.</td>
<td>Allows **N** threads.</td>
</tr>
<tr>
<td>Used to protect a critical section.</td>
<td>Used to manage a limited number of shared resources.</td>
</tr>
<tr>
<td>Acts like a single key.</td>
<td>Acts like multiple keys.</td>
</tr>
</table>
---
## When to Use
Use a **Mutex** when only one thread should access a resource.

Examples:
- Updating a bank account balance
- Modifying a shared variable
- Writing to the same file

Use a **Semaphore** when a limited number of threads can safely access a resource.

Examples:
- Database connection pool
- Thread pool
- Printer pool
- API rate limiting (limited concurrent requests)
---
### One interview question
**Q: Why not always use a semaphore instead of a mutex?**
**Answer:**

Because some resources **must never** be accessed by more than one thread at a time.

For example:
```c++
balance = balance - 500;
```

Allowing multiple threads here could corrupt the balance.

A **mutex** is the correct choice.
