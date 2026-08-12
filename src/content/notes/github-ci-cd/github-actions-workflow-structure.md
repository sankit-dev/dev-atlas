---
title: "GitHub Actions: How It Works"
slug: "github-actions-workflow-structure"
description: "The GitHub feature that runs your automation: workflows, jobs, steps, actions, and runners."
track: "GitHub CI/CD"
priority: "Must Know"
---

Now that you know what CI/CD does, this is the tool that makes it happen on GitHub: **GitHub Actions**.

Think of it as a written checklist that GitHub follows whenever something happens in your repository. The checklist is called a **workflow**.

## Workflow file location

Workflow files live in:

```text
.github/workflows/
```

Example:

```text
.github/workflows/ci.yml
```

## The five words you need to know

- **Workflow**: the whole automated checklist, such as “test every pull request.”
- **Event**: the thing that starts it, such as opening a pull request.
- **Job**: one group of work, such as “run tests” or “deploy.”
- **Step**: one item inside a job, such as `npm test`.
- **Runner**: the temporary computer that does the work.

An **action** is a reusable step written by GitHub or the community. For example, `actions/checkout` downloads your repository onto the runner.

## See it in one example

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

Read it like a sentence: “Call this workflow CI. When a pull request changes, use an Ubuntu computer, download my code, and run the tests.”

## What happens when it runs?

GitHub creates a fresh runner for the job. The runner starts empty, so your workflow normally checks out the code, installs dependencies, and then runs your commands. When the job ends, that temporary machine goes away.

## Events

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
