import { totalNoteCount } from '../data/tracks'
import { ButtonLink } from './Button'
import { Wrap } from './PageShell'

const mapItems = [
  ['Computer Networks', '01', 'bg-[#85b9ff]'],
  ['Databases & SQL', '02', 'bg-[#8dce9d]'],
  ['OOP', '03', 'bg-[#f5d25d]'],
  ['AI fundamentals', '04', 'bg-[#baa7ff]'],
  ['DevOps / Tools', '05', 'bg-[#ff755f]'],
] as const

export function Hero() {
  return (
    <Wrap>
      <section
        className="grid min-h-[560px] grid-cols-[1.18fr_0.82fr] items-center gap-20 py-[72px] pb-[90px] max-[760px]:grid-cols-1 max-[760px]:gap-[52px] max-[760px]:py-[65px] max-[760px]:pb-[75px]"
        id="top"
      >
        <div>
          <p className="kicker">A calmer way to learn backend</p>
          <h1 className="text-[clamp(52px,7vw,88px)] font-bold leading-[0.9] tracking-normal max-[760px]:text-[58px]">
            Less hunting.
            <br />
            <em className="font-serif font-normal">More learning.</em>
          </h1>
          <p className="my-[30px] max-w-[490px] text-base leading-[1.8] text-[var(--color-muted)]">
            A structured collection of simple, practical notes for developers,
            built to help you understand the why, not just memorize answers.
          </p>
          <ButtonLink href="#library">
            Explore the library <span className="text-lg leading-none">↓</span>
          </ButtonLink>
        </div>

        <aside
          aria-label="Learning Atlas overview"
          className="rotate-2 rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] px-[30px] pt-7 pb-5 shadow-[12px_12px_0_var(--color-shadow)] transition-colors max-[760px]:mx-auto max-[760px]:max-w-[400px]"
        >
          <p className="card-label mb-[22px] text-[var(--color-muted)]">YOUR LEARNING MAP</p>
          {mapItems.map(([label, number, dotClass]) => (
            <div
              className="flex h-[47px] items-center gap-3 border-t border-[var(--color-soft-line)] text-sm font-bold"
              key={label}
            >
              <span className={`size-[9px] rounded-full ${dotClass}`} />
              <span>{label}</span>
              <b className="ml-auto font-mono text-xs font-normal text-[var(--color-muted)]">
                {number}
              </b>
            </div>
          ))}
          <p className="m-0 border-t border-[var(--color-soft-line)] pt-[15px] font-mono text-[11px] text-[var(--color-muted)]">
            {totalNoteCount} focused notes · markdown powered
          </p>
        </aside>
      </section>
    </Wrap>
  )
}
