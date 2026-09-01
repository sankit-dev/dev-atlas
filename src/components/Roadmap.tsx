import { getLearningPathSteps } from '../data/learningPath'
import { Wrap } from './PageShell'

type RoadmapProps = {
  completedNoteSlugs: Set<string>
}

export function Roadmap({ completedNoteSlugs }: RoadmapProps) {
  const pathSteps = getLearningPathSteps(completedNoteSlugs)

  return (
    <Wrap>
      <section
        className="grid grid-cols-[0.75fr_1.25fr] gap-18 border-t border-(--color-line) py-25 pb-28.75 max-[760px]:grid-cols-1 max-[760px]:gap-10.5 max-[760px]:py-18.75"
        id="roadmap"
      >
        <div>
          <p className="kicker">A simple order</p>
          <h2 className="section-heading">
            Follow the backend sequence.
          </h2>
          <p className="roadmap-copy">
            Start with computer fundamentals, then move through networks,
            databases, APIs, deployment, and AI-backed backend work.
          </p>
        </div>

        <div className="border-l border-(--color-line)">
          {pathSteps.map((step, index) => {
            return (
              <div
                className="roadmap-step relative pb-7.5 pl-8.75 last:pb-0"
                data-state={step.status}
                key={step.track.title}
              >
                <span className="roadmap-step__number absolute top-0 -left-3.25 grid size-6.25 place-items-center rounded-full bg-(--color-inverse-bg) font-mono text-[10px] text-(--color-inverse-text)">
                  {step.status === 'completed'
                    ? '✓'
                    : step.status === 'next-recommended'
                      ? '→'
                      : index + 1}
                </span>
                <h3 className="mb-1.75 text-[17px] tracking-normal">
                  {step.track.title}
                </h3>
                <p className="m-0 text-[13px] leading-[1.6] text-(--color-muted)">
                  {step.track.description}
                </p>
                <div className="roadmap-step__meta">
                  <span>{step.completedCount} of {step.noteCount} complete</span>
                  {step.nextNote && <a href={`#/notes/${step.nextNote.slug}`}>Next: {step.nextNote.title}</a>}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </Wrap>
  )
}
