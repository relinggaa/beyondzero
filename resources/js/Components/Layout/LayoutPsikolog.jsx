import React from "react";
import SidebarPsikolog from "../SidebarPsikolog";

export default function LayoutPsikolog({ children, activePage, setActivePage }) {
    return (
        <div className="min-h-screen bg-slate-100 flex">
            <SidebarPsikolog activePage={activePage} setActivePage={setActivePage} />
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-white border-b border-slate-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                {activePage === 'dashboard' && 'Dashboard Psikolog'}
                                {activePage === 'konseling' && 'Jadwal Konseling'}
                                {activePage === 'profile' && 'Profil Saya'}
                            </h1>
                            <p className="text-slate-600 text-sm">
                                {activePage === 'dashboard' && 'Kelola jadwal konseling dan profil Anda'}
                                {activePage === 'konseling' && 'Kelola semua jadwal konseling Anda'}
                                {activePage === 'profile' && 'Kelola informasi profil dan akun Anda'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
                                </svg>
                            </button>
                            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
                                </svg>
                            </button>
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">👨‍⚕️</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
