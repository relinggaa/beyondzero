<?php

namespace App\Http\Controllers;

use App\Models\Psikolog;
use App\Models\BookPsikolog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PsikologAuthController extends Controller
{
    /**
     * Show psikolog login form
     */
    public function showLogin()
    {
        return Inertia::render('Auth/LoginPsikolog');
    }

    /**
     * Handle psikolog login
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'key' => 'required|string|size:6',
        ]);

        $psikolog = Psikolog::where('username', $request->username)
            ->where('key', $request->key)
            ->first();

        if (!$psikolog) {
            throw ValidationException::withMessages([
                'username' => 'Username atau key tidak valid.',
            ]);
        }

        // Store psikolog info in session
        session(['psikolog_id' => $psikolog->id]);
        session(['psikolog_name' => $psikolog->name]);
        session()->save(); // Force save session before redirect
        
        \Log::info('Psikolog logged in', [
            'psikolog_id' => $psikolog->id,
            'session_id' => session()->getId(),
            'session_data' => session()->all()
        ]);

        return redirect('/psikolog/dashboard');
    }

    /**
     * Show psikolog dashboard
     */
    public function dashboard()
    {
        \Log::info('Dashboard accessed', [
            'session_id' => session()->getId(),
            'session_data' => session()->all()
        ]);
        
        $psikologId = session('psikolog_id');
        
        if (!$psikologId) {
            \Log::warning('No psikolog_id in session, redirecting to login');
            return redirect('/psikolog/login');
        }

        $psikolog = Psikolog::find($psikologId);
        $bookings = BookPsikolog::where('psikolog_id', $psikologId)
            ->with('user')
            ->orderBy('appointment_date', 'desc')
            ->orderBy('appointment_time', 'desc')
            ->get();

        return Inertia::render('Psikolog/DashboardPsikolog', [
            'psikolog' => $psikolog,
            'bookings' => $bookings
        ]);
    }

    /**
     * Show jadwal konseling
     */
    public function jadwalKonseling()
    {
        $psikologId = session('psikolog_id');
        
        if (!$psikologId) {
            return redirect('/psikolog/login');
        }

        $psikolog = Psikolog::find($psikologId);
        $bookings = BookPsikolog::where('psikolog_id', $psikologId)
            ->with('user')
            ->orderBy('appointment_date', 'desc')
            ->orderBy('appointment_time', 'desc')
            ->get();

        return Inertia::render('Psikolog/JadwalKonseling', [
            'psikolog' => $psikolog,
            'bookings' => $bookings
        ]);
    }

    /**
     * Show psikolog profile
     */
    public function profil()
    {
        $psikologId = session('psikolog_id');
        
        if (!$psikologId) {
            return redirect('/psikolog/login');
        }

        $psikolog = Psikolog::find($psikologId);

        return Inertia::render('Psikolog/ProfilPsikolog', [
            'psikolog' => $psikolog
        ]);
    }

    /**
     * Update booking status
     */
    public function updateBookingStatus(Request $request, $bookingId)
    {
        \Log::info('=== UPDATE BOOKING STATUS DEBUG ===');
        \Log::info('Booking ID:', ['booking_id' => $bookingId]);
        \Log::info('Request data:', $request->all());
        \Log::info('Session data:', session()->all());
        
        $psikologId = session('psikolog_id');
        \Log::info('Psikolog ID from session:', ['psikolog_id' => $psikologId]);
        
        if (!$psikologId) {
            \Log::error('No psikolog_id in session, redirecting to login');
            return redirect('/psikolog/login');
        }

        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);

        \Log::info('Validation passed, looking for booking...');
        
        $booking = BookPsikolog::where('id', $bookingId)
            ->where('psikolog_id', $psikologId)
            ->first();

        \Log::info('Booking found:', ['booking' => $booking ? $booking->toArray() : 'null']);

        if (!$booking) {
            \Log::error('Booking not found for psikolog');
            return back()->withErrors(['error' => 'Booking tidak ditemukan.']);
        }

        \Log::info('Updating booking status...');
        $booking->update(['status' => $request->status]);
        \Log::info('Booking updated successfully');

        return redirect()->back()->with('success', 'Status jadwal berhasil diperbarui.');
    }

    /**
     * Logout psikolog
     */
    public function logout()
    {
        session()->forget(['psikolog_id', 'psikolog_name']);
        return redirect('/psikolog/login');
    }
}