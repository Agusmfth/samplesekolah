document.addEventListener('DOMContentLoaded', () => {
  ['#akademik','#guru','#fasilitas','#berita','#testimoni'].forEach((selector) => {
    const section = document.querySelector(selector); if (!section) return;
    const cards = [...section.querySelectorAll('.repeat-card')]; if (!cards.length) return;
    const table = document.createElement('table'); table.className = 'admin-data-table';
    table.innerHTML = '<thead><tr><th>Nama</th><th>Informasi</th><th>Status</th><th>Aksi</th></tr></thead><tbody></tbody>';
    const body = table.querySelector('tbody');
    cards.forEach((card, index) => {
      const fields = [...card.querySelectorAll('input:not([type=hidden]):not([type=file]), textarea')]; const isTestimonial = selector === '#testimoni'; const name = (isTestimonial ? card.querySelector('[name$="[name]"]')?.value : fields[0]?.value) || `Belum diisi (${index + 1})`; const info = (isTestimonial ? card.querySelector('[name$="[quote]"]')?.value : fields[1]?.value) || '-';
      const row = document.createElement('tr'); row.innerHTML = `<td><strong>${name}</strong></td><td>${info.substring(0,90)}${info.length>90?'…':''}</td><td><span class="table-status">${name.startsWith('Belum')?'Draft':'Aktif'}</span></td><td><div class="table-actions"><button type="button" class="table-edit">Edit</button><button type="button" class="table-delete">Hapus</button></div></td>`;
      if (!card.querySelector('.modal-close')) { const close=document.createElement('button'); close.type='button'; close.className='modal-close'; close.innerHTML='&times;'; close.addEventListener('click',()=>card.classList.remove('is-editing')); card.prepend(close); const footer=document.createElement('div'); footer.className='modal-footer'; footer.innerHTML='<button type="button" class="modal-cancel">Batal</button><button type="button" class="modal-save">Simpan perubahan</button>'; footer.querySelector('.modal-cancel').addEventListener('click',()=>card.classList.remove('is-editing')); footer.querySelector('.modal-save').addEventListener('click',()=>{ const form=card.closest('form'); let field=form.querySelector('[name=return_section]'); if(!field){field=document.createElement('input');field.type='hidden';field.name='return_section';form.appendChild(field);} field.value=location.hash.replace('#','')||'profil'; form.requestSubmit(); }); card.appendChild(footer); }
      row.querySelector('.table-edit').addEventListener('click', () => { document.querySelectorAll('.table-source.is-editing').forEach(item=>item.classList.remove('is-editing')); card.classList.add('is-editing'); });
      row.querySelector('.table-delete').addEventListener('click', () => { const form=card.closest('form'); card.remove(); row.remove(); let field=form.querySelector('[name=return_section]'); if(!field){field=document.createElement('input');field.type='hidden';field.name='return_section';form.appendChild(field);} field.value=location.hash.replace('#','')||'profil'; form.requestSubmit(); });
      body.appendChild(row); card.classList.add('table-source');
    });
    section.querySelector('.section-head').after(table);
  });
});
