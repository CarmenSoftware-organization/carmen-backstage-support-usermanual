// Verifies that every internal link in the built site points to a page that exists and,
// when it has a #fragment, to an id on that page. Run after `docs:build`.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, posix, relative, sep } from 'node:path'
import { SITE } from './lib.ts'

const DIST = join(SITE, '.vitepress', 'dist')
if (!existsSync(DIST)) {
  console.error(`check-anchors: ${relative(process.cwd(), DIST)} not found — run \`bun run docs:build\` first`)
  process.exit(1)
}

const decodeEntities = (s: string): string =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

const decode = (s: string): string => {
  const t = decodeEntities(s)
  try {
    return decodeURIComponent(t)
  } catch {
    return t
  }
}

/** Page key: '/a/b' for a/b.html, '/a/' for a/index.html. */
const keyOf = (file: string): string => {
  let k = '/' + relative(DIST, file).split(sep).join('/').replace(/\.html$/, '')
  if (k === '/index' || k.endsWith('/index')) k = k.slice(0, -'index'.length)
  return k
}

const ids = new Map<string, Set<string>>()
const pages = new Map<string, string>()
const walk = (dir: string): void => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else if (name.endsWith('.html')) {
      const html = readFileSync(full, 'utf8')
      const k = keyOf(full)
      pages.set(k, html)
      ids.set(k, new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => decode(m[1]))))
    }
  }
}
walk(DIST)

const lookup = (k: string): Set<string> | undefined =>
  ids.get(k) ?? ids.get(k.replace(/\/$/, '')) ?? ids.get(k + '/') ?? ids.get(k.replace(/\/$/, '') + '/')

const violations: string[] = []
let checked = 0
for (const [page, html] of pages) {
  const body = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html
  for (const m of body.matchAll(/<a\b[^>]*?\bhref="([^"]+)"/g)) {
    const href = m[1]
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) continue // http:, mailto:, etc.
    const hash = href.indexOf('#')
    const path = hash < 0 ? href : href.slice(0, hash)
    const frag = hash < 0 ? '' : decode(href.slice(hash + 1))
    let target: string
    if (path === '') target = page
    else {
      target = decode(path.split('?')[0])
      if (!target.startsWith('/')) target = posix.normalize(posix.join(posix.dirname(page), target))
      target = target.replace(/\.html$/, '')
      if (target.endsWith('/index')) target = target.slice(0, -'index'.length)
    }
    if (/\.(png|jpe?g|gif|svg|webp|ico|css|js|json|xml|txt|pdf|woff2?)$/i.test(target)) continue
    checked++
    const set = lookup(target)
    if (!set) {
      violations.push(`${page}: link to missing page ${href}`)
      continue
    }
    if (frag && !set.has(frag)) violations.push(`${page}: link to missing anchor ${href}`)
  }
}

for (const v of violations) console.error(v)
console.log(`check-anchors: ${violations.length} violation(s) across ${checked} internal links in ${pages.size} pages`)
process.exit(violations.length ? 1 : 0)
