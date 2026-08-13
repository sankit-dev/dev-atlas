---
title: "Node.js Security Basics"
slug: "node-js-security-basics"
description: "Protect secrets, dependencies, inputs, and runtime configuration."
track: "Node.js"
priority: "Important"
---

# Node.js Security Basics

Security is not one package you install at the end.

It is a set of habits across code, dependencies, configuration, and deployment.

## Protect secrets

Do not commit secrets.

Use environment variables for:

- database URLs,
- JWT secrets,
- API keys,
- tokens,
- private credentials.

## Validate input

Never trust request input.

Validate:

- body,
- query params,
- route params,
- uploaded files,
- headers when relevant.

## Keep dependencies clean

Node apps use many packages.

Risks include:

- vulnerable packages,
- abandoned packages,
- malicious packages,
- unnecessary dependencies.

Use only packages you need and keep them updated.

## Avoid dangerous dynamic execution

Avoid patterns like:

```js
eval(userInput)
```

or unsafe shell commands with user input.

## Interview answer

Node.js security basics include protecting secrets with environment variables, validating all user input, keeping dependencies updated, avoiding unsafe dynamic execution, handling errors without leaking sensitive details, and using secure configuration for production.

