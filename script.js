/* ═══════════════════════════════════════════
   PARTICLE CANVAS
   ═══════════════════════════════════════════ */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], mouseX = -999, mouseY = -999;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 1.4 + 0.4;
    this.alpha = Math.random() * 0.3 + 0.08;
}

Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;

    // mouse repel
    var dx = mouseX - this.x;
    var dy = mouseY - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 160) {
        this.x -= dx * 0.006;
        this.y -= dy * 0.006;
    }
};

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 229, 255, ' + this.alpha + ')';
    ctx.fill();
};

var numParticles = Math.min(85, Math.floor((W * H) / 15000));
for (var i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
            var dx = particles[i].x - particles[j].x;
            var dy = particles[i].y - particles[j].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = 'rgba(0, 229, 255, ' + (0.05 * (1 - dist / 150)) + ')';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    drawLines();
    requestAnimationFrame(animateCanvas);
}
animateCanvas();


/* ═══════════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════════ */
var phrases = [
    'quantitative alphas & trading signals.',
    'quantum machine learning models.',
    'multi-agent AI systems.',
    'self-correcting RAG pipelines.',
    'physics-informed neural networks.',
    'portfolio optimization engines.'
];

var phraseIndex = 0;
var charIndex = 0;
var isDeleting = false;
var typeEl = document.getElementById('typewriter');

function typeLoop() {
    var current = phrases[phraseIndex];
    typeEl.textContent = current.substring(0, charIndex);

    if (!isDeleting) {
        charIndex++;
        if (charIndex > current.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
        setTimeout(typeLoop, 55);
    } else {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeLoop, 400);
            return;
        }
        setTimeout(typeLoop, 30);
    }
}
typeLoop();


/* ═══════════════════════════════════════════
   NAV — SCROLL SHRINK
   ═══════════════════════════════════════════ */
window.addEventListener('scroll', function () {
    var nav = document.querySelector('nav');
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


/* ═══════════════════════════════════════════
   NAV — MOBILE TOGGLE
   ═══════════════════════════════════════════ */
document.getElementById('navToggle').addEventListener('click', function () {
    document.getElementById('navLinks').classList.toggle('open');
});

// close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
        document.getElementById('navLinks').classList.remove('open');
    });
});


/* ═══════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════ */
// Add .reveal to all section headers, grids, and cards
var revealTargets = document.querySelectorAll(
    '.section-header, .experience-grid, .filter-bar, .project-grid, ' +
    '.stack-grid, .pub-list, .achievements-grid, .journey-grid, ' +
    '.beyond-card, .contact-inner'
);
revealTargets.forEach(function (el) {
    el.classList.add('reveal');
});

var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
});


/* ═══════════════════════════════════════════
   PROJECT FILTERS
   ═══════════════════════════════════════════ */
document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        // update active button
        document.querySelectorAll('.filter-btn').forEach(function (b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.card').forEach(function (card) {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
                card.style.animation = 'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
