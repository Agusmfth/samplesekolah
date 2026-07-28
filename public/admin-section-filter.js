(() => {
  const apply = () => {
    const sections = document.querySelectorAll('.editor-section');
    const hash = location.hash.replace('#', '');
    document.body.dataset.adminSection = hash || 'all';
    if (!hash) { sections.forEach((section) => section.classList.remove('section-hidden')); return; }
    sections.forEach((section) => section.classList.toggle('section-hidden', section.id !== hash));
  };
  window.addEventListener('hashchange', apply);
  document.addEventListener('DOMContentLoaded', apply);
  document.addEventListener('submit', (event) => {
    if (!event.target.matches('.admin-form')) return;
    document.querySelectorAll('.editor-section.section-hidden input, .editor-section.section-hidden textarea, .editor-section.section-hidden select').forEach((field) => {
      field.disabled = true;
    });
  });
})();
