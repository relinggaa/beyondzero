<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;

class GeminiController extends Controller
{
    public function chat(Request $request)
    {
        $validated = $request->validate([
            'prompt' => 'required|string',
            'model' => 'sometimes|string',
            'temperature' => 'sometimes|numeric',
            'maxOutputTokens' => 'sometimes|integer',
        ]);

        $apiKey = env('GEMINI_API_KEY', env('VITE_GEMINI_API_KEY'));
        if (!$apiKey) {
            return response()->json([
                'success' => false,
                'error' => 'Gemini API key is not configured',
            ], 500);
        }

        $model = $validated['model'] ?? 'gemini-2.5-flash';
        $endpoint = sprintf('https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s', $model, urlencode($apiKey));

        $payload = [
            'contents' => [[
                'parts' => [[ 'text' => (string) $validated['prompt'] ]],
            ]],
        ];

        try {
            $resp = Http::timeout(20)->asJson()->post($endpoint, $payload);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'status' => 500,
                'error' => $e->getMessage(),
            ], 500);
        }

        if (!$resp->ok()) {
            return response()->json([
                'success' => false,
                'status' => $resp->status(),
                'error' => $resp->body(),
            ], 500);
        }

        $data = $resp->json();
        $text = '';
        if (!empty($data['candidates'][0]['content']['parts'])) {
            foreach ($data['candidates'][0]['content']['parts'] as $part) {
                $text .= ($part['text'] ?? '');
            }
            $text = trim($text);
        }

        return response()->json([
            'success' => true,
            'model' => $model,
            'response' => $text ?: 'Maaf, tidak ada respons.',
            'raw' => $data,
        ]);
    }
}


