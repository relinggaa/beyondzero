<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MLController extends Controller
{
    private $mlApiUrl = 'http://localhost:5000';
    
    /**
     * Prediksi menggunakan model ML
     */
    public function predict(Request $request)
    {
        try {
            // Validasi input
            $request->validate([
                'age' => 'required|integer|min:1|max:100',
                'income' => 'required|numeric|min:0',
                'education' => 'required|string|in:High School,Bachelor,Master,PhD',
                'experience' => 'required|integer|min:0|max:50'
            ]);
            
            // Data untuk prediksi
            $data = [
                'age' => $request->age,
                'income' => $request->income,
                'education' => $request->education,
                'experience' => $request->experience
            ];
            
            // Kirim request ke Python API
            $response = Http::timeout(10)->post($this->mlApiUrl . '/predict', $data);
            
            if ($response->successful()) {
                $result = $response->json();
                
                return response()->json([
                    'success' => true,
                    'prediction' => $result['prediction'],
                    'input_data' => $data,
                    'confidence' => $this->calculateConfidence($data)
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'error' => 'ML API tidak dapat diakses',
                    'status_code' => $response->status()
                ], 500);
            }
            
        } catch (\Exception $e) {
            Log::error('ML Prediction Error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Terjadi kesalahan dalam prediksi',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Batch prediction untuk multiple data
     */
    public function predictBatch(Request $request)
    {
        try {
            $request->validate([
                'data' => 'required|array|min:1|max:10',
                'data.*.age' => 'required|integer|min:1|max:100',
                'data.*.income' => 'required|numeric|min:0',
                'data.*.education' => 'required|string|in:High School,Bachelor,Master,PhD',
                'data.*.experience' => 'required|integer|min:0|max:50'
            ]);
            
            $response = Http::timeout(30)->post($this->mlApiUrl . '/predict/batch', [
                'data' => $request->data
            ]);
            
            if ($response->successful()) {
                $result = $response->json();
                
                return response()->json([
                    'success' => true,
                    'predictions' => $result['predictions'],
                    'total_predictions' => count($result['predictions'])
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'error' => 'ML API tidak dapat diakses'
                ], 500);
            }
            
        } catch (\Exception $e) {
            Log::error('ML Batch Prediction Error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Terjadi kesalahan dalam batch prediksi'
            ], 500);
        }
    }
    
    /**
     * Cek status ML API
     */
    public function health()
    {
        try {
            $response = Http::timeout(5)->get($this->mlApiUrl . '/health');
            
            if ($response->successful()) {
                $result = $response->json();
                
                return response()->json([
                    'success' => true,
                    'ml_api_status' => 'online',
                    'model_loaded' => $result['model_loaded'] ?? false
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'ml_api_status' => 'offline'
                ]);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'ml_api_status' => 'offline',
                'error' => $e->getMessage()
            ]);
        }
    }
    
    /**
     * Get model information
     */
    public function modelInfo()
    {
        try {
            $response = Http::timeout(5)->get($this->mlApiUrl . '/model-info');
            
            if ($response->successful()) {
                $result = $response->json();
                
                return response()->json([
                    'success' => true,
                    'model_info' => $result
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'error' => 'Tidak dapat mengambil info model'
                ]);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
    
    /**
     * Calculate confidence score (simulasi)
     */
    private function calculateConfidence($data)
    {
        // Simulasi confidence berdasarkan data
        $confidence = 0.8; // Base confidence
        
        // Adjust berdasarkan education level
        switch ($data['education']) {
            case 'PhD':
                $confidence += 0.1;
                break;
            case 'Master':
                $confidence += 0.05;
                break;
            case 'Bachelor':
                $confidence += 0.02;
                break;
        }
        
        // Adjust berdasarkan experience
        if ($data['experience'] > 5) {
            $confidence += 0.05;
        }
        
        // Adjust berdasarkan income
        if ($data['income'] > 75000) {
            $confidence += 0.03;
        }
        
        return min(0.95, $confidence); // Max 95%
    }
}
