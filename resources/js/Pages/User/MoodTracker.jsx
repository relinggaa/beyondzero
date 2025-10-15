import React, { useState } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [message, setMessage] = useState("");
    const [selectedSession, setSelectedSession] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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

    const currentChatMessages = allChatMessages[selectedSession] || [];

    return (
        <LayoutUser>
            
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
                    w-80 bg-slate-800 border-r border-slate-700 p-4 lg:p-6
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
                    <button className="w-full border-2 border-dashed border-white/30 hover:border-cyan-400 hover:bg-cyan-400/10 rounded-xl p-4 mb-6 transition-all duration-300 group">
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5 text-white group-hover:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-white font-semibold uppercase tracking-wide group-hover:text-cyan-400">
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
                                onClick={() => {
                                    setSelectedSession(session.id);
                                    // Close sidebar on mobile after selection
                                    if (window.innerWidth < 1024) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                                    selectedSession === session.id
                                        ? 'bg-gradient-to-r from-cyan-400/20 to-teal-500/20 border border-cyan-400/30' 
                                        : 'bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-cyan-400/50'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-white font-medium">{session.title}</h4>
                                        <p className="text-white/60 text-sm">{session.date}</p>
                                        <span className="text-cyan-400 text-xs font-medium">{session.mood}</span>
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

                {/* Main Content */}
                <div className="flex-1 bg-slate-800 p-4 lg:p-8">
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


                    {/* Chat Messages */}
                    <div className="bg-slate-700 rounded-2xl p-4 lg:p-6 mb-6 border border-slate-600">
                        <h3 className="text-white font-semibold text-base lg:text-lg mb-4">Chat Terbaru</h3>
                        <div className="space-y-3 lg:space-y-4 max-h-80 lg:max-h-96 overflow-y-auto">
                            {currentChatMessages.length === 0 ? (
                                // Greeting saat chat kosong
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="text-4xl mb-4">👋</div>
                                    <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                                        Hai! Bagaimana perasaanmu hari ini?
                                    </h2>
                                    <p className="text-white/70 text-sm lg:text-base max-w-md">
                                        Pantau mood dan emosi Anda untuk memahami diri sendiri lebih baik. Mulai percakapan dengan mengetik pesan di bawah ini.
                                    </p>
                                </div>
                            ) : (
                                // Chat messages
                                currentChatMessages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 lg:px-4 py-2 lg:py-3 rounded-2xl ${
                                            msg.type === 'user' 
                                                ? 'bg-gradient-to-r from-cyan-400 to-teal-500 text-white' 
                                                : 'bg-slate-600 text-white'
                                        }`}>
                                            <p className="text-xs lg:text-sm break-words">{msg.message}</p>
                                            <p className={`text-xs mt-1 ${
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

                    {/* Message Input */}
                    <div className="bg-slate-700 rounded-2xl p-4 lg:p-6 border border-slate-600">
                        <div className="flex items-center space-x-2 lg:space-x-4">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ceritakan lebih detail tentang perasaanmu..."
                                className="flex-1 bg-transparent text-white placeholder-white/50 border-none outline-none text-sm lg:text-lg"
                            />
                            {/* Send Button */}
                            <button className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white p-2 lg:p-3 rounded-xl transition-all duration-200 hover:scale-105 flex-shrink-0">
                                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                            {/* Voice Recording Button */}
                            <button className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white p-2 lg:p-3 rounded-xl transition-all duration-200 hover:scale-105 flex-shrink-0">
                                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-white/50 text-xs lg:text-sm mt-4 lg:mt-6 text-center">
                        Data mood Anda bersifat pribadi dan aman. Ini membantu kami memberikan insight yang lebih baik.
                    </p>
                </div>
            </div>
        </LayoutUser>
    );
}
