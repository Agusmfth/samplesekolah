<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AdminUserController extends Controller
{
    private static function path(): string
    {
        return storage_path('app/admin-users.json');
    }

    public static function all(): array
    {
        $path = self::path();
        if (is_file($path)) {
            $users = json_decode(file_get_contents($path), true);
            if (is_array($users) && count($users)) return $users;
        }

        $users = [[
            'id' => (string) Str::uuid(),
            'name' => 'Administrator',
            'email' => strtolower(env('ADMIN_EMAIL', 'admin@sekolah.test')),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'sekolah123')),
            'created_at' => now()->toDateTimeString(),
        ]];
        self::save($users);
        return $users;
    }

    private static function save(array $users): void
    {
        file_put_contents(self::path(), json_encode(array_values($users), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
    }

    public static function authenticate(string $email, string $password): ?array
    {
        foreach (self::all() as $user) {
            if (strtolower($user['email']) === strtolower($email) && Hash::check($password, $user['password'])) return $user;
        }
        return null;
    }

    private function guard(Request $request): void
    {
        abort_unless($request->session()->get('school_admin'), 403);
    }

    public function index(Request $request): View
    {
        $this->guard($request);
        return view('admin.users', ['users' => self::all()]);
    }

    public function store(Request $request)
    {
        $this->guard($request);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        $users = self::all();
        if (collect($users)->contains(fn ($user) => strtolower($user['email']) === strtolower($data['email']))) {
            return back()->withErrors(['email' => 'Email tersebut sudah digunakan.'])->withInput();
        }
        $users[] = ['id'=>(string) Str::uuid(),'name'=>$data['name'],'email'=>strtolower($data['email']),'password'=>Hash::make($data['password']),'created_at'=>now()->toDateTimeString()];
        self::save($users);
        return back()->with('success', 'Akun admin berhasil ditambahkan.');
    }

    public function update(Request $request, string $id)
    {
        $this->guard($request);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);
        $users = self::all();
        if (collect($users)->contains(fn ($user) => $user['id'] !== $id && strtolower($user['email']) === strtolower($data['email']))) {
            return back()->withErrors(['email' => 'Email tersebut sudah digunakan.']);
        }
        foreach ($users as &$user) {
            if ($user['id'] !== $id) continue;
            $oldEmail = $user['email'];
            $user['name'] = $data['name'];
            $user['email'] = strtolower($data['email']);
            if (!empty($data['password'])) $user['password'] = Hash::make($data['password']);
            if ($request->session()->get('admin_email') === $oldEmail) $request->session()->put('admin_email', $user['email']);
            break;
        }
        unset($user);
        self::save($users);
        return back()->with('success', 'Akun admin berhasil diperbarui.');
    }

    public function destroy(Request $request, string $id)
    {
        $this->guard($request);
        $users = self::all();
        if (count($users) <= 1) return back()->withErrors(['user' => 'Minimal harus ada satu akun admin.']);
        $target = collect($users)->firstWhere('id', $id);
        if (!$target) abort(404);
        if ($request->session()->get('admin_email') === $target['email']) return back()->withErrors(['user' => 'Akun yang sedang digunakan tidak dapat dihapus.']);
        self::save(array_values(array_filter($users, fn ($user) => $user['id'] !== $id)));
        return back()->with('success', 'Akun admin berhasil dihapus.');
    }
}
