<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Psikolog;
use App\Models\BookPsikolog;
use App\Models\Journal;

class AdminController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        
        // Get statistics
        $totalUsers = User::where('role', 'user')->count();
        $totalPsikologs = Psikolog::count();
        $totalBookings = BookPsikolog::count();
        $totalJournals = Journal::count();
        
        // Get recent activities
        $recentBookings = BookPsikolog::with(['user', 'psikolog'])
            ->latest()
            ->limit(5)
            ->get();
            
        $recentJournals = Journal::with('user')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Admin/DashboardAdmin', [
            'admin' => $user,
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalPsikologs' => $totalPsikologs,
                'totalBookings' => $totalBookings,
                'totalJournals' => $totalJournals,
            ],
            'recentBookings' => $recentBookings,
            'recentJournals' => $recentJournals,
        ]);
    }

    public function logout()
    {
        auth()->logout();
        return redirect('/admin/login');
    }
}
