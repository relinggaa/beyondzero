import React from "react";

export default function MessageInput({ 
    message, 
    setMessage, 
    onSendMessage, 
    onKeyPress, 
    onToggleListening,
    isAnalyzing, 
    isListening, 
    isSupported 
}) {
    return (
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20">
            <div className="flex items-center space-x-2 lg:space-x-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={onKeyPress}
                    placeholder={isListening ? "Mendengarkan..." : "Type a message..."}
                    className={`flex-1 bg-transparent text-white placeholder-white/50 border-none outline-none text-sm lg:text-lg ${
                        isListening ? 'placeholder-red-400' : ''
                    }`}
                    disabled={isAnalyzing || isListening}
                />
                {/* Send Button */}
                <button 
                    onClick={onSendMessage}
                    disabled={isAnalyzing || !message.trim()}
                    className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white p-2 lg:p-3 rounded-xl transition-all duration-200 hover:scale-105 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isAnalyzing ? (
                        <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white"></div>
                    ) : (
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    )}
                </button>
                {/* Voice Recording Button */}
                <button 
                    onClick={onToggleListening}
                    disabled={!isSupported || isAnalyzing}
                    className={`p-2 lg:p-3 rounded-xl transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                        isListening 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white' 
                            : isSupported 
                                ? 'bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white'
                                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={isSupported ? (isListening ? 'Stop listening' : 'Start voice input') : 'Voice recognition not supported'}
                >
                    {isListening ? (
                        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 6h12v12H6z" />
                        </svg>
                    ) : (
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
