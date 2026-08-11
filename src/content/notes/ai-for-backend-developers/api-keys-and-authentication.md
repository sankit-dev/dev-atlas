---
title: "API Keys & Authentication"
slug: "api-keys-and-authentication"
description: "Authenticating safely with AI APIs."
track: "AI for Backend Developers"
---

AI APIs are external services, so backend systems must authenticate safely and protect credentials.

## API keys

An API key identifies and authorizes your application when calling an AI provider.

API keys should:

- Stay on the server.
- Be stored in environment variables or secret managers.
- Never be shipped to browsers.
- Never be committed to Git.
- Be rotated if exposed.

## Backend proxy pattern

Frontend clients should call your backend, not the AI provider directly.

The backend can then:

- Add the API key safely.
- Enforce user authentication.
- Apply rate limits.
- Validate input.
- Log usage.
- Hide provider details.

## User authentication

Your app still needs normal user auth. API provider authentication only proves your server can call the provider. It does not prove the end user is allowed to use the feature.

Check both:

- Is the user logged in?
- Is the user allowed to perform this AI action?

## Key rotation

Plan for key rotation before an incident.

Good practice:

- Use secret manager versions.
- Support deploying a new key quickly.
- Monitor unusual usage.
- Disable old keys after migration.

## Quick revision

- Keep AI API keys server-side.
- Do not expose keys in frontend code.
- Authenticate users separately.
- Add rate limits and usage logs.
- Rotate leaked keys immediately.
