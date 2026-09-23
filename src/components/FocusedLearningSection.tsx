import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ButtonLink } from './Button'
import { fadeUp, motionProps, staggerContainer, viewportOnce } from './motion'
import { Wrap } from './PageShell'

const methodCards = [
  {
    number: '01',
    title: 'Follow the track',
    description: 'Topics are already ordered. No deciding what comes next.',
  },
  {
    number: '02',
    title: 'Learn the concept',
    description: 'Start with concise notes, then go deeper only when needed.',
  },
  {
    number: '03',
    title: 'Review & practice',
    description: 'Come back to weak topics and prepare for interviews quickly.',
  },
] as const

const lessonResources = [
  {
    number: '01',
    label: 'Learn',
    title: 'DevAtlas Notes',
    description: 'Simple explanation of the core concept.',
  },
  {
    number: '02',
    label: 'Deep dive',
    title: '1 selected article',
    description: 'For when you want the deeper technical details.',
  },
  {
    number: '03',
    label: 'Visual',
    title: '1 selected video',
    description: 'Only when a visual explanation adds value.',
  },
  {
    number: '04',
    label: 'Practice',
    title: '5 interview questions',
    description: 'Check whether you can explain the topic yourself.',
  },
] as const

const dsaPatterns = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Trees & Graphs',
] as const

export function FocusedLearningSection() {
  const reducedMotion = useReducedMotion()
  const motionConfig = motionProps(reducedMotion)

  return (
    <Wrap>
      <section className="focused-learning" aria-labelledby="focused-learning-heading">
        <motion.div
          className="focused-learning__intro"
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={fadeUp}
          {...motionConfig}
        >
          <p className="kicker">How it works</p>
          <h2 id="focused-learning-heading">
            One path. Only the resources worth your time.
          </h2>
          <p>
            Follow topics in order. Each lesson gives you one clear explanation,
            one deeper resource and a way to practice.
          </p>
        </motion.div>

        <motion.ol
          aria-label="How focused learning works"
          className="focused-learning__steps"
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={staggerContainer}
          {...motionConfig}
        >
          {methodCards.map((card) => (
            <motion.li key={card.number} variants={fadeUp}>
              <span>{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.li>
          ))}
        </motion.ol>

        <section className="lesson-preview" aria-labelledby="lesson-preview-heading">
          <motion.div
            className="lesson-preview__intro"
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={viewportOnce}
            variants={fadeUp}
            {...motionConfig}
          >
            <div>
              <p className="kicker">Inside a lesson</p>
              <h2 id="lesson-preview-heading">Everything you need. Nothing extra.</h2>
            </div>
            <span>Example lesson</span>
          </motion.div>

          <motion.article
            className="lesson-card"
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={viewportOnce}
            variants={fadeUp}
            {...motionConfig}
          >
            <div className="lesson-card__top">
              <div className="lesson-card__copy">
                <div className="lesson-card__meta">
                  <span className="lesson-card__badge">Computer Networks</span>
                  <span>15 min</span>
                </div>
                <h3>HTTP → HTTPS</h3>
                <p>
                  Understand what TLS adds to HTTP and what actually happens
                  when a browser opens a secure website.
                </p>
              </div>

              <ButtonLink href="/notes/https" variant="accent">
                Start lesson <span className="btn-arrow" aria-hidden="true">→</span>
              </ButtonLink>
            </div>

            <motion.ol
              className="lesson-card__resources"
              aria-label="Lesson resource types"
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={staggerContainer}
              {...motionConfig}
            >
              {lessonResources.map((resource) => (
                <motion.li key={resource.number} variants={fadeUp}>
                  <div className="lesson-resource__label">
                    <span>{resource.number}</span>
                    <strong>{resource.label}</strong>
                  </div>
                  <h4>{resource.title}</h4>
                  <p>{resource.description}</p>
                </motion.li>
              ))}
            </motion.ol>
          </motion.article>
        </section>

        <motion.section
          className="dsa-practice-bridge"
          aria-labelledby="dsa-practice-bridge-heading"
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={fadeUp}
          {...motionConfig}
        >
          <div className="dsa-practice-bridge__copy">
            <p className="kicker">DSA practice</p>
            <h2 id="dsa-practice-bridge-heading">
              Stop solving random problems. Practice by pattern.
            </h2>
            <p>
              After the backend notes, build problem-solving reps with curated
              DSA practice grouped by topic and pattern.
            </p>
            <a className="dsa-practice-bridge__link" href="/dsa">
              Start practicing <span aria-hidden="true">→</span>
            </a>
          </div>

          <motion.div
            className="dsa-practice-bridge__patterns"
            aria-label="DSA practice patterns"
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={viewportOnce}
            variants={staggerContainer}
            {...motionConfig}
          >
            {dsaPatterns.map((pattern) => (
              <motion.a href="/dsa" key={pattern} variants={fadeUp}>
                <span>Pattern</span>
                <strong>{pattern}</strong>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>
      </section>
    </Wrap>
  )
}
