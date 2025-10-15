<?php

namespace App\Http\Controllers;

use App\Models\BookPsikolog;
use App\Models\Psikolog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookPsikologController extends Controller
{
    /**
     * Store a newly created booking.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'psikolog_id' => 'required|exists:psikologs,id',
            'appointment_date' => 'required|date|after:today',
            'appointment_time' => 'required|date_format:H:i',
            'session_type' => 'required|in:online,offline',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Check if user already has a booking with this psikolog on the same date and time
        $existingBooking = BookPsikolog::where('user_id', Auth::id())
            ->where('psikolog_id', $request->psikolog_id)
            ->where('appointment_date', $request->appointment_date)
            ->where('appointment_time', $request->appointment_time)
            ->first();

        if ($existingBooking) {
            return back()->withErrors(['appointment_time' => 'Anda sudah memiliki jadwal konseling dengan psikolog ini pada waktu yang sama.']);
        }

        // Check if the time slot is already taken by another user
        $timeSlotTaken = BookPsikolog::where('psikolog_id', $request->psikolog_id)
            ->where('appointment_date', $request->appointment_date)
            ->where('appointment_time', $request->appointment_time)
            ->where('status', '!=', 'cancelled')
            ->exists();

        if ($timeSlotTaken) {
            return back()->withErrors(['appointment_time' => 'Waktu yang dipilih sudah terisi. Silakan pilih waktu lain.']);
        }

        $booking = BookPsikolog::create([
            'user_id' => Auth::id(),
            'psikolog_id' => $request->psikolog_id,
            'appointment_date' => $request->appointment_date,
            'appointment_time' => $request->appointment_time,
            'session_type' => $request->session_type,
            'notes' => $request->notes,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Jadwal konseling berhasil dibuat! Psikolog akan mengkonfirmasi jadwal Anda.');
    }

    /**
     * Display user's bookings.
     */
    public function index()
    {
        $bookings = BookPsikolog::where('user_id', Auth::id())
            ->with('psikolog')
            ->orderBy('appointment_date', 'desc')
            ->orderBy('appointment_time', 'desc')
            ->get();

        return inertia('User/BookingPsikolog', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Cancel a booking.
     */
    public function cancel(BookPsikolog $booking)
    {
        // Check if user owns this booking
        if ($booking->user_id !== Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak memiliki akses ke booking ini.']);
        }

        // Only allow cancellation if status is pending or confirmed
        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return back()->withErrors(['error' => 'Booking tidak dapat dibatalkan.']);
        }

        $booking->update(['status' => 'cancelled']);

        return redirect()->back()->with('success', 'Jadwal konseling berhasil dibatalkan.');
    }
}