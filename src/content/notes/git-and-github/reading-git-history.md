---
title: "Reading Git History"
slug: "reading-git-history"
description: "Use log, show, blame, and diff to understand how code changed."
track: "Git & GitHub"
priority: "Important"
---

# Reading Git History

Git is not only for saving changes.

It is also for understanding how the project reached its current state.

When a bug appears, history helps answer:

- When was this line added?
- Which commit introduced the behavior?
- Why was this file changed?
- Who should I ask for context?

## git log

Show commit history:

```bash
git log
```

A more compact view:

```bash
git log --oneline
```

Example:

```text
7a91c2d Fix token expiry bug
4b18f93 Add login validation
1e83a91 Add login endpoint
```

Each line is a commit.

The short code at the start is the commit hash.

## git show

See what a commit changed:

```bash
git show 7a91c2d
```

This shows:

- commit message,
- author,
- date,
- changed files,
- line-level diff.

Use this when someone says, "This broke after that commit."

## git diff between commits

Compare two commits:

```bash
git diff 1e83a91 7a91c2d
```

Compare your branch with `main`:

```bash
git diff main..feature-branch
```

This helps before opening a pull request.

## git blame

See when each line was last changed:

```bash
git blame src/auth.js
```

Despite the name, `blame` should not be used to attack people.

Use it to find context.

The real question is usually:

> What problem was this code solving when it was written?

## Common workflow

If you find strange code:

```bash
git blame src/payment.js
git show <commit-hash>
git log --oneline -- src/payment.js
```

This lets you inspect the file's history before changing it.

## Interview answer

I use `git log` to see commit history, `git show` to inspect a specific commit, `git diff` to compare changes, and `git blame` to find when a line was last changed. These commands help debug regressions and understand project decisions.

