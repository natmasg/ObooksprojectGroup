<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_library extends Model
{
    use HasFactory;
    protected $table = 'user_library';

    public $timestamps = false;
    protected $fillable = ['user_id','library_id'];
}
