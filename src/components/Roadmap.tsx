import { countNotes, flattenNotes, tracks } from '../data/tracks'
import { Wrap } from './PageShell'

type RoadmapProps = {
  completedNoteSlugs: Set<string>
}

type RoadmapBranch = {
  description: string
  title: string
  trackTitles: readonly string[]
}

const roadmapBranches: RoadmapBranch[] = [
  {
    description: 'OS, networks, OOP, and databases.',
    title: 'Computer Fundamentals',
    trackTitles: [
      'Operating Systems',
      'Computer Networks',
      'Object-Oriented Programming',
      'Databases & SQL',
    ],
  },
  {
    description: 'JavaScript, React, APIs, MongoDB, and app integration.',
    title: 'MERN / Full Stack',
    trackTitles: [
      'JavaScript',
      'React / Namaste React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MERN Integration',
    ],
  },
  {
    description: 'Git, Docker, cloud basics, and delivery workflows.',
    title: 'DevOps & Tools',
    trackTitles: ['Git & GitHub', 'Docker', 'AWS Fundamentals', 'GitHub CI/CD'],
  },
  {
    description: 'LLM basics, RAG, agents, and backend AI patterns.',
    title: 'AI / ML',
    trackTitles: ['AI for Backend Developers'],
  },
]

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
            Build your base first.
          </h2>
        </div>

        <div className="border-l border-(--color-line)">
          {roadmapBranches.map((branch, index) => {
            const branchTracks = tracks.filter((track) =>
              branch.trackTitles.includes(track.title),
            )
            const notes = branchTracks.flatMap((track) => flattenNotes(track.topics))
            const noteCount = branchTracks.reduce(
              (count, track) => count + countNotes(track.topics),
              0,
            )
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
                key={branch.title}
              >
                <span className="roadmap-step__number absolute top-0 -left-3.25 grid size-6.25 place-items-center rounded-full bg-(--color-inverse-bg) font-mono text-[10px] text-(--color-inverse-text)">
                  {isComplete ? '✓' : index + 1}
                </span>
                <h3 className="mb-1.75 text-[17px] tracking-normal">
                  {branch.title}
                </h3>
                <p className="m-0 text-[13px] leading-[1.6] text-(--color-muted)">
                  {branch.description}
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
