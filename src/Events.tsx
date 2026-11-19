import { useCallback, useEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, GraduationCap, MapPin, Pause, Play } from 'lucide-react'

type EventItem = { day: string; month: string; year: string; type: string; title: string; person: string; place: string; upcoming: boolean; image: string; blurb: string }

export const events: EventItem[] = [
  { day: '12', month: 'Dec', year: '2026', type: 'Upcoming PhD defence', title: 'Language use in multilingual primary classrooms in Uganda', person: 'PhD candidate supervised by Dr. Medadi Ssentanda', place: 'Makerere University, Kampala', upcoming: true, image: 'meeting', blurb: 'How teachers move between Luganda, English and other local languages to help young learners understand.' },
  { day: '28', month: 'Jan', year: '2027', type: 'Upcoming MA defence', title: 'Translating health messages into Luganda for rural communities', person: 'MA candidate supervised by Dr. Deo Kawalya', place: 'Makerere University, Kampala', upcoming: true, image: 'document', blurb: 'Making sure vital health information is clear, accurate and culturally right for every listener.' },
  { day: '06', month: 'Oct', year: '2026', type: 'Completed defence', title: 'Terminology development in Ugandan local languages', person: 'MA graduate supervised by Dr. Deo Kawalya', place: 'Makerere University, Kampala', upcoming: false, image: 'kampala', blurb: 'Building new words for science and technology so local languages keep growing with the world.' },
]

const DELAY = 6500

export default function Events() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const touch = useRef<number | null>(null)
  const go = useCallback((n: number) => setIndex((n + events.length) % events.length), [])

  useEffect(() => {
    if (!playing) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = window.setTimeout(() => go(index + 1), DELAY)
    return () => window.clearTimeout(t)
  }, [index, playing, go])

  return (
    <section id="events" className="section ev-section">
      <div className="container">
        <div className="ev-head">
          <div>
            <span className="eyebrow">Events</span>
            <h2>What we're working on</h2>
            <p>Upcoming and recent student defences we supervise in the area of languages, plus other news from our work.</p>
          </div>
          <div className="ev-controls">
            <button aria-label="Previous event" onClick={() => go(index - 1)}><ChevronLeft size={20} /></button>
            <button aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying(p => !p)}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
            <button aria-label="Next event" onClick={() => go(index + 1)}><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="ev-stage" aria-roledescription="carousel" aria-live="polite"
          onMouseEnter={() => setPlaying(false)} onMouseLeave={() => setPlaying(true)}
          onTouchStart={e => { touch.current = e.touches[0]?.clientX ?? null }}
          onTouchEnd={e => { if (touch.current == null) return; const dx = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current; if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1)); touch.current = null }}>
          {events.map((ev, i) => (
            <article key={ev.title} className={`ev-slide${i === index ? ' is-active' : ''}`} aria-hidden={i !== index} aria-label={`${i + 1} of ${events.length}`}>
              <img src={`/assets/${ev.image}-1440.webp`} srcSet={`/assets/${ev.image}-720.webp 720w, /assets/${ev.image}-1440.webp 1440w`} sizes="(max-width: 900px) 100vw, 1220px" alt="" loading={i === 0 ? 'eager' : 'lazy'} />
              <div className="ev-shade" />
              <div className="ev-content">
                <div className="ev-tags">
                  <span className={ev.upcoming ? 'ev-pill' : 'ev-pill is-past'}><GraduationCap size={14} /> {ev.type}</span>
                </div>
                <h3>{ev.title}</h3>
                <p className="ev-blurb">{ev.blurb}</p>
                <div className="ev-meta">
                  <span><CalendarDays size={16} /> {ev.day} {ev.month} {ev.year}</span>
                  <span><MapPin size={16} /> {ev.place}</span>
                </div>
                <p className="ev-person">{ev.person}</p>
              </div>
              <div className="ev-date"><strong>{ev.day}</strong><span>{ev.month}</span><em>{ev.year}</em></div>
            </article>
          ))}
          <div className="ev-progress">
            {events.map((ev, i) => (
              <button key={ev.title} aria-label={`Show event ${i + 1}`} className={i === index ? 'is-active' : i < index ? 'is-done' : ''} onClick={() => go(i)}>
                <span style={{ animationDuration: `${DELAY}ms`, animationPlayState: playing ? 'running' : 'paused' }} />
              </button>
            ))}
          </div>
        </div>

        <div className="ev-thumbs">
          {events.map((ev, i) => (
            <button key={ev.title} className={`ev-thumb${i === index ? ' is-active' : ''}`} onClick={() => go(i)}>
              <span className="ev-thumb-date"><strong>{ev.day}</strong>{ev.month}</span>
              <span className="ev-thumb-text"><small>{ev.type}</small>{ev.title}</span>
            </button>
          ))}
        </div>
        <p className="clients-note">Sample entries for the demo. Real events will be added here.</p>
      </div>
    </section>
  )
}
