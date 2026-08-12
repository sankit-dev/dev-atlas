---
title: "Your First CI Pipeline"
slug: "building-a-useful-ci-pipeline"
description: "Set up a simple check that installs, lints, tests, and builds your app."
track: "GitHub CI/CD"
priority: "Must Know"
---

This is the first workflow most projects need. It answers one question: **can this code safely be merged?**

For a Node.js app, start with a workflow that installs dependencies, checks the code, runs tests, and builds the app. You can add more later.

## Good pipeline order

A common backend order:

1. Checkout code.
2. Set up runtime.
3. Restore dependency cache.
4. Install dependencies.
5. Run lint.
6. Run tests.
7. Build.
8. Upload artifacts or image.

Run cheaper checks before expensive ones.

## Example workflow

Create this file in your repository:

```text
.github/workflows/ci.yml
```

Then add:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

Replace `npm run lint` or `npm test` if your project does not have those scripts yet. GitHub shows the result under the **Actions** tab and on the pull request.

## Dependency caching

Caching speeds up repeated workflow runs.

Cache dependency downloads, not generated output that can go stale without checks.

For Node projects, `actions/setup-node` can cache npm dependencies.

## Tests

CI should run tests that protect the main branch.

Useful layers:

- Unit tests.
- Integration tests.
- Build/type checks.
- Smoke tests.

Do not skip tests just because they are slow. Make slow tests better or separate them intentionally.

## Fail fast

Failing fast saves time.

Examples:

- Lint before Docker build.
- Type check before deployment.
- Validate config before cloud calls.

## Quick revision

- CI should be repeatable and fast enough to run often.
- Install, lint, test, then build.
- Cache dependencies carefully.
- Fail before deployment when possible.
- A pipeline is only useful if developers trust it.
