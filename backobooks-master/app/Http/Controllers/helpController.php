<?php

namespace App\Http\Controllers;

use App\Http\Resources\helpCollection;
use App\Http\Resources\ShowHelp;
use App\Models\help;
use Illuminate\Http\Request;

class helpController extends Controller
{
    public function insert(Request $request)
    {

        $help = new help();
        $help ->title = $request ->title;
        $help->subtitle = $request->subtitle;
        $help->content =$request->contentt;
        $help->save();

        return response()->json($help);
    }
    public function show($id)
    {

        $help = help::where('id',$id)->first();

        if (! $help)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new Showhelp($help);
    }

    public function showAll()
    {
        $help =help::all();
        if (!$help){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new helpCollection($help);
    }
    public function update(Request $request)
    {
        $help = help::where('id',$request->id)->first();
        if ($request ->title==!null){
            $help ->title = $request ->title;
        }
        if ($request ->subtitle==!null){
            $help ->year = $request ->year;
        }
        if ($request ->contentt==!null){
            $help ->language = $request ->language;
        }

        $help->save();
        return response()->json($help);
    }
    public function delete($id)
    {
        $help = help::where('id',$id)->first();
        if ($help){
            $help ->delete();
        }else{
            return response()->json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return response()->json(null);
    }
}
