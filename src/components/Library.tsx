import { useMemo, useState, type CSSProperties } from 'react'
import type { Accent, Note, Track } from '../data/tracks'
import { getTrackProgress } from '../data/learningPath'
import { flattenNotes, tracks } from '../data/tracks'
import { Wrap } from './PageShell'

const trackAccentColor: Record<Accent, string> = {
  coral: 'var(--track-coral)',
  blue: 'var(--track-blue)',
  yellow: 'var(--track-yellow)',
  green: 'var(--track-green)',
  violet: 'var(--track-violet)',
}

const trackIcons: Partial<Record<string, string>> = {
  'Operating Systems': '>_',
  'Computer Networks': 'NET',
  'Object-Oriented Programming': '</>',
  'Databases & SQL': 'DB',
  JavaScript: 'JS',
  'Node.js': 'N',
  'Express.js': 'EX',
  MongoDB: 'MDB',
  Docker: 'DO',
  'AWS Fundamentals': 'AWS',
  'Git & GitHub': 'Git',
  'GitHub CI/CD': 'CI',
  'AI for Backend Developers': 'AI',
}

type LibraryBranch = {
  description: string
  label: string
  shortLabel: string
  trackTitles: string[]
}

const libraryBranches: LibraryBranch[] = [
  {
    description: 'OS, networks, OOP, and databases before framework-specific work.',
    label: 'Computer Fundamentals',
    shortLabel: 'Fundamentals',
    trackTitles: [
      'Operating Systems',
      'Computer Networks',
      'Object-Oriented Programming',
      'Databases & SQL',
    ],
  },
  {
    description: 'JavaScript, React, APIs, databases, and full-stack projects.',
    label: 'MERN / Full Stack',
    shortLabel: 'MERN',
    trackTitles: [
      'JavaScript',
      'React / Namaste React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MERN Integration',
      'Git & GitHub',
      'Docker',
    ],
  },
  {
    description: 'Source control, containers, cloud, and automated delivery.',
    label: 'DevOps & Tools',
    shortLabel: 'DevOps',
    trackTitles: ['Git & GitHub', 'Docker', 'AWS Fundamentals', 'GitHub CI/CD'],
  },
  {
    description: 'LLM concepts, RAG, agents, and backend AI integration.',
    label: 'AI / ML',
    shortLabel: 'AI/ML',
    trackTitles: ['AI for Backend Developers'],
  },
]

const allBranchLabel = 'All'

function getTrackSearchText(track: Track) {
  return [
    track.title,
    track.description,
    ...flattenNotes(track.topics).flatMap((topic) => [
      topic.title,
      topic.description,
      topic.priority ?? '',
    ]),
  ]
    .join(' ')
    .toLowerCase()
}

type LibraryProps = {
  completedNoteSlugs: Set<string>
}

export function Library({ completedNoteSlugs }: LibraryProps) {
  const [query, setQuery] = useState('')
  const [activeBranch, setActiveBranch] = useState<string>(allBranchLabel)
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null)
  const [isTrackListExpanded, setIsTrackListExpanded] = useState(false)
  const activeBranchConfig = libraryBranches.find(
    (branch) => branch.label === activeBranch,
  )

  const visibleTracks = useMemo(() => {
    const term = query.trim().toLowerCase()
    const scopedTracks = activeBranchConfig
      ? tracks.filter((track) => activeBranchConfig.trackTitles.includes(track.title))
      : tracks

    return scopedTracks.filter((track) => {
      const matchesSearch = !term || getTrackSearchText(track).includes(term)

      return matchesSearch
    })
  }, [activeBranchConfig, query])
  const visibleTrackLimit = 3
  const hasMoreTracks = visibleTracks.length > visibleTrackLimit
  const displayedTracks = isTrackListExpanded
    ? visibleTracks
    : visibleTracks.slice(0, visibleTrackLimit)

  function handleBranchSelect(item: string) {
    setActiveBranch(item)
    setExpandedTrack(null)
    setIsTrackListExpanded(false)
  }

  return (
    <Wrap>
      <section className="py-27.5 max-[760px]:py-20" id="library">
        <div className="library-controls">
          <div className="library-controls__header">
            <h2>Your tracks</h2>

            <label className="library-search">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search learning topics"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tracks or topics..."
                value={query}
              />
            </label>

            <div className="library-branches" aria-label="Learning branches">
              <button
                className={activeBranch === allBranchLabel ? 'is-active' : ''}
                onClick={() => handleBranchSelect(allBranchLabel)}
                type="button"
              >
                All
              </button>

              {libraryBranches.map((branch) => (
                <button
                  className={activeBranch === branch.label ? 'is-active' : ''}
                  key={branch.label}
                  onClick={() => handleBranchSelect(branch.label)}
                  type="button"
                >
                  {branch.shortLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="library-grid">
          {displayedTracks.map((track, trackIndex) => (
            <TrackCard
              index={trackIndex}
              isExpanded={expandedTrack === track.title}
              key={track.title}
              onToggle={() =>
                setExpandedTrack((current) =>
                  current === track.title ? null : track.title,
                )
              }
              track={track}
              completedNoteSlugs={completedNoteSlugs}
            />
          ))}
        </div>

        {hasMoreTracks && (
          <div className="library-show-more">
            <button
              aria-expanded={isTrackListExpanded}
              onClick={() =>
                setIsTrackListExpanded((currentValue) => !currentValue)
              }
              type="button"
          >
              <span>{isTrackListExpanded ? 'Show fewer tracks' : 'Browse all tracks'}</span>
              <b aria-hidden="true">→</b>
            </button>
          </div>
        )}

        {visibleTracks.length === 0 && (
          <p className="library-empty">No topic found yet. Try SQL, HTTP, or AI.</p>
        )}
      </section>
    </Wrap>
  )
}

type TrackCardProps = {
  index: number
  completedNoteSlugs: Set<string>
  isExpanded: boolean
  onToggle: () => void
  track: Track
}

function TrackCard({
  completedNoteSlugs,
  index,
  isExpanded,
  onToggle,
  track,
}: TrackCardProps) {
  const firstTopic = track.topics[0]
  const accent = trackAccentColor[track.accent]
  const flatNotes = flattenNotes(track.topics)
  const { completedCount, nextNote, noteCount } = getTrackProgress(
    track,
    completedNoteSlugs,
  )
  const continueNote = nextNote ?? firstTopic
  const continueHref = continueNote ? `#/notes/${continueNote.slug}` : '#roadmap'
  const progressPercent = Math.round((completedCount / noteCount) * 100)
  const isCompleted = completedCount === noteCount

  const renderTopic = (topic: Note, depth = 0) => {
    const topicIndex = flatNotes.findIndex(
      (candidate) => candidate.slug === topic.slug,
    )
    const isCompleted = completedNoteSlugs.has(topic.slug)
    const isNext = topic.slug === nextNote?.slug

    return (
      <li
        className={depth > 0 ? 'library-topic-list__child' : undefined}
        data-complete={isCompleted}
        data-next={isNext}
        key={topic.slug}
        style={{ '--topic-depth': depth } as CSSProperties}
      >
        <span className="library-topic-list__index">
          {isCompleted ? '✓' : isNext ? '→' : String(topicIndex + 1).padStart(2, '0')}
        </span>
        <a href={`#/notes/${topic.slug}`}>
          <strong>{topic.title}</strong>
          <span>{topic.description}</span>
        </a>
        {topic.priority && (
          <span className="library-topic-list__badge">{topic.priority}</span>
        )}
        {isNext && <span className="library-topic-list__badge">Next</span>}
        {isExpanded && Boolean(topic.children?.length) && (
          <ol className="library-topic-list__children">
            {topic.children?.map((childTopic) => renderTopic(childTopic, depth + 1))}
          </ol>
        )}
      </li>
    )
  }

  return (
    <article
      className={`library-card ${isExpanded ? 'is-expanded' : ''}`}
      style={{ '--track-accent': accent } as CSSProperties}
    >
      <div className="library-card__top">
        <span className="library-card__number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="library-card__icon" aria-hidden="true">
          {trackIcons[track.title] ?? track.shortTitle}
        </span>
      </div>

      <div className="library-card__body">
        <h3>{track.title}</h3>
        <p>{track.description}</p>
      </div>

      <div className="library-card__progress">
        <span>
          {completedCount} / {noteCount} completed
        </span>
        <i aria-hidden="true">
          <b style={{ width: `${progressPercent}%` }} />
        </i>
      </div>

      <div className="library-card__next">
        <span>Next lesson</span>
        <strong>{nextNote?.title ?? 'All lessons completed'}</strong>
        <p>
          {nextNote?.description ?? 'Great job. Review or explore advanced topics.'}
        </p>
      </div>

      <div className="library-card__actions">
        <a className="library-card__primary" href={continueHref}>
          {isCompleted
            ? 'Review'
            : completedCount > 0
              ? 'Continue'
              : 'Start'}
        </a>
        <button className="library-card__ghost" onClick={onToggle} type="button">
          {isExpanded ? 'Hide curriculum' : 'View curriculum'}
        </button>
      </div>

      {isExpanded && (
        <ol className="library-topic-list">
          {track.topics.map((topic) => renderTopic(topic))}
        </ol>
      )}
    </article>
  )
}
