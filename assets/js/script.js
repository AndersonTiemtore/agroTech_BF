// NAVBAR : transparent sur hero, blanc sinon
const navbar = document.getElementById('navbar');
const hero = document.querySelector('.hero');

function updateNavbar() {
  if (!hero) return;
  const heroBottom = hero.getBoundingClientRect().bottom;
  if (heroBottom > 60) {
    navbar.classList.add('on-hero');
  } else {
    navbar.classList.remove('on-hero');
  }
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', updateNavbar);
updateNavbar();

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const s = hamburger.querySelectorAll('span');
  if (navMenu.classList.contains('open')) {
    s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    s[1].style.opacity = '0';
    s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    s[0].style.transform = s[1].style.opacity = s[2].style.transform = '';
  }
});
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// SCROLL ANIMATIONS
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.sol-card,.why-item,.step,.benefit-item,.culture-card,.dash-card,.impact-item').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  obs.observe(el);
});
document.querySelectorAll('.solution-left,.how-left,.tech-left,.fc-top,.fc-cultures,.cta-content').forEach(el => {
  el.classList.add('fade-up');
  obs.observe(el);
});
const techRight = document.querySelector('.tech-right');
if (techRight) { techRight.classList.add('fade-up'); obs.observe(techRight); }

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    }
  });
});

// ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});
