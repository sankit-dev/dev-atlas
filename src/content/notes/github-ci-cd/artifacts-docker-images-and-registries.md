---
title: "Artifacts, Docker Images and Registries"
slug: "artifacts-docker-images-and-registries"
description: "Passing build output forward and publishing versioned images."
track: "GitHub CI/CD"
priority: "Important"
---

Artifacts are files produced by a workflow. Docker images are deployable artifacts for containerized apps.

## Build artifacts

Artifacts can include:

- Compiled frontend files.
- Test reports.
- Coverage reports.
- Binaries.
- Deployment bundles.
- Logs from failed jobs.

Artifacts let later jobs or humans inspect build output.

## Uploading artifacts

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: dist
```

Another job can download the artifact and deploy or inspect it.

## Docker images

For backend services, the main artifact is often a Docker image.

Typical flow:

1. Checkout code.
2. Build image.
3. Tag image.
4. Push image to registry.
5. Deploy that exact tag.

## Registries

Common registries:

- GitHub Container Registry.
- Docker Hub.
- Amazon ECR.
- Google Artifact Registry.
- Azure Container Registry.

A registry stores images so deployment systems can pull them.

## Tagging

Use stable, traceable tags.

Good tags:

- Git SHA.
- Release version.
- Build number.

Avoid relying only on `latest` for production deployments because it can point to different images over time.

## Quick revision

- Artifacts are workflow outputs.
- Docker images are deployable backend artifacts.
- Registries store images.
- Use traceable tags like Git SHA.
- Deploy the exact image that passed CI.
