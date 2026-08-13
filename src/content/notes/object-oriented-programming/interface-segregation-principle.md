---
title: "Interface Segregation Principle"
slug: "interface-segregation-principle"
description: "Prefer small focused interfaces over large forced contracts."
track: "Object-Oriented Programming"
---

# Interface Segregation Principle

# What problem is this solving?

Some interfaces become too large and force classes to implement methods they do not need.

That leads to fake methods, empty methods, or `UnsupportedOperationException`.

ISP solves this by keeping interfaces focused.

---

# Simple definition

The **Interface Segregation Principle** says:

> **Clients should not be forced to depend on methods they do not use.**

This is the **I** in SOLID.

---

# Understand each word

### Interface

An interface is a contract.

It says:

> **Any class implementing me must provide these methods.**

### Segregation

Segregation means separation.

Here it means splitting a large interface into smaller focused interfaces.

### Principle

The guideline is:

> **Do not create fat interfaces that force classes to implement irrelevant methods.**

---

# Bad/naive example

Suppose we create one big interface:

```java
interface Machine {
    void print(Document document);
    void scan(Document document);
    void fax(Document document);
}
```

A modern office printer may support all three:

```java
class MultiFunctionPrinter implements Machine {
    public void print(Document document) {}
    public void scan(Document document) {}
    public void fax(Document document) {}
}
```

But a basic printer only prints:

```java
class BasicPrinter implements Machine {
    public void print(Document document) {}

    public void scan(Document document) {
        throw new UnsupportedOperationException("Scan not supported");
    }

    public void fax(Document document) {
        throw new UnsupportedOperationException("Fax not supported");
    }
}
```

This is bad.

`BasicPrinter` is forced to implement methods it cannot support.

---

# Better explanation

Split the interface:

```java
interface Printer {
    void print(Document document);
}

interface Scanner {
    void scan(Document document);
}

interface FaxMachine {
    void fax(Document document);
}
```

Now each class implements only what it can do:

```java
class BasicPrinter implements Printer {
    public void print(Document document) {}
}

class MultiFunctionPrinter implements Printer, Scanner, FaxMachine {
    public void print(Document document) {}
    public void scan(Document document) {}
    public void fax(Document document) {}
}
```

This follows ISP.

---

# Real example

Bad interface:

```java
interface UserRepository {
    User findById(String id);
    void save(User user);
    void delete(String id);
    List<User> findInactiveUsers();
    void archiveInactiveUsers();
}
```

Some services only need read access.

But they now depend on write and archive methods too.

Better:

```java
interface UserReader {
    User findById(String id);
}

interface UserWriter {
    void save(User user);
    void delete(String id);
}

interface UserArchiver {
    List<User> findInactiveUsers();
    void archiveInactiveUsers();
}
```

Now a service can depend only on what it needs:

```java
class UserProfileService {
    private final UserReader userReader;

    UserProfileService(UserReader userReader) {
        this.userReader = userReader;
    }
}
```

---

# Common mistake

Do not create one giant interface just because the methods are related to the same broad domain.

Interfaces should match what callers actually need.

---

# Interview Answer

If an interviewer asks:

> **What is Interface Segregation Principle?**

You can answer:

Interface Segregation Principle means classes should not be forced to implement methods they do not need. Instead of one large interface, we should create smaller focused interfaces. For example, instead of one `Machine` interface with `print`, `scan`, and `fax`, we can split it into `Printer`, `Scanner`, and `FaxMachine`.
