---
title: "Daily Git Workflow"
slug: "daily-git-workflow"
description: "The commands used in normal development: status, add, commit, log, diff, and restore."
track: "Git & GitHub"
priority: "Must Know"
---

# Daily Git Workflow

Most developers do not use every Git command every day.

The daily loop is much smaller:

```text
Check state -> edit files -> review changes -> stage -> commit -> push
```

## The core commands

### See what changed

```bash
git status
```

Use this often. It tells you which files are changed, staged, untracked, or ready to commit.

### See exact code differences

```bash
git diff
```

This shows unstaged changes.

To see staged changes:

```bash
git diff --staged
```

### Stage changes

```bash
git add file-name
```

Or stage everything:

```bash
git add .
```

Use `git add .` carefully. It is fine for small changes, but review `git status` first so you do not accidentally include secrets, logs, or unrelated files.

### Commit changes

```bash
git commit -m "Add user login"
```

A commit should describe one meaningful change.

Good commit examples:

```text
Add password reset endpoint
Fix duplicate email validation
Document Docker setup
```

Weak commit examples:

```text
changes
fix
final
updated code
```

## A normal feature flow

```bash
git status
git checkout -b add-login
# edit files
git diff
git add src/auth.js
git commit -m "Add login validation"
git push origin add-login
```

After this, you usually open a pull request on GitHub.

## What to do before committing

Before every commit, ask:

- Did I review the diff?
- Is this one logical change?
- Did I accidentally include generated files?
- Did I accidentally include secrets?
- Does the commit message explain the change?

This habit prevents many Git problems.

## Interview answer

My normal Git workflow is to check `git status`, review changes with `git diff`, stage selected files with `git add`, create a commit with a meaningful message, and push the branch to a remote. I try to keep commits focused so review and rollback are easier.

