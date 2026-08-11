import { totalNoteCount } from '../data/tracks'
import { ButtonLink } from './Button'
import { Wrap } from './PageShell'

const mapItems = [
  ['Computer Networks', '01', 'bg-(--track-blue)'],
  ['Databases & SQL', '02', 'bg-(--track-green)'],
  ['OOP', '03', 'bg-(--track-yellow)'],
  ['AI fundamentals', '04', 'bg-(--track-violet)'],
  ['DevOps / Tools', '05', 'bg-(--track-coral)'],
] as const

export function Hero() {
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
            A structured collection of simple, practical notes for developers,
            built to help you understand the why, not just memorize answers.
          </p>
          <ButtonLink href="#library">
            Explore the library <span className="text-lg leading-none">↓</span>
          </ButtonLink>
        </div>

        <aside
          aria-label="Learning Atlas overview"
          className="hero-map-card rotate-2 rounded-5 border border-(--color-line) bg-(--color-surface) px-7.5 pt-7 pb-5 shadow-[12px_12px_0_var(--color-shadow)] transition-colors max-[760px]:mx-auto max-[760px]:max-w-100"
        >
          <p className="card-label mb-5.5 text-(--color-muted)">YOUR LEARNING MAP</p>
          {mapItems.map(([label, number, dotClass]) => (
            <div
              className="hero-map-row flex h-11.75 items-center gap-3 border-t border-(--color-soft-line) text-sm font-bold"
              key={label}
            >
              <span className={`size-2.25 rounded-full ${dotClass}`} />
              <span>{label}</span>
              <b className="ml-auto font-mono text-xs font-normal text-(--color-muted)">
                {number}
              </b>
            </div>
          ))}
          <p className="m-0 border-t border-(--color-soft-line) pt-3.75 font-mono text-[11px] text-(--color-muted)">
            {totalNoteCount} focused notes · markdown powered
          </p>
        </aside>
      </section>
    </Wrap>
  )
}
