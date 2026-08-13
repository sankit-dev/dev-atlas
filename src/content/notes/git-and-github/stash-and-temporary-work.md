---
title: "Stash and Temporary Work"
slug: "stash-and-temporary-work"
description: "Put unfinished work aside when you need to switch context."
track: "Git & GitHub"
priority: "Important"
---

# Stash and Temporary Work

Sometimes you are halfway through a change and need to switch branches.

Git may stop you because your uncommitted changes would conflict with the branch switch.

`git stash` lets you temporarily put changes aside.

## Basic stash flow

Save current work:

```bash
git stash
```

Switch branch:

```bash
git switch main
```

Later, bring the work back:

```bash
git stash pop
```

## Give a stash a useful message

```bash
git stash push -m "WIP login validation"
```

This is better than guessing later.

List stashes:

```bash
git stash list
```

Apply a stash without deleting it:

```bash
git stash apply stash@{0}
```

Delete a stash:

```bash
git stash drop stash@{0}
```

## Stash is not a replacement for commits

Use stash for temporary context switching.

Do not use it as long-term storage.

If work matters, make a commit on a branch.

You can always clean up commits later before merging.

## Real example

You are working on `feature-checkout`.

Suddenly production has a bug. You need to switch to `main` and create a hotfix.

```bash
git stash push -m "WIP checkout validation"
git switch main
git pull
git switch -c hotfix-token-expiry
```

After the hotfix, return:

```bash
git switch feature-checkout
git stash pop
```

## Common mistake

Do not forget stashed work.

Run `git stash list` if you suspect something is hidden.

## Interview answer

`git stash` temporarily saves uncommitted changes so I can switch branches or pull updates without committing unfinished work. I use it for short-term context switches, but for important work I prefer creating a real commit on a branch.

