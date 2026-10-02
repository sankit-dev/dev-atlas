import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { env } from "../config/env.js";
import { dash } from "@better-auth/infra";

const authClient = new MongoClient(env.mongodbUri);

const socialProviders = {
  ...(env.githubClientId && env.githubClientSecret
    ? {
        github: {
          clientId: env.githubClientId,
          clientSecret: env.githubClientSecret,
        },
      }
    : {}),
};

export const auth = betterAuth({
  appName: "Dev Atlas",
  baseURL: env.betterAuthUrl,
  basePath: "/api/auth",
  secret: env.betterAuthSecret || undefined,
  plugins: [dash()],
  database: mongodbAdapter(authClient.db(), {
    client: authClient,
  }),
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
    // Auth traffic reaches Render through the Vercel rewrite, so the socket
    // address is Vercel's. Vercel sets x-vercel-forwarded-for to the visitor.
    ipAddress: {
      ipAddressHeaders: ["x-vercel-forwarded-for", "x-forwarded-for"],
    },
  },
  // Failed OAuth flows land back in the app with ?error=<code> instead of
  // Better Auth's built-in error page.
  onAPIError: {
    errorURL: env.clientOrigin,
  },
  // Serve most get-session calls from a signed cookie instead of MongoDB.
  // A revoked session stays valid for at most maxAge seconds.
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: env.allowedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders,
});
