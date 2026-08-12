---
title: "Class & Object"
slug: "class-and-object"
description: "The foundation of object-oriented modeling."
track: "Object-Oriented Programming"
---

A class is a blueprint. An object is a real instance created from that blueprint.

## Class

A class defines:

- Properties an object will have.
- Methods an object can perform.

The class itself describes structure. Object data exists when an object is created.

## Object

An object is an instance of a class. When an object is created:

- Memory is allocated.
- Attributes get actual values.
- Methods can be called.

## Example

```java
class FeatureFlag {
    String key;
    boolean enabled;

    void disable() { enabled = false; }
}

FeatureFlag darkMode = new FeatureFlag();
```

Here:

- `FeatureFlag` is the class.
- `darkMode` is a reference variable.
- `new FeatureFlag()` creates the object.

## Multiple Objects

One class can create many objects.

| Object | Key | Enabled |
| --- | --- | --- |
| darkMode | `dark-mode` | true |
| betaSearch | `beta-search` | false |
| newEditor | `new-editor` | true |

The structure is the same, but each object has its own state.

## Stack vs Heap

```text
Stack                     Heap
darkMode reference  --->   FeatureFlag object
```

Local references often live on the stack. Actual objects usually live on the heap.

## Object Lifecycle

```text
Class loaded
Object created
Constructor initializes object
Object is used
Object becomes unreachable
Garbage collector can reclaim memory
```

## Interview Notes

- A class is a blueprint or template.
- An object is an instance of a class.
- Objects occupy memory when created.
- A reference points to an object; it is not the object itself.
