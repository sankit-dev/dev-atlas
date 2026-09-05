import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Note } from '../data/tracks'
import {
  getHeroMilestoneStates,
  type HeroMilestoneStatus,
  type LearningPathStep,
} from '../data/learningPath'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ButtonLink } from './Button'
import {
  fadeUp,
  motionProps,
  staggerContainer,
} from './motion'
import { Wrap } from './PageShell'

type HeroProps = {
  completedNoteSlugs: Set<string>
  currentStep: LearningPathStep
  lastCompletedNote?: Note
  overallProgress: {
    completedCount: number
    totalCount: number
  }
}

const methodSteps = [
  {
    icon: 'map',
    title: 'Structured Learning',
    description: 'Follow a clear path, step by step.',
  },
  {
    icon: 'chart',
    title: 'Progress Tracking',
    description: "Know what you've done and what's next.",
  },
  {
    icon: 'book',
    title: 'Curated Resources',
    description: 'Notes, examples, and guides.',
  },
  {
    icon: 'compass',
    title: 'No Guesswork',
    description: 'Just focused learning.',
  },
] as const

const statusLabels: Record<HeroMilestoneStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  next: 'Next',
  locked: 'Locked',
}

const featureIcons = {
  map: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M9 18.5 4 21V5.5L9 3m0 15.5 6 2.5m-6-2.5V3m6 18 5-2.5V3l-5 2.5m0 15.5V5.5M15 5.5 9 3" />
    </svg>
  ),
  chart: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 19h16M7 16l3.5-4 3 2.5L18 8m-1 0h1.8v1.8M5 5v14" />
    </svg>
  ),
  book: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 4.5h9.5A2.5 2.5 0 0 1 18 7v13H8a2 2 0 0 1-2-2V4.5Zm0 0v13A2.5 2.5 0 0 1 8.5 15H18M9 8h5m-5 3h4" />
    </svg>
  ),
  compass: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  ),
} satisfies Record<(typeof methodSteps)[number]['icon'], ReactNode>

export function Hero({
  completedNoteSlugs,
  currentStep,
  lastCompletedNote,
  overallProgress,
}: HeroProps) {
  const reducedMotion = useReducedMotion()
  const motionConfig = motionProps(reducedMotion)
  const nextNote =
    currentStep.status === 'completed'
      ? undefined
      : currentStep.nextNote ?? currentStep.firstNote
  const trackProgressPercent = Math.round(
    (currentStep.completedCount / currentStep.noteCount) * 100,
  )
  const milestoneStates = getHeroMilestoneStates(completedNoteSlugs)

  return (
    <Wrap>
      <section className="hero-landing" id="top">
        <motion.div
          className="hero-landing__copy"
          initial={reducedMotion ? false : 'hidden'}
          animate={reducedMotion ? undefined : 'visible'}
          variants={staggerContainer}
        >
          <motion.p className="kicker" variants={fadeUp}>
            A structured backend learning platform
          </motion.p>
          <motion.h1 variants={fadeUp}>
            A clear path to
            <br />
            backend <em className="font-serif font-normal">mastery.</em>
          </motion.h1>
          <motion.p variants={fadeUp}>
            Follow a structured roadmap, track your progress,
            <br />
            and always know what to learn next.
          </motion.p>
          <motion.div className="hero-landing__actions" variants={fadeUp}>
            <ButtonLink
              href={nextNote ? `#/notes/${nextNote.slug}` : '#/library'}
              variant="accent"
            >
              {overallProgress.completedCount > 0 ? 'Continue' : 'Start your journey'}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </ButtonLink>
            <a href="#roadmap">Explore roadmap</a>
          </motion.div>
        </motion.div>

        <motion.aside
          aria-label="Backend development progress"
          className="hero-map-card"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
        >
          <div className="hero-map-card__header">
            <h2>Backend Development</h2>
            <span>
              {overallProgress.completedCount} / {overallProgress.totalCount} completed
            </span>
          </div>

          <ol className="hero-roadmap-preview">
            {milestoneStates.map((item) => (
              <li
                className={`hero-roadmap-preview__item is-${item.status}`}
                key={item.milestone.label}
              >
                <span className="hero-roadmap-preview__number">
                  {item.status === 'locked' ? '▣' : item.index + 1}
                </span>
                <strong>{item.milestone.label}</strong>
                <small>{statusLabels[item.status]}</small>
              </li>
            ))}
          </ol>

          <div className="hero-current-topic">
            <div>
              <span>Current topic</span>
              <strong>{nextNote?.title ?? lastCompletedNote?.title ?? currentStep.track.title}</strong>
            </div>
            <span>
              {currentStep.completedCount} / {currentStep.noteCount}
            </span>
          </div>

          <div className="hero-card-footer">
            <div className="hero-continue__meter" aria-hidden="true">
              <i style={{ width: `${trackProgressPercent}%` }} />
            </div>
            {nextNote && (
              <a className="hero-card-footer__button" href={`#/notes/${nextNote.slug}`}>
                Continue <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </motion.aside>

        <motion.div
          className="landing-method__grid"
          initial={reducedMotion ? false : 'hidden'}
          animate={reducedMotion ? undefined : 'visible'}
          variants={staggerContainer}
          {...motionConfig}
        >
          {methodSteps.map((step) => (
            <motion.article key={step.title} variants={fadeUp}>
              <span aria-hidden="true">{featureIcons[step.icon]}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </Wrap>
  )
}
