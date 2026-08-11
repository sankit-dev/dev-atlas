import { Wrap } from './PageShell'

export function Statement() {
  return (
    <Wrap>
      <section className="grid grid-cols-[160px_1fr] border-y border-(--color-line) py-11.75 max-[760px]:grid-cols-[50px_1fr] max-[760px]:py-8.25">
        <span className="font-mono text-xs text-(--color-accent)">01</span>
        <p className="m-0 max-w-210 text-[clamp(23px,3.1vw,40px)] leading-[1.15] tracking-normal">
          Learning resources should feel like a{' '}
          <strong className="font-serif font-normal">path</strong>, not a maze
          of bookmarks.
        </p>
      </section>
    </Wrap>
  )
}
