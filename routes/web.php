<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia('User/DashboardUser');
});

Route::get('/moodtracker', function () {
    return Inertia('User/MoodTracker');
});

Route::get('/curhat', function () {
    return Inertia('User/Curhat');
});

Route::get('/journaling', function () {
    return Inertia('User/Journaling');
});

Route::get('/psikolog', function () {
    return Inertia('User/Psikolog');
});

Route::get('/healing', function () {
    return Inertia('User/Healing');
});

Route::get('/ml-prediction', function () {
    return Inertia('User/MLPrediction');
});

// ML API Routes
Route::prefix('api/ml')->group(function () {
    Route::post('/predict', [App\Http\Controllers\MLController::class, 'predict']);
    Route::post('/predict/batch', [App\Http\Controllers\MLController::class, 'predictBatch']);
    Route::get('/health', [App\Http\Controllers\MLController::class, 'health']);
    Route::get('/model-info', [App\Http\Controllers\MLController::class, 'modelInfo']);
});