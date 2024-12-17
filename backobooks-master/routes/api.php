<?php

use App\Http\Controllers\authorController;
use App\Http\Controllers\helpController;
use App\Http\Controllers\libraryController;
use App\Http\Controllers\userController;
use App\Http\Controllers\bookController;
use App\Http\Controllers\markerController;
use App\Http\Controllers\library_bookController;
use App\Http\Controllers\user_markerController;
use App\Http\Controllers\author_bookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//user
Route::resource('user', userController::class);
Route::post('/useradd',[userController::class,'insert']);
Route::get('/usercheck',[userController::class,'checkusernick']);
Route::get('/usershow/{id}',[userController::class,'show']);
Route::get('/usershowall',[userController::class,'showAll']);
Route::post('/userauthorizeuser',[userController::class,'authorizeUser']);
Route::patch('/userupdate',[userController::class,'update']);
Route::delete('/userdel/{id}',[userController::class,'delete']);


//libros
Route::resource('library', libraryController::class);
Route::post('/libraryadd',[libraryController::class,'insert']);
Route::get('/libraryshowall/{user_id}',[libraryController::class,'showAll']);
Route::get('/libraryshow/{id}',[libraryController::class,'show']);
Route::patch('/libraryupdate',[libraryController::class,'update']);
Route::delete('/librarydel/{id}',[libraryController::class,'delete']);

//Author
Route::resource('author', authorController::class);
Route::post('/authoradd',[authorController::class,'insert']);
Route::get('/authorshowall',[authorController::class,'showAll']);
Route::get('/authorshow/{id}',[authorController::class,'show']);
Route::patch('/authorupdate',[authorController::class,'update']);
Route::delete('/authordel/{id}',[authorController::class,'delete']);

//Books
Route::resource('book', bookController::class);
Route::post('/bookadd',[bookController::class,'insert']);
Route::get('/bookshowall',[bookController::class,'showAll']);
Route::get('/bookshowauthor/{author}',[bookController::class,'showAuthor']);
Route::get('/bookshowtitle/{title}',[bookController::class,'showTitle']);
Route::get('/bookshowlanguage/{language}',[bookController::class,'showLanguage']);
Route::get('/bookshowtag/{tags}',[bookController::class,'showtag']);

Route::get('/bookshow/{id}',[bookController::class,'show']);
Route::patch('/bookupdate',[bookController::class,'update']);
Route::delete('/bookdel/{id}',[bookController::class,'delete']);

//Marker
Route::resource('marker', markerController::class);
Route::post('/markeradd',[markerController::class,'insert']);
Route::get('/markershowall/{user_id}',[markerController::class,'showAll']);
Route::get('/markershow/{id}',[markerController::class,'show']);
Route::patch('/markerupdate',[markerController::class,'update']);
Route::delete('/markerdel/{id}',[markerController::class,'delete']);

//library-book
Route::resource('library_book',library_bookController::class);
Route::post('/librarybookadd',[library_bookController::class,'insert']);
Route::get('/librarybookshowall',[library_bookController::class,'showAll']);
Route::get('/librarybookshow/{id}',[library_bookController::class,'show']);
Route::get('/librarybookshowuno/{id}',[library_bookController::class,'showUno']);

Route::patch('/librarybookupdate',[library_bookController::class,'update']);
Route::patch('/librarybookupdatepage',[library_bookController::class,'updatePage']);
Route::delete('/librarybookdel/{id}',[library_bookController::class,'delete']);
Route::delete('/librarybookbookdel',[library_bookController::class,'deleteBook']);

//user_marker
Route::resource('user_marker',user_markerController::class);
Route::get('/usermarkershowall',[user_markerController::class,'showAll']);
Route::get('/usermarkershow/{id}',[user_markerController::class,'show']);

//author_book
Route::resource('author_book',author_bookController::class);
Route::get('/authorbookshowall',[author_bookController::class,'showAll']);
Route::get('/authorbookshow/{id}',[author_bookController::class,'show']);

//help
Route::resource('help',helpController::class);
Route::post('/helpadd',[helpController::class,'insert']);
Route::get('/helpshowall',[helpController::class,'showAll']);
Route::get('/helpshow/{id}',[helpController::class,'show']);
Route::patch('/helpupdate',[helpController::class,'update']);
Route::delete('/helpdel/{id}',[helpController::class,'delete']);
