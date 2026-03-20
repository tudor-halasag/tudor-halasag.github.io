import { useEffect, useState } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import './App.css'

const MESSAGES = [
  { main: 'This website is under construction.', sub: 'Something great is being built here.' },
  { main: 'Coming soon!',                        sub: 'Stay tuned for the full experience.' },
  { main: 'Thank you for your patience.',        sub: 'It will be worth the wait.' },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [idx,      setIdx]      = useState(0)
  const [visible,  setVisible]  = useState(true)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % MESSAGES.length)
        setVisible(true)
      }, 500)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  function handleDot(i) {
    if (i === idx) return
    setVisible(false)
    setTimeout(() => { setIdx(i); setVisible(true) }, 350)
  }

  return (
    <div className="app">

      <div className="bg-wrap">
        <ShaderGradientCanvas style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} pointerEvents="none">
          <ShaderGradient
            animate="on" brightness={1.3}
            cAzimuthAngle={180} cDistance={1.7} cPolarAngle={90} cameraZoom={1}
            color1="#1a1a1a" color2="#0a0a0a" color3="#3a3a3a"
            envPreset="city" fov={80} frameRate={10} grain="off" lightType="3d"
            pixelDensity={1} positionX={-1.4} positionY={0} positionZ={0}
            rotationX={0} rotationY={10} rotationZ={50}
            type="plane" uAmplitude={1} uDensity={5.7} uFrequency={5.5}
            uSpeed={0.15} uStrength={2.1} uTime={0} wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      <nav className={"navbar" + (scrolled ? " scrolled" : "")}>
        <div className="nav-inner">
          <a href="./" className="nav-logo-link" aria-label="Home">
            <img
              src="tahlogo.svg"
              alt="TAH"
              className="nav-logo-img"
              onError={e => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <span className="nav-logo-fb" style={{ display: 'none' }}>T.A.H</span>
          </a>
        </div>
      </nav>

      <main className="stage">
        <div className={"message-wrap" + (visible ? " visible" : "")}>
          <p className="msg-eyebrow">Portfolio</p>
          <h1 className="msg-main">{MESSAGES[idx].main}</h1>
          <p className="msg-sub">{MESSAGES[idx].sub}</p>
        </div>
        <div className="dots">
          {MESSAGES.map((_, i) => (
            <button
              key={i}
              className={"dot" + (i === idx ? " active" : "")}
              onClick={() => handleDot(i)}
              aria-label={"Message " + (i + 1)}
            />
          ))}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 Tudor-Andrei Hălășag</span>
          <span className="footer-sep">·</span>
          <span className="footer-motto">Where precision meets creativity.</span>
        </div>
      </footer>

    </div>
  )
}
