import React from "react";
import { Link } from "@inertiajs/react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function DashboardUser() {
    return (
        <LayoutUser>
            <div className="min-h-screen cursor-gaming bg-black pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                {/* Header Section */}
                <div className="mb-10 mt-10">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                            Selamat Datang di FixYou
                        </h1>
                        <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto">
                            Pantau kesehatan mental Anda dengan tools yang tepat dan efektif
                        </p>
                    </div>
                    
                    {/* Navigation Menu */}
                    <div className="flex flex-wrap gap-3 mb-10 justify-center">
                        <Link
                            href="/moodtracker"
                            className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                        >
                            <span>Mood Tracker</span>
                        </Link>
                        
                        <Link
                            href="/curhat"
                            className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                        >
                            <span>Curhat</span>
                        </Link>
                        
                        <Link
                            href="/journaling"
                            className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                        >
                            <span>Journaling</span>
                        </Link>
                        
                        <Link
                            href="/psikolog"
                            className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                        >
                            <span>Psikolog</span>
                        </Link>
                        
                        <Link
                            href="/booking-psikolog"
                            className="bg-white/10 border border-white/20 hover:border-white/50 text-white hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                        >
                            <span>Status Booking</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Mood Tracking Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <div className="w-8 h-8 bg-black rounded-full"></div>
                            </div>
                            <span className="text-white text-sm font-bold bg-white/10 px-3 py-1 rounded-full">+12%</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Mood Tracking</h3>
                        <p className="text-white/60 text-sm mb-4">7 hari terakhir</p>
                        <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
                            <div className="bg-white h-2 rounded-full w-3/4 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Journaling Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <div className="w-8 h-8 bg-black rounded-full"></div>
                            </div>
                            <span className="text-white text-sm font-bold bg-white/10 px-3 py-1 rounded-full">+5</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Journaling</h3>
                        <p className="text-white/60 text-sm mb-4">12 entri bulan ini</p>
                        <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
                            <div className="bg-white h-2 rounded-full w-2/3 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Curhat Sessions Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <div className="w-8 h-8 bg-black rounded-full"></div>
                            </div>
                            <span className="text-white text-sm font-bold bg-white/10 px-3 py-1 rounded-full">+3</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Curhat Sessions</h3>
                        <p className="text-white/60 text-sm mb-4">4 sesi minggu ini</p>
                        <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
                            <div className="bg-white h-2 rounded-full w-1/2 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Well-being Score Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <div className="w-8 h-8 bg-black rounded-full"></div>
                            </div>
                            <span className="text-white text-sm font-bold bg-white/10 px-3 py-1 rounded-full">85%</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Well-being Score</h3>
                        <p className="text-white/60 text-sm mb-4">Sangat baik</p>
                        <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
                            <div className="bg-white h-2 rounded-full w-4/5 transition-all duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <div className="w-1 h-8 bg-white rounded-full mr-3"></div>
                        Aksi Cepat
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <a href="/moodtracker" className="group">
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group-hover:scale-105 h-full">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-8 h-8 bg-black rounded-full"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Mood Tracker</h3>
                                <p className="text-white/60 text-sm">Pantau mood harian Anda</p>
                            </div>
                        </a>

                        <a href="/curhat" className="group">
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group-hover:scale-105 h-full">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-8 h-8 bg-black rounded-full"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Curhat</h3>
                                <p className="text-white/60 text-sm">Ceritakan perasaan Anda</p>
                            </div>
                        </a>

                        <a href="/journaling" className="group">
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group-hover:scale-105 h-full">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-8 h-8 bg-black rounded-full"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Journaling</h3>
                                <p className="text-white/60 text-sm">Tulis jurnal harian</p>
                            </div>
                        </a>

                        <a href="/psikolog" className="group">
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group-hover:scale-105 h-full">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-8 h-8 bg-black rounded-full"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Psikolog</h3>
                                <p className="text-white/60 text-sm">Konsultasi dengan ahli</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <div className="w-1 h-8 bg-white rounded-full mr-3"></div>
                        Aktivitas Terbaru
                    </h2>
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group cursor-pointer">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-6 h-6 bg-black rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Mood Tracking</h4>
                                    <p className="text-white/60 text-sm">Anda mencatat mood "Bahagia" hari ini</p>
                                </div>
                                <span className="text-white text-xs font-medium bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">2 jam lalu</span>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group cursor-pointer">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-6 h-6 bg-black rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Journaling</h4>
                                    <p className="text-white/60 text-sm">Jurnal baru "Refleksi Pagi" dibuat</p>
                                </div>
                                <span className="text-white text-xs font-medium bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">1 hari lalu</span>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group cursor-pointer">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-6 h-6 bg-black rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Curhat Session</h4>
                                    <p className="text-white/60 text-sm">Sesi curhat "Stres Kerja" selesai</p>
                                </div>
                                <span className="text-white text-xs font-medium bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">2 hari lalu</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivational Quote */}
                <div className="relative overflow-hidden bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-sm shadow-2xl">
                    <div className="absolute inset-0 bg-white/5"></div>
                    <div className="relative text-center">
                        <div className="inline-block p-4 bg-white rounded-full mb-6">
                            <div className="w-12 h-12 bg-black rounded-full"></div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4 max-w-3xl mx-auto">
                            "Kesehatan mental adalah perjalanan, bukan destinasi"
                        </h3>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Setiap langkah kecil menuju kesejahteraan mental adalah kemenangan yang patut dirayakan.
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </LayoutUser>
    );
}
