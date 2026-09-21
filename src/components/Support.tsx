import { useEffect, useState } from 'react'
import { useDonation } from '../lib/donation'
import { Wrap } from './PageShell'

const donatedStorageKey = 'devatlas-has-donated'

type DonationNotice = {
  kind: 'success' | 'cancelled'
  text: string
}

function getDonationParam() {
  if (typeof window === 'undefined') {
    return null
  }

  return new URLSearchParams(window.location.search).get('donation')
}

function getInitialNotice(): DonationNotice | null {
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

function getInitialHasDonated() {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.localStorage.getItem(donatedStorageKey) === 'true') {
    return true
  }

  return getDonationParam() === 'success'
}

export function Support() {
  const { openDonation } = useDonation()
  const [notice] = useState(getInitialNotice)
  const [hasDonated] = useState(getInitialHasDonated)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('donation') === 'success') {
      try {
        window.localStorage.setItem(donatedStorageKey, 'true')
      } catch {
        // Private mode can block storage; the in-memory state still applies.
      }
    }

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
        <div className="support__copy">
          <h2 id="support-heading">Support this work.</h2>
          <p>
            Every note here is free and written in the open. If Dev Atlas helped
            you understand something, you can chip in once.
          </p>
        </div>

        <div className="support__actions">
          {notice ? (
            <p className={`support__notice is-${notice.kind}`}>{notice.text}</p>
          ) : hasDonated ? (
            <p className="support__notice is-thanks">
              You&apos;ve supported Dev Atlas. Thank you.
            </p>
          ) : null}

          <button className="support__cta" onClick={openDonation} type="button">
            {hasDonated ? 'Donate more' : 'Donate once'}
          </button>
        </div>
      </section>
    </Wrap>
  )
}
