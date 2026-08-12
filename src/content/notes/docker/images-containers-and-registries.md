---
title: "Images, Containers and Registries"
slug: "images-containers-and-registries"
description: "The relationship between an image, running container and registry."
track: "Docker"
priority: "Must Know"
---

Docker has three core nouns. Learn these before memorising commands: **image**, **container**, and **registry**.

## Image

An image is a read-only package used to create containers. Think of it as the saved blueprint for your application.

It contains:

- Filesystem layers.
- Runtime dependencies.
- Application code.
- Metadata.
- Default command.

Images are built from Dockerfiles.

## Container

A container is a running instance of an image—your app actually running.

From one image, you can start many containers.

Each container has its own writable layer, process space, network identity, and lifecycle.

## Registry

A registry stores Docker images so another machine can download and run them. Think of it as a package store for images.

Examples:

- Docker Hub.
- GitHub Container Registry.
- Amazon Elastic Container Registry.

Teams push built images to a registry, then deployment systems pull those images.

## Tags

Tags identify image versions.

```bash
docker build -t my-api:1.0 .
docker tag my-api:1.0 registry.example.com/my-api:1.0
docker push registry.example.com/my-api:1.0
```

Avoid relying only on `latest` in production because it is mutable and can make deployments hard to reproduce.

## Image layers

Docker images are built in layers. If a layer does not change, Docker can reuse it from cache.

This is why Dockerfile instruction order matters. Copy dependency manifests before application source when possible.

## Quick revision

- Image is the package.
- Container is the running instance.
- Registry stores and distributes images.
- Tags label image versions.
- Avoid mutable production deployments based only on `latest`.
