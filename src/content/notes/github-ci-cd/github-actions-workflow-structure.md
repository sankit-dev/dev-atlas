---
title: "GitHub Actions Workflow Structure"
slug: "github-actions-workflow-structure"
description: "Workflows, events, jobs, steps, actions and runners."
track: "GitHub CI/CD"
priority: "Must Know"
---

GitHub Actions workflows are YAML files that define automated jobs.

## Workflow file location

Workflow files live in:

```text
.github/workflows/
```

Example:

```text
.github/workflows/ci.yml
```

## Workflow

A workflow has a name, triggers, jobs, and steps.

```yaml
name: CI

on:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

## Events

Events decide when the workflow runs.

Examples:

- `push`
- `pull_request`
- `workflow_dispatch`
- `schedule`

## Jobs

Jobs are groups of steps that run on a runner.

Jobs run in parallel by default unless you define dependencies with `needs`.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
  deploy:
    needs: build
    runs-on: ubuntu-latest
```

## Steps

Steps run commands or actions.

- `run` executes shell commands.
- `uses` runs a reusable action.

## Runners

A runner is the machine that executes the job.

Common hosted runner:

- `ubuntu-latest`

Self-hosted runners are possible, but they require security and maintenance planning.

## Quick revision

- Workflows live in `.github/workflows`.
- Events trigger workflows.
- Jobs run on runners.
- Steps run commands or actions.
- Use `needs` when one job depends on another.
