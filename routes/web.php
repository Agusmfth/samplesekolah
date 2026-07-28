<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\AdminPortalController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Http\Request;
Route::get('/', HomeController::class)->name('home');
Route::get('/berita/{slug}', [NewsController::class, 'show'])->name('news.show');
Route::view('/login', 'auth.login')->name('login');
Route::post('/login', function (Request $request) {
    $credentials = $request->validate(['email' => ['required', 'email'], 'password' => ['required']]);
    $admin = AdminUserController::authenticate($credentials['email'], $credentials['password']);
    if (!$admin) {
        return back()->withErrors(['email' => 'Email atau kata sandi tidak sesuai.'])->onlyInput('email');
    }
    $request->session()->regenerate();
    $request->session()->put('school_admin', true);
    $request->session()->put('admin_email', $admin['email']);
    return redirect()->route('dashboard');
})->name('login.store');
Route::get('/dashboard', function (Request $request) {
    abort_unless($request->session()->get('school_admin'), 403);
    return view('admin.dashboard');
})->name('dashboard');
Route::get('/admin/portal', function (Request $request) { abort_unless($request->session()->get('school_admin'), 403); return redirect()->route('dashboard'); })->name('admin.portal');
Route::get('/admin/content', [ContentController::class, 'edit'])->name('admin.content');
Route::post('/admin/content', [ContentController::class, 'update'])->name('admin.content.update');
Route::get('/admin/articles', [ContentController::class, 'articles'])->name('admin.articles');
Route::get('/admin/teachers', [ContentController::class, 'teachers'])->name('admin.teachers');
Route::post('/admin/articles', [ContentController::class, 'storeArticle'])->name('admin.articles.store');
Route::delete('/admin/articles/{slug}', [ContentController::class, 'destroyArticle'])->name('admin.articles.destroy');
Route::get('/admin/articles/{slug}/edit', [ContentController::class, 'editArticle'])->name('admin.articles.edit');
Route::put('/admin/articles/{slug}', [ContentController::class, 'updateArticle'])->name('admin.articles.update');
Route::get('/admin/users', [AdminUserController::class, 'index'])->name('admin.users');
Route::post('/admin/users', [AdminUserController::class, 'store'])->name('admin.users.store');
Route::put('/admin/users/{id}', [AdminUserController::class, 'update'])->name('admin.users.update');
Route::delete('/admin/users/{id}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');
Route::get('/admin/settings', function (Request $request) {
    abort_unless($request->session()->get('school_admin'), 403);
    return view('admin.page', ['title' => 'Pengaturan website']);
})->name('admin.settings');
foreach (['agenda' => 'akademik', 'ppdb' => 'kontak'] as $slug => $section) {
    Route::get('/admin/'.$slug, function (Request $request) use ($section) {
        abort_unless($request->session()->get('school_admin'), 403);
        return view('admin.page', ['title' => ucfirst($section)]);
    })->name('admin.'.$slug);
}
Route::post('/logout', function (Request $request) {
    $request->session()->invalidate(); $request->session()->regenerateToken(); return redirect()->route('home');
})->name('logout');
