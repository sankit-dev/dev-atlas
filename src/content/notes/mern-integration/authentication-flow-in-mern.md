---
title: "Authentication Flow in MERN"
slug: "authentication-flow-in-mern"
description: "Connect login, tokens/cookies, protected APIs, and UI state."
track: "MERN Integration"
priority: "Must Know"
---

# Authentication Flow in MERN

Authentication connects frontend UI with backend identity checks.

It answers:

> Who is the current user?

## JWT-style flow

1. User submits login form in React.
2. React sends email/password to Express.
3. Express validates input.
4. Backend verifies password hash.
5. Backend creates token.
6. React stores auth state.
7. Future API requests include token.
8. Express middleware verifies token.

## Cookie-style flow

1. User logs in.
2. Backend creates session or token.
3. Backend sets `httpOnly` cookie.
4. Browser sends cookie automatically.
5. Backend verifies cookie/session on protected APIs.

## Frontend state

React often stores:

- current user,
- loading auth state,
- whether user is logged in,
- role/permissions if needed.

But React state is not security.

Backend must still verify every protected request.

## End-to-end example

Login from React:

```js
async function login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error.message)
  }

  localStorage.setItem('token', result.data.token)
}
```

Calling a protected API:

```js
async function loadTodos() {
  const token = localStorage.getItem('token')

  const response = await fetch('/api/todos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}
```

Backend route:

```js
app.get('/api/todos', requireAuth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id })
  res.json({ data: todos })
})
```

Notice the ownership filter:

```js
{ userId: req.user.id }
```

That prevents one user from reading another user's todos.

## Common mistake

Do not protect only the frontend route.

If `/dashboard` is hidden in React but `/api/admin` has no backend auth check, the API is still vulnerable.

## Interview answer

In MERN authentication, React collects credentials and sends them to the Express API. The backend verifies the user and returns a token or sets a cookie. React uses auth state for UI, but backend middleware must verify every protected API request. Frontend route protection is for UX; backend protection is for security.
