<?php

namespace App\Http\Controllers;

use App\Http\Resources\markerCollection;
use App\Http\Resources\ShowMarker;
use App\Models\author;
use App\Models\marker;
use App\Models\user_marker;
use Illuminate\Http\Request;

class markerController extends Controller
{


    public function insert(Request $request)
    {
        $marker = new marker();
        $marker ->book_id = $request ->book_id;
        $marker->user_id=$request->user_id;
        $marker->page=$request->page;
        $marker->save();

        $markerId=$marker->attributesToArray()['id'];
        $markerIdUser=$marker->attributesToArray()['user_id'];
        $user_marker= new user_marker();
        $user_marker->marker_id=$markerId;
        $user_marker->user_id=$markerIdUser;
        $user_marker->save();

        return response()->json($marker);
    }


    public function show($id)
    {
        $marker = marker::where('id',$id)->first();

        if (!$marker)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new ShowMarker($marker);
    }
    public function showAll($user_id)
    {
        $marker =marker::where('user_id',$user_id)->get();
        if (!$marker){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new markerCollection($marker);
    }
    public function update(Request $request)
    {
        $marker = marker::where('id',$request->id)->first();
        if ($request ->book_id==!null){
            $marker ->book_id = $request ->book_id;
        }
        if ($request ->user_id==!null){
            $marker ->user_id = $request ->user_id;
        }
        if ($request ->page==!null){
            $marker ->page = $request ->page;
        }
        $marker->save();
        return response()->json($marker);

    }

    public function delete($id)
    {
        $marker = marker::where('id',$id)->first();
        if ($marker){
            $marker ->delete();
        }else{
            return response()->json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return response()->json(null);
    }
}
