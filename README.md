# Learning Atlas

Learning Atlas is a React/Vite study-note site for backend, computer fundamentals, AI, and DevOps topics.

## Local Development

```bash
npm install
npm run dev
```

Before sending changes:

```bash
npm run lint
npm run build
```

## Notes Content

Notes live as Markdown files in:

```plain text
src/content/notes/<track>/<slug>.md
```

Each note needs frontmatter:

```markdown
---
title: "HTTP"
slug: "http"
description: "Request/response, headers, methods, status codes, cookies, sessions, and keep-alive."
track: "Computer Networks"
priority: "Must Know"
---
```

Required fields:

- `title`
- `slug`
- `description`
- `track`
Optional fields:

- `priority`: use `Must Know` or `Important`

The site uses `src/data/tracks.ts` for the library organization and `src/content/notes/**/*.md` for full note bodies. When adding a new note, add it to the correct track in `tracks.ts` and create the matching Markdown file with the same `slug`.

## Supported Markdown

The local renderer supports:

- headings
- paragraphs
- unordered and ordered lists
- blockquotes
- fenced code blocks
- inline code
- bold text
- links
- horizontal rules
- simple Markdown tables

Keep diagrams as fenced `plain text` blocks unless they are images or interactive assets.
