(() => {
  const scriptUrl = document.currentScript?.src;
  const init = () => {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu || toggle.dataset.mobileReady) return;
    toggle.dataset.mobileReady = 'true';

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = scriptUrl ? new URL('mobile-nav.css?v=2', scriptUrl).href : 'mobile-nav.css?v=2';
    document.head.appendChild(stylesheet);
    const headerFix = document.createElement('link');
    headerFix.rel = 'stylesheet';
    headerFix.href = scriptUrl ? new URL('mobile-header-fix.css?v=2', scriptUrl).href : 'mobile-header-fix.css?v=2';
    document.head.appendChild(headerFix);

    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    document.body.appendChild(backdrop);

    const closeMenu = () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const willOpen = !menu.classList.contains('open');
      menu.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
      document.body.classList.toggle('menu-open', willOpen);
    }, true);

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 960) closeMenu(); });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
