<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class JournalController extends Controller
{
    /**
     * Display a listing of the user's journals.
     */
    public function index()
    {
        $journals = Journal::where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->get();

        return inertia('User/Journaling', [
            'journals' => $journals
        ]);
    }

    /**
     * Store a newly created journal.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'mood' => 'required|string|max:255',
            'gratitude' => 'nullable|string',
            'achievement' => 'nullable|string',
            'challenge' => 'nullable|string',
            'reflection' => 'nullable|string',
            'tomorrow_goal' => 'nullable|string',
            'affirmation' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Check if journal already exists for this date
        $existingJournal = Journal::where('user_id', Auth::id())
            ->where('date', $request->date)
            ->first();

        if ($existingJournal) {
            return back()->withErrors(['date' => 'Jurnal untuk tanggal ini sudah ada. Silakan edit jurnal yang sudah ada.']);
        }

        $journal = Journal::create([
            'user_id' => Auth::id(),
            'date' => $request->date,
            'mood' => $request->mood,
            'gratitude' => $request->gratitude,
            'achievement' => $request->achievement,
            'challenge' => $request->challenge,
            'reflection' => $request->reflection,
            'tomorrow_goal' => $request->tomorrow_goal,
            'affirmation' => $request->affirmation,
        ]);

        return redirect()->route('journaling.index')->with('success', 'Jurnal berhasil dibuat!');
    }

    /**
     * Update the specified journal.
     */
    public function update(Request $request, Journal $journal)
    {
        // Check if user owns this journal
        if ($journal->user_id !== Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak memiliki akses ke jurnal ini.']);
        }

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'mood' => 'required|string|max:255',
            'gratitude' => 'nullable|string',
            'achievement' => 'nullable|string',
            'challenge' => 'nullable|string',
            'reflection' => 'nullable|string',
            'tomorrow_goal' => 'nullable|string',
            'affirmation' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Check if another journal exists for this date (excluding current journal)
        $existingJournal = Journal::where('user_id', Auth::id())
            ->where('date', $request->date)
            ->where('id', '!=', $journal->id)
            ->first();

        if ($existingJournal) {
            return back()->withErrors(['date' => 'Jurnal untuk tanggal ini sudah ada. Silakan pilih tanggal lain.']);
        }

        $journal->update([
            'date' => $request->date,
            'mood' => $request->mood,
            'gratitude' => $request->gratitude,
            'achievement' => $request->achievement,
            'challenge' => $request->challenge,
            'reflection' => $request->reflection,
            'tomorrow_goal' => $request->tomorrow_goal,
            'affirmation' => $request->affirmation,
        ]);

        return redirect()->route('journaling.index')->with('success', 'Jurnal berhasil diperbarui!');
    }

    /**
     * Remove the specified journal.
     */
    public function destroy(Journal $journal)
    {
        // Check if user owns this journal
        if ($journal->user_id !== Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak memiliki akses ke jurnal ini.']);
        }

        $journal->delete();

        return redirect()->route('journaling.index')->with('success', 'Jurnal berhasil dihapus!');
    }
}