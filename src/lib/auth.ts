import { createAuthClient } from "better-auth/react";

const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? "http://localhost:4000";

export const authClient = createAuthClient({
  baseURL: `${apiOrigin}/api/auth`,
});
