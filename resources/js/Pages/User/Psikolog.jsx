import React, { useState } from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function Psikolog() {
    const [selectedPsikolog, setSelectedPsikolog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    const psikologList = [
        {
            id: 1,
            name: "Dr. Sarah Wijaya, M.Psi., Psikolog",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
            expertise: ["Anxiety Disorders", "Depression", "Trauma Therapy"],
            description: "Dr. Sarah adalah psikolog klinis dengan pengalaman 10 tahun dalam menangani gangguan kecemasan dan depresi. Ia menggunakan pendekatan Cognitive Behavioral Therapy (CBT) dan mindfulness-based interventions untuk membantu klien mengatasi tantangan mental mereka.",
            education: "S.Psi. Universitas Indonesia, M.Psi. Universitas Gadjah Mada, Psikolog Klinis",
            experience: "10 tahun",
            approach: "Cognitive Behavioral Therapy (CBT), Mindfulness-based Therapy",
            philosophy: "Setiap individu memiliki kekuatan untuk berubah dan berkembang. Saya percaya bahwa dengan dukungan yang tepat, setiap orang dapat mengatasi tantangan dan mencapai potensi terbaik mereka."
        },
        {
            id: 2,
            name: "Dr. Michael Chen, M.Psi., Psikolog",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
            expertise: ["Family Therapy", "Child Psychology", "Relationship Counseling"],
            description: "Dr. Michael adalah spesialis terapi keluarga dan psikologi anak dengan fokus pada dinamika keluarga yang sehat. Ia memiliki pengalaman luas dalam menangani konflik keluarga dan membantu anak-anak mengatasi masalah emosional.",
            education: "S.Psi. Universitas Padjadjaran, M.Psi. Universitas Indonesia, Psikolog Klinis",
            experience: "8 tahun",
            approach: "Family Systems Therapy, Play Therapy, Solution-Focused Therapy",
            philosophy: "Keluarga adalah fondasi utama dalam perkembangan individu. Saya berkomitmen untuk membantu keluarga membangun komunikasi yang sehat dan hubungan yang harmonis."
        },
        {
            id: 3,
            name: "Dr. Aisha Rahman, M.Psi., Psikolog",
            image: "https://images.unsplash.com/photo-1594824371741-4b8b0b5b5b5b?w=300&h=300&fit=crop&crop=face",
            expertise: ["Career Counseling", "Stress Management", "Work-Life Balance"],
            description: "Dr. Aisha adalah psikolog industri dan organisasi yang mengkhususkan diri dalam konseling karir dan manajemen stres. Ia membantu klien mengembangkan keterampilan koping yang efektif dan mencapai keseimbangan hidup yang optimal.",
            education: "S.Psi. Universitas Airlangga, M.Psi. Universitas Gadjah Mada, Psikolog Industri & Organisasi",
            experience: "12 tahun",
            approach: "Career Development Theory, Stress Management Techniques, Positive Psychology",
            philosophy: "Keseimbangan antara karir dan kehidupan pribadi adalah kunci kebahagiaan. Saya membantu klien menemukan harmoni dalam semua aspek kehidupan mereka."
        },
        {
            id: 4,
            name: "Dr. James Rodriguez, M.Psi., Psikolog",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
            expertise: ["Addiction Therapy", "Behavioral Disorders", "Crisis Intervention"],
            description: "Dr. James adalah psikolog klinis yang mengkhususkan diri dalam terapi kecanduan dan gangguan perilaku. Ia memiliki pengalaman dalam menangani kasus krisis dan membantu klien mengembangkan strategi koping yang sehat.",
            education: "S.Psi. Universitas Diponegoro, M.Psi. Universitas Indonesia, Psikolog Klinis",
            experience: "15 tahun",
            approach: "Motivational Interviewing, Cognitive Behavioral Therapy, Harm Reduction",
            philosophy: "Pemulihan adalah proses yang membutuhkan kesabaran dan dukungan. Saya percaya bahwa setiap orang berhak mendapatkan kesempatan kedua untuk berubah."
        },
        {
            id: 5,
            name: "Dr. Lisa Park, M.Psi., Psikolog",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
            expertise: ["Eating Disorders", "Body Image Issues", "Self-Esteem"],
            description: "Dr. Lisa adalah psikolog klinis yang mengkhususkan diri dalam menangani gangguan makan dan masalah citra tubuh. Ia menggunakan pendekatan yang holistik untuk membantu klien mengembangkan hubungan yang sehat dengan makanan dan tubuh mereka.",
            education: "S.Psi. Universitas Brawijaya, M.Psi. Universitas Indonesia, Psikolog Klinis",
            experience: "9 tahun",
            approach: "Dialectical Behavior Therapy (DBT), Body Image Therapy, Self-Compassion Therapy",
            philosophy: "Setiap tubuh adalah unik dan berharga. Saya membantu klien mengembangkan hubungan yang positif dengan tubuh mereka dan menemukan kebahagiaan sejati."
        },
        {
            id: 6,
            name: "Dr. Ahmad Hassan, M.Psi., Psikolog",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            expertise: ["Grief Counseling", "Life Transitions", "Spiritual Psychology"],
            description: "Dr. Ahmad adalah psikolog yang mengkhususkan diri dalam konseling duka cita dan transisi kehidupan. Ia menggabungkan pendekatan psikologi tradisional dengan aspek spiritual untuk membantu klien menemukan makna dalam perjalanan hidup mereka.",
            education: "S.Psi. Universitas Syarif Hidayatullah, M.Psi. Universitas Indonesia, Psikolog Klinis",
            experience: "11 tahun",
            approach: "Grief Therapy, Existential Therapy, Spiritual Counseling",
            philosophy: "Setiap kehilangan membawa pelajaran berharga. Saya membantu klien menemukan kekuatan dalam menghadapi perubahan dan menemukan makna baru dalam hidup."
        }
    ];

    const handleDetailClick = (psikolog) => {
        setSelectedPsikolog(psikolog);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPsikolog(null);
    };

    const handleOpenChatbot = () => {
        setIsChatbotOpen(true);
        // Initialize chat with welcome message
        setChatMessages([
            {
                id: 1,
                type: "ai",
                message: "Halo! Saya AI Assistant BeyondMind 🤖. Ada yang bisa saya bantu terkait kesehatan mental Anda?",
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            }
        ]);
    };

    const handleCloseChatbot = () => {
        setIsChatbotOpen(false);
        setChatMessages([]);
        setChatMessage("");
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (chatMessage.trim()) {
            const newMessage = {
                id: Date.now(),
                type: "user",
                message: chatMessage,
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            };
            
            setChatMessages(prev => [...prev, newMessage]);
            setChatMessage("");
            
            // Simulate AI response
            setTimeout(() => {
                const aiResponse = {
                    id: Date.now() + 1,
                    type: "ai",
                    message: "Terima kasih atas pertanyaan Anda. Saya di sini untuk membantu Anda dengan konsultasi kesehatan mental. Apakah ada hal lain yang ingin Anda tanyakan?",
                    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                };
                setChatMessages(prev => [...prev, aiResponse]);
            }, 1000);
        }
    };

    return (
        <LayoutUser>
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        👨‍⚕️ Tim Psikolog Kami
                    </h1>
                    <p className="text-white/70 text-lg">
                        Temukan psikolog yang tepat untuk kebutuhan kesehatan mental Anda
                    </p>
                </div>

                {/* Psikolog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {psikologList.map((psikolog) => (
                        <div key={psikolog.id} className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                            {/* Psikolog Image */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={psikolog.image}
                                    alt={psikolog.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400/30"
                                />
                            </div>

                            {/* Psikolog Info */}
                            <div className="text-center mb-4">
                                <h3 className="text-white font-semibold text-lg mb-2">{psikolog.name}</h3>
                                <div className="flex flex-wrap justify-center gap-2 mb-3">
                                    {psikolog.expertise.map((topic, index) => (
                                        <span
                                            key={index}
                                            className="bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Detail Button */}
                            <button
                                onClick={() => handleDetailClick(psikolog)}
                                className="w-full bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                            >
                                📋 Detail Psikolog
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Detail Psikolog */}
            {isModalOpen && selectedPsikolog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-600">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={selectedPsikolog.image}
                                    alt={selectedPsikolog.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400/30"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">{selectedPsikolog.name}</h2>
                                    <p className="text-cyan-400 font-medium">{selectedPsikolog.experience} pengalaman</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Deskripsi */}
                                <div>
                                    <h3 className="text-cyan-400 font-semibold text-lg mb-3">📝 Tentang Psikolog</h3>
                                    <p className="text-white/80 leading-relaxed">{selectedPsikolog.description}</p>
                                </div>

                                {/* Topik Keahlian */}
                                <div>
                                    <h3 className="text-green-400 font-semibold text-lg mb-3">🎯 Topik Keahlian</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPsikolog.expertise.map((topic, index) => (
                                            <span
                                                key={index}
                                                className="bg-green-400/20 text-green-300 px-3 py-2 rounded-lg text-sm font-medium"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Pendekatan Terapi */}
                                <div>
                                    <h3 className="text-purple-400 font-semibold text-lg mb-3">🔬 Pendekatan Terapi</h3>
                                    <p className="text-white/80">{selectedPsikolog.approach}</p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Pendidikan */}
                                <div>
                                    <h3 className="text-blue-400 font-semibold text-lg mb-3">🎓 Pendidikan</h3>
                                    <p className="text-white/80">{selectedPsikolog.education}</p>
                                </div>

                                {/* Pengalaman */}
                                <div>
                                    <h3 className="text-orange-400 font-semibold text-lg mb-3">💼 Pengalaman</h3>
                                    <p className="text-white/80">{selectedPsikolog.experience} dalam praktik psikologi klinis</p>
                                </div>

                                {/* Filosofi */}
                                <div>
                                    <h3 className="text-pink-400 font-semibold text-lg mb-3">💭 Filosofi</h3>
                                    <p className="text-white/80 italic">"{selectedPsikolog.philosophy}"</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end mt-8 pt-6 border-t border-slate-600">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Chatbot Button */}
            {!isChatbotOpen && (
                <button
                    onClick={handleOpenChatbot}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            )}

            {/* Floating Chatbot Window */}
            {isChatbotOpen && (
                <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
                    {/* Chatbot Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-t-2xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">BeyondMind AI</h3>
                                <p className="text-white/80 text-xs">Online</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="text-white/60 hover:text-white p-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                            <button
                                onClick={handleCloseChatbot}
                                className="text-white/60 hover:text-white p-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {chatMessages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                                    msg.type === 'user' 
                                        ? 'bg-gradient-to-r from-cyan-400 to-teal-500 text-white' 
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    <p>{msg.message}</p>
                                    <p className={`text-xs mt-1 ${
                                        msg.type === 'user' ? 'text-white/70' : 'text-gray-500'
                                    }`}>
                                        {msg.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-gray-200">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="Tulis pertanyaan Anda..."
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white p-2 rounded-full transition-all duration-200 hover:scale-105"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Informasi dari AI mungkin tidak akurat
                        </p>
                    </div>
                </div>
            )}
        </LayoutUser>
    );
}
