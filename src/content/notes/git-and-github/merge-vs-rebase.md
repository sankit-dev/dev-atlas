---
title: "Merge vs Rebase"
slug: "merge-vs-rebase"
description: "Two ways to integrate branch work and when each one makes sense."
track: "Git & GitHub"
priority: "Must Know"
---

# Merge vs Rebase

Both merge and rebase bring changes together.

The difference is how they shape history.

## Merge

Merge combines two branches and keeps the real branch history.

Example:

```bash
git switch main
git merge feature-login
```

If both branches changed, Git may create a merge commit.

History may look like this:

```text
main:    A---B------M
              \    /
feature:       C--D
```

The merge commit `M` records that two lines of work were joined.

## Rebase

Rebase moves your branch commits on top of another branch.

Example:

```bash
git switch feature-login
git rebase main
```

History becomes more linear:

```text
main:    A---B
              \
feature:       C'--D'
```

Git creates new versions of your commits on top of latest `main`.

## When to use merge

Use merge when:

- you want to preserve branch history,
- you are combining shared work,
- your team prefers explicit merge commits,
- you are not comfortable rewriting commit history.

Merge is easier to reason about for beginners.

## When to use rebase

Use rebase when:

- you want a cleaner linear history,
- your feature branch is local or only used by you,
- you want to update your branch before opening a PR.

Common flow:

```bash
git switch feature-login
git fetch origin
git rebase origin/main
```

## Important rule

Avoid rebasing commits that other people are already using.

Rebase rewrites commit history.

If teammates based work on your old commits, rebasing can make collaboration painful.

## Simple comparison

| Concept | Merge | Rebase |
| --- | --- | --- |
| Keeps branch history | Yes | No, rewrites commits |
| Creates linear history | Not always | Yes |
| Beginner-safe | Usually | Needs care |
| Good for shared branches | Yes | Avoid unless team agrees |

## Interview answer

Merge combines branches while preserving their history, often with a merge commit. Rebase moves commits from one branch onto another base, creating a cleaner linear history but rewriting commit hashes. I use merge for shared branch integration and rebase mainly for local feature branches when I want to update them cleanly.

