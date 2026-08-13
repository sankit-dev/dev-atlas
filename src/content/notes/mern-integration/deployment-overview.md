---
title: "Deployment Overview"
slug: "deployment-overview"
description: "Build React, run the API, connect env vars, and deploy safely."
track: "MERN Integration"
priority: "Important"
---

# Deployment Overview

Deploying MERN means running frontend, backend, and database in production.

Local development is not enough.

## Common deployment shapes

### Separate frontend and backend

```text
React hosted on static hosting/CDN
Express API hosted on server/platform
MongoDB hosted on managed database
```

React calls the API using production API URL.

### Same backend serves React

```text
Express API serves React build files
MongoDB hosted separately
```

This can be simpler for small apps.

## Production checklist

- build React,
- set backend env vars,
- set frontend API URL,
- configure CORS,
- connect MongoDB,
- use HTTPS,
- enable logging,
- handle errors safely,
- avoid exposing secrets,
- test auth flow after deployment.

## React build

```bash
npm run build
```

This creates static files.

## Backend runtime

Backend needs:

- Node version,
- start command,
- environment variables,
- database connection,
- process manager/platform health checks.

## Interview answer

MERN deployment requires building the React frontend, running the Express/Node backend, configuring environment variables, connecting to MongoDB, setting CORS correctly, and using HTTPS. The frontend may be hosted separately as static files or served by Express, while MongoDB is usually hosted as a managed database.

