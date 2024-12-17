<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShowUserMarker;
use App\Http\Resources\UserMarkerCollection;
use App\Models\user_marker;
use Illuminate\Http\Request;

class user_markerController extends Controller
{
    public function store(Request $request)
    {

    }

    public function show($id)
    {
        $user_marker = user_marker::where('id',$id)->first();

        if (! $user_marker)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new ShowUserMarker($user_marker);
    }
    public function showAll()
    {
        $user_marker =user_marker::all();
        if (!$user_marker){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new UserMarkerCollection($user_marker);
    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {

    }
}
