<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShowUser extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'user_nick'=>$this->user_nick,
            'name'=>$this->name,
            'email'=>$this->email,
            'pass'=>$this->password,
        ];
    }
}
