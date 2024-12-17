<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class author_book extends Model
{
    use HasFactory;
    protected $table = 'author_book';

    public $timestamps = false;
    protected $fillable = ['author_id','book_id'];
}
