import dotenv from 'dotenv'

dotenv.config()

const fallbackPort = 4000

export const env = {
  port: Number(process.env.PORT ?? fallbackPort),
  mongodbUri: process.env.MONGODB_URI ?? '',
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  betterAuthUrl: process.env.BETTER_AUTH_URL ?? `http://localhost:${process.env.PORT ?? fallbackPort}`,
  betterAuthSecret: process.env.BETTER_AUTH_SECRET ?? '',
  githubClientId: process.env.GITHUB_CLIENT_ID ?? '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
}

export function assertRequiredEnv() {
  const missingValues: string[] = []

  if (!env.mongodbUri) {
    missingValues.push('MONGODB_URI')
  }

  if (missingValues.length > 0) {
    throw new Error(`Missing required environment variables: ${missingValues.join(', ')}`)
  }
}
