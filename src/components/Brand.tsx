export function Brand() {
  return (
    <a
      aria-label="DevAtlas home"
      className="flex items-center gap-2 text-sm font-extrabold tracking-normal text-(--color-text)"
      href="#top"
    >
      <img
        alt=""
        className="size-7 rounded-[9px]"
        height="28"
        src="/favicon.svg"
        width="28"
      />
      <span>
        <span className="text-(--color-accent-strong)">Dev</span>
        <span className="text-(--color-text)">Atlas</span>
      </span>
    </a>
  )
}
