import { Brand } from './Brand'
import { Wrap } from './PageShell'

export function Footer() {
  return (
    <Wrap>
      <footer className="site-footer">
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
