/*
 * Konfigurasi white-label template sekolah.
 * Di Laravel, nilai ini dapat dipindahkan ke config/school.php atau database.
 */
window.SCHOOL_DEFAULTS = {
  name: 'SMA Harapan Bangsa',
  shortName: 'Harapan Bangsa',
  level: 'Sekolah Menengah Atas',
  initials: 'HB',
  tagline: 'Membentuk generasi berkarakter, berilmu, kreatif, dan siap bersaing di tingkat global.',
  principal: 'Andi Rahman, M.Pd.',
  principalRole: 'Kepala Sekolah',
  principalQuote: 'Pendidikan adalah perjalanan untuk menyalakan potensi terbaik setiap anak.',
  phone: '62895321272932',
  email: 'info@harapanbangsa.sch.id',
  address: 'Jl. Pendidikan No. 10, Kota Anda',
  logo: '',
  principalPhoto: ''
};

window.schoolConfig = JSON.parse(localStorage.getItem('schoolConfig') || 'null') || window.SCHOOL_DEFAULTS;

window.applySchoolConfig = function (config) {
  window.schoolConfig = { ...window.SCHOOL_DEFAULTS, ...config };
  localStorage.setItem('schoolConfig', JSON.stringify(window.schoolConfig));
  document.querySelectorAll('[data-school="name"]').forEach(el => el.textContent = window.schoolConfig.name);
  document.querySelectorAll('[data-school="shortName"]').forEach(el => el.textContent = window.schoolConfig.shortName);
  document.querySelectorAll('[data-school="level"]').forEach(el => el.textContent = window.schoolConfig.level);
  document.querySelectorAll('[data-school="initials"]').forEach(el => el.textContent = window.schoolConfig.initials);
  document.querySelectorAll('[data-school="tagline"]').forEach(el => el.textContent = window.schoolConfig.tagline);
  document.querySelectorAll('[data-school="principal"]').forEach(el => el.textContent = window.schoolConfig.principal);
  document.querySelectorAll('[data-school="principalQuote"]').forEach(el => el.textContent = '“' + window.schoolConfig.principalQuote + '”');
  document.querySelectorAll('[data-school="address"]').forEach(el => el.textContent = window.schoolConfig.address);
  document.querySelectorAll('[data-school="email"]').forEach(el => { el.textContent = window.schoolConfig.email; el.href = 'mailto:' + window.schoolConfig.email; });
  document.querySelectorAll('[data-school="phone"]').forEach(el => { el.textContent = window.schoolConfig.phone.replace(/^62/, '0'); el.href = 'tel:+' + window.schoolConfig.phone; });
  if (window.schoolConfig.logo) document.querySelectorAll('.brand-mark').forEach(el => { el.textContent = ''; el.style.background = `url(${window.schoolConfig.logo}) center/contain no-repeat`; el.style.border = '0'; });
  if (window.schoolConfig.principalPhoto) document.querySelectorAll('[data-principal-photo]').forEach(el => el.src = window.schoolConfig.principalPhoto);
  document.title = window.schoolConfig.name;
};

document.addEventListener('DOMContentLoaded', () => applySchoolConfig(window.schoolConfig));
