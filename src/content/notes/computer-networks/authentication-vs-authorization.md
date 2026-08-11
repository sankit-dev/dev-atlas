---
title: "Authentication vs Authorization"
slug: "authentication-vs-authorization"
description: "Identity verification versus permission checks."
track: "Computer Networks"
---

The easiest way to remember it is:

> **Authentication = Who are you?**

	**Authorization = What are you allowed to do?**

Authentication always happens **before** authorization.
---
# 1. Authentication
Authentication is the process of **verifying a user's identity**.

The server asks:

> "Can you prove that you are who you claim to be?"

### Example
Login page:

```plain text
Email: john@example.com
Password: ********
```

Request:

```plain text
POST /login
```

Server checks:

- Does this email exist?
- Does the password match?

If yes:

```plain text
Authenticated
```

The server then issues a way to identify the user for future requests, such as:

- A session ID
- A JWT
- Another authentication token
---
## Authentication Examples
- Username + Password
- OTP
- Fingerprint
- Face ID
- Google Login (OAuth)
- GitHub Login

All of these answer the same question:

> **"Who is this user?"**
---
# 2. Authorization
Once the server knows **who you are**, it decides **what you can do**.

It asks:

> "Does this authenticated user have permission to perform this action?"
---
## Example
Suppose:

```plain text
Alice
Role: Admin
```

```plain text
Bob
Role: Customer
```

Both log in successfully.

Authentication:

```plain text
Alice ✓

Bob ✓
```

Now they try:

```plain text
DELETE /users/15
```

Server checks:

```plain text
Role?
```

Alice:

```plain text
Admin

↓

Allowed
```

Bob:

```plain text
Customer

↓

403 Forbidden
```

Both users are authenticated, but only one is authorised.
---
# 3. Authentication Flow

```plain text
User
   │
   ▼
Enter Email & Password
   │
   ▼
Server verifies credentials
   │
   ▼
Identity confirmed
   │
   ▼
Issue Session/JWT
```

At this point, the user is logged in.
---
# 4. Authorization Flow
Later:

```plain text
DELETE /users/5
```

Request contains:

```plain text
Session ID

or

JWT
```

Server:

```plain text
Who is this user?

↓

User = Alice

↓

Role = Admin

↓

Allow Request
```

or

```plain text
Who is this user?

↓

User = Bob

↓

Role = Customer

↓

403 Forbidden
```
---
# 5. Real Example
Imagine a company dashboard.

Users:

```plain text
Admin
Manager
Employee
```

Everyone can log in.

Authentication:

```plain text
Admin ✔

Manager ✔

Employee ✔
```

Now consider different actions.

View profile:

```plain text
Admin ✔

Manager ✔

Employee ✔
```

Delete employee:

```plain text
Admin ✔

Manager ✖

Employee ✖
```

Export payroll:

```plain text
Admin ✔

Manager ✔

Employee ✖
```

The login process is authentication.

Permission checks are authorization.
---
# 6. HTTP Status Codes
### Authentication Failure
User is not logged in or provides invalid credentials.

```plain text
401 Unauthorized
```

Despite its name, **401** usually means **authentication is required or has failed**.

Examples:

- Invalid password
- Missing JWT
- Expired session
- Invalid token
---
### Authorization Failure
User is logged in but lacks permission.

```plain text
403 Forbidden
```

Examples:

- Customer trying to delete users
- Employee accessing admin dashboard
- User editing someone else's private resource without permission
---
# 7. Common Authorization Models
## Role-Based Access Control (RBAC)
Permissions are based on roles.

Example:

```plain text
Admin

Manager

Employee
```

Rules:

```plain text
Admin

↓

Everything
```

```plain text
Manager

↓

View Reports

Approve Leave
```

```plain text
Employee

↓

View Own Profile
```

This is the most common approach in business applications.
---
## Permission-Based Access Control
Instead of roles, users have individual permissions.

Example:

```plain text
read_users

delete_users

create_invoice

export_reports
```

A user may have any combination of these permissions.
---
## Attribute-Based Access Control (ABAC)
Access depends on attributes such as:

- User department
- Resource owner
- Time of day
- Location

Example:

```plain text
Allow editing a document only if:

User ID == Document Owner
```
---
# 8. Authentication vs Authorization

<table header-row="true">
<tr>
<td>Authentication</td>
<td>Authorization</td>
</tr>
<tr>
<td>Verifies identity</td>
<td>Verifies permissions</td>
</tr>
<tr>
<td>Answers "Who are you?"</td>
<td>Answers "What can you do?"</td>
</tr>
<tr>
<td>Happens first</td>
<td>Happens after authentication</td>
</tr>
<tr>
<td>Login process</td>
<td>Access control process</td>
</tr>
<tr>
<td>Uses passwords, OTP, JWT, sessions</td>
<td>Uses roles, permissions, policies</td>
</tr>
</table>
---
# 9. Complete Request Flow

```plain text
User
   │
   ▼
Login
   │
   ▼
Authentication
   │
   ▼
Session/JWT issued
   │
   ▼
Future Request
   │
   ▼
Authentication
(Is the token/session valid?)
   │
   ▼
Authorization
(Does this user have permission?)
   │
   ▼
Business Logic
```
---
# Interview Questions
### Can a user be authenticated but not authorised?
**Yes.**

Example:

- User logs in successfully.
- Tries to access the admin panel.
- They are authenticated but receive **403 Forbidden** because they lack permission.
---
### Can authorisation happen without authentication?
In most applications, **no**.

The server first needs to know **who the user is** before deciding what they're allowed to do.
---
### What is the difference between 401 and 403?
- **401 Unauthorized** → Authentication failed or is missing.
- **403 Forbidden** → Authentication succeeded, but the user doesn't have permission.
---
# Notion Notes (Short Version)
### Authentication
- Verifies the user's identity.
- Answers: **Who are you?**
- Uses credentials such as passwords, OTPs, sessions, or JWTs.
- On success, the server issues a session or token.

### Authorization
- Determines what an authenticated user can access.
- Answers: **What are you allowed to do?**
- Uses roles, permissions, or access policies.
- Returns **403 Forbidden** if access is denied.

### Key Differences

<table header-row="true">
<tr>
<td>Authentication</td>
<td>Authorization</td>
</tr>
<tr>
<td>Identity verification</td>
<td>Permission verification</td>
</tr>
<tr>
<td>Happens first</td>
<td>Happens after authentication</td>
</tr>
<tr>
<td>Login process</td>
<td>Access control</td>
</tr>
<tr>
<td>Returns **401** on failure</td>
<td>Returns **403** on failure</td>
</tr>
</table>

This topic naturally leads into **OAuth 2.0**, **OpenID Connect**, **Access Tokens vs Refresh Tokens**, and **API Keys**, which are common authentication and authorisation mechanisms used in modern backend systems.
