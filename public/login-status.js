document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.auth-card');
  const error = document.querySelector('.auth-error');
  const form = document.querySelector('.auth-card form');
  const submit = document.querySelector('.auth-submit');

  if (error && card) {
    card.classList.add('login-failed');
    error.insertAdjacentHTML('afterbegin', '<span class="error-icon">!</span>');
    setTimeout(() => card.classList.remove('login-failed'), 650);
  }

  form?.addEventListener('submit', () => {
    submit.classList.add('is-loading');
    submit.disabled = true;
    submit.innerHTML = '<span class="login-spinner"></span> Memeriksa akun...';
  });
});
