import { countNotes, flattenNotes, tracks } from '../data/tracks'
import { Wrap } from './PageShell'

type RoadmapProps = {
  completedNoteSlugs: Set<string>
}

export function Roadmap({ completedNoteSlugs }: RoadmapProps) {
  return (
    <Wrap>
      <section
        className="grid grid-cols-[0.75fr_1.25fr] gap-18 border-t border-(--color-line) py-25 pb-28.75 max-[760px]:grid-cols-1 max-[760px]:gap-10.5 max-[760px]:py-18.75"
        id="roadmap"
      >
        <div>
          <p className="kicker">A simple order</p>
          <h2 className="section-heading">
            Build your <em className="font-serif font-normal">base</em> first.
          </h2>
        </div>

        <div className="border-l border-(--color-line)">
          {tracks.map((track, index) => {
            const notes = flattenNotes(track.topics)
            const noteCount = countNotes(track.topics)
            const completedCount = notes.filter((topic) =>
              completedNoteSlugs.has(topic.slug),
            ).length
            const isComplete = completedCount === noteCount
            const hasStarted = completedCount > 0

            return (
              <div
                className="roadmap-step relative pb-7.5 pl-8.75 last:pb-0"
                data-complete={isComplete}
                data-started={hasStarted}
                key={track.title}
              >
                <span className="roadmap-step__number absolute top-0 -left-3.25 grid size-6.25 place-items-center rounded-full bg-(--color-inverse-bg) font-mono text-[10px] text-(--color-inverse-text)">
                  {isComplete ? '✓' : index + 1}
                </span>
                <h3 className="mb-1.75 text-[17px] tracking-normal">
                  {track.title}
                </h3>
                <p className="m-0 text-[13px] leading-[1.6] text-(--color-muted)">
                  {track.description}
                </p>
                {hasStarted && (
                  <p className="roadmap-step__progress">
                    {completedCount} of {noteCount} notes complete
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </Wrap>
  )
}
