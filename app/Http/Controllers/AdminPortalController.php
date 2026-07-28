<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\View\View;
class AdminPortalController extends Controller {
 public function __invoke(Request $request) { abort_unless($request->session()->get('school_admin'),403); $section=$request->query('section','dashboard'); $targets=['profile'=>'profil','academic'=>'akademik','facilities'=>'fasilitas','contact'=>'kontak']; if(isset($targets[$section])) return redirect(route('admin.content').'#'.$targets[$section]); $data=ContentController::load(); return view('admin.portal',['section'=>$section,'content'=>$data,'school'=>array_replace(config('school'),$data['school']??[])]); }
}
