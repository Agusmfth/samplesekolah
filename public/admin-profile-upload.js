document.addEventListener('DOMContentLoaded', () => {
  const pathInput = document.querySelector('#profil input[name="profile_image"]');
  if (!pathInput) return;
  const oldField = pathInput.closest('.field');
  const field = document.createElement('div');
  field.className = 'field profile-photo-field';
  field.dataset.currentImage = `/${pathInput.value.replace(/^\//, '')}`;
  field.innerHTML = '<label>Foto kepala sekolah</label><input type="file" name="profile_image_upload" accept="image/jpeg,image/png,image/webp"><small>Format JPG, PNG, atau WebP. Maksimal 4 MB.</small><div class="profile-image-preview" role="img" aria-label="Preview foto kepala sekolah"></div>';
  oldField.replaceWith(field);
  const input = field.querySelector('input[type="file"]');
  const preview = field.querySelector('.profile-image-preview');
  const showPreview = (url) => {
    preview.style.backgroundImage = `url('${url}')`;
    preview.classList.add('has-image');
  };
  if (field.dataset.currentImage) showPreview(field.dataset.currentImage);
  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (file) showPreview(URL.createObjectURL(file));
  });
});
