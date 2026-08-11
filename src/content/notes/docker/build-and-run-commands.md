---
title: "Build and Run Commands"
slug: "build-and-run-commands"
description: "Building, starting, viewing, stopping and debugging containers."
track: "Docker"
priority: "Must Know"
---

Docker commands let you build images, start containers, inspect what is running, and debug problems.

## Build an image

Use `docker build` to create an image from a Dockerfile.

```bash
docker build -t my-api:1.0 .
```

Meaning:

- `-t my-api:1.0` gives the image a name and tag.
- `.` uses the current directory as the build context.

The build context is important because Docker can only copy files from inside that context.

## Run a container

Use `docker run` to start a container from an image.

```bash
docker run -d --name my-api -p 3000:3000 my-api:1.0
```

Meaning:

- `-d` runs in the background.
- `--name my-api` gives the container a stable name.
- `-p 3000:3000` maps host port to container port.

Port mapping format is host port first, container port second.

## Check running containers

```bash
docker ps
docker ps -a
```

`docker ps` shows running containers. `docker ps -a` also shows stopped containers.

## Read logs

```bash
docker logs my-api
docker logs -f my-api
```

`-f` follows logs in real time.

## Debug inside a container

```bash
docker exec -it my-api sh
```

This opens a shell inside a running container. Some images use `bash`; minimal images may only have `sh`.

## Stop and remove

```bash
docker stop my-api
docker rm my-api
docker rmi my-api:1.0
```

Stopping a container does not delete it. Removing a container does not remove the image.

## Quick revision

- `docker build` creates an image.
- `docker run` starts a container.
- `-p host:container` publishes a port.
- `docker logs` is the first debugging command.
- `docker exec` lets you inspect a running container.
