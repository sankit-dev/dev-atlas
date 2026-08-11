import { Wrap } from './PageShell'

export function Statement() {
  return (
    <Wrap>
      <section className="grid grid-cols-[160px_1fr] border-y border-[var(--color-line)] py-[47px] max-[760px]:grid-cols-[50px_1fr] max-[760px]:py-[33px]">
        <span className="font-mono text-xs text-[var(--color-accent)]">01</span>
        <p className="m-0 max-w-[840px] text-[clamp(23px,3.1vw,40px)] leading-[1.15] tracking-normal">
          Learning resources should feel like a{' '}
          <strong className="font-serif font-normal">path</strong>, not a maze
          of bookmarks.
        </p>
      </section>
    </Wrap>
  )
}
