const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observerRef.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

const parallaxTarget = document.querySelector('[data-parallax]');
if (parallaxTarget && !reducedMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const offset = Math.min(window.scrollY * 0.18, 90);
      parallaxTarget.style.setProperty('--parallax', `${offset}px`);
      ticking = false;
    });
  }, { passive: true });
}

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.shop-card');
filters.forEach((filter) => filter.addEventListener('click', () => {
  filters.forEach((button) => button.classList.toggle('active', button === filter));
  const selected = filter.dataset.filter;
  cards.forEach((card) => { card.hidden = selected !== 'all' && card.dataset.world !== selected; });
}));

const toast = document.querySelector('.toast');
document.querySelectorAll('.preview-button').forEach((button) => button.addEventListener('click', () => {
  toast.textContent = 'Preview only — Onnika confirms editions and availability';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
}));
