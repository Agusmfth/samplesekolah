document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#fasilitas .repeat-card').forEach((card, index) => {
    const imagePath = card.querySelector(`[name="facilities[${index}][image]"]`);
    if (!imagePath || card.querySelector('.facility-upload-field')) return;
    const currentPath = imagePath.value;
    imagePath.type = 'hidden';
    imagePath.closest('.field').style.display = 'none';
    const field = document.createElement('div');
    field.className = 'field facility-upload-field';
    field.innerHTML = `<label>Foto fasilitas</label><input type="file" name="facilities[${index}][image_upload]" accept="image/jpeg,image/png,image/webp"><small>Format JPG, PNG, atau WebP. Maksimal 4 MB.</small><div class="facility-image-preview"></div>`;
    const input = field.querySelector('input');
    const preview = field.querySelector('.facility-image-preview');
    if (currentPath) {
      preview.style.backgroundImage = `url('/${currentPath.replace(/^\//, '')}')`;
      preview.classList.add('has-image');
    }
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;
      preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      preview.classList.add('has-image');
    });
    card.querySelector('.form-grid').appendChild(field);
  });

  const facilities = document.querySelector('#fasilitas');
  if (facilities) {
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element) || !node.matches('.repeat-card')) return;
        const path = node.querySelector('[name*="[image]"]');
        const upload = node.querySelector('[name*="[image_upload]"]');
        const preview = node.querySelector('.facility-image-preview');
        if (path) path.value = '';
        if (upload) upload.value = '';
        if (preview) {
          preview.removeAttribute('style');
          preview.classList.remove('has-image');
        }
      }));
    }).observe(facilities, { childList: true });

    facilities.addEventListener('change', (event) => {
      const input = event.target.closest('input[type="file"][name*="[image_upload]"]');
      const file = input?.files?.[0];
      if (!file) return;
      const preview = input.closest('.facility-upload-field')?.querySelector('.facility-image-preview');
      if (!preview) return;
      preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      preview.classList.add('has-image');
    });
  }
});
