document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#guru .repeat-card').forEach((card, index) => {
    const initials = card.querySelector(`[name="teachers[${index}][initials]"]`);
    const color = card.querySelector(`[name="teachers[${index}][color]"]`);
    if (initials) initials.closest('.field').style.display = 'none';
    if (color) color.closest('.field').style.display = 'none';
    if (card.querySelector('.teacher-upload-field')) return;

    const field = document.createElement('div');
    field.className = 'field full teacher-upload-field';
    field.innerHTML = `<label>Foto guru</label><div class="teacher-upload-control"><div class="teacher-upload-preview"></div><div class="teacher-upload-input"><input type="file" name="teachers[${index}][photo_upload]" accept="image/jpeg,image/png,image/webp"><small>Format JPG, PNG, atau WebP. Maksimal 2 MB.</small></div></div>`;

    const input = field.querySelector('input');
    const preview = field.querySelector('.teacher-upload-preview');
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;
      preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      preview.classList.add('has-image');
    });

    card.querySelector('.form-grid').prepend(field);
  });
});
