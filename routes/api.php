<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PsikologController;
use App\Http\Controllers\StressReliefController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth');

// Chat API Routes
Route::middleware('auth')->group(function () {
    // Chat Sessions
    Route::get('/chat/sessions', [ChatController::class, 'index']);
    Route::post('/chat/sessions', [ChatController::class, 'storeSession']);
    Route::get('/chat/sessions/active', [ChatController::class, 'getActiveSession']);
    Route::get('/chat/sessions/{sessionId}', [ChatController::class, 'getMessages']);
    Route::put('/chat/sessions/{sessionId}', [ChatController::class, 'updateSession']);
    Route::delete('/chat/sessions/{sessionId}', [ChatController::class, 'destroySession']);
    
    // Chat Messages
    Route::post('/chat/sessions/{sessionId}/messages', [ChatController::class, 'storeMessage']);
    
    // Stress Relief Game API
    Route::prefix('games/stress-relief')->group(function () {
        Route::post('/save-session', [StressReliefController::class, 'saveSession']);
        Route::get('/history', [StressReliefController::class, 'getHistory']);
        Route::get('/tips', [StressReliefController::class, 'getTips']);
    });
});

// Public API Routes
Route::get('/psikologs', [PsikologController::class, 'getPsikologs']);
