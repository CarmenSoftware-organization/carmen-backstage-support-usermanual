// Verifies Thai/English page parity and screenshot references.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { SITE, listMarkdown } from './lib.ts'

const violations: string[] = []
const all = listMarkdown()
const th = all.filter((f) => !f.startsWith('en/'))
const en = all.filter((f) => f.startsWith('en/')).map((f) => f.slice(3))

for (const f of th) if (!en.includes(f)) violations.push(`site/${f}: missing English page site/en/${f}`)
for (const f of en) if (!th.includes(f)) violations.push(`site/en/${f}: missing Thai page site/${f}`)

const imgRe = /\/screenshots\/([A-Za-z0-9_-]+)\/([^\s)"'>]+?\.png)/g
for (const f of all) {
  const lang = f.startsWith('en/') ? 'en' : 'th'
  const lines = readFileSync(join(SITE, f), 'utf8').split('\n')
  lines.forEach((line, i) => {
    for (const m of line.matchAll(imgRe)) {
      const [, refLang, file] = m
      const where = `site/${f}:${i + 1}`
      if (refLang !== lang) violations.push(`${where}: screenshot language "${refLang}" does not match page language "${lang}" (${m[0]})`)
      if (!existsSync(join(SITE, 'public', 'screenshots', refLang, file))) violations.push(`${where}: missing file site/public/screenshots/${refLang}/${file}`)
    }
  })
}

for (const v of violations) console.error(v)
console.log(`check-parity: ${violations.length} violation(s) across ${all.length} pages`)
process.exit(violations.length ? 1 : 0)
