import type { PropsWithChildren } from 'react'

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-svh bg-(--color-page) text-(--color-text) transition-colors duration-300">
      {children}
    </div>
  )
}

export function Wrap({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-[min(1160px,calc(100%-48px))] max-[760px]:w-[min(calc(100%-32px),1160px)]">
      {children}
    </div>
  )
}
