import type { ReactNode } from 'react'

type MarkdownRendererProps = {
  markdown: string
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const value = match[0]

    if (value.startsWith('`')) {
      nodes.push(<code key={`${value}-${match.index}`}>{value.slice(1, -1)}</code>)
    } else if (value.startsWith('**')) {
      nodes.push(
        <strong key={`${value}-${match.index}`}>{value.slice(2, -2)}</strong>,
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

function isInterviewHeading(content: string) {
  return /\binterview (?:tip|questions?|answers?|points?)\b/i.test(content)
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

function startsMarkdownBlock(line: string) {
  return /^(```|#{1,4}\s|[-*]\s|\d+\.\s|> |---$|<table)/.test(line)
}

function introducesInterviewQuestion(lines: string[], index: number) {
  let nextIndex = index + 1

  while (nextIndex < lines.length && !lines[nextIndex].trim()) {
    nextIndex += 1
  }

  if (getInterviewQuestion(lines[nextIndex] ?? '')) {
    return getInterviewAnswer(lines[nextIndex + 1] ?? '') !== undefined
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
    getInterviewAnswer(lines[nextIndex + 1] ?? '') !== undefined
  )
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const lines = markdown.split('\n')
  const nodes: ReactNode[] = []
  let index = 0

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

      nodes.push(
        <pre key={index}>
          <code data-language={language}>{codeLines.join('\n')}</code>
        </pre>,
      )
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
        <div className="markdown-table-wrap" key={index}>
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{renderInline(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${row.join('-')}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`}>{renderInline(cell)}</td>
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
        <div className="markdown-table-wrap" key={index}>
          <table>
            {headerRow && (
              <thead>
                <tr>
                  {headerRow.map((header, headerIndex) => (
                    <th key={`${header}-${headerIndex}`}>
                      {renderInline(header)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${row.join('-')}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`}>{renderInline(cell)}</td>
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
      nodes.push(<hr key={index} />)
      index += 1
      continue
    }

    const question = getInterviewQuestion(line)

    if (question) {
      const answerStart = getInterviewAnswer(lines[index + 1] ?? '')

      if (answerStart !== undefined) {
        const answerLines = answerStart ? [answerStart] : []
        index += 2

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
          <section className="markdown-interview-question" key={index}>
            <span className="markdown-interview-question__label">
              Interview question
            </span>
            <p className="markdown-interview-question__prompt">
              {renderInline(question)}
            </p>
            <div className="markdown-interview-question__answer">
              <span>Answer</span>
              <p>{renderInline(answerLines.join(' '))}</p>
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

      nodes.push(
        <blockquote key={index}>{quoteLines.map(renderInline).flat()}</blockquote>,
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

      nodes.push(
        <Heading
          className={isInterviewHeading(content) ? 'markdown-interview-heading' : undefined}
          key={index}
        >
          {renderInline(content)}
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
        <ul key={index}>
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
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
        <ol key={index}>
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
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
      <p className={isCodeLeadIn ? 'markdown-code-lead-in' : undefined} key={index}>
        {renderInline(paragraphText)}
      </p>,
    )
  }

  return <div className="markdown-body">{nodes}</div>
}
