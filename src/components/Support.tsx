import { useEffect, useState } from 'react'
import { Wrap } from './PageShell'
import { SupportCard, type SupportNotice } from './SupportCard'

function getDonationParam() {
  if (typeof window === 'undefined') {
    return null
  }

  return new URLSearchParams(window.location.search).get('donation')
}

function getInitialNotice(): SupportNotice | null {
  const donation = getDonationParam()

  if (donation === 'success') {
    return {
      kind: 'success',
      text: 'Thank you. Your support keeps these notes free.',
    }
  }

  if (donation === 'cancelled') {
    return {
      kind: 'cancelled',
      text: 'Checkout cancelled. Nothing was charged.',
    }
  }

  return null
}

export function Support() {
  const [notice] = useState(getInitialNotice)
  const [returnedFromSuccess] = useState(() => getDonationParam() === 'success')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (!params.has('donation')) {
      return
    }

    ;['donation', 'status', 'payment_id', 'subscription_id', 'email'].forEach(
      (key) => params.delete(key),
    )

    const query = params.toString()

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`,
    )
  }, [])

  return (
    <Wrap>
      <section className="support" id="support" aria-labelledby="support-heading">
        <SupportCard
          notice={notice}
          returnedFromSuccess={returnedFromSuccess}
          variant="section"
        />
      </section>
    </Wrap>
  )
}
