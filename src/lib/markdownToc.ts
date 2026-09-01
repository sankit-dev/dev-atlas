export type MarkdownTocItem = {
  id: string
  level: number
  title: string
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

function isTable(lines: string[], index: number) {
  return (
    lines[index]?.includes('|') &&
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(
      lines[index + 1] ?? '',
    )
  )
}

function startsMarkdownBlock(line: string) {
  return /^(```|#{1,4}\s|[-*]\s|\d+\.\s|> |---$|<table|!\[[^\]]*\]\([^)]+\))/.test(line)
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

export function getMarkdownToc(markdown: string): MarkdownTocItem[] {
  const lines = markdown.split('\n')
  const seenHeadings = new Map<string, number>()

  return lines.flatMap((line, index) => {
    if (!/^#{1,3}\s/.test(line)) {
      return []
    }

    const level = line.match(/^#+/)?.[0].length ?? 2
    const content = line.slice(level + 1).trim()

    if (isInterviewHeading(content) && introducesInterviewQuestion(lines, index)) {
      return []
    }

    return [
      {
        id: createHeadingId(content, seenHeadings),
        level,
        title: getPlainHeadingText(content),
      },
    ]
  })
}
