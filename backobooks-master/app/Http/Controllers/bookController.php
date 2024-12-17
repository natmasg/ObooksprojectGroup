<?php

namespace App\Http\Controllers;

use App\Http\Resources\bookCollection;
use App\Http\Resources\showBook;
use App\Models\author;
use App\Models\author_book;
use App\Models\book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class bookController extends Controller
{

    public function insert(Request $request)
    {
        $book = new book();
        $book ->title = $request ->title;
        $book ->year = $request ->year;
        $book ->language = $request ->language;
        $book ->tags = $request ->tags;
        $book ->author = $request ->author;
        $book ->url_book = $request ->url_book;
        $book ->pages = $request ->pages;
        $book ->img = $request ->img;
        $book->save();
        $authors=author::where('name',$book->author)->first();
        if($authors===null){
            $author=new author();
            $author->name=$request->author;
            $author->save();
            $authors=author::where('name',$book->author)->first();
        }
        $authorId=$authors->attributesToArray()['id'];
        $bookId=$book->attributesToArray()['id'];
        $author_book= new author_book();
        $author_book->author_id=$authorId;
        $author_book->book_id=$bookId;
        $author_book->save();
        return response()->json($book);

    }

    public function show($id)
    {
        $book = book::where('id',$id)->first();

        if (! $book)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new showBook($book);
    }
    public function showAll()
    {
        $book =book::all();
        if (!$book){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new bookCollection($book);
    }
    public function showTag($tag)
    {

        $book = book::where(DB::raw('lower(tags)'), 'like', '%' . strtolower($tag) . '%')
            ->get();
        if (! $book)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new bookCollection($book);
    }

    public function showTitle($title)
    {

        $book = book::where(DB::raw('lower(title)'), 'like', '%' . strtolower($title) . '%')
            ->get();
        if (! $book)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new bookCollection($book);
    }
    public function showAuthor($Author)
    {
        $book = book::where(DB::raw('lower(author)'), 'like', '%' . strtolower($Author) . '%')
            ->get();
        if (! $book)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new bookCollection($book);
    }
    public function showLanguage($language)
    {

        $book = book::where(DB::raw('lower(language)'), 'like', '%' . strtolower($language) . '%')
            ->get();
        if (! $book)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new bookCollection($book);
    }

    public function update(Request $request)
    {
        $book = book::where('id',$request->id)->first();
        if ($request ->title==!null){
            $book ->title = $request ->title;
        }
        if ($request ->year==!null){
            $book ->year = $request ->year;
        }
        if ($request ->language==!null){
            $book ->language = $request ->language;
        }
        if ($request ->tags==!null){
            $book ->tags = $request ->tags;
        }
        if ($request ->author==!null){
            $book ->author = $request ->author;
        }
        if ($request ->url_book==!null){
            $book ->url_book = $request ->url_book;
        }
        if ($request ->pages==!null){
            $book ->pages = $request ->pages;
        }
        if ($request ->img==!null){
            $book ->img = $request ->img;
        }
        $book->save();
        return response()->json($book);
    }

    public function delete($id)
    {
        $book = book::where('id',$id)->first();
        if ($book){
            $book ->delete();
        }else{
            return response()->json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return response()->json(null);
    }
}
