<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'API test route is working!', 'status' => 'success']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::apiResource('tasks', TaskController::class);
    
    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/users', [AuthController::class, 'getAllUsers']);
        Route::delete('/users/{user}', [AuthController::class, 'deleteUser']);
        Route::put('/users/{user}/status', [AuthController::class, 'updateUserStatus']);
    });
});