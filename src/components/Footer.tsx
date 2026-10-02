import { siteName } from '../lib/site'
import { Brand } from './Brand'
import { Wrap } from './PageShell'

const footerColumns = [
  {
    title: 'Learn',
    links: [
      { label: 'Library', href: '#/library' },
      { label: 'Practice', href: '#/dsa' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'X @sankitdev', href: 'https://x.com/sankitdev', external: true },
      { label: 'Email', href: 'mailto:sankitdev.official@gmail.com' },
      {
        label: 'GitHub',
        href: 'https://github.com/sankit-dev/dev-atlas',
        external: true,
      },
    ],
  },
] as const

export function Footer() {
  return (
    <Wrap>
      <footer className="site-footer">
        <div className="site-footer__main">
          <div className="site-footer__about">
            <Brand />
            <p>
              Short notes on backend engineering, in order. Free and written in
              the open.
            </p>
          </div>

          <nav aria-label="Footer" className="site-footer__cols">
            {footerColumns.map((column) => (
              <div className="site-footer__col" key={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...('external' in link
                          ? { rel: 'noreferrer', target: '_blank' }
                          : {})}
                      >
                        {link.label}
                        {'external' in link && <span aria-hidden="true"> ↗</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <a
          className="site-footer__feature"
          href="https://devatlas.site"
          rel="noreferrer"
          target="_blank"
        >
          <span className="site-footer__badge">New</span>
          <span className="site-footer__feature-name">DevAtlas</span>
          <span className="site-footer__feature-text">
            Pick the right backend tools for your stack
          </span>
          <span aria-hidden="true" className="site-footer__feature-arrow">
            ↗
          </span>
        </a>

        <div className="site-footer__base">
          <span>© {new Date().getFullYear()} {siteName}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </Wrap>
  )
}
