import { Wrap } from './PageShell'

export function Statement() {
  return (
    <Wrap>
      <section className="learning-statement">
        <div className="learning-statement__label">
          <span>01</span>
          <span>Learning method</span>
        </div>

        <div className="learning-statement__body">
          <p>
            Learning resources should feel like a path, not a maze of bookmarks.
          </p>

          <ol aria-label="How the library is designed">
            <li>
              <span>Pick</span>
              Choose one track.
            </li>
            <li>
              <span>Follow</span>
              Read topics in order.
            </li>
            <li>
              <span>Explain</span>
              Turn notes into answers.
            </li>
          </ol>
        </div>
      </section>
    </Wrap>
  )
}
