import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { env } from "../config/env.js";

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

export async function connectAuthDatabase() {
  await authClient.connect();
}

export async function disconnectAuthDatabase() {
  await authClient.close();
}

export const auth = betterAuth({
  appName: "Dev Atlas",
  baseURL: env.betterAuthUrl,
  basePath: "/api/auth",
  secret: env.betterAuthSecret || undefined,
  database: mongodbAdapter(authClient.db(), {
    client: authClient,
  }),
  advanced: {
    storeStateStrategy: "database",
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
  trustedOrigins: [env.clientOrigin],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders,
});
