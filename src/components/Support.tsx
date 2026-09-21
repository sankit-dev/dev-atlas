import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import {
  createDonationCheckout,
  donationMaxCents,
  donationMinCents,
  donationPresetsCents,
  formatDonationAmount,
} from '../lib/donations'
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
  const dialogRef = useRef<HTMLDialogElement>(null)
  const customInputId = useId()
  const [presetCents, setPresetCents] = useState(donationPresetsCents[1] ?? 1000)
  const [customValue, setCustomValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice] = useState(getInitialNotice)
  const [hasDonated] = useState(getInitialHasDonated)

  const amountCents = customValue.trim()
    ? Math.round(Number(customValue) * 100)
    : presetCents
  const isAmountValid =
    Number.isInteger(amountCents) &&
    amountCents >= donationMinCents &&
    amountCents <= donationMaxCents

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

  const openDialog = () => {
    setError(null)
    dialogRef.current?.showModal()
  }

  const handleDialogClick = (event: { target: EventTarget | null }) => {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close()
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isAmountValid || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const checkoutUrl = await createDonationCheckout(amountCents)
      window.location.href = checkoutUrl
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to start checkout. Please try again.',
      )
      setIsSubmitting(false)
    }
  }

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

          <button className="support__cta" onClick={openDialog} type="button">
            {hasDonated ? 'Donate more' : 'Donate once'}
          </button>
        </div>
      </section>

      <dialog
        aria-labelledby="donate-dialog-heading"
        className="donate-dialog"
        onClick={handleDialogClick}
        ref={dialogRef}
      >
        <form className="donate-form" onSubmit={handleSubmit}>
          <h2 id="donate-dialog-heading">Choose an amount</h2>
          <p>
            One-time payment. No account needed, and you can leave the amount
            blank on the next screen too.
          </p>

          <div className="donate-presets">
            {donationPresetsCents.map((cents) => (
              <button
                className={
                  !customValue.trim() && presetCents === cents ? 'is-active' : ''
                }
                key={cents}
                onClick={() => {
                  setPresetCents(cents)
                  setCustomValue('')
                }}
                type="button"
              >
                {formatDonationAmount(cents)}
              </button>
            ))}
          </div>

          <div className="donate-custom">
            <label htmlFor={customInputId}>Or enter your own amount</label>
            <input
              id={customInputId}
              inputMode="decimal"
              min={donationMinCents / 100}
              onChange={(event) => setCustomValue(event.target.value)}
              placeholder={formatDonationAmount(donationPresetsCents[1] ?? 1000)}
              step="1"
              type="number"
              value={customValue}
            />
          </div>

          {error && <p className="donate-error">{error}</p>}

          <div className="donate-actions">
            <button
              className="donate-submit"
              disabled={!isAmountValid || isSubmitting}
              type="submit"
            >
              {isSubmitting
                ? 'Opening checkout…'
                : `Donate ${isAmountValid ? formatDonationAmount(amountCents) : ''}`}
            </button>
            <button
              className="donate-cancel"
              onClick={() => dialogRef.current?.close()}
              type="button"
            >
              Cancel
            </button>
          </div>

          <p className="donate-secure">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
              <path d="M7 10V8a5 5 0 0 1 10 0v2" />
              <rect height="10" rx="2" width="14" x="5" y="10" />
            </svg>
            Secure checkout by Dodo Payments
          </p>
        </form>
      </dialog>
    </Wrap>
  )
}
