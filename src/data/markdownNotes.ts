export type MarkdownNote = {
  body: string
  description: string
  priority?: 'Must Know' | 'Important'
  slug: string
  title: string
  track: string
}

const markdownLoaders = import.meta.glob<string>(
  '../content/notes/**/*.md',
  {
    query: '?raw',
    import: 'default',
  },
)

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

const loaderBySlug = new Map<string, () => Promise<string>>()

for (const [path, loader] of Object.entries(markdownLoaders)) {
  const slug = path.split('/').pop()?.replace(/\.md$/, '') || ''
  if (slug) {
    loaderBySlug.set(slug, loader)
  }
}

const noteCache = new Map<string, MarkdownNote>()

export async function fetchMarkdownNote(
  slug: string,
): Promise<MarkdownNote | null> {
  if (noteCache.has(slug)) {
    return noteCache.get(slug)!
  }

  const loader = loaderBySlug.get(slug)

  if (!loader) {
    return null
  }

  try {
    const markdown = await loader()
    const { body, frontmatter } = parseFrontmatter(markdown)
    const note: MarkdownNote = {
      body,
      description: frontmatter.description ?? '',
      priority:
        frontmatter.priority === 'Must Know' ||
        frontmatter.priority === 'Important'
          ? frontmatter.priority
          : undefined,
      slug: frontmatter.slug ?? slug,
      title: frontmatter.title ?? 'Untitled note',
      track: frontmatter.track ?? '',
    }

    noteCache.set(slug, note)
    return note
  } catch {
    return null
  }
}

