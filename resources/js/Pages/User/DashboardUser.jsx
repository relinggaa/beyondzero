import React from "react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function DashboardUser() {
    return (
        <LayoutUser>
            <div className="p-4 lg:p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        Selamat Datang di BeyondMind
                    </h1>
                    <p className="text-white/70 text-lg">
                        Pantau kesehatan mental Anda dengan tools yang tepat
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Mood Tracking Card */}
                    <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">😊</span>
                            </div>
                            <span className="text-cyan-400 text-sm font-medium">+12%</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">Mood Tracking</h3>
                        <p className="text-white/60 text-sm">7 hari terakhir</p>
                        <div className="mt-4 bg-slate-600 rounded-full h-2">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full w-3/4"></div>
                        </div>
                    </div>

                    {/* Journaling Card */}
                    <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">📝</span>
                            </div>
                            <span className="text-cyan-400 text-sm font-medium">+5</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">Journaling</h3>
                        <p className="text-white/60 text-sm">12 entri bulan ini</p>
                        <div className="mt-4 bg-slate-600 rounded-full h-2">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full w-2/3"></div>
                        </div>
                    </div>

                    {/* Curhat Sessions Card */}
                    <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">💬</span>
                            </div>
                            <span className="text-cyan-400 text-sm font-medium">+3</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">Curhat Sessions</h3>
                        <p className="text-white/60 text-sm">4 sesi minggu ini</p>
                        <div className="mt-4 bg-slate-600 rounded-full h-2">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full w-1/2"></div>
                        </div>
                    </div>

                    {/* Well-being Score Card */}
                    <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">💚</span>
                            </div>
                            <span className="text-cyan-400 text-sm font-medium">85%</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">Well-being Score</h3>
                        <p className="text-white/60 text-sm">Sangat baik</p>
                        <div className="mt-4 bg-slate-600 rounded-full h-2">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full w-4/5"></div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Aksi Cepat</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <a href="/moodtracker" className="group">
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">😊</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">Mood Tracker</h3>
                                <p className="text-white/60 text-sm">Pantau mood harian Anda</p>
                            </div>
                        </a>

                        <a href="/curhat" className="group">
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">💬</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">Curhat</h3>
                                <p className="text-white/60 text-sm">Ceritakan perasaan Anda</p>
                            </div>
                        </a>

                        <a href="/journaling" className="group">
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">📝</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">Journaling</h3>
                                <p className="text-white/60 text-sm">Tulis jurnal harian</p>
                            </div>
                        </a>

                        <a href="/psikolog" className="group">
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">👨‍⚕️</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">Psikolog</h3>
                                <p className="text-white/60 text-sm">Konsultasi dengan ahli</p>
                            </div>
                        </a>

                        <a href="/healing" className="group">
                            <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">🧘‍♀️</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">Healing</h3>
                                <p className="text-white/60 text-sm">Aktivitas healing games</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Aktivitas Terbaru</h2>
                    <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-4 bg-slate-600 rounded-xl">
                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                                    <span className="text-lg">😊</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">Mood Tracking</h4>
                                    <p className="text-white/60 text-sm">Anda mencatat mood "Bahagia" hari ini</p>
                                </div>
                                <span className="text-cyan-400 text-sm">2 jam lalu</span>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-slate-600 rounded-xl">
                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                                    <span className="text-lg">📝</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">Journaling</h4>
                                    <p className="text-white/60 text-sm">Jurnal baru "Refleksi Pagi" dibuat</p>
                                </div>
                                <span className="text-cyan-400 text-sm">1 hari lalu</span>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-slate-600 rounded-xl">
                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                                    <span className="text-lg">💬</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">Curhat Session</h4>
                                    <p className="text-white/60 text-sm">Sesi curhat "Stres Kerja" selesai</p>
                                </div>
                                <span className="text-cyan-400 text-sm">2 hari lalu</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivational Quote */}
                <div className="bg-gradient-to-r from-cyan-400/10 to-teal-500/10 rounded-2xl p-8 border border-cyan-400/20">
                    <div className="text-center">
                        <span className="text-6xl mb-4 block">💚</span>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            "Kesehatan mental adalah perjalanan, bukan destinasi"
                        </h3>
                        <p className="text-white/70 text-lg">
                            Setiap langkah kecil menuju kesejahteraan mental adalah kemenangan yang patut dirayakan.
                        </p>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}
