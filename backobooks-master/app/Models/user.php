<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user extends Model
{
    use HasFactory;
    protected $table = 'user';

    public $timestamps = false;
    protected $fillable = ['id','user_nick','name','email','password'];

}
