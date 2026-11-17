import source from '../data/dema-district-languages.json'

export type PlaceEntry = { number: number; place: string; languages: string[] }
export type LanguageEntry = { language: string; places: PlaceEntry[] }

export const places: PlaceEntry[] = source.entries

export function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en')
    .replace(/[^a-z0-9]/g, '')
}

const languageMap = new Map<string, PlaceEntry[]>()
for (const place of places) {
  for (const language of place.languages) {
    const matches = languageMap.get(language) ?? []
    matches.push(place)
    languageMap.set(language, matches)
  }
}

export const languages: LanguageEntry[] = [...languageMap]
  .map(([language, matchingPlaces]) => ({ language, places: matchingPlaces }))
  .sort((a, b) => a.language.localeCompare(b.language, 'en'))

const featuredPlaces = ['Jinja', 'Gulu', 'Mbarara']
export const browsePlaces = [
  ...featuredPlaces.map(name => places.find(entry => entry.place === name)!),
  ...places.filter(entry => !featuredPlaces.includes(entry.place)),
]

export function findPlaces(query: string, placesOnly = false) {
  const needle = normalizeSearch(query)
  if (!needle) return browsePlaces
  return places.filter(entry =>
    normalizeSearch(entry.place).includes(needle) ||
    (!placesOnly && entry.languages.some(language => normalizeSearch(language).includes(needle))),
  )
}

export function findLanguages(query: string) {
  const needle = normalizeSearch(query)
  if (!needle) return languages
  return languages.filter(entry =>
    normalizeSearch(entry.language).includes(needle) ||
    entry.places.some(place => normalizeSearch(place.place).includes(needle)),
  )
}
