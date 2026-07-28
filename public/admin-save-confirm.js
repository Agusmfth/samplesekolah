document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.className = 'approval-overlay';
  overlay.innerHTML = `
    <div class="approval-dialog" role="dialog" aria-modal="true" aria-labelledby="approval-title">
      <div class="approval-icon">?</div>
      <h3 id="approval-title">Konfirmasi tindakan</h3>
      <p class="approval-message"></p>
      <div class="approval-actions">
        <button type="button" class="approval-cancel">Batal</button>
        <button type="button" class="approval-confirm">Ya, lanjutkan</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const message = overlay.querySelector('.approval-message');
  const confirmButton = overlay.querySelector('.approval-confirm');
  let pendingButton = null;

  const close = () => {
    overlay.classList.remove('open', 'danger');
    pendingButton = null;
  };

  overlay.querySelector('.approval-cancel').addEventListener('click', close);
  overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });

  confirmButton.addEventListener('click', () => {
    const button = pendingButton;
    const deleting = button?.classList.contains('table-delete');
    close();
    if (!button) return;
    if (!deleting) {
      const form = button.closest('form');
      if (!form) return;
      let field = form.querySelector('[name="return_section"]');
      if (!field) {
        field = document.createElement('input');
        field.type = 'hidden';
        field.name = 'return_section';
        form.appendChild(field);
      }
      field.value = location.hash.replace('#', '') || 'profil';
      form.requestSubmit();
      return;
    }
    button.dataset.approved = 'true';
    button.click();
  });

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.modal-save, .sticky-save button[type="submit"], .table-delete');
    if (!button) return;
    if (button.dataset.approved === 'true') {
      delete button.dataset.approved;
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    pendingButton = button;
    const deleting = button.classList.contains('table-delete');
    overlay.classList.toggle('danger', deleting);
    message.textContent = deleting
      ? 'Data yang dihapus tidak akan ditampilkan lagi. Apakah Anda yakin ingin menghapus data ini?'
      : 'Perubahan akan langsung ditampilkan pada website sekolah. Apakah Anda yakin ingin menyimpannya?';
    confirmButton.textContent = deleting ? 'Ya, hapus' : 'Ya, simpan';
    overlay.classList.add('open');
  }, true);
});
