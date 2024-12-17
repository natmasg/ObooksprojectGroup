<?php

namespace App\Http\Controllers;

use App\Http\Resources\LibraryBookCollection;
use App\Http\Resources\ShowLibraryBook;
use App\Models\library_book;
use Illuminate\Http\Request;

class library_bookController extends Controller
{



    public function insert(Request $request)
    {
        $library_book = new library_book();
        $library_book ->book_id = $request ->book_id;
        $library_book ->library_id = $request ->library_id;
        $library_book ->reading_page = $request ->reading_page;
        $library_book->save();
        return response()->json($library_book);
    }

    public function show($library_id)
    {
        $library_book = library_book::where('library_id',$library_id)->get();
        if (!$library_book)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new LibraryBookCollection($library_book);
    }

    public function showUno($id)
    {
        $library_book = library_book::where('id',$id)->get();
        if (!$library_book)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new LibraryBookCollection($library_book);
    }

    public function showAll()
    {
        $library_book =library_book::all();
        if (!$library_book){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new LibraryBookCollection($library_book);
    }


    public function update(Request $request)
    {
        $library_book = library_book::where('id',$request->id)->first();
        if ($request ->book_id==!null){
            $library_book ->book_id = $request ->book_id;
        }
        if ($request ->library_id==!null){
            $library_book ->library_id = $request ->library_id;
        }
        if ($request ->reading_page==!null){
            $library_book ->reading_page = $request ->reading_page;
        }
        $library_book->save();
        return response()->json($library_book);
    }

    public function updatePage(Request $request)
    {
        $library_book = library_book::where('id',$request->id)->where('book_id',$request->book_id)->where('library_id',$request->library_id)->first();

        $library_book ->reading_page = $request ->reading_page;

        $library_book->save();
        return response()->json($library_book);


    }

    public function delete($id)
    {
        $library_book = library_book::where('id',$id)->first();
        if ($library_book){
            $library_book ->delete();
        }else{
            return response()->json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return response()->json(null);
    }
    public function deleteBook(Request $request)
    {
        $library_book = library_book::where('book_id',$request->book_id)->where('library_id',$request->library_id)->first();
        if ($library_book){
            $library_book ->delete();
        }else{
            return response()->json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return response()->json(null);
    }
}
