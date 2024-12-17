<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ShowLibrary extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'color'=>$this->color,
            'iconName'=>$this->iconName,
            'user_id'=>$this->user_id
        ];
    }
}
