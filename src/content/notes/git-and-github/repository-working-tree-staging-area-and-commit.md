---
title: "Repository, Working Tree, Staging Area and Commit"
slug: "repository-working-tree-staging-area-and-commit"
description: "The core Git mental model: where changes live before they become history."
track: "Git & GitHub"
priority: "Must Know"
---

# Repository, Working Tree, Staging Area and Commit

Git becomes much easier when you understand where your changes are.

When you edit code, Git does not automatically save every edit into history. Your changes move through a few places first.

## The four important places

### Working tree

The **working tree** is the project folder you edit.

If you open VS Code and change `server.js`, that changed file is in your working tree.

It is not committed yet.

### Staging area

The **staging area** is Git's preparation area.

You use it to choose exactly what will go into the next commit.

Command:

```bash
git add server.js
```

This does not create history yet. It says:

> Include this file in the next commit.

### Commit

A **commit** is a saved snapshot in Git history.

Command:

```bash
git commit -m "Add login endpoint"
```

Now Git records the staged changes as a permanent point in the project timeline.

### Repository

The **repository** is the full Git-tracked project.

It includes:

- your files,
- commit history,
- branches,
- tags,
- Git metadata inside the hidden `.git` folder.

## Simple flow

Most daily Git work follows this path:

```text
Edit files -> Stage changes -> Commit snapshot
```

With commands:

```bash
git status
git add .
git commit -m "Describe the change"
```

## Why staging exists

Staging lets you create clean commits.

Example: you changed three files:

- `auth.js` for login,
- `README.md` for documentation,
- `package.json` because you tested another library.

You may not want all of that in one commit.

You can stage only the login files:

```bash
git add auth.js
git commit -m "Add login validation"
```

Then commit documentation separately:

```bash
git add README.md
git commit -m "Document login API"
```

Good commits make code review and debugging easier.

## Common mistake

Many beginners think `git add` means "upload this file".

It does not.

`git add` only moves changes into the staging area on your local machine.

Nothing goes to GitHub until you use `git push`.

## Interview answer

The working tree is the files I am editing. The staging area is where I prepare selected changes for the next commit. A commit is a saved snapshot in Git history. The repository contains the project, its Git metadata, branches, and commit history.

