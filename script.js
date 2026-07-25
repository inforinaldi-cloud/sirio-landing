// SIRIO AGENCY — landing interactions

// Header: solid on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  })
);

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// FAQ: single-open accordion
const faqItems = document.querySelectorAll('.faq details');
faqItems.forEach((d) =>
  d.addEventListener('toggle', () => {
    if (d.open) faqItems.forEach((o) => { if (o !== d) o.open = false; });
  })
);

// Form (front-end only; backend wiring da configurare in produzione)
const form = document.getElementById('leadForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  success.hidden = false;
  form.querySelector('button[type="submit"]').disabled = true;
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Case-study video gallery: click to play, pause others
const csCards = document.querySelectorAll('.cs-card');
csCards.forEach((card) => {
  const media = card.querySelector('.cs-media');
  const video = card.querySelector('video');
  media.addEventListener('click', (e) => {
    if (e.target.closest('.cs-play')) e.preventDefault();
    if (video.paused) {
      csCards.forEach((o) => {
        if (o !== card) { o.querySelector('video').pause(); o.classList.remove('playing'); }
      });
      video.play();
      card.classList.add('playing');
    }
  });
  video.addEventListener('pause', () => card.classList.remove('playing'));
  video.addEventListener('play', () => { card.classList.add('playing'); video.controls = true; });
  video.addEventListener('ended', () => { video.controls = false; card.classList.remove('playing'); });
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
