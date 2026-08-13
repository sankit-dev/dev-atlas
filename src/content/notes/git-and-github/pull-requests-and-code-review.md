---
title: "Pull Requests and Code Review"
slug: "pull-requests-and-code-review"
description: "Use PRs to discuss, review, test, and merge code as a team."
track: "Git & GitHub"
priority: "Must Know"
---

# Pull Requests and Code Review

A pull request is a request to merge one branch into another.

Most commonly:

```text
feature branch -> main
```

But a PR is more than a merge button.

It is a place to review the change before it becomes part of the shared codebase.

## Why pull requests exist

Without PRs, developers may push directly to `main`.

That can cause:

- unreviewed code,
- broken tests,
- unclear decisions,
- accidental production bugs,
- hard-to-track changes.

PRs create a controlled checkpoint.

## What a good PR includes

A good PR usually has:

- clear title,
- short summary,
- screenshots or examples if UI/API behavior changed,
- tests or verification notes,
- linked issue if relevant,
- small enough scope for review.

Example PR title:

```text
Add refresh token rotation
```

Weak PR title:

```text
changes
```

## Code review is not only syntax checking

A reviewer may check:

- Does the code solve the right problem?
- Is the design maintainable?
- Are edge cases handled?
- Are tests enough?
- Is the change too large?
- Does it introduce security risk?
- Is naming clear?

The goal is better shared code, not showing who is smarter.

## Typical PR flow

```text
Create branch
Commit changes
Push branch
Open pull request
CI runs checks
Reviewer comments
Author updates branch
PR approved
Merge to main
```

## Merge options on GitHub

GitHub commonly offers:

- merge commit,
- squash and merge,
- rebase and merge.

Simple understanding:

| Option | Result |
| --- | --- |
| Merge commit | Keeps full branch history |
| Squash and merge | Combines PR commits into one commit |
| Rebase and merge | Replays commits linearly on target branch |

Teams choose based on their history preference.

## Common mistake

Do not open huge PRs unless necessary.

Large PRs are harder to review, more likely to hide bugs, and more likely to create conflicts.

Prefer small PRs with one clear goal.

## Interview answer

A pull request is a GitHub workflow for proposing branch changes before merging. It allows code review, discussion, automated checks, and approval. A good PR is small, clear, tested, and explains what changed and why.

