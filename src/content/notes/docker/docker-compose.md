---
title: "Docker Compose"
slug: "docker-compose"
description: "Running a multi-container application with one YAML file."
track: "Docker"
priority: "Must Know"
---

Docker Compose runs multi-container applications with one YAML file.

## Why Compose exists

Real backend apps often need more than one service.

Examples:

- API.
- Database.
- Redis.
- Queue worker.
- Admin UI.

Compose starts these together for local development and simple environments.

## Example

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

The API connects to host `db` because `db` is the Compose service name.

## Common commands

```bash
docker compose up
docker compose up -d
docker compose down
docker compose logs -f
docker compose exec api sh
```

`up` starts services. `down` stops and removes containers created by the Compose project.

## depends_on

`depends_on` controls startup order, but it does not guarantee the database is ready for queries.

Applications should still handle retries or wait for readiness.

## Environment files

Compose can load variables from `.env`, but be careful not to commit real secrets.

Use example files like `.env.example` for documentation.

## Quick revision

- Compose defines multiple services in YAML.
- Services can communicate by service name.
- Volumes preserve service data.
- `depends_on` is startup order, not readiness.
- Compose is excellent for local development.
