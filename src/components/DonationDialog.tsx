import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type PropsWithChildren,
} from 'react'
import { siteName } from '../lib/site'
import { DonationContext, type OpenDonationOptions } from '../lib/donation'
import {
  createDonationCheckout,
  defaultPresetCents,
  defaultSupportInterval,
  donationCurrencySymbol,
  donationMaxCents,
  donationMinCents,
  formatDonationAmount,
  supportPresetsCents,
  type SupportInterval,
} from '../lib/donations'

type DonationDialogProps = {
  initial: OpenDonationOptions
  open: boolean
  onClose: () => void
}

const intervalLabels: Record<SupportInterval, string> = {
  monthly: 'Monthly',
  once: 'One-time',
}

function DonationDialog({ initial, open, onClose }: DonationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const customInputId = useId()
  const [interval, setInterval] = useState<SupportInterval>(
    initial.interval ?? defaultSupportInterval,
  )
  const [presetCents, setPresetCents] = useState(
    initial.amountCents ?? defaultPresetCents(interval),
  )
  const presets = supportPresetsCents[interval]
  const [customValue, setCustomValue] = useState(() =>
    initial.amountCents &&
    !supportPresetsCents[initial.interval ?? defaultSupportInterval].includes(
      initial.amountCents,
    )
      ? String(initial.amountCents / 100)
      : '',
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amountCents = customValue.trim()
    ? Math.round(Number(customValue) * 100)
    : presetCents
  const isAmountValid =
    Number.isInteger(amountCents) &&
    amountCents >= donationMinCents &&
    amountCents <= donationMaxCents

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (open) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else if (dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const handleClose = () => {
      setError(null)
      onClose()
    }

    dialog.addEventListener('close', handleClose)

    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

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
      const checkoutUrl = await createDonationCheckout(amountCents, {
        interval,
      })
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
    <dialog
      aria-labelledby="donate-dialog-heading"
      className="donate-dialog"
      onClick={handleDialogClick}
      ref={dialogRef}
    >
      <form className="donate-form" onSubmit={handleSubmit}>
        <div className="donate-dialog__head">
          <p className="donate-eyebrow">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            Support {siteName}
          </p>
          <button
            aria-label="Close support dialog"
            className="donate-close"
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <h2 id="donate-dialog-heading">Choose how to support</h2>
        <p className="donate-lead">
          {interval === 'monthly'
            ? 'A small monthly amount helps most. Cancel anytime.'
            : 'A single payment. No account needed.'}
        </p>

        <div
          aria-label="Support frequency"
          className="donate-interval"
          role="group"
        >
          {(['monthly', 'once'] as const).map((value) => (
            <button
              aria-pressed={interval === value}
              className={interval === value ? 'is-active' : ''}
              key={value}
              onClick={() => {
                setInterval(value)
                setPresetCents(defaultPresetCents(value))
                setCustomValue('')
              }}
              type="button"
            >
              {intervalLabels[value]}
            </button>
          ))}
        </div>

        <div className="donate-presets">
          {presets.map((cents) => (
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
          <div className="donate-field">
            {donationCurrencySymbol && (
              <span aria-hidden="true" className="donate-field__symbol">
                {donationCurrencySymbol}
              </span>
            )}
            <input
              id={customInputId}
              inputMode="decimal"
              min={donationMinCents / 100}
              onChange={(event) => setCustomValue(event.target.value)}
              placeholder={String(defaultPresetCents(interval) / 100)}
              step="1"
              type="number"
              value={customValue}
            />
          </div>
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
              : !isAmountValid
                ? 'Support'
                : interval === 'monthly'
                  ? `Support ${formatDonationAmount(amountCents)}/month`
                  : `Support ${formatDonationAmount(amountCents)}`}
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
  )
}

export function DonationProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  // Re-keyed on every open so the dialog starts from the requested plan/amount.
  const [session, setSession] = useState<{
    id: number
    options: OpenDonationOptions
  }>({ id: 0, options: {} })

  const openDonation = useCallback((options: OpenDonationOptions = {}) => {
    setSession((current) => ({ id: current.id + 1, options }))
    setOpen(true)
  }, [])
  const closeDonation = useCallback(() => setOpen(false), [])

  return (
    <DonationContext.Provider value={{ openDonation }}>
      {children}
      <DonationDialog
        initial={session.options}
        key={session.id}
        onClose={closeDonation}
        open={open}
      />
    </DonationContext.Provider>
  )
}
