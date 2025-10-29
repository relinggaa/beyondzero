import React, { useState, useMemo } from "react";
import { useForm, Link } from "@inertiajs/react";
import LayoutUser from "../../Components/Layout/LayoutUser";
import backgroundPsikologImage from "../../../img/background_psikolog.png";
import { Card, Badge, Button, Avatar } from 'flowbite-react';
import PsikologCard from "../../Components/PsikologCard";

export default function Psikolog({ psikologs }) {
    const [selectedPsikolog, setSelectedPsikolog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isChatbotLoading, setIsChatbotLoading] = useState(false);
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const { data, setData, post, processing, errors } = useForm({
        psikolog_id: "",
        appointment_date: "",
        appointment_time: "",
        session_type: "online",
        notes: ""
    });

    // Use data from database, fallback to dummy data if empty
    const psikologList = psikologs && psikologs.length > 0 ? psikologs : [
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

    const handleOpenBooking = (psikolog) => {
        setSelectedPsikolog(psikolog);
        setData('psikolog_id', psikolog.id);
        setIsBookingModalOpen(true);
    };

    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedPsikolog(null);
        setData({
            psikolog_id: "",
            appointment_date: "",
            appointment_time: "",
            session_type: "online",
            notes: ""
        });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        post('/booking-psikolog', {
            onSuccess: () => {
                handleCloseBookingModal();
                alert('Jadwal konseling berhasil dibuat! Psikolog akan mengkonfirmasi jadwal Anda.');
            },
            onError: (errors) => {
                console.error('Booking errors:', errors);
            }
        });
    };

    const OLLAMA_API_BASE = 'http://localhost:5004';

    const handleOpenChatbot = () => {
        setIsChatbotOpen(true);
        // Initialize chat with welcome message
        setChatMessages([
            {
                id: 1,
                type: "ai",
                message: "Halo! Saya FixYou AI yang didukung Open-Source LLM (Ollama). Ceritakan apa yang sedang kamu rasakan, ya. Saya akan berusaha membantu dengan empati.",
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            }
        ]);
    };

    const handleCloseChatbot = () => {
        setIsChatbotOpen(false);
        setChatMessages([]);
        setChatMessage("");
    };

    // Bangun konteks halaman untuk AI (ringkas, tetap akurat)
    const buildPageContext = () => {
        const totalCards = (psikologList || []).length;
        const names = (psikologList || []).slice(0, 6).map(p => p.name).join(', ');
        return [
            'HALAMAN: Psikolog FixYou',
            'FITUR: pencarian psikolog, lihat detail, booking konseling (online/offline), chatbot AI.',
            `TOTAL PSIKOLOG TERLIHAT: ${totalCards}. Contoh nama: ${names}.`,
            'DETAIL MODAL: menampilkan deskripsi, topik keahlian, pendekatan, pendidikan, pengalaman, filosofi.',
            'BOOKING: pilih tanggal, waktu, tipe sesi, dan catatan. Aksi: buat jadwal.',
            'GAYA: tema gelap (hitam, biru navy, putih).'
        ].join('\n');
    };

    const handleSendMessage = async (e) => {
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

            // Tampilkan placeholder loading
            const loadingId = Date.now() + 2;
            setIsChatbotLoading(true);
            setChatMessages(prev => [...prev, { id: loadingId, type: 'ai', message: 'Mengetik...', timestamp: '' }]);

            try {
                const res = await fetch(`${OLLAMA_API_BASE}/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        message: newMessage.message, 
                        timestamp: newMessage.timestamp,
                        context: buildPageContext()
                    })
                });
                const data = await res.json();

                // Hapus placeholder loading
                setChatMessages(prev => prev.filter(m => m.id !== loadingId));
                setIsChatbotLoading(false);

                if (data.success) {
                    setChatMessages(prev => [...prev, {
                        id: Date.now() + 3,
                        type: 'ai',
                        message: data.response,
                        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                    }]);
                } else {
                    setChatMessages(prev => [...prev, {
                        id: Date.now() + 4,
                        type: 'ai',
                        message: `Maaf, saya tidak bisa merespons saat ini: ${data.error || 'Unknown error'}`,
                        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                    }]);
                }
            } catch (err) {
                // Hapus placeholder loading dan tampilkan error
                setChatMessages(prev => prev.filter(m => m.id !== loadingId));
                setIsChatbotLoading(false);
                setChatMessages(prev => [...prev, {
                    id: Date.now() + 5,
                    type: 'ai',
                    message: `Gagal terhubung ke AI. Pastikan layanan Ollama API berjalan di ${OLLAMA_API_BASE}.`,
                    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                }]);
            }
        }
    };

    // Filter psikologs based on search query
    const filteredPsikologs = useMemo(() => {
        if (!searchQuery) return psikologList;
        
        const query = searchQuery.toLowerCase();
        return psikologList.filter(psikolog => {
            const searchFields = [
                psikolog.name,
                psikolog.description,
                psikolog.education,
                psikolog.approach,
                psikolog.philosophy,
                ...psikolog.expertise
            ].join(' ').toLowerCase();
            
            return searchFields.includes(query);
        });
    }, [psikologList, searchQuery]);

    return (
        <LayoutUser>
            <div 
                className="min-h-screen cursor-gaming pt-20 pb-12 relative"
                style={{
                    backgroundImage: `url(${backgroundPsikologImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(1.4) contrast(1.2)',
                }}
            >
                {/* Navy Blue Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-black/80"></div>
                
                {/* Single Container for All Elements */}
                <div className="container mx-auto px-4 py-8 relative z-10">
                    <div className="bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-black/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-800/30 shadow-2xl">
                {/* Header - Flex Horizontal Container */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-6 mb-8">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-2">
                            Tim Psikolog Kami
                        </h1>
                        <p className="text-blue-100 text-base lg:text-lg">
                            Temukan psikolog yang tepat untuk kebutuhan kesehatan mental Anda
                        </p>
                    </div>
                    
                    {/* Booking Status Button */}
                    <Link
                        href="/booking-psikolog"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 lg:px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center space-x-2 whitespace-nowrap shadow-lg border border-blue-500/30"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span className="hidden sm:inline">Lihat Status Booking</span>
                        <span className="sm:hidden">Status</span>
                    </Link>
                </div>

                {/* Search Section */}
                <div className="mb-8 bg-gradient-to-r from-slate-800/80 to-blue-900/80 rounded-2xl p-6 border border-blue-700/30 shadow-lg backdrop-blur-sm">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Cari psikolog berdasarkan nama, keahlian, atau pendekatan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-800/60 backdrop-blur-sm border border-blue-600/40 rounded-xl pl-12 pr-12 py-3 text-white placeholder-blue-200/60 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                <svg className="w-5 h-5 text-white/60 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Result Count */}
                    {searchQuery && (
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-blue-200 text-sm flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span>
                                    <span className="text-white font-bold">{filteredPsikologs.length}</span> psikolog ditemukan
                                </span>
                            </div>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-white hover:text-white/80 text-sm font-medium flex items-center space-x-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Reset</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Psikolog Cards Grid */}
                {filteredPsikologs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPsikologs.map((psikolog) => (
                            <PsikologCard 
                                key={psikolog.id}
                                psikolog={psikolog}
                                onClick={() => handleDetailClick(psikolog)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-gradient-to-br from-slate-800 to-blue-900 rounded-full mb-6 border border-blue-600/30">
                            <div className="text-7xl">🔍</div>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-3">Psikolog tidak ditemukan</h3>
                        <p className="text-blue-200 text-lg max-w-md mx-auto mb-8">
                            Tidak ada psikolog yang sesuai dengan pencarian Anda. Coba gunakan kata kunci lain.
                        </p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-bold shadow-lg border border-blue-500/30"
                        >
                            Hapus Pencarian
                        </button>
                    </div>
                )}
                    </div>
                </div>
            </div>

            {/* Modal Detail Psikolog */}
            {isModalOpen && selectedPsikolog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-sm rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-blue-700/40 shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={selectedPsikolog.image ? `/storage/${selectedPsikolog.image}` : 'https://via.placeholder.com/80x80/06b6d4/ffffff?text=IMG'}
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
                        <div className="flex justify-between mt-8 pt-6 border-t border-slate-600">
                            <button
                                onClick={() => handleOpenBooking(selectedPsikolog)}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                            >
                                📅 Atur Jadwal Konseling
                            </button>
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

            {/* Booking Modal */}
            {isBookingModalOpen && selectedPsikolog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-600">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    📅 Atur Jadwal Konseling
                                </h2>
                                <p className="text-cyan-400">
                                    dengan {selectedPsikolog.name}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseBookingModal}
                                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Booking Form */}
                        <form onSubmit={handleBookingSubmit} className="space-y-6">
                            {/* Date and Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        📅 Tanggal Konseling *
                                    </label>
                                    <input
                                        type="date"
                                        value={data.appointment_date}
                                        onChange={(e) => setData('appointment_date', e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                                    />
                                    {errors.appointment_date && <p className="text-red-400 text-sm mt-1">{errors.appointment_date}</p>}
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        🕐 Waktu Konseling *
                                    </label>
                                    <input
                                        type="time"
                                        value={data.appointment_time}
                                        onChange={(e) => setData('appointment_time', e.target.value)}
                                        required
                                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                                    />
                                    {errors.appointment_time && <p className="text-red-400 text-sm mt-1">{errors.appointment_time}</p>}
                                </div>
                            </div>

                            {/* Session Type */}
                            <div>
                                <label className="block text-white font-medium mb-2">
                                    💻 Tipe Sesi *
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex items-center space-x-3 p-4 bg-slate-700 rounded-lg border border-slate-600 hover:border-cyan-400/50 transition-colors cursor-pointer">
                                        <input
                                            type="radio"
                                            name="session_type"
                                            value="online"
                                            checked={data.session_type === 'online'}
                                            onChange={(e) => setData('session_type', e.target.value)}
                                            className="text-cyan-400 focus:ring-cyan-400"
                                        />
                                        <div>
                                            <div className="text-white font-medium">🌐 Online</div>
                                            <div className="text-white/60 text-sm">Video call</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center space-x-3 p-4 bg-slate-700 rounded-lg border border-slate-600 hover:border-cyan-400/50 transition-colors cursor-pointer">
                                        <input
                                            type="radio"
                                            name="session_type"
                                            value="offline"
                                            checked={data.session_type === 'offline'}
                                            onChange={(e) => setData('session_type', e.target.value)}
                                            className="text-cyan-400 focus:ring-cyan-400"
                                        />
                                        <div>
                                            <div className="text-white font-medium">🏢 Offline</div>
                                            <div className="text-white/60 text-sm">Bertemu langsung</div>
                                        </div>
                                    </label>
                                </div>
                                {errors.session_type && <p className="text-red-400 text-sm mt-1">{errors.session_type}</p>}
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-white font-medium mb-2">
                                    📝 Catatan (Opsional)
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    placeholder="Tuliskan hal-hal yang ingin Anda diskusikan dengan psikolog..."
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                />
                                {errors.notes && <p className="text-red-400 text-sm mt-1">{errors.notes}</p>}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseBookingModal}
                                    className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Buat Jadwal</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Chatbot Button - Outside relative container */}
            {!isChatbotOpen && (
                <button
                    onClick={handleOpenChatbot}
                    className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-[99999] border border-blue-400/40"
                    aria-label="Buka Chatbot"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            )}

            {/* Floating Chatbot Window - Outside relative container */}
            {isChatbotOpen && (
                <div 
                    className="fixed bottom-6 right-6 w-[22rem] h-[28rem] md:w-[28rem] md:h-[36rem] bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-black/95 rounded-2xl shadow-2xl border border-blue-800/50 flex flex-col z-[99999] backdrop-blur-sm animate-in slide-in-from-bottom-right duration-300"
                >
                    {/* Chatbot Header */}
                    <div className="flex items-center justify-between p-4 border-b border-blue-800/50 bg-gradient-to-r from-blue-700 to-blue-900 rounded-t-2xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/10 border border-blue-300/30 rounded-full flex items-center justify-center text-white">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">FixYou AI (Ollama)</h3>
                                <p className="text-blue-200/90 text-xs">{isChatbotLoading ? 'Mengetik...' : 'Siap membantu'}</p>
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
                                aria-label="Tutup Chatbot"
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
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border border-blue-400/40' 
                                        : 'bg-slate-800/70 text-blue-100 border border-blue-800/40'
                                }`}>
                                    <p>{msg.message}</p>
                                    <p className={`text-xs mt-1 ${
                                        msg.type === 'user' ? 'text-white/70' : 'text-blue-300/70'
                                    }`}>
                                        {msg.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-blue-800/50">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="Tulis pertanyaan Anda..."
                                className="flex-1 bg-slate-900/70 border border-blue-800/50 rounded-full px-4 py-2 text-sm text-white placeholder-blue-200/60 focus:border-blue-400 focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white p-2 rounded-full transition-all duration-200 hover:scale-105 border border-blue-400/40"
                                aria-label="Kirim Pesan"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                        <p className="text-xs text-blue-300/70 mt-2 text-center">
                            Powered by Ollama (open-source LLM). Respon AI dapat tidak selalu akurat.
                        </p>
                    </div>
                </div>
            )}
        </LayoutUser>
    );
}
