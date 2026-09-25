import { motion } from 'framer-motion'
import type { Note } from '../data/tracks'
import type { LearningPathStep } from '../data/learningPath'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ButtonLink } from './Button'
import { fadeUp, motionProps, staggerContainer } from './motion'
import { Wrap } from './PageShell'

type HeroProps = {
  currentStep: LearningPathStep
  lastCompletedNote?: Note
  hasDonated?: boolean
  overallProgress: {
    completedCount: number
    totalCount: number
  }
}

export function Hero({
  currentStep,
  lastCompletedNote,
  hasDonated = false,
  overallProgress,
}: HeroProps) {
  const reducedMotion = useReducedMotion()
  const motionConfig = motionProps(reducedMotion)
  const nextNote =
    currentStep.status === 'completed'
      ? undefined
      : currentStep.nextNote ?? currentStep.firstNote
  const continueNote = nextNote ?? lastCompletedNote
  const hasProgress = overallProgress.completedCount > 0
  const trackProgressPercent = currentStep.noteCount
    ? Math.round((currentStep.completedCount / currentStep.noteCount) * 100)
    : 0

  return (
    <Wrap>
      <section className="hero" id="top">
        <motion.div
          className="hero__copy"
          initial={reducedMotion ? false : 'hidden'}
          animate={reducedMotion ? undefined : 'visible'}
          variants={staggerContainer}
          {...motionConfig}
        >
          <motion.h1 variants={fadeUp}>
            Backend engineering,
            <br />
            in the right order.
          </motion.h1>
          <motion.p
            className={hasDonated ? 'hero__subtext hero__subtext--thanks' : 'hero__subtext'}
            variants={fadeUp}
          >
            {hasDonated
              ? 'You are helping keep a clear path through backend engineering free for everyone.'
              : 'One ordered path through networks, databases, APIs and deployment, with notes short enough to actually finish.'}
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp}>
            <ButtonLink
              href={continueNote ? `#/notes/${continueNote.slug}` : '#/library'}
              variant="accent"
            >
              {hasProgress ? 'Continue reading' : 'Start the first note'}
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </ButtonLink>
            <a href="#/library">Browse the library</a>
          </motion.div>
        </motion.div>

        <motion.aside
          className="hero__progress"
          aria-label="Your learning path"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
        >
          <div className="hero__progress-head">
            <span>Your path</span>
            <span>
              {overallProgress.completedCount} / {overallProgress.totalCount}{' '}
              understood
            </span>
          </div>
          <p className="hero__progress-track">{currentStep.track.title}</p>
          <p className="hero__progress-note">
            {continueNote
              ? `Up next: ${continueNote.title}`
              : 'Every track understood. Nice work.'}
          </p>
          <div className="hero__meter" aria-hidden="true">
            <i style={{ width: `${trackProgressPercent}%` }} />
          </div>
          {continueNote && (
            <a
              className="hero__progress-link"
              href={`#/notes/${continueNote.slug}`}
            >
              Continue
              <span aria-hidden="true">→</span>
            </a>
          )}
        </motion.aside>
      </section>
    </Wrap>
  )
}
