<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class showBook extends JsonResource
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
            'title'=>$this->title,
            'year'=>$this->year,
            'language'=>$this->language,
            'tags'=>$this->tags,
            'author'=>$this->author,
            'url_book'=>$this->url_book,
            'pages'=>$this->pages,
            'img'=>$this->img,
        ];
    }
}
