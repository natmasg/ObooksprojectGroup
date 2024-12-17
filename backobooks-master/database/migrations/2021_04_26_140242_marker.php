<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Marker extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('marker', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->references('id')->on('book')->onDelete('cascade');
            $table->foreignId('user_id')->references('id')->on('user')->onDelete('cascade');
            $table->integer('page');
        });
    }
//foreignId
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
