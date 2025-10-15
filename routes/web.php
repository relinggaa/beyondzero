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