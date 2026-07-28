<?php
namespace App\Http\Controllers;
use Illuminate\View\View;
class HomeController extends Controller {
    public function __invoke(): View { $content = ContentController::load(); return view('home', ['school' => array_replace(config('school'), $content['school']), 'news' => $content['news'], 'programs' => $content['programs'], 'facilities' => $content['facilities'], 'teachers' => $content['teachers']]); }
}
