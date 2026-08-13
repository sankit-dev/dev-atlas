---
title: "Liskov Substitution Principle"
slug: "liskov-substitution-principle"
description: "Subtypes should be safely usable wherever the parent type is expected."
track: "Object-Oriented Programming"
---

# Liskov Substitution Principle

# What problem is this solving?

Some inheritance hierarchies look correct but break when a child class is used through the parent type.

If a child class overrides a method by throwing "not supported", the parent contract was probably wrong.

LSP helps you design parent and child types that behave consistently.

---

# Simple definition

The **Liskov Substitution Principle** says:

> **If a program expects a parent type, it should work correctly with any child type.**

This is the **L** in SOLID.

---

# Understand each word

### Liskov

The principle is named after Barbara Liskov, who described this substitution idea.

You do not need the formal mathematical definition for most interviews.

You need the practical meaning.

### Substitution

Substitution means replacement.

If code accepts a parent class or interface, you should be able to pass a child implementation without breaking behavior.

### Principle

The guideline is:

> **Child classes should not surprise code that works with the parent type.**

---

# Bad/naive example

Suppose we model birds like this:

```java
class Bird {
    void fly() {
        System.out.println("Flying");
    }
}

class Sparrow extends Bird {
}

class Penguin extends Bird {
    @Override
    void fly() {
        throw new UnsupportedOperationException("Penguins cannot fly");
    }
}
```

Now some code uses `Bird`:

```java
class BirdTrainer {
    void makeBirdFly(Bird bird) {
        bird.fly();
    }
}
```

This works for `Sparrow`.

But it breaks for `Penguin`.

```java
trainer.makeBirdFly(new Penguin()); // runtime error
```

The child class cannot safely replace the parent.

That violates LSP.

---

# Better explanation

Do not put `fly()` in `Bird` if all birds cannot fly.

Model the capability separately:

```java
class Bird {
}

interface Flyable {
    void fly();
}

class Sparrow extends Bird implements Flyable {
    public void fly() {
        System.out.println("Sparrow flying");
    }
}

class Penguin extends Bird {
}
```

Now the trainer only accepts birds that can fly:

```java
class BirdTrainer {
    void makeBirdFly(Flyable bird) {
        bird.fly();
    }
}
```

`Penguin` is no longer forced into a fake flying behavior.

---

# Real example

Suppose we have:

```java
interface FileStorage {
    void upload(File file);
    File download(String fileName);
}
```

This implementation is fine:

```java
class S3Storage implements FileStorage {
    public void upload(File file) {}
    public File download(String fileName) { return new File(fileName); }
}
```

But this is suspicious:

```java
class WriteOnlyStorage implements FileStorage {
    public void upload(File file) {}

    public File download(String fileName) {
        throw new UnsupportedOperationException("Download not supported");
    }
}
```

If `FileStorage` promises upload and download, every implementation should support both.

Otherwise, code using `FileStorage` can break.

Better:

```java
interface FileUploader {
    void upload(File file);
}

interface FileDownloader {
    File download(String fileName);
}
```

Now a write-only storage only implements `FileUploader`.

---

# Common mistake

Do not use inheritance only because two classes share a few fields.

Use inheritance only when the child can fully honor the behavior promised by the parent.

---

# Interview Answer

If an interviewer asks:

> **What is Liskov Substitution Principle?**

You can answer:

Liskov Substitution Principle means a child class should be usable wherever its parent type is expected without breaking correctness. A subtype should honor the behavior promised by the parent. For example, if `Bird` has `fly()`, then `Penguin extends Bird` but throws an exception in `fly()` breaks LSP. A better design is to keep `Bird` separate and create a `Flyable` interface only for birds that can fly.
