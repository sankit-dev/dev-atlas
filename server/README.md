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
