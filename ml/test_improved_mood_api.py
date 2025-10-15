#!/usr/bin/env python3
"""
Script untuk testing sistem mood analysis yang sudah diperbaiki
"""

import requests
import json

def test_mood_api():
    """Test API mood analysis dengan berbagai kasus"""
    
    test_cases = [
        {
            'name': 'Kasus Awful - Hari Terburuk',
            'text': 'Hari ini adalah hari terburuk dalam hidupku. Bangun dengan perasaan sangat sedih, tidak sempat sholat, tidak makan, dan menghabiskan sepanjang hari di tempat tidur. Tidak ada aktivitas positif sama sekali.',
            'expected': 'Awful',
            'min_confidence': 0.7
        },
        {
            'name': 'Kasus Awful - Tidak Ada Semangat',
            'text': 'saya hari ini tidak ada semangat sama sekali, badan lemas hingga tidak mood buat ngapa ngapain',
            'expected': 'Awful',
            'min_confidence': 0.8
        },
        {
            'name': 'Kasus Amazing - Hari Bahagia',
            'text': 'Hari ini aku merasa sangat bahagia! Bangun pagi dengan energi tinggi, sholat subuh, jalan-jalan pagi, membaca buku, dan masak makanan enak. Produktif sekali hari ini!',
            'expected': 'Amazing',
            'min_confidence': 0.5
        },
        {
            'name': 'Kasus Good - Mood Positif',
            'text': 'Hari ini lumayan baik. Pagi aku sholat dan jalan-jalan sebentar. Siangnya aku belajar coding dan masak makanan sederhana. Malamnya aku nonton youtube dan membaca artikel menarik.',
            'expected': 'Good',
            'min_confidence': 0.4
        },
        {
            'name': 'Kasus Normal - Hari Biasa',
            'text': 'Hari ini biasa saja. Bangun pagi, mandi, makan, dan kerja. Tidak ada yang istimewa. Malamnya nonton tv dan tidur.',
            'expected': 'Normal',
            'min_confidence': 0.3
        },
        {
            'name': 'Kasus Bad - Mood Rendah',
            'text': 'Hari ini aku merasa lelah dan stres. Bangun terlambat, tidak sempat sholat subuh, dan harus kerja sampai malam. Tidak ada waktu untuk aktivitas yang aku sukai seperti membaca atau jalan-jalan.',
            'expected': 'Bad',
            'min_confidence': 0.4
        }
    ]
    
    print("=== Testing Improved Mood Analysis API ===")
    print("=" * 50)
    
    passed_tests = 0
    total_tests = len(test_cases)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest {i}: {test_case['name']}")
        print(f"Text: {test_case['text'][:50]}...")
        
        try:
            response = requests.post(
                'http://localhost:5002/analyze-mood',
                json={'text': test_case['text']},
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                
                if result['success']:
                    mood = result['mood']
                    confidence = result['confidence']
                    
                    # Check if prediction matches expected
                    if mood == test_case['expected']:
                        if confidence >= test_case['min_confidence']:
                            status = "[PASSED]"
                            passed_tests += 1
                        else:
                            status = f"[LOW CONFIDENCE] ({confidence:.2f} < {test_case['min_confidence']})"
                    else:
                        status = f"[WRONG MOOD] (Expected: {test_case['expected']}, Got: {mood})"
                    
                    print(f"Result: {status}")
                    print(f"Predicted Mood: {mood}")
                    print(f"Confidence: {confidence:.2f}")
                    print(f"Suggestion: {result['suggestion']}")
                    print(f"Scores: {result['analysis']['scores']}")
                    
                else:
                    print(f"[API ERROR] {result.get('error', 'Unknown error')}")
            else:
                print(f"[HTTP ERROR] {response.status_code}")
                
        except Exception as e:
            print(f"[CONNECTION ERROR] {e}")
    
    print("\n" + "=" * 50)
    print("TEST SUMMARY")
    print("=" * 50)
    print(f"Total Tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {total_tests - passed_tests}")
    print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
    
    if passed_tests == total_tests:
        print("\n[SUCCESS] All tests passed! Mood analysis is working correctly!")
    else:
        print(f"\n[WARNING] {total_tests - passed_tests} tests failed. Check the results above.")
    
    return passed_tests == total_tests

if __name__ == "__main__":
    test_mood_api()
