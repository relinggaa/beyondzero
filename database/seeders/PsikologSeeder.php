<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Psikolog;

class PsikologSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $psikologs = [
            [
                'name' => 'Dr. Sarah Wijaya, M.Psi., Psikolog',
                'image' => null, // Will use placeholder
                'expertise' => ['Anxiety Disorders', 'Depression', 'Trauma Therapy'],
                'description' => 'Dr. Sarah adalah psikolog klinis dengan pengalaman 10 tahun dalam menangani gangguan kecemasan dan depresi. Ia menggunakan pendekatan Cognitive Behavioral Therapy (CBT) dan mindfulness-based interventions untuk membantu klien mengatasi tantangan mental mereka.',
                'education' => 'S.Psi. Universitas Indonesia, M.Psi. Universitas Gadjah Mada, Psikolog Klinis',
                'experience' => '10 tahun',
                'approach' => 'Cognitive Behavioral Therapy (CBT), Mindfulness-based Therapy',
                'philosophy' => 'Setiap individu memiliki kekuatan untuk berubah dan berkembang. Saya percaya bahwa dengan dukungan yang tepat, setiap orang dapat mengatasi tantangan dan mencapai potensi terbaik mereka.'
            ],
            [
                'name' => 'Dr. Michael Chen, M.Psi., Psikolog',
                'image' => null,
                'expertise' => ['Family Therapy', 'Child Psychology', 'Relationship Counseling'],
                'description' => 'Dr. Michael adalah spesialis terapi keluarga dan psikologi anak dengan fokus pada dinamika keluarga yang sehat. Ia memiliki pengalaman luas dalam menangani konflik keluarga dan membantu anak-anak mengatasi masalah emosional.',
                'education' => 'S.Psi. Universitas Padjadjaran, M.Psi. Universitas Indonesia, Psikolog Klinis',
                'experience' => '8 tahun',
                'approach' => 'Family Systems Therapy, Play Therapy, Solution-Focused Therapy',
                'philosophy' => 'Keluarga adalah fondasi utama dalam perkembangan individu. Saya berkomitmen untuk membantu keluarga membangun komunikasi yang sehat dan hubungan yang harmonis.'
            ],
            [
                'name' => 'Dr. Aisha Rahman, M.Psi., Psikolog',
                'image' => null,
                'expertise' => ['Career Counseling', 'Stress Management', 'Work-Life Balance'],
                'description' => 'Dr. Aisha adalah psikolog industri dan organisasi yang mengkhususkan diri dalam konseling karir dan manajemen stres. Ia membantu klien mengembangkan keterampilan koping yang efektif dan mencapai keseimbangan hidup yang optimal.',
                'education' => 'S.Psi. Universitas Airlangga, M.Psi. Universitas Gadjah Mada, Psikolog Industri & Organisasi',
                'experience' => '12 tahun',
                'approach' => 'Career Development Theory, Stress Management Techniques, Positive Psychology',
                'philosophy' => 'Keseimbangan antara karir dan kehidupan pribadi adalah kunci kebahagiaan. Saya membantu klien menemukan harmoni dalam semua aspek kehidupan mereka.'
            ],
            [
                'name' => 'Dr. James Rodriguez, M.Psi., Psikolog',
                'image' => null,
                'expertise' => ['Addiction Therapy', 'Behavioral Disorders', 'Crisis Intervention'],
                'description' => 'Dr. James adalah psikolog klinis yang mengkhususkan diri dalam terapi kecanduan dan gangguan perilaku. Ia memiliki pengalaman dalam menangani kasus krisis dan membantu klien mengembangkan strategi koping yang sehat.',
                'education' => 'S.Psi. Universitas Diponegoro, M.Psi. Universitas Gadjah Mada, Psikolog Klinis',
                'experience' => '15 tahun',
                'approach' => 'Motivational Interviewing, Cognitive Behavioral Therapy, Harm Reduction',
                'philosophy' => 'Pemulihan adalah perjalanan, bukan tujuan. Saya percaya bahwa setiap langkah kecil menuju perubahan adalah kemenangan yang patut dirayakan.'
            ]
        ];

        foreach ($psikologs as $psikolog) {
            Psikolog::create($psikolog);
        }
    }
}