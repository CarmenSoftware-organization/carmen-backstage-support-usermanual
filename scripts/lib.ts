import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

export const SITE = join(import.meta.dirname, '..', 'site')

/** All markdown files under site/, as posix paths relative to site/, excluding .vitepress. */
export function listMarkdown(): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (name === '.vitepress' || name === 'node_modules') continue
      const full = join(dir, name)
      if (statSync(full).isDirectory()) walk(full)
      else if (name.endsWith('.md')) out.push(relative(SITE, full).split(sep).join('/'))
    }
  }
  walk(SITE)
  return out.sort()
}
