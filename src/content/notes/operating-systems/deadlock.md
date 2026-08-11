---
title: "Deadlock"
slug: "deadlock"
description: "4 Conditions, Prevention, Avoidance, Detection."
track: "Operating Systems"
---

A deadlock is a situation where two or more threads or processes wait indefinitely for each other to release a resource, so none of them can continue.

---

## How it happens

Suppose there are two resources:

- Lock A.
- Lock B.

Thread 1:

```plain text
Locks A
Waits for B
```

Thread 2:

```plain text
Locks B
Waits for A
```

Now Thread 1 cannot continue until Thread 2 releases B, and Thread 2 cannot continue until Thread 1 releases A. Both wait forever.

---

## Visualization

```plain text
Thread 1
Has Lock A
Needs Lock B
      ^
      |
Needs Lock A
Has Lock B
Thread 2
```

Neither thread can proceed.

---

## Real-life example

Imagine two cars on a one-lane bridge.

- Car A waits for Car B to reverse.
- Car B waits for Car A to reverse.

Neither moves. Both are stuck.

---

## Causes of deadlock

A deadlock can occur only if all four Coffman conditions are true.

1. **Mutual exclusion**: a resource can be used by only one thread or process at a time.
2. **Hold and wait**: a thread or process holds one resource while waiting for another.
3. **No preemption**: a resource cannot be forcibly taken away; it must be released voluntarily.
4. **Circular wait**: a circular chain exists where each thread or process waits for a resource held by the next.

> If any one of these four conditions is prevented, deadlock cannot occur.

---

## How to prevent deadlocks

- Acquire locks in a fixed order.
- Release locks as soon as possible.
- Avoid holding one lock while waiting for another.
- Use lock timeouts where appropriate.

---

## Deadlock vs race condition

| Race Condition | Deadlock |
| --- | --- |
| Multiple threads access shared data simultaneously. | Multiple threads wait forever for each other. |
| May produce incorrect results. | Program stops making progress. |
| Solved using synchronization such as mutexes. | Prevented through proper lock management and ordering. |

---

## Can a mutex cause deadlock?

Yes. A mutex prevents race conditions, but if multiple mutexes are acquired in the wrong order, they can lead to a deadlock.

---

## Starvation

Starvation occurs when a thread or process waits indefinitely because other threads or processes continuously get access to the required resource.

Unlike deadlock, the program is still making progress. Only one or more threads are not.

Example:

- High Priority Thread A.
- High Priority Thread B.
- Low Priority Thread C.

Whenever the CPU becomes free, A or B gets scheduled. Thread C keeps waiting and never gets CPU time.

---

## Preventing starvation

Use aging: gradually increase the priority of waiting threads so they eventually get a chance to execute.

---

## Livelock

Livelock occurs when two or more threads or processes keep responding to each other but no useful work gets done.

Unlike deadlock, the threads are not blocked. They remain active but make no progress.

Example:

- Thread A releases its lock because Thread B is waiting.
- Thread B also releases its lock because Thread A is waiting.
- Both immediately try again.
- The same thing keeps repeating.

---

## Deadlock vs Starvation vs Livelock

| Deadlock | Starvation | Livelock |
| --- | --- | --- |
| Threads wait forever for each other. | A thread waits indefinitely because others keep getting the resource. | Threads keep running but make no progress. |
| Threads are blocked. | Waiting thread is blocked; others continue normally. | Threads are active but stuck in repeated actions. |
| Affected threads stop progressing. | System continues, but one or more threads never execute. | System is active, but useful work never completes. |

Remember:

- Deadlock: waiting forever.
- Starvation: never getting a chance.
- Livelock: always moving, never progressing.
