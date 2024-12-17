<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class libraryCollection extends ResourceCollection
{

    public function toArray($request)
    {
        return [
            'data'=>$this->collection->map(
                function ($library){

                    return new ShowLibrary($library);
                }
            )

        ];
    }
}
