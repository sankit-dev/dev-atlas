export function Brand() {
  return (
    <a
      aria-label="DevAtlas home"
      className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-(--color-text)"
      href="/"
    >
      <img
        alt=""
        className="size-7 rounded-[9px]"
        height="28"
        src="/favicon.svg"
        width="28"
      />
      <span>
        <span className="text-(--color-accent-text)">Dev</span>
        <span className="text-(--color-text)">Atlas</span>
      </span>
    </a>
  )
}
