---
title: "CORS"
slug: "cors"
description: "Same Origin Policy, preflight requests, and Access-Control-Allow-Origin."
track: "Computer Networks"
---

CORS exists because browsers enforce the Same Origin Policy.

## Origin

An origin is:

```text
Protocol + Domain + Port
```

These are different origins:

```text
https://example.com
http://example.com
https://api.example.com
https://example.com:3000
```

## Same Origin Policy

The Same Origin Policy prevents JavaScript on one origin from reading responses from another origin unless the other server explicitly allows it.

This protects users from malicious sites reading sensitive data from sites where the user is logged in.

## CORS

CORS (Cross-Origin Resource Sharing) lets a server tell the browser which origins are allowed.

```text
Access-Control-Allow-Origin: https://myapp.com
```

If the requesting origin matches, the browser exposes the response to JavaScript.

## Simple Request

For simple cross-origin requests, the browser sends the request and checks the CORS headers in the response.

## Preflight Request

For methods like `PUT`, `PATCH`, `DELETE`, or requests with custom headers, the browser first sends an `OPTIONS` request.

```text
OPTIONS /users
Origin: https://myapp.com
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: Authorization
```

The server replies:

```text
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, DELETE
Access-Control-Allow-Headers: Authorization
```

Only then does the browser send the actual request.

## Common Headers

| Header | Purpose |
| --- | --- |
| Access-Control-Allow-Origin | Allowed origins |
| Access-Control-Allow-Methods | Allowed methods |
| Access-Control-Allow-Headers | Allowed request headers |
| Access-Control-Allow-Credentials | Whether credentials can be included |
| Access-Control-Max-Age | How long preflight can be cached |

## Interview Notes

- CORS is enforced by browsers.
- Postman does not enforce CORS.
- CORS is configured on the backend.
- SOP mainly prevents JavaScript from reading cross-origin responses.
- A preflight request is an automatic browser `OPTIONS` check.
