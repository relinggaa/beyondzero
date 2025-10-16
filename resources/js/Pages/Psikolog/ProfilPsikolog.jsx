import React, { useState, useEffect } from "react";
import LayoutPsikolog from "../../Components/Layout/LayoutPsikolog";

export default function ProfilPsikolog({ psikolog }) {
    const [activePage, setActivePage] = useState("profile");
    
    // Set active page based on current URL
    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/psikolog/jadwal')) {
            setActivePage("konseling");
        } else if (currentPath.includes('/psikolog/dashboard')) {
            setActivePage("dashboard");
        } else if (currentPath.includes('/psikolog/profil')) {
            setActivePage("profile");
        }
    }, []);

    return (
        <LayoutPsikolog activePage={activePage} setActivePage={setActivePage}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        Profil Saya
                    </h1>
                    <p className="text-slate-600">
                        Kelola informasi profil dan akun Anda
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="text-center">
                                <img
                                    src={psikolog.image ? `/storage/${psikolog.image}` : 'https://via.placeholder.com/120x120/06b6d4/ffffff?text=IMG'}
                                    alt={psikolog.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400/30 mx-auto mb-4"
                                />
                                <h2 className="text-xl font-bold text-slate-800 mb-2">{psikolog.name}</h2>
                                <p className="text-cyan-500 font-medium mb-4">{psikolog.experience} pengalaman</p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Username</span>
                                        <span className="text-slate-800 font-medium">{psikolog.username}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Access Key</span>
                                        <span className="text-slate-800 font-medium font-mono">{psikolog.key}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-slate-600 text-sm">Status</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            Aktif
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Tentang Saya</h3>
                            <p className="text-slate-600 leading-relaxed">{psikolog.description}</p>
                        </div>

                        {/* Education */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">🎓 Pendidikan</h3>
                            <p className="text-slate-600">{psikolog.education}</p>
                        </div>

                        {/* Expertise */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">🎯 Keahlian</h3>
                            <div className="flex flex-wrap gap-2">
                                {psikolog.expertise.map((topic, index) => (
                                    <span
                                        key={index}
                                        className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Approach */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">🔬 Pendekatan Terapi</h3>
                            <p className="text-slate-600">{psikolog.approach}</p>
                        </div>

                        {/* Philosophy */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">💭 Filosofi</h3>
                            <p className="text-slate-600 italic">"{psikolog.philosophy}"</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 rounded-2xl p-4 text-white text-center">
                                <div className="text-2xl font-bold">6+</div>
                                <div className="text-sm opacity-90">Tahun Pengalaman</div>
                            </div>
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-4 text-white text-center">
                                <div className="text-2xl font-bold">100+</div>
                                <div className="text-sm opacity-90">Klien Terbantu</div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl p-4 text-white text-center">
                                <div className="text-2xl font-bold">4.9</div>
                                <div className="text-sm opacity-90">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutPsikolog>
    );
}
