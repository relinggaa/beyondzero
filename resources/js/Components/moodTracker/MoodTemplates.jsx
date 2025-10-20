import React from "react";

export default function MoodTemplates({ moodTemplates, onUseTemplate }) {
    return (
        <div className="w-full max-w-5xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {moodTemplates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => onUseTemplate(template)}
                        className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group relative overflow-hidden"
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        
                        {/* Icon Section */}
                        <div className="relative z-10 flex flex-col items-center text-center mb-4">
                            <div className="w-20 h-20 mb-4 relative">
                                {/* Head Profile Icon */}
                                <div className="w-full h-full bg-gradient-to-br from-slate-600/50 to-slate-700/50 rounded-full flex items-center justify-center relative overflow-hidden border border-slate-500/30">
                                    {/* Head Profile with Thought Patterns */}
                                    <div className="absolute inset-3">
                                        {template.id === 'awful' && (
                                            <svg viewBox="0 0 24 24" className="w-full h-full text-red-400/60">
                                                {/* Tangled/Confused thoughts pattern */}
                                                <path d="M8 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm4 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="currentColor"/>
                                                <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
                                                <path d="M10 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
                                                <path d="M8 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
                                            </svg>
                                        )}
                                        {template.id === 'bad' && (
                                            <svg viewBox="0 0 24 24" className="w-full h-full text-orange-400/60">
                                                {/* Warning/Alert pattern */}
                                                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z" fill="currentColor"/>
                                                <path d="M11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" fill="currentColor"/>
                                            </svg>
                                        )}
                                        {template.id === 'normal' && (
                                            <svg viewBox="0 0 24 24" className="w-full h-full text-gray-400/60">
                                                {/* Neutral/Flat pattern */}
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                                                <path d="M8 10h8v4H8v-4z" fill="currentColor"/>
                                            </svg>
                                        )}
                                        {template.id === 'good' && (
                                            <svg viewBox="0 0 24 24" className="w-full h-full text-green-400/60">
                                                {/* Growth/Positive pattern */}
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                                                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                        {template.id === 'amazing' && (
                                            <svg viewBox="0 0 24 24" className="w-full h-full text-cyan-400/60">
                                                {/* Star/Excellence pattern */}
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                                                <path d="M12 6l1.5 3L17 10.5l-3 2.5 1.5 3L12 15l-3.5 1 1.5-3-3-2.5L10.5 9 12 6z" fill="currentColor"/>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${template.color} opacity-10 blur-sm group-hover:opacity-20 transition-opacity duration-300`}></div>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-white font-semibold text-base mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                                {template.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {template.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
