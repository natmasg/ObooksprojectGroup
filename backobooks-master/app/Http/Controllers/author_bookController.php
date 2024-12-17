<?php

namespace App\Http\Controllers;

use App\Http\Resources\authorBookCollection;
use App\Http\Resources\ShowAuthorBook;
use App\Models\author;
use App\Models\author_book;
use Illuminate\Http\Request;

class author_bookController extends Controller
{


    public function show($id)
    {
        $author_book = author_book::where('id',$id)->first();
        if (! $author_book)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new ShowAuthorBook($author_book);
    }
    public function showAll()
    {
        $author_book =author_book::all();
        if (!$author_book){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new authorBookCollection($author_book);
    }


}
