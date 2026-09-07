import { createAuthClient } from 'better-auth/react'

const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? 'http://localhost:4000'
// In production, route auth through the frontend origin (for example via a
// Vercel rewrite). OAuth state and session cookies then remain first-party.
const authOrigin = import.meta.env.VITE_AUTH_ORIGIN

export const authClient = createAuthClient({
  baseURL: authOrigin ? `${authOrigin}/api/auth` : `${apiOrigin}/api/auth`,
})

