---
title: "File Uploads in Express"
slug: "file-uploads-in-express"
description: "Accept files safely using middleware and storage rules."
track: "Express.js"
priority: "Important"
---

# File Uploads in Express

File uploads need careful handling.

An upload endpoint should not blindly accept any file of any size.

## What upload code must decide

- maximum file size,
- allowed file types,
- storage destination,
- file naming,
- auth requirements,
- error handling,
- cleanup on failure.

## Common middleware approach

Express apps often use upload middleware.

The middleware parses `multipart/form-data` and makes file info available to the route.

Conceptual route:

```js
app.post('/upload', requireAuth, upload.single('avatar'), (req, res) => {
  res.json({
    fileName: req.file.filename,
  })
})
```

## Storage options

Files may be stored:

- on local disk,
- in cloud object storage,
- temporarily before processing.

For production, object storage is usually better than storing user uploads inside the app server filesystem.

## Common mistake

Do not trust file extension alone.

Validate file size and type, and never allow uploaded files to execute as code.

## Interview answer

File uploads in Express are usually handled with multipart middleware. A safe upload flow validates file size and type, requires authorization when needed, stores files in a controlled location, handles errors, and avoids trusting user-provided filenames or extensions blindly.

