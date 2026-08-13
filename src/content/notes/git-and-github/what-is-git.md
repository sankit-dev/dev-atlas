---
title: "What is Git?"
slug: "what-is-git"
description: "Why version control exists, what Git solves, and what happens without it."
track: "Git & GitHub"
priority: "Must Know"
---

# What is Git?

Before learning GitHub, branches, pull requests, or merge conflicts, first understand the real problem:

> How do developers safely change code over time without losing history or breaking each other's work?

Git is a **distributed** version control system.

> [!definition]
> Distributed means every developer has a full local copy of the repository history, not only the latest files. Your machine has real commits, branches, and history. GitHub is usually the shared remote copy, not the only place where Git history exists.

It tracks changes in files so you can:

- see what changed,
- know who changed it,
- go back to an older version,
- work on a feature separately,
- combine work from multiple people,
- recover from mistakes.

Git is not GitHub.

Git is the tool that tracks history. GitHub is a website/service that hosts Git repositories and adds collaboration features.

## Why does Git exist?

Imagine you are building a backend API.

Today the login API works. Tomorrow you change authentication logic. Suddenly tests fail and users cannot log in.

Without Git, you may ask:

- Which file did I change?
- What was the old working version?
- Can I compare today's code with yesterday's code?
- Can I undo only the bad change?
- Can another developer work on payment code while I work on login code?

Git exists because software keeps changing, and humans need a reliable memory for those changes.

## What happens without Git?

Without Git, teams often end up with folders like:

```text
project-final
project-final-v2
project-final-v2-working
project-final-v2-working-copy
project-final-real-final
```

That is not a system. That is confusion.

You do not know:

- which folder is latest,
- what changed between folders,
- who made a change,
- why the change was made,
- how to combine two people's work.

Git replaces this with structured history.

## Real example

You create a simple file:

```text
app.js
```

Then you make three meaningful changes:

1. Add login API.
2. Add password validation.
3. Fix token expiry bug.

Git can store those as three commits:

```text
a1b2c3 Add login API
d4e5f6 Add password validation
g7h8i9 Fix token expiry bug
```

Each commit is a saved point in project history.

If the token fix creates a bug, you can inspect or undo that specific commit without guessing.

## The core idea

Git does not save "one final project".

Git saves a timeline of snapshots.

Each snapshot is called a **commit**.

A commit usually answers:

- What changed?
- Why did it change?
- Who changed it?
- When did it change?

## Git vs GitHub

This difference is important:

| Tool | What it is | Simple explanation |
| --- | --- | --- |
| Git | Version control system | Tracks code history on your machine |
| GitHub | Hosting and collaboration platform | Stores Git repositories online and adds pull requests, reviews, issues, and actions |

You can use Git without GitHub.

You cannot really use GitHub for code collaboration without Git, because GitHub is built around Git repositories.

## Interview answer

Git is a distributed version control system used to track changes in source code. It lets developers create commits, branch safely, compare history, undo mistakes, and collaborate by sharing repositories through remotes such as GitHub.

GitHub is not Git itself. GitHub hosts Git repositories and adds collaboration features like pull requests, code review, issues, and CI/CD.
