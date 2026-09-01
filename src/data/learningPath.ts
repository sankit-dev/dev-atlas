import type { Note, Track } from './tracks'
import { countNotes, flattenNotes, totalNoteCount, tracks } from './tracks'

export type LearningPathStep = {
  completedCount: number
  firstNote?: Note
  noteCount: number
  nextNote?: Note
  status: 'not-started' | 'in-progress' | 'completed' | 'next-recommended'
  track: Track
}

export const corePathTrackTitles = [
  'Operating Systems',
  'Computer Networks',
  'Databases & SQL',
  'JavaScript',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MERN Integration',
  'Docker',
  'AWS Fundamentals',
  'GitHub CI/CD',
  'AI for Backend Developers',
] as const

export function getTrackProgress(
  track: Track,
  completedNoteSlugs: Set<string>,
) {
  const notes = flattenNotes(track.topics)
  const completedCount = notes.filter((note) =>
    completedNoteSlugs.has(note.slug),
  ).length
  const nextNote = notes.find((note) => !completedNoteSlugs.has(note.slug))

  return {
    completedCount,
    firstNote: notes[0],
    nextNote,
    noteCount: notes.length,
  }
}

export function getLearningPathSteps(completedNoteSlugs: Set<string>) {
  const pathTracks = corePathTrackTitles
    .map((title) => tracks.find((track) => track.title === title))
    .filter((track): track is Track => Boolean(track))

  const firstTrackWithRemaining = pathTracks.find((track) => {
    const progress = getTrackProgress(track, completedNoteSlugs)
    return progress.completedCount < progress.noteCount
  })

  return pathTracks.map((track): LearningPathStep => {
    const progress = getTrackProgress(track, completedNoteSlugs)
    const hasStarted = progress.completedCount > 0
    const isCompleted = progress.completedCount === progress.noteCount
    const isNextRecommended = track.title === firstTrackWithRemaining?.title

    return {
      ...progress,
      status: isCompleted
        ? 'completed'
        : isNextRecommended
          ? 'next-recommended'
          : hasStarted
            ? 'in-progress'
            : 'not-started',
      track,
    }
  })
}

export function getCurrentLearningStep(completedNoteSlugs: Set<string>) {
  const pathSteps = getLearningPathSteps(completedNoteSlugs)

  return (
    pathSteps.find((step) => step.status === 'next-recommended') ??
    pathSteps[pathSteps.length - 1]
  )
}

export function getLastCompletedNote(completedNoteSlugs: Set<string>) {
  const allNotes = tracks.flatMap((track) => flattenNotes(track.topics))

  for (let index = allNotes.length - 1; index >= 0; index -= 1) {
    const note = allNotes[index]

    if (completedNoteSlugs.has(note.slug)) {
      return note
    }
  }

  return undefined
}

export function getOverallProgress(completedNoteSlugs: Set<string>) {
  return {
    completedCount: completedNoteSlugs.size,
    totalCount: totalNoteCount,
  }
}

export { countNotes, flattenNotes }
