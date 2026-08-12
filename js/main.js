'use strict';

document.documentElement.classList.add('js-ready');

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
const mobileBreakpoint = window.matchMedia('(max-width: 900px)');

function setMenu(open) {
  if (!menuButton || !navigation || !header) return;

  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  navigation.classList.toggle('is-open', open);
  header.classList.toggle('is-menu-open', open);
  document.body.classList.toggle('menu-open', open);
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenu(!isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });

  document.addEventListener('click', (event) => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    if (isOpen && !navigation.contains(event.target) && !menuButton.contains(event.target)) {
      setMenu(false);
    }
  });

  mobileBreakpoint.addEventListener('change', (event) => {
    if (!event.matches) setMenu(false);
  });
}

function updateHeader() {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
