#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json

def test_problematic_case():
    """Test kasus yang bermasalah dari user"""
    
    # URL API
    api_url = "http://localhost:5002/analyze-mood"
    
    # Test case yang bermasalah
    test_cases = [
        {
            "text": "saya sangat tidak bersemangat hari ini saya memikirkan apakah orang tua saya masih sayang sama saya",
            "expected_mood": "Bad",  # Seharusnya Bad atau Awful, bukan Good/Amazing
            "description": "Kasus bermasalah dari user - tidak bersemangat + meragukan cinta orang tua"
        },
        {
            "text": "tidak ada semangat sama sekali, badan lemas hingga tidak mood buat ngapa ngapaian",
            "expected_mood": "Awful",
            "description": "Kasus sebelumnya yang sudah diperbaiki"
        },
        {
            "text": "hari ini aku merasa lelah dan stres",
            "expected_mood": "Bad",
            "description": "Kasus Bad mood"
        },
        {
            "text": "hari ini aku merasa sangat bahagia!",
            "expected_mood": "Amazing",
            "description": "Kasus Amazing mood"
        }
    ]
    
    print("Testing Problematic Cases")
    print("=" * 50)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest Case {i}: {test_case['description']}")
        print(f"Input: \"{test_case['text']}\"")
        print(f"Expected: {test_case['expected_mood']}")
        
        try:
            # Send request
            response = requests.post(api_url, json={"text": test_case['text']})
            
            if response.status_code == 200:
                result = response.json()
                
                if result['success']:
                    predicted_mood = result['mood']
                    confidence = result['confidence']
                    suggestion = result['suggestion']
                    
                    print(f"Predicted: {predicted_mood} (Confidence: {confidence:.2f})")
                    print(f"Suggestion: {suggestion}")
                    
                    # Check if prediction matches expected
                    if predicted_mood == test_case['expected_mood']:
                        print("CORRECT!")
                    else:
                        print(f"WRONG! Expected {test_case['expected_mood']}, got {predicted_mood}")
                    
                    # Show detailed scores
                    scores = result['analysis']['scores']
                    print(f"Scores: {scores}")
                    
                else:
                    print(f"API Error: {result.get('error', 'Unknown error')}")
                    
            else:
                print(f"HTTP Error: {response.status_code}")
                print(f"Response: {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("Connection Error: API server tidak berjalan di localhost:5002")
            print("Jalankan: cd ml && python api/simple_mood_api.py")
            break
        except Exception as e:
            print(f"Error: {str(e)}")
    
    print("\n" + "=" * 50)
    print("Testing selesai!")

if __name__ == "__main__":
    test_problematic_case()
