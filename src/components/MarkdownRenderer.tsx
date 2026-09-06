import { useEffect, useState, type ReactNode } from 'react'
import { createBundledHighlighter } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

type MarkdownRendererProps = {
  context?: string
  markdown: string
}

type MermaidFlowStep = {
  from: string
  label: string | undefined
  to: string
}

type MermaidSequenceStep = {
  from: string
  to: string
  message: string
}

type ConceptSummary = {
  description?: string
  extract?: string
  title: string
  url?: string
}

const conceptSummaryCache = new Map<string, ConceptSummary | null>()

const shikiLanguages = {
  bash: () => import('@shikijs/langs/bash'),
  c: () => import('@shikijs/langs/c'),
  css: () => import('@shikijs/langs/css'),
  dockerfile: () => import('@shikijs/langs/dockerfile'),
  html: () => import('@shikijs/langs/html'),
  java: () => import('@shikijs/langs/java'),
  javascript: () => import('@shikijs/langs/javascript'),
  json: () => import('@shikijs/langs/json'),
  python: () => import('@shikijs/langs/python'),
  sql: () => import('@shikijs/langs/sql'),
  typescript: () => import('@shikijs/langs/typescript'),
  xml: () => import('@shikijs/langs/xml'),
  yaml: () => import('@shikijs/langs/yaml'),
}

const createShikiHighlighter = createBundledHighlighter({
  engine: createJavaScriptRegexEngine,
  langs: shikiLanguages,
  themes: {
    'github-dark': () => import('@shikijs/themes/github-dark'),
  },
})

type HighlightLanguage = keyof typeof shikiLanguages

const shikiHighlighters = new Map<
  HighlightLanguage,
  ReturnType<typeof createShikiHighlighter>
>()

function getShikiHighlighter(language: HighlightLanguage) {
  const existing = shikiHighlighters.get(language)

  if (existing) return existing

  const highlighter = createShikiHighlighter({
    langs: [language],
    themes: ['github-dark'],
  })

  shikiHighlighters.set(language, highlighter)
  return highlighter
}

const languageAliases: Record<string, HighlightLanguage | undefined> = {
  bash: 'bash',
  c: 'c',
  cpp: 'c',
  css: 'css',
  dockerfile: 'dockerfile',
  html: 'html',
  java: 'java',
  javascript: 'javascript',
  js: 'javascript',
  json: 'json',
  python: 'python',
  sh: 'bash',
  shell: 'bash',
  sql: 'sql',
  ts: 'typescript',
  typescript: 'typescript',
  xml: 'xml',
  yaml: 'yaml',
  yml: 'yaml',
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'because', 'but', 'by', 'can',
  'do', 'does', 'each', 'for', 'from', 'has', 'have', 'how', 'if', 'in', 'is',
  'it', 'its', 'just', 'more', 'no', 'not', 'of', 'on', 'only', 'or', 'so',
  'some', 'such', 'than', 'that', 'the', 'their', 'them', 'then', 'there',
  'these', 'they', 'this', 'those', 'to', 'too', 'use', 'uses', 'used', 'using',
  'what', 'when', 'where', 'which', 'who', 'why', 'will', 'with', 'would', 'your',
])

function isConceptCandidate(value: string) {
  const term = value.trim()

  if (term.length < 3 || term.length > 35) return false
  if (
    term.endsWith(':') ||
    term.includes('?') ||
    term.includes('/') ||
    term.includes('=')
  ) {
    return false
  }

  const words = term.split(/\s+/)
  if (words.length > 3) return false

  const firstWord = words[0].toLowerCase()
  const lastWord = words[words.length - 1].toLowerCase()
  if (STOP_WORDS.has(firstWord) || STOP_WORDS.has(lastWord)) return false

  return true
}

function getWikipediaUrl(term: string) {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(
    term.trim().replace(/\s+/g, '_'),
  )}`
}

function isTitleRelevant(resultTitle: string, term: string): boolean {
  const normTitle = resultTitle.toLowerCase()
  const normTerm = term.toLowerCase()

  if (normTitle.includes(normTerm)) return true

  const termWords = normTerm.split(/\s+/).filter((w) => w.length > 2)
  if (termWords.length > 0 && termWords.some((w) => normTitle.includes(w))) {
    return true
  }

  return false
}

async function fetchWikipediaSummary(
  term: string,
  contextTrack?: string,
): Promise<ConceptSummary | null> {
  const normalizedTerm = term.trim()
  const cacheKey = `${normalizedTerm.toLowerCase()}:${(contextTrack || '').toLowerCase()}`

  if (conceptSummaryCache.has(cacheKey)) {
    return conceptSummaryCache.get(cacheKey) ?? null
  }

  async function getSummary(title: string) {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        title.trim().replace(/\s+/g, '_'),
      )}`,
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as {
      type?: string
      content_urls?: { desktop?: { page?: string } }
      description?: string
      extract?: string
      title?: string
    }

    if (!data.extract || !data.title || data.type === 'disambiguation') {
      return null
    }

    return {
      description: data.description,
      extract: data.extract,
      title: data.title,
      url: data.content_urls?.desktop?.page,
    }
  }

  // Search first so the browser console does not fill with speculative
  // page-summary 404s for terms that are not exact Wikipedia page titles.
  const searchQuery = `${normalizedTerm} ${contextTrack || 'computing'}`

  try {
    const searchParams = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      origin: '*',
      srlimit: '5',
      srsearch: searchQuery,
    })

    const searchResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?${searchParams.toString()}`,
    )

    if (searchResponse.ok) {
      const searchData = (await searchResponse.json()) as {
        query?: { search?: Array<{ title?: string }> }
      }

      const searchResults = searchData.query?.search ?? []

      for (const result of searchResults) {
        if (!result.title) continue

        if (!isTitleRelevant(result.title, normalizedTerm)) {
          continue
        }

        try {
          const summary = await getSummary(result.title)
          if (summary && isTitleRelevant(summary.title, normalizedTerm)) {
            conceptSummaryCache.set(cacheKey, summary)
            return summary
          }
        } catch {
          continue
        }
      }
    }
  } catch {
    // Ignore error
  }

  conceptSummaryCache.set(cacheKey, null)
  return null
}

function ConceptTerm({ context, term }: { context?: string; term: string }) {
  const [isPinned, setIsPinned] = useState(false)
  const [summary, setSummary] = useState<ConceptSummary | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'missing'>(
    'idle',
  )

  function loadSummary() {
    if (status === 'loading' || status === 'ready' || status === 'missing') {
      return
    }

    setStatus('loading')

    fetchWikipediaSummary(term, context)
      .then((data) => {
        if (!data) {
          setStatus('missing')
          return
        }

        setSummary(data)
        setStatus('ready')
      })
      .catch(() => {
        setStatus('missing')
      })
  }

  function toggleConcept() {
    loadSummary()
    setIsPinned((currentValue) => !currentValue)
  }

  return (
    <span
      className="markdown-concept-term"
      data-pinned={isPinned}
      onClick={toggleConcept}
      onFocus={loadSummary}
      onMouseEnter={loadSummary}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          toggleConcept()
        }
      }}
    >
      {term}
      <span className="markdown-concept-popover" data-status={status} role="tooltip">
        {status === 'loading' && (
          <span className="markdown-concept-loading">
            <span className="markdown-concept-spinner" /> Loading Wikipedia summary...
          </span>
        )}
        {status === 'missing' && 'No Wikipedia summary found. Click to search.'}
        {status === 'ready' && summary && (
          <>
            <strong>{summary.title}</strong>
            {summary.description && <em>{summary.description}</em>}
            <span>{summary.extract}</span>
            <a
              href={summary.url ?? getWikipediaUrl(term)}
              rel="noreferrer"
              target="_blank"
              onClick={(event) => event.stopPropagation()}
            >
              Open Wikipedia
              <svg fill="none" height="12" viewBox="0 0 12 12" width="12">
                <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </a>
          </>
        )}
        {status === 'idle' && 'Hover to load Wikipedia summary.'}
      </span>
    </span>
  )
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [highlightedHtml, setHighlightedHtml] = useState('')
  const [copyStatus, setCopyStatus] = useState<'Copy' | 'Copied!' | 'Try again'>('Copy')
  const normalizedLanguage = language.toLowerCase().trim()
  const isPlainText =
    !normalizedLanguage ||
    normalizedLanguage === 'text' ||
    normalizedLanguage === 'plain' ||
    normalizedLanguage === 'plain text' ||
    normalizedLanguage === 'plaintext' ||
    normalizedLanguage === 'txt'
  const shikiLanguage = isPlainText
    ? undefined
    : languageAliases[normalizedLanguage]

  useEffect(() => {
    let cancelled = false

    if (!shikiLanguage) {
      return () => {
        cancelled = true
      }
    }

    getShikiHighlighter(shikiLanguage)
      .then((highlighter) =>
        highlighter.codeToHtml(code, {
          lang: shikiLanguage,
          theme: 'github-dark',
        }),
      )
      .then((html) => {
        if (!cancelled) setHighlightedHtml(html)
      })
      .catch(() => {
        if (!cancelled) setHighlightedHtml('')
      })

    return () => {
      cancelled = true
    }
  }, [code, shikiLanguage])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopyStatus('Copied!')
    } catch {
      setCopyStatus('Try again')
    }

    window.setTimeout(() => setCopyStatus('Copy'), 1600)
  }

  const languageLabel = language || 'text'

  if (isPlainText) {
    return (
      <pre className="markdown-plain-text-block">
        <code>{code}</code>
      </pre>
    )
  }

  return (
    <section className="markdown-code-block">
      <header>
        <span>{languageLabel}</span>
        <button aria-label={`Copy ${languageLabel} code`} onClick={handleCopy} type="button">
          {copyStatus}
        </button>
      </header>
      {highlightedHtml ? (
        <div
          className="markdown-code-block__highlight"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre>
          <code data-language={language}>{code}</code>
        </pre>
      )}
    </section>
  )
}

function renderInline(
  text: string,
  context?: string,
  seenConcepts?: Set<string>,
): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|<u>[^<]+<\/u>|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const value = match[0]

    if (value.startsWith('`')) {
      nodes.push(<code key={`${value}-${match.index}`}>{value.slice(1, -1)}</code>)
    } else if (value.startsWith('**')) {
      const strongValue = value.slice(2, -2)
      const conceptKey = strongValue.trim().toLowerCase()
      const isFirstOccurrence =
        Boolean(seenConcepts) && !seenConcepts?.has(conceptKey)

      if (isConceptCandidate(strongValue) && isFirstOccurrence) {
        seenConcepts?.add(conceptKey)
        nodes.push(
          <strong key={`${value}-${match.index}`}>
            <ConceptTerm context={context} term={strongValue} />
          </strong>,
        )
      } else {
        nodes.push(
          <strong key={`${value}-${match.index}`}>
            {renderInline(strongValue, context, seenConcepts)}
          </strong>,
        )
      }
    } else if (value.startsWith('<u>')) {
      nodes.push(
        <u key={`${value}-${match.index}`}>{value.slice(3, -4)}</u>,
      )
    } else {
      const labelEnd = value.indexOf(']')
      const label = value.slice(1, labelEnd)
      const href = value.slice(labelEnd + 2, -1)

      nodes.push(
        <a href={href} key={`${value}-${match.index}`} rel="noreferrer" target="_blank">
          {label}
        </a>,
      )
    }

    lastIndex = match.index + value.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function getPlainHeadingText(value: string) {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/<u>([^<]+)<\/u>/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
}

function slugifyHeading(value: string) {
  return getPlainHeadingText(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function createHeadingId(value: string, seenHeadings: Map<string, number>) {
  const baseSlug = slugifyHeading(value) || 'section'
  const count = seenHeadings.get(baseSlug) ?? 0

  seenHeadings.set(baseSlug, count + 1)

  return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`
}

function getMarkdownImage(line: string) {
  const match = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)

  if (!match) return null

  return {
    alt: match[1],
    src: match[2],
  }
}

const calloutLabels: Record<string, string> = {
  definition: 'Definition',
  example: 'Example',
  mistake: 'Common mistake',
  'common-mistake': 'Common mistake',
  interview: 'Interview answer',
  'interview-answer': 'Interview answer',
  remember: 'Remember',
}

function getCalloutStart(line: string) {
  const match = line.match(/^\[!([a-z-]+)\]\s*(.*)$/i)

  if (!match) return null

  const type = match[1].toLowerCase()

  return {
    type,
    label: calloutLabels[type] ?? type.replace(/-/g, ' '),
    firstLine: match[2].trim(),
  }
}

function isTable(lines: string[], index: number) {
  return (
    lines[index]?.includes('|') &&
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(
      lines[index + 1] ?? '',
    )
  )
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function parseNotionTable(lines: string[], index: number) {
  const tableLines: string[] = []

  while (index < lines.length && !lines[index].startsWith('</table>')) {
    tableLines.push(lines[index])
    index += 1
  }

  if (index < lines.length) {
    tableLines.push(lines[index])
    index += 1
  }

  const tableMarkup = tableLines.join('\n')
  const hasHeader = /<table[^>]*header-row="true"/.test(tableMarkup)
  const rows = [...tableMarkup.matchAll(/<tr>\s*([\s\S]*?)\s*<\/tr>/g)].map(
    (rowMatch) =>
      [...rowMatch[1].matchAll(/<td>\s*([\s\S]*?)\s*<\/td>/g)].map(
        (cellMatch) => cellMatch[1].trim().replace(/\n+/g, ' '),
      ),
  )

  return {
    nextIndex: index,
    rows,
    hasHeader,
  }
}

function getMermaidNodeLabel(node: string, labels: Map<string, string>) {
  const trimmed = node.trim()
  const id = trimmed.match(/^([A-Za-z][\w-]*)/)?.[1]
  const quotedLabel = trimmed.match(/["']([^"']+)["']/)?.[1]
  const plainLabel = trimmed
    .replace(/^[A-Za-z][\w-]*/, '')
    .replace(/^[{[(]+/, '')
    .replace(/[})\]]+$/, '')
    .replace(/^["']|["']$/g, '')
    .trim()

  if (id && quotedLabel) {
    labels.set(id, quotedLabel)
    return quotedLabel
  }

  if (id && plainLabel) {
    labels.set(id, plainLabel)
    return plainLabel
  }

  if (id && labels.has(id)) {
    return labels.get(id) ?? id
  }

  return quotedLabel || plainLabel || id || trimmed
}

function parseMermaidFlowchart(code: string): MermaidFlowStep[] {
  const labels = new Map<string, string>()
  const steps: MermaidFlowStep[] = []

  code
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !/^flowchart|^graph/i.test(line))
    .forEach((line) => {
      const transition = line.match(
        /^(.+?)\s*-->\s*(?:\|([^|]+)\|\s*)?(.+)$/,
      )

      if (!transition) {
        return
      }

      steps.push({
        from: getMermaidNodeLabel(transition[1], labels),
        label: transition[2]?.trim(),
        to: getMermaidNodeLabel(transition[3], labels),
      })
    })

  return steps
}

function parseMermaidSequence(code: string): MermaidSequenceStep[] {
  const participants = new Map<string, string>()

  return code
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !/^sequenceDiagram/i.test(line))
    .map((line) => {
      const participant = line.match(/^participant\s+(\w+)\s+as\s+(.+)$/i)

      if (participant) {
        participants.set(participant[1], participant[2])
        return null
      }

      const message = line.match(/^(\w+)\s*-{1,2}>>\s*(\w+):\s*(.+)$/)

      if (!message) {
        return null
      }

      return {
        from: participants.get(message[1]) ?? message[1],
        to: participants.get(message[2]) ?? message[2],
        message: message[3],
      }
    })
    .filter((step): step is MermaidSequenceStep => step !== null)
}

function MermaidDiagram({ code }: { code: string }) {
  const normalizedCode = code.trim()

  if (/^sequenceDiagram/m.test(normalizedCode)) {
    const steps = parseMermaidSequence(normalizedCode)

    return (
      <div className="markdown-diagram">
        <span className="markdown-diagram__label">Flow</span>
        <ol className="markdown-diagram__sequence">
          {steps.map((step, stepIndex) => (
            <li key={`${step.from}-${step.to}-${stepIndex}`}>
              <span>{step.from}</span>
              <span>→</span>
              <span>{step.to}</span>
              <p>{renderInline(step.message)}</p>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  const steps = parseMermaidFlowchart(normalizedCode)

  return (
    <div className="markdown-diagram">
      <span className="markdown-diagram__label">Flow</span>
      <ol className="markdown-diagram__flow">
        {steps.map((step, stepIndex) => (
          <li key={`${step.from}-${step.to}-${stepIndex}`}>
            <span>{renderInline(step.from)}</span>
            <span className="markdown-diagram__arrow">
              {step.label ? `→ ${step.label} →` : '→'}
            </span>
            <span>{renderInline(step.to)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function isInterviewHeading(content: string) {
  return /\binterview\b/i.test(content)
}

function getInterviewQuestion(line: string) {
  const match = line
    .trim()
    .match(/^(?:>\s+)?\*\*(?:Q:\s*)?(.+\?)\*\*$/i)
  return match?.[1]
}

function getInterviewAnswer(line: string) {
  const answerMatch = line.trim().match(/^\*\*Answer:\*\*\s*(.*)$/i)

  if (answerMatch) {
    return answerMatch[1]
  }

  const shortAnswerMatch = line.trim().match(/^\*\*((?:Yes|No)\.)\*\*$/i)
  return shortAnswerMatch?.[1]
}

function getNextMeaningfulLineIndex(lines: string[], index: number) {
  let nextIndex = index

  while (nextIndex < lines.length && !lines[nextIndex].trim()) {
    nextIndex += 1
  }

  return nextIndex
}

function startsMarkdownBlock(line: string) {
  return /^(```|#{1,4}\s|[-*]\s|\d+\.\s|> |---$|<table|!\[[^\]]*\]\([^)]+\))/.test(line)
}

function isParagraphAnswerStart(lines: string[], index: number) {
  const line = lines[index] ?? ''

  return Boolean(
    line.trim() &&
      !startsMarkdownBlock(line) &&
      !isTable(lines, index) &&
      !getInterviewQuestion(line),
  )
}

function introducesInterviewQuestion(lines: string[], index: number) {
  let nextIndex = getNextMeaningfulLineIndex(lines, index + 1)

  if (getInterviewQuestion(lines[nextIndex] ?? '')) {
    const answerIndex = getNextMeaningfulLineIndex(lines, nextIndex + 1)

    return (
      getInterviewAnswer(lines[answerIndex] ?? '') !== undefined ||
      isParagraphAnswerStart(lines, answerIndex)
    )
  }

  while (
    nextIndex < lines.length &&
    lines[nextIndex].trim() &&
    !startsMarkdownBlock(lines[nextIndex])
  ) {
    nextIndex += 1
  }

  return (
    getInterviewQuestion(lines[nextIndex] ?? '') !== undefined &&
    (
      getInterviewAnswer(
        lines[getNextMeaningfulLineIndex(lines, nextIndex + 1)] ?? '',
      ) !== undefined ||
      isParagraphAnswerStart(
        lines,
        getNextMeaningfulLineIndex(lines, nextIndex + 1),
      )
    )
  )
}

export function MarkdownRenderer({ context, markdown }: MarkdownRendererProps) {
  const seenConcepts = new Set<string>()
  const renderTextInline = (text: string) =>
    renderInline(text, context, seenConcepts)
  const lines = markdown.split('\n')
  const nodes: ReactNode[] = []
  const seenHeadings = new Map<string, number>()
  let blockKey = 0
  let index = 0

  const getBlockKey = () => {
    blockKey += 1
    return `markdown-block-${blockKey}`
  }

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim()
      const codeLines: string[] = []
      index += 1

      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }

      if (language === 'mermaid') {
        nodes.push(<MermaidDiagram code={codeLines.join('\n')} key={getBlockKey()} />)
      } else {
        nodes.push(<CodeBlock code={codeLines.join('\n')} key={getBlockKey()} language={language} />)
      }

      index += 1
      continue
    }

    if (isTable(lines, index)) {
      const headers = parseTableRow(line)
      const rows: string[][] = []
      index += 2

      while (index < lines.length && lines[index].includes('|')) {
        rows.push(parseTableRow(lines[index]))
        index += 1
      }

      nodes.push(
        <div className="markdown-table-wrap" key={getBlockKey()}>
          <table>
            <thead>
              <tr>
                {headers.map((header, headerIndex) => (
                  <th key={`header-${headerIndex}`}>{renderTextInline(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${row.join('-')}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`}>{renderTextInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    if (line.startsWith('<table')) {
      const table = parseNotionTable(lines, index)
      const [headerRow, ...bodyRows] = table.hasHeader ? table.rows : []
      const rows = table.hasHeader ? bodyRows : table.rows

      nodes.push(
        <div className="markdown-table-wrap" key={getBlockKey()}>
          <table>
            {headerRow && (
              <thead>
                <tr>
                  {headerRow.map((header, headerIndex) => (
                    <th key={`${header}-${headerIndex}`}>
                      {renderTextInline(header)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${row.join('-')}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`}>{renderTextInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      index = table.nextIndex
      continue
    }

    if (line === '---') {
      nodes.push(<hr key={getBlockKey()} />)
      index += 1
      continue
    }

    const image = getMarkdownImage(line)

    if (image) {
      nodes.push(
        <figure className="markdown-image" key={getBlockKey()}>
          <img alt={image.alt} loading="lazy" src={image.src} />
          {image.alt && <figcaption>{image.alt}</figcaption>}
        </figure>,
      )
      index += 1
      continue
    }

    const question = getInterviewQuestion(line)

    if (question) {
      const answerIndex = getNextMeaningfulLineIndex(lines, index + 1)
      const answerStart = getInterviewAnswer(lines[answerIndex] ?? '')

      if (answerStart !== undefined) {
        const answerLines = answerStart ? [answerStart] : []
        index = answerIndex + 1

        while (index < lines.length && !lines[index].trim()) {
          index += 1
        }

        while (
          index < lines.length &&
          lines[index].trim() &&
          !startsMarkdownBlock(lines[index]) &&
          !getInterviewQuestion(lines[index])
        ) {
          answerLines.push(lines[index])
          index += 1
        }

        nodes.push(
          <section className="markdown-interview-question" key={getBlockKey()}>
            <span className="markdown-interview-question__label">
              Interview question
            </span>
            <p className="markdown-interview-question__prompt">
              {renderTextInline(question)}
            </p>
            <div className="markdown-interview-question__answer">
              <span>Answer</span>
              <p>{renderTextInline(answerLines.join(' '))}</p>
            </div>
          </section>,
        )
        continue
      }

      if (isParagraphAnswerStart(lines, answerIndex)) {
        const answerLines = [lines[answerIndex]]
        index = answerIndex + 1

        while (
          index < lines.length &&
          lines[index].trim() &&
          !startsMarkdownBlock(lines[index]) &&
          !isTable(lines, index) &&
          !getInterviewQuestion(lines[index])
        ) {
          answerLines.push(lines[index])
          index += 1
        }

        nodes.push(
          <section className="markdown-interview-question" key={getBlockKey()}>
            <span className="markdown-interview-question__label">
              Interview question
            </span>
            <p className="markdown-interview-question__prompt">
              {renderTextInline(question)}
            </p>
            <div className="markdown-interview-question__answer">
              <span>Answer</span>
              <p>{renderTextInline(answerLines.join(' '))}</p>
            </div>
          </section>,
        )
        continue
      }
    }

    if (line.startsWith('> ')) {
      const quoteLines = [line.slice(2)]
      index += 1

      while (index < lines.length && lines[index].startsWith('> ')) {
        quoteLines.push(lines[index].slice(2))
        index += 1
      }

      const callout = getCalloutStart(quoteLines[0])

      if (callout) {
        const bodyLines = [
          ...(callout.firstLine ? [callout.firstLine] : []),
          ...quoteLines.slice(1),
        ]

        nodes.push(
          <aside
            className="markdown-callout"
            data-callout={callout.type}
            key={getBlockKey()}
          >
            <span className="markdown-callout__label">{callout.label}</span>
            {bodyLines.length > 0 && (
              <p>{bodyLines.map(renderTextInline).flat()}</p>
            )}
          </aside>,
        )
        continue
      }

      nodes.push(
        <blockquote key={getBlockKey()}>{quoteLines.map(renderTextInline).flat()}</blockquote>,
      )
      continue
    }

    if (/^#{1,4}\s/.test(line)) {
      const level = line.match(/^#+/)?.[0].length ?? 2
      const content = line.slice(level + 1)
      const Heading = `h${Math.min(level, 4)}` as 'h1' | 'h2' | 'h3' | 'h4'

      if (isInterviewHeading(content) && introducesInterviewQuestion(lines, index)) {
        index += 1
        continue
      }

      const headingId = createHeadingId(content, seenHeadings)

      nodes.push(
        <Heading
          className={isInterviewHeading(content) ? 'markdown-interview-heading' : undefined}
          id={headingId}
          key={getBlockKey()}
        >
          {renderTextInline(content)}
        </Heading>,
      )
      index += 1
      continue
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = []

      while (index < lines.length && /^[-*]\s/.test(lines[index])) {
        items.push(lines[index].slice(2))
        index += 1
      }

      nodes.push(
        <ul key={getBlockKey()}>
          {items.map((item, itemIndex) => (
            <li key={`item-${itemIndex}`}>{renderTextInline(item)}</li>
          ))}
        </ul>,
      )
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []

      while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s/, ''))
        index += 1
      }

      nodes.push(
        <ol key={getBlockKey()}>
          {items.map((item, itemIndex) => (
            <li key={`item-${itemIndex}`}>{renderTextInline(item)}</li>
          ))}
        </ol>,
      )
      continue
    }

    const paragraphLines = [line]
    index += 1

    while (
      index < lines.length &&
      lines[index].trim() &&
      !startsMarkdownBlock(lines[index]) &&
      !isTable(lines, index)
    ) {
      paragraphLines.push(lines[index])
      index += 1
    }

    const paragraphText = paragraphLines.join(' ')
    const nextMeaningfulLine = lines
      .slice(index)
      .find((nextLine) => nextLine.trim())
    const isCodeLeadIn =
      paragraphText.trim().endsWith(':') && nextMeaningfulLine?.startsWith('```')

    nodes.push(
      <p className={isCodeLeadIn ? 'markdown-code-lead-in' : undefined} key={getBlockKey()}>
        {renderTextInline(paragraphText)}
      </p>,
    )
  }

  return <div className="markdown-body">{nodes}</div>
}
