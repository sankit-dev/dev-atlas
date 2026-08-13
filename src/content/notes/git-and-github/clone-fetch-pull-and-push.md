---
title: "Clone, Fetch, Pull and Push"
slug: "clone-fetch-pull-and-push"
description: "Understand the commands that move commits between your machine and a remote."
track: "Git & GitHub"
priority: "Must Know"
---

# Clone, Fetch, Pull and Push

These commands move Git history between your machine and a remote repository.

## clone

`clone` downloads a remote repository for the first time.

```bash
git clone https://github.com/user/project.git
```

After cloning, you have:

- project files,
- commit history,
- branches,
- remote connection named `origin`.

Use `clone` once when starting with an existing project.

## fetch

`fetch` downloads remote history but does not change your working branch.

```bash
git fetch origin
```

This is a safe way to ask:

> What changed on GitHub?

After fetching, you can inspect changes before merging.

## pull

`pull` downloads remote changes and integrates them into your current branch.

```bash
git pull origin main
```

Conceptually:

```text
git pull = git fetch + integrate changes
```

Depending on configuration, integration may happen through merge or rebase.

## push

`push` sends your local commits to the remote.

```bash
git push origin feature-login
```

If the branch does not exist on GitHub yet, this creates it there.

Then you can open a pull request.

## Example team workflow

```bash
git clone https://github.com/company/api.git
cd api
git switch -c add-login
# edit files
git add .
git commit -m "Add login endpoint"
git push origin add-login
```

Then open a PR from `add-login` into `main`.

## Difference between fetch and pull

| Command | What it does |
| --- | --- |
| `git fetch` | Downloads remote commits, does not touch current work |
| `git pull` | Downloads and integrates remote commits into current branch |

When learning, `fetch` is easier to reason about because it is less surprising.

## Common mistake

If `git push` is rejected, do not blindly force push.

It often means the remote has commits you do not have locally.

Usually you should fetch/pull first, resolve any conflicts, then push again.

Force push can overwrite remote history if used incorrectly.

## Interview answer

`git clone` creates a local copy of a remote repository. `git fetch` downloads remote updates without integrating them. `git pull` fetches and then merges or rebases into the current branch. `git push` uploads local commits to the remote branch.

