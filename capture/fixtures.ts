// Playwright fixtures for capture: UI language per project, light theme, and shoot().
import { test as base, type Page } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { PATHS, addBypassHeaderRoute } from './env.ts'

export type Lang = 'th' | 'en'
export type CaptureOptions = { lang: Lang }

export const test = base.extend<CaptureOptions & { uiPrefs: void }>({
  lang: ['th', { option: true }],
  uiPrefs: [
    async ({ context, lang }, use) => {
      await addBypassHeaderRoute(context)
      await context.addInitScript(
        ([l]) => {
          try {
            localStorage.setItem('lang', l)
            localStorage.setItem('theme', 'light')
          } catch {
            /* storage blocked: nothing to set */
          }
          // Freeze transitions and the caret so shots are stable.
          const css = '*,*::before,*::after{transition:none!important;animation-duration:0s!important;caret-color:transparent!important}'
          const inject = (): void => {
            const el = document.createElement('style')
            el.textContent = css
            ;(document.head ?? document.documentElement).appendChild(el)
          }
          if (document.head) inject()
          else document.addEventListener('DOMContentLoaded', inject, { once: true })
        },
        [lang],
      )
      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'

const LOADING = '[data-slot="skeleton"], .animate-pulse, [aria-busy="true"], .loading, .animate-spin'
// role="status" is also used for live counters, so only loading-labelled ones count.
const LOADING_LABEL = /loading|กำลังโหลด/i

// Status screens render IN PLACE (the URL does not change), so they are detected by text.
// Texts from carmen-platform src/i18n th.ts / en.ts: pages.statusPage.*, pages.comingSoon.*
const WRONG_SCREEN: { what: string; text: RegExp }[] = [
  { what: 'Access Denied', text: /You don't have permission to access this page\.|คุณไม่มีสิทธิ์เข้าถึงหน้านี้/ },
  { what: 'Coming soon', text: /This feature is still being built\.|ฟีเจอร์นี้ยังพัฒนาไม่เสร็จ/ },
  { what: '404', text: /The page you're looking for doesn't exist|หน้าที่คุณกำลังหาไม่มีอยู่/ },
]

/** Waits until nothing is loading; throws if a loading placeholder is still visible after 15 s. */
export async function settle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
  const done = await page
    .waitForFunction(
      ([sel, label]) => {
        const shown = (el: Element): boolean => {
          const r = el.getBoundingClientRect()
          const st = getComputedStyle(el)
          return r.width > 0 && r.height > 0 && st.visibility !== 'hidden' && st.display !== 'none'
        }
        const re = new RegExp(label, 'i')
        const statusLoading = [...document.querySelectorAll('main [role="status"]')].some(
          (el) => re.test(el.getAttribute('aria-label') ?? el.textContent ?? ''),
        )
        return !statusLoading && ![...document.querySelectorAll(sel)].some(shown)
      },
      [LOADING, LOADING_LABEL.source] as const,
      { timeout: 15_000 },
    )
    .then(() => true)
    .catch(() => false)
  if (!done) throw new Error(`still loading (a skeleton/spinner is visible) at ${new URL(page.url()).pathname}`)
}

/** Throws when the page is Access Denied, Coming soon, 404 or the login page. */
export async function assertRightScreen(page: Page): Promise<void> {
  const path = new URL(page.url()).pathname
  if (/^\/(403|404)(\/|$)/.test(path)) throw new Error(`wrong screen: landed on ${path}`)
  for (const { what, text } of WRONG_SCREEN) {
    if (await page.getByText(text).first().isVisible().catch(() => false)) {
      throw new Error(`wrong screen: ${what} shown at ${path}`)
    }
  }
}

const MASK_COLOR = '#9ca3af'

/**
 * Paints secret-bearing elements over in the DOM itself (text made transparent on a solid
 * fill). Playwright's `mask` overlay is kept as a second layer, but on its own it can land
 * in the wrong place after a scroll — this cannot, because it moves with the element.
 * Then checks every matched, visible element really has transparent text.
 */
async function redact(page: Page, selectors: string[]): Promise<void> {
  const css = selectors
    .map(
      (sel) =>
        `:is(${sel}){color:transparent!important;-webkit-text-fill-color:transparent!important;` +
        `text-shadow:none!important;background:${MASK_COLOR}!important;border-color:${MASK_COLOR}!important}` +
        `:is(${sel}) *{visibility:hidden!important}`,
    )
    .join('\n')
  await page.addStyleTag({ content: css })
  const leaks = await page.evaluate((sels) => {
    const bad: string[] = []
    for (const sel of sels) {
      for (const el of document.querySelectorAll<HTMLElement>(sel)) {
        const r = el.getBoundingClientRect()
        if (!r.width || !r.height) continue
        const st = getComputedStyle(el)
        if (st.webkitTextFillColor !== 'rgba(0, 0, 0, 0)' && st.color !== 'rgba(0, 0, 0, 0)') bad.push(sel)
      }
    }
    return bad
  }, selectors)
  if (leaks.length) throw new Error(`redaction did not apply to: ${[...new Set(leaks)].join(', ')}`)
}

/**
 * Saves site/public/screenshots/<lang>/<slug>.png after checking the screen.
 * Every `mask` selector must match at least one visible element, so a renamed field
 * can never let a secret through unmasked. `maskOptional` selectors are masked when present.
 */
export async function shoot(
  page: Page,
  slug: string,
  opts: { mask?: string[]; maskOptional?: string[]; fullPage?: boolean; allowLogin?: boolean } = {},
): Promise<void> {
  const lang = (test.info().project.use as Partial<CaptureOptions>).lang ?? 'th'
  await settle(page)
  if (!opts.allowLogin && /^\/login(\/|$)/.test(new URL(page.url()).pathname)) {
    throw new Error('wrong screen: redirected to /login (session expired?)')
  }
  await assertRightScreen(page)
  const masks = []
  for (const sel of opts.mask ?? []) {
    const loc = page.locator(sel)
    // The screen may still be swapping in (lazy route); give the secret-bearing element time to appear.
    await loc.first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {})
    await settle(page)
    const n = await loc.count()
    let visible = 0
    for (let i = 0; i < n; i++) if (await loc.nth(i).isVisible()) visible++
    if (!visible) throw new Error(`mask selector matched nothing visible: ${sel}`)
    masks.push(loc)
  }
  for (const sel of opts.maskOptional ?? []) masks.push(page.locator(sel))
  const all = [...(opts.mask ?? []), ...(opts.maskOptional ?? [])]
  if (all.length) await redact(page, all)
  await page.mouse.move(1, 1).catch(() => {})
  const dir = join(PATHS.screenshots, lang)
  mkdirSync(dir, { recursive: true })
  await page.screenshot({
    path: join(dir, `${slug}.png`),
    fullPage: opts.fullPage ?? false,
    animations: 'disabled',
    mask: masks,
    maskColor: MASK_COLOR,
  })
}
