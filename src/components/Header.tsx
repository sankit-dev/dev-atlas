import { AuthControls } from './AuthControls'
import { Brand } from './Brand'
import { Wrap } from './PageShell'

const navigationLinks = [
  { label: 'Library', href: '#library', variant: 'standard' },
  { label: "Don't click", href: '#/dsa', variant: 'challenge' },
  { label: 'Roadmap', href: '#roadmap', variant: 'standard' },
  { label: 'Contribute', href: '#contribute', variant: 'standard' },
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
        className="flex min-h-21.5 items-center justify-between gap-6 py-5 max-[760px]:min-h-17.5 max-[760px]:py-4"
      >
        <Brand />
        <div className="site-header-actions">
          <div className="site-header-links">
            {navigationLinks.map((link) => (
              <a
                className={
                  link.variant === 'challenge'
                    ? 'site-nav-challenge'
                    : 'site-nav-link'
                }
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="site-header-auth">
            <AuthControls />
          </div>
          <button
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-pressed={isDark}
            className="relative grid h-9 w-17 grid-cols-[28px_28px] place-items-center rounded-full border border-(--color-line) bg-(--color-surface) p-1 text-[15px] leading-none text-(--color-muted) transition-colors"
            onClick={onThemeToggle}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            type="button"
          >
            <span
              className={`absolute top-1 left-1 size-7 rounded-full bg-(--color-inverse-bg) transition-transform ${
                isDark ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
            <span className={`relative z-10 grid size-7 place-items-center ${isDark ? '' : 'text-(--color-inverse-text)'}`}>
              ☀
            </span>
            <span className={`relative z-10 grid size-7 place-items-center ${isDark ? 'text-(--color-inverse-text)' : ''}`}>
              ☾
            </span>
          </button>
        </div>
      </nav>
    </Wrap>
  )
}
