import { useState } from 'react'
import { ArrowRight, Search, X } from 'lucide-react'
import { browsePlaces, findLanguages, findPlaces, languages } from './directory'

type Mode = 'all' | 'places' | 'languages'
const modes: { key: Mode; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'places', label: 'Districts / places' },
  { key: 'languages', label: 'Languages' },
]

export default function LanguageDirectory() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<Mode>('all')
  const [visible, setVisible] = useState(3)
  const placeResults = findPlaces(query, mode === 'places')
  const languageResults = findLanguages(query)
  const showingLanguages = mode === 'languages'
  const results = showingLanguages ? languageResults : placeResults
  const count = Math.min(visible, results.length)

  function changeQuery(value: string) {
    setQuery(value)
    setVisible(value.trim() ? 12 : 3)
  }

  function changeMode(nextMode: Mode) {
    setMode(nextMode)
    setVisible(nextMode === 'all' && !query.trim() ? 3 : 12)
  }

  return <div id="language-directory" className="directory" aria-labelledby="directory-title">
    <div className="directory-top"><div><span className="eyebrow">Explore the list</span><h3 id="directory-title">Explore languages <span>across Uganda</span></h3><p>Search Dema’s published district / place and language list.</p></div><div className="directory-ribbon" aria-hidden="true" /></div>
    <div className="directory-search"><Search size={23} aria-hidden="true" /><input type="search" value={query} onChange={event => changeQuery(event.target.value)} aria-label="Search a district, place, or language" placeholder="Search a district or language" />{query && <button type="button" className="directory-clear" aria-label="Clear search" onClick={() => changeQuery('')}><X size={20} /></button>}</div>
    <div className="directory-filters" role="group" aria-label="Directory result type">{modes.map(item => <button key={item.key} type="button" aria-pressed={mode === item.key} className={mode === item.key ? 'active' : ''} onClick={() => changeMode(item.key)}>{item.label}</button>)}</div>
    <p className="directory-count" role="status" aria-live="polite">Showing {count} of {results.length} listed {showingLanguages ? 'languages' : 'districts / places'}</p>
    {results.length ? <div className="directory-results">{showingLanguages ? <><div className="directory-table-head"><span>Language</span><span>Districts / places</span></div>{languageResults.slice(0, visible).map(entry => <article className="directory-row" key={entry.language}><h4>{entry.language}</h4><p>{entry.places.map(place => place.place).join(' · ')}</p></article>)}</> : <><div className="directory-table-head"><span>District / place</span><span>Languages</span></div>{placeResults.slice(0, visible).map(entry => <article className="directory-row" key={entry.number}><h4>{entry.place}</h4><p>{entry.languages.join(' · ')}</p></article>)}</>}</div> : <div className="directory-empty"><p>No matches in Dema’s published list.</p><button type="button" onClick={() => changeQuery('')}>Clear search <ArrowRight size={16} /></button></div>}
    {count < results.length && <button type="button" className="directory-more" onClick={() => setVisible(value => Math.min(value + 12, results.length))}>Show more <ArrowRight size={18} /></button>}
    <p className="directory-note">Based on Dema’s published list of {browsePlaces.length} districts / places and {languages.length} language labels. Contact Dema to confirm local requirements.</p>
  </div>
}
