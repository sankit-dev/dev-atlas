import { useMemo, useState, type CSSProperties } from 'react'
import type { Accent, Track } from '../data/tracks'
import { totalNoteCount, tracks } from '../data/tracks'
import { Wrap } from './PageShell'

const trackAccentColor: Record<Accent, string> = {
  coral: '#ff755f',
  blue: '#85b9ff',
  yellow: '#f5d25d',
  green: '#8dce9d',
  violet: '#baa7ff',
}

function getTrackSearchText(track: Track) {
  return [
    track.title,
    track.description,
    ...track.topics.flatMap((topic) => [
      topic.title,
      topic.description,
      topic.priority ?? '',
    ]),
  ]
    .join(' ')
    .toLowerCase()
}

export function Library() {
  const [query, setQuery] = useState('')
  const [activeTrack, setActiveTrack] = useState('All')
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null)
  const featuredTrack = tracks[0]

  const visibleTracks = useMemo(() => {
    const term = query.trim().toLowerCase()

    return tracks.filter((track) => {
      const matchesFilter = activeTrack === 'All' || track.title === activeTrack
      const matchesSearch = !term || getTrackSearchText(track).includes(term)

      return matchesFilter && matchesSearch
    })
  }, [activeTrack, query])

  return (
    <Wrap>
      <section className="py-[110px] max-[760px]:py-20" id="library">
        <div className="library-panel">
          <div className="library-panel__intro">
            <p className="kicker">The library</p>
            <h2 className="library-panel__title">
              A cleaner path through backend fundamentals.
            </h2>
            <p className="m-0 mt-5 max-w-[650px] text-base leading-[1.75] text-[var(--color-muted)]">
              Search, pick a track, and start reading real Markdown notes in the
              order they are meant to be learned.
            </p>
          </div>
          <div className="library-panel__stats" aria-label="Library summary">
            <div>
              <b>{totalNoteCount}</b>
              <span>notes</span>
            </div>
            <div>
              <b>{tracks.length}</b>
              <span>tracks</span>
            </div>
            <a href={`#/notes/${featuredTrack.topics[0].slug}`}>
              Start with {featuredTrack.shortTitle}
            </a>
          </div>
        </div>

        <div className="library-toolbar">
          <label className="library-search">
            <span aria-hidden="true">/</span>
            <input
              aria-label="Search learning topics"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, for example: joins"
              value={query}
            />
          </label>

          <div aria-label="Filter learning tracks" className="library-filters">
            {['All', ...tracks.map((track) => track.title)].map((item) => {
              const isActive = activeTrack === item
              const track = tracks.find((candidate) => candidate.title === item)

              return (
                <button
                  className={isActive ? 'is-active' : ''}
                  key={item}
                  onClick={() => setActiveTrack(item)}
                  style={
                    track
                      ? ({
                          '--filter-accent': trackAccentColor[track.accent],
                        } as CSSProperties)
                      : undefined
                  }
                  type="button"
                >
                  {item === 'All' ? item : track?.shortTitle}
                </button>
              )
            })}
          </div>
        </div>

        <div className="library-grid">
          {visibleTracks.map((track, trackIndex) => (
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
            />
          ))}
        </div>

        {visibleTracks.length === 0 && (
          <p className="library-empty">No topic found yet. Try SQL, HTTP, or AI.</p>
        )}
      </section>
    </Wrap>
  )
}

type TrackCardProps = {
  index: number
  isExpanded: boolean
  onToggle: () => void
  track: Track
}

function TrackCard({ index, isExpanded, onToggle, track }: TrackCardProps) {
  const topics = isExpanded ? track.topics : track.topics.slice(0, 3)
  const firstTopic = track.topics[0]
  const accent = trackAccentColor[track.accent]

  return (
    <article
      className={`library-card ${isExpanded ? 'is-expanded' : ''}`}
      style={{ '--track-accent': accent } as CSSProperties}
    >
      <div className="library-card__top">
        <span className="library-card__number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="eyebrow">{track.eyebrow}</span>
        <span className="library-card__count">{track.status}</span>
      </div>

      <div className="library-card__body">
        <h3>{track.title}</h3>
        <p>{track.description}</p>
      </div>

      <div className="library-card__actions">
        <a className="library-card__primary" href={`#/notes/${firstTopic.slug}`}>
          Start learning
        </a>
        <button className="library-card__ghost" onClick={onToggle} type="button">
          {isExpanded ? 'Collapse' : `${track.topics.length} topics`}
        </button>
      </div>

      <ol className="library-topic-list">
        {topics.map((topic, topicIndex) => (
          <li key={topic.slug}>
            <span className="library-topic-list__index">
              {String(topicIndex + 1).padStart(2, '0')}
            </span>
            <a href={`#/notes/${topic.slug}`}>
              <strong>{topic.title}</strong>
              <span>{topic.description}</span>
            </a>
            {topic.priority && (
              <span className="library-topic-list__badge">{topic.priority}</span>
            )}
          </li>
        ))}
      </ol>

      <button
        className="library-card__toggle"
        onClick={onToggle}
        type="button"
      >
        {isExpanded ? 'Show less' : `View all ${track.topics.length} topics`}
        <span>{isExpanded ? '↑' : '↓'}</span>
      </button>
    </article>
  )
}
