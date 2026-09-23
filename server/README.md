# Dev Atlas API

Express and MongoDB API for Better Auth authentication, DSA progress sync, and note revision sync.

## Local Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Required environment variable:

- `MONGODB_URI`: MongoDB Atlas connection string

Optional environment variables:

- `PORT`: defaults to `4000`
- `CLIENT_ORIGIN`: defaults to `http://localhost:5173`
- `BETTER_AUTH_URL`: defaults to `http://localhost:4000`
- `BETTER_AUTH_SECRET`: secret used by Better Auth; generate with `openssl rand -base64 32`
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`: enables GitHub login
- `DODO_PAYMENTS_API_KEY`: Dodo Payments API key (Developer > API)
- `DODO_DONATION_PRODUCT_ID`: product id of the Pay What You Want one-time product
- `DODO_WEBHOOK_KEY`: webhook signing secret (Developer > Webhooks)
- `DODO_PAYMENTS_ENVIRONMENT`: `test` uses `test.dodopayments.com`, otherwise `live.dodopayments.com`
- `DODO_DONATION_MIN_CENTS` / `DODO_DONATION_MAX_CENTS`: allowed amount range in minor units (defaults `100` / `100000`)

## One-time donations

`POST /api/donations` with `{ "amountCents": 1000 }` creates a Dodo Payments
checkout session for the configured Pay What You Want product and returns
`{ "checkoutUrl": "..." }`. The client redirects the customer there and Dodo
returns to `CLIENT_ORIGIN/?donation=success` (or `?donation=cancelled`).

Each request also writes a `Donation` document with status `initiated`, a
generated `reference`, and the checkout session id. The reference is sent to
Dodo as checkout metadata so webhook events can be matched back to it.

### Donation webhook

`POST /api/donations/webhook` verifies the Standard Webhooks signature
(`webhook-id`, `webhook-timestamp`, `webhook-signature`) against
`DODO_WEBHOOK_KEY` and persists every `payment.*` / `refund.*` event on the
matching `Donation`:

- `payment.succeeded` → `succeeded` (sets `paidAt`)
- `payment.failed` → `failed`
- `payment.processing` → `processing`
- `payment.cancelled` → `cancelled`
- `refund.created` / `refund.succeeded` → `refunded`

Events are appended to `events` (last 25 kept) and duplicates are ignored by
`webhook-id`, so Dodo retries are safe. Configure the webhook URL in the Dodo
dashboard as `https://<api-host>/api/donations/webhook`.

OAuth callback URLs:

- GitHub: `http://localhost:4000/api/auth/callback/github`

## Vercel + Render production deployment

OAuth state must be stored on a first-party origin. This repository proxies
`https://www.devatlas.site/api/auth/*` through Vercel to the Render API via
[`vercel.json`](../vercel.json). Configure these production values before
deploying:

- Vercel `VITE_AUTH_ORIGIN=https://www.devatlas.site`
- Render `BETTER_AUTH_URL=https://www.devatlas.site`
- Render `CLIENT_ORIGIN=https://www.devatlas.site`
- GitHub OAuth app callback URL:
  `https://www.devatlas.site/api/auth/callback/github`

Keep `VITE_API_ORIGIN` pointed at the Render API for the non-auth API routes.
Do not use the Render URL as the OAuth callback URL: it makes the Better Auth
state cookie third-party and browsers can reject it.

## Current Scope

Implemented for review:

- Express app setup
- MongoDB connection helper
- Better Auth with GitHub provider support
- `DsaProgress` model
- `NoteProgress` model
- health route
- note progress sync routes
