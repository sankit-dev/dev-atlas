import type { MouseEvent } from 'react'
import type { Note, Track } from '../data/tracks'
import { markdownNotesBySlug } from '../data/markdownNotes'
import { MarkdownRenderer } from './MarkdownRenderer'
import { Wrap } from './PageShell'

type NoteReaderProps = {
  note: Note
  nextTrack?: Track
  onNavigateNote: (
    note: Note,
    options?: {
      animateCourseSwitch?: boolean
      transitionTitle?: string
    },
  ) => void
  track: Track
}

function normalizeTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function removeDuplicateTitle(markdown: string, title: string) {
  const lines = markdown.split('\n')
  const firstContentIndex = lines.findIndex((line) => line.trim())

  if (firstContentIndex === -1) {
    return markdown
  }

  const firstContentLine = lines[firstContentIndex].trim()

  if (!firstContentLine.startsWith('# ')) {
    return markdown
  }

  const heading = firstContentLine.slice(2).trim()

  if (normalizeTitle(heading) !== normalizeTitle(title)) {
    return markdown
  }

  return lines
    .filter((_, index) => index !== firstContentIndex)
    .join('\n')
    .trim()
}

export function NoteReader({
  note,
  nextTrack,
  onNavigateNote,
  track,
}: NoteReaderProps) {
  const markdownNote = markdownNotesBySlug.get(note.slug)
  const body = markdownNote?.body
    ? removeDuplicateTitle(markdownNote.body, note.title)
    : undefined
  const currentNoteIndex = track.topics.findIndex(
    (trackNote) => trackNote.slug === note.slug,
  )
  const previousNote =
    currentNoteIndex > 0 ? track.topics[currentNoteIndex - 1] : undefined
  const nextNote =
    currentNoteIndex < track.topics.length - 1
      ? track.topics[currentNoteIndex + 1]
      : undefined
  const progressPercent = Math.round(
    ((currentNoteIndex + 1) / track.topics.length) * 100,
  )
  const nextCourseNote = !nextNote ? nextTrack?.topics[0] : undefined

  const handleNoteClick = (
    event: MouseEvent<HTMLAnchorElement>,
    targetNote: Note,
    options?: {
      animateCourseSwitch?: boolean
      transitionTitle?: string
    },
  ) => {
    event.preventDefault()
    onNavigateNote(targetNote, options)
  }

  return (
    <main className="note-reader-shell">
      <Wrap>
        <div className="note-reader-grid grid grid-cols-[260px_minmax(0,1fr)] gap-12 max-[980px]:grid-cols-1">
          <aside className="note-reader-sidebar border-r border-[var(--color-line)] pr-6 max-[980px]:border-r-0 max-[980px]:border-b max-[980px]:pr-0 max-[980px]:pb-6">
            <a
              className="mb-7 inline-block text-xs font-extrabold text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent-strong)]"
              href="#library"
            >
              Back to library
            </a>

            <p className="eyebrow m-0 text-[var(--color-accent)]">
              {track.title}
            </p>
            <div className="mt-4 mb-5 h-2 overflow-hidden rounded-full bg-[var(--color-soft-line)]">
              <div
                className="h-full bg-[var(--color-accent-strong)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="m-0 mb-5 font-mono text-[11px] text-[var(--color-muted)]">
              {currentNoteIndex + 1} of {track.topics.length} notes
            </p>

            <nav aria-label={`${track.title} notes`}>
              <ol className="m-0 list-none p-0">
                {track.topics.map((trackNote, index) => {
                  const isActive = trackNote.slug === note.slug

                  return (
                    <li key={trackNote.slug}>
                      <a
                        className={`grid grid-cols-[24px_1fr] gap-2 border-t border-[var(--color-soft-line)] py-3 text-[12px] leading-[1.35] transition-colors ${
                          isActive
                            ? 'font-extrabold text-[var(--color-text)]'
                            : 'text-[var(--color-muted)] hover:text-[var(--color-accent-strong)]'
                        }`}
                        href={`#/notes/${trackNote.slug}`}
                        onClick={(event) => handleNoteClick(event, trackNote)}
                      >
                        <span className="font-mono text-[10px]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{trackNote.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>
          </aside>

          <article className="note-reader-content min-w-0">
            <header className="mb-10 max-w-[820px]">
              <p className="kicker">{track.title}</p>
              <h1 className="m-0 text-[clamp(42px,6vw,76px)] font-bold leading-[0.92] tracking-normal">
                {note.title}
              </h1>
              <p className="mt-6 mb-0 text-base leading-[1.8] text-[var(--color-muted)]">
                {note.description}
              </p>
              {note.priority && (
                <span className="mt-5 inline-flex rounded-full border border-[var(--color-line)] px-3 py-2 text-[11px] font-extrabold text-[var(--color-muted)]">
                  {note.priority}
                </span>
              )}
            </header>

            {body ? (
              <MarkdownRenderer markdown={body} />
            ) : (
              <div className="max-w-[760px] border-t border-[var(--color-line)] pt-8">
                <h2 className="m-0 text-[28px] tracking-normal">
                  Note body pending
                </h2>
                <p className="text-sm leading-[1.8] text-[var(--color-muted)]">
                  This note is listed in the study roadmap, but its local Markdown
                  body has not been written yet.
                </p>
              </div>
            )}

            <nav
              aria-label="Previous and next notes"
              className="mt-14 grid grid-cols-2 gap-4 border-t border-[var(--color-line)] pt-6 max-[640px]:grid-cols-1"
            >
              {previousNote ? (
                <a
                  className="rounded-lg border border-[var(--color-line)] p-4 transition-colors hover:border-[var(--color-accent-strong)]"
                  href={`#/notes/${previousNote.slug}`}
                  onClick={(event) => handleNoteClick(event, previousNote)}
                >
                  <span className="eyebrow text-[var(--color-muted)]">
                    Previous
                  </span>
                  <span className="mt-2 block text-sm font-extrabold">
                    {previousNote.title}
                  </span>
                </a>
              ) : (
                <span />
              )}

              {nextNote ? (
                <a
                  className="rounded-lg border border-[var(--color-line)] p-4 text-right transition-colors hover:border-[var(--color-accent-strong)] max-[640px]:text-left"
                  href={`#/notes/${nextNote.slug}`}
                  onClick={(event) => handleNoteClick(event, nextNote)}
                >
                  <span className="eyebrow text-[var(--color-muted)]">Next</span>
                  <span className="mt-2 block text-sm font-extrabold">
                    {nextNote.title}
                  </span>
                </a>
              ) : nextCourseNote && nextTrack ? (
                <a
                  className="rounded-lg border border-[var(--color-line)] p-4 text-right transition-colors hover:border-[var(--color-accent-strong)] max-[640px]:text-left"
                  href={`#/notes/${nextCourseNote.slug}`}
                  onClick={(event) =>
                    handleNoteClick(event, nextCourseNote, {
                      animateCourseSwitch: true,
                      transitionTitle: nextTrack.title,
                    })
                  }
                >
                  <span className="eyebrow text-[var(--color-accent)]">
                    Next course
                  </span>
                  <span className="mt-2 block text-sm font-extrabold">
                    {nextTrack.title}
                  </span>
                  <span className="mt-2 block text-xs leading-[1.6] text-[var(--color-muted)]">
                    Start with {nextCourseNote.title}
                  </span>
                </a>
              ) : (
                <div className="rounded-lg border border-[var(--color-line)] p-4 text-right max-[640px]:text-left">
                  <span className="eyebrow text-[var(--color-muted)]">
                    Roadmap complete
                  </span>
                  <span className="mt-2 block text-sm font-extrabold">
                    You reached the final course.
                  </span>
                </div>
              )}
            </nav>
          </article>
        </div>
      </Wrap>
    </main>
  )
}
