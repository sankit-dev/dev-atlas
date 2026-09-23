type SeoInput = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function getSiteOrigin() {
  const envOrigin =
    typeof import.meta !== 'undefined'
      ? (import.meta.env?.VITE_SITE_URL as string | undefined)
      : undefined
  if (envOrigin) return envOrigin.replace(/\/$/, '')
  if (typeof window !== 'undefined' && window.location.origin !== 'null') {
    return window.location.origin
  }
  return ''
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"][data-seo]`,
  )
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute('data-seo', '')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

let jsonLdEl: HTMLScriptElement | null = null

function upsertJsonLd(payload: unknown) {
  if (!jsonLdEl) {
    jsonLdEl = document.head.querySelector<HTMLScriptElement>(
      'script[data-seo-jsonld]',
    )
  }
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script')
    jsonLdEl.type = 'application/ld+json'
    jsonLdEl.setAttribute('data-seo-jsonld', '')
    document.head.appendChild(jsonLdEl)
  }
  jsonLdEl.textContent = JSON.stringify(payload)
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function updateSeo({ title, description, path, type = 'website', jsonLd }: SeoInput) {
  if (typeof document === 'undefined') return
  const origin = getSiteOrigin()
  const canonical = `${origin}${path}` || path
  const fullTitle = title.includes('Dev Atlas') ? title : `${title} | Dev Atlas`

  document.title = fullTitle
  upsertMeta('name', 'description', description)
  upsertMeta('property', 'og:title', fullTitle)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('name', 'twitter:title', fullTitle)
  upsertMeta('name', 'twitter:description', description)
  upsertLink('canonical', canonical)

  if (jsonLd) {
    upsertJsonLd(jsonLd)
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', 'G-PB60C0LPF5', {
      page_path: path,
      page_title: fullTitle,
    })
  }
}

export function articleJsonLd(input: {
  title: string
  description: string
  path: string
  track?: string
}) {
  const origin = getSiteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: `${origin}${input.path}`,
    author: { '@type': 'Organization', name: 'Dev Atlas' },
    about: input.track,
  }
}
