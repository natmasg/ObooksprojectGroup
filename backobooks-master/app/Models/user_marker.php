<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_marker extends Model
{
    use HasFactory;
    protected $table = 'user_marker';

    public $timestamps = false;
    protected $fillable = ['marker_id','user_id'];
}
