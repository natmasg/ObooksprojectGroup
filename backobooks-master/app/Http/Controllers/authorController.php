<?php

namespace App\Http\Controllers;

use App\Http\Resources\authorCollection;
use App\Http\Resources\showAuthor;
use App\Models\author;
use Illuminate\Http\Request;

class authorController extends Controller
{
    public function insert(Request $request)
    {
        $author = new author();
        $author ->name = $request ->name;
        $author->save();
        return response()->json($author);

    }

    public function show($id)
    {
        $author = author::where('id',$id)->first();

        if (! $author)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new ShowAuthor($author);
    }
    public function showAll()
    {
        $author =author::all();
        if (!$author){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new authorCollection($author);
    }

    public function update(Request $request, $id)
    {
        $author = author::where('id',$request->id)->first();

        $author ->name = $request ->name;
        $author->save();
        return response()->json($author);
    }

    public function delete($id)
    {
        $author = author::where('id',$id)->first();
        if ($author){
            $author ->delete();
        }else{
            return response()->json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return response()->json(null);
    }
}
