---
title: "Package Versioning"
slug: "package-versioning"
description: "Understand semver, package-lock, dependencies, and devDependencies."
track: "Node.js"
priority: "Important"
---

# Package Versioning

Node projects depend on packages.

Versioning controls which package versions your project can install.

## Semantic versioning

Versions usually look like:

```text
major.minor.patch
```

Example:

```text
4.18.2
```

Meaning:

- major: breaking changes,
- minor: new backward-compatible features,
- patch: bug fixes.

## Version ranges

```json
{
  "express": "^4.18.2"
}
```

The caret `^` allows compatible minor and patch updates.

For `4.18.2`, it can update within version 4, but not to 5.

## package-lock.json

`package.json` describes allowed versions.

`package-lock.json` records the exact installed dependency tree.

Commit `package-lock.json` for applications so teammates and deployments install consistent versions.

## dependencies vs devDependencies

`dependencies` are needed at runtime.

`devDependencies` are needed for development tools like tests, linters, and build tools.

## Interview answer

Node packages usually follow semantic versioning: major, minor, patch. `package.json` defines dependency ranges, while `package-lock.json` locks exact installed versions for reproducible installs. Runtime packages go in dependencies, while development tools go in devDependencies.

