<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BookPsikolog;
use App\Models\User;
use App\Models\Psikolog;

class BookPsikologSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user and psikolog
        $user = User::first();
        $psikolog = Psikolog::first();
        
        if (!$user || !$psikolog) {
            $this->command->info('No users or psikologs found. Please create them first.');
            return;
        }

        $bookings = [
            [
                'user_id' => $user->id,
                'psikolog_id' => $psikolog->id,
                'appointment_date' => '2025-10-20',
                'appointment_time' => '10:00',
                'session_type' => 'online',
                'notes' => 'Saya ingin membahas tentang kecemasan yang saya alami di tempat kerja.',
                'status' => 'pending'
            ],
            [
                'user_id' => $user->id,
                'psikolog_id' => $psikolog->id,
                'appointment_date' => '2025-10-22',
                'appointment_time' => '14:00',
                'session_type' => 'offline',
                'notes' => 'Konsultasi tentang hubungan keluarga yang bermasalah.',
                'status' => 'confirmed'
            ],
            [
                'user_id' => $user->id,
                'psikolog_id' => $psikolog->id,
                'appointment_date' => '2025-10-18',
                'appointment_time' => '16:00',
                'session_type' => 'online',
                'notes' => 'Membahas tentang depresi dan cara mengatasinya.',
                'status' => 'completed'
            ]
        ];

        foreach ($bookings as $booking) {
            BookPsikolog::create($booking);
        }
    }
}