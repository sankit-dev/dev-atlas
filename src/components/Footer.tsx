import { Brand } from './Brand'
import { Wrap } from './PageShell'

export function Footer() {
  return (
    <Wrap>
      <footer className="flex min-h-[110px] items-center justify-between text-xs text-[var(--color-muted)] max-[760px]:grid max-[760px]:min-h-[140px] max-[760px]:content-center max-[760px]:gap-4">
        <Brand />
        <p className="m-0">Made for learners who like things explained clearly.</p>
        <a className="transition-colors hover:text-[var(--color-accent-strong)]" href="#top">
          Back to top ↑
        </a>
      </footer>
    </Wrap>
  )
}
