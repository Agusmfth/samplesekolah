@include('admin.shell', ['page' => 'dashboard', 'title' => 'Ringkasan Dashboard'])
<script src="{{ asset('admin-canonical-nav.js') }}?v={{ filemtime(public_path('admin-canonical-nav.js')) }}"></script>
<script src="{{ asset('admin-dashboard-links.js') }}?v={{ filemtime(public_path('admin-dashboard-links.js')) }}"></script>
