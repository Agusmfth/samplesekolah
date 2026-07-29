document.addEventListener('DOMContentLoaded', () => {
  const missionInput = document.querySelector('#visi textarea[name="mission"]');
  if (missionInput) {
    const label = missionInput.closest('.field')?.querySelector('label');
    if (label) label.textContent = 'Misi sekolah - satu misi per baris';
    const hint = document.createElement('small');
    hint.textContent = 'Format opsional: Judul misi | Penjelasan singkat';
    missionInput.after(hint);
  }

  const profileGrid = document.querySelector('#profil .form-grid');
  if (profileGrid) {
    const field = document.createElement('div');
    field.className = 'field full';
    field.innerHTML = '<label>Link YouTube video profil sekolah</label><input type="url" name="profile_video_url" placeholder="https://www.youtube.com/watch?v=..."><small>Opsional. Tempel link video profil sekolah dari YouTube.</small>';
    field.querySelector('input').value = window.profileVideoUrl || '';
    profileGrid.appendChild(field);
  }

  document.querySelectorAll('#berita .repeat-card').forEach((card, index) => {
    const grid = card.querySelector('.form-grid');
    if (!grid) return;
    const field = document.createElement('div');
    field.className = 'field full';
    field.innerHTML = `<label>Link YouTube video kegiatan</label><input type="url" name="news[${index}][youtube_url]" placeholder="https://www.youtube.com/watch?v=..."><small>Opsional. Video akan tampil pada halaman detail berita.</small>`;
    field.querySelector('input').value = window.newsYoutubeUrls?.[index] || '';
    const contentField = grid.querySelector(`textarea[name="news[${index}][content]"]`)?.closest('.field');
    grid.insertBefore(field, contentField || null);
  });
});
