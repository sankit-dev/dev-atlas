---
title: "GitHub Basics"
slug: "github-basics"
description: "What GitHub adds on top of Git: hosting, issues, pull requests, reviews, and collaboration."
track: "Git & GitHub"
priority: "Must Know"
---

# GitHub Basics

GitHub is not the same thing as Git.

Git is the version control tool.

GitHub is a platform built around Git repositories.

## What GitHub adds

Git can track history locally.

GitHub adds collaboration around that history:

- remote repository hosting,
- pull requests,
- code review,
- issues,
- project discussions,
- repository permissions,
- releases,
- GitHub Actions,
- branch protection rules.

In simple words:

> Git remembers code history. GitHub helps people collaborate around that history.

## Repository on GitHub

A GitHub repository usually contains:

- code,
- README,
- commit history,
- branches,
- issues,
- pull requests,
- settings,
- automation workflows.

The code history is Git.

The collaboration interface is GitHub.

## Issues

Issues are used to track work, bugs, tasks, or discussions.

Example:

```text
Issue: Login API returns 500 for invalid email
```

A developer can create a branch, fix the issue, and open a pull request.

## Pull requests

A pull request asks:

> Please review these branch changes before we merge them.

PRs let the team:

- discuss code,
- run automated checks,
- request changes,
- approve work,
- merge safely.

## Branch protection

Teams often protect `main`.

That means you cannot directly push random commits to it.

Rules may require:

- pull request review,
- passing tests,
- no unresolved conversations,
- up-to-date branch before merge.

This protects important branches from accidental changes.

## GitHub in a normal team

Typical flow:

```text
Create issue -> create branch -> push commits -> open PR -> review -> merge
```

Git handles commits and branches.

GitHub handles the team workflow around them.

## Interview answer

GitHub is a platform for hosting Git repositories and collaborating on code. It adds features like pull requests, reviews, issues, branch protection, releases, and GitHub Actions. Git is the underlying version control system; GitHub is the remote collaboration platform built around Git.

