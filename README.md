# Landing Page SMA Harapan Bangsa

Isi file:
- `index.html` — struktur halaman
- `style.css` — desain dan responsif
- `script.js` — menu mobile
- `assets/` — gambar lokal

## Cara membuka
Klik dua kali `index.html`.

## Cara online
Upload seluruh isi folder ini ke folder `public_html` hosting Anda.

## Bagian yang perlu diganti
- Nama sekolah
- Nomor WhatsApp
- Email
- Alamat
- Data statistik
- Berita
- Foto sekolah
## Versi Laravel 8.1+

Struktur Laravel sudah disiapkan di `app/`, `config/school.php`, `routes/web.php`, dan `resources/views/`. Jalankan pada instalasi Laravel:

```bash
composer install
php artisan key:generate
php artisan serve
```

Atur identitas setiap sekolah melalui `.env` (`SCHOOL_NAME`, `SCHOOL_PRINCIPAL`, `SCHOOL_EMAIL`, dan seterusnya). Pindahkan folder `assets`, `style.css`, dan `portal.css` ke `public/` saat mengintegrasikan ke project Laravel baru. Untuk autentikasi produksi, pasang Laravel Breeze lalu jalankan migration.
