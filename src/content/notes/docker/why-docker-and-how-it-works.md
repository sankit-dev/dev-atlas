---
title: "Why Docker and How It Works"
slug: "why-docker-and-how-it-works"
description: "The problem Docker solves and containers versus virtual machines."
track: "Docker"
priority: "Must Know"
---

Docker packages an application with the environment it needs to run. This reduces "works on my machine" problems.

## The problem Docker solves

Without Docker, developers and servers may have different:

- Operating system packages.
- Runtime versions.
- Environment variables.
- System libraries.
- Startup commands.

Docker makes the runtime environment repeatable.

## Container

A container is a running process with isolation around filesystem, networking, and resources.

Containers share the host operating system kernel, which makes them lighter than virtual machines.

## Image

An image is a packaged filesystem and metadata used to start containers.

You can think of it as a blueprint. A container is a running instance of that blueprint.

## Dockerfile

A Dockerfile describes how to build an image.

It usually defines:

- Base image.
- Working directory.
- Files to copy.
- Dependencies to install.
- Port metadata.
- Startup command.

## Containers vs virtual machines

| Container | Virtual machine |
| --- | --- |
| Shares host kernel | Has its own guest OS |
| Starts quickly | Usually heavier |
| Packages app environment | Emulates full machine |
| Good for application deployment | Good for strong OS isolation |

## Backend developer view

Docker is useful for:

- Local development.
- Running databases for tests.
- Packaging backend APIs.
- CI builds.
- Deployment to container platforms.

## Quick revision

- Docker makes runtime environments repeatable.
- Images are blueprints.
- Containers are running image instances.
- Containers are lighter than VMs because they share the host kernel.
- Docker is a packaging and runtime tool, not a full deployment strategy by itself.
