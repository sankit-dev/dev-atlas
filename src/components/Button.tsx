import type { PropsWithChildren } from 'react'

type ButtonLinkProps = PropsWithChildren<{
  href: string
  rel?: string
  target?: string
  variant?: 'dark' | 'light'
}>

export function ButtonLink({
  children,
  href,
  rel,
  target,
  variant = 'dark',
}: ButtonLinkProps) {
  return (
    <a
      className={`button-link button-link--${variant} inline-flex items-center gap-8 rounded-full px-5 py-4 text-[13px] font-extrabold transition-colors`}
      href={href}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  )
}
