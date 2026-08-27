import { useEffect, useState, useRef } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import './App.css'

/* ═══════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════ */
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
function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.77s.78-1.77 1.75-1.77 1.75.79 1.75 1.77-.78 1.77-1.75 1.77zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/>
    </svg>
  )
}
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}
function EmailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
function DownloadIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}
function WorksIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}
function ExternalIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}
function CloseIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
function ChevronIcon({ open, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease', flexShrink: 0 }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const SOCIAL_LINKS = [
  { id: 'linkedin',  label: 'LinkedIn',   href: 'https://www.linkedin.com/in/tudor-halasag/', Icon: LinkedInIcon  },
  { id: 'github',    label: 'GitHub',     href: 'https://github.com/tudor-halasag',           Icon: GithubIcon   },
  { id: 'instagram', label: 'Instagram',  href: 'https://instagram.com/tud.or.exe',            Icon: InstagramIcon },
  { id: 'works',     label: 'Works',      href: 'https://tudor-halasag.github.io/works',       Icon: WorksIcon    },
  { id: 'email',     label: 'Email',      href: 'mailto:tudor.halasag@gmail.com',              Icon: EmailIcon    },
]

const NAV_SECTIONS = [
  { id: 'about',        label: 'About',        num: '01' },
  { id: 'experience',   label: 'Experience',   num: '02' },
  { id: 'blog',         label: 'Blog',         num: '03' },
  { id: 'education',    label: 'Education',    num: '04' },
  { id: 'projects',     label: 'Projects',     num: '05' },
  { id: 'skills',       label: 'Skills',       num: '06' },
  { id: 'languages',    label: 'Languages',    num: '07' },
  { id: 'contact',      label: 'Contact',      num: '08' },
  { id: 'verification', label: 'Verification', num: '09' },
]

const PROJECTS = [
  {
    icon: '🔐', badge: 'Python',
    title: 'Audio File Encryption / Decryption',
    desc: 'Full file-level encryption tool built from scratch using SHA-256 hashing.',
    detail: 'Built a complete pipeline in Python that reads raw audio bytes, derives keys via SHA-256, and outputs encrypted files unreadable without the correct passphrase. Decryption reverses the process with integrity verification to detect tampering. Every component implemented independently — no encryption libraries used.',
    github: null,
  },
  {
    icon: '🚌', badge: 'C++',
    title: 'Public Transport Ticketing System',
    desc: 'OOP simulation of Bucharest\'s full transit network — metro, tram, bus.',
    detail: 'Designed a class hierarchy modelling buses, trams, and metro lines across Bucharest. Simulated ticket validation, pass expiry logic, and peak-hour load balancing. Used polymorphism and STL containers throughout for clean, extensible architecture. Built to reflect how the real network actually operates.',
    github: null,
  },
  {
    icon: '♟️', badge: 'C++',
    title: 'Chess Constraint Solver',
    desc: 'Backtracking solver for N-Queens and related combinatorial problems.',
    detail: 'Implemented backtracking search with constraint propagation to solve N-Queens for arbitrary board sizes. Extended the solver to handle additional chess piece constraints. Benchmarked performance against naive approaches and applied pruning optimisations that cut runtime significantly at scale.',
    github: null,
  },
  {
    icon: '📄', badge: 'C#',
    title: 'CV Generator Tool',
    desc: 'Desktop utility for automated document generation from structured input.',
    detail: 'A desktop application that takes structured user input and renders a formatted CV document. Built with a clean separation between data model and presentation layer, supporting multiple output formats. Designed to be reusable and extensible — not a one-off script.',
    github: null,
  },
  {
    icon: '⚡', badge: 'Engineering',
    title: 'Step-Down Transformer Design',
    desc: 'Designed a functional transformer from given electrical parameters — scratch to spec.',
    detail: 'Calculated core dimensions, winding ratios, and insulation requirements using electromagnetic theory. Simulated the design in LTspice to verify performance under load. Final design met all specified voltage and current targets. Applied theoretical knowledge from coursework to a concrete, testable output.',
    github: null,
  },
  {
    icon: '🤖', badge: 'Hardware',
    title: 'Arduino & Embedded Systems',
    desc: 'Multiple embedded projects — microcontrollers, sensors, motors, displays.',
    detail: 'A series of embedded projects on Arduino Uno and Mega: a stepper motor controller with LCD feedback, an ultrasonic distance sensor alarm, a speaker-based tone generator, and a temperature-triggered fan controller. All programmed in C++ — hands-on embedded I/O, peripheral interfacing, and basic memory management throughout.',
    github: null,
  },
]

const SKILLS = [
  { icon: '💻', label: 'Programming',       tags: ['C / C++', 'Python', 'C#', 'Java', 'ORACLE SQL'] },
  { icon: '⚙️', label: 'Engineering Tools', tags: ['AutoCAD Mechanical', 'Autodesk Inventor', 'MATLAB', 'Arduino', 'LabVIEW', 'LTspice', 'Tina-TI'] },
  { icon: '🌐', label: 'Web',               tags: ['React', 'JavaScript', 'HTML / CSS', 'Vite'] },
  { icon: '🛠️', label: 'Other',             tags: ['Adobe Illustrator', 'Comax Smart Retail (ERP/POS)'] },
]

const INTERESTS = [
  {
    icon: '🥁', label: 'Music', summary: 'Multi-instrumentalist & DJ',
    detail: "It started with drums — self-taught at home, basic percussion. That led to music school, running in parallel with high school, where I spent two years on drums and music theory. The most important thing I learned there wasn't how to play drums. It was how to learn any instrument. That lesson stuck. Guitar came next, then bass, piano, and eventually DJing — consoles, trackpads, the whole thing. All self-taught, all at home, all because the process of learning itself became the point.",
  },
  {
    icon: '🏃', label: 'Sports', summary: 'Gym, running & outdoor fitness',
    detail: "I spend as little time indoors as possible. Gym work covers the structured side — strength, conditioning, consistency. Outside is where the rest happens: walks, running, anything that gets me moving in actual air. Eating well and training regularly aren't goals for me — they're just how I operate. Feeling good physically is directly tied to everything else working properly.",
  },
  {
    icon: '🌍', label: 'Travel', summary: 'People, cultures & exchange',
    detail: "I travel to meet people, not to visit places. Programs like Erasmus matter to me because they put you in rooms with people from completely different backgrounds and force real exchange — not the tourist version of a culture, but the actual one. Bourdain said it best: \"Travel changes you. As you move through this life and this world you change things slightly, you leave marks behind, however small. And in return, life — and travel — leaves marks on you.\"",
  },
  {
    icon: '🏔️', label: 'Hiking', summary: 'Trails, peaks & raw scenery',
    detail: "I travel to experience new environments, not just new places. Mountain hiking is a favourite — the combination of physical challenge, navigation, and raw scenery is hard to beat. It hits different when you're surrounded by the right people. I keep a running list of trails and peaks to complete across Romania and beyond — it only ever gets longer.",
  },
]

const EDU_DATA = [
  {
    icon: '🎓', date: '2022 – Present',
    title: 'BSc Robotics & Industrial Engineering',
    school: 'Polytechnic University of Bucharest',
    spec: 'Faculty of Industrial Engineering and Robotics',
    bullets: [
      'Core coursework in automation, control systems, CAD/CAM, embedded systems, and manufacturing engineering — applied through hands-on lab work and real engineering problem-solving.',
      'Architected and deployed embedded systems projects in Arduino lab, including sensor arrays, motor controllers, and display interfaces — bridging hardware and software from the ground up.',
      'Strong mathematical and physics foundation underpinning all technical work across programming, simulation, and design.',
    ],
  },
  {
    icon: '🏫', date: '2017 – 2021',
    title: 'Baccalaureate Diploma',
    school: '"Mihail Kogălniceanu" National College',
    spec: 'Mathematics–Informatics specialisation',
    bullets: [
      'Intensive track in advanced mathematics, developing the analytical rigour that underpins every technical project undertaken since.',
      'Built a foundational command of programming and algorithms through C++ and Python — skills that were subsequently self-extended far beyond the curriculum.',
    ],
  },
]

const EXPERIENCE_DATA = [
  {
    role: 'Barista & Operations Lead',
    company: '5 TO GO EUROPE HOLDING SRL',
    date: 'Mar – Sept 2023',
    bullets: [
      'Directed high-volume retail operations with 100% cash-handling accuracy — managed ERP/POS data using Comax Smart Retail and Excel, supporting inventory tracking and financial reporting.',
      'Consistently optimised service workflow during peak hours, improving efficiency by 15–20% through disciplined preparation and process management.',
      'Trusted with shift leadership, team coordination, and full opening/closing responsibility — demonstrating operational reliability and management composure under pressure.',
    ],
    story: [
      'Six months in a coffee chain that operates like a machine — and that\'s not a criticism.',
      '5 To Go runs on volume. Peak hours mean fifteen orders in parallel, no margin for error, and a team that has to trust each other completely. I went in expecting a summer job. I came out understanding operations from the inside.',
      'The ERP system — Comax Smart Retail — became second nature within the first few weeks. Inventory, financial reporting, end-of-day reconciliation: all of it running through a system that penalises every shortcut. I didn\'t just use it — I became the person others came to when something didn\'t add up.',
      'Shift leadership wasn\'t assigned. It happened because I showed up early, understood the workflow, and stayed after to fix what needed fixing. By month three, I was running openings and closings alone.',
      'The lesson wasn\'t about coffee. It was about what happens when you put rigour into a high-pressure environment. Efficiency comes from preparation, not from moving faster. And composure is a skill — one you can build deliberately.',
      'I left in September for the next university year. The habits stayed.',
    ],
  },
]

const BLOG_POSTS = [
  {
    id: 1,
    title: 'What six months behind a counter taught me about engineering',
    date: '2024-03-12',
    readTime: '4 min',
    tags: ['Operations', 'Reflection'],
    summary: 'A coffee chain summer job and an engineering degree have more in common than you\'d think.',
    content: [
      'The first thing you notice working in a high-volume café is that everything that can go wrong, will. Not occasionally — constantly. The question is whether your process is robust enough to absorb it without the output degrading.',
      'That\'s a systems engineering problem. I just didn\'t have the language for it at the time.',
      'I spent six months at 5 To Go running shifts, managing inventory through their ERP system, and — eventually — opening and closing the location alone. It was the first environment I\'d worked in where the cost of inefficiency was immediately, visibly measurable. A badly planned prep session meant a fifteen-minute queue. Every system failure was traceable to a decision made thirty minutes earlier.',
      'In my engineering coursework, we model systems abstractly. Inputs, outputs, feedback loops, failure modes. Working a counter is the same thing, just with worse documentation and a customer watching.',
      'The habit I brought back: trace every bottleneck to its root. Not the symptom — the cause. That\'s the fix.',
    ],
  },
  {
    id: 2,
    title: 'Building an encryption tool without touching a single library',
    date: '2024-06-20',
    readTime: '6 min',
    tags: ['Python', 'Security', 'Projects'],
    summary: 'Notes from building a file-level encryption tool from scratch — and what I got wrong first.',
    content: [
      'The rule I set myself: no encryption libraries. Not for purity — for understanding. If I couldn\'t implement it from the ground up, I didn\'t actually know how it worked.',
      'The project was an audio file encryption tool in Python. Full pipeline: read raw bytes, derive a key from a SHA-256 hash of the passphrase, transform the file, write encrypted output. Decryption reverses it and verifies integrity. Straightforward on paper.',
      'What I got wrong first: I treated the key derivation as a formality. A password hashed once, used directly. That\'s not a key — that\'s a guess dressed up as one. Salting, iteration count, resistance to precomputation: none of that existed in version one.',
      'Version two fixed it. Version three made the output format self-describing — the encrypted file carries its own metadata, so decryption doesn\'t depend on external state. That changed how I thought about the whole problem.',
      'The lesson: implementation forces decisions that theory lets you defer. Every assumption you leave implicit in a design document becomes a bug in the code.',
    ],
  },
  {
    id: 3,
    title: 'On learning Italian — and what that has to do with learning anything',
    date: '2024-09-05',
    readTime: '3 min',
    tags: ['Learning', 'Languages'],
    summary: 'Language learning as a model for how skill acquisition actually works.',
    content: [
      'I started learning Italian with no particular goal. No trip planned, no professional need, no deadline. Just curiosity about how the grammar works differently from Romanian — which it doesn\'t, mostly, because they\'re cousins.',
      'That made it easy in the wrong way. Romanian speakers get Italian pronunciation almost for free. The vocabulary overlaps at maybe 60%. So the first two weeks felt like progress, and then it stalled — because the 40% that doesn\'t overlap is the hard part, and I\'d been coasting on the easy part.',
      'This is what happens with every new skill. The first phase is fast because you\'re pattern-matching against things you already know. The second phase is slow because you\'ve run out of anchors. Most people mistake the slowdown for failure.',
      'The music school experience clarified this for me years ago. Two years of drums and theory didn\'t teach me drums — they taught me how learning a new instrument actually works, so every subsequent one came faster. Italian is the same process, one more time.',
      'The method: stay in the uncomfortable middle. Don\'t retreat to what you already know. The plateau is where the actual work is.',
    ],
  },
]

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
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
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!ref.current) return
          ref.current.style.maxHeight = ref.current.scrollHeight + 'px'
          ref.current.style.opacity = '1'
        })
      })
    } else {
      if (el.scrollHeight > 0) el.style.maxHeight = el.scrollHeight + 'px'
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
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ═══════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════ */
function Sidebar({ theme, setTheme, activeNav, onNav, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <a href="./" className="sidebar-logo-link" aria-label="Home">
          <img src="tahlogo.svg" alt="TAH" className="sidebar-logo-img"
            onError={e => { e.target.style.display='none'; e.target.nextElementSibling.style.display='block' }} />
          <span className="sidebar-logo-fb" style={{display:'none'}}>T.A.H</span>
        </a>
        <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
          <button className="theme-btn" onClick={() => setTheme(t => t==='dark'?'light':'dark')} aria-label="Toggle theme">
            {theme==='dark' ? <SunIcon/> : <MoonIcon/>}
          </button>
          <button className={`hamburger${mobileOpen?' open':''}`} onClick={() => setMobileOpen(o=>!o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar panel */}
      <aside className={`sidebar${mobileOpen?' open':''}`}>

        <div className="sidebar-header">
          <a href="./" className="sidebar-logo-link" aria-label="Home">
            <img src="tahlogo.svg" alt="TAH" className="sidebar-logo-img"
              onError={e => { e.target.style.display='none'; e.target.nextElementSibling.style.display='block' }} />
            <span className="sidebar-logo-fb" style={{display:'none'}}>T.A.H</span>
          </a>
        </div>

        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            <img src="profile.jpg" alt="Tudor-Andrei Hălășag"
              onError={e => { e.target.parentElement.classList.add('sb-avatar-ph') }} />
          </div>
          <p className="sidebar-name">Tudor-Andrei Hălășag</p>
          <p className="sidebar-title">Robotics &amp; Industrial Engineering</p>
          <p className="sidebar-location">📍 Bucharest, Romania</p>
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          {NAV_SECTIONS.map(({ id, label, num }) => (
            <button key={id}
              className={`sidebar-link${activeNav===id?' active':''}`}
              onClick={() => { onNav(id); setMobileOpen(false) }}>
              <span className="sidebar-link-num">{num}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-socials">
          {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
            <a key={id} href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener"
              className={`social-btn social-${id}`}
              aria-label={label} title={label}>
              <Icon size={17} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-bottom">
          <a href="CV TUDOR ANDREI HĂLĂȘAG.pdf" download className="btn btn-primary btn-sidebar-cv">
            <DownloadIcon /> Download CV
          </a>
          <button className="sidebar-theme-btn" onClick={() => setTheme(t => t==='dark'?'light':'dark')}>
            {theme==='dark' ? <SunIcon/> : <MoonIcon/>}
            <span>{theme==='dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <p className="sidebar-copyright">© 2026 Tudor-Andrei Hălășag</p>
        </div>

      </aside>
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   BLOG
═══════════════════════════════════════════════════════ */
function BlogModal({ post, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler) }
  }, [onClose])

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal" onClick={e => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={onClose}><CloseIcon /></button>
        <div className="blog-modal-meta">
          <span className="blog-date">{new Date(post.date).toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' })}</span>
          <span className="blog-sep">·</span>
          <span className="blog-readtime">{post.readTime}</span>
          {post.tags.map(t => <span key={t} className="blog-tag">{t}</span>)}
        </div>
        <h2 className="blog-modal-title">{post.title}</h2>
        <div className="blog-modal-body">
          {post.content.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </div>
    </div>
  )
}

function BlogCard({ post, onClick }) {
  return (
    <article className="blog-card sf" onClick={onClick}>
      <div className="blog-card-meta">
        <span className="blog-date">{new Date(post.date).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'numeric' })}</span>
        <span className="blog-sep">·</span>
        <span className="blog-readtime">{post.readTime}</span>
      </div>
      <h3 className="blog-card-title">{post.title}</h3>
      <p className="blog-card-summary">{post.summary}</p>
      <div className="blog-card-footer">
        <div className="blog-card-tags">
          {post.tags.map(t => <span key={t} className="blog-tag">{t}</span>)}
        </div>
        <span className="blog-card-cta">Read →</span>
      </div>
    </article>
  )
}

/* ═══════════════════════════════════════════════════════
   CARDS
═══════════════════════════════════════════════════════ */
function ProjectCard({ p }) {
  const { open, setOpen, ref } = useExpand()
  return (
    <div className={`proj-card${open ? ' expanded' : ''}`} style={{opacity:1, transform:'none'}}>
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
          ? <a href={p.github} target="_blank" rel="noopener" className="github-btn"><GithubIcon size={15}/> View on GitHub</a>
          : <button className="github-btn ghost" disabled><GithubIcon size={15}/> GitHub — soon</button>
        }
      </div>
    </div>
  )
}

function ExperienceCard({ e }) {
  const cvExpand    = useExpand()
  const storyExpand = useExpand()
  return (
    <div className="tl-card">
      <div className="tl-header">
        <div>
          <h3 className="tl-role">{e.role}</h3>
          <p className="tl-company">{e.company}</p>
        </div>
        <span className="tl-date">{e.date}</span>
      </div>
      <div className="tl-expand-row">
        <button className="expand-btn" onClick={() => cvExpand.setOpen(o => !o)}>
          <ChevronIcon open={cvExpand.open}/>{cvExpand.open ? 'Hide summary' : 'CV summary'}
        </button>
        <button className="expand-btn story-btn" onClick={() => storyExpand.setOpen(o => !o)}>
          <ChevronIcon open={storyExpand.open}/>{storyExpand.open ? 'Close story' : 'Full story'}
        </button>
      </div>
      <div className="expand-body" ref={cvExpand.ref}>
        <ul className="tl-bullets" style={{marginTop:'0.75rem'}}>
          {e.bullets.map(b => <li key={b}>{b}</li>)}
        </ul>
      </div>
      <div className="expand-body" ref={storyExpand.ref}>
        <div className="tl-story">
          {e.story.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </div>
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

/* ═══════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = 'service_o8fovga'
const EMAILJS_TEMPLATE_ID = 'template_xmdef4r'
const EMAILJS_PUBLIC_KEY  = 'EvCT6awSLOEF_8kCy'

function ContactForm() {
  const [status,   setStatus]   = useState('')
  const [formData, setFormData] = useState({ name:'', email:'', message:'' })

  function handleChange(e) { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault(); setStatus('sending')
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID, template_id: EMAILJS_TEMPLATE_ID, user_id: EMAILJS_PUBLIC_KEY,
          template_params: { name: formData.name, reply_to: formData.email, message: formData.message },
        }),
      })
      if (res.ok) { setStatus('sent'); setFormData({ name:'', email:'', message:'' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form sf">
      <div className="form-group">
        <label htmlFor="cf-name">Name</label>
        <input type="text" id="cf-name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="cf-email">Email</label>
        <input type="email" id="cf-email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" rows={5} placeholder="What's on your mind?" value={formData.message} onChange={handleChange} required />
      </div>
      {status==='sent'  && <p className="form-ok">Message sent! I'll get back to you soon.</p>}
      {status==='error' && <p className="form-err">Something went wrong. Please try again.</p>}
      <button type="submit" className="btn btn-primary btn-full" disabled={status==='sending'}>
        {status==='sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════ */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme,      setTheme]      = useState(() => localStorage.getItem('cv-theme') || 'dark')
  const [activeNav,  setActiveNav]  = useState('')
  const [blogPost,   setBlogPost]   = useState(null)

  useScrollFade()
  useActiveNav(setActiveNav)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cv-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!blogPost) document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, blogPost])

  function handleNav(id) { scrollTo(id); setMobileOpen(false) }

  return (
    <div className="layout">

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

      {/* SIDEBAR */}
      <Sidebar theme={theme} setTheme={setTheme} activeNav={activeNav}
        onNav={handleNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* MAIN */}
      <main className="main-content">

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
            <h1 className="hero-name anim" style={{'--d':'0.2s'}}>
              Tudor-Andrei<br/><span className="accent">Hălășag</span>
            </h1>
            <p className="hero-title anim" style={{'--d':'0.35s'}}>Robotics &amp; Industrial Engineering — Polytechnic University of Bucharest</p>
            <p className="hero-tagline anim" style={{'--d':'0.5s'}}>I build things. Here's the evidence.</p>
            <div className="hero-btns anim" style={{'--d':'0.65s'}}>
              <button className="btn btn-primary" onClick={() => scrollTo('projects')}>View My Work</button>
              <a href="https://www.linkedin.com/in/tudor-halasag/" target="_blank" rel="noopener" className="btn btn-outline"><LinkedInIcon size={16}/> LinkedIn</a>
              <a href="CV TUDOR ANDREI HĂLĂȘAG.pdf" download className="btn btn-outline"><DownloadIcon size={16}/> CV</a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="container">
            <p className="sec-label sf">01 / About</p>
            <div className="about-grid">
              <div className="about-body sf">
                <h2 className="sec-heading sf">What I build</h2>
                <p>Robotics and Industrial Engineering at the Polytechnic University of Bucharest — third year.</p>
                <p>In code: cryptographic tools in Python, object-oriented city simulations in C++, desktop automation in C#. In hardware: Arduino microcontrollers wired from scratch, interfacing sensors, motors, and displays. In engineering: transformer design from raw electrical parameters, system modelling in MATLAB and AutoCAD.</p>
                <p>None of this was required. Every project here was built independently, outside of any coursework, because the problem was interesting and I wanted to solve it.</p>
                <p>That is the kind of engineer I am — and this site is the evidence.</p>
                <div className="stats">
                  {[['6+','Personal Projects'],['5+','Languages / Tools'],['C1','Cambridge Cert']].map(([n,l])=>(
                    <div key={l} className="stat sf"><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
                  ))}
                </div>
              </div>
              <div className="about-photo-wrap sf">
                <div className="about-photo-inner">
                  <img src="photo.jpg" alt="Tudor-Andrei Hălășag" className="about-photo"
                    onError={e => { e.target.parentElement.parentElement.style.display='none' }} />
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
            <div className="timeline-wrap">
              {EXPERIENCE_DATA.map((e, i) => (
                <div key={i} className="timeline sf">
                  <div className="tl-dot"/>
                  <ExperienceCard e={e}/>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="section">
          <div className="container">
            <p className="sec-label sf">03 / Blog</p>
            <h2 className="sec-heading sf">Writing</h2>
            <div className="blog-grid">
              {BLOG_POSTS.map(post => (
                <BlogCard key={post.id} post={post} onClick={() => setBlogPost(post)} />
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="section">
          <div className="container">
            <p className="sec-label sf">04 / Education</p>
            <h2 className="sec-heading sf">Education</h2>
            <div className="edu-grid">
              {EDU_DATA.map(e => <EduCard key={e.title} e={e}/>)}
            </div>
            <div className="cambridge-note sf">
              <span className="cambridge-badge">🏆 Cambridge English</span>
              <p>Sat the <strong>C2 Proficiency</strong> exam — awarded <strong>C1 level</strong>. Certificate available on request.</p>
              <a href="cambridge.pdf" target="_blank" rel="noopener" className="cambridge-link">View certificate <ExternalIcon/></a>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="container">
            <p className="sec-label sf">05 / Projects</p>
            <h2 className="sec-heading sf">Selected Projects</h2>
            <div className="proj-grid">
              {PROJECTS.map(p => <ProjectCard key={p.title} p={p}/>)}
            </div>
            <a href="https://tudor-halasag.github.io/works" className="works-card sf">
              <div className="works-card-inner">
                <h3 className="works-card-title">See the full portfolio →</h3>
                <p className="works-card-sub">Logo design, CAD models, music production &amp; more — all in one place.</p>
              </div>
            </a>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <div className="container">
            <p className="sec-label sf">06 / Skills</p>
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
            <p className="sec-label sf">07 / More</p>
            <h2 className="sec-heading sf">Languages &amp; Interests</h2>
            <div className="li-grid">
              <div className="li-card sf">
                <h3 className="card-sub">🌍 Languages</h3>
                <ul className="lang-list">
                  {[
                    {name:'Romanian', level:'Native',                    cls:'native'},
                    {name:'English',  level:'C1 — Cambridge (C2 exam)', cls:'c1'},
                    {name:'Italian',  level:'A2 — Self-learning',        cls:'a2'},
                    {name:'Turkish',  level:'A2 — Self-learning',        cls:'a2'},
                  ].map(l=>(
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
            <p className="sec-label sf">08 / Contact</p>
            <h2 className="sec-heading sf">Get in Touch</h2>
            <div className="contact-grid">
              <div className="contact-info sf">
                <p className="contact-blurb">If you're looking for an engineer who builds independently and delivers — the work is on this page. Use the form to reach out directly.</p>
                <div className="contact-links">
                  <a href="https://www.linkedin.com/in/tudor-halasag/" target="_blank" rel="noopener" className="contact-link"><LinkedInIcon size={16}/> LinkedIn Profile</a>
                  <a href="mailto:tudor.halasag@gmail.com" className="contact-link"><EmailIcon size={16}/> tudor.halasag@gmail.com</a>
                </div>
              </div>
              <ContactForm/>
            </div>
          </div>
        </section>

        {/* VERIFICATION */}
        <section id="verification" className="section">
          <div className="container">
            <p className="sec-label sf">09 / Verification</p>
            <h2 className="sec-heading sf">Verify My Identity</h2>
            <div className="verify-card sf">
              <div className="verify-alert">
                <span className="verify-alert-icon">⚠️</span>
                <p>If you have received a message, call, or email claiming to be from Tudor Andrei Hălășag — verify it against this page before responding.</p>
              </div>
              <div className="verify-channels">
                {[
                  { label:'Official Email',  value:'tudor.halasag@gmail.com',              href:null,                                         note:'The only email address I use for professional communication. Any other address is not me.' },
                  { label:'LinkedIn',        value:'linkedin.com/in/tudor-halasag',         href:'https://www.linkedin.com/in/tudor-halasag/',  note:'My only LinkedIn profile. Cross-check the URL exactly.' },
                  { label:'GitHub',          value:'github.com/tudor-halasag',              href:'https://github.com/tudor-halasag',            note:'My only GitHub account. All public projects are listed here.' },
                  { label:'Instagram',       value:'@tud.or.exe',                           href:'https://instagram.com/tud.or.exe',             note:'My only Instagram account.' },
                  { label:'This Website',    value:'tudor-halasag.github.io',               href:null,                                         note:'The only official portfolio website. Any other domain is not affiliated with me.' },
                ].map(({ label, value, href, note }) => (
                  <div key={label} className="verify-item">
                    <span className="verify-label">{label}</span>
                    {href
                      ? <a href={href} target="_blank" rel="noopener" className="verify-value verify-link">{value}</a>
                      : <span className="verify-value">{value}</span>
                    }
                    <span className="verify-note">{note}</span>
                  </div>
                ))}
              </div>
              <p className="verify-statement">
                All official communication is conducted exclusively through the channels listed above.
                I do not initiate contact from alternative email addresses, phone numbers, or unofficial platforms.
                If something feels off — it probably is.
              </p>
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

      </main>

      {/* BLOG MODAL */}
      {blogPost && <BlogModal post={blogPost} onClose={() => setBlogPost(null)} />}

    </div>
  )
}
