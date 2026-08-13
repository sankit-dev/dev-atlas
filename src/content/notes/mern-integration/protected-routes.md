---
title: "Protected Routes"
slug: "protected-routes"
description: "Protect frontend screens and backend endpoints correctly."
track: "MERN Integration"
priority: "Must Know"
---

# Protected Routes

Protected routes exist in two places:

- frontend routes,
- backend API routes.

You usually need both.

## Frontend protected route

React protected routes prevent logged-out users from seeing private screens.

Example:

```jsx
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}
```

This improves user experience.

## Backend protected route

Express protected routes prevent unauthorized API access.

```js
app.get('/api/me', requireAuth, getCurrentUser)
```

`requireAuth` must verify token/session before allowing the controller to run.

## Why frontend-only is not enough

A user can bypass React and call APIs directly:

```bash
curl https://api.example.com/admin/users
```

So backend protection is mandatory.

## 401 vs redirect

Frontend may redirect to login.

Backend should return status codes:

- `401` for unauthenticated,
- `403` for authenticated but not allowed.

## Interview answer

Protected routes in React hide or redirect private screens for UX. Protected routes in Express enforce real security by verifying authentication and authorization before running API logic. Frontend protection alone is not secure because APIs can be called directly.

