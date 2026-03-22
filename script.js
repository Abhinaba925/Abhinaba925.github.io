/* ═══════════════════════════════════════════════════
   MATRIX RAIN
   ═══════════════════════════════════════════════════ */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()ΣΩΔΨαβγδεζηθλμπσφψω∂∫∮∇≈≠∞±√∑∏⟨⟩|ℏ';
const fontSize = 13;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(4, 6, 11, 0.07)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Random bright heads
    const r = Math.random();
    if (r > 0.97) {
      ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
    } else if (r > 0.94) {
      ctx.fillStyle = 'rgba(0, 255, 157, 0.25)';
    } else {
      ctx.fillStyle = 'rgba(0, 255, 157, 0.09)';
    }

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.985) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

/* ═══════════════════════════════════════════════════
   CURSOR GLOW
   ═══════════════════════════════════════════════════ */
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.style.left = mouseX + 'px';
  cursorGlow.style.top = mouseY + 'px';
  cursorGlow.classList.add('visible');
});

document.addEventListener('mouseleave', () => {
  cursorGlow.classList.remove('visible');
});

/* ═══════════════════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════════════════ */
const phrases = [
  'quantum algorithms.',
  'algorithmic trading systems.',
  'neural PDE solvers.',
  'quantum-enhanced wireless links.',
  'NLP pipelines.',
  'statistical arbitrage engines.',
  'physics-informed networks.',
  'hybrid quantum-classical models.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeLoop() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 350);
      return;
    }
    setTimeout(typeLoop, 25);
  } else {
    typeEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2200);
      return;
    }
    setTimeout(typeLoop, 65);
  }
}
setTimeout(typeLoop, 1200);

/* ═══════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Scroll effect
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════ */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════
   CARD MOUSE TRACKING
   ═══════════════════════════════════════════════════ */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  });
});

/* ═══════════════════════════════════════════════════
   SKILL BAR ANIMATION
   ═══════════════════════════════════════════════════ */
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ═══════════════════════════════════════════════════
   STATUS BAR — CURRENT SECTION
   ═══════════════════════════════════════════════════ */
const statusEl = document.getElementById('statusSection');
const sections = document.querySelectorAll('section[id]');

if (statusEl) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statusEl.textContent = entry.target.id;
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ═══════════════════════════════════════════════════
   ACTIVE NAV HIGHLIGHTING
   ═══════════════════════════════════════════════════ */
const navHighlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.querySelectorAll('a').forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? '#00ff9d' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => navHighlightObserver.observe(s));
