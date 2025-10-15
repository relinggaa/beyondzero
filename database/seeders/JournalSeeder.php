<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Journal;
use App\Models\User;

class JournalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user (assuming there's at least one user)
        $user = User::first();
        
        if (!$user) {
            $this->command->info('No users found. Please create a user first.');
            return;
        }

        $journals = [
            [
                'user_id' => $user->id,
                'date' => '2025-10-15',
                'mood' => '😊',
                'gratitude' => 'Bersyukur bisa menyelesaikan proyek tepat waktu dan mendapat feedback positif dari tim',
                'achievement' => 'Menyelesaikan laporan bulanan dan presentasi untuk meeting',
                'challenge' => 'Menghadapi deadline yang ketat dan koordinasi dengan tim yang berbeda',
                'reflection' => 'Belajar bahwa komunikasi yang baik sangat penting dalam tim. Perencanaan yang matang membantu mengurangi stres.',
                'tomorrow_goal' => 'Menyiapkan presentasi untuk meeting besok dan follow up dengan klien',
                'affirmation' => 'Saya mampu menghadapi tantangan dengan tenang dan selalu memberikan yang terbaik'
            ],
            [
                'user_id' => $user->id,
                'date' => '2025-10-14',
                'mood' => '😌',
                'gratitude' => 'Bersyukur atas dukungan keluarga dan teman-teman yang selalu ada',
                'achievement' => 'Berhasil meditasi 10 menit dan olahraga ringan',
                'challenge' => 'Mengatasi kecemasan sebelum presentasi dan mengatur waktu dengan baik',
                'reflection' => 'Meditasi membantu menenangkan pikiran. Penting untuk meluangkan waktu untuk diri sendiri.',
                'tomorrow_goal' => 'Mempersiapkan materi presentasi dan berlatih di depan cermin',
                'affirmation' => 'Saya percaya pada kemampuan diri sendiri dan siap menghadapi tantangan'
            ],
            [
                'user_id' => $user->id,
                'date' => '2025-10-13',
                'mood' => '🤔',
                'gratitude' => 'Bersyukur bisa belajar hal baru dan mendapat insight dari mentor',
                'achievement' => 'Menyelesaikan kursus online dan membaca 2 artikel tentang pengembangan diri',
                'challenge' => 'Mengatur prioritas antara pekerjaan dan pembelajaran pribadi',
                'reflection' => 'Pembelajaran berkelanjutan sangat penting. Perlu keseimbangan antara kerja dan pengembangan diri.',
                'tomorrow_goal' => 'Menerapkan ilmu yang dipelajari hari ini dalam pekerjaan',
                'affirmation' => 'Saya adalah pembelajar yang baik dan selalu berkembang setiap hari'
            ]
        ];

        foreach ($journals as $journal) {
            Journal::create($journal);
        }
    }
}