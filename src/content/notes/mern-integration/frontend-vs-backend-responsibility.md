---
title: "Frontend vs Backend Responsibility"
slug: "frontend-vs-backend-responsibility"
description: "Decide what belongs in React and what belongs on the server."
track: "MERN Integration"
priority: "Must Know"
---

# Frontend vs Backend Responsibility

Full-stack apps become messy when frontend and backend responsibilities are unclear.

React and Express should not do the same job.

## Frontend responsibility

React should handle:

- UI rendering,
- forms and user interactions,
- client-side validation for better UX,
- loading and error states,
- route navigation,
- calling APIs,
- storing temporary UI state.

## Backend responsibility

Express/Node should handle:

- authentication,
- authorization,
- real validation,
- business rules,
- database reads and writes,
- secrets,
- payment/provider calls,
- consistent error responses.

## Example

Frontend can check:

```text
Password must be at least 8 characters.
```

Backend must also check it.

Why? Because anyone can bypass React and call the API directly.

## Simple rule

If it affects security, data correctness, permissions, or secrets, it belongs on the backend.

If it affects presentation and user interaction, it belongs on the frontend.

## Interview answer

In MERN, React is responsible for UI, interactions, client-side state, and calling APIs. The backend is responsible for authentication, authorization, validation, business rules, database operations, and secrets. Frontend validation improves UX, but backend validation is required for correctness and security.

