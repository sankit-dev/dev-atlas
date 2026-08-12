---
title: "Artifacts, Docker Images and Registries"
slug: "artifacts-docker-images-and-registries"
description: "Passing build output forward and publishing versioned images."
track: "GitHub CI/CD"
priority: "Important"
---

Sometimes the work from one job needs to be kept or passed to the next job. That saved output is an **artifact**.

For example, a frontend build produces a `dist` folder. Instead of building it again somewhere else, a workflow can save that folder and a later deployment job can use it.

A Docker image is another kind of artifact: a packaged version of an app that a server can run.

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

For backend services, the main artifact is often a Docker image. It contains your app and its runtime setup, so the staging server runs the same version that CI tested.

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

A registry is like a storage shelf for Docker images. Your workflow pushes an image there; a deployment system pulls that exact image later.

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
