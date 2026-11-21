// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { findLanguages, findPlaces, languages, places } from './directory'

afterEach(cleanup)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('homepage interactions', () => {
  it('indexes every published place and language in both directions', () => {
    expect(places).toHaveLength(93)
    expect(languages).toHaveLength(42)
    expect(findPlaces('Jinja')[0].languages).toContain('Lusoga')
    expect(findPlaces('Gulu')[0].languages).toContain('Acholi')
    expect(findPlaces('Mbarara')[0].languages).toContain('Runyankore')
    expect(findPlaces('Pokot').map(entry => entry.place)).toEqual(['Nakapiripirit'])
    expect(findPlaces("Ma'di").some(entry => entry.place === 'Adjumani')).toBe(true)
    expect(findPlaces('Ngakarimojong').some(entry => entry.place === 'Moroto')).toBe(true)
    expect(findLanguages('Lusoga')[0].places.map(entry => entry.place)).toContain('Jinja')
  })

  it('uses real in-page targets and contact links', () => {
    const { container } = render(<App />)
    const anchors = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
    for (const anchor of anchors) expect(container.querySelector(anchor.getAttribute('href')!)).not.toBeNull()
    expect(container.querySelector('a[href="tel:+256702442470"]')).not.toBeNull()
    expect(container.querySelector('a[href^="mailto:info@demalanguages.com?subject="]')).not.toBeNull()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders all six named clients with logo images', () => {
    render(<App />)
    for (const name of ['AFAAS', 'Penal Reform International', 'Marie Stopes Uganda', 'Justice Centres Uganda', 'Uganda Law Society', 'FHI 360']) {
      expect(screen.getByRole('img', { name: `${name} logo` })).toBeTruthy()
    }
  })

  it('changes the service result for all four choices', () => {
    render(<App />)
    const cases = [['Document', 'Translation for documents'], ['Live Event', 'Interpretation for live conversations'], ['Recording', 'Transcription for recordings'], ['Website', 'Localization for digital content']]
    for (const [choice, result] of cases) {
      const button = screen.getByRole('button', { name: choice })
      fireEvent.click(button)
      expect(button.getAttribute('aria-pressed')).toBe('true')
      expect(screen.getByRole('heading', { name: result })).not.toBeNull()
    }
  })

  it('uses service cards to preselect the finder', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('link', { name: /Localization Website and app content/i }))
    expect(screen.getByRole('button', { name: 'Website' }).getAttribute('aria-pressed')).toBe('true')
  })

  it('opens and closes the mobile menu, including Escape', () => {
    render(<App />)
    const open = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(open)
    expect(open.getAttribute('aria-expanded')).toBe('true')
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(open.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(open)
    fireEvent.click(screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('a[href="#languages"]')!)
    expect(open.getAttribute('aria-expanded')).toBe('false')
  })
})
