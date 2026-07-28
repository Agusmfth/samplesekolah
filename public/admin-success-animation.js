document.addEventListener('DOMContentLoaded', () => {
  if (!window.adminSuccessMessage) return;

  const toast = document.createElement('div');
  toast.className = 'success-toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <div class="success-burst"><span></span><span></span><span></span><span></span><span></span><span></span></div>
    <div class="success-check"><svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"></circle><path d="M15 27l7 7 15-16"></path></svg></div>
    <div><strong>Berhasil!</strong><p></p></div>
    <button type="button" aria-label="Tutup">&times;</button>`;
  toast.querySelector('p').textContent = window.adminSuccessMessage;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  const hide = () => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 350);
  };
  const timer = setTimeout(hide, 4200);
  toast.querySelector('button').addEventListener('click', () => {
    clearTimeout(timer);
    hide();
  });
});
