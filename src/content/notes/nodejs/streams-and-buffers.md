---
title: "Streams and Buffers"
slug: "streams-and-buffers"
description: "Process large data without loading everything into memory."
track: "Node.js"
priority: "Must Know"
---

# Streams and Buffers

Streams let Node.js process data piece by piece.

Buffers represent raw binary data.

## Why streams exist

Imagine a user uploads a 2 GB video.

Bad approach:

```text
Load entire 2 GB file into memory, then process it.
```

This can crash the server.

Better approach:

```text
Read small chunks, process chunks, write chunks.
```

That is what streams help with.

## Read stream example

```js
import fs from 'node:fs'

const stream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
})

stream.on('data', (chunk) => {
  console.log('chunk:', chunk.length)
})

stream.on('end', () => {
  console.log('done')
})
```

## Pipe example

```js
import fs from 'node:fs'

const read = fs.createReadStream('input.txt')
const write = fs.createWriteStream('output.txt')

read.pipe(write)
```

`pipe` connects readable stream output to writable stream input.

## Real upload example

Suppose users upload profile videos.

The wrong backend design is:

```text
read full file into memory -> then save it
```

If many users upload large files at the same time, memory usage can explode.

A stream-based design is:

```text
request stream -> validation/processing -> storage stream
```

Conceptual code:

```js
app.post('/upload', (req, res) => {
  const writeStream = fs.createWriteStream('upload.bin')

  req.pipe(writeStream)

  req.on('end', () => {
    res.json({ message: 'uploaded' })
  })
})
```

In real apps, use proper upload middleware, file limits, auth, and storage rules. This example is only to show the stream idea.

## What is Buffer?

A Buffer stores raw bytes.

Node uses buffers when working with:

- files,
- TCP data,
- streams,
- binary uploads.

Example:

```js
const buffer = Buffer.from('hello')
console.log(buffer)
```

## Interview answer

Streams process data in chunks instead of loading everything into memory. They are useful for large files, uploads, downloads, and network data. Buffers represent raw binary data in Node.js and are often used with streams and file/network operations.
