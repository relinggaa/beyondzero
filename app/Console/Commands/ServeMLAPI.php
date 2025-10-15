<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;

class ServeMLAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ml:serve {--port=5000 : Port untuk ML API}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Menjalankan ML Prediction API server';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Starting ML Prediction API...');
        
        // Check if ML directory exists
        $mlPath = base_path('ml');
        if (!is_dir($mlPath)) {
            $this->error('❌ ML directory tidak ditemukan!');
            $this->info('💡 Jalankan setup ML terlebih dahulu.');
            return 1;
        }
        
        // Check if model exists
        $modelPath = $mlPath . '/models/trained_model.pkl';
        if (!file_exists($modelPath)) {
            $this->error('❌ Model tidak ditemukan!');
            $this->info('💡 Jalankan training terlebih dahulu: php artisan ml:train');
            return 1;
        }
        
        $port = $this->option('port');
        $this->info("🌐 ML API akan berjalan di port: {$port}");
        $this->info("🔗 URL: http://localhost:{$port}");
        
        try {
            // Change to ML directory and start API
            $command = "cd {$mlPath} && venv\\Scripts\\activate && python api/prediction_api.py";
            
            $this->info('🔄 Starting API server...');
            $this->info("Command: {$command}");
            $this->info('💡 Tekan Ctrl+C untuk menghentikan server');
            
            // Run the command
            $result = Process::forever()->run($command);
            
            if ($result->successful()) {
                $this->info('✅ ML API berhasil dihentikan');
                return 0;
            } else {
                $this->error('❌ Error menjalankan ML API');
                $this->error($result->errorOutput());
                return 1;
            }
            
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            return 1;
        }
    }
}