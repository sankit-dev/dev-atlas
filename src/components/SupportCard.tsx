import { useState } from 'react'
import { useDonation } from '../lib/donation'
import {
  defaultPresetCents,
  donationPresetsCents,
  formatDonationAmount,
} from '../lib/donations'
import { siteName } from '../lib/site'
import { useSupportStatus } from '../lib/useSupportStatus'

export type SupportNotice = {
  kind: 'success' | 'cancelled'
  text: string
}

type SupportCardProps = {
  notice?: SupportNotice | null
  returnedFromSuccess?: boolean
  variant: 'inline' | 'section'
}

const snoozeKey = 'devatlas:support-snoozed-until'
const snoozeMs = 14 * 24 * 60 * 60 * 1000

function readSnoozed() {
  try {
    return Number(window.localStorage.getItem(snoozeKey) ?? 0) > Date.now()
  } catch {
    return false
  }
}

function writeSnooze() {
  try {
    window.localStorage.setItem(snoozeKey, String(Date.now() + snoozeMs))
  } catch {
    // Storage can be unavailable (private mode); the card just reappears.
  }
}

export function SupportCard({
  notice = null,
  returnedFromSuccess = false,
  variant,
}: SupportCardProps) {
  const { openDonation } = useDonation()
  const { isSupporter } = useSupportStatus(returnedFromSuccess)
  const [amountCents, setAmountCents] = useState(defaultPresetCents)
  const [isSnoozed, setIsSnoozed] = useState(readSnoozed)

  if (variant === 'inline') {
    if (isSupporter || isSnoozed) {
      return null
    }

    return (
      <aside aria-label={`Support ${siteName}`} className="support-inline">
        <div className="support-inline__copy">
          <p className="support-inline__title">Finished this one?</p>
          <p>
            {siteName} stays free because readers chip in. Even a coffee keeps
            new notes coming.
          </p>
        </div>
        <div className="support-inline__actions">
          <button
            className="support-inline__cta"
            onClick={() => openDonation()}
            type="button"
          >
            Support {siteName}
          </button>
          <button
            aria-label="Hide this message for two weeks"
            className="support-inline__dismiss"
            onClick={() => {
              writeSnooze()
              setIsSnoozed(true)
            }}
            type="button"
          >
            Not now
          </button>
        </div>
      </aside>
    )
  }

  return (
    <div className="support-card">
      <p className="support-card__eyebrow">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        Free, open, reader-supported
      </p>

      <h2 id="support-heading">
        {isSupporter
          ? `Thank you for supporting ${siteName}.`
          : `Support ${siteName}.`}
      </h2>
      <p className="support-card__lead">
        {isSupporter
          ? 'Your support pays for hosting and new notes. You can chip in again whenever you like.'
          : 'Every note is free and written in the open. Support covers hosting and the time it takes to write new notes and practice problems.'}
      </p>

      {notice && (
        <p className={`support-card__notice is-${notice.kind}`}>{notice.text}</p>
      )}

      <div className="support-card__panel">
        <div className="support-card__amounts">
          {donationPresetsCents.map((cents) => (
            <button
              aria-pressed={amountCents === cents}
              className={amountCents === cents ? 'is-active' : ''}
              key={cents}
              onClick={() => setAmountCents(cents)}
              type="button"
            >
              {formatDonationAmount(cents)}
            </button>
          ))}
        </div>

        <button
          className="support-card__cta"
          onClick={() => openDonation({ amountCents })}
          type="button"
        >
          {isSupporter ? 'Support again' : 'Support'}{' '}
          {formatDonationAmount(amountCents)}
        </button>
        <p className="support-card__fine">
          One-time payment. No account needed. Secure checkout by Dodo Payments.
        </p>
      </div>
    </div>
  )
}
