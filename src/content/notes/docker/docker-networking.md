---
title: "Docker Networking"
slug: "docker-networking"
description: "Container communication, service names and published ports."
track: "Docker"
priority: "Must Know"
---

Docker networking controls how containers communicate with each other and with the host.

## Default bridge network

By default, containers run on a bridge network.

Containers can make outbound requests, but inbound access from the host requires published ports.

## Published ports

```bash
docker run -p 8080:3000 my-api
```

This means:

- Host port: 8080.
- Container port: 3000.

Requests to `localhost:8080` on the host are forwarded to port `3000` inside the container.

## Container-to-container communication

Containers on the same user-defined network can reach each other by container name.

```bash
docker network create app-net
docker run --name api --network app-net my-api
docker run --name db --network app-net postgres
```

The API can connect to host `db`.

## Compose service names

In Docker Compose, services can reach each other by service name.

Example:

- API service connects to database host `postgres`.
- Redis host is `redis`.

Do not use `localhost` from one container to reach another container. Inside a container, `localhost` means that same container.

## Production view

Docker networking concepts carry into container platforms, but production networking is usually handled by orchestrators, load balancers, and service discovery.

## Quick revision

- Published ports expose containers to the host.
- Format is host port to container port.
- Containers on the same network can talk by name.
- In Compose, use service names as hostnames.
- `localhost` inside a container means that container itself.
