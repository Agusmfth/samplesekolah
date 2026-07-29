<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class NewsController extends Controller
{
    public function show(string $slug): View
    {
        $articles = collect(ContentController::load()['news']);
        $article = $articles->firstWhere('slug', $slug);

        abort_unless($article, 404);

        return view('news.show', [
            'school' => config('school'),
            'article' => $article,
            'related' => $articles->values(),
        ]);
    }
}
