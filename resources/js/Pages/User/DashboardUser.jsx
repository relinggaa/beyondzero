import React from "react";
import { Link } from "@inertiajs/react";
import { Smile, MessageCircle, BookOpen, Users } from "lucide-react";
import LayoutUser from "../../Components/Layout/LayoutUser";

export default function DashboardUser() {
    return (
        <LayoutUser>
            <div className="min-h-screen cursor-gaming bg-gradient-to-br from-slate-950 via-blue-950 to-black pt-24">
                <div className="mt-10 max-w-7xl mx-auto px-4 lg:px-8">
                    {/* Compact header */}
                    <div className="mb-6 grid grid-cols-12 gap-6 items-stretch">
                        <div className="col-span-12 lg:col-span-8 bg-slate-800/50 border border-blue-700/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">Selamat Datang di FixYou</h1>
                            <p className="text-white/70 text-sm lg:text-base">Ringkasan kesehatan mental Anda hari ini</p>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="bg-slate-700/40 rounded-xl p-4 text-center">
                                    <div className="text-white text-xl font-bold">4.9/5</div>
                                    <div className="text-white/60 text-xs">Mood Rata-rata</div>
                                </div>
                                <div className="bg-slate-700/40 rounded-xl p-4 text-center">
                                    <div className="text-white text-xl font-bold">12</div>
                                    <div className="text-white/60 text-xs">Jurnal Bulan Ini</div>
                                </div>
                                <div className="bg-slate-700/40 rounded-xl p-4 text-center">
                                    <div className="text-white text-xl font-bold">3</div>
                                    <div className="text-white/60 text-xs">Sesi Curhat</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-4 bg-slate-800/50 border border-blue-700/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex items-center justify-center">
                            <div className="grid grid-cols-4 gap-3 w-full">
                                <Link href="/moodtracker" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-medium text-white transition-all duration-300">
                                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                                    <Smile className="w-4 h-4 relative" />
                                    <span className="relative group-active:scale-95 transition-transform">Mood</span>
                                </Link>
                                <Link href="/curhat" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-medium text-white transition-all duration-300">
                                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                                    <MessageCircle className="w-4 h-4 relative" />
                                    <span className="relative group-active:scale-95 transition-transform">Curhat</span>
                                </Link>
                                <Link href="/journaling" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-medium text-white transition-all duration-300">
                                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                                    <BookOpen className="w-4 h-4 relative" />
                                    <span className="relative group-active:scale-95 transition-transform">Journal</span>
                                </Link>
                                <Link href="/psikolog" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-medium text-white transition-all duration-300">
                                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
                                    <Users className="w-4 h-4 relative" />
                                    <span className="relative group-active:scale-95 transition-transform">Psikolog</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Single-screen summary grid */}
                    <div className="grid grid-cols-12 gap-6 pb-10">
                        {/* Left column - large chart placeholder */}
                        <div className="col-span-12 lg:col-span-8 bg-slate-800/50 border border-blue-700/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl h-[360px] flex flex-col">
                            <h3 className="text-white font-bold mb-2">Ringkasan Aktivitas</h3>
                            <div className="flex-1 rounded-xl bg-slate-700/30 border border-blue-700/20"></div>
                        </div>

                        {/* Right column - small widgets */}
                        <div className="col-span-12 lg:col-span-4 grid grid-rows-3 gap-6">
                            <div className="bg-slate-800/50 border border-blue-700/30 rounded-2xl p-4 shadow-xl">
                                <h4 className="text-white font-semibold">Mood Harian</h4>
                                <div className="mt-3 h-[90px] rounded-lg bg-slate-700/30"></div>
                            </div>
                            <div className="bg-slate-800/50 border border-blue-700/30 rounded-2xl p-4 shadow-xl">
                                <h4 className="text-white font-semibold">Jurnal Terakhir</h4>
                                <p className="text-white/60 text-sm mt-2">Refleksi Pagi - 1 jam lalu</p>
                            </div>
                            <div className="bg-slate-800/50 border border-blue-700/30 rounded-2xl p-4 shadow-xl">
                                <h4 className="text-white font-semibold">Rekomendasi</h4>
                                <p className="text-white/60 text-sm mt-2">Coba latihan pernapasan 5 menit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}
