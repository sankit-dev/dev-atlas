---
title: "Triggers, Filters and Manual Runs"
slug: "triggers-filters-and-manual-runs"
description: "Running workflows for the right branches and events."
track: "GitHub CI/CD"
priority: "Must Know"
---

Workflow triggers decide when GitHub Actions runs.

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

Use pull request workflows for validation.

Good PR checks:

- Lint.
- Tests.
- Build.
- Type checks.
- Preview deployment when useful.

Be careful with secrets on pull requests from forks.

## Push trigger

Use push triggers for branch-specific actions.

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
