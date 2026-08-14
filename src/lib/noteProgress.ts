const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? 'http://localhost:4000'

type NoteProgressSyncResponse = {
  completedNoteSlugs?: unknown
}

function getCompletedNoteSlugs(data: NoteProgressSyncResponse) {
  return Array.isArray(data.completedNoteSlugs)
    ? data.completedNoteSlugs.filter(
        (noteSlug): noteSlug is string => typeof noteSlug === 'string',
      )
    : []
}

export async function fetchCompletedNoteSlugs() {
  const response = await fetch(`${apiOrigin}/api/notes/progress`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to fetch note progress')
  }

  return getCompletedNoteSlugs((await response.json()) as NoteProgressSyncResponse)
}

export async function syncCompletedNoteSlugs(completedNoteSlugs: Iterable<string>) {
  const response = await fetch(`${apiOrigin}/api/notes/progress/sync`, {
    body: JSON.stringify({
      completedNoteSlugs: [...completedNoteSlugs],
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Unable to sync note progress')
  }

  return getCompletedNoteSlugs((await response.json()) as NoteProgressSyncResponse)
}

export async function markNoteComplete(noteSlug: string) {
  const response = await fetch(
    `${apiOrigin}/api/notes/progress/${encodeURIComponent(noteSlug)}`,
    {
      credentials: 'include',
      method: 'PUT',
    },
  )

  if (!response.ok) {
    throw new Error('Unable to save note progress')
  }
}
