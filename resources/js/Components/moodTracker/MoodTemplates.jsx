import React from "react";

export default function MoodTemplates({ moodTemplates, onUseTemplate }) {
    return (
        <div className="w-full mb-8 max-w-full">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-custom horizontal-scroll max-w-full">
                {moodTemplates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => onUseTemplate(template)}
                        className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group relative overflow-hidden flex-shrink-0 w-80"
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        
                        {/* Icon Section */}
                        <div className="relative z-10 flex flex-col items-center text-center mb-4">
                            <div className="mb-4 relative">
                                {/* Custom Image for templates */}
                                {template.id === 'awful' ? (
                                    <img 
                                        src="/img/template_1.png" 
                                        alt="Mental Health Template" 
                                        className="w-60 h-60 object-contain"
                                    />
                                ) : template.id === 'bad' ? (
                                    <img 
                                        src="/img/template_2.png" 
                                        alt="Cognitive Restructuring Template" 
                                        className="w-60 h-60 object-contain"
                                    />
                                ) : template.id === 'normal' ? (
                                    <img 
                                        src="/img/template_3.png" 
                                        alt="Exposure Therapy Template" 
                                        className="w-60 h-60 object-contain"
                                    />
                                ) : template.id === 'good' ? (
                                    <img 
                                        src="/img/template_4.png" 
                                        alt="Interoceptive Exposure Template" 
                                        className="w-60 h-60 object-contain"
                                    />
                                ) : template.id === 'amazing' ? (
                                    <img 
                                        src="/img/template_5.png" 
                                        alt="Mindfulness Meditation Template" 
                                        className="w-60 h-60 object-contain"
                                    />
                                ) : (
                                    /* Head Profile with Thought Patterns */
                                    <div className="w-20 h-20 relative">
                                        <div className="w-full h-full bg-gradient-to-br from-slate-600/50 to-slate-700/50 rounded-full flex items-center justify-center relative overflow-hidden border border-slate-500/30">
                                            <div className="absolute inset-3">
                                                {/* No more SVG icons needed - all templates now use custom images */}
                                            </div>
                                        </div>
                                        {/* Glow Effect */}
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${template.color} opacity-10 blur-sm group-hover:opacity-20 transition-opacity duration-300`}></div>
                                    </div>
                                )}
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
