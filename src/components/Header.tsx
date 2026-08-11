import { Brand } from './Brand'
import { Wrap } from './PageShell'

const navigationLinks = [
  { label: 'Library', href: '#library' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Contribute', href: '#contribute' },
] as const

type HeaderProps = {
  onThemeToggle: () => void
  theme: 'light' | 'dark'
}

export function Header({ onThemeToggle, theme }: HeaderProps) {
  const isDark = theme === 'dark'

  return (
    <Wrap>
      <nav
        aria-label="Primary navigation"
        className="flex h-[86px] items-center justify-between max-[760px]:h-[70px]"
      >
        <Brand />
        <div className="flex items-center gap-[30px] text-[13px] font-bold text-[var(--color-muted)] max-[760px]:gap-4 max-[760px]:text-[11px]">
          <div className="flex gap-[30px] max-[760px]:gap-4 max-[560px]:hidden">
            {navigationLinks.map((link) => (
              <a
                className="transition-colors hover:text-[var(--color-accent-strong)]"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-pressed={isDark}
            className="relative grid h-9 w-[68px] grid-cols-[28px_28px] place-items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 text-[15px] leading-none text-[var(--color-muted)] transition-colors"
            onClick={onThemeToggle}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            type="button"
          >
            <span
              className={`absolute top-1 left-1 size-7 rounded-full bg-[var(--color-inverse-bg)] transition-transform ${
                isDark ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
            <span className={`relative z-10 grid size-7 place-items-center ${isDark ? '' : 'text-[var(--color-inverse-text)]'}`}>
              ☀
            </span>
            <span className={`relative z-10 grid size-7 place-items-center ${isDark ? 'text-[var(--color-inverse-text)]' : ''}`}>
              ☾
            </span>
          </button>
        </div>
      </nav>
    </Wrap>
  )
}
