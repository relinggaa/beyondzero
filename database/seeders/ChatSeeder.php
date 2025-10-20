<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChatSession;
use App\Models\ChatMessage;
use App\Models\User;
use Carbon\Carbon;

class ChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get first user (assuming admin user exists)
        $user = User::first();
        
        if (!$user) {
            $this->command->info('No user found. Please run UserSeeder first.');
            return;
        }

        // Create sample chat sessions
        $session1 = ChatSession::create([
            'user_id' => $user->id,
            'title' => 'Curhat Pagi',
            'mood' => 'Bahagia',
            'is_active' => false,
        ]);

        $session2 = ChatSession::create([
            'user_id' => $user->id,
            'title' => 'Curhat Sore',
            'mood' => 'Tenang',
            'is_active' => false,
        ]);

        $session3 = ChatSession::create([
            'user_id' => $user->id,
            'title' => 'Curhat Malam',
            'mood' => 'Cemas',
            'is_active' => false,
        ]);

        // Create sample messages for session 1
        $messages1 = [
            [
                'chat_session_id' => $session1->id,
                'type' => 'user',
                'message' => 'Hari ini aku merasa sangat lelah dan stres dengan pekerjaan',
                'timestamp' => Carbon::now()->subHours(2),
            ],
            [
                'chat_session_id' => $session1->id,
                'type' => 'ai',
                'message' => 'Saya mengerti perasaan Anda. Stres di tempat kerja memang bisa sangat melelahkan. Bisa ceritakan lebih detail apa yang membuat Anda merasa stres hari ini?',
                'timestamp' => Carbon::now()->subHours(2)->addMinutes(1),
            ],
            [
                'chat_session_id' => $session1->id,
                'type' => 'user',
                'message' => 'Boss memberikan deadline yang sangat ketat dan aku tidak yakin bisa menyelesaikannya tepat waktu',
                'timestamp' => Carbon::now()->subHours(2)->addMinutes(2),
            ],
            [
                'chat_session_id' => $session1->id,
                'type' => 'ai',
                'message' => 'Deadline yang ketat memang bisa menimbulkan kecemasan. Coba kita breakdown tugas tersebut menjadi bagian-bagian kecil yang lebih mudah dikelola. Apa yang bisa Anda lakukan untuk mengurangi tekanan ini?',
                'timestamp' => Carbon::now()->subHours(2)->addMinutes(3),
            ],
        ];

        foreach ($messages1 as $message) {
            ChatMessage::create($message);
        }

        // Create sample messages for session 2
        $messages2 = [
            [
                'chat_session_id' => $session2->id,
                'type' => 'user',
                'message' => 'Aku merasa lebih tenang hari ini setelah meditasi pagi',
                'timestamp' => Carbon::now()->subDays(1)->subHours(3),
            ],
            [
                'chat_session_id' => $session2->id,
                'type' => 'ai',
                'message' => 'Bagus sekali! Meditasi memang bisa membantu menenangkan pikiran. Bagaimana perasaan Anda sekarang dibandingkan pagi ini?',
                'timestamp' => Carbon::now()->subDays(1)->subHours(3)->addMinutes(1),
            ],
            [
                'chat_session_id' => $session2->id,
                'type' => 'user',
                'message' => 'Aku merasa lebih fokus dan energi positif',
                'timestamp' => Carbon::now()->subDays(1)->subHours(3)->addMinutes(2),
            ],
            [
                'chat_session_id' => $session2->id,
                'type' => 'ai',
                'message' => 'Sangat baik! Energi positif ini bisa membantu Anda menjalani hari dengan lebih baik. Apa yang membuat Anda merasa bersyukur hari ini?',
                'timestamp' => Carbon::now()->subDays(1)->subHours(3)->addMinutes(3),
            ],
        ];

        foreach ($messages2 as $message) {
            ChatMessage::create($message);
        }

        // Create sample messages for session 3
        $messages3 = [
            [
                'chat_session_id' => $session3->id,
                'type' => 'user',
                'message' => 'Aku merasa cemas dan tidak bisa tidur',
                'timestamp' => Carbon::now()->subDays(2)->subHours(4),
            ],
            [
                'chat_session_id' => $session3->id,
                'type' => 'ai',
                'message' => 'Saya mengerti kecemasan Anda. Kesulitan tidur bisa sangat mengganggu. Apa yang mengganggu pikiran Anda malam ini?',
                'timestamp' => Carbon::now()->subDays(2)->subHours(4)->addMinutes(1),
            ],
            [
                'chat_session_id' => $session3->id,
                'type' => 'user',
                'message' => 'Aku khawatir tentang presentasi besok dan takut tidak bisa perform dengan baik',
                'timestamp' => Carbon::now()->subDays(2)->subHours(4)->addMinutes(2),
            ],
            [
                'chat_session_id' => $session3->id,
                'type' => 'ai',
                'message' => 'Kekhawatiran tentang presentasi memang wajar. Coba kita lakukan teknik relaksasi sederhana. Tarik napas dalam-dalam dan bayangkan presentasi berjalan dengan lancar.',
                'timestamp' => Carbon::now()->subDays(2)->subHours(4)->addMinutes(3),
            ],
            [
                'chat_session_id' => $session3->id,
                'type' => 'user',
                'message' => 'Terima kasih, aku akan coba teknik itu',
                'timestamp' => Carbon::now()->subDays(2)->subHours(4)->addMinutes(5),
            ],
        ];

        foreach ($messages3 as $message) {
            ChatMessage::create($message);
        }

        $this->command->info('Chat sessions and messages seeded successfully!');
    }
}
