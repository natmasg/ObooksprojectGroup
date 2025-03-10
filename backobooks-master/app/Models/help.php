<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class help extends Model
{
    use HasFactory;
    protected $table = 'help';

    public $timestamps = false;
    protected $fillable = ['id','title','subtitle','content'];
}
