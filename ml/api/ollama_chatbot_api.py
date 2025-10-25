from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for development

# Ollama API configuration
OLLAMA_BASE_URL = "http://localhost:11434"
OLLAMA_MODEL = "llama3.2:latest"  # Default model, bisa diganti dengan model lain

class OllamaChatBot:
    def __init__(self):
        self.model = OLLAMA_MODEL
        self.base_url = OLLAMA_BASE_URL
        
    def check_ollama_status(self):
        """Check if Ollama is running"""
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=5)
            return response.status_code == 200
        except:
            return False
    
    def get_available_models(self):
        """Get list of available models"""
        try:
            response = requests.get(f"{self.base_url}/api/tags")
            if response.status_code == 200:
                data = response.json()
                return [model['name'] for model in data.get('models', [])]
            return []
        except:
            return []
    
    def generate_response(self, message, context=""):
        """Generate response using Ollama"""
        try:
            # Prepare the prompt for curhat/chatbot
            system_prompt = """Anda adalah AI assistant yang ramah dan empatik untuk membantu orang yang ingin curhat. 
            Tugas Anda adalah:
            1. Mendengarkan dengan penuh perhatian
            2. Memberikan respons yang empatik dan mendukung
            3. Memberikan saran yang konstruktif jika diminta
            4. Tidak memberikan diagnosis medis atau psikologis
            5. Menggunakan bahasa Indonesia yang santai dan mudah dipahami
            6. Menjaga privasi dan kerahasiaan percakapan
            
            Respons Anda harus hangat, mendukung, dan membantu orang merasa didengar."""
            
            full_prompt = f"{system_prompt}\n\nUser: {message}\n\nAssistant:"
            
            payload = {
                "model": self.model,
                "prompt": full_prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "num_predict": 200
                }
            }
            
            print(f"Sending request to Ollama with model: {self.model}")
            print(f"Payload: {json.dumps(payload, indent=2)}")
            
            response = requests.post(
                f"{self.base_url}/api/generate",
                json=payload,
                timeout=60
            )
            
            print(f"Ollama response status: {response.status_code}")
            print(f"Ollama response: {response.text[:500]}...")
            
            if response.status_code == 200:
                data = response.json()
                ai_response = data.get("response", "").strip()
                if ai_response:
                    return {
                        "success": True,
                        "response": ai_response,
                        "model": self.model
                    }
                else:
                    return {
                        "success": False,
                        "error": "Ollama tidak mengembalikan respons"
                    }
            else:
                return {
                    "success": False,
                    "error": f"Ollama API error: {response.status_code} - {response.text}"
                }
                
        except requests.exceptions.Timeout:
            return {
                "success": False,
                "error": "Request timeout - Ollama mungkin sedang memproses model"
            }
        except requests.exceptions.ConnectionError:
            return {
                "success": False,
                "error": "Tidak dapat terhubung ke Ollama. Pastikan Ollama sudah berjalan."
            }
        except Exception as e:
            return {
                "success": False,
                "error": f"Error: {str(e)}"
            }

# Initialize chatbot
chatbot = OllamaChatBot()

@app.route('/')
def home():
    return jsonify({
        "message": "Ollama Chatbot API untuk Curhat",
        "status": "running",
        "ollama_status": chatbot.check_ollama_status(),
        "model": chatbot.model,
        "endpoints": {
            "/chat": "POST - Chat dengan AI",
            "/status": "GET - Status Ollama",
            "/models": "GET - Daftar model tersedia"
        }
    })

@app.route('/status')
def status():
    """Check Ollama status"""
    is_running = chatbot.check_ollama_status()
    models = chatbot.get_available_models() if is_running else []
    
    return jsonify({
        "ollama_running": is_running,
        "current_model": chatbot.model,
        "available_models": models,
        "base_url": chatbot.base_url
    })

@app.route('/models')
def models():
    """Get available models"""
    models = chatbot.get_available_models()
    return jsonify({
        "models": models,
        "current_model": chatbot.model
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Chat endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                "success": False,
                "error": "Message tidak ditemukan"
            }), 400
        
        message = data['message'].strip()
        if not message:
            return jsonify({
                "success": False,
                "error": "Message tidak boleh kosong"
            }), 400
        
        # Check if Ollama is running
        if not chatbot.check_ollama_status():
            return jsonify({
                "success": False,
                "error": "Ollama tidak berjalan. Silakan jalankan Ollama terlebih dahulu."
            }), 503
        
        # Generate response
        result = chatbot.generate_response(message)
        
        if result['success']:
            return jsonify({
                "success": True,
                "response": result['response'],
                "model": result['model'],
                "timestamp": data.get('timestamp', '')
            })
        else:
            return jsonify({
                "success": False,
                "error": result['error']
            }), 500
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Server error: {str(e)}"
        }), 500

@app.route('/change-model', methods=['POST'])
def change_model():
    """Change the model being used"""
    try:
        data = request.get_json()
        
        if not data or 'model' not in data:
            return jsonify({
                "success": False,
                "error": "Model name tidak ditemukan"
            }), 400
        
        new_model = data['model'].strip()
        available_models = chatbot.get_available_models()
        
        if new_model not in available_models:
            return jsonify({
                "success": False,
                "error": f"Model '{new_model}' tidak tersedia. Model tersedia: {available_models}"
            }), 400
        
        chatbot.model = new_model
        
        return jsonify({
            "success": True,
            "message": f"Model berhasil diubah ke {new_model}",
            "current_model": chatbot.model
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Server error: {str(e)}"
        }), 500

if __name__ == '__main__':
    print("Starting Ollama Chatbot API...")
    print(f"Ollama Base URL: {OLLAMA_BASE_URL}")
    print(f"Default Model: {OLLAMA_MODEL}")
    print("API URL: http://localhost:5004")
    
    # Check Ollama status on startup
    if chatbot.check_ollama_status():
        print("[OK] Ollama is running")
        models = chatbot.get_available_models()
        print(f"Available models: {models}")
    else:
        print("[ERROR] Ollama is not running. Please start Ollama first.")
        print("Run: ollama serve")
    
    app.run(debug=True, host='0.0.0.0', port=5004)
