---
title: "File System and Path"
slug: "file-system-and-path"
description: "Read, write, and resolve files safely in Node.js."
track: "Node.js"
priority: "Must Know"
---

# File System and Path

Node.js can work with files using the `fs` module.

It can work with file paths safely using the `path` module.

## Reading a file

Promise-based version:

```js
import fs from 'node:fs/promises'

const data = await fs.readFile('notes.txt', 'utf8')
console.log(data)
```

## Writing a file

```js
import fs from 'node:fs/promises'

await fs.writeFile('output.txt', 'Hello Node')
```

## Sync vs async file APIs

Node provides sync and async APIs.

Sync:

```js
fs.readFileSync('notes.txt', 'utf8')
```

Async:

```js
await fs.readFile('notes.txt', 'utf8')
```

In backend servers, prefer async APIs because sync APIs block the event loop.

## Why path module matters

Hardcoding path strings can break across operating systems.

Use `path.join`:

```js
import path from 'node:path'

const filePath = path.join(process.cwd(), 'uploads', 'avatar.png')
```

This handles path separators correctly.

## Common mistake

Do not trust user-provided file paths directly.

Bad:

```js
const filePath = `uploads/${req.query.name}`
```

This can lead to path traversal problems.

Validate filenames and restrict file access to expected directories.

## Interview answer

Node's `fs` module lets us read, write, update, and delete files. The async promise-based APIs are preferred in servers because sync file operations block the event loop. The `path` module helps build safe cross-platform file paths.

