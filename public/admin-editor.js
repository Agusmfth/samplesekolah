document.addEventListener('DOMContentLoaded', () => {
  const setupRepeater = (sectionId, group, label) => {
    const section = document.querySelector(sectionId);
    if (!section) return;
    const heading = section.querySelector('.section-head');
    const add = document.createElement('button');
    add.type = 'button'; add.className = 'mz-button'; add.textContent = `+ Tambah ${label}`;
    heading.appendChild(add);

    const renumber = () => {
      section.querySelectorAll('.repeat-card').forEach((card, index) => {
        const title = card.querySelector('h3');
        if (title) title.textContent = `${label} ${index + 1}`;
        card.querySelectorAll('[name]').forEach((input) => {
          input.name = input.name.replace(new RegExp(`${group}\\[\\d+\\]`), `${group}[${index}]`);
        });
      });
    };
    const decorate = () => {};
    section.querySelectorAll('.repeat-card').forEach(decorate);
    add.addEventListener('click', () => {
      const source = section.querySelector('.repeat-card:last-of-type');
      if (!source) return;
      const clone = source.cloneNode(true);
      clone.querySelectorAll('input,textarea').forEach((field) => {
        field.value = field.type === 'hidden' && group === 'news' ? `berita-${Date.now()}` : '';
      });
      clone.querySelectorAll('.facility-image-preview').forEach((preview) => {
        preview.removeAttribute('style');
        preview.classList.remove('has-image');
      });
      if (group === 'facilities') {
        clone.querySelectorAll('[name*="[image]"], [name*="[image_upload]"]').forEach((field) => {
          field.value = '';
        });
      }
      clone.querySelector('.remove-item')?.remove(); clone.querySelector('.modal-close')?.remove(); clone.classList.remove('table-source'); decorate(clone); section.appendChild(clone); renumber();
      const close=document.createElement('button'); close.type='button'; close.className='modal-close'; close.innerHTML='&times;'; close.addEventListener('click',()=>clone.classList.remove('is-editing')); clone.prepend(close); clone.classList.add('table-source','is-editing');
    });
  };
  setupRepeater('#guru', 'teachers', 'Guru');
  setupRepeater('#berita', 'news', 'Berita');
  setupRepeater('#akademik', 'programs', 'Program');
  setupRepeater('#fasilitas', 'facilities', 'Fasilitas');
});
