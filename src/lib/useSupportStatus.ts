import { useEffect, useState } from 'react'
import { authClient } from './auth'
import { fetchDonationStatus } from './donations'

type SupportStatus = {
  hasDonated: boolean
}

const noSupport: SupportStatus = { hasDonated: false }

// Support status is owned by the backend, not the browser. When the user has
// just returned from a successful checkout the result may lag the redirect
// while the backend reconciles with Dodo, so retry a few times.
export function useSupportStatus(returnedFromSuccess = false) {
  const { data: session, isPending: isSessionPending } = authClient.useSession()
  const [status, setStatus] = useState<
    (SupportStatus & { userId: string }) | null
  >(null)

  const userId = session?.user?.id ?? null

  useEffect(() => {
    if (isSessionPending || !userId) {
      return
    }

    let cancelled = false
    let retryTimer: number | undefined

    const load = async (attempt: number) => {
      try {
        const result = await fetchDonationStatus()

        if (cancelled) {
          return
        }

        setStatus({
          hasDonated: result?.hasDonated ?? false,
          userId,
        })

        if (
          result !== null &&
          !result.hasDonated &&
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

  const current = status?.userId === userId ? status : noSupport

  return { isSupporter: current.hasDonated }
}
