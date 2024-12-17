<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class marker extends Model
{
    use HasFactory;
    protected $table = 'marker';

    public $timestamps = false;
    protected $fillable = ['book_id','user_id','page'];
}
