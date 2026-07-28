(() => {
  const startAnimations = () => {
    const hero = document.querySelector('.hero, .article-hero');
    if (hero) hero.classList.add('hero-visible');

    const sections = [...document.querySelectorAll('main > section:not(.hero), .article-body, .related-news')];
    sections.forEach((section, index) => {
      section.classList.add('section-animate');
      section.dataset.direction = ['up', 'left', 'right'][index % 3];
    });

    const revealVisible = () => {
      const triggerLine = window.innerHeight * 0.88;

      sections.forEach((section) => {
        if (section.classList.contains('section-visible')) return;
        if (section.getBoundingClientRect().top < triggerLine) {
          section.classList.add('section-visible');
        }
      });

      document.querySelectorAll('.reveal:not(.is-visible)').forEach((item) => {
        if (item.getBoundingClientRect().top < triggerLine) item.classList.add('is-visible');
      });
    };

    let ticking = false;
    const requestReveal = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        revealVisible();
        ticking = false;
      });
    };

    revealVisible();
    window.addEventListener('scroll', requestReveal, { passive: true });
    window.addEventListener('resize', requestReveal, { passive: true });
    window.addEventListener('load', revealVisible, { once: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAnimations, { once: true });
  } else {
    startAnimations();
  }
})();
