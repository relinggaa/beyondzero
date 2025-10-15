<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Psikolog;
use Illuminate\Support\Str;

class UpdatePsikologAuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $psikologs = Psikolog::all();

        foreach ($psikologs as $psikolog) {
            // Generate username if not exists
            if (empty($psikolog->username)) {
                $username = Str::slug($psikolog->name, '_') . '_' . $psikolog->id;
                // Ensure username is unique
                while (Psikolog::where('username', $username)->where('id', '!=', $psikolog->id)->exists()) {
                    $username = Str::slug($psikolog->name, '_') . '_' . Str::random(4);
                }
                $psikolog->username = $username;
            }

            // Generate key if not exists
            if (empty($psikolog->key)) {
                $key = Str::upper(Str::random(6));
                // Ensure key is unique
                while (Psikolog::where('key', $key)->where('id', '!=', $psikolog->id)->exists()) {
                    $key = Str::upper(Str::random(6));
                }
                $psikolog->key = $key;
            }
            
            $psikolog->save();
        }

        $this->command->info('Psikolog authentication data updated successfully!');
        $this->command->info('Sample login credentials:');
        $firstPsikolog = Psikolog::first();
        $this->command->info('Username: ' . $firstPsikolog->username);
        $this->command->info('Key: ' . $firstPsikolog->key);
    }
}