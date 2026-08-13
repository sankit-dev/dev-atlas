import { useState, type CSSProperties, type MouseEvent } from 'react'
import type { Note, Track } from '../data/tracks'
import { flattenNotes } from '../data/tracks'
import { getMarkdownNote } from '../data/markdownNotes'
import { MarkdownRenderer } from './MarkdownRenderer'
import { Wrap } from './PageShell'

type NoteReaderProps = {
  completedNoteSlugs: Set<string>
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
  completedNoteSlugs,
  note,
  nextTrack,
  onNavigateNote,
  track,
}: NoteReaderProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(
    () => new Set(),
  )
  const [collapsedBranches, setCollapsedBranches] = useState<Set<string>>(
    () => new Set(),
  )
  const markdownNote = getMarkdownNote(track.title, note.slug)
  const body = markdownNote?.body
    ? removeDuplicateTitle(markdownNote.body, note.title)
    : undefined
  const flatNotes = flattenNotes(track.topics)
  const currentNoteIndex = flatNotes.findIndex(
    (trackNote) => trackNote.slug === note.slug,
  )
  const previousNote =
    currentNoteIndex > 0 ? flatNotes[currentNoteIndex - 1] : undefined
  const nextNote =
    currentNoteIndex < flatNotes.length - 1
      ? flatNotes[currentNoteIndex + 1]
      : undefined
  const progressPercent = Math.round(
    ((currentNoteIndex + 1) / flatNotes.length) * 100,
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

  const isBranchActive = (branchNote: Note): boolean =>
    branchNote.slug === note.slug ||
    Boolean(branchNote.children?.some((childNote) => isBranchActive(childNote)))

  const toggleBranch = (branchSlug: string, isOpen: boolean) => {
    setExpandedBranches((currentBranches) => {
      const nextBranches = new Set(currentBranches)

      if (isOpen) {
        nextBranches.delete(branchSlug)
      } else {
        nextBranches.add(branchSlug)
      }

      return nextBranches
    })

    setCollapsedBranches((currentBranches) => {
      const nextBranches = new Set(currentBranches)

      if (isOpen) {
        nextBranches.add(branchSlug)
      } else {
        nextBranches.delete(branchSlug)
      }

      return nextBranches
    })
  }

  const renderSidebarNote = (trackNote: Note, depth = 0) => {
    const isActive = trackNote.slug === note.slug
    const isCompleted = completedNoteSlugs.has(trackNote.slug)
    const hasChildren = Boolean(trackNote.children?.length)
    const childNotes = trackNote.children ? flattenNotes(trackNote.children) : []
    const completedChildCount = childNotes.filter((childNote) =>
      completedNoteSlugs.has(childNote.slug),
    ).length
    const childProgressPercent = childNotes.length
      ? Math.round((completedChildCount / childNotes.length) * 100)
      : 0
    const isOpen =
      !collapsedBranches.has(trackNote.slug) &&
      (expandedBranches.has(trackNote.slug) || isBranchActive(trackNote))
    const noteIndex = flatNotes.findIndex(
      (candidate) => candidate.slug === trackNote.slug,
    )

    return (
      <li
        className={depth > 0 ? 'note-sidebar-child-item' : undefined}
        key={trackNote.slug}
      >
        <div
          className="note-sidebar-row"
          style={{ '--note-depth': depth } as CSSProperties}
        >
          <a
            className={`note-sidebar-link grid grid-cols-[24px_1fr] gap-2 border-t border-(--color-soft-line) py-3 text-[12px] leading-[1.35] transition-colors ${
              isActive
                ? 'font-extrabold text-(--color-text)'
                : 'text-(--color-muted) hover:text-(--color-accent-strong)'
            }`}
            data-completed={isCompleted}
            href={`#/notes/${trackNote.slug}`}
            onClick={(event) => handleNoteClick(event, trackNote)}
          >
            <span className="font-mono text-[10px]">
              {isCompleted ? '✓' : String(noteIndex + 1).padStart(2, '0')}
            </span>
            <span className="note-sidebar-link__content">
              <span className="note-sidebar-link__title">
                {trackNote.title}
                {hasChildren && (
                  <span
                    className="note-sidebar-branch-progress"
                    data-complete={completedChildCount === childNotes.length}
                  >
                    {completedChildCount}/{childNotes.length}
                  </span>
                )}
              </span>
              {hasChildren && (
                <span className="note-sidebar-branch-meter" aria-hidden="true">
                  <span style={{ width: `${childProgressPercent}%` }} />
                </span>
              )}
            </span>
          </a>

          {hasChildren && (
            <button
              aria-expanded={isOpen}
              aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${trackNote.title}`}
              className="note-sidebar-branch-toggle"
              type="button"
              onClick={() => toggleBranch(trackNote.slug, isOpen)}
            >
              {isOpen ? '−' : '+'}
            </button>
          )}
        </div>

        {hasChildren && isOpen && (
          <ol className="note-sidebar-children m-0 list-none p-0">
            {trackNote.children?.map((childNote) =>
              renderSidebarNote(childNote, depth + 1),
            )}
          </ol>
        )}
      </li>
    )
  }

  return (
    <main className="note-reader-shell">
      <Wrap>
        <div className="note-reader-grid grid grid-cols-[260px_minmax(0,1fr)] gap-12 max-[980px]:grid-cols-1">
          <aside className="note-reader-sidebar border-r border-(--color-line) pr-6 max-[980px]:border-r-0 max-[980px]:border-b max-[980px]:pr-0 max-[980px]:pb-6">
            <div className="note-reader-sidebar__summary">
              <div className="min-w-0">
                <p className="eyebrow m-0 text-(--color-accent)">
                  {track.title}
                </p>
                <p className="m-0 mt-2 font-mono text-[11px] text-(--color-muted)">
                  {currentNoteIndex + 1} of {flatNotes.length} notes
                </p>
              </div>
              <button
                aria-controls="note-reader-topic-list"
                aria-expanded={isMobileSidebarOpen}
                className="note-reader-sidebar__toggle"
                type="button"
                onClick={() => setIsMobileSidebarOpen((isOpen) => !isOpen)}
              >
                {isMobileSidebarOpen ? 'Hide topics' : 'Show topics'}
              </button>
            </div>

            <div className="mt-4 mb-5 h-2 overflow-hidden rounded-full bg-(--color-soft-line)">
              <div
                className="h-full bg-(--color-accent-strong)"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div
              className={`note-reader-sidebar__body ${
                isMobileSidebarOpen ? 'is-open' : ''
              }`}
              id="note-reader-topic-list"
            >
              <a
                className="mb-5 inline-block text-xs font-extrabold text-(--color-muted) transition-colors hover:text-(--color-accent-strong)"
                href="#library"
              >
                Back to library
              </a>

              <nav aria-label={`${track.title} notes`}>
              <ol className="m-0 list-none p-0">
                {track.topics.map((trackNote) => renderSidebarNote(trackNote))}
              </ol>
              </nav>
            </div>
          </aside>

          <article className="note-reader-content min-w-0">
            <header className="mb-10 max-w-205">
              <p className="kicker">{track.title}</p>
              <h1 className="m-0 text-[clamp(42px,6vw,76px)] font-bold leading-[0.92] tracking-normal">
                {note.title}
              </h1>
              <p className="mt-6 mb-0 text-base leading-[1.8] text-(--color-muted)">
                {note.description}
              </p>
              {note.priority && (
                <span className="mt-5 inline-flex rounded-full border border-(--color-line) px-3 py-2 text-[11px] font-extrabold text-(--color-muted)">
                  {note.priority}
                </span>
              )}
            </header>

            {body ? (
              <MarkdownRenderer
                key={`${track.title}:${note.slug}`}
                markdown={body}
              />
            ) : (
              <div className="max-w-190 border-t border-(--color-line) pt-8">
                <h2 className="m-0 text-[28px] tracking-normal">
                  Note body pending
                </h2>
                <p className="text-sm leading-[1.8] text-(--color-muted)">
                  This note is listed in the study roadmap, but its local Markdown
                  body has not been written yet.
                </p>
              </div>
            )}

            <nav
              aria-label="Previous and next notes"
              className="mt-14 grid grid-cols-2 gap-4 border-t border-(--color-line) pt-6 max-[640px]:grid-cols-1"
            >
              {previousNote ? (
                <a
                  className="rounded-lg border border-(--color-line) p-4 transition-colors hover:border-(--color-accent-strong)"
                  href={`#/notes/${previousNote.slug}`}
                  onClick={(event) => handleNoteClick(event, previousNote)}
                >
                  <span className="eyebrow text-(--color-muted)">
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
                  className="rounded-lg border border-(--color-line) p-4 text-right transition-colors hover:border-(--color-accent-strong) max-[640px]:text-left"
                  href={`#/notes/${nextNote.slug}`}
                  onClick={(event) => handleNoteClick(event, nextNote)}
                >
                  <span className="eyebrow text-(--color-muted)">Next</span>
                  <span className="mt-2 block text-sm font-extrabold">
                    {nextNote.title}
                  </span>
                </a>
              ) : nextCourseNote && nextTrack ? (
                <a
                  className="rounded-lg border border-(--color-line) p-4 text-right transition-colors hover:border-(--color-accent-strong) max-[640px]:text-left"
                  href={`#/notes/${nextCourseNote.slug}`}
                  onClick={(event) =>
                    handleNoteClick(event, nextCourseNote, {
                      animateCourseSwitch: true,
                      transitionTitle: nextTrack.title,
                    })
                  }
                >
                  <span className="eyebrow text-(--color-accent)">
                    Next course
                  </span>
                  <span className="mt-2 block text-sm font-extrabold">
                    {nextTrack.title}
                  </span>
                  <span className="mt-2 block text-xs leading-[1.6] text-(--color-muted)">
                    Start with {nextCourseNote.title}
                  </span>
                </a>
              ) : (
                <div className="rounded-lg border border-(--color-line) p-4 text-right max-[640px]:text-left">
                  <span className="eyebrow text-(--color-muted)">
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
