---
title: "Installing and Configuring Git"
slug: "installing-and-configuring-git"
description: "Set name, email, editor, default branch, and authentication basics."
track: "Git & GitHub"
priority: "Must Know"
---

# Installing and Configuring Git

Before using Git seriously, configure your identity and a few defaults.

Git records the author name and email on every commit. That is how teams know who created a change.

## Check whether Git is installed

Run:

```bash
git --version
```

If Git is installed, you will see something like:

```text
git version 2.x.x
```

## Set your name and email

Use the same name and email you want attached to commits:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Check the values:

```bash
git config --global user.name
git config --global user.email
```

## Set the default branch name

Many teams use `main` as the default branch:

```bash
git config --global init.defaultBranch main
```

Now when you run `git init`, Git starts with `main`.

## Set a default editor

Git sometimes opens an editor for commit messages, merge messages, or rebase steps.

Example for VS Code:

```bash
git config --global core.editor "code --wait"
```

If you are not sure, this can wait. You can still create commits with `git commit -m`.

## Create a repository

Inside a project folder:

```bash
git init
```

This creates a hidden `.git` directory.

That `.git` directory stores Git history and metadata. Do not delete it unless you intentionally want to remove Git tracking from the project.

## Authentication with GitHub

When you push to GitHub, GitHub needs to know who you are.

Common authentication options:

- HTTPS with a personal access token.
- SSH key connected to your GitHub account.
- GitHub CLI login.

For beginners, the important idea is:

> Git tracks history locally. GitHub authentication is only needed when talking to GitHub.

## Common mistake

Do not put passwords or tokens inside Git commits.

If a secret is committed and pushed, deleting the line later is not enough. The secret may still exist in Git history.

Use environment variables, secret managers, or GitHub Actions secrets instead.

## Quick checklist

Run these once on a new machine:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

Then use `git init` for a new local project or `git clone` for an existing remote project.

