// Flags developer jargon in prose. Add <!-- plain-ok --> to a line when the screen itself shows the term.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { LABEL, SITE, listMarkdown } from './lib.ts'

const BANNED: RegExp[] = [
  /\btb_\w+/i,
  /\/api(-system)?\//i,
  /soft[- ]delete/i,
  /hard[- ]delete/i,
  /\bendpoint\b/i,
  /\bpayload\b/i,
  /\bJSON\b/i,
  /\bschema\b/i,
  /\bJWT\b/i,
  /\b[a-z_]+\.(read|create|update|delete|manage|apply)\b/i,
]

const violations: string[] = []
const files = listMarkdown()
for (const f of files) {
  let inFence = false
  readFileSync(join(SITE, f), 'utf8').split('\n').forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return
    }
    if (inFence || line.includes('<!-- plain-ok -->')) return
    for (const re of BANNED) {
      const m = line.match(re)
      if (m) violations.push(`${LABEL}/${f}:${i + 1}: "${m[0]}" matches ${re}`)
    }
  })
}

for (const v of violations) console.error(v)
console.log(`check-plain-language: ${violations.length} violation(s) across ${files.length} pages`)
process.exit(violations.length ? 1 : 0)
