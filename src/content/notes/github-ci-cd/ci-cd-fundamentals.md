---
title: "CI/CD Fundamentals"
slug: "ci-cd-fundamentals"
description: "Continuous Integration, Continuous Delivery and Continuous Deployment."
track: "GitHub CI/CD"
priority: "Must Know"
---

CI/CD automates testing and release workflows so changes move safely from code to production.

## Continuous Integration

Continuous Integration means every change is checked automatically.

Common CI checks:

- Install dependencies.
- Lint code.
- Run tests.
- Build the app.
- Check formatting.
- Run security scans.

The goal is to catch problems before they reach shared branches or production.

## Continuous Delivery

Continuous Delivery means the app is always kept in a releasable state.

The pipeline builds and verifies the release, but production deployment may require manual approval.

This fits teams that need controlled release timing.

## Continuous Deployment

Continuous Deployment means every change that passes the pipeline is automatically deployed.

This requires strong tests, monitoring, rollback strategy, and team confidence.

## Example backend flow

1. Pull request opens.
2. Lint and tests run.
3. Build verifies the app compiles.
4. Merge to main builds a Docker image.
5. Image deploys to staging.
6. Production deployment waits for approval.

## Why it matters

CI/CD improves:

- Feedback speed.
- Release consistency.
- Developer confidence.
- Auditability.
- Recovery from mistakes.

## Quick revision

- CI checks every change.
- Continuous Delivery keeps releases ready.
- Continuous Deployment releases automatically after checks pass.
- Good pipelines are repeatable and visible.
- Deployment safety depends on tests, monitoring, and rollback.
