---
title: "Inheritance"
slug: "inheritance"
description: "Types of inheritance, extends, and method overriding."
track: "Object-Oriented Programming"
---

Inheritance allows a child class to acquire properties and methods from a parent class.

It is used for code reuse and for modeling an is-a relationship.

## Example

```java
class BaseJob {
    void recordStart() { System.out.println("Job started"); }
}

class DataExportJob extends BaseJob {
    void writeCsv() { System.out.println("Writing CSV"); }
}
```

`DataExportJob` inherits `recordStart()` from `BaseJob`.

## Why Inheritance Is Used

- Reduce duplicated code.
- Reuse common behavior.
- Organize related classes.
- Enable runtime polymorphism through overriding.

## Types of Inheritance

### Single

```text
BaseJob -> DataExportJob
```

### Multilevel

```text
BaseJob -> DataExportJob -> ScheduledDataExportJob
```

### Hierarchical

```text
BaseJob -> DataExportJob
BaseJob -> CleanupJob
```

### Multiple

Java does not support multiple inheritance with classes because it can create ambiguity. Java supports multiple inheritance of capability through interfaces.

## What Is Inherited?

A child inherits non-private fields and methods.

Constructors are not inherited.

## Is-A Rule

Use inheritance when the child truly is a parent type.

- A scheduled export is a data export: potentially a good fit.
- An export job is a CSV writer: wrong; use composition instead.

## Interview Notes

- Inheritance represents an is-a relationship.
- It allows reuse of parent behavior.
- Method overriding lets child classes customize inherited behavior.
- Use inheritance carefully; wrong hierarchies create fragile code.
