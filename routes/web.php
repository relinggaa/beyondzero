<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PsikologController;
use App\Http\Controllers\PsikologUserController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\BookPsikologController;
use App\Http\Controllers\PsikologAuthController;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// User Auth routes
Route::get('/login', function () {
    return Inertia::render('Auth/LoginUser');
})->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', function () {
    return Inertia::render('Auth/RegisterUser');
})->name('register');
Route::post('/register', [AuthController::class, 'register']);

// Admin Auth routes
Route::get('/admin/login', function () {
    return Inertia::render('Auth/LoginAdmin');
})->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::get('/admin/register', function () {
    return Inertia::render('Auth/RegisterAdmin');
})->name('admin.register');
Route::post('/admin/register', [AuthController::class, 'adminRegister']);

// Logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Protected routes
Route::middleware(['auth'])->group(function () {
    // User routes
    Route::get('/dashboard', function () {
        return Inertia::render('User/DashboardUser');
    })->name('dashboard');
    
    Route::get('/mood-tracker', function () {
        return Inertia::render('User/MoodTracker');
    });
    
    Route::get('/moodtracker', function () {
        return Inertia::render('User/MoodTracker');
    });
    
    Route::get('/curhat', function () {
        return Inertia::render('User/Curhat');
    });
    
    Route::get('/journaling', [JournalController::class, 'index'])->name('journaling.index');
    Route::post('/journaling', [JournalController::class, 'store'])->name('journaling.store');
    Route::put('/journaling/{journal}', [JournalController::class, 'update'])->name('journaling.update');
    Route::delete('/journaling/{journal}', [JournalController::class, 'destroy'])->name('journaling.destroy');
    
    Route::get('/psikolog', [PsikologUserController::class, 'index']);
    
    Route::get('/healing', function () {
        return Inertia::render('User/Healing');
    });
    
    // Booking routes
    Route::post('/booking-psikolog', [BookPsikologController::class, 'store'])->name('booking.store');
    Route::get('/booking-psikolog', [BookPsikologController::class, 'index'])->name('booking.index');
    Route::post('/booking-psikolog/{booking}/cancel', [BookPsikologController::class, 'cancel'])->name('booking.cancel');

    // Psikolog routes
    Route::get('/psikolog/login', [PsikologAuthController::class, 'showLogin'])->name('psikolog.login');
    Route::post('/psikolog/login', [PsikologAuthController::class, 'login']);
    Route::get('/psikolog/dashboard', [PsikologAuthController::class, 'dashboard'])->name('psikolog.dashboard');
    Route::get('/psikolog/jadwal', [PsikologAuthController::class, 'jadwalKonseling'])->name('psikolog.jadwal');
    Route::get('/psikolog/profil', [PsikologAuthController::class, 'profil'])->name('psikolog.profil');
    Route::post('/psikolog/booking/{booking}/status', [PsikologAuthController::class, 'updateBookingStatus'])->name('psikolog.booking.status');
    Route::post('/psikolog/logout', [PsikologAuthController::class, 'logout'])->name('psikolog.logout');

    // Admin routes
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin', [AdminController::class, 'dashboard']);
        Route::post('/admin/logout', [AdminController::class, 'logout']);

        Route::get('/admin/tambah-psikolog', [PsikologController::class, 'index']);
        Route::post('/admin/psikolog', [PsikologController::class, 'store']);
        Route::post('/admin/psikolog/{psikolog}', [PsikologController::class, 'update']);
        Route::post('/admin/psikolog/{psikolog}/delete', [PsikologController::class, 'destroy']);

        Route::get('/admin/data-user', function () {
            $admin = auth()->user();
            $users = \App\Models\User::where('role', 'user')->orderBy('created_at', 'desc')->get();
            return Inertia::render('Admin/DataUser', [
                'admin' => $admin,
                'users' => $users
            ]);
        });
        
        Route::post('/admin/user/{user}/toggle-status', function (\App\Models\User $user) {
            $user->update(['is_active' => !$user->is_active]);
            return redirect()->back()->with('success', 'Status user berhasil diperbarui.');
        });
        
        Route::delete('/admin/user/{user}', function (\App\Models\User $user) {
            $user->delete();
            return redirect()->back()->with('success', 'User berhasil dihapus.');
        });
    });
});
