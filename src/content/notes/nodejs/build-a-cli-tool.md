---
title: "Build a CLI Tool"
slug: "build-a-cli-tool"
description: "Read command line arguments and create a useful script."
track: "Node.js"
priority: "Important"
---

# Build a CLI Tool

CLI tools are command-line programs.

Node.js is often used for project scripts and developer tools.

## Goal

Build a CLI that greets a user:

```bash
node greet.js Asha
```

Output:

```text
Hello, Asha
```

## Basic solution

```js
const name = process.argv[2]

if (!name) {
  console.error('Please provide a name')
  process.exit(1)
}

console.log(`Hello, ${name}`)
```

## What this teaches

- `process.argv`,
- input validation,
- exit codes,
- command-line usage,
- small automation scripts.

## Improvements

Add options:

```bash
node greet.js --name Asha --uppercase
```

Then parse flags manually or with a package.

## Interview angle

Explain that Node CLI tools use `process.argv` to read command-line input, `process.exit` for status codes, and filesystem/process APIs to automate tasks.

