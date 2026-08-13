---
title: "Branches and Merging"
slug: "branches-and-merging"
description: "Work on isolated lines of development and combine changes safely."
track: "Git & GitHub"
priority: "Must Know"
---

# Branches and Merging

A branch is an independent line of work.

Branches let you work on a feature without directly changing the main project line.

## Why branches exist

Imagine the `main` branch contains production-ready code.

You need to build a new payment feature that may take three days.

You should not keep half-finished payment code directly on `main`.

Instead:

```bash
git checkout -b add-payments
```

Now you can commit freely on `add-payments`.

When it is ready, you merge it back.

## Create and switch branches

Create a branch and switch to it:

```bash
git checkout -b feature-name
```

Modern Git also supports:

```bash
git switch -c feature-name
```

Switch to an existing branch:

```bash
git switch main
```

## Merge a branch

Suppose you finished `add-payments`.

Switch to `main`:

```bash
git switch main
```

Merge the feature:

```bash
git merge add-payments
```

Now `main` includes the payment work.

## Local branch vs remote branch

A local branch exists on your machine.

A remote branch exists on a remote repository like GitHub.

When you push a new branch:

```bash
git push origin add-payments
```

GitHub receives that branch.

Then you can open a pull request.

## Good branch names

Use names that explain the work:

```text
add-login-api
fix-payment-timeout
refactor-user-service
docs-docker-setup
```

Avoid names like:

```text
new
test
changes
my-branch
```

## Common mistake

Do not work directly on `main` for every change in a team project.

Use feature branches so code can be reviewed, tested, and merged deliberately.

## Interview answer

A Git branch is a movable pointer to a line of commits. Branches let developers work on features or fixes separately from the main code line. Once the work is ready, it can be merged back into the target branch, often through a pull request on GitHub.

