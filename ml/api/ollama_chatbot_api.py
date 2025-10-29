from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for development

# Ollama API configuration
OLLAMA_BASE_URL = "http://localhost:11434"
OLLAMA_MODEL = "llama3.2:3b"  # Model lebih kecil untuk menghindari masalah memori

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
        """Generate response using Ollama with fallback"""
        try:
            # Cek apakah Ollama bisa digunakan
            if not self.check_ollama_status():
                return self._generate_fallback_response(message, context)
            
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
            # Sisipkan konteks halaman (bila ada) agar jawaban kontekstual
            page_context = f"\n\n[CONTEXT HALAMAN]\n{context}\n\n" if context else "\n"

            full_prompt = f"{system_prompt}{page_context}User: {message}\n\nAssistant:"
            
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
                timeout=30
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
                    return self._generate_fallback_response(message, context)
            else:
                return self._generate_fallback_response(message, context)
                
        except requests.exceptions.Timeout:
            return self._generate_fallback_response(message, context)
        except requests.exceptions.ConnectionError:
            return self._generate_fallback_response(message, context)
        except Exception as e:
            print(f"Ollama error: {str(e)}")
            return self._generate_fallback_response(message, context)
    
    def _generate_fallback_response(self, message, context=""):
        """Generate fallback response when Ollama is not available"""
        message_lower = message.lower()
        context_lower = context.lower()
        
        # Respons spesifik berdasarkan kata kunci dalam pesan
        if any(keyword in message_lower for keyword in ["career", "karier", "pekerjaan", "job", "profesi"]):
            return {
                "success": True,
                "response": "Untuk konseling karier, kami memiliki beberapa psikolog yang ahli di bidang tersebut:\n\n• Dr. Sarah Wijaya, M.Psi., Psikolog - Spesialisasi: Career Development & Leadership\n• Dr. Michael Chen, M.Psi., Psikolog - Spesialisasi: Organizational Psychology\n• Dr. Lisa Park, M.Psi., Psikolog - Spesialisasi: Career Transition & Change Management\n\nAnda bisa klik 'Selengkapnya' pada profil psikolog untuk melihat detail lengkap dan melakukan booking konseling.",
                "model": "fallback"
            }
        
        elif any(keyword in message_lower for keyword in ["booking", "jadwal", "konsultasi", "appointment"]):
            return {
                "success": True,
                "response": "Untuk melakukan booking konseling:\n\n1. Pilih psikolog yang sesuai dengan kebutuhan Anda\n2. Klik tombol 'Selengkapnya' untuk melihat detail\n3. Klik 'Book Now' untuk membuat jadwal\n4. Pilih tanggal, waktu, dan tipe sesi (online/offline)\n5. Tambahkan catatan khusus jika diperlukan\n6. Konfirmasi booking\n\nSemua psikolog kami tersedia untuk konseling online maupun offline.",
                "model": "fallback"
            }
        
        elif any(keyword in message_lower for keyword in ["psikolog", "terapis", "konselor"]):
            return {
                "success": True,
                "response": "Kami memiliki 6 psikolog berpengalaman yang siap membantu Anda:\n\n• Dr. Sarah Wijaya, M.Psi., Psikolog\n• Dr. Michael Chen, M.Psi., Psikolog\n• Dr. Aisha Rahman, M.Psi., Psikolog\n• Dr. James Rodriguez, M.Psi., Psikolog\n• Dr. Lisa Park, M.Psi., Psikolog\n• Dr. Ahmad Hassan, M.Psi., Psikolog\n\nSetiap psikolog memiliki keahlian dan pendekatan yang berbeda. Anda bisa melihat detail lengkap dengan klik 'Selengkapnya' pada profil masing-masing.",
                "model": "fallback"
            }
        
        elif any(keyword in message_lower for keyword in ["harga", "biaya", "tarif", "cost"]):
            return {
                "success": True,
                "response": "Untuk informasi detail mengenai biaya konseling, silakan hubungi psikolog yang Anda pilih melalui tombol 'Selengkapnya'. Setiap psikolog memiliki tarif yang berbeda sesuai dengan pengalaman dan keahlian mereka. Kami juga menyediakan paket konseling yang bisa disesuaikan dengan kebutuhan dan budget Anda.",
                "model": "fallback"
            }
        
        elif any(keyword in message_lower for keyword in ["online", "offline", "tatap muka"]):
            return {
                "success": True,
                "response": "Kami menyediakan kedua jenis konseling:\n\n📱 **Konseling Online**:\n- Lebih fleksibel dan nyaman\n- Bisa dilakukan dari rumah\n- Menggunakan platform video call\n\n🏢 **Konseling Offline**:\n- Konseling tatap muka langsung\n- Lebih personal dan mendalam\n- Dilakukan di klinik psikolog\n\nAnda bisa memilih jenis konseling saat melakukan booking. Semua psikolog kami tersedia untuk kedua jenis konseling.",
                "model": "fallback"
            }
        
        # Respons umum untuk curhat
        general_responses = [
            "Terima kasih sudah berbagi dengan saya. Saya di sini untuk mendengarkan dan mendukung Anda. Apakah ada hal lain yang ingin Anda ceritakan?",
            "Saya memahami perasaan Anda. Setiap orang memiliki tantangan yang berbeda. Yang penting adalah Anda tidak sendirian dalam menghadapi ini.",
            "Cerita Anda sangat berarti. Terkadang dengan berbagi, kita bisa merasa lebih lega. Ada yang ingin Anda diskusikan lebih lanjut?",
            "Saya menghargai kepercayaan Anda untuk berbagi cerita ini. Jika Anda merasa perlu bantuan lebih lanjut, jangan ragu untuk berkonsultasi dengan psikolog profesional.",
            "Setiap perasaan yang Anda rasakan adalah valid. Terima kasih sudah mempercayai saya untuk mendengarkan cerita Anda."
        ]
        
        # Jika ada konteks halaman psikolog, berikan respons yang lebih spesifik
        if "psikolog" in context_lower:
            general_responses.extend([
                "Saya melihat Anda sedang di halaman psikolog. Jika Anda merasa perlu konsultasi profesional, tim psikolog kami siap membantu Anda.",
                "Halaman ini memiliki berbagai psikolog berpengalaman yang bisa Anda pilih sesuai kebutuhan. Apakah ada yang ingin Anda tanyakan tentang layanan konseling?",
                "Anda bisa mencari psikolog berdasarkan keahlian atau menggunakan fitur pencarian. Semua psikolog kami memiliki pengalaman dan pendekatan yang berbeda-beda."
            ])
        
        import random
        selected_response = random.choice(general_responses)
        
        return {
            "success": True,
            "response": selected_response,
            "model": "fallback"
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
        
        # Optional context from client
        context = data.get('context', '')
        # Generate response
        result = chatbot.generate_response(message, context)
        
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
