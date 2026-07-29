document.addEventListener('DOMContentLoaded', () => {
  const ensureNavigation = () => {
    const nav = document.querySelector('.mz-nav');
    if (!nav || nav.querySelector('a[href$="#testimoni"]')) return;
    const newsLink = nav.querySelector('a[href$="#berita"]');
    const link = document.createElement('a');
    link.href = '/admin/content#testimoni';
    link.innerHTML = '<i>★</i><span>Testimoni</span>';
    newsLink ? newsLink.after(link) : nav.appendChild(link);
  };
  setTimeout(ensureNavigation, 0);
  if (document.querySelector('#testimoni')) return;

  const section = document.createElement('section');
  section.className = 'mz-card editor-section';
  section.id = 'testimoni';
  section.innerHTML = '<div class="section-head"><div><h2>Testimoni orang tua</h2><p>Tambah dan atur testimoni yang tampil bergantian pada landing page.</p></div><button class="mz-button testimonial-add" type="button">+ Tambah Testimoni</button></div><div class="testimonial-admin-list"></div>';

  const list = section.querySelector('.testimonial-admin-list');
  const renderCard = (data = {}) => {
    const index = list.children.length;
    const card = document.createElement('div');
    card.className = 'repeat-card testimonial-admin-card';
    card.innerHTML = `<div class="section-head"><h3>Testimoni ${index + 1}</h3><button class="testimonial-delete" type="button">Hapus</button></div><div class="form-grid"><div class="field full"><label>Isi testimoni</label><textarea name="testimonials[${index}][quote]" maxlength="1000" required></textarea></div><div class="field"><label>Nama pemberi testimoni</label><input name="testimonials[${index}][name]" maxlength="120" required></div><div class="field"><label>Keterangan</label><input name="testimonials[${index}][role]" maxlength="160" placeholder="Orang tua siswa kelas XI"></div><div class="field"><label>Nilai kepuasan</label><select name="testimonials[${index}][rating]"></select></div><div class="field"><label>Label nilai</label><input name="testimonials[${index}][rating_label]" maxlength="100" placeholder="Kepuasan Orang Tua"></div></div>`;
    const ratingSelect = card.querySelector(`[name="testimonials[${index}][rating]"]`);
    for (let value = 10; value <= 50; value += 1) {
      const score = value / 10;
      const label = `${Number.isInteger(score) ? score.toFixed(0) : score.toFixed(1)}/5`;
      ratingSelect.add(new Option(label, label));
    }
    Object.entries(data).forEach(([key, value]) => {
      const input = card.querySelector(`[name$="[${key}]"]`);
      if (input) input.value = value || '';
    });
    card.querySelector('.testimonial-delete').addEventListener('click', () => {
      if (list.children.length <= 1) return;
      card.remove();
      reindex();
    });
    list.appendChild(card);
    return card;
  };
  const reindex = () => {
    [...list.children].forEach((card, index) => {
      card.querySelector('h3').textContent = `Testimoni ${index + 1}`;
      card.querySelectorAll('[name^="testimonials["]').forEach((field) => {
        field.name = field.name.replace(/^testimonials\[\d+\]/, `testimonials[${index}]`);
      });
    });
  };

  (window.testimonialSettings?.length ? window.testimonialSettings : [{}]).forEach(renderCard);
  section.querySelector('.testimonial-add').addEventListener('click', () => {
    const card = renderCard({ rating: '5/5', rating_label: 'Kepuasan Orang Tua' });
    card.classList.add('table-source', 'is-editing');
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'modal-close';
    close.innerHTML = '&times;';
    close.addEventListener('click', () => { card.remove(); reindex(); });
    card.prepend(close);
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    footer.innerHTML = '<button type="button" class="modal-cancel">Batal</button><button type="button" class="modal-save">Simpan testimoni</button>';
    footer.querySelector('.modal-cancel').addEventListener('click', () => { card.remove(); reindex(); });
    footer.querySelector('.modal-save').addEventListener('click', () => {
      const form = card.closest('form');
      let field = form.querySelector('[name="return_section"]');
      if (!field) { field = document.createElement('input'); field.type = 'hidden'; field.name = 'return_section'; form.appendChild(field); }
      field.value = 'testimoni';
      form.requestSubmit();
    });
    card.appendChild(footer);
  });
  const contact = document.querySelector('#kontak');
  contact ? contact.before(section) : document.querySelector('.admin-form')?.appendChild(section);
});
