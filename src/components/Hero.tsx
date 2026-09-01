import type { Note } from '../data/tracks'
import type { LearningPathStep } from '../data/learningPath'
import { ButtonLink } from './Button'
import { Wrap } from './PageShell'

type HeroProps = {
  currentStep: LearningPathStep
  lastCompletedNote?: Note
  overallProgress: {
    completedCount: number
    totalCount: number
  }
}

export function Hero({
  currentStep,
  lastCompletedNote,
  overallProgress,
}: HeroProps) {
  const nextNote =
    currentStep.status === 'completed'
      ? undefined
      : currentStep.nextNote ?? currentStep.firstNote
  const trackProgressPercent = Math.round(
    (currentStep.completedCount / currentStep.noteCount) * 100,
  )

  return (
    <Wrap>
      <section
        className="grid min-h-140 grid-cols-[1.18fr_0.82fr] items-center gap-20 py-18 pb-22.5 max-[760px]:grid-cols-1 max-[760px]:gap-13 max-[760px]:py-16.25 max-[760px]:pb-18.75"
        id="top"
      >
        <div>
          <p className="kicker">A calmer way to learn backend</p>
          <h1 className="text-[clamp(52px,7vw,88px)] font-bold leading-[0.9] tracking-normal max-[760px]:text-[58px]">
            Less hunting.
            <br />
            <em className="font-serif font-normal">More learning.</em>
          </h1>
          <p className="my-7.5 max-w-122.5 text-base leading-[1.8] text-(--color-muted)">
            Learn backend in the right order. Follow a structured path, track
            what you understand, and always know what to learn next.
          </p>
          <ButtonLink href={nextNote ? `#/notes/${nextNote.slug}` : '#roadmap'}>
            {overallProgress.completedCount > 0 ? 'Continue learning' : 'Start your path'}
            <span className="text-lg leading-none">→</span>
          </ButtonLink>
        </div>

        <aside
          aria-label="Current learning path"
          className="hero-map-card rotate-2 rounded-5 border border-(--color-line) bg-(--color-surface) px-7.5 pt-7 pb-5 shadow-[12px_12px_0_var(--color-shadow)] transition-colors max-[760px]:mx-auto max-[760px]:max-w-100"
        >
          <p className="card-label mb-5.5 text-(--color-muted)">YOUR PATH</p>
          <div className="hero-continue">
            <p>Continue learning</p>
            <h2>{currentStep.track.title}</h2>
            <span>
              {currentStep.completedCount} / {currentStep.noteCount} completed
            </span>
            <div className="hero-continue__meter" aria-hidden="true">
              <i style={{ width: `${trackProgressPercent}%` }} />
            </div>
          </div>
          {nextNote && (
            <a className="hero-next-card" href={`#/notes/${nextNote.slug}`}>
              <span>Next</span>
              <strong>{nextNote.title}</strong>
              <small>{nextNote.description}</small>
            </a>
          )}
          <p className="m-0 border-t border-(--color-soft-line) pt-3.75 font-mono text-[11px] text-(--color-muted)">
            Last completed: {lastCompletedNote?.title ?? 'Nothing yet'} · Overall:{' '}
            {overallProgress.completedCount} / {overallProgress.totalCount}
          </p>
        </aside>
      </section>
    </Wrap>
  )
}
