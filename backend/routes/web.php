<?php

use Illuminate\Support\Facades\Route;
Route::get('/test', function () {
    return response()->json(['message' => 'Laravel is working!']);
});
Route::get('/', function () {
    return response()->json(['message' => 'Laravel API is running']);
});