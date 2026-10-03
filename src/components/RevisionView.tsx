import { motion } from 'framer-motion'
import type { Note, Track } from '../data/tracks'
import { flattenNotes } from '../data/tracks'
import { fadeUp, staggerContainer } from './motion'

type RevisionViewProps = {
  completedNoteSlugs: Set<string>
  tracks: Track[]
}

type RevisionTrack = {
  done: number
  notes: Note[]
  track: Track
}

// Rows visible before the list scrolls; keep in sync with
// --revision-visible-rows in redesign.css.
const VISIBLE_NOTE_ROWS = 6

const toRevisionTrack = (
  track: Track,
  completedNoteSlugs: Set<string>,
): RevisionTrack => {
  const notes = flattenNotes(track.topics).filter(
    (note) => note.priority === 'Must Know',
  )
  const done = notes.filter((note) => completedNoteSlugs.has(note.slug)).length

  return { done, notes, track }
}

export function RevisionView({ completedNoteSlugs, tracks }: RevisionViewProps) {
  const revisionTracks = tracks.map((track) =>
    toRevisionTrack(track, completedNoteSlugs),
  )

  return (
    <motion.div
      className="revision-grid"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {revisionTracks.map(({ done, notes, track }) => {
        const firstPending = notes.find(
          (note) => !completedNoteSlugs.has(note.slug),
        )
        const percent = Math.round((done / notes.length) * 100)
        const isScrollable = notes.length > VISIBLE_NOTE_ROWS

        return (
          <motion.article
            className="revision-card"
            key={track.title}
            variants={fadeUp}
          >
            <header className="revision-card__head">
              <h3>{track.title}</h3>
              <span>
                {done}/{notes.length}
              </span>
            </header>
            <i className="revision-card__meter" aria-hidden="true">
              <b style={{ width: `${percent}%` }} />
            </i>
            <ul
              aria-label={
                isScrollable ? `${track.title} must-know notes` : undefined
              }
              className="revision-card__list"
              data-scrollable={isScrollable}
              tabIndex={isScrollable ? 0 : undefined}
            >
              {notes.map((note) => {
                const isDone = completedNoteSlugs.has(note.slug)

                return (
                  <li data-done={isDone} key={note.slug}>
                    <span aria-hidden="true">{isDone ? '✓' : ''}</span>
                    <a href={`/notes/${note.slug}`}>{note.title}</a>
                  </li>
                )
              })}
            </ul>
            <a
              className="revision-card__cta"
              href={`/notes/${(firstPending ?? notes[0]).slug}`}
            >
              {firstPending ? 'Start revising' : 'Revise again'}
              <span aria-hidden="true">→</span>
            </a>
          </motion.article>
        )
      })}
    </motion.div>
  )
}
