document.addEventListener('DOMContentLoaded', () => {
  const fallbackIcons = ['⚛', '文', '✎', '◎', '▦', '★', '●', '♬'];
  document.querySelectorAll('.program-card').forEach((card, index) => {
    card.classList.remove('featured');
    const icon = card.querySelector('.icon-box');
    if (icon && (!icon.textContent.trim() || icon.textContent.trim() === '✦')) {
      icon.textContent = fallbackIcons[index % fallbackIcons.length];
    }
  });
});
