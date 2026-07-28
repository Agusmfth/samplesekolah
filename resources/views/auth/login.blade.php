<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Login · {{ config('school.name') }}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('style.css') }}"><link rel="stylesheet" href="{{ asset('portal.css') }}"><link rel="stylesheet" href="{{ asset('login-refresh.css') }}?v={{ filemtime(public_path('login-refresh.css')) }}"><link rel="stylesheet" href="{{ asset('login-eye.css') }}?v={{ filemtime(public_path('login-eye.css')) }}"><link rel="stylesheet" href="{{ asset('login-status.css') }}?v={{ filemtime(public_path('login-status.css')) }}">
</head>
<body class="auth-page">
<main class="auth-layout">
  <section class="auth-intro">
    <a class="auth-brand" href="{{ route('home') }}"><span class="auth-logo">{{ config('school.initials') }}</span><span><b>{{ config('school.short_name') }}</b><small>Portal Sekolah</small></span></a>
    <div class="auth-intro-copy"><span class="auth-kicker">Portal administrasi sekolah</span><h1>Kelola informasi sekolah dalam satu tempat.</h1><p>Akses khusus administrator untuk memperbarui profil, akademik, guru, fasilitas, dan berita sekolah.</p></div>
    <a class="auth-back" href="{{ route('home') }}">← Kembali ke website</a>
  </section>
  <section class="auth-form-panel"><div class="auth-card">
    <div class="eyebrow">Akses administrator</div><h2>Selamat datang kembali.</h2><p class="auth-subtitle">Masukkan akun Anda untuk melanjutkan ke dashboard.</p>
    @if($errors->any())<div class="auth-error" role="alert">{{ $errors->first() }}</div>@endif
    <form method="POST" action="{{ route('login') }}">@csrf
      <label>Email<input name="email" type="email" value="{{ old('email') }}" placeholder="nama@sekolah.sch.id" autocomplete="email" required autofocus></label>
      <label>Kata sandi<span class="password-field"><input id="login-password" name="password" type="password" placeholder="Masukkan kata sandi" autocomplete="current-password" required><button type="button" class="password-toggle" aria-label="Tampilkan kata sandi"><svg class="eye-open" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/></svg><svg class="eye-closed" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 6.2A10 10 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.1 2.7M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6a10 10 0 0 0 4.1-.9M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg></button></span></label>
      <button class="btn btn-primary auth-submit" type="submit">Masuk ke dashboard <span>→</span></button>
    </form><p class="auth-help">Akses bermasalah? Hubungi administrator sekolah.</p>
  </div></section>
</main>
<script>const toggle=document.querySelector('.password-toggle'),password=document.querySelector('#login-password');toggle.addEventListener('click',()=>{const visible=password.type==='text';password.type=visible?'password':'text';toggle.classList.toggle('is-visible',!visible);toggle.setAttribute('aria-label',visible?'Tampilkan kata sandi':'Sembunyikan kata sandi');});</script><script defer src="{{ asset('login-status.js') }}?v={{ filemtime(public_path('login-status.js')) }}"></script>
</body></html>
