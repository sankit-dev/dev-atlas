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
  },
  trustedOrigins: env.allowedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders,
});
