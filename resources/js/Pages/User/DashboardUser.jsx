import React from "react";
import { Link } from "@inertiajs/react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function DashboardUser() {
    return (
        <LayoutUser>
            <div className="min-h-screen cursor-gaming bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                {/* Header Section */}
                <div className="mb-10 mt-10">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-3">
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
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center space-x-2"
                        >
                            <span className="text-xl">😊</span>
                            <span>Mood Tracker</span>
                        </Link>
                        
                        <Link
                            href="/curhat"
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center space-x-2"
                        >
                            <span className="text-xl">💬</span>
                            <span>Curhat</span>
                        </Link>
                        
                        <Link
                            href="/journaling"
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center space-x-2"
                        >
                            <span className="text-xl">📝</span>
                            <span>Journaling</span>
                        </Link>
                        
                        <Link
                            href="/psikolog"
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center space-x-2"
                        >
                            <span className="text-xl">👨‍⚕️</span>
                            <span>Psikolog</span>
                        </Link>
                        
                        <Link
                            href="/booking-psikolog"
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium flex items-center space-x-2"
                        >
                            <span className="text-xl">📋</span>
                            <span>Status Booking</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Mood Tracking Card */}
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl">😊</span>
                            </div>
                            <span className="text-cyan-400 text-sm font-bold bg-cyan-400/10 px-3 py-1 rounded-full">+12%</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Mood Tracking</h3>
                        <p className="text-white/60 text-sm mb-4">7 hari terakhir</p>
                        <div className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full w-3/4 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Journaling Card */}
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl">📝</span>
                            </div>
                            <span className="text-cyan-400 text-sm font-bold bg-cyan-400/10 px-3 py-1 rounded-full">+5</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Journaling</h3>
                        <p className="text-white/60 text-sm mb-4">12 entri bulan ini</p>
                        <div className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full w-2/3 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Curhat Sessions Card */}
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl">💬</span>
                            </div>
                            <span className="text-cyan-400 text-sm font-bold bg-cyan-400/10 px-3 py-1 rounded-full">+3</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Curhat Sessions</h3>
                        <p className="text-white/60 text-sm mb-4">4 sesi minggu ini</p>
                        <div className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full w-1/2 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Well-being Score Card */}
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl">💚</span>
                            </div>
                            <span className="text-cyan-400 text-sm font-bold bg-cyan-400/10 px-3 py-1 rounded-full">85%</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Well-being Score</h3>
                        <p className="text-white/60 text-sm mb-4">Sangat baik</p>
                        <div className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full w-4/5 transition-all duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full mr-3"></div>
                        Aksi Cepat
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <a href="/moodtracker" className="group">
                            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/20 h-full">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                                    <span className="text-3xl">😊</span>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Mood Tracker</h3>
                                <p className="text-white/60 text-sm">Pantau mood harian Anda</p>
                            </div>
                        </a>

                        <a href="/curhat" className="group">
                            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/20 h-full">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                                    <span className="text-3xl">💬</span>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Curhat</h3>
                                <p className="text-white/60 text-sm">Ceritakan perasaan Anda</p>
                            </div>
                        </a>

                        <a href="/journaling" className="group">
                            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/20 h-full">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                                    <span className="text-3xl">📝</span>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Journaling</h3>
                                <p className="text-white/60 text-sm">Tulis jurnal harian</p>
                            </div>
                        </a>

                        <a href="/psikolog" className="group">
                            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/20 h-full">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                                    <span className="text-3xl">👨‍⚕️</span>
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
                        <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full mr-3"></div>
                        Aktivitas Terbaru
                    </h2>
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-4 p-4 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl transition-all duration-200 group cursor-pointer">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-lg">😊</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Mood Tracking</h4>
                                    <p className="text-white/60 text-sm">Anda mencatat mood "Bahagia" hari ini</p>
                                </div>
                                <span className="text-cyan-400 text-xs font-medium bg-cyan-400/10 px-3 py-1 rounded-full whitespace-nowrap">2 jam lalu</span>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl transition-all duration-200 group cursor-pointer">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-lg">📝</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Journaling</h4>
                                    <p className="text-white/60 text-sm">Jurnal baru "Refleksi Pagi" dibuat</p>
                                </div>
                                <span className="text-cyan-400 text-xs font-medium bg-cyan-400/10 px-3 py-1 rounded-full whitespace-nowrap">1 hari lalu</span>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl transition-all duration-200 group cursor-pointer">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-lg">💬</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold">Curhat Session</h4>
                                    <p className="text-white/60 text-sm">Sesi curhat "Stres Kerja" selesai</p>
                                </div>
                                <span className="text-cyan-400 text-xs font-medium bg-cyan-400/10 px-3 py-1 rounded-full whitespace-nowrap">2 hari lalu</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivational Quote */}
                <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl p-10 border border-cyan-400/30 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
                    <div className="relative text-center">
                        <div className="inline-block p-4 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-full mb-6">
                            <span className="text-6xl block">💚</span>
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
