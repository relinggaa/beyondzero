<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;

class TrainMLModel extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ml:train {--data= : Path to CSV data file} {--target= : Target column name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Train machine learning model dengan data CSV';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🤖 Starting ML Model Training...');
        
        // Check if ML directory exists
        $mlPath = base_path('ml');
        if (!is_dir($mlPath)) {
            $this->error('❌ ML directory tidak ditemukan!');
            $this->info('💡 Jalankan setup ML terlebih dahulu.');
            return 1;
        }
        
        // Get parameters
        $dataFile = $this->option('data') ?: 'data/sample_data.csv';
        $targetColumn = $this->option('target') ?: 'target';
        
        $this->info("📊 Data file: {$dataFile}");
        $this->info("🎯 Target column: {$targetColumn}");
        
        // Check if data file exists
        $dataPath = $mlPath . '/' . $dataFile;
        if (!file_exists($dataPath)) {
            $this->error("❌ Data file tidak ditemukan: {$dataPath}");
            $this->info('💡 Pastikan file CSV ada di folder ml/data/');
            return 1;
        }
        
        // Change to ML directory
        $this->info('📁 Changing to ML directory...');
        
        try {
            // Activate virtual environment and run training
            $command = "cd {$mlPath} && venv\\Scripts\\activate && python run_training.py";
            
            $this->info('🔄 Running training script...');
            $this->info("Command: {$command}");
            
            $result = Process::timeout(300)->run($command);
            
            if ($result->successful()) {
                $this->info('✅ Training berhasil!');
                $this->line($result->output());
                
                // Check if model was created
                $modelPath = $mlPath . '/models/trained_model.pkl';
                if (file_exists($modelPath)) {
                    $this->info("💾 Model tersimpan di: {$modelPath}");
                }
                
                $this->info('🚀 Model siap digunakan!');
                $this->info('💡 Jalankan API dengan: php artisan ml:serve');
                
                return 0;
            } else {
                $this->error('❌ Training gagal!');
                $this->error($result->errorOutput());
                return 1;
            }
            
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            return 1;
        }
    }
}
