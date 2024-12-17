<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShowUser;
use App\Http\Resources\userCollection;
use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function insert(Request $request)
    {
        $users =user::all();
        $count=0;
        for ($i = 0; $i<count($users); $i++) {
            if ($users[$i]->user_nick === $request->user_nick){
                $count++;
            }
        }
        if ($count === 0){
            $user = new user();
            $user -> user_nick = $request->user_nick;
            $user ->name = $request ->name;
            $user->email = $request -> email;
            $user-> password = Hash::make($request->password);
            $user->save();
        }

        return response()->json($user);
    }

    public function checkusernick(Request $request){
        $users =user::all();
        $count=0;
        for ($i = 0; $i<count($users); $i++) {
            if ($users[$i]->user_nick === $request->user_nick){
                $count++;
            }
        }
        if ($count === 0){
            return response('OK',200);
        }
        return response('Ya existe',500);

    }

    public function show($id)
    {
        $user = user::where('id',$id)->first();
        if (! $user)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'No se encuentra esta id.'])],404);
        }
        return new ShowUser($user);
    }
    public function showAll(){
        $user =user::all();
        if (!$user){
            return response()-> json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return new userCollection($user);

    }
    public function authorizeUser(Request $request)
    {
        $passUser = user::where('user_nick',$request->user_nick)->first();
      //  dd($passUser);
        $pass = Hash::check( $request->password, $passUser->password );
        if (!$pass)
        {
            return response()->json(['errors'=>Array(['code'=>404,'message'=>'Pass incorrecta.'])],404);
        }
        return response($passUser,200);
    }


    public function update(Request $request)
    {
        $user = user::where('id',$request->id)->first();
        if ($request->user_nick==!null){
            $user -> user_nick = $request->user_nick;
        }
        if ($request->name==!null){
            $user ->name = $request ->name;
        }
        if ($request->email==!null){
            $user->email = $request -> email;
        }
        if ($request->password==!null){
            $user-> password = Hash::make($request->password);
        }
        $user->save();
        return response()->json($user);

    }

    public function delete($id)
    {
        $user = user::where('id',$id)->first();
        if ($user){
            $user ->delete();
        }else{
            return response()->json(['errors'=> Array(['code'=>404,'message'=>'No hay campos'])]);
        }
        return response()->json(null);

    }
}
