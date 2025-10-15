from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

class SimpleMoodAnalyzer:
    def __init__(self):
        # Kata kunci untuk setiap mood dengan bobot
        self.mood_keywords = {
            'Awful': {
                'keywords': [
                    'hari terburuk', 'terburuk dalam hidup', 'sangat sedih', 'tidak sempat sholat',
                    'tidak makan', 'menghabiskan sepanjang hari di tempat tidur', 'tidak ada aktivitas positif',
                    'terpuruk', 'depresi', 'putus asa', 'menyerah', 'tidak ada harapan',
                    'menangis', 'tidak ada energi', 'tidak mandi', 'hari yang sulit',
                    'sangat buruk', 'tidak bisa', 'tidak mampu', 'lemah', 'down',
                    'sedih sekali', 'kecewa sekali', 'frustrasi berat',
                    # Kata kunci baru dari contoh user
                    'tidak ada semangat', 'tidak ada semangat sama sekali', 'badan lemas',
                    'tidak mood', 'tidak mood buat', 'tidak mood buat ngapa ngapain',
                    'ngapa ngapain', 'tidak ada tenaga', 'tidak bertenaga',
                    'malas', 'tidak ada gairah', 'tidak ada motivasi'
                ],
                'weight': 5
            },
            'Bad': {
                'keywords': [
                    'buruk', 'jelek', 'tidak baik', 'kurang', 'sedih', 'kecewa',
                    'frustrasi', 'lelah', 'capek', 'stres', 'tekanan', 'masalah',
                    'kesulitan', 'susah', 'berat', 'tidak enak', 'murung',
                    'tidak semangat', 'tidak produktif', 'malas', 'bosan',
                    # Kata kunci tambahan
                    'badan lemas', 'tidak ada tenaga', 'tidak bertenaga',
                    'tidak mood', 'tidak ada gairah', 'tidak ada motivasi'
                ],
                'weight': 3
            },
            'Normal': {
                'keywords': [
                    'biasa', 'normal', 'stabil', 'seimbang', 'ok', 'oke', 'lumayan',
                    'standar', 'rutin', 'regular', 'netral', 'tidak ada yang istimewa',
                    'seperti biasa', 'hari biasa', 'tidak ada masalah'
                ],
                'weight': 1
            },
            'Good': {
                'keywords': [
                    'baik', 'bagus', 'senang', 'bahagia', 'puas', 'positif', 'optimis',
                    'semangat', 'energi', 'produktif', 'berhasil', 'menyenangkan',
                    'gembira', 'ceria', 'fresh', 'fit', 'sehat', 'bahagia'
                ],
                'weight': 2
            },
            'Amazing': {
                'keywords': [
                    'luar biasa', 'fantastis', 'menakjubkan', 'sempurna', 'hebat', 'wow',
                    'bangga', 'bersyukur', 'bahagia sekali', 'senang sekali', 'excited',
                    'energi tinggi', 'produktif', 'berhasil', 'kemenangan', 'prestasi',
                    'hari terbaik', 'sangat bahagia', 'luar biasa'
                ],
                'weight': 3
            }
        }
        
        # Negative activity indicators
        self.negative_activities = [
            'tidak ada energi', 'tidak mandi', 'tidak makan', 'menangis',
            'hari yang sulit', 'terpuruk', 'depresi', 'tidak melakukan apapun',
            'hanya tidur', 'tidak produktif', 'tidak sempat', 'tidak bisa'
        ]
        
        # Positive activity indicators
        self.positive_activities = [
            'sholat', 'jalan-jalan', 'membaca', 'belajar', 'masak', 'olahraga',
            'meditasi', 'menulis', 'coding', 'nonton', 'musik', 'travel',
            'bersih-bersih', 'research', 'produktif', 'berhasil'
        ]
    
    def analyze_mood(self, text):
        """Analisis mood berdasarkan text input"""
        text_lower = text.lower()
        
        # Hitung skor untuk setiap mood
        mood_scores = {}
        
        for mood, data in self.mood_keywords.items():
            score = 0
            for keyword in data['keywords']:
                if keyword in text_lower:
                    score += data['weight']
                    # Bonus untuk kata kunci yang lebih spesifik
                    if len(keyword.split()) > 2:  # Kata kunci panjang lebih spesifik
                        score += 1
            mood_scores[mood] = score
        
        # Hitung skor berdasarkan aktivitas
        negative_count = sum(1 for activity in self.negative_activities if activity in text_lower)
        positive_count = sum(1 for activity in self.positive_activities if activity in text_lower)
        
        # Adjust scores berdasarkan aktivitas dengan bobot yang lebih besar
        mood_scores['Awful'] += negative_count * 3  # Lebih besar untuk Awful
        mood_scores['Bad'] += negative_count * 2
        mood_scores['Good'] += positive_count * 2
        mood_scores['Amazing'] += positive_count * 3
        
        # Special rules untuk kasus ekstrem
        if 'hari terburuk' in text_lower or 'terburuk dalam hidup' in text_lower:
            mood_scores['Awful'] += 10
        if 'tidak ada aktivitas positif' in text_lower:
            mood_scores['Awful'] += 5
        if 'menghabiskan sepanjang hari di tempat tidur' in text_lower:
            mood_scores['Awful'] += 5
        
        # Special rules untuk kasus dari contoh user
        if 'tidak ada semangat sama sekali' in text_lower:
            mood_scores['Awful'] += 8
        if 'badan lemas' in text_lower and 'tidak mood' in text_lower:
            mood_scores['Awful'] += 6
        if 'tidak mood buat ngapa ngapain' in text_lower:
            mood_scores['Awful'] += 7
        if 'tidak ada semangat' in text_lower and 'badan lemas' in text_lower:
            mood_scores['Awful'] += 5
        
        # Fine-tuning untuk kasus yang sering salah
        if 'lumayan baik' in text_lower or 'lumayan' in text_lower:
            mood_scores['Good'] += 3
            mood_scores['Amazing'] -= 2
        
        if 'lelah dan stres' in text_lower and 'bangun terlambat' in text_lower:
            mood_scores['Bad'] += 5
            mood_scores['Awful'] -= 2
        
        # Adjust untuk kata kunci yang terlalu umum
        if 'bahagia' in text_lower and 'sangat' not in text_lower:
            mood_scores['Good'] += 2
            mood_scores['Amazing'] -= 1
        
        # Tentukan mood dengan skor tertinggi
        predicted_mood = max(mood_scores, key=mood_scores.get)
        
        # Hitung confidence berdasarkan perbedaan skor dan total skor
        sorted_scores = sorted(mood_scores.values(), reverse=True)
        max_score = sorted_scores[0]
        
        if max_score > 0:
            if len(sorted_scores) > 1:
                # Confidence berdasarkan perbedaan relatif dan absolut
                diff = sorted_scores[0] - sorted_scores[1]
                confidence = min(diff / max(max_score, 1), diff / 10)  # Normalize by max score and absolute diff
                confidence = min(max(confidence, 0.4), 1.0)  # Clamp between 0.4 and 1.0
            else:
                confidence = 1.0
        else:
            confidence = 0.5
        
        return {
            'mood': predicted_mood,
            'confidence': confidence,
            'scores': mood_scores,
            'negative_activities': negative_count,
            'positive_activities': positive_count
        }
    
    def get_suggestion(self, mood, confidence):
        """Generate suggestion berdasarkan mood"""
        suggestions = {
            'Amazing': [
                "Wah, mood Anda luar biasa hari ini! Pertahankan energi positif ini!",
                "Hari yang fantastis! Bagikan kebahagiaan Anda dengan orang lain.",
                "Mood yang amazing! Ini saat yang tepat untuk melakukan hal-hal produktif."
            ],
            'Good': [
                "Mood Anda baik hari ini! Lanjutkan aktivitas yang membuat Anda bahagia.",
                "Perasaan yang positif! Coba lakukan hal-hal yang Anda sukai.",
                "Mood yang bagus! Pertahankan dengan aktivitas yang menyenangkan."
            ],
            'Normal': [
                "Mood Anda normal hari ini. Coba lakukan aktivitas yang bisa meningkatkan mood.",
                "Perasaan yang stabil. Mungkin bisa coba aktivitas baru untuk variasi.",
                "Mood yang seimbang. Pertimbangkan untuk melakukan hal yang menyenangkan."
            ],
            'Bad': [
                "Mood Anda kurang baik hari ini. Coba lakukan aktivitas yang menenangkan seperti meditasi atau jalan-jalan.",
                "Perasaan yang tidak nyaman. Mungkin perlu istirahat atau melakukan hal yang Anda sukai.",
                "Mood yang rendah. Coba lakukan aktivitas yang bisa meningkatkan energi positif."
            ],
            'Awful': [
                "Mood Anda sangat buruk hari ini. Sangat penting untuk merawat diri sendiri. Coba lakukan aktivitas yang menenangkan.",
                "Perasaan yang sangat sulit. Pertimbangkan untuk berbicara dengan seseorang atau melakukan aktivitas yang menenangkan.",
                "Mood yang sangat rendah. Ini saat yang tepat untuk fokus pada self-care dan aktivitas yang menenangkan."
            ]
        }
        
        import random
        return random.choice(suggestions.get(mood, ["Terima kasih telah berbagi perasaan Anda."]))

# Initialize analyzer
analyzer = SimpleMoodAnalyzer()

@app.route('/')
def home():
    return jsonify({
        "message": "Simple Mood Analysis API",
        "status": "running",
        "endpoints": {
            "/analyze-mood": "POST - Analisis mood sederhana",
            "/health": "GET - Health check"
        }
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "analyzer_loaded": True,
        "mood_classes": list(analyzer.mood_keywords.keys())
    })

@app.route('/analyze-mood', methods=['POST'])
def analyze_mood():
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"error": "Text tidak ditemukan"}), 400
        
        text = data['text']
        
        # Analyze mood
        result = analyzer.analyze_mood(text)
        
        # Get suggestion
        suggestion = analyzer.get_suggestion(result['mood'], result['confidence'])
        
        return jsonify({
            "success": True,
            "mood": result['mood'],
            "confidence": result['confidence'],
            "suggestion": suggestion,
            "analysis": {
                "scores": result['scores'],
                "negative_activities": result['negative_activities'],
                "positive_activities": result['positive_activities']
            }
        })
    
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == '__main__':
    print("Starting Simple Mood Analysis API...")
    print("This API uses rule-based analysis for better accuracy.")
    app.run(debug=True, host='0.0.0.0', port=5002)
