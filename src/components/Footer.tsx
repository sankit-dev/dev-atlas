import { Brand } from './Brand'
import { Wrap } from './PageShell'

export function Footer() {
  return (
    <Wrap>
      <footer className="site-footer">
        <a
          className="site-footer__promo"
          href="https://devatlas.site"
          rel="noreferrer"
          target="_blank"
        >
          <span className="site-footer__promo-text">
            <strong>Building a backend?</strong>
            <span>
              Visit devatlas.site to choose the right tools for your stack.
            </span>
          </span>
          <span aria-hidden="true">devatlas.site ↗</span>
        </a>
        <Brand />
        <div className="site-footer__links">
          <a href="#/library">Library</a>
          <a href="#/dsa">Practice</a>
          <a
            href="https://github.com/sankit-dev/dev-atlas"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </Wrap>
  )
}
