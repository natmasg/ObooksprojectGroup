<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class library extends Model
{
    use HasFactory;
    protected $table = 'library';

    public $timestamps = false;
    protected $fillable = ['name','user_id','color','iconName'];


}
