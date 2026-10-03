import { createContext, useContext } from 'react'
import type { SupportInterval } from './donations'

export type OpenDonationOptions = {
  amountCents?: number
  interval?: SupportInterval
}

export type DonationContextValue = {
  openDonation: (options?: OpenDonationOptions) => void
}

export const DonationContext = createContext<DonationContextValue | null>(null)

export function useDonation() {
  const context = useContext(DonationContext)

  if (!context) {
    throw new Error('useDonation must be used within a DonationProvider')
  }

  return context
}
