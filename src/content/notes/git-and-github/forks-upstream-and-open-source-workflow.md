---
title: "Forks, Upstream and Open Source Workflow"
slug: "forks-upstream-and-open-source-workflow"
description: "Contribute to repositories you do not own using forks and upstream remotes."
track: "Git & GitHub"
priority: "Important"
---

# Forks, Upstream and Open Source Workflow

In a company repository, you may be allowed to create branches directly.

In open source, you usually do not have write access to the original repository.

So you use a fork.

## What is a fork?

A **fork** is your own copy of someone else's GitHub repository.

Example:

```text
original repo: github.com/framework/project
your fork:     github.com/you/project
```

You can push branches to your fork because you own it.

Then you open a pull request from your fork to the original repository.

## origin vs upstream

In fork-based workflows:

- `origin` usually points to your fork,
- `upstream` points to the original repository.

Example:

```bash
git remote -v
```

Output:

```text
origin    https://github.com/you/project.git
upstream  https://github.com/framework/project.git
```

## Add upstream remote

After cloning your fork:

```bash
git remote add upstream https://github.com/framework/project.git
```

Fetch latest original changes:

```bash
git fetch upstream
```

Update your local main:

```bash
git switch main
git merge upstream/main
```

Or if your team prefers rebase:

```bash
git rebase upstream/main
```

## Open source contribution flow

```text
Fork repository
Clone your fork
Add upstream remote
Create feature branch
Commit changes
Push branch to your fork
Open PR to original repository
```

Commands:

```bash
git clone https://github.com/you/project.git
cd project
git remote add upstream https://github.com/framework/project.git
git switch -c fix-docs-example
# edit files
git add .
git commit -m "Fix docs example"
git push origin fix-docs-example
```

Then open a PR on GitHub.

## Keeping your fork updated

The original repository keeps changing.

To update your fork:

```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

Now your fork's `main` is updated.

## Common mistake

Do not make all open source changes directly on your fork's `main`.

Create a separate branch for each contribution.

This keeps PRs clean and prevents unrelated changes from mixing together.

## Interview answer

A fork is my own GitHub copy of a repository I do not control. In fork workflows, `origin` usually points to my fork and `upstream` points to the original repository. I create a branch in my fork, push changes there, and open a pull request back to the upstream repository.

