import { ButtonLink } from './Button'
import { Wrap } from './PageShell'

export function Contribute() {
  return (
    <section className="bg-[var(--color-inverse-bg)] text-[var(--color-inverse-text)] transition-colors" id="contribute">
      <Wrap>
        <div className="grid grid-cols-[1.25fr_0.75fr] gap-[50px] py-[110px] max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:py-[75px]">
          <div>
            <p className="kicker text-[var(--color-accent)]">Open notes, better together</p>
            <h2 className="text-[clamp(43px,5vw,65px)] font-bold leading-[0.9] tracking-normal">
              Have a clearer explanation?
              <br />
              <em className="font-serif font-normal">Help improve it.</em>
            </h2>
          </div>
          <div className="self-end">
            <p className="m-0 mb-[25px] text-sm leading-[1.8] text-[var(--color-inverse-muted)]">
              Every note will live in GitHub so anyone can suggest a correction,
              add an example, or help the next learner understand it faster.
            </p>
            <ButtonLink
              href="mailto:hello@learningatlas.dev?subject=Learning%20Atlas%20contribution"
              variant="light"
            >
              I want to contribute <span className="text-lg leading-none">↗</span>
            </ButtonLink>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
