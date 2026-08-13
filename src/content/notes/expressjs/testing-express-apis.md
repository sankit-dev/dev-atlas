---
title: "Testing Express APIs"
slug: "testing-express-apis"
description: "Test routes, middleware, and error responses."
track: "Express.js"
priority: "Important"
---

# Testing Express APIs

API tests check whether endpoints behave correctly.

They are especially useful for auth, validation, and error cases.

## What to test

For an endpoint, test:

- success response,
- validation errors,
- unauthorized access,
- forbidden access,
- not found cases,
- database failure handling where practical.

## Example test thinking

For:

```text
POST /users
```

Test:

- creates user with valid input,
- rejects missing email,
- rejects duplicate email,
- does not return password,
- returns `201` on success.

## Test app export pattern

It is useful to export the Express app without starting the server.

```js
export const app = express()
```

Then start separately:

```js
app.listen(3000)
```

Tests can import `app` directly.

## Interview answer

Express API tests should verify successful responses and failure cases such as validation errors, unauthorized requests, forbidden access, and not found responses. A common pattern is exporting the Express app separately from `listen` so tests can call routes without starting a real server.

