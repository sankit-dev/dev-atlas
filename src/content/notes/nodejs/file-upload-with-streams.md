---
title: "File Upload with Streams"
slug: "file-upload-with-streams"
description: "Use streams to handle large files efficiently."
track: "Node.js"
priority: "Important"
---

# File Upload with Streams

Large uploads should not be fully loaded into memory.

Streams help process files chunk by chunk.

## Why this matters

If 100 users upload 500 MB files and your server loads each file fully into memory, the server can crash.

Streams avoid that by processing chunks.

## Simple stream idea

```js
requestStream.pipe(fileWriteStream)
```

Data flows from request to file.

## What production code needs

A real upload feature should handle:

- file size limits,
- allowed file types,
- storage location,
- duplicate names,
- upload errors,
- cleanup on failure,
- auth and authorization.

## Express note

In Express apps, file uploads are often handled with middleware like Multer or directly with streams depending on the requirement.

But the underlying idea is still Node streams.

## Interview answer

File uploads should be handled with streams when files can be large. Streams process data chunk by chunk, reducing memory usage. Production upload code should validate file type and size, handle errors, secure storage paths, and clean up partial uploads.

