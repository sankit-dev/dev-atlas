import { useState } from 'react'
import { useDonation } from '../lib/donation'
import {
  defaultPresetCents,
  defaultSupportInterval,
  formatDonationAmount,
  supportPresetsCents,
  type SupportInterval,
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

const intervalLabels: Record<SupportInterval, string> = {
  monthly: 'Monthly',
  once: 'One-time',
}

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

function formatCta(cents: number, interval: SupportInterval) {
  const amount = formatDonationAmount(cents)

  return interval === 'monthly' ? `Support ${amount}/month` : `Support ${amount}`
}

export function SupportCard({
  notice = null,
  returnedFromSuccess = false,
  variant,
}: SupportCardProps) {
  const { openDonation } = useDonation()
  const { activeSubscription, isSupporter } =
    useSupportStatus(returnedFromSuccess)
  const [interval, setInterval] = useState<SupportInterval>(
    defaultSupportInterval,
  )
  const [amounts, setAmounts] = useState<Record<SupportInterval, number>>({
    monthly: defaultPresetCents('monthly'),
    once: defaultPresetCents('once'),
  })
  const [isSnoozed, setIsSnoozed] = useState(readSnoozed)

  const amountCents = amounts[interval]
  const presets = supportPresetsCents[interval]

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
            onClick={() => openDonation({ interval: 'monthly' })}
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
          ? activeSubscription
            ? 'Your monthly support pays for hosting and new notes. You can add a one-time boost whenever you like.'
            : 'Your support pays for hosting and new notes. A monthly plan helps the most.'
          : 'Every note is free and written in the open. Support covers hosting and the time it takes to write new notes and practice problems.'}
      </p>

      {notice && (
        <p className={`support-card__notice is-${notice.kind}`}>{notice.text}</p>
      )}

      <div className="support-card__panel">
        <div
          aria-label="Support frequency"
          className="support-card__interval"
          role="group"
        >
          {(['monthly', 'once'] as const).map((value) => (
            <button
              aria-pressed={interval === value}
              className={interval === value ? 'is-active' : ''}
              key={value}
              onClick={() => setInterval(value)}
              type="button"
            >
              {intervalLabels[value]}
              {value === 'monthly' && <span>Most helpful</span>}
            </button>
          ))}
        </div>

        <div className="support-card__amounts">
          {presets.map((cents) => (
            <button
              aria-pressed={amountCents === cents}
              className={amountCents === cents ? 'is-active' : ''}
              key={cents}
              onClick={() =>
                setAmounts((current) => ({ ...current, [interval]: cents }))
              }
              type="button"
            >
              {formatDonationAmount(cents)}
              {interval === 'monthly' && <small>/mo</small>}
            </button>
          ))}
        </div>

        <button
          className="support-card__cta"
          onClick={() => openDonation({ amountCents, interval })}
          type="button"
        >
          {formatCta(amountCents, interval)}
        </button>
        <p className="support-card__fine">
          {interval === 'monthly' ? 'Cancel anytime. ' : 'No account needed. '}
          Secure checkout by Dodo Payments.
        </p>
      </div>
    </div>
  )
}
