<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Psikolog;

class UpdatePsikologSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Add username and key columns if they don't exist
        if (!\Schema::hasColumn('psikologs', 'username')) {
            \Schema::table('psikologs', function ($table) {
                $table->string('username')->nullable()->after('name');
            });
        }
        
        if (!\Schema::hasColumn('psikologs', 'key')) {
            \Schema::table('psikologs', function ($table) {
                $table->string('key', 6)->nullable()->after('username');
            });
        }
        
        // Update existing psikologs with username and key
        $psikologs = Psikolog::all();
        foreach ($psikologs as $psikolog) {
            if (!$psikolog->username) {
                $psikolog->username = 'psikolog_' . $psikolog->id;
                $psikolog->key = strtoupper(substr(md5($psikolog->id . time()), 0, 6));
                $psikolog->save();
            }
        }
        
        // Make columns unique and not nullable
        \Schema::table('psikologs', function ($table) {
            $table->string('username')->unique()->change();
            $table->string('key', 6)->unique()->change();
        });
    }
}