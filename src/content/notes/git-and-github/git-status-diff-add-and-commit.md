---
title: "git status, diff, add and commit"
slug: "git-status-diff-add-and-commit"
description: "See changes, choose what to save, and create meaningful commits."
track: "Git & GitHub"
priority: "Must Know"
---

# git status, diff, add and commit

These four commands are the heart of everyday Git.

They answer four questions:

| Command | Question it answers |
| --- | --- |
| `git status` | What is the current state? |
| `git diff` | What exactly changed? |
| `git add` | What should be included in the next commit? |
| `git commit` | How do I save this change into history? |

## git status

Run:

```bash
git status
```

You may see:

- untracked files,
- modified files,
- staged files,
- current branch,
- whether your branch is ahead or behind remote.

When confused, run `git status`. It is the safest first command.

## git diff

Run:

```bash
git diff
```

This shows what changed but is not staged yet.

After staging, use:

```bash
git diff --staged
```

This shows what will go into the next commit.

## git add

Stage one file:

```bash
git add src/login.js
```

Stage all current changes:

```bash
git add .
```

Stage interactively:

```bash
git add -p
```

`git add -p` is useful when one file contains two unrelated changes and you want to commit only one of them.

## git commit

Create a commit:

```bash
git commit -m "Add login validation"
```

The message should explain what changed.

It does not need to be a paragraph, but it should be clear enough for someone reading history later.

## Example flow

```bash
git status
git diff
git add src/login.js src/user.js
git diff --staged
git commit -m "Validate user login input"
```

This flow gives you control.

You inspect before staging, and you inspect again before committing.

## Common mistake

Do not use:

```bash
git add .
git commit -m "fix"
```

without checking what is included.

That is how unrelated changes, debug logs, local config, and secrets accidentally enter history.

## Interview answer

`git status` shows the current state of the working tree and staging area. `git diff` shows exact line changes. `git add` moves selected changes into the staging area. `git commit` records staged changes as a snapshot in repository history.

