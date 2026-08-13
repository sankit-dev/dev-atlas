---
title: "Ignoring Files with .gitignore"
slug: "ignoring-files-with-gitignore"
description: "Keep dependencies, secrets, builds, and local files out of Git."
track: "Git & GitHub"
priority: "Must Know"
---

# Ignoring Files with .gitignore

Not every file in your project should be committed.

Some files are generated, local, huge, or secret.

`.gitignore` tells Git:

> Do not track these files by default.

## Common files to ignore

For a Node.js project:

```gitignore
node_modules/
dist/
.env
.DS_Store
npm-debug.log*
```

Why?

- `node_modules/` can be reinstalled from `package.json`.
- `dist/` is build output.
- `.env` often contains secrets.
- `.DS_Store` is a macOS local file.
- log files are local noise.

## .gitignore does not remove already tracked files

This is a common beginner surprise.

If `config.env` is already tracked by Git, adding it to `.gitignore` does not automatically remove it from Git history.

To stop tracking it:

```bash
git rm --cached config.env
```

Then commit the change:

```bash
git commit -m "Stop tracking local environment file"
```

The file stays on your machine, but Git stops tracking it.

## Do not commit secrets

Never commit:

- API keys,
- database passwords,
- private keys,
- production credentials,
- access tokens.

If a secret is pushed to GitHub, assume it is exposed.

Rotate the secret. Do not only delete it from the latest commit.

## Example .gitignore for backend app

```gitignore
# dependencies
node_modules/

# build output
dist/
build/

# environment
.env
.env.local

# logs
*.log

# editor/system
.vscode/
.DS_Store
```

Some teams commit `.vscode/settings.json` intentionally. That is fine if the team agrees. The rule is not "always ignore everything local"; the rule is "commit only files that help the project".

## Interview answer

`.gitignore` defines patterns for files Git should not track, such as dependencies, build output, logs, and local environment files. It only affects untracked files. If a file is already tracked, I need to remove it from the index with `git rm --cached` before `.gitignore` will stop future tracking.

