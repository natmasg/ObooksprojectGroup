<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class book extends Model
{
    use HasFactory;
    protected $table = 'book';

    public $timestamps = false;
    protected $fillable = ['title','year','language','tags','author','url_book','pages','img'];
}
