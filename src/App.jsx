import { useEffect, useState, useRef } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import './App.css'

/* ─── DATA ──────────────────────────────────────────── */
const NAV_LINKS = ['about','experience','education','projects','skills','contact']

const PROJECTS = [
  {
    icon:'🔐', badge:'Python',
    title:'Audio File Encryption / Decryption',
    desc:'Implemented SHA-256 hashing for file-level audio encryption and decryption.',
    detail:'Built a full pipeline in Python that reads raw audio bytes, applies SHA-256 derived keys, and outputs encrypted files unreadable without the correct passphrase. Decryption reverses the process with integrity verification to detect tampering.',
    github: null,
  },
  {
    icon:'🚌', badge:'C++',
    title:'Public Transport Ticketing System',
    desc:"OOP-based simulation of Bucharest's transit network.",
    detail:"Designed a class hierarchy modelling buses, trams, and metro lines. Simulated ticket validation, pass expiry logic, and peak-hour load balancing. Used polymorphism and STL containers throughout for clean, extensible architecture.",
    github: null,
  },
  {
    icon:'♟️', badge:'C++',
    title:'Chess Constraint Solver',
    desc:'Combinatorial solutions including the N-Queens placement algorithm.',
    detail:'Implemented backtracking search with constraint propagation to solve N-Queens for arbitrary board sizes. Extended the solver to handle additional chess piece constraints. Benchmarked performance and applied pruning optimisations to cut runtime significantly.',
    github: null,
  },
  {
    icon:'📄', badge:'C#',
    title:'CV Generator Tool',
    desc:'Utility for automated document generation with structured data output.',
    detail:'A desktop application that takes structured user input and renders a formatted CV document. Used C# with a templating engine to support multiple output formats. Designed with a clean separation between data model and presentation layer.',
    github: null,
  },
  {
    icon:'⚡', badge:'Engineering',
    title:'Step-Down Transformer Design',
    desc:'Designed a transformer from given electrical parameters.',
    detail:'Calculated core dimensions, winding ratios, and insulation requirements for a step-down transformer using electromagnetic theory. Simulated the design in LTspice to verify performance under load. Final design met all specified voltage and current targets.',
    github: null,
  },
  {
    icon:'🤖', badge:'Hardware',
    title:'Arduino & Embedded Systems',
    desc:'Programmed microcontrollers and interfaced peripherals.',
    detail:'Multiple embedded projects: a stepper motor controller with LCD feedback, an ultrasonic distance sensor alarm, a speaker-based tone generator, and a temperature-triggered fan controller. All programmed in C++ on Arduino Uno and Mega platforms.',
    github: null,
  },
]

const SKILLS = [
  { icon:'💻', label:'Programming',       tags:['C++','Python','C#','Java','ORACLE SQL'] },
  { icon:'⚙️', label:'Engineering Tools', tags:['AutoCAD Mechanical','MATLAB','Arduino','LabVIEW','LTspice','Tina-TI','Spyder'] },
  { icon:'🛠️', label:'Other',             tags:['Microsoft Office Suite','Adobe Illustrator','Comax Smart Retail'] },
]

const INTERESTS = [
  {
    icon:'🎸', label:'Music', summary:'Multi-instrumentalist & DJ',
    detail:"I've been playing guitar since my early teens, later picking up bass and drums. Music production became a natural extension — I work in DAWs building original rock and metal tracks, experimenting with tone, arrangement, and mixing. As a DJ I blend genres across electronic and rock, always looking for unexpected combinations.",
  },
  {
    icon:'💪', label:'Sports', summary:'Gym & outdoor fitness',
    detail:'Consistent gym training with a focus on strength and conditioning. Outside the gym I enjoy trail running, cycling, and hiking — anything that combines physical effort with being in nature. Fitness for me is as much about mental discipline as physical performance.',
  },
  {
    icon:'🌄', label:'Travel', summary:'Hiking trips & exploration',
    detail:"I travel to experience new environments, not just new places. Mountain hiking is a favourite — the combination of physical challenge, navigation, and raw scenery is hard to beat. I keep a list of trails and peaks I want to complete across Europe and beyond.",
  },
]

const EDU_DATA = [
  {
    icon:'🎓', date:'2022 – Present',
    title:'BSc Robotics & Industrial Engineering',
    school:'Polytechnic University of Bucharest',
    spec:'Faculty of Industrial Engineering and Robotics',
    bullets:[
      'Core coursework: automation, control systems, CAD/CAM, embedded systems, manufacturing engineering',
      'Arduino Project Lab — designed and built embedded systems including sensor arrays, motor controllers, and display interfaces',
    ],
  },
  {
    icon:'🏫', date:'2017 – 2021',
    title:'Baccalaureate Diploma',
    school:'"Mihail Kogălniceanu" National College',
    spec:'Mathematics–Informatics specialisation',
    bullets:[
      'Strong foundation in mathematics, physics, and computer science',
    ],
  },
]

/* ─── HOOKS ─────────────────────────────────────────── */
function useScrollFade() {
  useEffect(() => {
    const els = document.querySelectorAll('.sf')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.sf:not(.in)'))
          const idx = siblings.indexOf(entry.target)
          setTimeout(() => entry.target.classList.add('in'), Math.min(idx * 80, 400))
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useActiveNav(setActive) {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const io = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [setActive])
}

function useExpand() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open) {
      // double rAF: first frame allows display, second reads correct scrollHeight
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!ref.current) return
          ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
          ref.current.style.opacity = '1'
        })
      })
    } else {
      // pin current height before animating to 0
      if (el.scrollHeight > 0) {
        el.style.maxHeight = el.scrollHeight + 'px'
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!ref.current) return
          ref.current.style.maxHeight = '0px'
          ref.current.style.opacity = '0'
        })
      })
    }
  }, [open])
  return { open, setOpen, ref }
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
}

/* ─── ICONS ─────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.77s.78-1.77 1.75-1.77 1.75.79 1.75 1.77-.78 1.77-1.75 1.77zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
}
function DownloadIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
}
function EmailIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
function GithubIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
}
function ChevronIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease', flexShrink: 0 }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

/* ─── EXPANDABLE COMPONENTS ─────────────────────────── */
function ProjectCard({ p }) {
  const { open, setOpen, ref } = useExpand()
  return (
    <div className={`proj-card sf${open ? ' expanded' : ''}`}>
      <div className="proj-top">
        <span className="proj-icon">{p.icon}</span>
        <span className="proj-badge">{p.badge}</span>
      </div>
      <h3 className="proj-title">{p.title}</h3>
      <p className="proj-desc">{p.desc}</p>
      <div className="expand-body" ref={ref}>
        <p className="expand-text">{p.detail}</p>
      </div>
      <div className="proj-actions">
        <button className="expand-btn" onClick={() => setOpen(o => !o)}>
          <ChevronIcon open={open}/>{open ? 'Show less' : 'Read more'}
        </button>
        {p.github
          ? <a href={p.github} target="_blank" rel="noopener" className="github-btn"><GithubIcon/> View on GitHub</a>
          : <button className="github-btn ghost" disabled><GithubIcon/> GitHub — soon</button>
        }
      </div>
    </div>
  )
}

function ExperienceCard() {
  const { open, setOpen, ref } = useExpand()
  return (
    <div className="tl-card">
      <div className="tl-header">
        <div>
          <h3 className="tl-role">Barista &amp; Assistant Manager</h3>
          <p className="tl-company">5 TO GO EUROPE HOLDING SRL</p>
        </div>
        <span className="tl-date">Mar – Sept 2023</span>
      </div>
      <div className="expand-body" ref={ref}>
        <ul className="tl-bullets">
          <li>Managed transactions and operational data using Comax Smart Retail (ERP/POS) and Excel, maintaining 100% cash-handling accuracy and supporting inventory and sales tracking.</li>
          <li>Improved peak-hour service efficiency by 15–20% through consistent preparation of specialty coffee and beverages.</li>
          <li>Supported shift supervision, team coordination, and opening/closing procedures, developing leadership and workflow management skills.</li>
        </ul>
      </div>
      <button className="expand-btn" style={{marginTop:'1rem'}} onClick={() => setOpen(o => !o)}>
        <ChevronIcon open={open}/>{open ? 'Show less' : 'View responsibilities'}
      </button>
    </div>
  )
}

function EduCard({ e }) {
  const { open, setOpen, ref } = useExpand()
  return (
    <div className="edu-card sf">
      <span className="edu-icon">{e.icon}</span>
      <div style={{width:'100%'}}>
        <span className="edu-date">{e.date}</span>
        <h3 className="edu-title">{e.title}</h3>
        <p className="edu-school">{e.school}</p>
        <p className="edu-spec">{e.spec}</p>
        <div className="expand-body" ref={ref}>
          <ul className="edu-bullets" style={{marginTop:'0.75rem'}}>
            {e.bullets.map(b => <li key={b}>{b}</li>)}
          </ul>
        </div>
        <button className="expand-btn" style={{marginTop:'0.85rem'}} onClick={() => setOpen(o => !o)}>
          <ChevronIcon open={open}/>{open ? 'Show less' : 'View details'}
        </button>
      </div>
    </div>
  )
}

function InterestCard({ item }) {
  const { open, setOpen, ref } = useExpand()
  return (
    <div className={`interest-card${open ? ' expanded' : ''}`}>
      <button className="interest-header" onClick={() => setOpen(o => !o)}>
        <div className="interest-left">
          <span className="interest-icon">{item.icon}</span>
          <div>
            <p className="interest-label">{item.label}</p>
            <p className="interest-summary">{item.summary}</p>
          </div>
        </div>
        <ChevronIcon open={open}/>
      </button>
      <div className="expand-body" ref={ref}>
        <p className="expand-text" style={{padding:'0 1.25rem 1rem'}}>{item.detail}</p>
      </div>
    </div>
  )
}

function MobileMenu({ open, onNav, onClose }) {
  return (
    <div className={`mobile-menu${open ? ' open' : ''}`}>
      {/* tap anywhere outside the links to close */}
      <div className="mobile-menu-backdrop" onClick={onClose} />
      <div className="mobile-menu-inner">
        {NAV_LINKS.map((id, i) => (
          <button key={id} className="mobile-link" style={{'--i': i}} onClick={() => onNav(id)}>
            {id[0].toUpperCase()+id.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── CONTACT FORM ──────────────────────────────────── */
function ContactForm() {
  const [status, setStatus] = useState('')
  async function handleSubmit(e) {
    e.preventDefault()
    const action = e.target.action
    if (action.includes('YOUR_FORMSPREE_ID')) { alert('Replace YOUR_FORMSPREE_ID with your Formspree endpoint.'); return }
    const res = await fetch(action, { method:'POST', body:new FormData(e.target), headers:{ Accept:'application/json' } })
    setStatus(res.ok ? 'sent' : 'error')
    if (res.ok) e.target.reset()
  }
  return (
    <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" onSubmit={handleSubmit} className="contact-form sf">
      <div className="form-group"><label htmlFor="cf-name">Name</label><input type="text" id="cf-name" name="name" placeholder="Your name" required /></div>
      <div className="form-group"><label htmlFor="cf-email">Email</label><input type="email" id="cf-email" name="email" placeholder="your@email.com" required /></div>
      <div className="form-group"><label htmlFor="cf-msg">Message</label><textarea id="cf-msg" name="message" rows={5} placeholder="What's on your mind?" required /></div>
      {status==='sent'  && <p className="form-ok">Message sent! I'll get back to you soon.</p>}
      {status==='error' && <p className="form-err">Something went wrong. Please try again.</p>}
      <button type="submit" className="btn btn-primary btn-full">Send Message</button>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [theme,     setTheme]     = useState(() => localStorage.getItem('cv-theme') || 'dark')
  const [activeNav, setActiveNav] = useState('')

  useScrollFade()
  useActiveNav(setActiveNav)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cv-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNav(id) { scrollTo(id); setMenuOpen(false) }

  return (
    <div className="app">

      {/* BACKGROUND */}
      <div className="bg-wrap">
        <ShaderGradientCanvas style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} pointerEvents="none">
          <ShaderGradient
            animate="on" brightness={1.4}
            cAzimuthAngle={180} cDistance={1.7} cPolarAngle={90} cameraZoom={1}
            color1="#28714D" color2="#0D261A" color3="#68CA99"
            envPreset="city" fov={80} frameRate={10} grain="off" lightType="3d"
            pixelDensity={1} positionX={-1.4} positionY={0} positionZ={0}
            rotationX={0} rotationY={10} rotationZ={50}
            type="plane" uAmplitude={1} uDensity={5.7} uFrequency={5.5}
            uSpeed={0.2} uStrength={2.1} uTime={0} wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo-wrap">
            <a href="./" className="nav-logo-link" aria-label="Home">
              <img src="tahlogo.svg" alt="TAH" className="nav-logo-img"
                onError={e => { e.target.style.display='none'; e.target.nextElementSibling.style.display='block' }} />
              <span className="nav-logo-fb" style={{display:'none'}}>T.A.H</span>
            </a>
          </div>
          <ul className="nav-links">
            {NAV_LINKS.map(id => (
              <li key={id}>
                <button className={`nav-link${activeNav===id?' active':''}`} onClick={() => handleNav(id)}>
                  {id[0].toUpperCase()+id.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <button className="theme-btn" onClick={() => setTheme(t => t==='dark'?'light':'dark')} aria-label="Toggle theme">
              {theme==='dark' ? <SunIcon/> : <MoonIcon/>}
            </button>
            <button className={`hamburger${menuOpen?' open':''}`} onClick={() => setMenuOpen(o=>!o)} aria-label="Menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
        <MobileMenu open={menuOpen} onNav={handleNav} onClose={() => setMenuOpen(false)}/>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-inner">
          <div className="photo-wrap anim" style={{'--d':'0s'}}>
            <div className="photo">
              <img src="profile.jpg" alt="Tudor-Andrei Hălășag"
                onError={e => { e.target.style.display='none'; e.target.parentElement.classList.add('photo-ph') }}/>
            </div>
            <div className="photo-ring"/>
          </div>
          <p className="eyebrow anim" style={{'--d':'0.1s'}}>Bucharest, Romania</p>
          <h1 className="hero-name anim" style={{'--d':'0.2s'}}>
            Tudor-Andrei<br/><span className="accent">Hălășag</span>
          </h1>
          <p className="hero-title anim" style={{'--d':'0.35s'}}>Robotics &amp; Industrial Engineering Student</p>
          <p className="hero-tagline anim" style={{'--d':'0.5s'}}>Where precision meets creativity.</p>
          <div className="hero-btns anim" style={{'--d':'0.65s'}}>
            <a href="https://www.linkedin.com/in/tudor-halasag/" target="_blank" rel="noopener" className="btn btn-primary"><LinkedInIcon/> LinkedIn</a>
            <a href="cv.pdf" download className="btn btn-outline"><DownloadIcon/> Download CV</a>
            <a href="mailto:tudor.halasag@gmail.com" className="btn btn-outline"><EmailIcon/> Email</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <p className="sec-label sf">01 / About</p>
          <div className="about-grid">
            <h2 className="sec-heading sf">Who I am</h2>
            <div className="about-body sf">
              <p>Robotics and Industrial Engineering student with hands-on programming experience in C++, Python, and C#, practical skills in CAD design (Autodesk Inventor, AutoCAD Mechanical), simulation (MATLAB), and embedded systems (Arduino). I enjoy building things — whether that's writing code, designing systems, or solving engineering problems from scratch.</p>
              <p>Committed to continuous self-development through independent projects, I bring a detail-focused and analytically minded approach to everything I work on.</p>
              <div className="stats">
                {[['6+','Personal Projects'],['5+','Languages / Tools'],['C2','English Level']].map(([n,l])=>(
                  <div key={l} className="stat sf"><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
                ))}
              </div>
              <div className="about-photo-wrap sf">
                <div className="about-photo-inner">
                  <img src="photo.jpg" alt="Tudor-Andrei Hălășag" className="about-photo"
                    onError={e => { e.target.parentElement.parentElement.style.display='none' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="container">
          <p className="sec-label sf">02 / Experience</p>
          <h2 className="sec-heading sf">Work Experience</h2>
          <div className="timeline sf">
            <div className="tl-dot"/>
            <ExperienceCard/>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <div className="container">
          <p className="sec-label sf">03 / Education</p>
          <h2 className="sec-heading sf">Education</h2>
          <div className="edu-grid">
            {EDU_DATA.map(e => <EduCard key={e.title} e={e}/>)}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="container">
          <p className="sec-label sf">04 / Projects</p>
          <h2 className="sec-heading sf">Selected Projects</h2>
          <div className="proj-grid">
            {PROJECTS.map(p => <ProjectCard key={p.title} p={p}/>)}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="container">
          <p className="sec-label sf">05 / Skills</p>
          <h2 className="sec-heading sf">Skills &amp; Tools</h2>
          <div className="skills-groups">
            {SKILLS.map(g=>(
              <div key={g.label} className="skill-group sf">
                <h3 className="skill-group-title"><span>{g.icon}</span> {g.label}</h3>
                <div className="skill-tags">{g.tags.map(t=><span key={t} className="skill-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGES & INTERESTS */}
      <section id="languages" className="section">
        <div className="container">
          <p className="sec-label sf">06 / More</p>
          <h2 className="sec-heading sf">Languages &amp; Interests</h2>
          <div className="li-grid">
            <div className="li-card sf">
              <h3 className="card-sub">🌍 Languages</h3>
              <ul className="lang-list">
                {[{name:'Romanian',level:'Native',cls:'native'},{name:'English',level:'C2 — Cambridge Certificate',cls:'c2'},{name:'Italian',level:'A2 — Self-learning',cls:'a2'}].map(l=>(
                  <li key={l.name}><span className="lang-name">{l.name}</span><span className={`lang-lvl ${l.cls}`}>{l.level}</span></li>
                ))}
              </ul>
            </div>
            <div className="li-card sf">
              <h3 className="card-sub">✨ Interests</h3>
              <div className="interests-stack">
                {INTERESTS.map(item => <InterestCard key={item.label} item={item}/>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="container">
          <p className="sec-label sf">07 / Contact</p>
          <h2 className="sec-heading sf">Get in Touch</h2>
          <div className="contact-grid">
            <div className="contact-info sf">
              <p className="contact-blurb">Open to internship opportunities, engineering challenges, and interesting conversations. Don't hesitate to reach out.</p>
              <div className="contact-links">
                <a href="mailto:tudor.halasag@gmail.com" className="contact-link"><EmailIcon/> tudor.halasag@gmail.com</a>
                <a href="https://www.linkedin.com/in/tudor-halasag/" target="_blank" rel="noopener" className="contact-link"><LinkedInIcon/> LinkedIn Profile</a>
              </div>
            </div>
            <ContactForm/>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
  <div className="container footer-inner">
    <a href="./" className="footer-logo-link" aria-label="Home">
      <img src="tahlogo.svg" alt="TAH" className="footer-logo-img"
        onError={e => { e.target.style.display='none' }} />
    </a>
    <span className="footer-sep">·</span>
    <span>© 2026 Tudor-Andrei Hălășag</span>
    <span className="footer-sep">·</span>
    <span>Built with care</span>
  </div>
</footer>
    </div>
  )
}
