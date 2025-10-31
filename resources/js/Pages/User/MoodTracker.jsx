import React, { useState, useEffect, useRef } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import MoodSidebar from "../../Components/moodTracker/MoodSidebar";
import MoodPrediction from "../../Components/moodTracker/MoodPrediction";
import ChatMessages from "../../Components/moodTracker/ChatMessages";
import MessageInput from "../../Components/moodTracker/MessageInput";
import io from 'socket.io-client';
import { geminiGenerate } from "@/lib/gemini";

export default function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [message, setMessage] = useState("");
    const [selectedSession, setSelectedSession] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mlPrediction, setMlPrediction] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [voiceStatus, setVoiceStatus] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSynthesis, setSpeechSynthesis] = useState(null);
    const [showMoodTemplates, setShowMoodTemplates] = useState(false);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef(null);
    const wsFallbackTimerRef = useRef(null);
    const silenceTimeoutRef = useRef(null);
    const recognitionBufferRef = useRef('');
    const lastSpokenIdRef = useRef(null);

    // CSRF helper untuk route web (session-auth)
    const getCsrfToken = () => {
        if (typeof document === 'undefined') return undefined;
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    };

    const [sessions, setSessions] = useState([]);

    const currentChatMessages = chatMessages;

    // Helpers: format timestamp for display
    const formatDisplayTime = (date) => new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Pastikan ada sesi aktif sebelum menyimpan/analisis
    const ensureActiveSessionId = async () => {
        if (selectedSession) return selectedSession;
        try {
            const res = await fetch('/api/chat/sessions/active?category=mood', { credentials: 'include' });
            const json = await res.json();
            if (json?.success && json.data?.id) {
                setSelectedSession(json.data.id);
                return json.data.id;
            }
        } catch (e) {
            console.error('Gagal memastikan sesi aktif:', e);
        }
        return null;
    };

    // Refresh daftar sesi dari server
    const refreshSessions = async () => {
        try {
            const listRes = await fetch('/api/chat/sessions?category=mood', { credentials: 'include' });
            const listJson = await listRes.json();
            if (listJson?.success && Array.isArray(listJson.data)) {
                const mapped = listJson.data.map(s => ({
                    id: s.id,
                    title: s.title || 'Curhat Baru',
                    date: new Date(s.updated_at || s.created_at).toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                    mood: s.mood || '-',
                }));
                setSessions(mapped);
            }
        } catch (e) {
            console.error('Gagal refresh sesi:', e);
        }
    };

    // Load sessions list and active session with messages
    useEffect(() => {
        const loadSessions = async () => {
            try {
                const [activeRes, listRes] = await Promise.all([
                    fetch('/api/chat/sessions/active?category=mood', { credentials: 'include' }),
                    fetch('/api/chat/sessions?category=mood', { credentials: 'include' }),
                ]);

                const activeJson = await activeRes.json();
                const listJson = await listRes.json();

                if (listJson?.success && Array.isArray(listJson.data)) {
                    const mapped = listJson.data.map(s => ({
                        id: s.id,
                        title: s.title || 'Curhat',
                        date: new Date(s.updated_at || s.created_at).toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                        mood: s.mood || '-',
                    }));
                    setSessions(mapped);
                }

                if (activeJson?.success && activeJson.data) {
                    const sess = activeJson.data;
                    setSelectedSession(sess.id);
                    const msgs = (sess.messages || []).map(m => ({
                        id: m.id,
                        type: m.type,
                        message: m.message,
                        timestamp: formatDisplayTime(m.timestamp || m.created_at),
                    }));
                    setChatMessages(msgs);
                }
            } catch (e) {
                console.error('Gagal memuat history chat:', e);
            }
        };
        loadSessions();
    }, []);

    // Template mood untuk new session
    const moodTemplates = [
        {
            id: 'awful',
            mood: 'Awful',
            emoji: '😢',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/30',
            title: 'Mengurai Distorsi Kognitif',
            description: 'Memahami dan menantang pola pikir negatif',
            examples: [
                'Saya sering merasa terjebak dalam pola pikir yang membuat saya merasa tidak mampu. Saya ingin belajar cara mengurai pemikiran negatif itu, tapi saya tidak tahu dari mana harus memulai.',
                'Hari ini adalah hari terburuk dalam hidupku',
                'Tidak ada semangat sama sekali, badan lemas',
                'Menghabiskan sepanjang hari di tempat tidur'
            ]
        },
        {
            id: 'bad',
            mood: 'Bad',
            emoji: '😔',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/30',
            title: 'Restrukturisasi Kognitif',
            description: 'Membingkai ulang pikiran untuk kesehatan mental yang lebih baik',
            examples: [
                'Terkadang saya merasa seperti pikiran saya selalu terfokus pada hal-hal buruk. Saya ingin belajar cara membingkai ulang pikiran saya agar bisa merasa lebih baik.',
                'Hari ini aku merasa lelah dan stres',
                'Bangun terlambat, tidak sempat sholat',
                'Tidak ada waktu untuk aktivitas yang aku sukai'
            ]
        },
        {
            id: 'normal',
            mood: 'Normal',
            emoji: '😐',
            color: 'from-gray-500 to-gray-600',
            bgColor: 'bg-gray-500/10',
            borderColor: 'border-gray-500/30',
            title: 'Paparan dan Pencegahan Respons',
            description: 'Menghadapi ketakutan sambil mengelola respons kecemasan',
            examples: [
                'Hari ini biasa saja',
                'Bangun pagi, mandi, makan, dan kerja',
                'Tidak ada yang istimewa',
                'Mood hari ini stabil'
            ]
        },
        {
            id: 'good',
            mood: 'Good',
            emoji: '😊',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/30',
            title: 'Paparan Interoseptif',
            description: 'Membangun toleransi terhadap sensasi internal',
            examples: [
                'Hari ini lumayan baik',
                'Pagi aku sholat dan jalan-jalan',
                'Belajar coding dan masak makanan enak',
                'Mood hari ini positif dan produktif'
            ]
        },
        {
            id: 'amazing',
            mood: 'Amazing',
            emoji: '🌟',
            color: 'from-cyan-500 to-teal-600',
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/30',
            title: 'Kesadaran Penuh dan Meditasi',
            description: 'Mengembangkan kesadaran momen saat ini',
            examples: [
                'Hari ini aku merasa sangat bahagia!',
                'Bangun pagi dengan energi tinggi',
                'Sholat subuh, jalan-jalan, membaca buku',
                'Produktif sekali hari ini!'
            ]
        }
    ];

    // Auto-scroll function
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    // Initialize WebSocket connection
    useEffect(() => {
        console.log('Initializing WebSocket connection...');
        
        // Clean up existing socket if any
        if (socket) {
            socket.disconnect();
        }
        
        const newSocket = io('http://localhost:5003', {
            transports: ['websocket', 'polling'],
            timeout: 20000,
            forceNew: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        });

        newSocket.on('connect', () => {
            console.log('✅ Connected to WebSocket server');
            setIsConnected(true);
            if (selectedSession) {
            newSocket.emit('join_session', { session_id: `session_${selectedSession}` });
            }
        });

        newSocket.on('disconnect', (reason) => {
            console.log('❌ Disconnected from WebSocket:', reason);
            setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('❌ WebSocket connection error:', error);
            setIsConnected(false);
        });

        newSocket.on('reconnect', (attemptNumber) => {
            console.log('🔄 Reconnected to WebSocket after', attemptNumber, 'attempts');
            setIsConnected(true);
            if (selectedSession) {
            newSocket.emit('join_session', { session_id: `session_${selectedSession}` });
            }
        });

        newSocket.on('connected', (data) => {
            console.log('🎉 WebSocket server response:', data.message);
        });

        newSocket.on('joined_session', (data) => {
            console.log('📝 Joined session:', data.session_id);
        });

        newSocket.on('mood_result', async (data) => {
            console.log('🎯 Mood analysis result received:', data);
            if (data.success) {
                if (wsFallbackTimerRef.current) {
                    clearTimeout(wsFallbackTimerRef.current);
                    wsFallbackTimerRef.current = null;
                }
                setMlPrediction(data);
                setIsAnalyzing(false);
                
                // Generate AI response (prefer Gemini, fallback ke lokal)
                let aiResponse = '';
                try {
                    const prompt = [
                        'Anda adalah AI pendengar curhat yang empatik. Gunakan konteks mood untuk merespon singkat (2-5 kalimat).',
                        'Hindari diagnosis medis. Boleh beri saran praktis ringan.',
                        `Mood: ${data.mood} (confidence ${(data.confidence * 100).toFixed(1)}%)`,
                        `Saran internal: ${data.suggestion || '-'}`,
                        'Buatkan respons yang mendukung dan actionable.',
                    ].join('\n');
                    aiResponse = await geminiGenerate(prompt);
                } catch (e) {
                    aiResponse = generateAIResponse(data, '');
                }
                
                // Add AI message (sertakan jenis mood)
                const moodLine = `\n\nAnalisis mood: ${data.mood || 'Unknown'} (confidence ${(data.confidence * 100).toFixed(1)}%)`;
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    message: `${aiResponse}${moodLine}`,
                    timestamp: new Date().toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                    })
                };
                
                setChatMessages(prev => [...prev, aiMessage]);

                // Simpan AI message ke DB
                try {
                    if (selectedSession) {
                        await fetch(`/api/chat/sessions/${selectedSession}/messages`, {
                            method: 'POST',
                            headers: { 
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': getCsrfToken()
                            },
                            credentials: 'include',
                            body: JSON.stringify({ type: 'ai', message: `${aiResponse}${moodLine}`, timestamp: new Date().toISOString() })
                        });
                    }
                } catch (e) {
                    console.error('Gagal menyimpan pesan AI:', e);
                }

                // Update mood sesi berdasarkan hasil ML
                try {
                    if (selectedSession && data?.mood) {
                        await fetch(`/api/chat/sessions/${selectedSession}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': getCsrfToken()
                            },
                            credentials: 'include',
                            body: JSON.stringify({ mood: data.mood })
                        });
                        refreshSessions();
                    }
                } catch (e) {
                    console.error('Gagal update mood sesi:', e);
                }
                
                // Auto-scroll after AI response
                setTimeout(scrollToBottom, 100);
                
                // Speak AI response
                setTimeout(() => {
                    speakText(aiResponse);
                }, 500);
            }
        });

        newSocket.on('mood_error', (data) => {
            console.error('❌ Mood analysis error:', data.error);
            setIsAnalyzing(false);
        });

        newSocket.on('typing', (data) => {
            console.log('⌨️ Typing indicator:', data.is_typing);
            setIsTyping(data.is_typing);
        });

        newSocket.on('scroll_to_bottom', () => {
            console.log('📜 Auto-scroll triggered');
            scrollToBottom();
        });

        setSocket(newSocket);

        return () => {
            console.log('🧹 Cleaning up WebSocket connection...');
            newSocket.disconnect();
            newSocket.removeAllListeners();
        };
    }, [selectedSession]);

    // Auto-scroll when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [currentChatMessages]);

    // Auto-speak last AI reply to avoid missed TTS after voice flow
    useEffect(() => {
        if (!chatMessages || chatMessages.length === 0) return;
        const last = chatMessages[chatMessages.length - 1];
        if (last?.type === 'ai' && lastSpokenIdRef.current !== last.id) {
            setTimeout(() => speakText(last.message), 120);
            lastSpokenIdRef.current = last.id;
        }
    }, [chatMessages]);

    // Initialize voice recognition and speech synthesis
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Speech Recognition
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            
            if (SpeechRecognition) {
                const recognitionInstance = new SpeechRecognition();
                recognitionInstance.continuous = true; // listen continuously until we stop
                recognitionInstance.interimResults = true; // capture interim to detect activity
                recognitionInstance.lang = 'id-ID'; // Indonesian language
                
                recognitionInstance.onstart = () => {
                    setIsListening(true);
                    setVoiceStatus('Mendengarkan...');
                    recognitionBufferRef.current = '';
                    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
                    silenceTimeoutRef.current = setTimeout(() => {
                        try { recognitionInstance.stop(); } catch (e) {}
                        const text = (recognitionBufferRef.current || '').trim();
                        if (text) {
                            setMessage(text);
                            handleSendMessage(text);
                            setVoiceStatus('');
                        }
                    }, 5000);
                };
                
                recognitionInstance.onresult = (event) => {
                    const transcript = Array.from(event.results)
                        .map(r => r[0]?.transcript || '')
                        .join(' ');
                    recognitionBufferRef.current = transcript;
                    setMessage(transcript);
                    setVoiceStatus(`Diterjemahkan: "${transcript}"`);
                    // reset 5s silence timer on any result activity
                    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
                    silenceTimeoutRef.current = setTimeout(() => {
                        try { recognitionInstance.stop(); } catch (e) {}
                        const text = (recognitionBufferRef.current || '').trim();
                        if (text) {
                            setMessage(text);
                            handleSendMessage(text);
                            setVoiceStatus('');
                        }
                    }, 5000);
                };
                
                recognitionInstance.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    setIsListening(false);
                    setVoiceStatus(`Error: ${event.error}`);
                    setTimeout(() => setVoiceStatus(''), 3000);
                    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
                };
                
                recognitionInstance.onend = () => {
                    setIsListening(false);
                    if (!voiceStatus.includes('Error')) {
                        setVoiceStatus('');
                    }
                    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
                };
                
                setRecognition(recognitionInstance);
                setIsSupported(true);
            } else {
                setIsSupported(false);
            }

            // Initialize Speech Synthesis
            if ('speechSynthesis' in window) {
                setSpeechSynthesis(window.speechSynthesis);
            }
        }
    }, []);

    // Util: ambil JSON dari output teks LLM
    const parseJsonFromText = (text) => {
        try {
            const direct = JSON.parse(text);
            return direct;
        } catch {}
        try {
            const match = text.match(/\{[\s\S]*\}/);
            if (match) return JSON.parse(match[0]);
        } catch {}
        return null;
    };

    // Prompt rule-based (mengadopsi aturan dari simple_mood_api.py)
    const buildMoodAnalysisPrompt = (userMessage) => {
        const rulebook = `
Anda adalah sistem analisis mood berbasis aturan sederhana. Klasifikasikan pesan pengguna menjadi salah satu kelas: ["Amazing", "Good", "Normal", "Bad", "Awful"].
Aturan penilaian ringkas (berbasis kata kunci):
- Awful: frasa sangat negatif (contoh: "hari terburuk", "sangat sedih", "tidak ada energi", "tidak mandi", "tidak makan", "terpuruk", "depresi", "tidak ada aktivitas positif", "menangis", "tidak bertenaga", "tidak mood buat ngapa ngapain", "sangat tidak bersemangat", dst.) bobot kuat.
- Bad: negatif umum (contoh: "buruk", "sedih", "lelah", "stres", "tekanan", "masalah", "tidak semangat", "tidak produktif", "ragu", "cemas", "tidak yakin", "rendah diri", dst.) bobot sedang.
- Normal: netral (contoh: "biasa", "normal", "stabil", "seimbang", "tidak ada yang istimewa").
- Good: positif (contoh: "baik", "bagus", "senang", "positif", "semangat", "produktif", dst.).
- Amazing: sangat positif (contoh: "luar biasa", "fantastis", "sangat bahagia", "energi tinggi", "hari terbaik", dst.).
Indikator aktivitas negatif menambah skor Awful/Bad (contoh: "tidak ada energi", "tidak mandi", "hanya tidur"). Aktivitas positif menambah skor Good/Amazing (contoh: "sholat", "jalan-jalan", "membaca", "belajar", "olahraga", "menulis", "coding", "musik").
Beberapa aturan khusus (contoh):
- "hari terburuk" sangat memperkuat Awful.
- "lumayan baik" memperkuat Good dan menurunkan Amazing.
- Kombinasi seperti "lelah dan stres" + "bangun terlambat" memperkuat Bad.
Hitung skor per kelas secara heuristik dan pilih mood dengan skor tertinggi. Hitung confidence (0.4-1.0) berdasar selisih skor teratas dengan skor berikutnya dan skala keseluruhan.
Berikan juga saran singkat (1-2 kalimat) yang empatik dan praktis sesuai mood.

Kembalikan hasil sebagai JSON murni:
{
  "success": true,
  "mood": "Amazing|Good|Normal|Bad|Awful",
  "confidence": 0.0-1.0,
  "suggestion": "string"
}
Tanpa penjelasan tambahan di luar JSON.`;
        return [
            rulebook,
            `Pesan pengguna: "${userMessage}"`,
            'Output hanya JSON valid.'
        ].join('\n\n');
    };

    // Analisis mood menggunakan Gemini (mengadopsi rulebook di atas)
    const analyzeMoodWithML = async (userMessage) => {
        setIsAnalyzing(true);
        try {
            const prompt = buildMoodAnalysisPrompt(userMessage);
            const llmText = await geminiGenerate(prompt);
            const json = parseJsonFromText(llmText) || {};
            if (json && json.success && json.mood) {
                const result = {
                    success: true,
                    mood: json.mood,
                    confidence: typeof json.confidence === 'number' ? json.confidence : 0.6,
                    suggestion: json.suggestion || ''
                };
                setMlPrediction(result);
                return result;
            }
            return null;
        } catch (error) {
            console.error('Error analyzing mood (Gemini):', error);
            return null;
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Fungsi untuk extract activities dan mood indicators dari pesan
    const extractActivitiesFromMessage = (message) => {
        const activities = [];
        const messageLower = message.toLowerCase();
        
        // Mapping kata kunci ke activities
        const activityKeywords = {
            'reading': ['membaca', 'baca', 'reading', 'book'],
            'learning': ['belajar', 'learning', 'study', 'kuliah'],
            'prayer': ['sholat', 'prayer', 'doa', 'berdoa'],
            'fasting': ['puasa', 'fasting'],
            'walk': ['jalan', 'walk', 'jalan-jalan'],
            'meditation': ['meditasi', 'meditation', 'zen'],
            'shower': ['mandi', 'shower', 'bath'],
            'writing': ['menulis', 'writing', 'tulis'],
            'cooking': ['masak', 'cooking', 'memasak'],
            'coding': ['coding', 'programming', 'ngoding'],
            'travel': ['travel', 'jalan-jalan', 'liburan'],
            'cleaning': ['bersih', 'cleaning', 'membersihkan'],
            'research': ['research', 'riset', 'penelitian'],
            'yoga': ['yoga', 'olahraga'],
            'music': ['musik', 'music', 'lagu', 'songs'],
            'watching': ['nonton', 'watching', 'film', 'series'],
            'gaming': ['game', 'gaming', 'main game'],
            'social': ['social', 'sosial', 'teman', 'friends']
        };
        
        // Negative activity indicators (yang menunjukkan mood buruk)
        const negativeActivities = {
            'no_energy': ['tidak ada energi', 'tidak ada tenaga', 'lemas', 'tidak bertenaga'],
            'no_shower': ['tidak mandi', 'tidak sempat mandi', 'belum mandi'],
            'no_eat': ['tidak makan', 'tidak sempat makan', 'tidak makan dengan baik', 'makan tidak teratur'],
            'crying': ['menangis', 'cry', 'terisak', 'menangis sepanjang hari'],
            'difficult_day': ['hari yang sulit', 'hari terburuk', 'hari yang berat', 'hari yang tidak menyenangkan'],
            'depressed': ['terpuruk', 'depresi', 'sedih', 'murung', 'down'],
            'no_activities': ['tidak melakukan apapun', 'tidak ada aktivitas', 'hanya tidur', 'tidak produktif']
        };
        
        // Extract positive activities
        Object.entries(activityKeywords).forEach(([activity, keywords]) => {
            keywords.forEach(keyword => {
                if (messageLower.includes(keyword)) {
                    activities.push(activity);
                }
            });
        });
        
        // Extract negative activities (yang menunjukkan mood buruk)
        Object.entries(negativeActivities).forEach(([activity, keywords]) => {
            keywords.forEach(keyword => {
                if (messageLower.includes(keyword)) {
                    activities.push(activity);
                }
            });
        });
        
        return [...new Set(activities)]; // Remove duplicates
    };

    // Fungsi untuk text-to-speech
    const speakText = async (text) => {
        if (!speechSynthesis || !text) return;
        // Hentikan recognition dan timer agar TTS tidak diblokir
        try { if (recognition && isListening) recognition.stop(); } catch (e) {}
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

        // Siapkan suara terlebih dahulu (beberapa browser butuh waktu load voices)
        const waitForVoices = () => new Promise((resolve) => {
            const voices = window.speechSynthesis?.getVoices?.() || [];
            if (voices.length) return resolve();
            const handler = () => { window.speechSynthesis.removeEventListener('voiceschanged', handler); resolve(); };
            window.speechSynthesis.addEventListener('voiceschanged', handler);
            setTimeout(resolve, 500);
        });
        await waitForVoices();

        // Sedikit jeda setelah stop recognition
        await new Promise((r) => setTimeout(r, 150));

        // Stop TTS yang masih berjalan dan 'poke' resume agar tidak ke-pause oleh kebijakan browser
        speechSynthesis.cancel();
        try { speechSynthesis.resume(); } catch (e) {}
            const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.95;
            utterance.pitch = 1;
        utterance.volume = 0.9;
        let resumeTicker;
            utterance.onstart = () => {
                setIsSpeaking(true);
            // beberapa browser auto-pause TTS; panggil resume berkala di awal
            resumeTicker = setInterval(() => {
                try { window.speechSynthesis.resume(); } catch (e) {}
            }, 200);
            setTimeout(() => { if (resumeTicker) { clearInterval(resumeTicker); resumeTicker = null; } }, 1500);
            };
            utterance.onend = () => {
            if (resumeTicker) { clearInterval(resumeTicker); resumeTicker = null; }
                setIsSpeaking(false);
            };
            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event.error);
            if (resumeTicker) { clearInterval(resumeTicker); resumeTicker = null; }
                setIsSpeaking(false);
            };
            speechSynthesis.speak(utterance);
    };

    // Fungsi untuk generate AI response berdasarkan ML prediction
    const generateAIResponse = (mlResult, userMessage) => {
        if (!mlResult) {
            return "Saya mengerti perasaan Anda. Bisa ceritakan lebih detail apa yang Anda rasakan hari ini?";
        }
        
        const { mood, confidence, suggestion } = mlResult;
        
        // Generate response berdasarkan mood
        const responses = {
            'Amazing': [
                `Wah, berdasarkan analisis saya, mood Anda hari ini luar biasa! (Confidence: ${(confidence * 100).toFixed(1)}%)`,
                `Saya merasakan energi positif yang sangat kuat dari pesan Anda! Mood Anda hari ini benar-benar amazing!`,
                `Fantastis! Mood Anda hari ini sangat baik. Pertahankan energi positif ini!`
            ],
            'Good': [
                `Berdasarkan analisis saya, mood Anda hari ini baik! (Confidence: ${(confidence * 100).toFixed(1)}%)`,
                `Saya merasakan perasaan positif dari pesan Anda. Mood Anda hari ini terlihat baik!`,
                `Bagus! Mood Anda hari ini positif. Lanjutkan aktivitas yang membuat Anda bahagia!`
            ],
            'Normal': [
                `Analisis saya menunjukkan mood Anda hari ini normal. (Confidence: ${(confidence * 100).toFixed(1)}%)`,
                `Mood Anda hari ini terlihat stabil. Mungkin bisa coba aktivitas baru untuk variasi?`,
                `Perasaan Anda hari ini seimbang. Pertimbangkan untuk melakukan hal yang menyenangkan!`
            ],
            'Bad': [
                `Saya merasakan mood Anda hari ini kurang baik. (Confidence: ${(confidence * 100).toFixed(1)}%)`,
                `Analisis saya menunjukkan mood Anda hari ini tidak terlalu baik. Coba lakukan aktivitas yang menenangkan.`,
                `Mood Anda hari ini terlihat rendah. Mungkin perlu istirahat atau melakukan hal yang Anda sukai?`
            ],
            'Awful': [
                `Saya sangat merasakan kesulitan yang Anda alami hari ini. (Confidence: ${(confidence * 100).toFixed(1)}%)`,
                `Analisis saya menunjukkan mood Anda hari ini sangat buruk. Sangat penting untuk merawat diri sendiri.`,
                `Mood Anda hari ini terlihat sangat sulit. Ini saat yang tepat untuk fokus pada self-care.`
            ]
        };
        
        const moodResponses = responses[mood] || responses['Normal'];
        const randomResponse = moodResponses[Math.floor(Math.random() * moodResponses.length)];
        
        return `${randomResponse} ${suggestion}`;
    };

    // Fungsi untuk handle send message
    const handleSendMessage = async (customMessage = null) => {
        const messageToSend = customMessage || message;
        if (!messageToSend || typeof messageToSend !== 'string' || !messageToSend.trim()) return;
        const sessionId = await ensureActiveSessionId();
        if (!sessionId) return;
        
        // Add user message
        const userMessage = {
            id: Date.now(),
            type: 'user',
            message: messageToSend,
            timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            })
        };
        
        setChatMessages(prev => [...prev, userMessage]);

        // Simpan user message ke DB
        try {
            if (sessionId) {
                await fetch(`/api/chat/sessions/${sessionId}/messages`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCsrfToken()
                    },
                    credentials: 'include',
                    body: JSON.stringify({ type: 'user', message: messageToSend, timestamp: new Date().toISOString() })
                });
                // Refresh sesi agar waktu update berubah
                refreshSessions();
            }
        } catch (e) {
            console.error('Gagal menyimpan pesan user:', e);
        }
        
        // Auto-scroll after user message
        setTimeout(scrollToBottom, 100);
        
        // Emit message received for auto-scroll
        if (socket && isConnected) {
            socket.emit('message_received', {
                session_id: `session_${sessionId}`,
                timestamp: Date.now()
            });
        }
        
        // Analisis mood menggunakan Gemini (tanpa WS/HTTP lokal)
        const mlResult = await analyzeMoodWithML(messageToSend);
        
        // Generate AI response (prefer Gemini) berdasarkan hasil analisis
        let aiResponse = '';
        try {
            const prompt = [
                'Anda adalah AI pendengar curhat yang empatik. Gunakan konteks mood untuk merespon singkat (2-5 kalimat).',
                'Hindari diagnosis medis. Boleh beri saran praktis ringan.',
                `Mood: ${mlResult?.mood || 'Unknown'} (confidence ${(mlResult?.confidence || 0) * 100}%)`,
                `Saran internal: ${mlResult?.suggestion || '-'}`,
                `Pesan pengguna: "${messageToSend}"`,
            ].join('\n');
            aiResponse = await geminiGenerate(prompt);
        } catch (e) {
            aiResponse = generateAIResponse(mlResult, messageToSend);
        }

        // Update mood sesi
        try {
            if (sessionId && mlResult?.mood) {
                await fetch(`/api/chat/sessions/${sessionId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCsrfToken()
                    },
                    credentials: 'include',
                    body: JSON.stringify({ mood: mlResult.mood })
                });
                refreshSessions();
            }
        } catch (e) {
            console.error('Gagal update mood sesi:', e);
        }
        
        // Add AI message (sertakan jenis mood)
        const moodLine = `\n\nAnalisis mood: ${mlResult?.mood || 'Unknown'}${typeof mlResult?.confidence === 'number' ? ` (confidence ${(mlResult.confidence * 100).toFixed(1)}%)` : ''}`;
        const aiMessage = {
            id: Date.now() + 1,
            type: 'ai',
            message: `${aiResponse}${moodLine}`,
            timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            })
        };
        
        setChatMessages(prev => [...prev, aiMessage]);

        // Simpan AI message ke DB
        try {
            if (sessionId) {
                await fetch(`/api/chat/sessions/${sessionId}/messages`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCsrfToken()
                    },
                    credentials: 'include',
                    body: JSON.stringify({ type: 'ai', message: `${aiResponse}${moodLine}`, timestamp: new Date().toISOString() })
                });
            }
        } catch (e) {
            console.error('Gagal menyimpan pesan AI:', e);
        }
        
        // Auto-scroll after AI response
        setTimeout(scrollToBottom, 100);
        
        // Speak AI response
        setTimeout(() => {
            speakText(aiResponse);
        }, 500);
        
        // Clear input
        setMessage('');
    };

    // Handle enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Voice recognition functions
    const startListening = () => {
        if (recognition && !isListening) {
            setMessage(''); // Clear current message
            recognitionBufferRef.current = '';
            // Prime TTS with a user gesture to satisfy autoplay policies
            try {
                if (speechSynthesis) {
                    speechSynthesis.resume();
                    const warmup = new SpeechSynthesisUtterance('');
                    warmup.volume = 0;
                    warmup.rate = 1;
                    warmup.onend = () => {};
                    speechSynthesis.speak(warmup);
                }
            } catch (e) {}
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition && isListening) {
            if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
            recognition.stop();
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const stopSpeaking = () => {
        if (speechSynthesis) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    // Fungsi untuk menggunakan template mood
    const useMoodTemplate = (template) => {
        setMessage(template.examples[0]); // Gunakan contoh pertama
        setShowMoodTemplates(false);
    };

    // Fungsi untuk toggle mood templates
    const toggleMoodTemplates = () => {
        setShowMoodTemplates(!showMoodTemplates);
    };

    // Handler untuk session selection
    const handleSessionSelect = async (sessionId) => {
        setSelectedSession(sessionId);
        try {
            const res = await fetch(`/api/chat/sessions/${sessionId}`, { credentials: 'include' });
            const json = await res.json();
            if (json?.success && json.data) {
                const msgs = (json.data.messages || []).map(m => ({
                    id: m.id,
                    type: m.type,
                    message: m.message,
                    timestamp: formatDisplayTime(m.timestamp || m.created_at),
                }));
                setChatMessages(msgs);
            } else {
                setChatMessages([]);
            }
        } catch (e) {
            console.error('Gagal memuat pesan sesi:', e);
            setChatMessages([]);
        }
        // Close sidebar on mobile after selection
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    // Handler untuk close sidebar
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <LayoutUser>
            <div 
                className="min-h-screen cursor-gaming mood-tracker-bg pt-20"
            >
                <div className="min-h-screen">
                    <div className="flex flex-col lg:flex-row">
                        {/* Sidebar */}
                        <MoodSidebar 
                            sessions={sessions}
                            selectedSession={selectedSession}
                            onSessionSelect={handleSessionSelect}
                            isSidebarOpen={isSidebarOpen}
                            onCloseSidebar={handleCloseSidebar}
                            onCreateNewSession={async () => {
                                try {
                                    const res = await fetch('/api/chat/sessions', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': getCsrfToken()
                                        },
                                        credentials: 'include',
                                        body: JSON.stringify({ title: 'Curhat Baru', mood: null, category: 'mood' })
                                    });
                                    const json = await res.json();
                                    if (json?.success && json.data) {
                                        const newId = json.data.id;
                                        setSelectedSession(newId);
                                        setChatMessages([]);
                                        await refreshSessions();
                                        if (socket && isConnected) {
                                            socket.emit('join_session', { session_id: `session_${newId}` });
                                        }
                                    }
                                } catch (e) {
                                    console.error('Gagal membuat sesi baru:', e);
                                }
                            }}
                            onDeleteSession={async (sessionId) => {
                                try {
                                    await fetch(`/api/chat/sessions/${sessionId}`, {
                                        method: 'DELETE',
                                        headers: { 'X-CSRF-TOKEN': getCsrfToken() },
                                        credentials: 'include',
                                    });
                                    if (selectedSession === sessionId) {
                                        setSelectedSession(null);
                                        setChatMessages([]);
                                        // load active session again
                                        try {
                                            const res = await fetch('/api/chat/sessions/active?category=mood', { credentials: 'include' });
                                            const js = await res.json();
                                            if (js?.success && js.data) {
                                                setSelectedSession(js.data.id);
                                                const msgs = (js.data.messages || []).map(m => ({
                                                    id: m.id,
                                                    type: m.type,
                                                    message: m.message,
                                                    timestamp: formatDisplayTime(m.timestamp || m.created_at),
                                                }));
                                                setChatMessages(msgs);
                                            }
                                        } catch {}
                                    }
                                    await refreshSessions();
                                } catch (e) {
                                    console.error('Gagal menghapus sesi:', e);
                                }
                            }}
                        />

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-8 max-w-full overflow-hidden">
                    {/* Mobile Header with Hamburger */}
                    <div className="flex items-center justify-between mb-6 lg:mb-8 lg:hidden">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold text-white">Mood Tracker</h2>
                        <div className="w-10"></div> {/* Spacer untuk centering */}
                    </div>

                    {/* ML Prediction Indicator */}
                            <MoodPrediction mlPrediction={mlPrediction} />

                    {/* Chat Messages */}
                            <ChatMessages 
                                currentChatMessages={currentChatMessages}
                                chatContainerRef={chatContainerRef}
                                isAnalyzing={isAnalyzing}
                                isListening={isListening}
                                isSupported={isSupported}
                                voiceStatus={voiceStatus}
                                isConnected={isConnected}
                                isTyping={isTyping}
                                moodTemplates={moodTemplates}
                                onUseTemplate={useMoodTemplate}
                            />

                    {/* Message Input */}
                            <MessageInput 
                                message={message}
                                setMessage={setMessage}
                                onSendMessage={handleSendMessage}
                                onKeyPress={handleKeyPress}
                                onToggleListening={toggleListening}
                                onStopSpeaking={stopSpeaking}
                                isAnalyzing={isAnalyzing}
                                isListening={isListening}
                                isSpeaking={isSpeaking}
                                isSupported={isSupported}
                            />

                    {/* Disclaimer */}
                    <p className="text-white/50 text-xs lg:text-sm mt-4 lg:mt-6 text-center">
                                Data mood Anda bersifat pribadi dan aman. Ini membantu kami memberikan insight yang lebih baik.
                    </p>
                </div>
            </div>
        </div>
    </div>
        </LayoutUser>
    );
}