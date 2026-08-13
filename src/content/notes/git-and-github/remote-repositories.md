---
title: "Remote Repositories"
slug: "remote-repositories"
description: "How local Git history connects to shared repositories through clone, fetch, pull, and push."
track: "Git & GitHub"
priority: "Must Know"
---

# Remote Repositories

So far, Git can work completely on your machine.

But teams need a shared place where code can be stored, reviewed, and pulled by others.

That shared place is usually a **remote repository**.

GitHub is one popular place to host remote Git repositories.

## Local vs remote

| Place | Meaning |
| --- | --- |
| Local repository | Git repository on your machine |
| Remote repository | Git repository hosted somewhere else, such as GitHub |

Your local commits do not automatically appear on GitHub.

You push them.

GitHub changes do not automatically appear on your machine.

You fetch or pull them.

## What is origin?

When you clone a repository from GitHub, Git usually names that remote `origin`.

Example:

```bash
git clone https://github.com/example/api.git
```

Inside that cloned project:

```bash
git remote -v
```

You may see:

```text
origin  https://github.com/example/api.git (fetch)
origin  https://github.com/example/api.git (push)
```

`origin` is just a default remote name. It is not magic.

## Why remotes matter

Remote repositories allow:

- backup of code,
- team collaboration,
- pull requests,
- code review,
- CI/CD,
- release workflows,
- open source contribution.

Without remotes, Git is still useful for personal history, but collaboration becomes harder.

## Basic remote commands

Add a remote:

```bash
git remote add origin https://github.com/user/project.git
```

Push your branch:

```bash
git push origin main
```

Fetch remote updates:

```bash
git fetch origin
```

Pull remote updates into your branch:

```bash
git pull origin main
```

## Common mistake

Beginners often think GitHub has the "real" code and local Git is just a copy.

Git is distributed.

Your local repository has real commit history too. GitHub is a shared remote copy with collaboration features.

## Interview answer

A remote repository is a Git repository hosted outside my machine, commonly on GitHub. I use remotes to share commits with others. `push` sends local commits to the remote, `fetch` downloads remote history without merging, and `pull` fetches and integrates remote changes into the current branch.

