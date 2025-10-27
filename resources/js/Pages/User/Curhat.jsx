import React, { useState, useEffect, useRef } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import ConfirmModal from "../../Components/ConfirmModal";
import axios from "axios";

export default function Curhat({ auth }) {
    const [selectedMood, setSelectedMood] = useState(null);
    const [message, setMessage] = useState("");
    const [selectedSession, setSelectedSession] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const chatContainerRef = useRef(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);

    // Axios defaults for Sanctum/session auth
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    // Check if user is authenticated
    const isAuthenticated = () => {
        return auth?.user !== null;
    };

    // Auto-scroll function
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    // Load chat sessions from API
    const loadChatSessions = async () => {
        try {
            console.log('📡 Loading chat sessions...');
            const response = await axios.get('/api/chat/sessions');
            console.log('📋 Sessions response:', response.data);
            
            if (response.data.success) {
                const sessionsData = response.data.data;
                console.log('📊 Found sessions:', sessionsData.length);
                
                setSessions(sessionsData);
                
                // Always set first session as selected if none selected and sessions exist
                if (!selectedSession && sessionsData.length > 0) {
                    const firstSessionId = sessionsData[0].id;
                    console.log('✅ Setting first session as selected:', firstSessionId);
                    setSelectedSession(firstSessionId);
                }
                
                // If no sessions exist, create a new one
                if (sessionsData.length === 0) {
                    console.log('⚠️ No sessions found, creating new session');
                    await createNewSession();
                }
            } else {
                console.error('❌ API returned unsuccessful response:', response.data);
                // Try to create a session anyway
                await createNewSession();
            }
        } catch (error) {
            console.error('❌ Error loading chat sessions:', error);
            console.error('Error details:', error.response?.data || error.message);
            
            // Try to create a session anyway
            try {
                console.log('🔄 Attempting to create new session after error...');
                await createNewSession();
            } catch (createError) {
                console.error('❌ Failed to create session after error:', createError);
            }
        }
    };

    // Load messages for selected session
    const loadChatMessages = async (sessionId) => {
        try {
            console.log('Loading messages for session:', sessionId);
            const response = await axios.get(`/api/chat/sessions/${sessionId}`);
            console.log('Messages response:', response.data);
            
            if (response.data.success) {
                setChatMessages(response.data.data.messages || []);
                console.log('Messages loaded:', response.data.data.messages?.length || 0);
            }
        } catch (error) {
            console.error('Error loading chat messages:', error);
            setChatMessages([]);
        }
    };

    // Create new chat session
    const createNewSession = async () => {
        try {
            console.log('🆕 Creating new chat session...');
            const response = await axios.post('/api/chat/sessions', {
                title: 'Curhat Baru',
                mood: null
            });
            console.log('📝 New session response:', response.data);
            
            if (response.data.success) {
                const newSessionId = response.data.data.id;
                console.log('✅ New session created with ID:', newSessionId);
                
                // Reload sessions to get updated list
                await loadChatSessions();
                
                // Set the new session as selected
                setSelectedSession(newSessionId);
                setChatMessages([]);
                
                console.log('✅ New session created and selected:', newSessionId);
                return newSessionId;
            } else {
                console.error('❌ Failed to create session:', response.data);
                throw new Error('Failed to create session: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('❌ Error creating new session:', error);
            console.error('Error details:', error.response?.data || error.message);
            throw error;
        }
    };

    const requestDeleteSession = (sessionId) => {
        setSessionToDelete(sessionId);
        setConfirmOpen(true);
    };

    const deleteSession = async () => {
        if (!sessionToDelete) return;
        try {
            await axios.delete(`/api/chat/sessions/${sessionToDelete}`);
            setConfirmOpen(false);
            // Refresh sessions
            await loadChatSessions();
            // If the deleted session was selected, move selection
            if (selectedSession === sessionToDelete) {
                const remaining = sessions.filter(s => s.id !== sessionToDelete);
                setSelectedSession(remaining[0]?.id || null);
                setChatMessages([]);
            }
            setSessionToDelete(null);
        } catch (e) {
            console.error('Failed to delete session', e);
            setConfirmOpen(false);
            setSessionToDelete(null);
            alert('Gagal menghapus sesi.');
        }
    };

    // Check Ollama connection status
    useEffect(() => {
        const checkOllamaStatus = async () => {
            try {
                const response = await fetch('http://localhost:5004/status');
                const data = await response.json();
                setIsConnected(data.ollama_running);
            } catch (error) {
                console.error('Error checking Ollama status:', error);
                setIsConnected(false);
            }
        };

        checkOllamaStatus();
        const interval = setInterval(checkOllamaStatus, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, []);

    // Load initial data
    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            console.log('🔄 Loading initial data...');
            
            try {
                // Check if user is authenticated using Inertia auth data
                if (!isAuthenticated()) {
                    console.log('❌ User not authenticated, redirecting to login...');
                    window.location.href = '/login';
                    return;
                }
                
                await loadChatSessions();
                
                // If still no session selected after loading, create one
                if (!selectedSession) {
                    console.log('⚠️ No session selected after loading, creating new one...');
                    await createNewSession();
                }
            } catch (error) {
                console.error('❌ Error in loadInitialData:', error);
                // Only try to create session if user is authenticated
                if (isAuthenticated()) {
                    try {
                        await createNewSession();
                    } catch (createError) {
                        console.error('❌ Failed to create session:', createError);
                    }
                }
            }
            
            setLoading(false);
        };
        loadInitialData();
    }, []);

    // Debug selectedSession changes
    useEffect(() => {
        console.log('🔄 selectedSession changed:', selectedSession);
    }, [selectedSession]);

    // Fallback: Ensure we always have a session selected
    useEffect(() => {
        const ensureSessionSelected = async () => {
            if (!loading && !selectedSession && sessions.length === 0 && isAuthenticated()) {
                console.log('⚠️ No session selected and no sessions available, creating one...');
                try {
                    await createNewSession();
                } catch (error) {
                    console.error('❌ Failed to create fallback session:', error);
                }
            }
        };
        
        ensureSessionSelected();
    }, [loading, selectedSession, sessions.length]);

    // Load messages when session changes
    useEffect(() => {
        if (selectedSession) {
            loadChatMessages(selectedSession);
        }
    }, [selectedSession]);

    // Auto-scroll when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    // Function to send message to Ollama
    const sendMessageToOllama = async (userMessage) => {
        setIsTyping(true);
        
        try {
            const response = await fetch('http://localhost:5004/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    timestamp: new Date().toISOString()
                })
            });

            const data = await response.json();

            if (data.success) {
                // Add AI response to chat
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    message: data.response,
                    timestamp: new Date().toISOString()
                };
                
                // Save AI message to database
                await saveMessageToDatabase(aiMessage);
            } else {
                // Add error message
                const errorMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    message: `Maaf, terjadi kesalahan: ${data.error}`,
                    timestamp: new Date().toISOString()
                };
                
                await saveMessageToDatabase(errorMessage);
            }
        } catch (error) {
            console.error('Error sending message to Ollama:', error);
            
            // Add error message
            const errorMessage = {
                id: Date.now() + 1,
                type: 'ai',
                message: 'Maaf, tidak dapat terhubung ke AI. Pastikan Ollama sudah berjalan.',
                timestamp: new Date().toISOString()
            };
            
            await saveMessageToDatabase(errorMessage);
        } finally {
            setIsTyping(false);
        }
    };

    // Save message to database
    const saveMessageToDatabase = async (messageData) => {
        try {
            console.log('Attempting to save message:', messageData);
            
            const response = await axios.post(`/api/chat/sessions/${selectedSession}/messages`, {
                type: messageData.type,
                message: messageData.message,
                timestamp: messageData.timestamp
            });
            
            console.log('Database save response:', response.data);
            
            if (response.data.success) {
                console.log('Message saved successfully, reloading messages');
                // Reload messages to get updated data
                await loadChatMessages(selectedSession);
            } else {
                console.error('Failed to save message:', response.data);
                throw new Error('Failed to save message to database');
            }
        } catch (error) {
            console.error('Error saving message to database:', error);
            throw error; // Re-throw to be handled by caller
        }
    };

    // --- end helpers ---

    // Function to handle send message - Simplified version for testing
    const handleSendMessage = async () => {
        console.log('=== handleSendMessage START ===');
        console.log('Current state:', { 
            message: message.trim(), 
            selectedSession, 
            isTyping,
            sessionsCount: sessions.length 
        });
        
        if (!message.trim()) {
            console.log('❌ No message to send');
            return;
        }
        
        if (!selectedSession) {
            console.log('❌ No session selected');
            alert('Tidak ada session yang dipilih. Silakan pilih atau buat session baru.');
            return;
        }
        
        const messageToSend = message.trim();
        console.log('✅ Sending message:', messageToSend);
        
        // Clear input immediately
        setMessage('');
        
        try {
            // Create user message object
        const userMessage = {
            id: Date.now(),
            type: 'user',
                message: messageToSend,
                timestamp: new Date().toISOString()
            };
            
            console.log('📝 User message created:', userMessage);
            
            // Save to database
            console.log('💾 Saving to database...');
            await saveMessageToDatabase(userMessage);
            console.log('✅ Saved to database');
        
        // Send to Ollama
            console.log('🤖 Sending to Ollama...');
            await sendMessageToOllama(messageToSend);
            console.log('✅ Sent to Ollama');
            
        } catch (error) {
            console.error('❌ Error in handleSendMessage:', error);
            // Restore message on error
            setMessage(messageToSend);
            alert('Terjadi kesalahan saat mengirim pesan: ' + error.message);
        }
        
        console.log('=== handleSendMessage END ===');
    };

    // Handle enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Handle session selection
    const handleSessionSelect = (sessionId) => {
        setSelectedSession(sessionId);
        // Close sidebar on mobile after selection
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Format time for display
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    if (loading) {
        return (
            <LayoutUser>
                <div className="min-h-screen cursor-gaming mood-tracker-bg pt-20 flex items-center justify-center">
                    <div className="text-white text-xl">Memuat data chat...</div>
                </div>
            </LayoutUser>
        );
    }

    return (
        <>
        <LayoutUser>
            <div 
                className="min-h-screen cursor-gaming mood-tracker-bg pt-20"
            >
                <div className="min-h-screen">
            <div className="flex flex-col lg:flex-row">
                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Left Sidebar */}
                <div className={`
                    fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
                    w-80 bg-black/20 backdrop-blur-md border-r border-white/20 p-4 lg:p-6
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    {/* Mobile Close Button */}
                    <div className="flex justify-end mb-4 lg:hidden">
                        <button 
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* New Session Button */}
                    <button 
                        onClick={createNewSession}
                        className="w-full border-2 border-dashed border-white/30 hover:border-white hover:bg-white/10 rounded-xl p-4 mb-6 transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5 text-white group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-white font-semibold uppercase tracking-wide group-hover:text-white">
                                Curhat Baru
                            </span>
                        </div>
                    </button>

                    {/* Session History */}
                    <div className="space-y-3">
                        <h3 className="text-white/70 text-sm font-medium uppercase tracking-wide mb-4">History Curhat Kamu</h3>
                        {sessions.map((session, index) => (
                            <div 
                                key={session.id} 
                                onClick={() => handleSessionSelect(session.id)}
                                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                                    selectedSession === session.id
                                        ? 'bg-white/10 border border-white/30' 
                                        : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-white font-medium">{session.title}</h4>
                                        <p className="text-white/60 text-sm">{formatDate(session.created_at)}</p>
                                        <span className="text-white text-xs font-medium">
                                            {session.mood || 'Belum dimulai'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); requestDeleteSession(session.id); }} 
                                            title="Hapus sesi" 
                                            className="p-1 rounded hover:bg-white/10"
                                        >
                                            <svg className="w-4 h-4 text-red-400 hover:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative Lamp */}
                    <div className="mt-8 flex justify-center">
                        <div className="w-16 h-20 relative">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-orange-400 to-red-500 rounded-full opacity-80"></div>
                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-b from-orange-300/30 to-red-400/30 rounded-full blur-sm"></div>
                        </div>
                    </div>
                </div>

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
                        <h2 className="text-lg font-semibold text-white">Curhat</h2>
                        <div className="w-10"></div> {/* Spacer untuk centering */}
                    </div>


                    {/* Header/Indicators can be placed here if needed */}
                    <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 lg:p-6 mb-6 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-semibold text-base lg:text-lg">Chat Terbaru</h3>
                            <div className="flex items-center space-x-2">
                                {/* Ollama Connection Status */}
                                <div className={`flex items-center space-x-2 ${isConnected ? 'text-white' : 'text-white/50'}`}>
                                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-white' : 'bg-white/30'} ${isConnected ? 'animate-pulse' : ''}`}></div>
                                    <span className="text-sm">{isConnected ? 'Ollama Connected' : 'Ollama Disconnected'}</span>
                                </div>
                                {/* Typing Indicator */}
                                {isTyping && (
                                    <div className="flex items-center space-x-2 text-white">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                        <span className="text-sm">AI sedang mengetik...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div 
                            ref={chatContainerRef}
                            className="space-y-3 lg:space-y-4 max-h-80 lg:max-h-96 overflow-y-auto"
                        >
                            {chatMessages.length === 0 ? (
                                // Greeting saat chat kosong
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="text-4xl mb-4">💬</div>
                                    <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                                        Hai! Ada yang ingin dicurhatkan?
                                    </h2>
                                    <p className="text-white/70 text-sm lg:text-base max-w-md">
                                        Ceritakan apa yang mengganggu pikiranmu atau hal-hal yang ingin dibagikan. Mulai curhat dengan mengetik pesan di bawah ini.
                                    </p>
                                    {!isConnected && (
                                        <div className="mt-4 p-3 bg-white/10 border border-white/20 rounded-lg">
                                            <p className="text-white/70 text-sm">
                                                ⚠️ Ollama tidak terhubung. Pastikan Ollama sudah berjalan untuk menggunakan AI chatbot.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Chat messages
                                chatMessages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} chat-message`}>
                                        <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 lg:px-4 py-2 lg:py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                                            msg.type === 'user' 
                                                ? 'bg-white text-black shadow-lg' 
                                                : 'bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg'
                                        }`}>
                                            <p className="text-xs lg:text-sm break-words font-medium">{msg.message}</p>
                                            <p className={`text-xs mt-1 font-light ${
                                                msg.type === 'user' ? 'text-black/70' : 'text-white/50'
                                            }`}>
                                                {formatTime(msg.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20">
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={isTyping ? "AI sedang mengetik..." : "Ceritakan apa yang mengganggu pikiranmu..."}
                                className={`flex-1 bg-transparent text-white placeholder-white/50 border-none outline-none text-sm lg:text-lg ${
                                    isTyping ? 'placeholder-cyan-400' : ''
                                }`}
                                disabled={isTyping}
                            />
                            {/* Send Button */}
                            <button 
                                onClick={() => {
                                    console.log('🚀 Send button clicked', { 
                                        isTyping, 
                                        message: message.trim(), 
                                        selectedSession,
                                        disabled: isTyping || !message.trim() || !selectedSession
                                    });
                                    
                                    if (!selectedSession) {
                                        alert('Tidak ada session yang dipilih! Klik tombol "Create Session" untuk membuat session baru.');
                                        return;
                                    }
                                    
                                    if (!message.trim()) {
                                        alert('Pesan tidak boleh kosong!');
                                        return;
                                    }
                                    
                                    handleSendMessage();
                                }}
                                disabled={isTyping || !message.trim() || !selectedSession}
                                className="bg-white hover:bg-white/90 text-black p-2 lg:p-3 rounded-xl transition-all duration-200 hover:scale-105 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                title={!selectedSession ? 'Tidak ada session yang dipilih' : !message.trim() ? 'Pesan tidak boleh kosong' : 'Kirim pesan'}
                            >
                                {isTyping ? (
                                    <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white"></div>
                                ) : (
                                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                )}
                            </button>
                            {/* Voice Recording Button */}
                            <button 
                                disabled={isTyping}
                                className="bg-white hover:bg-white/90 text-black p-2 lg:p-3 rounded-xl transition-all duration-200 hover:scale-105 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-white/50 text-xs lg:text-sm mt-4 lg:mt-6 text-center">
                        Curhat Anda bersifat pribadi dan aman. Ini membantu kami memberikan dukungan yang lebih baik.
                    </p>
                </div>
            </div>
        </div>
    </div>
        </LayoutUser>
        <ConfirmModal
            open={confirmOpen}
            title="Hapus Sesi Curhat?"
            message={"Tindakan ini akan menghapus seluruh pesan pada sesi ini. Lanjutkan?"}
            confirmText="Hapus"
            cancelText="Batal"
            onConfirm={deleteSession}
            onCancel={() => { setConfirmOpen(false); setSessionToDelete(null); }}
        />
        </>
    );
}