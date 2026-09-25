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

export const donationCurrencySymbol = (() => {
  const parts = new Intl.NumberFormat(undefined, {
    currency: donationCurrency,
    style: 'currency',
  }).formatToParts(1)

  return parts.find((part) => part.type === 'currency')?.value ?? ''
})()

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

export async function createDonationCheckout(
  amountCents: number,
  couponCode?: string,
) {
  const trimmedCoupon = couponCode?.trim()
  const response = await fetch(`${apiOrigin}/api/donations`, {
    body: JSON.stringify({
      amountCents,
      ...(trimmedCoupon ? { couponCode: trimmedCoupon } : {}),
    }),
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

export type DonationStatus = {
  hasDonated: boolean
  donationCount: number
  totalAmountCents: number
  currency: string | null
  lastDonationAt: string | null
}

export type Sponsor = {
  displayName: string
  initials: string
  donatedAt: string | null
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  const response = await fetch(`${apiOrigin}/api/donations/sponsors`)

  if (!response.ok) {
    throw new Error('Unable to load sponsors')
  }

  const data = (await response.json()) as { sponsors?: unknown }

  if (!Array.isArray(data.sponsors)) {
    return []
  }

  return data.sponsors.filter(
    (sponsor): sponsor is Sponsor =>
      typeof sponsor === 'object' &&
      sponsor !== null &&
      typeof (sponsor as Sponsor).displayName === 'string' &&
      typeof (sponsor as Sponsor).initials === 'string' &&
      (typeof (sponsor as Sponsor).donatedAt === 'string' ||
        (sponsor as Sponsor).donatedAt === null),
  )
}

export type DonationReceiptStatus = {
  reference: string
  status:
    | 'initiated'
    | 'processing'
    | 'succeeded'
    | 'failed'
    | 'cancelled'
    | 'refunded'
    | 'charged_back'
  amountCents: number
  currency: string | null
  donorName: string | null
  paidAt: string | null
  refundedAt: string | null
  disputeStatus: string | null
}

export async function fetchDonationStatus(): Promise<DonationStatus | null> {
  const response = await fetch(`${apiOrigin}/api/donations/me`, {
    credentials: 'include',
  })

  if (response.status === 401) {
    return null
  }

  if (!response.ok) {
    throw new Error('Unable to load donation status')
  }

  const data = (await response.json()) as Partial<DonationStatus>

  return {
    hasDonated: data.hasDonated === true,
    donationCount:
      typeof data.donationCount === 'number' ? data.donationCount : 0,
    totalAmountCents:
      typeof data.totalAmountCents === 'number' ? data.totalAmountCents : 0,
    currency: typeof data.currency === 'string' ? data.currency : null,
    lastDonationAt:
      typeof data.lastDonationAt === 'string' ? data.lastDonationAt : null,
  }
}

export async function fetchDonationReceipt(
  reference: string,
): Promise<DonationReceiptStatus> {
  const response = await fetch(
    `${apiOrigin}/api/donations/status/${encodeURIComponent(reference)}`,
    { credentials: 'include' },
  )

  const data = (await response.json().catch(() => null)) as
    | (Partial<DonationReceiptStatus> & { message?: unknown })
    | null

  if (!response.ok) {
    throw new Error(
      data && 'message' in data && typeof data.message === 'string'
        ? data.message
        : 'Unable to verify donation status',
    )
  }

  return {
    amountCents:
      typeof data?.amountCents === 'number' ? data.amountCents : 0,
    currency: typeof data?.currency === 'string' ? data.currency : null,
    disputeStatus:
      typeof data?.disputeStatus === 'string' ? data.disputeStatus : null,
    donorName: typeof data?.donorName === 'string' ? data.donorName : null,
    paidAt: typeof data?.paidAt === 'string' ? data.paidAt : null,
    reference: typeof data?.reference === 'string' ? data.reference : reference,
    refundedAt:
      typeof data?.refundedAt === 'string' ? data.refundedAt : null,
    status:
      data?.status === 'processing' ||
      data?.status === 'succeeded' ||
      data?.status === 'failed' ||
      data?.status === 'cancelled' ||
      data?.status === 'refunded' ||
      data?.status === 'charged_back'
        ? data.status
        : 'initiated',
  }
}
