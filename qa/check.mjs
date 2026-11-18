import { readFileSync } from 'node:fs'
import { chromium } from 'playwright-core'

const { entries } = JSON.parse(readFileSync(new URL('../data/dema-district-languages.json', import.meta.url), 'utf8'))
const languageLabels = [...new Set(entries.flatMap(entry => entry.languages))]
const browser = await chromium.connectOverCDP(process.env.CDP_URL ?? 'http://127.0.0.1:9229')
const context = browser.contexts()[0]
const baseUrl = process.env.DEMA_URL ?? 'http://127.0.0.1:5190/'
const issues = []
const check = (condition, message) => { if (!condition) issues.push(message) }
const names = page => page.locator('.directory-row h4').allTextContents()
const query = (page, value) => page.getByRole('searchbox', { name: 'Search a district, place, or language' }).fill(value)
async function revealAll(page) {
  while (await page.locator('.directory-more').count()) await page.locator('.directory-more').click()
}
async function checkOverflow(page, label) {
  const { scroll, viewport } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: window.innerWidth }))
  check(scroll <= viewport, `${label}: horizontal overflow ${scroll} > ${viewport}`)
  return `${scroll}/${viewport}`
}
async function captureSection(page, selector, path, width) {
  const box = await page.locator(selector).evaluate(el => {
    const rect = el.getBoundingClientRect()
    return { y: Math.floor(rect.top + scrollY), height: Math.ceil(rect.height) }
  })
  await page.screenshot({ path, fullPage: true, clip: { x: 0, y: box.y, width, height: box.height } })
}
async function captureLanguageIntro(page, width) {
  const box = await page.evaluate(() => {
    const section = document.querySelector('#languages').getBoundingClientRect()
    const directory = document.querySelector('#language-directory').getBoundingClientRect()
    const y = Math.floor(section.top + scrollY)
    return { y, height: Math.ceil(directory.top + scrollY + 240 - y) }
  })
  await page.screenshot({ path: `qa/languages-visual-${width}.png`, fullPage: true, clip: { x: 0, y: box.y, width, height: box.height } })
}

for (const width of [1440, 1024, 768, 390, 320, 280]) {
  const page = await context.newPage()
  await page.setViewportSize({ width, height: 900 })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(image => { image.loading = 'eager' }))
  await page.waitForFunction(() => [...document.images].every(img => img.complete))
  const header = page.locator('.site-header')
  const brand = header.locator('.brand-header')
  check(await brand.count() === 1, `${width}: header contrast-tab link missing`)
  check(await brand.getAttribute('href') === '#top', `${width}: header brand destination changed`)
  check(await brand.getAttribute('aria-label') === 'Dema Language Solutions, home', `${width}: header brand accessible name changed`)
  check(await brand.locator('img').getAttribute('src') === '/assets/logo.png', `${width}: header uses a different logo`)
  check(await brand.locator('.brand-wordmark').innerText() === 'Language\nSolutions', `${width}: header wordmark is not two lines`)
  check(await page.locator('.footer .brand-header').count() === 0, `${width}: footer brand was changed to the header tab`)
  const brandLayout = await page.evaluate(() => {
    const brand = document.querySelector('.brand-header')
    const mark = brand.querySelector('img')
    const panel = brand.querySelector('.brand-wordmark')
    const neighbor = document.querySelector(innerWidth <= 780 ? '.menu-toggle' : '.nav')
    const b = brand.getBoundingClientRect(), m = mark.getBoundingClientRect(), p = panel.getBoundingClientRect(), n = neighbor.getBoundingClientRect()
    const style = getComputedStyle(panel)
    return { brandLeft: b.left, brandRight: b.right, neighborLeft: n.left, markWithinTile: m.left >= b.left && m.right <= p.left && m.top >= b.top && m.bottom <= b.bottom, panelWithinBrand: p.right <= b.right, panelColor: style.color, panelBackground: style.backgroundColor, pageWidth: innerWidth }
  })
  check(brandLayout.brandLeft >= 0 && brandLayout.brandRight <= brandLayout.pageWidth && brandLayout.brandRight + 8 <= brandLayout.neighborLeft && brandLayout.markWithinTile && brandLayout.panelWithinBrand, `${width}: header brand collision or clipped logo ${JSON.stringify(brandLayout)}`)
  check(brandLayout.panelColor === 'rgb(255, 255, 255)' && brandLayout.panelBackground === 'rgb(45, 12, 86)', `${width}: header wordmark contrast changed`)
  await page.screenshot({ path: `qa/header-${width}.png`, clip: { x: 0, y: 0, width, height: 170 } })
  await page.evaluate(() => scrollTo(0, 440))
  await page.waitForTimeout(250)
  check(await header.evaluate(el => el.classList.contains('is-scrolled')), `${width}: sticky header state missing`)
  await page.screenshot({ path: `qa/header-scrolled-${width}.png`, clip: { x: 0, y: 0, width, height: 170 } })
  await brand.focus()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Shift+Tab')
  check(await brand.evaluate(el => document.activeElement === el && getComputedStyle(el).outlineStyle !== 'none'), `${width}: header brand focus is not visible`)
  await brand.click()
  check(new URL(page.url()).hash === '#top', `${width}: header brand did not navigate home`)
  await page.evaluate(() => scrollTo(0, 0))
  await page.waitForTimeout(250)
  await page.screenshot({ path: `qa/home-${width}.png`, fullPage: true })
  await captureSection(page, '#services', `qa/services-${width}.png`, width)
  await captureSection(page, '#find-service', `qa/finder-${width}.png`, width)
  await captureLanguageIntro(page, width)
  await captureSection(page, '#languages', `qa/languages-${width}.png`, width)
  const heroBottom = await page.locator('.hero').evaluate(element => Math.ceil(element.getBoundingClientRect().bottom + window.scrollY))
  await page.screenshot({ path: `qa/hero-${width}.png`, fullPage: true, clip: { x: 0, y: 0, width, height: heroBottom } })
  const size = await checkOverflow(page, `${width} initial`)
  const brokenImages = await page.evaluate(() => [...document.images].filter(img => !img.naturalWidth).map(img => img.src))
  check(brokenImages.length === 0, `${width}: broken images ${brokenImages.join(', ')}`)
  check(await page.locator('h1').count() === 1, `${width}: expected one H1`)
  for (const href of ['#top', '#services', '#languages', '#team', '#contact']) {
    check(await page.locator(`.nav-track a[href="${href}"]`).count() === 1, `${width}: missing header link ${href}`)
  }
  if (width > 780) check(await page.locator('.nav-quote').isVisible(), `${width}: desktop quote action is hidden`)
  check(await page.locator('.directory-count').innerText() === 'Showing 3 of 93 listed districts / places', `${width}: initial directory count`)
  const heroLinks = page.locator('.hero-actions a')
  check(await heroLinks.nth(0).getAttribute('href') === '#contact', `${width}: quote anchor changed`)
  check(await heroLinks.nth(1).getAttribute('href') === '#services', `${width}: services anchor changed`)
  await heroLinks.nth(0).click()
  check(new URL(page.url()).hash === '#contact', `${width}: quote anchor did not navigate`)
  await heroLinks.nth(1).click()
  check(new URL(page.url()).hash === '#services', `${width}: services anchor did not navigate`)
  await heroLinks.nth(0).focus()
  await page.keyboard.press('Tab')
  const focus = await heroLinks.nth(1).evaluate(element => ({ active: document.activeElement === element, outline: getComputedStyle(element).outlineStyle }))
  check(focus.active && focus.outline !== 'none', `${width}: hero action keyboard focus is not visible`)
  check(await page.locator('.hero-connection,.hero-clip-defs').count() === 0, `${width}: rejected connection line or mask remains`)
  check(await page.locator('.hero-inset').count() === 1, `${width}: document inset is missing`)
  check(await page.locator('.service-row').count() === 6, `${width}: expected six service rows`)
  check(await page.locator('.finder-option').count() === 4, `${width}: expected four finder choices`)
  check(await page.locator('.finder-option > svg, .finder-result .result-icon').count() === 0, `${width}: generic finder icons remain`)
  check(await page.locator('.finder-result .button').getAttribute('href') === '#contact', `${width}: finder quote destination changed`)
  check(await page.locator('.atlas-photo figcaption a[href="https://creativecommons.org/licenses/by/4.0/"]').count() === 1, `${width}: Kampala licence link missing`)
  check(await page.locator('.atlas-photo figcaption a[href="https://commons.wikimedia.org/wiki/File:View_of_Kampala_city_1.jpg"]').count() === 1, `${width}: Kampala source credit missing`)
  check(await page.locator('.language-intro .text-link').getAttribute('href') === '#contact', `${width}: language contact action changed`)
  check(JSON.stringify(await page.locator('.atlas-examples li').allTextContents()) === JSON.stringify(['Luganda', 'Runyankore', 'Acholi', 'Lusoga']), `${width}: atlas examples changed`)
  check(await page.locator('.atlas-map').getAttribute('src') === '/assets/uganda-outline.svg', `${width}: supplied Uganda outline is missing`)
  const atlasLayout = await page.evaluate(() => {
    const bounds = selector => document.querySelector(selector).getBoundingClientRect()
    const map = bounds('.atlas-map'), examples = bounds('.atlas-examples'), atlas = bounds('.atlas-panel'), photo = bounds('.atlas-photo img'), caption = bounds('.atlas-photo figcaption')
    return { mapWithinPanel: map.left >= atlas.left && map.right <= atlas.right && map.top >= atlas.top && map.bottom <= atlas.bottom, labelsBelowMap: examples.top >= map.bottom, captionBelowPhoto: caption.top >= photo.bottom, sideBySide: photo.left > atlas.right - 1, stacked: photo.top > atlas.bottom - 1 }
  })
  check(atlasLayout.mapWithinPanel && atlasLayout.labelsBelowMap && atlasLayout.captionBelowPhoto && (width > 780 ? atlasLayout.sideBySide : atlasLayout.stacked), `${width}: atlas/photo arrangement is clipped or out of order ${JSON.stringify(atlasLayout)}`)
  for (const [label, result] of [
    ['Translation', 'Translation for documents'],
    ['Interpretation', 'Interpretation for live conversations'],
    ['Localization', 'Localization for digital content'],
  ]) {
    const link = page.locator('.hero-service-labels').getByRole('link', { name: label })
    check(await link.getAttribute('href') === '#find-service', `${width}: ${label} destination changed`)
    await link.click()
    check(new URL(page.url()).hash === '#find-service', `${width}: ${label} did not navigate`)
    check(await page.getByRole('heading', { name: result }).isVisible(), `${width}: ${label} did not update finder`)
    check(await page.locator('#find-service .finder-option.selected').evaluate(el => document.activeElement === el), `${width}: ${label} did not move focus to finder`)
    await checkOverflow(page, `${width} after ${label}`)
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const reduced = await page.evaluate(() => ({ scroll: getComputedStyle(document.documentElement).scrollBehavior, transition: getComputedStyle(document.querySelector('.hero-actions a')).transitionDuration, finderTransition: getComputedStyle(document.querySelector('.finder-option')).transitionDuration, brandTransition: getComputedStyle(document.querySelector('.brand-header')).transitionDuration, animation: getComputedStyle(document.querySelector('.hero-copy')).animationName }))
  check(reduced.scroll === 'auto' && parseFloat(reduced.transition) < .001 && parseFloat(reduced.finderTransition) < .001 && parseFloat(reduced.brandTransition) < .001 && reduced.animation === 'none', `${width}: reduced-motion preference is not honored ${JSON.stringify(reduced)}`)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  for (const [label, result] of [
    ['Translation', 'Translation for documents'],
    ['Interpretation', 'Interpretation for live conversations'],
    ['Localization', 'Localization for digital content'],
    ['Transcription', 'Transcription for recordings'],
  ]) {
    await page.locator('.service-row').filter({ has: page.getByRole('heading', { name: label, exact: true }) }).click()
    check(new URL(page.url()).hash === '#find-service' && await page.getByRole('heading', { name: result }).isVisible(), `${width}: ${label} service row did not select the finder result`)
  }
  for (const label of ['Editing & Proofreading', 'Language Teaching']) {
    await page.locator('.service-row').filter({ has: page.getByRole('heading', { name: label, exact: true }) }).click()
    check(new URL(page.url()).hash === '#contact', `${width}: ${label} service row did not navigate to contact`)
  }
  await checkOverflow(page, `${width} after service rows`)
  if (width <= 768) {
    await page.evaluate(() => scrollTo(0, 0))
    await page.waitForTimeout(250)
    const menu = page.locator('.menu-toggle')
    await menu.click()
    await page.waitForTimeout(350)
    check(await menu.getAttribute('aria-expanded') === 'true', 'menu did not open')
    await checkOverflow(page, `${width} open menu`)
    await page.screenshot({ path: `qa/header-menu-${width}.png`, clip: { x: 0, y: 0, width, height: 530 } })
    await page.keyboard.press('Escape')
    check(await menu.getAttribute('aria-expanded') === 'false', 'Escape did not close menu')
    await menu.click()
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Languages' }).click()
    check(await menu.getAttribute('aria-expanded') === 'false', 'menu did not close on navigation')
    check(new URL(page.url()).hash === '#languages', 'Languages anchor did not navigate')
  }
  for (const [choice, result] of [
    ['Document', 'Translation for documents'],
    ['Live Event', 'Interpretation for live conversations'],
    ['Recording', 'Transcription for recordings'],
    ['Website', 'Localization for digital content'],
  ]) {
    const button = page.getByRole('button', { name: choice })
    await button.click()
    check(await page.getByRole('heading', { name: result }).isVisible(), `${width}: ${choice} result did not update`)
    check(await button.getAttribute('aria-pressed') === 'true', `${width}: ${choice} aria state did not update`)
    check(await page.locator('.finder-option.selected').count() === 1, `${width}: finder has multiple selected rows`)
    await checkOverflow(page, `${width} finder ${choice}`)
  }
  const documentChoice = page.getByRole('button', { name: 'Document' })
  await documentChoice.focus()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Shift+Tab')
  check(await documentChoice.evaluate(el => document.activeElement === el && getComputedStyle(el).outlineStyle !== 'none'), `${width}: finder focus is not visible`)
  await page.keyboard.press('Space')
  check(await documentChoice.getAttribute('aria-pressed') === 'true', `${width}: Space did not select Document`)
  const websiteChoice = page.getByRole('button', { name: 'Website' })
  await websiteChoice.focus()
  await page.keyboard.press('Enter')
  check(await websiteChoice.getAttribute('aria-pressed') === 'true', `${width}: Enter did not select Website`)
  for (const id of ['top', 'services', 'find-service', 'languages', 'language-directory', 'approach', 'team', 'clients', 'contact']) {
    check(await page.locator(`#${id}`).count() === 1, `${width}: missing anchor ${id}`)
  }
  await page.locator('.directory-more').click()
  await checkOverflow(page, `${width} expanded directory`)
  await query(page, 'Ngakarimojong')
  check((await names(page)).includes('Moroto'), `${width}: punctuation-tolerant search failed`)
  await checkOverflow(page, `${width} search`)
  console.log(`${width}: ${size}, broken images ${brokenImages.length}`)
  await page.close()
}

const page = await context.newPage()
await page.setViewportSize({ width: 390, height: 900 })
await page.goto(baseUrl, { waitUntil: 'networkidle' })
check(JSON.stringify(await names(page)) === JSON.stringify(['Jinja', 'Gulu', 'Mbarara']), 'initial featured rows differ from reference')
await revealAll(page)
const allPlaces = await names(page)
check(allPlaces.length === 93 && entries.every(entry => allPlaces.includes(entry.place)), `browse reaches ${allPlaces.length} of 93 places`)
const filters = page.locator('.directory-filters')
await filters.getByRole('button', { name: 'Languages' }).click()
await revealAll(page)
const allLanguages = await names(page)
check(allLanguages.length === languageLabels.length && languageLabels.every(label => allLanguages.includes(label)), `reverse index reaches ${allLanguages.length} of ${languageLabels.length} labels`)
await filters.getByRole('button', { name: 'All', exact: true }).click()
for (const [search, place, language] of [
  ['Jinja', 'Jinja', 'Lusoga'],
  ['Gulu', 'Gulu', 'Acholi'],
  ['Mbarara', 'Mbarara', 'Runyankore'],
]) {
  await query(page, search)
  const row = page.locator('.directory-row').filter({ has: page.getByRole('heading', { name: place, exact: true }) })
  check(await row.count() === 1 && (await row.innerText()).includes(language), `${search} did not reveal ${language}`)
}
await query(page, 'Lusoga')
await revealAll(page)
const expectedLusoga = entries.filter(entry => entry.languages.includes('Lusoga')).map(entry => entry.place).sort()
check(JSON.stringify((await names(page)).sort()) === JSON.stringify(expectedLusoga), 'Lusoga did not reveal every matching place')
await query(page, 'Pokot')
check(JSON.stringify(await names(page)) === JSON.stringify(['Nakapiripirit']), 'Pokot alias did not find Nakapiripirit')
await query(page, 'Pökoot')
check((await names(page)).includes('Amudat'), 'Pökoot did not find Amudat')
await query(page, "Ma'di")
check((await names(page)).includes('Adjumani'), "Ma'di punctuation search failed")
await query(page, 'Ngakarimojong')
check((await names(page)).includes('Moroto'), 'Ngakarimojong punctuation search failed')
await query(page, 'no-such-place-999')
check(await page.locator('.directory-empty').isVisible(), 'empty state missing')
await page.locator('.directory-clear').click()
check(JSON.stringify(await names(page)) === JSON.stringify(['Jinja', 'Gulu', 'Mbarara']), 'clearing search did not restore browse rows')
await filters.getByRole('button', { name: 'Districts / places' }).click()
await query(page, 'Lusoga')
check(await page.locator('.directory-empty').isVisible(), 'places filter matched a language name')
await filters.getByRole('button', { name: 'Languages' }).click()
check((await names(page)).includes('Lusoga'), 'language filter did not find Lusoga')
const languageRow = page.locator('.directory-row').filter({ has: page.getByRole('heading', { name: 'Lusoga', exact: true }) })
for (const place of expectedLusoga) check((await languageRow.innerText()).includes(place), `Lusoga reverse row omitted ${place}`)
await checkOverflow(page, '390 expanded directory')
const links = await page.locator('a[href^="mailto:"],a[href^="tel:"]').evaluateAll(els => els.map(el => el.getAttribute('href')))
check(links.some(link => link?.startsWith('mailto:info@demalanguages.com?subject=')), 'quote mailto missing')
check(links.includes('tel:+256702442470'), 'phone link missing')
await page.close()
await browser.close()
if (issues.length) { console.error(issues.join('\n')); process.exit(1) }
console.log(`Browser checks passed: ${entries.length} places and ${languageLabels.length} language labels`)
