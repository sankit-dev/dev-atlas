---
title: "Volumes and Persistent Data"
slug: "volumes-and-persistent-data"
description: "Why container files disappear and how volumes preserve data."
track: "Docker"
priority: "Must Know"
---

Containers are meant to be easy to replace. That is good for app code, but it creates an important question: where should a database keep its data? The answer is usually a **volume**.

## Container filesystem

When a container writes files to its own filesystem, those files belong to that container.

If the container is removed, that data can disappear.

This is a problem for:

- Databases.
- Uploaded files.
- Generated reports.
- Local development state.

## Volumes

A Docker volume is storage managed by Docker.

```bash
docker volume create postgres-data
docker run -v postgres-data:/var/lib/postgresql/data postgres
```

The left side is the volume name. The right side is the path inside the container.

## Bind mounts

A bind mount maps a host path into a container.

```bash
docker run -v "$PWD":/app node:22
```

Bind mounts are common for local development because code changes on the host appear inside the container.

## Volume vs bind mount

| Volume | Bind mount |
| --- | --- |
| Managed by Docker | Uses a host path |
| Good for container data | Good for local dev files |
| More portable | Depends on host directory |

## Database example

Without a volume, a PostgreSQL container loses its data when removed.

With a volume, the database files remain and can be reused by a new container.

## Quick revision

- Container files are not reliable persistence.
- Volumes preserve data outside the container.
- Bind mounts map host files into the container.
- Use volumes for databases.
- Use bind mounts for local development workflows.
