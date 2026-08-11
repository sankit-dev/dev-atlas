---
title: "Deadlock"
slug: "deadlock"
description: "4 Conditions, Prevention, Avoidance, Detection."
track: "Operating Systems"
---

A **Deadlock** is a situation where **two or more threads/processes wait indefinitely for each other to release a resource**, so none of them can continue.
---
## How it Happens
Suppose there are two resources:
- Lock A
- Lock B

**Thread 1**
```plain text
Locks A
Waits for B
```
**Thread 2**
```plain text
Locks B
Waits for A
```
Now:
- Thread 1 can't continue until Thread 2 releases **B**.
- Thread 2 can't continue until Thread 1 releases **A**.

Both wait forever.

This is a **deadlock**.
---
## Visualization
```plain text
Thread 1
Has Lock A
Needs Lock B
      ↑
      │
      │
Needs Lock A
Has Lock B
Thread 2
```
Neither thread can proceed.
---
## Real-Life Example
Imagine two cars on a **one-lane bridge**.
- Car A waits for Car B to reverse.
- Car B waits for Car A to reverse.
Neither moves.

Both are stuck forever.
---
## Causes of Deadlock (Coffman Conditions)
A deadlock can occur only if **all four** of these conditions are true:

1. **Mutual Exclusion**
	- A resource can be used by only one thread/process at a time.
2. **Hold and Wait**
	- A thread/process holds one resource while waiting for another.
3. **No Preemption**
	- A resource cannot be forcibly taken away; it must be released voluntarily.
4. **Circular Wait**
	- A circular chain exists where each thread/process is waiting for a resource held by the next.

> **Interview Tip:** If **any one** of these four conditions is prevented, a deadlock cannot occur.
---
## How to Prevent Deadlocks
- Acquire locks in a fixed order.
- Release locks as soon as possible.
- Avoid holding one lock while waiting for another.
- Use lock timeouts where appropriate.
---
## Deadlock vs Race Condition
<table header-row="true">
<tr>
<td>**Race Condition**</td>
<td>**Deadlock**</td>
</tr>
<tr>
<td>Multiple threads access shared data simultaneously.</td>
<td>Multiple threads wait forever for each other.</td>
</tr>
<tr>
<td>May produce incorrect results.</td>
<td>Program stops making progress.</td>
</tr>
<tr>
<td>Solved using synchronization (e.g., mutex).</td>
<td>Prevented through proper lock management and ordering.</td>
</tr>
</table>
---
## Interview Question
**Q: Can a mutex cause a deadlock?**
**Answer:** Yes.

A mutex prevents race conditions, but if multiple mutexes are acquired in the wrong order, they can lead to a deadlock.
---
# Starvation
**Starvation** occurs when a thread/process waits indefinitely because other threads/processes continuously get access to the required resource.

Unlike deadlock, the program is still making progress—**only one or more threads are not**.
---
## Example
Imagine three threads:
- High Priority Thread A
- High Priority Thread B
- Low Priority Thread C

Whenever the CPU becomes free, A or B gets scheduled.

Thread C keeps waiting and never gets CPU time.

This is **Starvation**.
---
## Real-Life Example
Imagine standing in a queue, but VIP customers keep arriving and are always served before you.

You may end up waiting forever.
---
## How to Prevent Starvation
- **Aging**: Gradually increase the priority of waiting threads so they eventually get a chance to execute.
---
# Livelock
**Livelock** occurs when two or more threads/processes keep responding to each other but **no useful work gets done**.

Unlike deadlock, the threads are **not blocked**—they remain active but make no progress.
---
## Example
Two threads try to avoid a deadlock:
- Thread A releases its lock because Thread B is waiting.
- Thread B also releases its lock because Thread A is waiting.
- Both immediately try again.
- The same thing keeps repeating.

They are busy, but neither completes its work.
---
## Real-Life Example
Imagine two people walking toward each other in a narrow hallway.
Both step to the left.

Both step to the right.

They keep trying to avoid each other but never pass.

That's **Livelock**.
---
# Deadlock vs Starvation vs Livelock
<table header-row="true">
<tr>
<td>**Deadlock**</td>
<td>**Starvation**</td>
<td>**Livelock**</td>
</tr>
<tr>
<td>Threads wait forever for each other.</td>
<td>A thread waits indefinitely because others keep getting the resource.</td>
<td>Threads keep running but make no progress.</td>
</tr>
<tr>
<td>Threads are blocked.</td>
<td>Waiting thread is blocked; others continue normally.</td>
<td>Threads are active but stuck in repeated actions.</td>
</tr>
<tr>
<td>System or affected threads stop progressing.</td>
<td>System continues, but one or more threads never get a chance to execute.</td>
<td>System is active, but useful work never completes.</td>
</tr>
</table>
---
## Interview Tip
Remember them like this:
- **Deadlock** → **Waiting forever.**
- **Starvation** → **Never getting a chance.**
- **Livelock** → **Always moving, never progressing.**
