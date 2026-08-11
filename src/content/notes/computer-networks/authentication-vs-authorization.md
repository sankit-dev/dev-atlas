---
title: "Authentication vs Authorization"
slug: "authentication-vs-authorization"
description: "Identity verification versus permission checks."
track: "Computer Networks"
---

Authentication answers: who are you?

Authorization answers: what are you allowed to do?

Authentication happens before authorization.

## Authentication

Authentication verifies identity.

Examples:

- Username and password.
- OTP.
- Fingerprint or Face ID.
- Google login.
- GitHub login.
- Session token.
- JWT.

After successful authentication, the server usually issues a session ID or token.

## Authorization

Authorization checks permissions after identity is known.

Example:

```text
Alice: Admin
Bob: Customer
```

Both may be logged in, but only Alice can call:

```text
DELETE /users/15
```

Bob should receive `403 Forbidden`.

## Status Codes

- `401 Unauthorized`: authentication is missing or invalid.
- `403 Forbidden`: authentication succeeded, but permission is denied.

## Common Authorization Models

### RBAC

Role-Based Access Control uses roles like Admin, Manager, Employee.

### Permission-Based Access Control

Users receive specific permissions like `read_users`, `delete_users`, or `export_reports`.

### ABAC

Attribute-Based Access Control uses attributes such as owner, department, time, location, or resource state.

## Complete Flow

```text
Login
  -> Authentication
  -> Session/JWT issued
Future request
  -> Validate identity
  -> Check permissions
  -> Run business logic
```

## Interview Notes

| Authentication | Authorization |
| --- | --- |
| Verifies identity | Verifies permissions |
| Who are you? | What can you do? |
| Happens first | Happens after authentication |
| Login process | Access control |
| Fails with 401 | Fails with 403 |

A user can be authenticated but not authorized.
