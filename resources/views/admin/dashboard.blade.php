@include('admin.shell', ['page' => 'dashboard', 'title' => 'Ringkasan Dashboard'])
<link rel="stylesheet" href="{{ asset('admin-success-animation.css') }}?v={{ filemtime(public_path('admin-success-animation.css')) }}">
<script>window.adminSuccessMessage = @json(session('success'));</script>
<script defer src="{{ asset('admin-success-animation.js') }}?v={{ filemtime(public_path('admin-success-animation.js')) }}"></script>
<script src="{{ asset('admin-canonical-nav.js') }}?v={{ filemtime(public_path('admin-canonical-nav.js')) }}"></script>
<script src="{{ asset('admin-dashboard-links.js') }}?v={{ filemtime(public_path('admin-dashboard-links.js')) }}"></script>
