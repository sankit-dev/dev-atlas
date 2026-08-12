---
title: "Object Lifecycle & Memory"
slug: "object-lifecycle-and-memory"
description: "Object creation, references, heap, stack, and garbage collection."
track: "Object-Oriented Programming"
---

Object lifecycle describes how an object is created, used, becomes unreachable, and is eventually cleaned up.

## Lifecycle

```text
Class loaded
Object allocated
Constructor initializes state
Object is used
References are removed
Object becomes unreachable
Garbage collector may reclaim memory
```

## Object Creation

```java
FeatureFlag darkMode = new FeatureFlag();
```

This does a few things:

- Allocates memory for the object.
- Calls the constructor.
- Stores a reference in `darkMode`.

## Reference vs Object

`darkMode` is not the object. It is a reference to the object.

```text
Stack                     Heap
darkMode reference  --->   FeatureFlag object
```

## Stack

The stack stores:

- Method call frames.
- Local primitive variables.
- Local reference variables.

It is fast and automatically managed when methods return.

## Heap

The heap stores:

- Objects.
- Arrays.
- Instance variables inside objects.

Objects live until they become unreachable and the garbage collector removes them.

## Garbage Collection

An object becomes eligible for garbage collection when no live reference can reach it.

```java
FeatureFlag darkMode = new FeatureFlag();
darkMode = null;
```

If no other reference points to that object, it is eligible for cleanup.

## Interview Notes

- References and objects are different.
- Objects usually live on the heap.
- Local references usually live on the stack.
- Garbage collection handles unreachable heap objects.
- You cannot force exact garbage collection timing in Java.
