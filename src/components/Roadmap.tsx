import { roadmapSteps } from '../data/tracks'
import { Wrap } from './PageShell'

export function Roadmap() {
  return (
    <Wrap>
      <section
        className="grid grid-cols-[0.75fr_1.25fr] gap-[72px] border-t border-[var(--color-line)] py-[100px] pb-[115px] max-[760px]:grid-cols-1 max-[760px]:gap-[42px] max-[760px]:py-[75px]"
        id="roadmap"
      >
        <div>
          <p className="kicker">A simple order</p>
          <h2 className="section-heading">
            Build your <em className="font-serif font-normal">base</em> first.
          </h2>
        </div>

        <div className="border-l border-[var(--color-line)]">
          {roadmapSteps.map((step, index) => (
            <div
              className="relative pb-[30px] pl-[35px] last:pb-0"
              key={step.title}
            >
              <span className="absolute top-0 -left-[13px] grid size-[25px] place-items-center rounded-full bg-[var(--color-inverse-bg)] font-mono text-[10px] text-[var(--color-inverse-text)]">
                {index + 1}
              </span>
              <h3 className="mb-[7px] text-[17px] tracking-normal">
                {step.title}
              </h3>
              <p className="m-0 text-[13px] leading-[1.6] text-[var(--color-muted)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Wrap>
  )
}
