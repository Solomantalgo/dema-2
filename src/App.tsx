import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, ChevronDown, ClipboardCheck, Facebook, FilePenLine, Lightbulb, Linkedin, Mail, MapPin, Menu, MessageCircle, Phone, Twitter, X } from 'lucide-react'
import Events from './Events'
import LanguageDirectory from './LanguageDirectory'

const asset = (name: string, size = 1440) => `/assets/${name}-${size}.webp`
const quote = 'mailto:info@demalanguages.com?subject=Language%20services%20quote%20request'

type Choice = 'Document' | 'Live Event' | 'Recording' | 'Website'
const finder: Record<Choice, { service: string; title: string; description: string }> = {
  Document: { service: 'Translation', title: 'Translation for documents', description: 'Make written information clear and culturally appropriate for the people who need it.' },
  'Live Event': { service: 'Interpretation', title: 'Interpretation for live conversations', description: 'Help people understand one another in meetings, events and other live settings.' },
  Recording: { service: 'Transcription', title: 'Transcription for recordings', description: 'Turn spoken audio or video into useful written material.' },
  Website: { service: 'Localization', title: 'Localization for digital content', description: 'Adapt a website or app so its message feels natural to a new audience.' },
}

const services: { name: string; copy: string; choice?: Choice }[] = [
  { name: 'Translation', copy: 'Accurate, thoughtful written translation for documents and everyday communication.', choice: 'Document' },
  { name: 'Transcription', copy: 'Clear written scripts from audio and video recordings, trusted by leading organisations and Ugandan courts.', choice: 'Recording' },
  { name: 'Interpretation', copy: 'Clear communication across languages in meetings, events and appointments.', choice: 'Live Event' },
  { name: 'Localization', copy: 'Website and app content adapted for the people you want to reach.', choice: 'Website' },
  { name: 'Editing & Proofreading', copy: 'A careful final eye for documents that need to read clearly and confidently.' },
  { name: 'Language Teaching', copy: 'Practical language learning shaped around individual and group needs.' },
]

function Picture({ name, alt, className = '', eager = false }: { name: string; alt: string; className?: string; eager?: boolean }) {
  return <img className={className} src={asset(name, name === 'winnie' ? 720 : 1440)} srcSet={name === 'winnie' ? undefined : `${asset(name, 720)} 720w, ${asset(name, 1440)} 1440w`} sizes="(max-width: 700px) 100vw, 50vw" alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} />
}

function Brand({ header = false }: { header?: boolean }) {
  return <a className={header ? 'brand brand-header brand-lockup' : 'brand brand-lockup'} href="#top" aria-label="Dema Language Solutions, home"><span className="brand-mark"><img src="/assets/dema-mark.png" alt="" width="150" height="119" /></span><span className="brand-wordmark">Dema Language Solutions</span></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(() => window.location.hash || '#top')
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const onScroll = () => setScrolled(window.scrollY > 12)
    const onHash = () => setActive(window.location.hash || '#top')
    window.addEventListener('keydown', close)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', onHash)
    onScroll()
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('scroll', onScroll); window.removeEventListener('hashchange', onHash) }
  }, [])
  const nav = [['Home', '#top'], ['Services', '#services'], ['Languages', '#languages'], ['About', '#team'], ['Events', '#events'], ['Contact', '#contact']]
  return <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}><div className="container header-inner"><Brand header /><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="main-nav" className={open ? 'nav is-open' : 'nav'} aria-label="Main navigation"><div className="nav-track">{nav.map(([label, href]) => <a key={href} className={active === href ? 'is-active' : undefined} aria-current={active === href ? 'page' : undefined} href={href} onClick={() => setOpen(false)}>{label}</a>)}</div><a className="nav-quote" href="#contact" onClick={() => setOpen(false)}>Request a Quote <ArrowRight size={16} /></a></nav></div></header>
}

function SectionIntro({ eyebrow, title, copy, center = false }: { eyebrow: string; title: string; copy?: string; center?: boolean }) {
  return <div className={center ? 'section-intro centered' : 'section-intro'}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function Hero({ onPick }: { onPick: (choice: Choice) => void }) {
  const pickService = (choice: Choice) => { onPick(choice); requestAnimationFrame(() => (document.querySelector('#find-service .finder-option.selected') as HTMLElement | null)?.focus({ preventScroll: true })) }
  const labels: { name: string; choice: Choice }[] = [{ name: 'Translation', choice: 'Document' }, { name: 'Transcription', choice: 'Recording' }, { name: 'Interpretation', choice: 'Live Event' }, { name: 'Localization', choice: 'Website' }]
  return <section id="top" className="hero"><div className="container hero-grid"><div className="hero-copy"><h1>Every word<br />opens a <em>connection.</em></h1><p>Professional translation, transcription, interpretation and localization for people and organisations across Uganda.</p><div className="hero-actions"><a className="button button-red" href="#contact">Request a Quote <ArrowRight size={20} /></a><a className="button button-outline" href="#services">Explore Services <ArrowRight size={20} /></a></div></div><div className="hero-visual"><div className="hero-peach" aria-hidden="true" /><div className="hero-rings" aria-hidden="true" /><div className="hero-photo"><Picture name="hero" alt="Illustrative scene of two people discussing a document" eager /></div><div className="hero-inset"><Picture name="document" alt="Illustrative close-up of a document being reviewed" eager /></div><div className="hero-service-labels" aria-label="Explore a service">{labels.map(({ name, choice }) => <a key={name} href="#find-service" onClick={() => pickService(choice)}>{name}</a>)}</div></div></div><div className="container hero-proof"><span>Trusted by organisations in Uganda</span><div><strong>AFAAS</strong><i /><strong>Uganda Law Society</strong><i /><strong>FHI 360</strong></div></div></section>
}

function Services({ onPick }: { onPick: (choice: Choice) => void }) {
  return <section id="services" className="section services-section"><div className="container"><SectionIntro eyebrow="What we do" title="Language support for every message" copy="The right language service helps your message reach people clearly, wherever the conversation begins." /><div className="services-showcase"><div className="services-photo"><Picture name="services" alt="Illustrative scene of two women discussing a document" /></div><div className="services-list">{services.map(({ name, copy, choice }) => <a className="service-row" key={name} href={choice ? '#find-service' : '#contact'} onClick={() => choice && onPick(choice)}><span className="service-row-copy"><h3>{name}</h3><p>{copy}</p></span><ArrowRight className="service-row-arrow" size={21} aria-hidden="true" /></a>)}</div></div></div></section>
}

const finderPrompts: Record<Choice, string> = { Document: 'A file to translate?', 'Live Event': 'A conversation to connect?', Recording: 'Audio to turn into text?', Website: 'A site for a new audience?' }

function ServiceFinder({ choice, setChoice }: { choice: Choice; setChoice: (choice: Choice) => void }) {
  const result = finder[choice]
  return <section id="find-service" className="section finder-section"><div className="container"><div className="finder-head"><span className="eyebrow light">Find your service</span><h2>What do you need to <em>communicate?</em></h2><p>Choose what you're working with and see how we can help.</p></div><div className="finder-layout"><div className="finder-options" role="group" aria-label="Choose a communication need">{(Object.keys(finder) as Choice[]).map(item => <button key={item} type="button" className={choice === item ? 'finder-option selected' : 'finder-option'} aria-label={item} aria-pressed={choice === item} onClick={() => setChoice(item)}><span className="finder-option-copy"><strong>{item}</strong><span>{finderPrompts[item]}</span></span><span className="option-check" aria-hidden="true"><Check size={19} /></span></button>)}</div><div className="finder-result" aria-live="polite"><div className="finder-result-copy"><span className="result-label">A service to explore · {result.service}</span><h3>{result.title}</h3><p>{result.description}</p></div><div className="finder-art" aria-hidden="true"><span className="finder-paper">A</span></div><a className="button button-red" href="#contact">Request a Quote <ArrowRight size={20} /></a></div></div></div></section>
}

function LanguagesSection() {
  return <section id="languages" className="section languages-section"><div className="container"><div className="language-intro"><SectionIntro eyebrow="Language expertise" title="Rooted in Uganda. Connected through language." copy="Local language knowledge and cultural context help make communication more meaningful. Tell us who you need to reach and we'll discuss the right approach." /><a className="text-link" href="#contact">Ask about your language <ArrowRight size={18} /></a></div><div className="language-diptych"><div className="atlas-panel"><img className="atlas-map" src="/assets/uganda-outline.svg" alt="Geographic silhouette of Uganda" width="320" height="360" loading="lazy" /><div className="atlas-examples"><p>Examples of languages featured by Dema</p><ul>{['Luganda', 'Runyankore', 'Acholi', 'Lusoga'].map(language => <li key={language}>{language}</li>)}</ul></div></div><figure className="atlas-photo"><Picture name="kampala" alt="Panoramic view across Kampala, Uganda" /><figcaption><strong>Kampala, Uganda</strong><span>Photo: <a href="https://commons.wikimedia.org/wiki/File:View_of_Kampala_city_1.jpg" target="_blank" rel="noopener noreferrer">Dr. S-mon</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></span></figcaption></figure></div><LanguageDirectory /></div></section>
}

function Approach() {
  const steps = [{ number: '01', title: 'Share your brief', copy: 'Tell us what you need, who it is for and the languages involved.', icon: FilePenLine }, { number: '02', title: 'Agree the approach', copy: 'We’ll discuss the service and scope that fit your request.', icon: Lightbulb }, { number: '03', title: 'Receive your work', copy: 'Get your completed language work in the agreed format.', icon: ClipboardCheck }]
  return <section id="approach" className="section approach-section"><div className="container approach-layout"><SectionIntro eyebrow="How it works" title="A clear path from request to result" copy="Tell us what you need. We'll help shape the right language solution." /><div className="steps">{steps.map(({ number, title, copy, icon: Icon }) => <div className="step" key={number}><span className="step-number">{number}</span><Icon className="step-icon" size={35} strokeWidth={1.7} /><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="approach-photo"><Picture name="document" alt="Illustrative scene of people reviewing a document together" /><span className="photo-label">A thoughtful process</span></div></div></section>
}

function Team() {
  const members = [{ name: 'Dr. Deo Kawalya', image: 'kawalya', alt: 'Portrait of Dr. Deo Kawalya' }, { name: 'Dr. Medadi Ssentanda', image: 'medadi', alt: 'Portrait of Dr. Medadi Ssentanda' }]
  return <section id="team" className="section team-section"><div className="container"><div className="team-heading"><SectionIntro eyebrow="Our team" title="People who know the power of language" copy="Meet the people behind Dema Language Solutions." /></div><div className="team-grid">{members.map(member => <article className="team-card" key={member.name}><div className="portrait"><Picture name={member.image} alt={member.alt} /></div><div className="team-card-body"><h3>{member.name}</h3></div></article>)}</div></div></section>
}

type Client = { name: string; logo?: string; sector?: string }
const rawLogo = (name: string) => `https://raw.githubusercontent.com/Solomantalgo/dema-2/main/LOGOS-DEMA/${name}`
const clients: Client[] = [
  { name: 'AFAAS', logo: rawLogo('AFAAS.png'), sector: 'Agricultural advisory' },
  { name: 'Penal Reform International', logo: rawLogo('PENAL%20REFORM%20INTERNATIONAL-Photoroom.png'), sector: 'Justice reform' },
  { name: 'Marie Stopes Uganda', logo: rawLogo('MARIE%20STOPES.webp'), sector: 'Health' },
  { name: 'Justice Centres Uganda', logo: rawLogo('JUSTICE%20CENTERS%20UGANDA-Photoroom.png'), sector: 'Justice' },
  { name: 'Uganda Law Society', logo: rawLogo('UGANDA%20LAW%20SOCIETY.png'), sector: 'Legal profession' },
  { name: 'FHI 360', logo: rawLogo('fhi360-logo.svg'), sector: 'Public health' },
]


function Clients() {
  return <section id="clients" className="section clients-section"><style>{`.client-logo-card{min-width:0;width:100%;min-height:176px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;padding:18px 20px 14px;border:1px solid #eadce8;border-radius:23px;background:#fff;box-shadow:0 8px 24px rgba(45,12,86,.055);transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}.client-logo-card:hover,.client-logo-card:focus-visible{transform:translateY(-3px);border-color:#d9bfdd;box-shadow:0 14px 30px rgba(45,12,86,.10)}.client-logo-wrap{width:100%;max-width:100%;min-width:0;height:105px;display:flex;align-items:center;justify-content:center;overflow:hidden}.client-logo{display:block;width:100%;max-width:100%;min-width:0;height:105px;object-fit:contain;object-position:center;filter:grayscale(.88) saturate(.7);opacity:.72;transition:filter .22s ease,opacity .22s ease,transform .22s ease}.client-logo-card:hover .client-logo,.client-logo-card:focus-visible .client-logo{filter:grayscale(0) saturate(1);opacity:1;transform:scale(1.025)}.client-sector{margin:0;color:#625867;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;text-align:center;line-height:1.35}@media(max-width:780px){.clients-section,.clients-section .container{width:100%;min-width:0}.clients-grid{width:100%;min-width:0;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.client-logo-card{padding-inline:clamp(10px,4vw,20px)}}@media(max-width:550px){.client-logo-card{min-height:158px;padding:14px 10px 12px}.client-logo-wrap,.client-logo{height:92px}.client-sector{font-size:.66rem}}@media(hover:none),(pointer:coarse){.client-logo{filter:none!important;opacity:1!important}}@media(prefers-reduced-motion:reduce){.client-logo-card,.client-logo{transition:none!important}.client-logo-card:hover,.client-logo-card:focus-visible{transform:none}}`}</style><div className="container"><SectionIntro eyebrow="Our clients" title="Trusted for meaningful work" copy="Organisations that have turned to Dema for language support." center /><div className="clients-grid">{clients.map(client => <article className="client-name client-logo-card" key={client.name} tabIndex={0}><div className="client-logo-wrap">{client.logo ? <img className="client-logo" src={client.logo} alt={`${client.name} logo`} width="320" height="105" loading="lazy" /> : <span>{client.name}</span>}</div>{client.sector && <p className="client-sector">{client.sector}</p>}</article>)}</div><p className="clients-note">Selected clients listed by Dema.</p></div></section>
}

function Contact() {
  return <section id="contact" className="contact-section"><div className="container"><div className="contact-panel"><span className="eyebrow light">Let’s connect</span><h2>Let’s bring your message<br />to more people.</h2><p>Tell us about your project and we'll help you find the right language service.</p><div className="contact-actions"><a className="button button-red" href={quote}>Request a Quote <ArrowRight size={20} /></a><a className="button button-ghost" href="mailto:info@demalanguages.com">Email Dema <Mail size={18} /></a></div></div></div></section>
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div className="footer-about"><Brand /><p>Translation and interpretation that help communities and organisations communicate clearly in Uganda.</p><nav className="footer-social" aria-label="Dema on social media"><a href="https://www.facebook.com/profile.php?id=100067927387260" target="_blank" rel="noopener noreferrer" aria-label="Dema on Facebook"><Facebook size={18} aria-hidden="true" /></a><a href="https://x.com/dema_solutions" target="_blank" rel="noopener noreferrer" aria-label="Dema on X (Twitter)"><Twitter size={18} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/dema-langauge-solutions-22447427b" target="_blank" rel="noopener noreferrer" aria-label="Dema on LinkedIn"><Linkedin size={18} aria-hidden="true" /></a><a href="mailto:info@demalanguages.com" aria-label="Email Dema"><Mail size={18} aria-hidden="true" /></a></nav></div><div><h3>Explore</h3><a href="#services">Services</a><a href="#find-service">Find a service</a><a href="#languages">Languages</a><a href="#approach">Our approach</a></div><div><h3>About</h3><a href="#team">Our team</a><a href="#events">Events</a><a href="#clients">Our clients</a><a href="#contact">Contact</a></div><div><h3>Get in touch</h3><a href="mailto:info@demalanguages.com"><Mail size={16} /> info@demalanguages.com</a><a href="tel:+256782374210"><Phone size={16} /> 0782 374 210</a><a href="tel:+256702442470"><Phone size={16} /> 0702 442 470</a><span className="footer-location"><MapPin size={16} /> Sir Apollo Kaggwa Road, opposite Stabex</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Dema Language Solutions. All rights reserved.</span><a href="#top">Back to top <ChevronDown size={14} /></a></div></footer>
}

function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const targets = [document.querySelector('#contact'), document.querySelector('.footer')].filter((target): target is Element => Boolean(target))
    if (!targets.length || !('IntersectionObserver' in window)) return
    const visible = new Set<Element>()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target))
      setNearFooter(visible.size > 0)
      if (visible.size > 0) setOpen(false)
    }, { threshold: 0.04 })
    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        rootRef.current?.querySelector<HTMLButtonElement>('.contact-fab-toggle')?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  if (nearFooter) return null
  return <div className={open ? 'contact-fab is-open' : 'contact-fab'} ref={rootRef}>
    <button type="button" className="contact-fab-toggle" aria-label={open ? 'Close contact options' : 'Open contact options'} aria-expanded={open} aria-controls="contact-fab-panel" onClick={() => setOpen(value => !value)}><MessageCircle size={25} aria-hidden="true" /></button>
    <section id="contact-fab-panel" className="contact-fab-panel" aria-labelledby="contact-fab-title" hidden={!open}>
      <div className="contact-fab-panel-heading"><h2 id="contact-fab-title">How can we help?</h2><button type="button" className="contact-fab-close" onClick={() => { setOpen(false); rootRef.current?.querySelector<HTMLButtonElement>('.contact-fab-toggle')?.focus() }} aria-label="Close contact options"><X size={18} /></button></div>
      <div className="contact-fab-actions">
        <a href="https://wa.me/256702442470" target="_blank" rel="noopener noreferrer"><span className="contact-fab-icon whatsapp-icon"><MessageCircle size={21} aria-hidden="true" /></span><span><strong>WhatsApp</strong><small>Chat with us on WhatsApp</small></span><ArrowRight size={17} aria-hidden="true" /></a>
        <a href="mailto:info@demalanguages.com"><span className="contact-fab-icon"><Mail size={20} aria-hidden="true" /></span><span><strong>Email</strong><small>Send us an email</small></span><ArrowRight size={17} aria-hidden="true" /></a>
        <a href="tel:+256702442470"><span className="contact-fab-icon"><Phone size={20} aria-hidden="true" /></span><span><strong>Call</strong><small>Speak with our team</small></span><ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </section>
  </div>
}

export default function App() {
  const [choice, setChoice] = useState<Choice>('Document')
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero onPick={setChoice} /><Services onPick={setChoice} /><ServiceFinder choice={choice} setChoice={setChoice} /><LanguagesSection /><Approach /><Team /><Events /><Clients /><Contact /></main><Footer /><FloatingContact /></>
}
