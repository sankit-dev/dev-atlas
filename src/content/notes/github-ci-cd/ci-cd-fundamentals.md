---
title: "What is GitHub CI/CD?"
slug: "ci-cd-fundamentals"
description: "A beginner-friendly explanation of CI, CD, why teams use it, and a real example."
track: "GitHub CI/CD"
priority: "Must Know"
---

Imagine you change one line in an app and push it to GitHub. Before other people use that change, someone needs to check that the app still works. Later, someone may need to put the new version on a live server.

**GitHub CI/CD is a way to make those repeatable jobs happen automatically.** GitHub runs the checks and, when you choose, helps release the app too.

You do not need CI/CD to write code. You use it when manually testing and releasing every change starts to be slow, easy to forget, or risky.

> **Make this interview-ready:** read this note, create one small GitHub Actions workflow, then explain CI and CD aloud without looking. Reading alone is the starting point—not the finish.

## First, what do CI and CD mean?

- **CI** means **Continuous Integration**. Whenever developers add code together, CI automatically checks whether the change is safe to merge.
- **CD** can mean **Continuous Delivery** or **Continuous Deployment**. Both are about getting tested code released. The difference is whether a person presses the final release button.

The word **continuous** does not mean something runs every second. It means these checks are part of the normal flow of making changes, instead of being a big manual task at the end.

## Why would we need it?

Without CI/CD, a typical release can look like this:

1. You change code.
2. You hope you remembered to run the tests.
3. Someone manually builds the app and uploads it to a server.
4. A small missed error breaks the live app.

With CI/CD, the same flow becomes more reliable:

1. You open a pull request.
2. GitHub runs the agreed checks automatically.
3. If a check fails, you fix it before merging.
4. After merge, GitHub can prepare or release the same tested version.

It is like having a calm, consistent teammate who follows the release checklist every time.

## A small real-world example

Say you have a Node.js to-do app.

When you open a pull request, GitHub can:

- install the project dependencies,
- check the code style,
- run the tests, and
- build the app.

If a test fails, the pull request shows a red X. That is CI telling you, “Please fix this before we merge.”

Once the pull request is merged, GitHub can build a Docker image and deploy it to a staging server. A teammate can then approve the production deployment. That release part is CD.

## Continuous Integration (CI)

CI means every change is checked automatically, usually when someone opens or updates a pull request.

Common CI checks:

- Install dependencies.
- Lint code.
- Run tests.
- Build the app.
- Check formatting.
- Run security scans.

The goal is simple: catch problems before they reach the shared `main` branch or your users.

**Use CI when:** your project has tests, a build command, formatting rules, or more than one person changing code. Even a small personal project benefits from a basic build check.

## Continuous Delivery

Continuous Delivery means the app is always kept in a releasable state. The automation prepares a tested release, but a person decides when to send it to production.

Example: every merge to `main` deploys to staging, while production waits for your approval on Friday afternoon.

**Use this when:** you want automation but still need control over release timing—for example, a client-facing app or a team with a review process.

## Continuous Deployment

Continuous Deployment means every change that passes the pipeline is automatically deployed to production. There is no manual release step.

Example: a documentation website automatically goes live after its tests and build succeed.

**Use this when:** changes are small and well-tested, you can monitor the app, and you know how to roll back. Beginners should usually start with CI, then add delivery later.

## Where does GitHub fit in?

**GitHub Actions** is GitHub’s built-in automation tool. You describe your checklist in a small YAML file inside your repository. GitHub reads it and runs the jobs on a temporary machine.

You will learn the YAML syntax in the next note. For now, remember this:

```text
Your code change → GitHub Actions runs checks → safe to merge → optionally deploy
```

## A sensible beginner path

Do not try to automate everything on day one.

1. Add CI that runs your test and build whenever a pull request changes.
2. Make those checks required before merging to `main`.
3. Add a staging deployment after merges to `main`.
4. Add a production approval step only when you are comfortable releasing.

That is a useful CI/CD setup. It can stay this simple for a long time.

## Example flow, end to end

1. Pull request opens.
2. Lint and tests run.
3. Build verifies the app compiles.
4. You merge it to `main`.
5. GitHub builds a Docker image and deploys it to staging.
6. A production deployment waits for approval.

## Why it matters

CI/CD improves:

- Faster feedback: problems show up soon after a change.
- Consistency: the same checklist runs every time.
- Confidence: you release code that has already been checked.
- Less manual work: no one has to remember every release command.

## Quick revision

- CI checks a code change automatically.
- CD releases tested code; Delivery waits for a person, Deployment does not.
- GitHub Actions is the GitHub feature that runs this automation.
- Start with one CI workflow for pull requests. Add deployment only when you need it.
