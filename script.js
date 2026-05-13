/* ========================================
   LandPage interactions
   - dark / light theme
   - mobile navigation
   - smooth scrolling
   - active link state
   - reveal animation
   ======================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storageKey = 'landpage-theme';

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function setTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    document.documentElement.dataset.theme = theme;

    const themeToggle = qs('#themeToggle, .theme-toggle, [data-theme-toggle]');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Gunakan tema terang' : 'Gunakan tema gelap');
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(savedTheme || systemTheme);

    const themeToggle = qs('#themeToggle, .theme-toggle, [data-theme-toggle]');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(storageKey, nextTheme);
      setTheme(nextTheme);
    });
  }

  function initMobileMenu() {
    const toggle = qs('#menuToggle, .menu-toggle, .nav-toggle, .mobile-menu-toggle, [data-menu-toggle]');
    const menu = qs('#navLinks, .nav-links, .nav-menu, .menu, .navbar-nav');

    if (!toggle || !menu) return;

    if (!menu.id) menu.id = 'navLinks';
    toggle.setAttribute('aria-controls', menu.id);
    toggle.setAttribute('aria-expanded', 'false');
    if (!toggle.getAttribute('aria-label')) toggle.setAttribute('aria-label', 'Buka menu navigasi');

    const closeMenu = () => {
      menu.classList.remove('open', 'active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Buka menu navigasi');
    };

    const openMenu = () => {
      menu.classList.add('open', 'active');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Tutup menu navigasi');
    };

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('open') || menu.classList.contains('active');
      isOpen ? closeMenu() : openMenu();
    });

    qsa('a[href^="#"]', menu).forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const selector = link.getAttribute('href');
        if (!selector || selector === '#') return;

        const target = qs(selector);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });
  }

  function initReveal() {
    const revealItems = qsa('.hero-card, .project-card, .service-card, .feature-card, .about-card, .contact-card, .workflow-card, .stack-card, .card, [data-reveal]');
    if (!revealItems.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
      observer.observe(item);
    });
  }

  function initActiveLinks() {
    const links = qsa('.nav-links a[href^="#"], .nav-menu a[href^="#"], .menu a[href^="#"], .navbar-nav a[href^="#"], nav a[href^="#"]');
    const sections = links
      .map((link) => qs(link.getAttribute('href')))
      .filter(Boolean);

    if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

    const setActive = (id) => {
      links.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0.48 });

    sections.forEach((section) => observer.observe(section));
  }

  function initFormStatus() {
    const forms = qsa('.contact-form, form[data-local-status]');
    forms.forEach((form) => {
      const status = qs('.form-status, .status-message', form.parentElement || form);
      if (!status || form.action) return;

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        status.textContent = 'Form belum terhubung ke backend. Tambahkan action Formspree/Netlify atau hubungkan ke endpoint Anda.';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
    initActiveLinks();
    initFormStatus();
  });
})();
