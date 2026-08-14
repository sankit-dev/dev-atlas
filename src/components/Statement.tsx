import { Wrap } from './PageShell'

export function Statement() {
  return (
    <Wrap>
      <section className="learning-statement">
        <div className="learning-statement__body">
          <div>
            <p className="learning-statement__eyebrow">Learning method</p>
            <h2>
              Learning resources should feel like a path, not a maze of
              bookmarks.
            </h2>
          </div>

          <ol aria-label="How the library is designed">
            <li>
              <b>01</b>
              <span>Pick</span>
              <p>Choose one focused track.</p>
            </li>
            <li>
              <b>02</b>
              <span>Follow</span>
              <p>Read topics in order.</p>
            </li>
            <li>
              <b>03</b>
              <span>Explain</span>
              <p>Turn notes into answers.</p>
            </li>
          </ol>
        </div>
      </section>
    </Wrap>
  )
}
