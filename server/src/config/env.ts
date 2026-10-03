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

function toCountryList(value: string | undefined) {
  return (value ?? '')
    .split(',')
    .map((code) => code.trim().toUpperCase())
    .filter((code) => /^[A-Z]{2}$/.test(code))
}

// Express "trust proxy": a hop count ("1"), "true"/"false", or a list of
// subnets. Render sits one proxy hop in front of the app.
function toTrustProxy(value: string | undefined): boolean | number | string {
  const trimmed = value?.trim()

  if (!trimmed) return 1
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  const hops = Number(trimmed)

  return Number.isInteger(hops) && hops >= 0 ? hops : trimmed
}

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
  betterAuthJoins: process.env.BETTER_AUTH_JOINS === 'true',
  githubClientId: readEnv(process.env.GITHUB_CLIENT_ID, ''),
  githubClientSecret: readEnv(process.env.GITHUB_CLIENT_SECRET, ''),
  dodoApiKey: readEnv(process.env.DODO_PAYMENTS_API_KEY, ''),
  dodoDonationProductId: readEnv(process.env.DODO_DONATION_PRODUCT_ID, ''),
  dodoSubscriptionProductId: readEnv(
    process.env.DODO_SUBSCRIPTION_PRODUCT_ID,
    '',
  ),
  dodoWebhookKey: readEnv(process.env.DODO_WEBHOOK_KEY, ''),
  dodoApiBase: readEnv(process.env.DODO_PAYMENTS_ENVIRONMENT, 'live')
    .toLowerCase()
    .startsWith('test')
    ? 'https://test.dodopayments.com'
    : 'https://live.dodopayments.com',
  donationMinCents: toPositiveInt(process.env.DODO_DONATION_MIN_CENTS, 100),
  donationMaxCents: toPositiveInt(process.env.DODO_DONATION_MAX_CENTS, 100_000),
  trustProxy: toTrustProxy(process.env.TRUST_PROXY),
  blockedCountries: toCountryList(process.env.BLOCKED_COUNTRIES),
  geoCountryHeader: readEnv(process.env.GEO_COUNTRY_HEADER, '').toLowerCase(),
  rateLimitWindowMs: toPositiveInt(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
  globalIpLimit: toPositiveInt(process.env.GLOBAL_IP_RATE_LIMIT, 10),
  restrictedCountries: toCountryList(readEnv(process.env.RESTRICTED_COUNTRIES, 'PK')),
  restrictedCountryIpLimit: toPositiveInt(process.env.RESTRICTED_COUNTRY_IP_LIMIT, 5),
  restrictedCountryTotalLimit: toPositiveInt(
    process.env.RESTRICTED_COUNTRY_TOTAL_LIMIT,
    10,
  ),
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
