import React from "react";
import MoodTemplates from "./MoodTemplates";

export default function ChatMessages({ 
    currentChatMessages, 
    chatContainerRef, 
    isAnalyzing, 
    isListening, 
    isSupported, 
    voiceStatus, 
    isConnected, 
    isTyping,
    moodTemplates,
    onUseTemplate 
}) {
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const extractMoodInfo = (text) => {
        if (typeof text !== 'string') return { clean: text, mood: null, confidence: null };
        const regex = /\n\nAnalisis mood:\s*([A-Za-z]+)\s*(?:\(confidence\s*([0-9.]+)%\))?/i;
        const match = text.match(regex);
        if (!match) return { clean: text, mood: null, confidence: null };
        const clean = text.replace(regex, '').trim();
        const mood = match[1];
        const confidence = match[2] ? Number(match[2]) : null;
        return { clean, mood, confidence };
    };

    const moodBadgeClasses = (mood) => {
        const m = String(mood || '').toLowerCase();
        if (m === 'amazing') return 'bg-cyan-500/20 border-cyan-400 text-cyan-200';
        if (m === 'good') return 'bg-green-500/20 border-green-400 text-green-200';
        if (m === 'normal') return 'bg-gray-500/20 border-gray-400 text-gray-200';
        if (m === 'bad') return 'bg-orange-500/20 border-orange-400 text-orange-200';
        if (m === 'awful') return 'bg-red-500/20 border-red-400 text-red-200';
        return 'bg-slate-500/20 border-slate-400 text-slate-200';
    };

    return (
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 lg:p-6 mb-6 border border-white/20 max-w-full overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-base lg:text-lg">Chat Terbaru</h3>
                <div className="flex items-center space-x-2">
                    {isAnalyzing && (
                        <div className="flex items-center space-x-2 text-cyan-400">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                            <span className="text-sm">Menganalisis mood...</span>
                        </div>
                    )}
                    {isListening && (
                        <div className="flex items-center space-x-2 text-red-400">
                            <div className="animate-pulse rounded-full h-4 w-4 bg-red-400"></div>
                            <span className="text-sm">Mendengarkan...</span>
                        </div>
                    )}
                    {!isSupported && (
                        <div className="flex items-center space-x-2 text-yellow-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span className="text-sm">Voice tidak didukung</span>
                        </div>
                    )}
                    {voiceStatus && (
                        <div className="flex items-center space-x-2 text-green-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{voiceStatus}</span>
                        </div>
                    )}
                    {/* WebSocket Connection Status removed by request */}
                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex items-center space-x-2 text-cyan-400 typing-indicator">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-sm font-medium">AI sedang menganalisis...</span>
                        </div>
                    )}
                </div>
            </div>
            <div 
                ref={chatContainerRef}
                className="space-y-3 lg:space-y-4 max-h-80 lg:max-h-96 overflow-y-auto"
            >
                {currentChatMessages.length === 0 ? (
                    // Greeting saat chat kosong dengan cards langsung terlihat
                    <div className="flex flex-col items-center justify-center py-8 text-center w-full">
                        <div className="text-4xl mb-4">👋</div>
                        <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                            Hi! What brings you here today?
                        </h2>
                        
                        {/* Mood Templates Cards - Langsung ditampilkan dengan container terbatas */}
                        <div className="w-full max-w-full overflow-hidden">
                            <MoodTemplates 
                                moodTemplates={moodTemplates}
                                onUseTemplate={onUseTemplate}
                            />
                        </div>

                        {/* Disclaimer */}
                        <p className="text-white/50 text-xs lg:text-sm text-center">
                            The responses are generated by AI. They do not represent the views of calmify.ai.
                        </p>
                    </div>
                ) : (
                    // Chat messages
                    currentChatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} chat-message`}>
                            <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 lg:px-4 py-2 lg:py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                                msg.type === 'user' 
                                    ? 'bg-gradient-to-r from-cyan-400 to-teal-500 text-white shadow-lg' 
                                    : 'bg-black/40 backdrop-blur-md text-white border border-white/20 shadow-lg'
                            }`}>
                                {msg.type === 'ai' ? (() => {
                                    const { clean, mood, confidence } = extractMoodInfo(msg.message || '');
                                    return (
                                        <>
                                            {mood && (
                                                <div className={`mb-2 px-3 py-2 rounded-xl border ${moodBadgeClasses(mood)} text-[11px] lg:text-xs font-semibold`}> 
                                                    Analisis mood: {mood}{typeof confidence === 'number' ? ` (confidence ${confidence.toFixed(1)}%)` : ''}
                                                </div>
                                            )}
                                            <p className="text-xs lg:text-sm break-words font-medium">{clean}</p>
                                        </>
                                    );
                                })() : (
                                    <p className="text-xs lg:text-sm break-words font-medium">{msg.message}</p>
                                )}
                                <p className={`text-xs mt-1 font-light ${
                                    msg.type === 'user' ? 'text-white/70' : 'text-white/50'
                                }`}>
                                    {msg.timestamp}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
