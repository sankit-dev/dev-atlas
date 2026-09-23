import { motion } from 'framer-motion'
import { getLearningPathSteps } from '../data/learningPath'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeUp, motionProps, staggerContainer, viewportOnce } from './motion'
import { Wrap } from './PageShell'

type RoadmapProps = {
  completedNoteSlugs: Set<string>
}

function getStepMarker(status: string, index: number) {
  if (status === 'completed') {
    return '✓'
  }

  if (status === 'next-recommended') {
    return '→'
  }

  return String(index + 1).padStart(2, '0')
}

export function Roadmap({ completedNoteSlugs }: RoadmapProps) {
  const reducedMotion = useReducedMotion()
  const motionConfig = motionProps(reducedMotion)
  const pathSteps = getLearningPathSteps(completedNoteSlugs)

  return (
    <Wrap>
      <section className="roadmap" id="roadmap" aria-labelledby="roadmap-heading">
        <motion.div
          className="roadmap__intro"
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={fadeUp}
          {...motionConfig}
        >
          <h2 id="roadmap-heading">Follow the backend sequence.</h2>
          <p>
            Start with computer fundamentals, then move through networks,
            databases, APIs, deployment, and AI-backed backend work.
          </p>
        </motion.div>

        <motion.ol
          className="roadmap__steps"
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={staggerContainer}
          {...motionConfig}
        >
          {pathSteps.map((step, index) => (
            <motion.li
              className="roadmap-step"
              data-state={step.status}
              key={step.track.title}
              variants={fadeUp}
            >
              <span className="roadmap-step__index" aria-hidden="true">
                {getStepMarker(step.status, index)}
              </span>
              <div>
                <h3>{step.track.title}</h3>
                <p>{step.track.description}</p>
                <div className="roadmap-step__meta">
                  <span>
                    {step.completedCount} of {step.noteCount} understood
                  </span>
                  {step.nextNote && (
                    <a href={`#/notes/${step.nextNote.slug}`}>
                      Next: {step.nextNote.title}
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </section>
    </Wrap>
  )
}
