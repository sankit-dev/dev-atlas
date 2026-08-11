import { useMemo, useState } from 'react'
import type { Accent, Track } from '../data/tracks'
import { tracks } from '../data/tracks'
import { Wrap } from './PageShell'

const trackAccentClass: Record<Accent, string> = {
  coral: 'border-t-[#ff755f]',
  blue: 'border-t-[#85b9ff]',
  yellow: 'border-t-[#f5d25d]',
  green: 'border-t-[#8dce9d]',
  violet: 'border-t-[#baa7ff]',
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
  const [expandedTrack, setExpandedTrack] = useState<string | null>(
    'Computer Networks',
  )

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
      <section className="py-[120px] max-[760px]:py-20" id="library">
        <div className="mb-[46px] flex items-end justify-between gap-[35px] max-[760px]:block">
          <div>
            <p className="kicker">The library</p>
            <h2 className="section-heading">
              Find your next <em className="font-serif font-normal">clear step.</em>
            </h2>
          </div>
          <p className="m-0 mb-2 max-w-[275px] text-sm leading-[1.7] text-[var(--color-muted)] max-[760px]:mt-5">
            Short, beginner-friendly notes arranged in the order that makes
            sense.
          </p>
        </div>

        <div className="mb-6 flex justify-between gap-[26px] border-t border-[var(--color-line)] pt-5 max-[760px]:block">
          <label className="flex w-[290px] items-center gap-2.5 text-[var(--color-muted)] max-[760px]:w-full max-[760px]:pb-[18px]">
            <span className="text-2xl">⌕</span>
            <input
              aria-label="Search learning topics"
              className="w-full border-0 bg-transparent text-[13px] text-[var(--color-text)] outline-0 placeholder:text-[var(--color-muted)]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, for example: joins"
              value={query}
            />
          </label>

          <div
            aria-label="Filter learning tracks"
            className="flex flex-wrap justify-end gap-[7px] max-[760px]:justify-start"
          >
            {['All', ...tracks.map((track) => track.title)].map((item) => {
              const isActive = activeTrack === item

              return (
                <button
                  className={`rounded-full border px-3 py-2 text-[11px] font-bold transition-colors ${
                    isActive
                      ? 'border-[var(--color-inverse-bg)] bg-[var(--color-inverse-bg)] text-[var(--color-inverse-text)]'
                      : 'border-[var(--color-line)] bg-transparent text-[var(--color-muted)] hover:border-[var(--color-inverse-bg)] hover:bg-[var(--color-inverse-bg)] hover:text-[var(--color-inverse-text)]'
                  }`}
                  key={item}
                  onClick={() => setActiveTrack(item)}
                  type="button"
                >
                  {item === 'All'
                    ? item
                    : tracks.find((track) => track.title === item)?.shortTitle}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[15px] max-[900px]:grid-cols-1">
          {visibleTracks.map((track) => (
            <TrackCard
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
          <p className="py-[60px] text-center text-[var(--color-muted)]">
            No topic found yet. Try “SQL”, “HTTP”, or “AI”.
          </p>
        )}
      </section>
    </Wrap>
  )
}

type TrackCardProps = {
  isExpanded: boolean
  onToggle: () => void
  track: Track
}

function TrackCard({ isExpanded, onToggle, track }: TrackCardProps) {
  const topics = isExpanded ? track.topics : track.topics.slice(0, 4)

  return (
    <article
      className={`rounded-2xl border border-t-[6px] border-[var(--color-line)] bg-[var(--color-surface)] px-7 pt-[27px] pb-[22px] transition-colors ${trackAccentClass[track.accent]}`}
    >
      <div className="flex justify-between text-[var(--color-muted)]">
        <span className="eyebrow">{track.eyebrow}</span>
        <span className="font-mono text-[11px]">{track.status}</span>
      </div>

      <h3 className="mt-[25px] mb-2.5 text-[26px] leading-[1.08] tracking-normal">
        {track.title}
      </h3>
      <p className="mb-6 min-h-[42px] text-[13px] leading-[1.6] text-[var(--color-muted)]">
        {track.description}
      </p>

      <ol className="m-0 list-none border-t border-[var(--color-soft-line)] p-0">
        {topics.map((topic, topicIndex) => (
          <li
            className="flex gap-3 border-b border-[var(--color-soft-line)] py-2.5 text-[13px]"
            key={topic.slug}
          >
            <span className="w-5 pt-[3px] font-mono text-[10px] text-[var(--color-muted)]">
              {String(topicIndex + 1).padStart(2, '0')}
            </span>
            <a
              className="group min-w-0 flex-1"
              href={`#/notes/${topic.slug}`}
            >
              <span className="block font-bold transition-colors group-hover:text-[var(--color-accent-strong)]">
                {topic.title}
              </span>
              <span className="mt-1 block text-[12px] leading-[1.55] text-[var(--color-muted)]">
                {topic.description}
              </span>
            </a>
            {topic.priority && (
              <span className="self-start rounded-full border border-[var(--color-line)] px-2 py-1 text-[10px] font-extrabold text-[var(--color-muted)]">
                {topic.priority}
              </span>
            )}
          </li>
        ))}
      </ol>

      <button
        className="border-0 bg-transparent pt-4 text-xs font-extrabold text-[var(--color-text)]"
        onClick={onToggle}
        type="button"
      >
        {isExpanded ? 'Show less' : `View all ${track.topics.length} topics`}
        <span className="ml-[7px] text-[var(--color-accent)]">{isExpanded ? '↑' : '↓'}</span>
      </button>
    </article>
  )
}
