if (document.body.matches('.auth-page, .dashboard-page')) { const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'portal.css'; document.head.appendChild(link); }
const toggle = document.querySelector('.menu-toggle');
if (!toggle) { /* Portal pages do not need the landing-page menu handlers. */ }
else {
const menu = document.querySelector('.nav-menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
}

const header = document.querySelector('.site-header');
const progress = document.createElement('div');
progress.className = 'scroll-progress';
header.appendChild(progress);

let scrollTicking = false;
const updateScrollEffects = () => {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('scrolled', scrollTop > 24);
  progress.style.transform = `scaleX(${scrollRange > 0 ? scrollTop / scrollRange : 0})`;

  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && scrollTop < window.innerHeight) {
    document.documentElement.style.setProperty('--hero-shift', `${scrollTop * 0.12}px`);
  }
  scrollTicking = false;
};

updateScrollEffects();
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(updateScrollEffects);
    scrollTicking = true;
  }
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-heading, .program-card, .teacher-card, .teacher-note, .facility, .news-card, .image-stack, .section-copy, .testimonial-wrap, .testimonial-badge, .contact-box, .trust-grid > div, .footer-grid > div')
  .forEach((element, index) => {
    element.classList.add('reveal');
    if (element.matches('.image-stack')) element.classList.add('reveal-left');
    if (element.matches('.section-copy, .testimonial-badge')) element.classList.add('reveal-right');
    if (element.matches('.facility, .news-card')) element.classList.add('reveal-scale');
    element.style.setProperty('--delay', `${(index % 4) * 110}ms`);
    revealObserver.observe(element);
  });

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const number = entry.target;
    const finalValue = Number(number.dataset.value);
    const suffix = number.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();

    const animate = (now) => {
      const progressValue = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      number.textContent = `${Math.round(finalValue * eased).toLocaleString('id-ID')}${suffix}`;
      if (progressValue < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    countObserver.unobserve(number);
  });
}, { threshold: 0.8 });

document.querySelectorAll('.floating-card strong, .trust-grid strong').forEach((number) => {
  const original = number.textContent.trim();
  const value = Number(original.replace(/[^0-9]/g, ''));
  if (!value) return;
  number.dataset.value = value;
  number.dataset.suffix = original.includes('%') ? '%' : original.includes('+') ? '+' : '';
  countObserver.observe(number);
});
