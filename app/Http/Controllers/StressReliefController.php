<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class StressReliefController extends Controller
{
    /**
     * Save stress relief game session
     */
    public function saveSession(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'duration' => 'required|numeric|min:0',
            'max_intensity' => 'required|numeric|min:0|max:100',
            'plant_stage' => 'required|string|in:seed,sprout,growing,blooming,mature',
            'achievements' => 'array',
            'achievements.*' => 'string|in:seed,sprout,growing,blooming,mature'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak valid',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = Auth::user();
            
            // Save session data to user's stress relief history
            $sessionData = [
                'duration' => $request->duration,
                'max_intensity' => $request->max_intensity,
                'plant_stage' => $request->plant_stage,
                'achievements' => $request->achievements ?? [],
                'completed_at' => now(),
                'user_id' => $user->id
            ];

            // Store in user's stress relief sessions (you might want to create a separate model for this)
            $stressReliefSessions = $user->stress_relief_sessions ?? [];
            $stressReliefSessions[] = $sessionData;
            
            $user->update([
                'stress_relief_sessions' => $stressReliefSessions
            ]);

            // Calculate stress relief score
            $score = $this->calculateStressReliefScore($sessionData);

            return response()->json([
                'success' => true,
                'message' => 'Sesi stress relief berhasil disimpan',
                'data' => [
                    'session' => $sessionData,
                    'score' => $score,
                    'total_sessions' => count($stressReliefSessions)
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menyimpan sesi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user's stress relief history
     */
    public function getHistory(Request $request)
    {
        try {
            $user = Auth::user();
            $sessions = $user->stress_relief_sessions ?? [];

            // Sort by completion date (newest first)
            usort($sessions, function($a, $b) {
                return strtotime($b['completed_at']) - strtotime($a['completed_at']);
            });

            // Limit to last 20 sessions
            $sessions = array_slice($sessions, 0, 20);

            // Calculate statistics
            $stats = $this->calculateStatistics($sessions);

            return response()->json([
                'success' => true,
                'data' => [
                    'sessions' => $sessions,
                    'statistics' => $stats
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil riwayat',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get stress relief tips and recommendations
     */
    public function getTips(Request $request)
    {
        $tips = [
            [
                'category' => 'Teknik Pernapasan',
                'tips' => [
                    'Lakukan latihan pernapasan dalam sebelum berteriak',
                    'Tarik napas dalam-dalam dan hembuskan perlahan',
                    'Fokus pada ritme pernapasan yang teratur'
                ]
            ],
            [
                'category' => 'Lingkungan',
                'tips' => [
                    'Pastikan Anda berada di tempat yang aman dan privat',
                    'Gunakan ruangan dengan akustik yang baik',
                    'Hindari mengganggu orang lain di sekitar'
                ]
            ],
            [
                'category' => 'Teknik Berteriak',
                'tips' => [
                    'Mulai dengan volume rendah, kemudian tingkatkan',
                    'Berteriak dengan emosi yang tulus',
                    'Jangan memaksakan diri jika merasa tidak nyaman',
                    'Istirahat sejenak jika merasa lelah'
                ]
            ],
            [
                'category' => 'Setelah Berteriak',
                'tips' => [
                    'Lakukan relaksasi setelah sesi berteriak',
                    'Minum air putih untuk menjaga kesehatan tenggorokan',
                    'Refleksikan perasaan Anda setelah sesi',
                    'Catat perubahan mood atau perasaan'
                ]
            ]
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'tips' => $tips,
                'general_advice' => [
                    'Stress relief garden adalah alat bantu, bukan pengganti terapi profesional',
                    'Jika Anda mengalami stres berat, pertimbangkan untuk berkonsultasi dengan psikolog',
                    'Gunakan game ini sebagai bagian dari rutinitas kesehatan mental Anda',
                    'Jangan ragu untuk mencari bantuan profesional jika diperlukan'
                ]
            ]
        ]);
    }

    /**
     * Calculate stress relief score based on session data
     */
    private function calculateStressReliefScore($sessionData)
    {
        $duration = $sessionData['duration'];
        $maxIntensity = $sessionData['max_intensity'];
        $plantStage = $sessionData['plant_stage'];
        $achievements = $sessionData['achievements'];

        // Base score from duration (max 40 points)
        $durationScore = min($duration * 2, 40);

        // Intensity score (max 30 points)
        $intensityScore = ($maxIntensity / 100) * 30;

        // Plant stage bonus (max 20 points)
        $stageBonus = [
            'seed' => 5,
            'sprout' => 10,
            'growing' => 15,
            'blooming' => 18,
            'mature' => 20
        ];
        $stageScore = $stageBonus[$plantStage] ?? 0;

        // Achievement bonus (max 10 points)
        $achievementScore = min(count($achievements) * 2, 10);

        $totalScore = $durationScore + $intensityScore + $stageScore + $achievementScore;

        return [
            'total' => round($totalScore),
            'breakdown' => [
                'duration' => round($durationScore),
                'intensity' => round($intensityScore),
                'stage' => round($stageScore),
                'achievements' => round($achievementScore)
            ],
            'grade' => $this->getScoreGrade($totalScore)
        ];
    }

    /**
     * Get grade based on score
     */
    private function getScoreGrade($score)
    {
        if ($score >= 90) return 'A+';
        if ($score >= 80) return 'A';
        if ($score >= 70) return 'B+';
        if ($score >= 60) return 'B';
        if ($score >= 50) return 'C+';
        if ($score >= 40) return 'C';
        return 'D';
    }

    /**
     * Calculate statistics from sessions
     */
    private function calculateStatistics($sessions)
    {
        if (empty($sessions)) {
            return [
                'total_sessions' => 0,
                'average_duration' => 0,
                'average_intensity' => 0,
                'most_common_stage' => 'seed',
                'total_achievements' => 0,
                'improvement_trend' => 'stable'
            ];
        }

        $totalSessions = count($sessions);
        $totalDuration = array_sum(array_column($sessions, 'duration'));
        $totalIntensity = array_sum(array_column($sessions, 'max_intensity'));
        $totalAchievements = array_sum(array_map(function($session) {
            return count($session['achievements'] ?? []);
        }, $sessions));

        // Most common plant stage
        $stages = array_column($sessions, 'plant_stage');
        $stageCounts = array_count_values($stages);
        $mostCommonStage = array_keys($stageCounts, max($stageCounts))[0];

        // Improvement trend (compare last 5 sessions with previous 5)
        $improvementTrend = 'stable';
        if ($totalSessions >= 10) {
            $recentSessions = array_slice($sessions, 0, 5);
            $olderSessions = array_slice($sessions, 5, 5);
            
            $recentAvgScore = array_sum(array_map([$this, 'calculateStressReliefScore'], $recentSessions)) / 5;
            $olderAvgScore = array_sum(array_map([$this, 'calculateStressReliefScore'], $olderSessions)) / 5;
            
            if ($recentAvgScore > $olderAvgScore + 5) {
                $improvementTrend = 'improving';
            } elseif ($recentAvgScore < $olderAvgScore - 5) {
                $improvementTrend = 'declining';
            }
        }

        return [
            'total_sessions' => $totalSessions,
            'average_duration' => round($totalDuration / $totalSessions, 1),
            'average_intensity' => round($totalIntensity / $totalSessions, 1),
            'most_common_stage' => $mostCommonStage,
            'total_achievements' => $totalAchievements,
            'improvement_trend' => $improvementTrend
        ];
    }
}
