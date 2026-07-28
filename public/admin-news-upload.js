document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#berita .repeat-card').forEach((card, index) => {
    const imagePath = card.querySelector(`[name="news[${index}][image]"]`);
    if (!imagePath || card.querySelector('.news-upload-field')) return;
    const currentPath = imagePath.value;
    imagePath.type = 'hidden';
    imagePath.closest('.field').style.display = 'none';

    const field = document.createElement('div');
    field.className = 'field full news-upload-field';
    field.innerHTML = `<label>Gambar berita</label><input type="file" name="news[${index}][image_upload]" accept="image/jpeg,image/png,image/webp"><small>Format JPG, PNG, atau WebP. Maksimal 4 MB.</small><div class="facility-image-preview"></div>`;
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
    imagePath.closest('.form-grid').insertBefore(field, imagePath.closest('.field'));
  });

  document.querySelector('#berita')?.addEventListener('change', (event) => {
    const input = event.target.closest('input[type="file"][name*="[image_upload]"]');
    const file = input?.files?.[0];
    if (!file) return;
    const preview = input.closest('.news-upload-field')?.querySelector('.facility-image-preview');
    if (!preview) return;
    preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    preview.classList.add('has-image');
  });
});
