const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? 'http://localhost:4000'

export type DsaProgressOutcome = 'solved' | 'guided' | 'review'

export type DsaProgressRecord = {
  questId: string
  outcome: DsaProgressOutcome
  reviewStep: number
  reviewDueAt: string | null
  updatedAt: string
}

type DsaProgressResponse = {
  progress?: unknown
}

function parseProgressRecords(data: DsaProgressResponse): DsaProgressRecord[] {
  if (!Array.isArray(data.progress)) {
    return []
  }

  return data.progress.filter(
    (item): item is DsaProgressRecord =>
      item !== null &&
      typeof item === 'object' &&
      typeof (item as Record<string, unknown>).questId === 'string' &&
      typeof (item as Record<string, unknown>).outcome === 'string' &&
      typeof (item as Record<string, unknown>).reviewStep === 'number',
  )
}

export async function fetchDsaProgress(): Promise<DsaProgressRecord[]> {
  const response = await fetch(`${apiOrigin}/api/dsa/progress`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to fetch DSA progress')
  }

  return parseProgressRecords((await response.json()) as DsaProgressResponse)
}

export async function syncDsaProgress(
  progressMap: Record<
    string,
    { outcome: DsaProgressOutcome; reviewStep: number; reviewDueAt?: string }
  >,
): Promise<DsaProgressRecord[]> {
  const progress = Object.entries(progressMap).map(([questId, data]) => ({
    questId,
    ...data,
  }))

  const response = await fetch(`${apiOrigin}/api/dsa/progress/sync`, {
    body: JSON.stringify({ progress }),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Unable to sync DSA progress')
  }

  return parseProgressRecords((await response.json()) as DsaProgressResponse)
}

export async function markDsaQuestOutcome(
  questId: string,
  outcome: DsaProgressOutcome,
): Promise<DsaProgressRecord> {
  const response = await fetch(
    `${apiOrigin}/api/dsa/progress/${encodeURIComponent(questId)}`,
    {
      body: JSON.stringify({ outcome }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    },
  )

  if (!response.ok) {
    throw new Error('Unable to save DSA quest outcome')
  }

  return (await response.json()) as DsaProgressRecord
}

export async function markDsaReviewComplete(
  questId: string,
): Promise<DsaProgressRecord> {
  const response = await fetch(
    `${apiOrigin}/api/dsa/progress/${encodeURIComponent(questId)}/review`,
    {
      credentials: 'include',
      method: 'PUT',
    },
  )

  if (!response.ok) {
    throw new Error('Unable to advance DSA review step')
  }

  return (await response.json()) as DsaProgressRecord
}
