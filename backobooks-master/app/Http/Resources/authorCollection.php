<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class authorCollection extends ResourceCollection
{

    public function toArray($request)
    {
        return [
            'data'=>$this->collection->map(
                function ($author){

                    return new showAuthor($author);
                }
            )

        ];
    }
}
