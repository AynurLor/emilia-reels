// === NAV scrolled state ===
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// === Reveal on scroll ===
const revealTargets = document.querySelectorAll(
  '.about__portrait, .about__content, .case, .step, .plan, .qa, .cta__panel, .section-head, .marquee, .trust__label'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const delay = target.dataset.delay || (i % 4) * 80;
      setTimeout(() => target.classList.add('in'), delay);
      io.unobserve(target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

revealTargets.forEach(el => io.observe(el));

// === Parallax (subtle) ===
const parallaxEls = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.parallax);
    const rect = el.getBoundingClientRect();
    const offsetFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
    el.style.transform = `translate3d(0, ${offsetFromCenter * speed * -1}px, 0)`;
  });
}, { passive: true });

// === Cases slider buttons ===
const rail = document.getElementById('casesRail');
document.querySelectorAll('.slider-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dir = parseInt(btn.dataset.dir, 10);
    const cardWidth = rail.querySelector('.case').offsetWidth + 28;
    rail.scrollBy({ left: dir * cardWidth * 1.2, behavior: 'smooth' });
  });
});

// === Process line fill on scroll ===
const processLineFill = document.querySelector('.process__line-fill');
const processSection = document.querySelector('.process__rail');

function updateProcessLine() {
  if (!processSection || !processLineFill) return;
  const rect = processSection.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh * 0.8;
  const end = vh * 0.2;
  let progress = (start - rect.top) / (start - end + rect.height * 0.3);
  progress = Math.max(0, Math.min(1, progress));
  processLineFill.setAttribute('x2', 1200 * progress);
}
window.addEventListener('scroll', updateProcessLine, { passive: true });
updateProcessLine();

// === Hover glow on cards ===
document.querySelectorAll('.plan, .step, .qa').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// === Smooth scroll for nav anchors ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// === FAQ: close others when one opens ===
const qas = document.querySelectorAll('.qa');
qas.forEach(qa => {
  qa.addEventListener('toggle', () => {
    if (qa.open) {
      qas.forEach(other => {
        if (other !== qa) other.open = false;
      });
    }
  });
});
