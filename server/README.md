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
returns to `CLIENT_ORIGIN/?donation=success` (or `?donation=cancelled`) with a
private donation reference.

Each request also writes a `Donation` document with status `initiated`, a
generated `reference`, and the checkout session id. The reference is sent to
Dodo as checkout metadata so webhook events can be matched back to it.

### Payment webhooks

`POST /api/donations/webhook` is the only webhook endpoint. It verifies the
Standard Webhooks signature (`webhook-id`, `webhook-timestamp`,
`webhook-signature`) against `DODO_WEBHOOK_KEY` using the official
`dodopayments` SDK (`client.webhooks.unwrap`). Invalid signatures are rejected
with `401`; unverified payloads are never written.

Every verified event is stored in the `WebhookEvent` collection keyed by
`webhook-id` (unique), which makes delivery idempotent under retries and keeps a
full audit/replay log. Events that map to a donation are then projected onto the
matching `Donation` (matched by `reference`, `paymentId`, or `checkoutSessionId`):

- `payment.succeeded` → `succeeded` (sets `paidAt`)
- `payment.failed` → `failed` (stores `lastError`)
- `payment.processing` → `processing`
- `payment.cancelled` → `cancelled`
- `refund.succeeded` → `refunded` (stores `refundId`, `refundedAt`)
- `refund.failed` → recorded, status unchanged
- `dispute.*` → `disputeStatus`; `dispute.lost` → `charged_back`, `dispute.won` restores `succeeded`

Events that do not match a donation are still stored (with `matched: false`) and
acknowledged. If a verified payment amount differs from the recorded amount, the
donation is flagged with `amountMismatch` for review. Donation events are also
appended to `events` (last 25 kept).

Configure the webhook URL in the Dodo dashboard as
`https://<api-host>/api/donations/webhook`. There is no unauthenticated webhook
route.

The frontend checks `GET /api/donations/status/:reference` after returning from
checkout. A success redirect only starts verification; the UI displays a
confirmed donation only after this endpoint reports `succeeded` from the
verified webhook projection. The endpoint returns the donor name for that
private reference but never exposes customer email.

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
