import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const siteUrl = (process.env.VITE_SITE_URL || 'https://dev-atlas.vercel.app').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

function collectNoteSlugs(dir) {
  const slugs = [];
  let entries = [];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return slugs;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      slugs.push(...collectNoteSlugs(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      slugs.push(basename(entry.name, '.md'));
    }
  }
  return slugs;
}

function collectDsaIds() {
  const coursePath = join(root, 'src', 'data', 'dsaCourse.ts');
  const sectionIds = new Set(['first-light', 'pattern-trails', 'interview-loop']);
  try {
    const text = readFileSync(coursePath, 'utf8');
    const ids = [...text.matchAll(/^\s*id:\s*'([^']+)'/gm)].map((m) => m[1]);
    return [...new Set(ids)].filter((id) => !sectionIds.has(id)).sort();
  } catch {
    return [];
  }
}

const noteSlugs = [...new Set(collectNoteSlugs(join(root, 'src', 'content', 'notes')))].sort();
const dsaIds = collectDsaIds();

const urls = [];
urls.push({ loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' });
urls.push({ loc: `${siteUrl}/dsa`, changefreq: 'weekly', priority: '0.7' });
for (const id of dsaIds) {
  urls.push({ loc: `${siteUrl}/dsa/${id}`, changefreq: 'monthly', priority: '0.7' });
}
urls.push({ loc: `${siteUrl}/library`, changefreq: 'weekly', priority: '0.7' });
for (const slug of noteSlugs) {
  urls.push({ loc: `${siteUrl}/notes/${slug}`, changefreq: 'monthly', priority: '0.8' });
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`)
    .join('\n') +
  `\n</urlset>\n`;

const outPath = join(root, 'public', 'sitemap.xml');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml);
console.log(`Generated ${outPath} with ${urls.length} URLs (${noteSlugs.length} notes, ${dsaIds.length} dsa quests)`);
