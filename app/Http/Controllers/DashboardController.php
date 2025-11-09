<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\Journal;
use App\Models\User;
use App\Models\BookPsikolog;

class DashboardController extends Controller
{
    /**
     * API: Aggregated activity counts per day for current user.
     */
    public function activityCounts(Request $request)
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $daysBack = (int)($request->query('days', 14));
        $start = Carbon::now()->subDays(max(1, $daysBack))->startOfDay();
        $end = Carbon::now()->endOfDay();

        // Moodtracking: count chat_messages joined with chat_sessions (category=mood)
        $moodCounts = ChatMessage::query()
            ->selectRaw('DATE(chat_messages.timestamp) as day, COUNT(*) as count')
            ->join('chat_sessions', 'chat_sessions.id', '=', 'chat_messages.chat_session_id')
            ->where('chat_sessions.user_id', $userId)
            ->where('chat_sessions.category', 'mood')
            ->whereBetween('chat_messages.timestamp', [$start, $end])
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        // Curhat: count chat_sessions (category=curhat) created per day
        $curhatCounts = ChatSession::query()
            ->selectRaw('DATE(created_at) as day, COUNT(*) as count')
            ->where('user_id', $userId)
            ->where('category', 'curhat')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        // Journaling: count journals per day
        $journalCounts = Journal::query()
            ->selectRaw('DATE(date) as day, COUNT(*) as count')
            ->where('user_id', $userId)
            ->whereBetween('date', [$start->toDateString(), $end->toDateString()])
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        // Psikolog: count bookings per day based on created_at (booking made)
        $psikologCounts = BookPsikolog::query()
            ->selectRaw('DATE(created_at) as day, COUNT(*) as count')
            ->where('user_id', $userId)
            ->whereBetween('created_at', [$start, $end])
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        // Healing (Stress Relief): count sessions stored in users.stress_relief_sessions JSON per day
        $user = Auth::user();
        $healingSessions = collect($user->stress_relief_sessions ?? []);
        $healingCounts = $healingSessions
            ->filter(function($s) use ($start, $end) {
                try {
                    $tsRaw = $s['completed_at'] ?? ($s['created_at'] ?? null);
                    if (!$tsRaw) return false;
                    $ts = Carbon::parse($tsRaw);
                    return $ts->between($start, $end);
                } catch (\Exception $e) {
                    return false;
                }
            })
            ->map(function($s) {
                $tsRaw = $s['completed_at'] ?? ($s['created_at'] ?? null);
                return Carbon::parse($tsRaw)->toDateString();
            })
            ->countBy()
            ->map(function($count, $day) {
                return ['day' => $day, 'count' => $count];
            })
            ->values();

        // Union of days
        $days = collect()
            ->merge($moodCounts->pluck('day'))
            ->merge($curhatCounts->pluck('day'))
            ->merge($journalCounts->pluck('day'))
            ->merge($psikologCounts->pluck('day'))
            ->merge(collect($healingCounts)->pluck('day'))
            ->unique()
            ->sort()
            ->values();

        // Build aligned series arrays
        $toMap = function($collection) {
            return $collection->keyBy('day');
        };
        $moodMap = $toMap($moodCounts);
        $curhatMap = $toMap($curhatCounts);
        $journalMap = $toMap($journalCounts);
        $psikologMap = $toMap($psikologCounts);
        $healingMap = $toMap($healingCounts);

        $daysJs = $days->map(fn($d) => $d)->values();
        $payload = [
            'days' => $daysJs,
            'mood' => $days->map(function($d){ return null; })->values(),
            'curhat' => $days->map(function($d){ return null; })->values(),
            'journaling' => $days->map(function($d){ return null; })->values(),
            'psikolog' => $days->map(function($d){ return null; })->values(),
            'healing' => $days->map(function($d){ return null; })->values(),
        ];

        foreach ($days as $idx => $day) {
            $payload['mood'][$idx] = isset($moodMap[$day])
                ? [
                    'score' => (int)$moodMap[$day]['count'],
                    'label' => 'MoodTracking',
                    'date' => $day,
                    'source' => 'mood',
                    'category' => 'mood'
                ]
                : null;
            $payload['curhat'][$idx] = isset($curhatMap[$day])
                ? [
                    'score' => (int)$curhatMap[$day]['count'],
                    'label' => 'Curhat',
                    'date' => $day,
                    'source' => 'curhat',
                    'category' => 'curhat'
                ]
                : null;
            $payload['journaling'][$idx] = isset($journalMap[$day])
                ? [
                    'score' => (int)$journalMap[$day]['count'],
                    'label' => 'Journaling',
                    'date' => $day,
                    'source' => 'journal',
                    'category' => 'journaling'
                ]
                : null;
            $payload['psikolog'][$idx] = isset($psikologMap[$day])
                ? [
                    'score' => (int)$psikologMap[$day]['count'],
                    'label' => 'Psikolog',
                    'date' => $day,
                    'source' => 'psikolog',
                    'category' => 'psikolog'
                ]
                : null;
            $payload['healing'][$idx] = isset($healingMap[$day])
                ? [
                    'score' => (int)$healingMap[$day]['count'],
                    'label' => 'Healing',
                    'date' => $day,
                    'source' => 'healing',
                    'category' => 'healing'
                ]
                : null;
        }

        return response()->json(['success' => true, 'data' => $payload]);
    }

    /**
     * API: Summary cards and widgets for current user, all from database.
     */
    public function summary(Request $request)
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $mapMood = function($m) {
            $t = strtolower((string)($m ?? ''));
            if (str_contains($t, 'amazing') || str_contains($t, 'bahagia')) return 5;
            if (str_contains($t, 'good') || str_contains($t, 'tenang') || str_contains($t, 'semangat')) return 4;
            if (str_contains($t, 'normal')) return 3;
            if (str_contains($t, 'bad') || str_contains($t, 'sedih') || str_contains($t, 'lelah')) return 2;
            if (str_contains($t, 'awful') || str_contains($t, 'cemas') || str_contains($t, 'marah')) return 1;
            return 3;
        };

        // Mood average from mood sessions
        $moodSessions = ChatSession::query()
            ->where('user_id', $userId)
            ->where('category', 'mood')
            ->select(['mood', 'title', 'created_at', 'updated_at'])
            ->get();

        $moodScores = $moodSessions->map(fn($s) => $mapMood($s->mood))->filter(fn($v) => is_numeric($v));
        $moodAvg = $moodScores->count() ? round($moodScores->sum() / $moodScores->count(), 2) : null;

        // Today's mood: latest updated today
        $today = Carbon::today();
        $todayMoodSession = ChatSession::query()
            ->where('user_id', $userId)
            ->where('category', 'mood')
            ->where(function($q) use ($today) {
                $q->whereDate('updated_at', $today)->orWhereDate('created_at', $today);
            })
            ->orderBy('updated_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->first();
        $todayMood = $todayMoodSession ? [
            'label' => (string)$todayMoodSession->mood,
            'score' => $mapMood($todayMoodSession->mood),
            'time' => ($todayMoodSession->updated_at ?? $todayMoodSession->created_at)?->toAtomString(),
            'source' => 'mood'
        ] : null;

        // Curhat total sessions for user
        $curhatCount = ChatSession::query()
            ->where('user_id', $userId)
            ->where('category', 'curhat')
            ->count();

        // Journals: current month count and latest 3
        $startMonth = Carbon::now()->startOfMonth()->toDateString();
        $endMonth = Carbon::now()->endOfMonth()->toDateString();
        $journalMonthCount = Journal::query()
            ->where('user_id', $userId)
            ->whereBetween('date', [$startMonth, $endMonth])
            ->count();

        $latestJournals = Journal::query()
            ->where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->limit(3)
            ->get(['title', 'date', 'created_at'])
            ->map(function($j) {
                return [
                    'title' => $j->title,
                    'date' => $j->date?->toDateString() ?? $j->created_at?->toDateString(),
                    'created_at' => $j->created_at?->toAtomString(),
                ];
            })->values();

        return response()->json([
            'success' => true,
            'data' => [
                'mood_avg' => $moodAvg,
                'today_mood' => $todayMood,
                'curhat_count' => $curhatCount,
                'month_journal_count' => $journalMonthCount,
                'latest_journals' => $latestJournals,
            ]
        ]);
    }
}