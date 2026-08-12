---
title: "Deploying Safely"
slug: "environments-approvals-and-deployment"
description: "Use staging, production approvals, and a rollback plan when you start releasing automatically."
track: "GitHub CI/CD"
priority: "Must Know"
---

Deploying means putting a new version of your app somewhere people can use it. CI has checked the code; now CD helps you release it carefully.

Do not start by automatically deploying every project to production. A safe first step is deploying to a **staging** environment after code reaches `main`.

## Why environments exist

Different deployment targets need different controls.

Examples:

- Development can deploy automatically.
- Staging can deploy after merge.
- Production may require approval.

Environments let you apply rules to each target.

## Environment secrets

Environment secrets are only available to jobs that deploy to that environment.

This prevents a staging job from accidentally using production credentials.

Example:

- `STAGING_API_KEY` belongs to staging.
- `PRODUCTION_API_KEY` belongs to production.

## Approval gates

Production deployments often require manual approval.

Approval gates reduce risk by making a human confirm:

- The change is expected.
- The environment is correct.
- The deployment timing is acceptable.
- Monitoring is ready.

## Deployment job example

```yaml
jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh
```

If the production environment requires reviewers, this job waits before running.

## Rollback thinking

A deployment workflow should not only push new code. It should also support recovery.

Plan for:

- Re-deploying a previous version.
- Rolling back a container tag.
- Disabling a feature flag.
- Restoring database backup when needed.

## Quick revision

- Environments separate staging and production controls.
- Environment secrets reduce credential leakage.
- Production can require manual approval.
- Deployment workflows should include rollback thinking.
- Keep deployment targets explicit.
