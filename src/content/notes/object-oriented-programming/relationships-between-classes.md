---
title: "Relationships Between Classes"
slug: "relationships-between-classes"
description: "Association, aggregation, and composition."
track: "Object-Oriented Programming"
---

Classes can be related in different ways. The important difference is ownership and lifecycle.

## Association

Association means two classes are connected, but both can exist independently.

Example:

```text
Teacher <-> Student
```

A teacher can exist without a specific student, and a student can exist without a specific teacher.

## Aggregation

Aggregation is a weak has-a relationship. One object contains or uses another, but the child can exist independently.

Example:

```text
Department -> Teacher
```

If the department closes, the teacher can still exist and join another department.

## Composition

Composition is a strong has-a relationship. The child object's lifecycle depends on the parent.

Example:

```text
House -> Room
```

If the house is destroyed, its rooms do not exist independently in that object model.

## Comparison

| Relationship | Ownership | Child exists independently? | Example |
| --- | --- | --- | --- |
| Association | No ownership | Yes | Teacher and Student |
| Aggregation | Weak ownership | Yes | Department and Teacher |
| Composition | Strong ownership | No | House and Room |

## Memory Trick

- Association: knows-a.
- Aggregation: has-a, weak.
- Composition: has-a, strong.

## Interview Notes

- Aggregation and composition are specialized association forms.
- The key distinction is lifecycle.
- Composition usually gives stronger ownership and tighter lifecycle coupling.
