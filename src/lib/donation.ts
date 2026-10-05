import { createContext, useContext } from 'react'

export type OpenDonationOptions = {
  amountCents?: number
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
