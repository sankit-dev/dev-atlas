---
title: "Writing a Dockerfile"
slug: "writing-a-dockerfile"
description: "FROM, WORKDIR, COPY, RUN, EXPOSE and CMD."
track: "Docker"
priority: "Must Know"
---

A Dockerfile is a plain-text recipe for building a Docker image. You write it once in your project; Docker follows its instructions to create the package.

For a Node app, it normally says: start from a Node base image, copy the project in, install dependencies, and say how to start the app.

## Basic Node example

```dockerfile
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

After you save this as `Dockerfile`, the next note shows how to turn it into an image with `docker build`.

## FROM

`FROM` chooses the base image.

Examples:

- `node:22-slim`
- `python:3.12-slim`
- `nginx:alpine`

Choose a base image that matches the runtime and security needs.

## WORKDIR

`WORKDIR` sets the directory for later instructions.

It is better than repeatedly writing absolute paths.

## COPY

`COPY` moves files from the build context into the image.

Copy dependency files first, install dependencies, then copy the rest of the source. This improves build cache usage.

## RUN

`RUN` executes commands during image build.

Examples:

- Install dependencies.
- Build application artifacts.
- Compile assets.

Every `RUN` contributes to image layers.

## EXPOSE

`EXPOSE` documents which port the container expects to listen on.

It does not publish the port by itself. You still need `-p` or platform configuration.

## CMD

`CMD` defines the default command when a container starts.

There should usually be one main foreground process.

## Quick revision

- Dockerfile builds an image.
- `FROM` chooses the base.
- `COPY` brings files into the image.
- `RUN` executes build-time commands.
- `CMD` is the default runtime command.
