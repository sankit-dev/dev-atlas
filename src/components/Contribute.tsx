import { ButtonLink } from './Button'
import { Wrap } from './PageShell'

export function Contribute() {
  return (
    <section className="bg-(--color-inverse-bg) text-(--color-inverse-text) transition-colors" id="contribute">
      <Wrap>
        <div className="grid grid-cols-[1.25fr_0.75fr] gap-12.5 py-27.5 max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:py-18.75">
          <div>
            <p className="kicker text-(--color-accent)">Open notes, better together</p>
            <h2 className="text-[clamp(43px,5vw,65px)] font-bold leading-[0.9] tracking-normal">
              Have a clearer explanation?
              <br />
              <em className="font-serif font-normal">Help improve it.</em>
            </h2>
          </div>
          <div className="self-end">
            <p className="m-0 mb-6.25 text-sm leading-[1.8] text-(--color-inverse-muted)">
              Every note will live in GitHub so anyone can suggest a correction,
              add an example, or help the next learner understand it faster.
            </p>
            <ButtonLink
              href="https://github.com/sankit-dev/dev-atlas"
              rel="noreferrer"
              target="_blank"
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
