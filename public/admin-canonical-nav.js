document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('link[href*="admin-responsive.css"]')) {
    const responsive = document.createElement('link');
    responsive.rel = 'stylesheet';
    responsive.href = '/admin-responsive.css?v=3';
    document.head.appendChild(responsive);
  }
  const nav = document.querySelector('.mz-nav');
  if (!nav) return;

  nav.innerHTML = `
    <div class="mz-caption">Menu utama</div>
    <a href="/dashboard"><i>⌂</i><span>Dashboard</span></a>
    <div class="mz-caption">Konten landing page</div>
    <a href="/admin/content#hero"><i>◈</i><span>Tampilan Utama</span></a>
    <a href="/admin/content#profil"><i>◆</i><span>Profile</span></a>
    <a href="/admin/content#visi"><i>◉</i><span>Visi & Misi</span></a>
    <a href="/admin/content#akademik"><i>▦</i><span>Program Unggulan</span></a>
    <a href="/admin/content#guru"><i>♧</i><span>Guru & Pengajar</span></a>
    <a href="/admin/content#fasilitas"><i>▣</i><span>Fasilitas</span></a>
    <a href="/admin/content#berita"><i>▤</i><span>Berita & Artikel</span></a>
    <div class="mz-caption">Layanan</div>
    <a href="/admin/content#kontak"><i>◉</i><span>PPDB & Kontak</span></a>
    <div class="mz-caption">Keamanan</div>
    <a href="/admin/users"><i>⚿</i><span>User Management</span></a>`;

  if (!document.querySelector('.admin-mobile-header')) {
    const sidebar = document.querySelector('.mz-sidebar');
    const brand = sidebar?.querySelector('.mz-brand');
    if (sidebar && brand) {
      const mobileHeader = document.createElement('header');
      mobileHeader.className = 'admin-mobile-header';
      mobileHeader.innerHTML = '<button type="button" class="admin-menu-toggle" aria-label="Buka menu" aria-expanded="false"><span></span><span></span><span></span></button>';
      mobileHeader.appendChild(brand.cloneNode(true));
      document.body.prepend(mobileHeader);
      const backdrop = document.createElement('div');
      backdrop.className = 'admin-sidebar-backdrop';
      document.body.appendChild(backdrop);
      const toggle = mobileHeader.querySelector('.admin-menu-toggle');
      const closeSidebar = () => { document.body.classList.remove('admin-sidebar-open'); toggle.setAttribute('aria-expanded', 'false'); };
      toggle.addEventListener('click', () => { const open = !document.body.classList.contains('admin-sidebar-open'); document.body.classList.toggle('admin-sidebar-open', open); toggle.setAttribute('aria-expanded', String(open)); });
      backdrop.addEventListener('click', closeSidebar);
      nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeSidebar(); });
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSidebar(); });
    }
  }

  nav.querySelectorAll('a[href*="#"]').forEach((link) => link.addEventListener('click', (event) => {
    const hash = new URL(link.href).hash;
    const target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    location.hash = hash;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nav.querySelectorAll('a').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  }));
});
