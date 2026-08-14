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

## Current Scope

Implemented for review:

- Express app setup
- MongoDB connection helper
- Better Auth with GitHub provider support
- `DsaProgress` model
- `NoteProgress` model
- health route
- note progress sync routes
