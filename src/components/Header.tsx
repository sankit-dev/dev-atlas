import { Brand } from './Brand'

const navigationLinks = [
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Library', href: '#library' },
  { label: 'About', href: '#contribute' },
] as const

type HeaderProps = {
  onThemeToggle: () => void
  theme: 'light' | 'dark'
}

export function Header({ onThemeToggle, theme }: HeaderProps) {
  const isDark = theme === 'dark'

  return (
    <nav
      aria-label="Primary navigation"
      className="site-header-nav"
    >
      <Brand />
      <div className="site-header-actions">
        <div className="site-header-links">
          {navigationLinks.map((link) => (
            <a className="site-nav-link" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="site-header-auth">
          <a className="site-header-start" href="#library">
            Get started
          </a>
        </div>
        <button
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          aria-pressed={isDark}
          className="relative grid h-9 w-17 grid-cols-[28px_28px] place-items-center rounded-full border border-(--color-line) bg-(--color-surface) p-1 text-[15px] leading-none text-(--color-muted) shadow-none transition-[background-color,border-color,transform] duration-300"
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
  )
}
