export type MarkdownNote = {
  body: string
  description: string
  priority?: 'Must Know' | 'Important'
  slug: string
  title: string
  track: string
}

const markdownFiles = import.meta.glob<string>('../content/notes/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(markdown: string) {
  if (!markdown.startsWith('---')) {
    return { body: markdown.trim(), frontmatter: {} as Record<string, string> }
  }

  const endIndex = markdown.indexOf('\n---', 3)

  if (endIndex === -1) {
    return { body: markdown.trim(), frontmatter: {} as Record<string, string> }
  }

  const rawFrontmatter = markdown.slice(3, endIndex).trim()
  const body = markdown.slice(endIndex + 4).trim()
  const frontmatter = Object.fromEntries(
    rawFrontmatter
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(':')
        const key = line.slice(0, separatorIndex).trim()
        const value = line
          .slice(separatorIndex + 1)
          .trim()
          .replace(/^"|"$/g, '')

        return [key, value]
      }),
  )

  return { body, frontmatter }
}

export const markdownNotes = Object.values(markdownFiles).map((markdown) => {
  const { body, frontmatter } = parseFrontmatter(markdown)

  return {
    body,
    description: frontmatter.description ?? '',
    priority:
      frontmatter.priority === 'Must Know' || frontmatter.priority === 'Important'
        ? frontmatter.priority
        : undefined,
    slug: frontmatter.slug ?? '',
    title: frontmatter.title ?? 'Untitled note',
    track: frontmatter.track ?? '',
  }
})

export const markdownNotesBySlug = new Map(
  markdownNotes.map((note) => [note.slug, note]),
)
