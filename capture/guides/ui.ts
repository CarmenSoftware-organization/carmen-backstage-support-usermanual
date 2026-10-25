// Small UI helpers shared by the guide captures. Labels are matched in both UI languages
// (TH from carmen-backstage src/i18n/th.ts, EN from en.ts).
import { expect, type Locator, type Page, type Response } from '@playwright/test'
import { shoot } from '../fixtures.ts'

const esc = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Exact match of either the English or the Thai label. */
export const L = (en: string, th: string): RegExp => new RegExp(`^\\s*(${esc(en)}|${esc(th)})\\s*$`)

/** Substring match of either label. */
export const Lpart = (en: string, th: string): RegExp => new RegExp(`(${esc(en)}|${esc(th)})`)

export const main = (page: Page): Locator => page.locator('main')

export const button = (scope: Page | Locator, name: RegExp): Locator => scope.getByRole('button', { name }).first()

/** Opens a tab and waits until it is selected. */
export async function openTab(page: Page, name: RegExp): Promise<void> {
  const tab = page.getByRole('tab', { name }).first()
  await tab.click()
  await expect(tab).toHaveAttribute('aria-selected', 'true', { timeout: 10_000 })
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
}

/**
 * Edit-in-place field (business unit page): a read button next to a label span, which turns
 * into a control labelled with the same text. `labels` = the label in each UI language.
 */
export async function openInline(page: Page, labels: string[], readButton?: Locator): Promise<Locator> {
  let control: Locator | undefined
  for (const l of labels) {
    const c = page.getByLabel(l, { exact: true })
    if (await c.isVisible().catch(() => false)) control = c
  }
  if (!control) {
    const xp = labels.map((l) => `normalize-space(text())=${JSON.stringify(l)}`).join(' or ')
    const cell = page.locator(`xpath=//span[${xp}]/following-sibling::*[1]`).first()
    await (readButton ?? cell.locator('xpath=self::button | .//button').first()).click()
    control = labels.map((l) => page.getByLabel(l, { exact: true })).reduce((a, b) => a.or(b))
  }
  await control.first().waitFor({ state: 'visible', timeout: 10_000 })
  return control.first()
}

/** Types into an edit-in-place text field and commits it (blur). */
export async function setInlineText(page: Page, labels: string[], value: string, readButton?: Locator): Promise<void> {
  const control = await openInline(page, labels, readButton)
  await control.fill(value)
  await control.blur()
  await expect(control).toBeHidden({ timeout: 10_000 })
}

/** Picks the option of an edit-in-place select whose text contains `text`. */
export async function setInlineSelect(page: Page, labels: string[], text: string): Promise<void> {
  const control = await openInline(page, labels)
  await expect(control.locator('option', { hasText: text })).toHaveCount(1, { timeout: 15_000 })
  const value = await control.locator('option', { hasText: text }).getAttribute('value')
  await control.selectOption(value ?? '')
  await expect(control).toBeHidden({ timeout: 10_000 })
}

/** Runs `action` and waits for the matching API write; fails when it is not 2xx. */
export async function expectWrite(
  page: Page,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  urlPart: string | RegExp,
  action: () => Promise<unknown>,
): Promise<Response> {
  const wait = page.waitForResponse(
    (r) =>
      r.request().method() === method &&
      (typeof urlPart === 'string' ? r.url().includes(urlPart) : urlPart.test(r.url())),
    { timeout: 30_000 },
  )
  await action()
  const res = await wait
  if (!res.ok()) throw new Error(`${method} ${res.url()} → HTTP ${res.status()} ${(await res.text()).slice(0, 300)}`)
  return res
}

/** The id a create call returned (`{ data: { id } }` or `{ id }`). */
export async function createdId(res: Response): Promise<string> {
  const body = (await res.json().catch(() => null)) as { id?: string; data?: { id?: string } } | null
  const id = body?.data?.id ?? body?.id
  if (!id) throw new Error(`no id in create response from ${res.url()}`)
  return id
}

/** Waits for a success toast (sonner) to be visible, so the shot shows it. */
export async function successToast(page: Page): Promise<void> {
  await page.locator('[data-sonner-toast][data-type="success"]').first().waitFor({ state: 'visible', timeout: 10_000 })
}

/** Waits until toasts have gone, so they do not cover the next shot. */
export async function toastsGone(page: Page): Promise<void> {
  await page.locator('[data-sonner-toast]').first().waitFor({ state: 'detached', timeout: 15_000 }).catch(() => {})
}

const ACCESS_DENIED = /You don't have permission to access this page\.|คุณไม่มีสิทธิ์เข้าถึงหน้านี้/

/**
 * Goes to `path` and waits for the network to settle. DEV now and then answers the
 * permission check slowly and the app shows Access Denied for a moment; reload then
 * (up to twice) instead of failing the whole guide.
 */
export async function go(page: Page, path: string): Promise<void> {
  for (let attempt = 0; ; attempt++) {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
    const denied = await page.getByText(ACCESS_DENIED).first().isVisible().catch(() => false)
    if (!denied || attempt >= 2) return
    await page.waitForTimeout(2_000)
  }
}

/** Scrolls only the element's own scroll container so it sits mid-viewport (the app shell stays put). */
export async function scrollToMiddle(page: Page, selector: string): Promise<void> {
  await resetPageScroll(page)
  await page.locator(selector).first().evaluate((el) => {
    let box: HTMLElement | null = el.parentElement
    while (box && !(box.scrollHeight > box.clientHeight && /(auto|scroll)/.test(getComputedStyle(box).overflowY))) {
      box = box.parentElement
    }
    const r = el.getBoundingClientRect()
    if (box) {
      const b = box.getBoundingClientRect()
      box.style.scrollBehavior = 'auto'
      box.scrollTop += r.top - b.top - (box.clientHeight - r.height) / 2
    } else {
      window.scrollBy({ top: r.top - (window.innerHeight - r.height) / 2, behavior: 'instant' })
    }
  })
  await page.waitForTimeout(200)
  scrolledOnPurpose.add(page)
}

/** Waits until no drop-down still shows a "Loading…" placeholder (e.g. currencies). */
export async function selectsLoaded(page: Page): Promise<void> {
  await page.waitForFunction(
    () => ![...document.querySelectorAll('select option:checked')].some((o) => /Loading|กำลังโหลด/.test(o.textContent ?? '')),
    undefined,
    { timeout: 15_000 },
  )
}

/** Escapes a literal for use inside a RegExp. */
export const reEsc = esc

/**
 * Puts the document itself back at the top. Playwright's auto-scroll (click/check on an
 * element below the fold) can nudge the whole app shell by a few pixels; only the content
 * pane should scroll.
 */
export async function resetPageScroll(page: Page): Promise<void> {
  await page.evaluate(() => {
    // The app scrolls smoothly; a shot taken mid-scroll would catch the page a few pixels off.
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Boxes that are not meant to scroll (overflow hidden/visible) but were scrolled anyway.
    for (const el of document.querySelectorAll<HTMLElement>('*')) {
      if (el.scrollTop > 0 && !/(auto|scroll)/.test(getComputedStyle(el).overflowY)) el.scrollTop = 0
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  })
}

const scrolledOnPurpose = new WeakSet<Page>()

/**
 * shoot() with stray scrolling undone first (see resetPageScroll) — unless scrollToMiddle()
 * placed the page on purpose for this shot.
 */
export async function snap(page: Page, slug: string, opts?: Parameters<typeof shoot>[2]): Promise<void> {
  if (!scrolledOnPurpose.has(page)) await resetPageScroll(page)
  scrolledOnPurpose.delete(page)
  await shoot(page, slug, opts)
}
