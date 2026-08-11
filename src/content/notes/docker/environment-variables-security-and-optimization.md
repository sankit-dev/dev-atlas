---
title: "Environment Variables, Security and Optimization"
slug: "environment-variables-security-and-optimization"
description: "Configuration, secrets, .dockerignore, small images and non-root users."
track: "Docker"
priority: "Important"
---

Docker images should be configurable, secure, and small enough to ship efficiently.

## Environment variables

Environment variables pass runtime configuration into a container.

```bash
docker run -e PORT=3000 -e NODE_ENV=production my-api:1.0
```

Use env vars for configuration like:

- Port.
- Runtime mode.
- API endpoint.
- Feature flags.
- Non-secret settings.

Do not bake environment-specific values into the image.

## Secrets

Avoid putting secrets in:

- Dockerfile.
- Image layers.
- Git repository.
- Build arguments.
- Plain Compose files committed to the repo.

Secrets should come from a secret manager, deployment platform, or protected environment.

## .dockerignore

`.dockerignore` prevents unnecessary files from entering the build context.

Common entries:

```text
node_modules
dist
.git
.env
coverage
```

This makes builds faster and reduces the chance of copying secrets into images.

## Smaller images

Smaller images are faster to pull, scan, and deploy.

Ways to reduce image size:

- Use slim base images.
- Avoid unnecessary packages.
- Clean package manager caches.
- Use multi-stage builds.
- Copy only runtime artifacts into the final image.

## Non-root users

Containers often run as root by default. For production, prefer a non-root user.

In a Dockerfile:

```dockerfile
USER node
```

If an attacker escapes the app process, non-root execution reduces damage inside the container.

## Quick revision

- Use environment variables for runtime config.
- Do not bake secrets into images.
- Use `.dockerignore` to keep builds clean.
- Smaller images deploy faster and reduce risk.
- Run production containers as non-root when possible.
