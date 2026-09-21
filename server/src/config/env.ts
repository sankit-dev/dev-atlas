import dotenv from 'dotenv'

dotenv.config()

const fallbackPort = 4000

function readEnv(value: string | undefined, fallback: string) {
  const trimmed = value?.trim()

  return trimmed ? trimmed : fallback
}

function toPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value)

  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback
}

export function normalizeOrigin(origin: string) {
  return origin.trim().replace(/\/+$/, '')
}

const port = toPositiveInt(process.env.PORT, fallbackPort)
const clientOrigin = normalizeOrigin(
  readEnv(process.env.CLIENT_ORIGIN, 'http://localhost:5173'),
)

const allowedOrigins = new Set([clientOrigin])

// Treat the loopback hostnames as interchangeable so a trailing slash or a
// localhost/127.0.0.1 mismatch can never break CORS during local development.
if (clientOrigin.includes('localhost')) {
  allowedOrigins.add(clientOrigin.replace('localhost', '127.0.0.1'))
}

export const env = {
  port,
  mongodbUri: readEnv(process.env.MONGODB_URI, ''),
  clientOrigin,
  allowedOrigins: [...allowedOrigins],
  betterAuthUrl: normalizeOrigin(
    readEnv(process.env.BETTER_AUTH_URL, `http://localhost:${port}`),
  ),
  betterAuthSecret: readEnv(process.env.BETTER_AUTH_SECRET, ''),
  githubClientId: readEnv(process.env.GITHUB_CLIENT_ID, ''),
  githubClientSecret: readEnv(process.env.GITHUB_CLIENT_SECRET, ''),
  dodoApiKey: readEnv(process.env.DODO_PAYMENTS_API_KEY, ''),
  dodoDonationProductId: readEnv(process.env.DODO_DONATION_PRODUCT_ID, ''),
  dodoWebhookKey: readEnv(process.env.DODO_WEBHOOK_KEY, ''),
  dodoApiBase: readEnv(process.env.DODO_PAYMENTS_ENVIRONMENT, 'live')
    .toLowerCase()
    .startsWith('test')
    ? 'https://test.dodopayments.com'
    : 'https://live.dodopayments.com',
  donationMinCents: toPositiveInt(process.env.DODO_DONATION_MIN_CENTS, 100),
  donationMaxCents: toPositiveInt(process.env.DODO_DONATION_MAX_CENTS, 100_000),
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
