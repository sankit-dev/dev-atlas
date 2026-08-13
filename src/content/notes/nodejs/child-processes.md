---
title: "Child Processes"
slug: "child-processes"
description: "Run external commands or separate programs from Node.js."
track: "Node.js"
priority: "Important"
---

# Child Processes

Node.js can start other processes using the `child_process` module.

This is useful when you need to run an external command or separate program.

## Example use cases

- run a shell command,
- call a Python script,
- process media with FFmpeg,
- run build tools,
- isolate work in another process.

## exec vs spawn

`exec` is useful for simple commands with buffered output.

```js
import { exec } from 'node:child_process'

exec('node --version', (error, stdout) => {
  if (error) throw error
  console.log(stdout)
})
```

`spawn` is better for long-running commands or streaming output.

```js
import { spawn } from 'node:child_process'

const child = spawn('node', ['--version'])

child.stdout.on('data', (chunk) => {
  console.log(chunk.toString())
})
```

## Security warning

Never pass raw user input into shell commands.

Bad:

```js
exec(`convert ${userInput}`)
```

This can cause command injection.

Validate input and avoid shell execution when possible.

## Interview answer

Child processes let Node.js run external commands or separate programs. `exec` is useful for simple buffered commands, while `spawn` is better for streaming or long-running processes. User input must be handled carefully to avoid command injection.

