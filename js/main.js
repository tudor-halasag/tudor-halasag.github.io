/* =====================================================
   WEBGL SHADER GRADIENT BACKGROUND
   Replicates ShaderGradient: plane, color1=#28714D,
   color2=#0D261A, color3=#68CA99, animated
   ===================================================== */
(function initShaderBg() {
  const canvas = document.getElementById('bg-canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const vert = `
    attribute vec2 a_pos;
    void main() {
      gl_Position = vec4(a_pos, 0.0, 1.0);
    }
  `;

  const frag = `
    precision mediump float;
    uniform vec2  u_res;
    uniform float u_time;

    vec3 c1 = vec3(0.157, 0.443, 0.302); /* #28714D */
    vec3 c2 = vec3(0.051, 0.149, 0.071); /* #0D261A */
    vec3 c3 = vec3(0.408, 0.792, 0.600); /* #68CA99 */

    /* smooth noise */
    vec2 hash22(vec2 p){
      p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
      return -1.0 + 2.0*fract(sin(p)*43758.5453);
    }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      return mix(
        mix(dot(hash22(i),             f),
            dot(hash22(i+vec2(1,0)),   f-vec2(1,0)), u.x),
        mix(dot(hash22(i+vec2(0,1)),   f-vec2(0,1)),
            dot(hash22(i+vec2(1,1)),   f-vec2(1,1)), u.x), u.y);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      /* match ShaderGradient params: positionX=-1.4, rotationZ=50 */
      uv.x += -0.35;
      float t = u_time * 0.18; /* uSpeed=0.2 */

      /* layered noise matching uDensity=5.7, uFrequency=5.5, uAmplitude=1, uStrength=2.1 */
      float n  = noise(uv * 5.7 + vec2(t * 0.4, t * 0.3));
      float n2 = noise(uv * 5.5 + vec2(-t * 0.3, t * 0.5));
      float n3 = noise(uv * 3.2 + vec2(t * 0.2, -t * 0.4));

      float f = n * 0.55 + n2 * 0.30 + n3 * 0.15;
      f = f * 0.5 + 0.5; /* remap to [0,1] */
      f = pow(f, 1.0 / 2.1); /* uStrength */

      /* rotationZ=50 deg diagonal flow */
      float diag = uv.x * 0.64 + uv.y * 0.77;
      float wave = sin(diag * 6.28 + t) * 0.5 + 0.5;

      /* brightness=1.4 */
      float b = 1.4;

      vec3 col;
      if (f < 0.45) {
        col = mix(c2, c1, smoothstep(0.0, 0.45, f));
      } else {
        col = mix(c1, c3, smoothstep(0.45, 1.0, f));
      }

      col = mix(col, col * 1.08, wave * 0.3);
      col *= b;
      col = clamp(col, 0.0, 1.0);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes  = gl.getUniformLocation(prog, 'u_res');
  const uTime = gl.getUniformLocation(prog, 'u_time');

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  let last = 0;
  /* frameRate≈10fps target as per ShaderGradient frameRate=10 */
  const FRAME_MS = 1000 / 16;

  function frame(ts) {
    if (ts - last >= FRAME_MS) {
      last = ts;
      gl.uniform1f(uTime, ts * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();


/* =====================================================
   THEME TOGGLE
   ===================================================== */
(function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const icon = btn.querySelector('.theme-icon');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  icon.textContent = saved === 'dark' ? '☀' : '🌙';

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    icon.textContent = next === 'dark' ? '☀' : '🌙';
  });
})();


/* =====================================================
   NAVBAR: scroll shadow + mobile menu
   ===================================================== */
(function initNav() {
  const nav  = document.getElementById('navbar');
  const menuBtn  = document.getElementById('nav-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  /* Close mobile menu on link click */
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
})();


/* =====================================================
   ACTIVE NAV LINK ON SCROLL (IntersectionObserver)
   ===================================================== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.dataset.section === entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));
})();


/* =====================================================
   SCROLL FADE-IN ANIMATIONS
   ===================================================== */
(function initScrollFade() {
  const els = document.querySelectorAll('.scroll-fade');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        /* stagger siblings in same parent */
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.scroll-fade:not(.in-view)'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();


/* =====================================================
   SMOOTH SCROLL for anchor links
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* =====================================================
   CONTACT FORM: prevent default + feedback
   ===================================================== */
(function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    const action = form.getAttribute('action');
    if (action.includes('YOUR_FORMSPREE_ID')) {
      e.preventDefault();
      alert('Please replace YOUR_FORMSPREE_ID in the form action with your actual Formspree endpoint.');
      return;
    }
    /* Let Formspree handle real submission — no preventDefault */
  });
})();
