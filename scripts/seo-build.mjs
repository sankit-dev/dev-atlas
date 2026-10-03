// Post-build SEO step. Runs after `vite build` and writes into dist/:
//   - per-route prerendered HTML (head tags, JSON-LD and crawlable content)
//   - sitemap.xml, robots.txt, llms.txt, llms-full.txt
// The SPA still boots normally and replaces the prerendered #root content.
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { marked } from 'marked'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const siteUrl = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://www.devatlas.site'
).replace(/\/$/, '')

const SITE_NAME = 'Dev Atlas'
const SITE_TAGLINE = 'Learn Backend Engineering'
const SITE_DESCRIPTION =
  'Dev Atlas — clear backend engineering notes built for learning by doing: OS, networks, databases, JavaScript, Node, Express, MongoDB, Docker, AWS, Git, AI and DSA practice.'
const OG_IMAGE = `${siteUrl}/a-surreal-vintage-print-illustration-11a1ed.png`

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

// ---------- content discovery ----------

const gitDate = (file) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out || null
  } catch {
    return null
  }
}

const parseFrontmatter = (markdown) => {
  if (!markdown.startsWith('---')) return { body: markdown.trim(), meta: {} }
  const end = markdown.indexOf('\n---', 3)
  if (end === -1) return { body: markdown.trim(), meta: {} }
  const meta = Object.fromEntries(
    markdown
      .slice(3, end)
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const i = line.indexOf(':')
        return [
          line.slice(0, i).trim(),
          line.slice(i + 1).trim().replace(/^"|"$/g, ''),
        ]
      }),
  )
  return { body: markdown.slice(end + 4).trim(), meta }
}

const collectMarkdownFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return collectMarkdownFiles(full)
    return entry.isFile() && entry.name.endsWith('.md') ? [full] : []
  })

const loadNotes = () =>
  collectMarkdownFiles(join(root, 'src', 'content', 'notes'))
    .map((file) => {
      const { body, meta } = parseFrontmatter(readFileSync(file, 'utf8'))
      const slug = basename(file, '.md')
      return {
        slug,
        title: meta.title || slug,
        description: meta.description || '',
        track: meta.track || '',
        priority: meta.priority || '',
        body,
        lastmod: gitDate(file),
      }
    })
    .sort((a, b) => a.slug.localeCompare(b.slug))

const [{ tracks }, { dsaQuests, dsaSections }] = await Promise.all([
  import(pathToFileURL(join(root, 'src', 'data', 'tracks.ts')).href),
  import(pathToFileURL(join(root, 'src', 'data', 'dsaCourse.ts')).href),
])

const notes = loadNotes()
const noteBySlug = new Map(notes.map((n) => [n.slug, n]))
const dsaLastmod = gitDate(join('src', 'data', 'dsaCourse.ts'))
const newestNoteDate =
  notes
    .map((n) => n.lastmod)
    .filter(Boolean)
    .sort()
    .at(-1) ?? null

const flatten = (items) =>
  items.flatMap((item) => [item, ...flatten(item.children ?? [])])

// Tracks in library order, each with only the topics that have a real note.
const trackGroups = tracks
  .map((track) => ({
    track,
    notes: flatten(track.topics)
      .map((topic) => noteBySlug.get(topic.slug))
      .filter(Boolean),
  }))
  .filter((group) => group.notes.length > 0)

const url = (path) => `${siteUrl}${path}`

// ---------- page definitions ----------

const LIBRARY_DESCRIPTION =
  'Browse every Dev Atlas track — OS, networks, databases, JavaScript, Node, Express, MongoDB, Docker, AWS, Git and AI.'
const DSA_DESCRIPTION =
  'Practice data structures and algorithms by pattern — arrays, two pointers, sliding window, trees and graphs.'

const listLinks = (items) =>
  `<ul>${items
    .map(
      (item) =>
        `<li><a href="${item.href}">${escapeHtml(item.title)}</a>${
          item.description ? ` — ${escapeHtml(item.description)}` : ''
        }</li>`,
    )
    .join('')}</ul>`

const noteLinks = (list) =>
  listLinks(
    list.map((n) => ({
      href: `/notes/${n.slug}`,
      title: n.title,
      description: n.description,
    })),
  )

const buildPages = () => {
  const pages = []

  pages.push({
    path: '/',
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    type: 'website',
    lastmod: newestNoteDate,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: url('/'),
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: url('/'),
        logo: url('/favicon.svg'),
      },
    ],
    content: `<h1>${SITE_NAME} — ${SITE_TAGLINE}</h1><p>${escapeHtml(
      SITE_DESCRIPTION,
    )}</p><nav><p><a href="/library">Library</a> · <a href="/dsa">DSA practice</a></p></nav>${trackGroups
      .map(
        ({ track }) =>
          `<h2>${escapeHtml(track.title)}</h2><p>${escapeHtml(track.description)}</p>`,
      )
      .join('')}`,
  })

  pages.push({
    path: '/library',
    title: 'Library',
    description: LIBRARY_DESCRIPTION,
    type: 'website',
    lastmod: newestNoteDate,
    jsonLd: breadcrumbs([['Library', '/library']]),
    content: `<h1>Library</h1><p>${escapeHtml(LIBRARY_DESCRIPTION)}</p>${trackGroups
      .map(
        ({ track, notes: trackNotes }) =>
          `<h2>${escapeHtml(track.title)}</h2><p>${escapeHtml(
            track.description,
          )}</p>${noteLinks(trackNotes)}`,
      )
      .join('')}`,
  })

  pages.push({
    path: '/dsa',
    title: 'DSA Practice',
    description: DSA_DESCRIPTION,
    type: 'website',
    lastmod: dsaLastmod,
    jsonLd: breadcrumbs([['DSA Practice', '/dsa']]),
    content: `<h1>DSA Practice</h1><p>${escapeHtml(DSA_DESCRIPTION)}</p>${dsaSections
      .map(
        (section) =>
          `<h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(
            section.description,
          )}</p>${listLinks(
            dsaQuests
              .filter((q) => q.section === section.id)
              .map((q) => ({
                href: `/dsa/${q.id}`,
                title: q.title,
                description: `${q.pattern} · ${q.difficulty}`,
              })),
          )}`,
      )
      .join('')}`,
  })

  for (const quest of dsaQuests) {
    const description = `${quest.title}: ${quest.whyItMatters}`.slice(0, 300)
    pages.push({
      path: `/dsa/${quest.id}`,
      title: quest.title,
      description,
      type: 'article',
      lastmod: dsaLastmod,
      jsonLd: breadcrumbs([
        ['DSA Practice', '/dsa'],
        [quest.title, `/dsa/${quest.id}`],
      ]),
      content: `<nav><a href="/dsa">← DSA Practice</a></nav><h1>${escapeHtml(
        quest.title,
      )}</h1><p>${escapeHtml(quest.topic)} · ${escapeHtml(
        quest.pattern,
      )} · ${escapeHtml(quest.difficulty)} · about ${
        quest.estimatedMinutes
      } min</p><h2>Why it matters</h2><p>${escapeHtml(
        quest.whyItMatters,
      )}</p><h2>How it connects</h2><p>${escapeHtml(
        quest.connection,
      )}</p><h2>Try first</h2><p>${escapeHtml(
        quest.tryFirst,
      )}</p><h2>Interview cue</h2><p>${escapeHtml(quest.interviewCue)}</p>`,
    })
  }

  for (const note of notes) {
    const path = `/notes/${note.slug}`
    pages.push({
      path,
      title: note.title,
      description: note.description || `${note.title} — ${SITE_NAME} notes.`,
      type: 'article',
      lastmod: note.lastmod,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: note.title,
          description: note.description,
          mainEntityOfPage: url(path),
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME },
          about: note.track || undefined,
          dateModified: note.lastmod || undefined,
        },
        ...breadcrumbs([
          ['Library', '/library'],
          [note.title, path],
        ]),
      ],
      content: `<nav><a href="/library">← Library</a>${
        note.track ? ` · ${escapeHtml(note.track)}` : ''
      }</nav>${marked.parse(note.body, { async: false })}`,
    })
  }

  return pages
}

function breadcrumbs(trail) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [['Home', '/'], ...trail].map(([name, path], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
        item: url(path),
      })),
    },
  ]
}

// ---------- html rendering ----------

const PRERENDER_STYLE =
  '<style data-prerender>#seo-prerender{max-width:46rem;margin:0 auto;padding:2rem 1rem;font:16px/1.6 system-ui,sans-serif;color:#e8ecf7}#seo-prerender a{color:#8fb0ff}#seo-prerender img{max-width:100%;height:auto}#seo-prerender pre{overflow:auto}</style>'

const headTags = (page) => {
  const full = page.title.includes(SITE_NAME)
    ? page.title
    : `${page.title} | ${SITE_NAME}`
  const canonical = url(page.path)
  const tag = (attr, key, value) =>
    `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`
  return [
    `<title>${escapeHtml(full)}</title>`,
    tag('name', 'description', page.description),
    `<link rel="canonical" href="${escapeHtml(canonical)}" data-seo />`,
    tag('property', 'og:title', full),
    tag('property', 'og:description', page.description),
    tag('property', 'og:type', page.type),
    tag('property', 'og:url', canonical),
    tag('name', 'twitter:title', full),
    tag('name', 'twitter:description', page.description),
    `<script type="application/ld+json" data-seo-jsonld>${escapeJson(
      page.jsonLd.length === 1 ? page.jsonLd[0] : page.jsonLd,
    )}</script>`,
    PRERENDER_STYLE,
  ].join('\n    ')
}

// Strip the template's default per-page tags so the prerendered ones win.
const renderPage = (template, page) =>
  template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, '')
    .replace(/<link[^>]*rel="canonical"[^>]*>\s*/, '')
    .replace(/<meta\s+property="og:(title|description|type|url)"[^>]*>\s*/g, '')
    .replace(/<meta\s+name="twitter:(title|description)"[^>]*>\s*/g, '')
    .replace('</head>', `    ${headTags(page)}\n  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root"><main id="seo-prerender">${page.content}</main></div>`,
    )

// ---------- text outputs ----------

const buildSitemap = (pages) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(
      (page) =>
        `  <url><loc>${url(page.path)}</loc>${
          page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''
        }</url>`,
    )
    .join('\n')}\n</urlset>\n`

const buildRobots = () =>
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${url('/sitemap.xml')}\n`

const buildLlms = () => {
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `Notes are plain markdown-style articles grouped into tracks. Every page below is also available as static HTML at the URL shown. A full-text version of all notes is at ${url('/llms-full.txt')}.`,
    '',
    '## Start here',
    '',
    `- [Library](${url('/library')}): ${LIBRARY_DESCRIPTION}`,
    `- [DSA Practice](${url('/dsa')}): ${DSA_DESCRIPTION}`,
  ]
  for (const { track, notes: trackNotes } of trackGroups) {
    lines.push('', `## ${track.title}`, '', track.description, '')
    for (const n of trackNotes) {
      lines.push(
        `- [${n.title}](${url(`/notes/${n.slug}`)})${
          n.description ? `: ${n.description}` : ''
        }`,
      )
    }
  }
  lines.push('', '## DSA quests', '')
  for (const q of dsaQuests) {
    lines.push(`- [${q.title}](${url(`/dsa/${q.id}`)}): ${q.pattern}, ${q.difficulty}`)
  }
  return `${lines.join('\n')}\n`
}

const buildLlmsFull = () =>
  `# ${SITE_NAME} — full notes\n\n> ${SITE_DESCRIPTION}\n\n${trackGroups
    .flatMap(({ track, notes: trackNotes }) =>
      trackNotes.map(
        (n) =>
          `---\n\n# ${n.title}\n\nURL: ${url(`/notes/${n.slug}`)}\nTrack: ${
            track.title
          }\n\n${n.body}\n`,
      ),
    )
    .join('\n')}`

// ---------- run ----------

if (!existsSync(join(dist, 'index.html'))) {
  throw new Error('dist/index.html not found — run `vite build` first.')
}

const template = readFileSync(join(dist, 'index.html'), 'utf8').replaceAll(
  '__SITE_URL__',
  siteUrl,
)
const pages = buildPages()

await Promise.all(
  pages.map(async (page) => {
    const dir = join(dist, page.path)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), renderPage(template, page))
  }),
)

// The site root keeps the SPA shell filename, so overwrite it explicitly.
await writeFile(
  join(dist, 'index.html'),
  renderPage(template, pages.find((p) => p.path === '/')),
)

await Promise.all([
  writeFile(join(dist, 'sitemap.xml'), buildSitemap(pages)),
  writeFile(join(dist, 'robots.txt'), buildRobots()),
  writeFile(join(dist, 'llms.txt'), buildLlms()),
  writeFile(join(dist, 'llms-full.txt'), buildLlmsFull()),
])

const kb = (file) => Math.round(statSync(join(dist, file)).size / 1024)
console.log(
  `SEO build for ${siteUrl}: ${pages.length} pages prerendered (${notes.length} notes, ${dsaQuests.length} dsa quests); ` +
    `sitemap ${kb('sitemap.xml')}KB, llms.txt ${kb('llms.txt')}KB, llms-full.txt ${kb('llms-full.txt')}KB`,
)
