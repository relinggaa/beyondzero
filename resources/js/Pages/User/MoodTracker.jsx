import React, { useState, useEffect, useRef } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import MoodSidebar from "../../Components/moodTracker/MoodSidebar";
import MoodPrediction from "../../Components/moodTracker/MoodPrediction";
import ChatMessages from "../../Components/moodTracker/ChatMessages";
import MessageInput from "../../Components/moodTracker/MessageInput";
import io from 'socket.io-client';

export default function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [message, setMessage] = useState("");
    const [selectedSession, setSelectedSession] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mlPrediction, setMlPrediction] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [voiceStatus, setVoiceStatus] = useState('');
    const [showMoodTemplates, setShowMoodTemplates] = useState(false);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef(null);

    const sessions = [
        { id: 1, title: "Mood Baru", date: "15/10/2025, 12:27:13", mood: "Belum dimulai" },
        { id: 2, title: "Cek Mood Pagi", date: "15/10/2025, 12:27:13", mood: "Bahagia" },
        { id: 3, title: "Refleksi Sore", date: "14/10/2025, 15:45:22", mood: "Tenang" },
        { id: 4, title: "Relaksasi Malam", date: "13/10/2025, 20:30:15", mood: "Cemas" }
    ];

    const allChatMessages = {
        1: [], // Mood baru - chat kosong
        2: [
            {
                id: 1,
                type: "user",
                message: "Hari ini aku merasa sangat lelah dan stres dengan pekerjaan",
                timestamp: "12:30"
            },
            {
                id: 2,
                type: "ai",
                message: "Saya mengerti perasaan Anda. Stres di tempat kerja memang bisa sangat melelahkan. Bisa ceritakan lebih detail apa yang membuat Anda merasa stres hari ini?",
                timestamp: "12:31"
            },
            {
                id: 3,
                type: "user",
                message: "Boss memberikan deadline yang sangat ketat dan aku tidak yakin bisa menyelesaikannya tepat waktu",
                timestamp: "12:32"
            },
            {
                id: 4,
                type: "ai",
                message: "Deadline yang ketat memang bisa menimbulkan kecemasan. Coba kita breakdown tugas tersebut menjadi bagian-bagian kecil yang lebih mudah dikelola. Apa yang bisa Anda lakukan untuk mengurangi tekanan ini?",
                timestamp: "12:33"
            },
            {
                id: 5,
                type: "user",
                message: "Mungkin aku bisa bicara dengan boss tentang timeline yang lebih realistis",
                timestamp: "12:35"
            },
            {
                id: 6,
                type: "ai",
                message: "Itu ide yang bagus! Komunikasi yang jujur dengan atasan bisa membantu. Bagaimana perasaan Anda sekarang setelah membicarakannya?",
                timestamp: "12:36"
            }
        ],
        3: [
            {
                id: 1,
                type: "user",
                message: "Aku merasa lebih tenang hari ini setelah meditasi pagi",
                timestamp: "15:45"
            },
            {
                id: 2,
                type: "ai",
                message: "Bagus sekali! Meditasi memang bisa membantu menenangkan pikiran. Bagaimana perasaan Anda sekarang dibandingkan pagi ini?",
                timestamp: "15:46"
            },
            {
                id: 3,
                type: "user",
                message: "Aku merasa lebih fokus dan energi positif",
                timestamp: "15:47"
            },
            {
                id: 4,
                type: "ai",
                message: "Sangat baik! Energi positif ini bisa membantu Anda menjalani hari dengan lebih baik. Apa yang membuat Anda merasa bersyukur hari ini?",
                timestamp: "15:48"
            }
        ],
        4: [
            {
                id: 1,
                type: "user",
                message: "Aku merasa cemas dan tidak bisa tidur",
                timestamp: "20:30"
            },
            {
                id: 2,
                type: "ai",
                message: "Saya mengerti kecemasan Anda. Kesulitan tidur bisa sangat mengganggu. Apa yang mengganggu pikiran Anda malam ini?",
                timestamp: "20:31"
            },
            {
                id: 3,
                type: "user",
                message: "Aku khawatir tentang presentasi besok dan takut tidak bisa perform dengan baik",
                timestamp: "20:32"
            },
            {
                id: 4,
                type: "ai",
                message: "Kekhawatiran tentang presentasi memang wajar. Coba kita lakukan teknik relaksasi sederhana. Tarik napas dalam-dalam dan bayangkan presentasi berjalan dengan lancar.",
                timestamp: "20:33"
            },
            {
                id: 5,
                type: "user",
                message: "Terima kasih, aku akan coba teknik itu",
                timestamp: "20:35"
            }
        ]
    };

    const currentChatMessages = chatMessages.length > 0 ? chatMessages : allChatMessages[selectedSession] || [];

    // Template mood untuk new session
    const moodTemplates = [
        {
            id: 'awful',
            mood: 'Awful',
            emoji: '😢',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/30',
            title: 'Unraveling cognitive distortions',
            description: 'Understanding and challenging negative thought patterns',
            examples: [
                'Hari ini adalah hari terburuk dalam hidupku',
                'Tidak ada semangat sama sekali, badan lemas',
                'Menghabiskan sepanjang hari di tempat tidur',
                'Tidak ada aktivitas positif sama sekali'
            ]
        },
        {
            id: 'bad',
            mood: 'Bad',
            emoji: '😔',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/30',
            title: 'Cognitive restructuring',
            description: 'Reframing thoughts for better mental health',
            examples: [
                'Hari ini aku merasa lelah dan stres',
                'Bangun terlambat, tidak sempat sholat',
                'Tidak ada waktu untuk aktivitas yang aku sukai',
                'Mood hari ini tidak terlalu baik'
            ]
        },
        {
            id: 'normal',
            mood: 'Normal',
            emoji: '😐',
            color: 'from-gray-500 to-gray-600',
            bgColor: 'bg-gray-500/10',
            borderColor: 'border-gray-500/30',
            title: 'Exposure and response prevention',
            description: 'Facing fears while managing anxiety responses',
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
            title: 'Interoceptive exposure',
            description: 'Building tolerance to internal sensations',
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
            title: 'Mindfulness and meditation',
            description: 'Cultivating present-moment awareness',
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
            newSocket.emit('join_session', { session_id: `session_${selectedSession}` });
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
            newSocket.emit('join_session', { session_id: `session_${selectedSession}` });
        });

        newSocket.on('connected', (data) => {
            console.log('🎉 WebSocket server response:', data.message);
        });

        newSocket.on('joined_session', (data) => {
            console.log('📝 Joined session:', data.session_id);
        });

        newSocket.on('mood_result', (data) => {
            console.log('🎯 Mood analysis result received:', data);
            if (data.success) {
                setMlPrediction(data);
                setIsAnalyzing(false);
                
                // Generate AI response
                const aiResponse = generateAIResponse(data, '');
                
                // Add AI message
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    message: aiResponse,
                    timestamp: new Date().toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                    })
                };
                
                setChatMessages(prev => [...prev, aiMessage]);
                
                // Auto-scroll after AI response
                setTimeout(scrollToBottom, 100);
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

    // Initialize voice recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            
            if (SpeechRecognition) {
                const recognitionInstance = new SpeechRecognition();
                recognitionInstance.continuous = false;
                recognitionInstance.interimResults = false;
                recognitionInstance.lang = 'id-ID'; // Indonesian language
                
                recognitionInstance.onstart = () => {
                    setIsListening(true);
                    setVoiceStatus('Mendengarkan...');
                };
                
                recognitionInstance.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setMessage(transcript);
                    setVoiceStatus(`Diterjemahkan: "${transcript}"`);
                    
                    // Auto-send message after voice recognition
                    setTimeout(() => {
                        if (transcript && typeof transcript === 'string' && transcript.trim()) {
                            handleSendMessage(transcript);
                            setVoiceStatus('');
                        }
                    }, 500);
                };
                
                recognitionInstance.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    setIsListening(false);
                    setVoiceStatus(`Error: ${event.error}`);
                    setTimeout(() => setVoiceStatus(''), 3000);
                };
                
                recognitionInstance.onend = () => {
                    setIsListening(false);
                    if (!voiceStatus.includes('Error')) {
                        setVoiceStatus('');
                    }
                };
                
                setRecognition(recognitionInstance);
                setIsSupported(true);
            } else {
                setIsSupported(false);
            }
        }
    }, []);

    // Fungsi untuk analisis mood menggunakan ML
    const analyzeMoodWithML = async (userMessage) => {
        setIsAnalyzing(true);
        
        try {
            // Extract activities dari pesan user
            const activities = extractActivitiesFromMessage(userMessage);
            
            // Get current time dan weekday
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
            
            // Prepare data untuk ML prediction
            const mlData = {
                time: time,
                weekday: weekday,
                activities: activities.join(' | ')
            };
            
            // Call Simple Mood API (lebih akurat)
            const response = await fetch('http://localhost:5002/analyze-mood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: userMessage
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                setMlPrediction(result);
                return result;
            } else {
                console.error('ML Prediction failed:', result.error);
                return null;
            }
            
        } catch (error) {
            console.error('Error analyzing mood:', error);
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
        
        // Auto-scroll after user message
        setTimeout(scrollToBottom, 100);
        
        // Emit message received for auto-scroll
        if (socket && isConnected) {
            socket.emit('message_received', {
                session_id: `session_${selectedSession}`,
                timestamp: Date.now()
            });
        }
        
        // Analyze mood with WebSocket
        if (socket && isConnected) {
            setIsAnalyzing(true);
            socket.emit('analyze_mood', {
                text: messageToSend,
                session_id: `session_${selectedSession}`
            });
        } else {
            // Fallback to HTTP API if WebSocket not available
            const mlResult = await analyzeMoodWithML(messageToSend);
            
            // Generate AI response
            const aiResponse = generateAIResponse(mlResult, messageToSend);
            
            // Add AI message
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                message: aiResponse,
                timestamp: new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                })
            };
            
            setChatMessages(prev => [...prev, aiMessage]);
            
            // Auto-scroll after AI response
            setTimeout(scrollToBottom, 100);
        }
        
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
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition && isListening) {
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
    const handleSessionSelect = (sessionId) => {
        setSelectedSession(sessionId);
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
                        />

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-8">
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
                                isAnalyzing={isAnalyzing}
                                isListening={isListening}
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