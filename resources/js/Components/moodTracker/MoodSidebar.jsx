import React from "react";

export default function MoodSidebar({ 
    sessions, 
    selectedSession, 
    onSessionSelect, 
    isSidebarOpen, 
    onCloseSidebar 
}) {
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

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onCloseSidebar}
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
                        onClick={onCloseSidebar}
                        className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* New Session Button */}
                <button className="w-full border-2 border-dashed border-white/30 hover:border-white hover:bg-white/10 rounded-xl p-4 mb-6 transition-all duration-300 group">
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5 text-white group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-white font-semibold uppercase tracking-wide group-hover:text-white">
                            Mood Baru
                        </span>
                    </div>
                </button>

                {/* Session History */}
                <div className="space-y-3">
                    <h3 className="text-white/70 text-sm font-medium uppercase tracking-wide mb-4">History Mood Kamu</h3>
                    {sessions.map((session, index) => (
                        <div 
                            key={session.id} 
                            onClick={() => onSessionSelect(session.id)}
                            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                                selectedSession === session.id
                                    ? 'bg-white/10 border border-white/30' 
                                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-white font-medium">{session.title}</h4>
                                    <p className="text-white/60 text-sm">{session.date}</p>
                                    <span className="text-white text-xs font-medium">{session.mood}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    {index > 0 && (
                                        <svg className="w-4 h-4 text-red-400 hover:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    )}
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
        </>
    );
}
