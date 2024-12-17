<?php

namespace App\Http\Controllers;

use App\Http\Resources\libraryCollection;
use App\Http\Resources\ShowLibrary;
use App\Models\library;
use App\Models\user_library;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class libraryController extends Controller
{
    public function insert(Request $request)
    {

        $library = new library();
        $userlibrary = new user_library();
        $library ->name = $request ->name;
        $library->color = $request->color;
        $library->iconName =$request->iconName;
        $library->user_id = $request -> user_id;
        $user_id = $request -> user_id;

        $library->save();
        $id = $library->attributesToArray()['id'];
        //dd($user_id);
        $userlibrary ->user_id = $user_id;
        $userlibrary ->library_id = $id;

        $userlibrary->save();

        return response()->json($userlibrary);
    }


    public function show($id)
    {

        $library = library::where('id',$id)->first();

        if (! $library)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new ShowLibrary($library);
    }

    public function showAll($user_id)
    {
        $library =library::where('user_id',$user_id)->get();
        if (!$library){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new libraryCollection($library);
    }

    public function update(Request $request)
    {
        $library = library::where('id',$request->id)->first();
        if ($request ->name==!null){
            $library ->name = $request ->name;
        }
        if ($request ->color==!null){
            $library ->color = $request ->name;
        }
        if ($request ->iconName==!null){
            $library ->iconName = $request ->name;
        }
        $library->user_id = $request -> user_id;
        $library->save();
        return response()->json($library);
    }


    public function delete($id)
    {
        $library = library::where('id',$id)->first();
        if ($library){
            $library ->delete();
        }else{
            return response()->json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return response()->json(null);
    }
}
