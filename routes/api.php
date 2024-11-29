<?php

use App\Http\Controllers\Api\TaskApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('tasks', TaskApiController::class);
});

Route::post('/token', [AuthController::class, 'token']);
