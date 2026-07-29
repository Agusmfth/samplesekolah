<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\View\View;

class ContentController extends Controller
{
    private function guard(Request $request): void { abort_unless($request->session()->get('school_admin'), 403); }

    public function articles(Request $request): View
    {
        $this->guard($request);
        return view('admin.articles', ['articles' => self::load()['news']]);
    }

    public function teachers(Request $request): View
    {
        $this->guard($request);
        return view('admin.teachers', ['teachers' => self::load()['teachers']]);
    }

    public function storeArticle(Request $request)
    {
        $this->guard($request);
        $data = $request->validate(['title'=>'required|string|max:180','category'=>'required|string|max:60','date'=>'required|string|max:40','image'=>'required|string|max:255','excerpt'=>'required|string|max:300','content'=>'required|string']);
        $data['slug'] = Illuminate\Support\Str::slug($data['title']).'-'.time();
        $data['content'] = array_values(array_filter(array_map('trim', preg_split('/\R+/', $data['content']))));
        $payload = self::load(); $payload['news'][] = $data;
        file_put_contents(storage_path('app/site-content.json'), json_encode($payload, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
        return redirect()->route('admin.articles')->with('success','Berita berhasil ditambahkan.');
    }

    public function destroyArticle(Request $request, string $slug)
    {
        $this->guard($request); $payload = self::load();
        $payload['news'] = array_values(array_filter($payload['news'], fn($item) => ($item['slug'] ?? '') !== $slug));
        file_put_contents(storage_path('app/site-content.json'), json_encode($payload, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
        return back()->with('success','Berita berhasil dihapus.');
    }

    public function editArticle(Request $request, string $slug): View
    {
        $this->guard($request); $article = collect(self::load()['news'])->firstWhere('slug', $slug); abort_unless($article,404); return view('admin.article-edit', compact('article'));
    }

    public function updateArticle(Request $request, string $slug)
    {
        $this->guard($request); $data=$request->validate(['title'=>'required|string|max:180','category'=>'required|string|max:60','date'=>'required|string|max:40','image'=>'required|string|max:255','excerpt'=>'required|string|max:300','content'=>'required|string']); $payload=self::load();
        foreach($payload['news'] as &$article){ if(($article['slug']??'')===$slug){ $article=array_merge($article,$data); $article['content']=array_values(array_filter(array_map('trim',preg_split('/\R+/',$data['content'])))); break; }}
        file_put_contents(storage_path('app/site-content.json'),json_encode($payload,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)); return redirect()->route('admin.portal',['section'=>'news'])->with('success','Berita berhasil diperbarui.');
    }
    public static function load(): array
    {
        $file = storage_path('app/site-content.json');
        if (! is_file($file)) return ['school' => [], 'news' => config('news'), 'programs' => config('programs'), 'teachers' => config('teachers'), 'facilities' => config('facilities')];
        $data = json_decode(file_get_contents($file), true);
        if (! is_array($data)) return ['school'=>[],'news'=>config('news'),'programs'=>config('programs'),'teachers'=>config('teachers'),'facilities'=>config('facilities')];
        if (empty($data['programs'])) $data['programs'] = config('programs');
        if (empty($data['facilities'])) $data['facilities'] = config('facilities');
        if (empty($data['teachers'])) $data['teachers'] = config('teachers');
        return array_replace_recursive(['school'=>[],'news'=>config('news'),'programs'=>config('programs'),'teachers'=>config('teachers'),'facilities'=>config('facilities')], $data);
    }

    public function edit(Request $request): View
    {
        abort_unless($request->session()->get('school_admin'), 403);
        return view('admin.content', ['content' => self::load(), 'title' => 'Konten landing page']);
    }

    public function update(Request $request)
    {
        abort_unless($request->session()->get('school_admin'), 403);
        $request->validate([
            'teachers.*.photo_upload' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'facilities.*.image_upload' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'news.*.image_upload' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'hero_image_upload' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'profile_image_upload' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'profile_video_url' => ['nullable', 'url', 'max:500'],
            'news.*.youtube_url' => ['nullable', 'url', 'max:500'],
        ], [
            'teachers.*.photo_upload.image' => 'Foto guru harus berupa gambar.',
            'teachers.*.photo_upload.mimes' => 'Foto guru harus berformat JPG, PNG, atau WebP.',
            'teachers.*.photo_upload.max' => 'Ukuran foto guru maksimal 2 MB.',
            'hero_image_upload.max' => 'Ukuran gambar utama maksimal 4 MB.',
            'profile_image_upload.image' => 'Foto kepala sekolah harus berupa gambar.',
            'profile_image_upload.mimes' => 'Foto kepala sekolah harus berformat JPG, PNG, atau WebP.',
            'profile_image_upload.max' => 'Ukuran foto kepala sekolah maksimal 4 MB.',
            'profile_video_url.url' => 'Link video profil harus berupa URL yang valid.',
            'news.*.youtube_url.url' => 'Link video berita harus berupa URL yang valid.',
            'facilities.*.image_upload.image' => 'File fasilitas harus berupa gambar.',
            'facilities.*.image_upload.mimes' => 'Gambar fasilitas harus berformat JPG, PNG, atau WebP.',
            'facilities.*.image_upload.max' => 'Ukuran gambar fasilitas maksimal 4 MB.',
            'news.*.image_upload.image' => 'File berita harus berupa gambar.',
            'news.*.image_upload.mimes' => 'Gambar berita harus berformat JPG, PNG, atau WebP.',
            'news.*.image_upload.max' => 'Ukuran gambar berita maksimal 4 MB.',
        ]);
        $current = self::load();
        $school = $current['school'];
        foreach (['name','short_name','level','initials','tagline','principal','principal_quote','profile_video_url','phone','email','address','profile_title','profile','experience_years','benefits','vision','mission','hero_announcement','hero_caption','hero_primary_button','hero_secondary_button','hero_feature_title','hero_feature_text','hero_stat_1_value','hero_stat_1_label','hero_stat_2_value','hero_stat_2_label','hero_stat_3_value','hero_stat_3_label','trust_1_value','trust_1_label','trust_2_value','trust_2_label','trust_3_value','trust_3_label','trust_4_value','trust_4_label','ppdb_label'] as $field) {
            if ($request->has($field)) $school[$field] = trim((string) $request->input($field));
        }
        if ($request->hasFile('hero_image_upload')) {
            $photo = $request->file('hero_image_upload');
            $directory = public_path('assets/hero');
            File::ensureDirectoryExists($directory);
            $filename = 'hero-'.now()->format('YmdHis').'-'.bin2hex(random_bytes(3)).'.'.$photo->extension();
            $photo->move($directory, $filename);
            $school['hero_image'] = 'assets/hero/'.$filename;
        }
        if ($request->hasFile('profile_image_upload')) {
            $photo = $request->file('profile_image_upload');
            $directory = public_path('assets/profile');
            File::ensureDirectoryExists($directory);
            $filename = 'kepala-sekolah-'.now()->format('YmdHis').'-'.bin2hex(random_bytes(3)).'.'.$photo->extension();
            $photo->move($directory, $filename);
            $school['profile_image'] = 'assets/profile/'.$filename;
        }
        $news = [];
        foreach ($request->input('news', []) as $index => $item) {
            if (! trim((string) ($item['title'] ?? ''))) continue;
            $savedNews = [
                'slug' => trim((string) ($item['slug'] ?? 'berita-'.($index + 1))),
                'title' => trim((string) $item['title']), 'category' => trim((string) ($item['category'] ?? 'Kegiatan')),
                'date' => trim((string) ($item['date'] ?? '')), 'image' => trim((string) ($item['image'] ?? 'assets/news-pameran.png')),
                'youtube_url' => trim((string) ($item['youtube_url'] ?? '')),
                'excerpt' => trim((string) ($item['excerpt'] ?? '')), 'content' => array_values(array_filter(array_map('trim', preg_split('/\R+/', (string) ($item['content'] ?? ''))))),
            ];
            if ($request->hasFile("news.$index.image_upload")) {
                $photo = $request->file("news.$index.image_upload");
                $directory = public_path('assets/news');
                File::ensureDirectoryExists($directory);
                $filename = 'berita-'.now()->format('YmdHis').'-'.$index.'-'.bin2hex(random_bytes(3)).'.'.$photo->extension();
                $photo->move($directory, $filename);
                $savedNews['image'] = 'assets/news/'.$filename;
            }
            $news[] = $savedNews;
        }
        $payload = $current;
        $payload['school'] = $school;
        $payload['news'] = $news ?: $current['news'];
        foreach (['programs', 'teachers', 'facilities'] as $group) {
            if ($request->has($group)) {
                $items = [];
                foreach ($request->input($group, []) as $index => $item) {
                    if (trim((string) ($item['name'] ?? $item['title'] ?? '')) === '') continue;
                    $savedItem = array_merge($current[$group][$index] ?? [], $item);

                    if ($group === 'programs' && empty($savedItem['icon'])) {
                        $programIcons = ['⚛', '文', '✎', '◎', '▦', '★', '●', '♬'];
                        $savedItem['icon'] = $programIcons[$index % count($programIcons)];
                    }

                    if ($group === 'teachers' && $request->hasFile("teachers.$index.photo_upload")) {
                        $photo = $request->file("teachers.$index.photo_upload");
                        $directory = public_path('assets/teachers');
                        File::ensureDirectoryExists($directory);
                        $filename = 'guru-'.now()->format('YmdHis').'-'.$index.'-'.bin2hex(random_bytes(3)).'.'.$photo->extension();
                        $photo->move($directory, $filename);
                        $savedItem['photo'] = 'assets/teachers/'.$filename;
                    }

                    if ($group === 'facilities' && $request->hasFile("facilities.$index.image_upload")) {
                        $photo = $request->file("facilities.$index.image_upload");
                        $directory = public_path('assets/facilities');
                        File::ensureDirectoryExists($directory);
                        $filename = 'fasilitas-'.now()->format('YmdHis').'-'.$index.'-'.bin2hex(random_bytes(3)).'.'.$photo->extension();
                        $photo->move($directory, $filename);
                        $savedItem['image'] = 'assets/facilities/'.$filename;
                    }

                    $items[] = $savedItem;
                }
                $payload[$group] = $items;
            }
        }
        file_put_contents(storage_path('app/site-content.json'), json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        $section = preg_replace('/[^a-z-]/', '', (string) $request->input('return_section', 'profil'));
        return redirect(route('admin.content').'#'.$section)->with('success', 'Konten landing page berhasil disimpan.');
    }
}
