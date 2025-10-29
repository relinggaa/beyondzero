import React from "react";
import { Link } from "@inertiajs/react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function DashboardUser() {
    return (
        <LayoutUser>
            <div className="min-h-screen cursor-gaming bg-gradient-to-br from-slate-950 via-blue-950 to-black pt-20 pb-12">
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
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium shadow-lg"
                        >
                            <span>Mood Tracker</span>
                        </Link>
                        
                        <Link
                            href="/curhat"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium shadow-lg"
                        >
                            <span>Curhat</span>
                        </Link>
                        
                        <Link
                            href="/journaling"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium shadow-lg"
                        >
                            <span>Journaling</span>
                        </Link>
                        
                        <Link
                            href="/psikolog"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium shadow-lg"
                        >
                            <span>Psikolog</span>
                        </Link>
                        
                        <Link
                            href="/booking-psikolog"
                            className="bg-slate-800/50 border border-blue-700/50 hover:border-blue-600 text-white hover:bg-slate-700/50 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium backdrop-blur-sm"
                        >
                            <span>Status Booking</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Mood Tracking Card */}
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:scale-105 group shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-full"></div>
                            </div>
                            <span className="text-white text-sm font-bold bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">+12%</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Mood Tracking</h3>
                        <p className="text-white/60 text-sm mb-4">7 hari terakhir</p>
                        <div className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-3/4 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Journaling Card */}
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:scale-105 group shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-full"></div>
                            </div>
                            <span className="text-white text-sm font-bold bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">+5</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Journaling</h3>
                        <p className="text-white/60 text-sm mb-4">12 entri bulan ini</p>
                        <div className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-2/3 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Curhat Sessions Card */}
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:scale-105 group shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-full"></div>
                            </div>
                            <span className="text-white text-sm font-bold bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">+3</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Curhat Sessions</h3>
                        <p className="text-white/60 text-sm mb-4">4 sesi minggu ini</p>
                        <div className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-1/2 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Well-being Score Card */}
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:scale-105 group shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-full"></div>
                            </div>
                            <span className="text-white text-sm font-bold bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">85%</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Well-being Score</h3>
                        <p className="text-white/60 text-sm mb-4">Sangat baik</p>
                        <div className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-4/5 transition-all duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
                        Aksi Cepat
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <a href="/moodtracker" className="group">
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 group-hover:scale-105 h-full shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <div className="w-8 h-8 bg-white rounded-full"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Mood Tracker</h3>
                                <p className="text-white/60 text-sm">Pantau mood harian Anda</p>
                            </div>
                        </a>

                        <a href="/curhat" className="group">
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 group-hover:scale-105 h-full shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <div className="w-8 h-8 bg-white rounded-full"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Curhat</h3>
                                <p className="text-white/60 text-sm">Ceritakan perasaan Anda</p>
                            </div>
                        </a>

                        <a href="/journaling" className="group">
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 group-hover:scale-105 h-full shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <div className="w-8 h-8 bg-white rounded-full"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Journaling</h3>
                                <p className="text-white/60 text-sm">Tulis jurnal harian</p>
                            </div>
                        </a>

                        <a href="/psikolog" className="group">
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 group-hover:scale-105 h-full shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <div className="w-8 h-8 bg-white rounded-full"></div>
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
                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
                        Aktivitas Terbaru
                    </h2>
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 shadow-xl">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-4 p-4 bg-slate-700/30 hover:bg-slate-600/40 rounded-xl transition-all duration-200 group cursor-pointer border border-blue-700/20">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <div className="w-6 h-6 bg-white rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Mood Tracking</h4>
                                    <p className="text-white/60 text-sm">Anda mencatat mood "Bahagia" hari ini</p>
                                </div>
                                <span className="text-white text-xs font-medium bg-blue-600/20 px-3 py-1 rounded-full whitespace-nowrap border border-blue-500/30">2 jam lalu</span>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-slate-700/30 hover:bg-slate-600/40 rounded-xl transition-all duration-200 group cursor-pointer border border-blue-700/20">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <div className="w-6 h-6 bg-white rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Journaling</h4>
                                    <p className="text-white/60 text-sm">Jurnal baru "Refleksi Pagi" dibuat</p>
                                </div>
                                <span className="text-white text-xs font-medium bg-blue-600/20 px-3 py-1 rounded-full whitespace-nowrap border border-blue-500/30">1 hari lalu</span>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-slate-700/30 hover:bg-slate-600/40 rounded-xl transition-all duration-200 group cursor-pointer border border-blue-700/20">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <div className="w-6 h-6 bg-white rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Curhat Session</h4>
                                    <p className="text-white/60 text-sm">Sesi curhat "Stres Kerja" selesai</p>
                                </div>
                                <span className="text-white text-xs font-medium bg-blue-600/20 px-3 py-1 rounded-full whitespace-nowrap border border-blue-500/30">2 hari lalu</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivational Quote */}
                <div className="relative overflow-hidden bg-slate-800/50 rounded-3xl p-10 border border-blue-700/30 backdrop-blur-sm shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20"></div>
                    <div className="relative text-center">
                        <div className="inline-block p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-6 shadow-lg">
                            <div className="w-12 h-12 bg-white rounded-full"></div>
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
