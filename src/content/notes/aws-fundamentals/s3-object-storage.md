---
title: "S3: Object Storage"
slug: "s3-object-storage"
description: "Buckets, objects, access control, versioning and common use cases."
track: "AWS Fundamentals"
priority: "Must Know"
---

S3 is AWS object storage. It stores files as objects inside buckets.

## Object storage

S3 is not a normal filesystem and not a relational database. It is designed for storing objects like:

- Images.
- Videos.
- Logs.
- Backups.
- Static website files.
- Data exports.
- User uploads.

Each object has data, metadata, and a key.

## Buckets and keys

A bucket is the top-level container. An object key is the object's path-like name.

Example:

```text
bucket: learning-atlas-uploads
key: users/42/avatar.png
```

S3 keys look like folders, but they are object names.

## Access control

By default, keep buckets private.

Common access patterns:

- Backend uploads files using IAM permissions.
- Users download files through signed URLs.
- Static public assets use controlled public access or CDN.
- CloudFront serves private S3 content through an origin access control.

Avoid making a whole bucket public unless there is a clear reason.

## Versioning

S3 versioning keeps previous versions of objects.

It helps recover from:

- Accidental deletion.
- Bad overwrite.
- Some ransomware-style damage.

Versioning can increase storage cost, so lifecycle rules matter.

## Lifecycle rules

Lifecycle rules can move or delete objects automatically.

Examples:

- Delete temporary uploads after 7 days.
- Move old logs to cheaper storage.
- Expire old object versions.

## Backend use cases

- Upload user files.
- Store generated reports.
- Keep application backups.
- Serve static assets.
- Store logs and event archives.

## Quick revision

- S3 stores objects inside buckets.
- Object keys identify files.
- Keep buckets private by default.
- Use signed URLs for controlled access.
- Versioning and lifecycle rules help manage safety and cost.
