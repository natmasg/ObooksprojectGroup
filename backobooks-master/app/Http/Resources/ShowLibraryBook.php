<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShowLibraryBook extends JsonResource
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
            'id'=>$this->id,
            'book_id'=>$this->book_id,
            'library_id'=>$this->library_id,
            'reading_page'=>$this->reading_page,
        ];
    }
}
