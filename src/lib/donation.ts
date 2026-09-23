import { createContext, useContext } from 'react'

export type DonationContextValue = {
  openDonation: () => void
}

export const DonationContext = createContext<DonationContextValue | null>(null)

export function useDonation() {
  const context = useContext(DonationContext)

  if (!context) {
    throw new Error('useDonation must be used within a DonationProvider')
  }

  return context
}
