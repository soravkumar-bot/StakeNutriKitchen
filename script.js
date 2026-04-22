/* ================================================================
   StakeNutriKitchen — script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll ──────────────────────────────────────
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
  }

  // ── Mobile toggle ──────────────────────────────────────
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('navMobile');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', open);
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
      })
    );
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) { mobileNav.classList.remove('open'); toggle.classList.remove('open'); }
    });
  }

  // ── Active nav link ────────────────────────────────────
  const file = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === file) a.classList.add('active');
  });

  // ── Scroll reveal ──────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  // ── Macro bar animation ────────────────────────────────
  const bars = document.querySelectorAll('.macro-bar-fill[data-w]');
  if (bars.length) {
    const bObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.animated) {
          e.target.dataset.animated = 1;
          e.target.style.width = e.target.dataset.w + '%';
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => { b.style.width = '0'; bObs.observe(b); });
  }

  // ── Counter animation ──────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
          entry.target.dataset.done = 1;
          const target = parseFloat(entry.target.dataset.count);
          const suffix = entry.target.dataset.suffix || '';
          const isFloat = String(target).includes('.');
          const dur = 1600; let start = null;
          const tick = ts => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            entry.target.textContent = (target * ease).toFixed(isFloat ? 1 : 0) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  // ── Back to top ────────────────────────────────────────
  const btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 360), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Contact form ───────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const orig = btn.textContent;
      btn.textContent = '✓ Message sent!';
      btn.style.background = '#3a7d3c';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; form.reset(); }, 3200);
    });
  }

  // ── Newsletter form ────────────────────────────────────
  const nlForm = document.getElementById('nlForm');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      btn.textContent = '✓ Subscribed!';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.disabled = false; nlForm.reset(); }, 2600);
    });
  }

  // ── Smooth anchor scroll ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const el = document.querySelector(a.getAttribute('href'));
      if (el) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset - 12, behavior: 'smooth' });
      }
    });
  });

});
