---
title: "Secrets, Tokens and Permissions"
slug: "secrets-tokens-and-permissions"
description: "Safely authenticating deployments and limiting workflow access."
track: "GitHub CI/CD"
priority: "Must Know"
---

CI/CD systems often need credentials to deploy, publish images, or call cloud APIs. Those credentials must be scoped and protected.

## Secrets

GitHub Actions secrets store sensitive values outside the repository.

Examples:

- Cloud access keys.
- Deployment tokens.
- Registry passwords.
- Webhook URLs.
- Signing keys.

Secrets should never be committed to Git.

## Using secrets

Secrets are accessed through the `secrets` context.

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

Only expose a secret to the step that needs it. Avoid putting secrets in global environment variables when possible.

## GITHUB_TOKEN

GitHub automatically provides a `GITHUB_TOKEN` for workflows.

It can be used for repository operations such as:

- Reading code.
- Creating releases.
- Publishing packages.
- Commenting on pull requests.

Its permissions should be explicitly limited.

## Permissions

Set workflow permissions instead of relying on broad defaults.

```yaml
permissions:
  contents: read
  packages: write
```

Use the minimum permission required for the job.

## OpenID Connect

OIDC lets GitHub Actions request short-lived credentials from cloud providers.

This is safer than storing long-lived cloud keys as GitHub secrets.

Common flow:

1. Workflow requests an identity token.
2. Cloud provider validates the GitHub identity.
3. Cloud provider returns temporary credentials.
4. Workflow deploys using those credentials.

## Common mistakes

- Using admin cloud keys for every workflow.
- Giving write permissions to pull request workflows from forks.
- Echoing secrets in logs.
- Reusing one token across all environments.
- Keeping old tokens active after rotation.

## Quick revision

- Store sensitive values as secrets, not in Git.
- Scope secrets to the jobs that need them.
- Limit `GITHUB_TOKEN` permissions.
- Prefer OIDC for cloud deployments.
- Rotate credentials and remove unused ones.
