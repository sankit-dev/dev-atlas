---
title: "When Should a Workflow Run?"
slug: "triggers-filters-and-manual-runs"
description: "Choose pull requests, pushes, manual runs, and path filters for the task."
track: "GitHub CI/CD"
priority: "Must Know"
---

A workflow should run at the moment it is useful—not for every tiny repository event. In GitHub Actions, the `on:` section chooses that moment.

For a beginner, remember this rule: **check code on pull requests; release code after it is merged.**

## Common triggers

```yaml
on:
  pull_request:
  push:
    branches:
      - main
  workflow_dispatch:
```

This runs checks on pull requests, runs on pushes to main, and allows manual execution.

## Pull request trigger

Use a pull request workflow when you want to check a change before it enters `main`.

Good PR checks:

- Lint.
- Tests.
- Build.
- Type checks.
- Preview deployment when useful.

Be careful with secrets on pull requests from forks.

## Push trigger

Use a push trigger for work that should happen after code has landed on a specific branch.

Example:

- Push to main builds and deploys staging.
- Push to release branch creates a release candidate.

## Path filters

Path filters avoid running expensive workflows when unrelated files change.

```yaml
on:
  push:
    paths:
      - "src/**"
      - "package-lock.json"
```

This can save time and CI minutes.

## Manual runs

`workflow_dispatch` lets a person run a workflow manually.

Use it when a release should happen only after someone deliberately starts it.

It is useful for:

- Production deployments.
- Backfills.
- Maintenance tasks.
- Emergency rollback.

## Scheduled runs

```yaml
on:
  schedule:
    - cron: "0 2 * * *"
```

Scheduled workflows are useful for nightly tests, dependency checks, or cleanup jobs.

## Quick revision

- Triggers decide when workflows run.
- PR triggers validate changes.
- Push triggers automate branch actions.
- Path filters reduce unnecessary runs.
- Manual triggers are useful for controlled operations.
