import { useEffect, useState } from 'react'
import { authClient } from '../lib/auth'
import { useDonation } from '../lib/donation'
import { fetchDonationStatus } from '../lib/donations'
import { Wrap } from './PageShell'

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

export function Support() {
  const { openDonation } = useDonation()
  const { data: session, isPending: isSessionPending } = authClient.useSession()
  const [notice] = useState(getInitialNotice)
  const [returnedFromSuccess] = useState(() => getDonationParam() === 'success')
  const [donation, setDonation] = useState<{
    userId: string
    hasDonated: boolean
  } | null>(null)

  const userId = session?.user?.id ?? null
  const hasDonated = donation?.userId === userId ? donation.hasDonated : false

  // Donation status is owned by the backend, not the browser.
  useEffect(() => {
    if (isSessionPending || !userId) {
      return
    }

    let cancelled = false
    let retryTimer: number | undefined

    const load = async (attempt: number) => {
      try {
        const status = await fetchDonationStatus()

        if (cancelled) {
          return
        }

        setDonation({ userId, hasDonated: status?.hasDonated ?? false })

        // The result may lag the redirect while the backend reconciles with
        // Dodo, so retry a few times right after a successful checkout.
        if (
          status !== null &&
          !status.hasDonated &&
          returnedFromSuccess &&
          attempt < 3
        ) {
          retryTimer = window.setTimeout(
            () => void load(attempt + 1),
            2000 * (attempt + 1),
          )
        }
      } catch {
        // Keep the last known value; the backend remains the source of truth.
      }
    }

    void load(0)

    return () => {
      cancelled = true
      if (retryTimer) {
        window.clearTimeout(retryTimer)
      }
    }
  }, [isSessionPending, returnedFromSuccess, userId])

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
