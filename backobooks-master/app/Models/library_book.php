<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class library_book extends Model
{
    use HasFactory;
    protected $table = 'library_book';

    public $timestamps = false;
    protected $fillable = ['id','book_id','library_id','reading_page'];
}
