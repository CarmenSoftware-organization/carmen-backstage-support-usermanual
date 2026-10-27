// Cluster Admin site only: fails if the built site mentions support-only (Backstage) screens.
// Hotel-group readers must never see them. "Carmen Blue Backstage" (the product name on the
// sign-in screen) is allowed, which is why only `/backstage/` paths are matched, not the word.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { LABEL, SITE } from './lib.ts'

const DIST = join(SITE, '.vitepress', 'dist')
if (!existsSync(DIST)) {
  console.error(`check-leak: ${LABEL}/.vitepress/dist not found — build first`)
  process.exit(1)
}
const BANNED = [/sql workbench/i, /super admin/i, /database pool/i, /\/backstage\//i, /ผู้ดูแลระบบสูงสุด/]

const violations: string[] = []
const walk = (dir: string): void => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else if (/\.(html|js|json)$/.test(name)) {
      const text = readFileSync(full, 'utf8')
      for (const re of BANNED) {
        const m = text.match(re)
        if (m) violations.push(`${LABEL}/.vitepress/dist/${relative(DIST, full)}: "${m[0]}" matches ${re}`)
      }
    }
  }
}
walk(DIST)
for (const v of violations) console.error(v)
console.log(`check-leak: ${violations.length} violation(s)`)
process.exit(violations.length ? 1 : 0)
