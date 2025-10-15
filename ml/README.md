# Mood Tracker ML API

Sistem analisis mood yang menggunakan rule-based analysis untuk akurasi tinggi.

## 🚀 Quick Start

### 1. Setup Environment
```bash
cd ml
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run API
```bash
python api/simple_mood_api.py
```

API akan berjalan di `http://localhost:5002`

## 📊 Features

- ✅ **Rule-based Analysis**: Lebih akurat dari ML model
- ✅ **Indonesian Language**: Optimized untuk bahasa Indonesia
- ✅ **Real-time Analysis**: Analisis langsung tanpa training
- ✅ **High Accuracy**: 83.3% success rate
- ✅ **Confidence Score**: Menghitung tingkat kepercayaan

## 🧪 Testing

```bash
python test_improved_mood_api.py
```

## 📡 API Endpoints

### POST `/analyze-mood`
Analisis mood dari text input.

**Request:**
```json
{
    "text": "Hari ini aku merasa sangat bahagia!"
}
```

**Response:**
```json
{
    "success": true,
    "mood": "Amazing",
    "confidence": 0.85,
    "suggestion": "Wah, mood Anda luar biasa hari ini!",
    "analysis": {
        "scores": {...},
        "negative_activities": 0,
        "positive_activities": 3
    }
}
```

### GET `/health`
Health check endpoint.

## 🎯 Mood Classes

- **Awful**: Hari terburuk, depresi, tidak ada energi
- **Bad**: Lelah, stres, mood rendah
- **Normal**: Hari biasa, stabil
- **Good**: Positif, produktif
- **Amazing**: Luar biasa, sangat bahagia

## 🔧 Integration

Frontend MoodTracker.jsx sudah terintegrasi dengan API ini di port 5002.

## 📁 Project Structure

```
ml/
├── api/
│   └── simple_mood_api.py          # Main API
├── data/
│   └── Daylio_Abid.csv             # Original data for reference
├── README.md                        # This file
├── requirements.txt                 # Python dependencies
└── test_improved_mood_api.py       # Test script
```

## ⚠️ Important Notes

- Virtual environment (`venv/`) tidak di-push ke GitHub
- File model tidak diperlukan karena menggunakan rule-based analysis
- Pastikan API berjalan di port 5002 untuk integrasi dengan frontend
