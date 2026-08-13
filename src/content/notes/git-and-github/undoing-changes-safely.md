---
title: "Undoing Changes Safely"
slug: "undoing-changes-safely"
description: "Restore files, amend commits, revert bad commits, and know when reset is risky."
track: "Git & GitHub"
priority: "Must Know"
---

# Undoing Changes Safely

Git can undo almost anything, but different commands have very different risk levels.

Before undoing, ask:

> Has this change already been shared with other people?

If yes, prefer safer commands like `revert`.

## Undo an unstaged file change

You edited a file but have not staged it.

To discard your local edits:

```bash
git restore file-name
```

Example:

```bash
git restore src/auth.js
```

This removes your local changes to that file.

Use it carefully. If you did not save the change elsewhere, it is gone.

## Unstage a file

You ran `git add`, but now you want to remove the file from staging:

```bash
git restore --staged file-name
```

This does not delete your work. It only moves it out of the staging area.

## Amend the last commit

You committed but forgot one small file or made a typo in the message:

```bash
git add forgotten-file.js
git commit --amend
```

This replaces the last commit with a new version.

Use amend before pushing. Avoid amending commits that teammates already pulled.

## Revert a bad commit

If a commit is already shared, use:

```bash
git revert <commit-hash>
```

This creates a new commit that undoes the old commit.

It is safe for shared branches because it does not rewrite existing history.

## Reset is powerful and risky

`git reset` moves branch history.

Examples:

```bash
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
```

The dangerous one is:

```bash
git reset --hard
```

It can delete local changes from your working tree.

Do not use it casually, especially on shared work.

## Simple decision guide

| Situation | Safer command |
| --- | --- |
| Discard local unstaged file edit | `git restore file` |
| Unstage a file | `git restore --staged file` |
| Fix last local commit before push | `git commit --amend` |
| Undo a pushed/shared commit | `git revert commit` |
| Throw away local history | `git reset` only if you know the impact |

## Interview answer

For local file changes, I use `git restore`. To unstage, I use `git restore --staged`. To fix my latest local commit, I may use `git commit --amend`. For a commit already pushed to a shared branch, I prefer `git revert` because it creates a new undo commit without rewriting shared history.

