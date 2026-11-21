import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'

let browser
try {
  browser = await chromium.connectOverCDP(process.env.CDP_URL ?? 'http://127.0.0.1:9229')
} catch {
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ?? 'C:\\Users\\HP\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe',
  })
}
const context = browser.contexts()[0] ?? await browser.newContext()
const baseUrl = process.env.DEMA_URL ?? 'http://127.0.0.1:5190/'
const widths = [1440, 1024, 768, 390, 320, 280]
const problems = []
const check = (condition, message) => { if (!condition) problems.push(message) }
mkdirSync('qa', { recursive: true })

for (const width of widths) {
  const page = await context.newPage()
  await page.setViewportSize({ width, height: 900 })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  for (const [label, href] of [
    ['Facebook', 'https://www.facebook.com/profile.php?id=100067927387260'],
    ['X (Twitter)', 'https://x.com/dema_solutions'],
    ['LinkedIn', 'https://www.linkedin.com/in/dema-langauge-solutions-22447427b'],
    ['Email Dema', 'mailto:info@demalanguages.com'],
  ]) {
    const social = page.locator('.footer-social').getByRole('link', { name: `Dema on ${label}` }).or(page.locator('.footer-social').getByRole('link', { name: label }))
    check(await social.getAttribute('href') === href, `${width}: ${label} footer destination mismatch`)
    if (!href.startsWith('mailto:')) check(await social.getAttribute('rel') === 'noopener noreferrer' && await social.getAttribute('target') === '_blank', `${width}: ${label} link safety attributes missing`)
  }
  const toggle = page.locator('.contact-fab-toggle')
  check(await toggle.count() === 1, `${width}: contact button missing`)
  const checkOverflow = async state => {
    const { scroll, viewport } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }))
    check(scroll <= viewport, `${width} (${state}): horizontal overflow ${scroll} > ${viewport}`)
    if (scroll > viewport) {
      const offenders = await page.locator('body *').evaluateAll(els => els.map(el => ({
        tag: el.tagName.toLowerCase(), className: typeof el.className === 'string' ? el.className : '', id: el.id,
        left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right),
      })).filter(el => el.right > innerWidth + 1 || el.left < -1).sort((a, b) => b.right - a.right).slice(0, 8))
      console.error(`${width} (${state}) overflow sources: ${JSON.stringify(offenders)}`)
    }
  }
  await checkOverflow('closed')
  if (width <= 360) {
    const collision = await page.evaluate(() => {
      const button = document.querySelector('.contact-fab-toggle')?.getBoundingClientRect()
      const labels = document.querySelector('.hero-service-labels')?.getBoundingClientRect()
      return Boolean(button && labels && button.left < labels.right && button.right > labels.left && button.top < labels.bottom && button.bottom > labels.top)
    })
    check(!collision, `${width}: closed FAB overlaps hero service shortcuts`)
  }
  if ([1440, 390].includes(width)) await page.screenshot({ path: `qa/contact-fab-closed-${width}.png` })

  await toggle.focus()
  await page.keyboard.press('Enter')
  const panel = page.getByRole('region', { name: 'How can we help?' })
  check(await panel.isVisible(), `${width}: panel did not open`)
  check(await toggle.getAttribute('aria-expanded') === 'true', `${width}: aria-expanded not set`)
  await page.keyboard.press('Tab')
  check(await panel.getByRole('button', { name: 'Close contact options' }).evaluate(el => document.activeElement === el), `${width}: disclosure contents are not next in keyboard order`)
  for (const [name, href] of [
    ['WhatsApp', 'https://wa.me/256702442470'],
    ['Email', 'mailto:info@demalanguages.com'],
    ['Call', 'tel:+256702442470'],
  ]) check(await panel.getByRole('link', { name: new RegExp(name) }).getAttribute('href') === href, `${width}: ${name} destination mismatch`)
  const panelBox = await panel.boundingBox()
  check(Boolean(panelBox && panelBox.x >= 0 && panelBox.x + panelBox.width <= width && panelBox.y >= 0 && panelBox.y + panelBox.height <= 900), `${width}: panel is outside viewport`)
  await checkOverflow('open')
  if ([1440, 390].includes(width)) {
    await page.waitForTimeout(220)
    await page.screenshot({ path: `qa/contact-fab-open-${width}.png`, animations: 'disabled' })
  }
  await page.keyboard.press('Escape')
  check(!(await panel.isVisible()), `${width}: Escape did not close panel`)
  check(await toggle.getAttribute('aria-expanded') === 'false', `${width}: aria-expanded did not reset`)
  check(await toggle.evaluate(el => document.activeElement === el), `${width}: Escape did not return focus to toggle`)
  await toggle.click()
  await panel.getByRole('button', { name: 'Close contact options' }).click()
  check(!(await panel.isVisible()), `${width}: close button did not close panel`)
  check(await toggle.evaluate(el => document.activeElement === el), `${width}: close button did not return focus to toggle`)
  await toggle.click()
  await page.locator('h1').click()
  check(!(await panel.isVisible()), `${width}: outside click did not close panel`)
  await page.evaluate(() => scrollTo(0, 0))

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await toggle.click()
  const animationName = await panel.evaluate(el => getComputedStyle(el).animationName)
  check(animationName === 'none', `${width}: reduced-motion animation remained active`)
  await toggle.click()

  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.waitForTimeout(100)
  check(await page.locator('.contact-fab').count() === 0, `${width}: floating contact button overlaps contact CTA/footer`)
  await page.evaluate(() => scrollTo(0, 0))
  await page.waitForTimeout(100)

  if (width <= 768) {
    const menu = page.locator('.menu-toggle')
    if (await menu.count()) {
      await menu.click()
      await checkOverflow('mobile menu open')
      await page.keyboard.press('Escape')
    }
  }
  await page.screenshot({ path: `qa/home-contact-${width}.png`, fullPage: true })
  await page.close()
}

await browser.close()
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log(`Contact UI checks passed at ${widths.join(', ')} px`)
