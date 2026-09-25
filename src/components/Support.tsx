import { useEffect, useState } from 'react'
import { authClient } from '../lib/auth'
import { useDonation } from '../lib/donation'
import {
  fetchDonationReceipt,
  fetchDonationStatus,
  fetchSponsors,
  formatDonationAmount,
  type DonationReceiptStatus,
  type Sponsor,
} from '../lib/donations'
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

function getDonationReference() {
  if (typeof window === 'undefined') {
    return null
  }

  return new URLSearchParams(window.location.search).get('donation_reference')
}

function getInitialNotice(): DonationNotice | null {
  const donation = getDonationParam()

  if (donation === 'success') {
    return {
      kind: 'success',
      text: 'Payment returned. We are verifying it with the payment provider.',
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
  const [notice, setNotice] = useState(getInitialNotice)
  const [returnedFromSuccess] = useState(() => getDonationParam() === 'success')
  const [receipt, setReceipt] = useState<DonationReceiptStatus | null>(null)
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [isCheckingReceipt, setIsCheckingReceipt] = useState(
    () => returnedFromSuccess && Boolean(getDonationReference()),
  )
  const [donation, setDonation] = useState<{
    userId: string
    hasDonated: boolean
  } | null>(null)

  const userId = session?.user?.id ?? null
  const hasDonated = donation?.userId === userId ? donation.hasDonated : false

  useEffect(() => {
    const reference = getDonationReference()

    if (!reference || !returnedFromSuccess) {
      return
    }

    let cancelled = false
    let retryTimer: number | undefined

    const checkReceipt = async (attempt: number) => {
      try {
        const nextReceipt = await fetchDonationReceipt(reference)

        if (cancelled) {
          return
        }

        setReceipt(nextReceipt)

        if (nextReceipt.status === 'succeeded') {
          setIsCheckingReceipt(false)
          setNotice({
            kind: 'success',
            text: nextReceipt.donorName
              ? `Thank you, ${nextReceipt.donorName}. Your donation is confirmed.`
              : 'Thank you. Your donation is confirmed and keeps these notes free.',
          })
          return
        }

        if (
          nextReceipt.status === 'failed' ||
          nextReceipt.status === 'cancelled'
        ) {
          setIsCheckingReceipt(false)
          setNotice({
            kind: 'cancelled',
            text: 'The payment was not completed. You can try again whenever you are ready.',
          })
          return
        }

        if (
          (nextReceipt.status === 'initiated' ||
            nextReceipt.status === 'processing') &&
          attempt < 5
        ) {
          retryTimer = window.setTimeout(
            () => void checkReceipt(attempt + 1),
            2000,
          )
          return
        }

        setIsCheckingReceipt(false)
        setNotice({
          kind: 'success',
          text:
            'Your payment is still being confirmed. We will update this page when Dodo sends confirmation.',
        })
      } catch {
        if (!cancelled && attempt < 5) {
          retryTimer = window.setTimeout(
            () => void checkReceipt(attempt + 1),
            2000,
          )
        } else if (!cancelled) {
          setIsCheckingReceipt(false)
          setNotice({
            kind: 'success',
            text: 'Your payment was returned successfully and is being verified.',
          })
        }
      }
    }

    void checkReceipt(0)

    return () => {
      cancelled = true
      if (retryTimer) window.clearTimeout(retryTimer)
    }
  }, [returnedFromSuccess])

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
    let cancelled = false

    void fetchSponsors()
      .then((nextSponsors) => {
        if (!cancelled) setSponsors(nextSponsors)
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (!params.has('donation')) {
      return
    }

    ;[
      'donation',
      'donation_reference',
      'status',
      'payment_id',
      'subscription_id',
      'email',
    ].forEach(
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
          <p className="support__eyebrow">
            <span className="support__eyebrow-dot" aria-hidden="true" />
            Reader-supported
          </p>
          <h2 id="support-heading">Support this work.</h2>
          <p>
            Every note here is free and written in the open. If Dev Atlas helped
            you understand something, you can chip in once.
          </p>
        </div>

        <div className="support__actions">
          {notice ? (
            <p className={`support__notice is-${notice.kind}`} role="status">
              {isCheckingReceipt ? 'Confirming your payment…' : notice.text}
              {receipt?.status === 'succeeded' && receipt.amountCents > 0
                ? ` (${formatDonationAmount(receipt.amountCents)})`
                : ''}
            </p>
          ) : hasDonated ? (
            <p className="support__notice is-thanks" role="status">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 14.35 6.8 13.25C3.4 10.2 1 7.98 1 5.3 1 3.1 2.7 1.5 4.8 1.5c1.2 0 2.35.55 3.2 1.55C8.85 2.05 10 1.5 11.2 1.5 13.3 1.5 15 3.1 15 5.3c0 2.68-2.4 4.9-5.8 7.95L8 14.35Z" />
              </svg>
              You&apos;ve supported Dev Atlas. Thank you.
            </p>
          ) : null}

          <button className="support__cta" onClick={openDonation} type="button">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 14.35 6.8 13.25C3.4 10.2 1 7.98 1 5.3 1 3.1 2.7 1.5 4.8 1.5c1.2 0 2.35.55 3.2 1.55C8.85 2.05 10 1.5 11.2 1.5 13.3 1.5 15 3.1 15 5.3c0 2.68-2.4 4.9-5.8 7.95L8 14.35Z" />
            </svg>
            <span>{hasDonated ? 'Donate more' : 'Donate once'}</span>
          </button>
          <p className="support__secure">One-time gift · Secure checkout</p>
        </div>

        {sponsors.length > 0 && (
          <div className="support__sponsors" aria-labelledby="sponsors-heading">
            <div className="support__sponsors-head">
              <p id="sponsors-heading">Backed by readers</p>
              <span className="support__count">
                {sponsors.length} {sponsors.length === 1 ? 'supporter' : 'supporters'}
              </span>
            </div>
            <div className="support__sponsor-list">
              {sponsors.map((sponsor, index) => (
                <div
                  className="support__sponsor"
                  key={`${sponsor.displayName}-${sponsor.donatedAt}-${index}`}
                  title={sponsor.displayName}
                >
                  <span className="support__sponsor-avatar" aria-hidden="true">
                    {sponsor.initials}
                  </span>
                  <span className="support__sponsor-name">{sponsor.displayName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </Wrap>
  )
}
