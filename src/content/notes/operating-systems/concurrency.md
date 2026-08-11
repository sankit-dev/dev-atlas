---
title: "Concurrency"
slug: "concurrency"
description: "Race Conditions, Critical Section, Mutex vs Semaphore."
track: "Operating Systems"
---

Concurrency is the ability of an operating system to execute multiple processes or threads simultaneously or in overlapping time periods.

On a single-core CPU, concurrency is achieved by rapidly switching between tasks. On a multi-core CPU, tasks can actually execute in parallel.

Example concurrent tasks:

- Downloading a file.
- Listening to music.
- Editing a document.

The operating system manages all these tasks concurrently, giving the impression that they are running at the same time.

---

## Why concurrency is needed

- Improves CPU utilization.
- Increases system throughput.
- Enhances responsiveness.
- Allows resource sharing among multiple processes.
- Supports multitasking.

---

## Types of concurrency

### Process concurrency

- Multiple independent processes execute concurrently.
- Each process has its own memory space.

### Thread concurrency

- Multiple threads within the same process execute concurrently.
- Threads share the same memory and resources.

---

## Issues in concurrency

Concurrency introduces several challenges:

- **Race condition**: multiple threads or processes access shared data simultaneously, causing incorrect results.
- **Deadlock**: two or more processes wait indefinitely for resources held by each other.
- **Starvation**: a process waits indefinitely because other processes continuously receive resources.
- **Livelock**: processes keep changing their states in response to each other but make no progress.

---

## Synchronization mechanisms

Operating systems use these mechanisms to solve concurrency problems:

- Mutex.
- Semaphores.
- Monitors.
- Condition variables.
- Locks such as spinlocks and read-write locks.

| Advantages of concurrency | Disadvantages of concurrency |
| --- | --- |
| Better CPU utilization by keeping the CPU busy. | Programming becomes more complex. |
| Improves system responsiveness. | Race conditions can occur when accessing shared data. |
| Increases overall system throughput. | Deadlocks may occur if resources are not managed properly. |
| Allows multiple tasks to progress at the same time. | Synchronization introduces overhead. |
| Efficient sharing of system resources. | Debugging and testing concurrent programs is difficult. |
| Supports multitasking and multi-user environments. | Starvation and livelock may occur. |

---

## Diagram

```plain text
          CPU
           |
   -----------------
   |       |       |
Process1 Process2 Process3
   |       |       |
Runs concurrently
via context switching or multiple cores
```

---

## Critical section

A critical section is a part of a program where a shared resource is accessed or modified. It should be executed by only one thread or process at a time to maintain data consistency.

Key points:

- It is a section of code, not the resource itself.
- It accesses or modifies a shared resource.
- If multiple threads or processes execute it simultaneously, it may lead to a race condition.
- Mutexes and semaphores are used to protect critical sections.

Example:

```cpp
counter++;      // critical section
balance -= 500; // critical section
```

Here `counter` and `balance` are shared resources. The statements modifying them are critical sections.

> Shared resource is not the same as critical section. The shared resource is the data. The critical section is the code that accesses or modifies it.

---

## Race condition

A race condition occurs when two or more threads or processes access and modify a shared resource at the same time, causing the final result to depend on execution order.

Key points:

- It occurs only when there is a shared resource.
- It usually happens inside a critical section.
- The output becomes unpredictable because it depends on scheduling.
- It can lead to data inconsistency.
- It is prevented using synchronization mechanisms.

Example:

```cpp
counter = 0;

// Thread A
counter++;

// Thread B
counter++;
```

Expected result:

```plain text
counter = 2
```

Possible race-condition result:

```plain text
counter = 1
```

Both threads may read the same value before either writes the updated value.

---

## Mutex

A mutex, or mutual exclusion lock, allows only one thread or process to access a critical section at a time.

Before entering a critical section:

1. Acquire the lock.
2. Execute the critical section.
3. Release the lock.

Without mutex:

```cpp
counter++;
```

With mutex:

```cpp
lock();
counter++;
unlock();
```

Now only one thread can execute `counter++` at a time.

Key points:

- Prevents race conditions.
- Protects critical sections.
- Only one thread or process can hold the mutex at a time.
- Other threads wait until the mutex is released.

> A mutex does not make code faster. It makes code safe.

---

## Semaphore

A semaphore controls access to a shared resource by allowing a fixed number of threads or processes to access it at the same time.

Unlike a mutex, which allows only one thread, a semaphore allows multiple threads depending on its count.

Example:

```plain text
Semaphore = 3
```

Only three threads can enter. If a fourth thread arrives, it waits until one thread releases the semaphore.

### Types of semaphore

- **Binary semaphore**: count is 1. It allows only one thread at a time.
- **Counting semaphore**: count is N. It allows N threads to access the resource simultaneously.

Example use case: a database connection pool with 10 connections. Only 10 requests can use the database at the same time. The 11th request waits.

---

## Mutex vs Semaphore

| Mutex | Semaphore |
| --- | --- |
| Allows only one thread. | Allows N threads. |
| Protects a critical section. | Manages a limited number of shared resources. |
| Acts like a single key. | Acts like multiple keys. |

Use a mutex when only one thread should access a resource, such as updating a bank account balance.

Use a semaphore when a limited number of threads can safely access a resource, such as a database connection pool, thread pool, printer pool, or API concurrency limit.
