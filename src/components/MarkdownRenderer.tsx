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

    if (line === '---') {
      nodes.push(<hr key={index} />)
      index += 1
      continue
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

      nodes.push(<Heading key={index}>{renderInline(content)}</Heading>)
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
      !/^(```|#{1,4}\s|[-*]\s|\d+\.\s|> |---$)/.test(lines[index]) &&
      !isTable(lines, index)
    ) {
      paragraphLines.push(lines[index])
      index += 1
    }

    nodes.push(<p key={index}>{renderInline(paragraphLines.join(' '))}</p>)
  }

  return <div className="markdown-body">{nodes}</div>
}
