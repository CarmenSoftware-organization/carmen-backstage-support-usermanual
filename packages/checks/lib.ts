import { readdirSync, statSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'

/** The VitePress app being checked: the current directory (each app runs the checks from its own folder). */
export const SITE = resolve(process.cwd())
/** SITE as shown in messages, relative to the repo root (e.g. `apps/support`). */
export const LABEL = relative(join(import.meta.dirname, '..', '..'), SITE).split(sep).join('/')

/** All markdown files under SITE, as posix paths relative to SITE, excluding .vitepress and node_modules. */
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
