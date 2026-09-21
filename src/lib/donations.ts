const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? 'http://localhost:4000'

export const donationCurrency = String(
  import.meta.env.VITE_DONATION_CURRENCY ?? 'USD',
)

export const donationMinCents = 100
export const donationMaxCents = 100_000

const presetSource = String(
  import.meta.env.VITE_DONATION_PRESETS ?? '500,1000,2500',
)

export const donationPresetsCents: number[] = presetSource
  .split(',')
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isInteger(value) && value > 0)

export function formatDonationAmount(cents: number) {
  return new Intl.NumberFormat(undefined, {
    currency: donationCurrency,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
    style: 'currency',
  }).format(cents / 100)
}

type DonationCheckoutResponse = {
  checkoutUrl?: unknown
  message?: unknown
}

export async function createDonationCheckout(amountCents: number) {
  const response = await fetch(`${apiOrigin}/api/donations`, {
    body: JSON.stringify({ amountCents }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const data = (await response
    .json()
    .catch(() => null)) as DonationCheckoutResponse | null

  if (!response.ok || typeof data?.checkoutUrl !== 'string') {
    throw new Error(
      typeof data?.message === 'string'
        ? data.message
        : 'Unable to start checkout. Please try again.',
    )
  }

  return data.checkoutUrl
}
