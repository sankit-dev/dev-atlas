import type { NextFunction, Request, Response } from 'express'
import geoip from 'geoip-country'
import { env } from '../config/env.js'
import { getClientIp, getIpKey, rateLimit } from './rateLimit.js'

const countryCache = new WeakMap<Request, string | null>()

function lookupCountry(request: Request) {
  // Only trust a country header when a proxy we control (e.g. Cloudflare's
  // cf-ipcountry) sets it; otherwise clients could spoof it.
  if (env.geoCountryHeader) {
    const headerCountry = request.header(env.geoCountryHeader)?.trim().toUpperCase()

    if (headerCountry && /^[A-Z]{2}$/.test(headerCountry)) {
      return headerCountry
    }
  }

  return geoip.lookup(getClientIp(request))?.country ?? null
}

// Unknown locations (localhost, private ranges, unlisted IPs) resolve to null.
export function getCountry(request: Request) {
  if (!countryCache.has(request)) {
    countryCache.set(request, lookupCountry(request))
  }

  return countryCache.get(request) ?? null
}

function isRestrictedCountry(request: Request) {
  const country = getCountry(request)

  return country !== null && env.restrictedCountries.includes(country)
}

export function geoBlock(request: Request, response: Response, next: NextFunction) {
  const country = getCountry(request)

  if (country && env.blockedCountries.includes(country)) {
    response.status(451).json({
      message: 'This service is not available in your region.',
    })
    return
  }

  next()
}

// Tighter limits for restricted countries, on top of the global per-IP limit:
// a per-IP cap, then a cap shared by every client in that country. The per-IP
// limiter runs first so an IP that is already blocked does not use up the
// country-wide budget.
export function restrictedCountryLimits() {
  return [
    rateLimit({
      getKey: (request) => `${getCountry(request)}:${getIpKey(request)}`,
      keyPrefix: 'country-ip',
      limit: env.restrictedCountryIpLimit,
      skip: (request) => !isRestrictedCountry(request),
      windowMs: env.rateLimitWindowMs,
    }),
    rateLimit({
      getKey: (request) => getCountry(request) ?? 'unknown',
      keyPrefix: 'country-total',
      limit: env.restrictedCountryTotalLimit,
      skip: (request) => !isRestrictedCountry(request),
      windowMs: env.rateLimitWindowMs,
    }),
  ]
}
