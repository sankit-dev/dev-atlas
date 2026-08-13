---
title: "Merge Conflicts"
slug: "merge-conflicts"
description: "Why conflicts happen and how to resolve them without panic."
track: "Git & GitHub"
priority: "Must Know"
---

# Merge Conflicts

A merge conflict happens when Git cannot automatically combine changes.

This usually means two branches changed the same part of the same file in different ways.

## Simple example

On `main`, the code says:

```js
const timeout = 3000
```

On your branch, you changed it to:

```js
const timeout = 5000
```

Another developer changed it to:

```js
const timeout = 10000
```

Git cannot know which value is correct.

So it asks a human to decide.

## Conflict markers

Git may write this into the file:

```text
<<<<<<< HEAD
const timeout = 10000
=======
const timeout = 5000
>>>>>>> feature-branch
```

Meaning:

- top part is one side,
- bottom part is the other side,
- you must edit the file into the final correct version.

Example final result:

```js
const timeout = 5000
```

Then remove the conflict markers.

## Conflict resolution flow

1. Run the merge or rebase.
2. Git reports conflicted files.
3. Open each file and choose the correct final code.
4. Remove conflict markers.
5. Run tests if possible.
6. Stage resolved files.
7. Continue.

For merge:

```bash
git add conflicted-file.js
git commit
```

For rebase:

```bash
git add conflicted-file.js
git rebase --continue
```

## How to reduce conflicts

You cannot avoid conflicts forever, but you can reduce them:

- keep branches small,
- pull or rebase regularly,
- avoid formatting huge files with unrelated changes,
- communicate when multiple people edit the same area,
- split large refactors from feature changes.

## Common mistake

Do not blindly accept "current" or "incoming" changes.

The correct answer may be a combination of both.

Read the code and understand what each side was trying to do.

## Interview answer

A merge conflict occurs when Git cannot automatically combine changes, usually because two branches edited the same lines differently. To resolve it, I inspect the conflict markers, choose or combine the correct code, remove the markers, test the result, stage the file, and complete the merge or rebase.

